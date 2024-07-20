import { defu } from "defu";
import type * as hast from "hast";
import type * as mdast from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

export type Options = OptionsBuilder<NodeOptions | NodeOptionsFunction>;

export type OptionsBuilder<N> = {
  /**
   * The root node of the callout.
   *
   * @default
   * (callout) => ({
   *   tagName: callout.isFoldable ? "details" : "div",
   *   properties: {
   *     dataCallout: true,
   *     dataCalloutType: callout.type,
   *     open: callout.defaultFolded === undefined ? false : !callout.defaultFolded,
   *   },
   * })
   */
  root?: N;

  /**
   * The title node of the callout.
   *
   * @default
   * (callout) => ({
   *   tagName: callout.isFoldable ? "summary" : "div",
   *   properties: {
   *     dataCalloutTitle: true,
   *   },
   * })
   */
  title?: N;

  /**
   * The body node of the callout.
   *
   * @default
   * () => ({
   *   tagName: "div",
   *   properties: {
   *     dataCalloutBody: true,
   *   },
   * })
   */
  body?: N;

  /**
   * The icon node of the callout.
   *
   * @default
   */
  icon?: Optional<WithChildren<N>>;

  /**
   * A list of callout types that are supported.
   * - If `undefined`, all callout types are supported. This means that this plugin will not check if the given callout type is in `callouts` and never call `onUnknownCallout`.
   * - If a list, only the callout types in the list are supported. This means that if the given callout type is not in `callouts`, this plugin will call `onUnknownCallout`.
   * @example ["info", "warning", "danger"]
   * @default undefined
   */
  callouts?: string[] | null;

  /**
   * A function that is called when the given callout type is not in `callouts`.
   *
   * - If the function returns `undefined`, the callout is ignored. This means that the callout is rendered as a normal blockquote.
   * - If the function returns a `Callout`, the callout is replaced with the returned `Callout`.
   */
  onUnknownCallout?: (callout: Callout, file: VFile) => Callout | undefined;
};

export type NodeOptions = {
  /**
   * The HTML tag name of the node.
   *
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#element
   */
  tagName: string;

  /**
   * The html properties of the node.
   *
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#properties
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#element
   * @example { "className": "callout callout-info" }
   */
  properties: hast.Properties;
};

export type NodeOptionsFunction = (callout: Callout) => NodeOptions;

// biome-ignore lint/suspicious/noExplicitAny: any is necessary for checking if N is a function
export type WithChildren<N> = N extends (...args: any) => any
  ? (...args: Parameters<N>) => WithChildren<ReturnType<N>>
  :
      | (N & {
          children: hast.ElementContent[] | string;
        })
      | string;

// biome-ignore lint/suspicious/noExplicitAny: any is necessary for checking if T is a function
export type Optional<T> = T extends (args: any) => any
  ? (...args: Parameters<T>) => Optional<ReturnType<T>>
  : T | undefined;

export const defaultOptions: Required<Options> = {
  root: (callout) => ({
    tagName: callout.isFoldable ? "details" : "div",
    properties: {
      dataCallout: true,
      dataCalloutType: callout.type,
      open:
        callout.defaultFolded === undefined ? false : !callout.defaultFolded,
    },
  }),
  title: (callout) => ({
    tagName: callout.isFoldable ? "summary" : "div",
    properties: {
      dataCalloutTitle: true,
    },
  }),
  icon: () => undefined,
  body: () => ({
    tagName: "div",
    properties: {
      dataCalloutBody: true,
    },
  }),
  callouts: null,
  onUnknownCallout: () => undefined,
};

const initOptions = (options?: Options) => {
  const defaultedOptions = defu(options, defaultOptions);

  return Object.fromEntries(
    Object.entries(defaultedOptions).map(([key, value]) => {
      if (
        ["root", "title", "body", "icon"].includes(key) &&
        typeof value !== "function"
      ) {
        return [key, () => value];
      }

      return [key, value];
    }),
  ) as Required<OptionsBuilder<NodeOptionsFunction>>;
};

/**
 * A remark plugin to parse callout syntax.
 */
export const remarkCallout: Plugin<[Options?], mdast.Root> = (_options) => {
  const options = initOptions(_options);

  return (tree, file) => {
    visit(tree, "blockquote", (node) => {
      const paragraphNode = node.children.at(0);
      if (paragraphNode == null || paragraphNode.type !== "paragraph") return;

      // Skip if the first line is empty
      if (node.position?.start.line !== paragraphNode.position?.start.line) {
        return;
      }

      const calloutTypeTextNode = paragraphNode.children.at(0);
      if (calloutTypeTextNode == null || calloutTypeTextNode.type !== "text") {
        return;
      }

      // Parse callout syntax
      // e.g. "[!note] title"
      const [calloutTypeText, ...calloutBodyText] =
        calloutTypeTextNode.value.split("\n");
      const calloutData = parseCallout(calloutTypeText);
      if (calloutData == null) return;
      if (
        options.callouts != null &&
        !options.callouts.includes(calloutData.type)
      ) {
        const newCallout = options.onUnknownCallout(calloutData, file);
        if (newCallout == null) return;

        calloutData.type = newCallout.type;
        calloutData.isFoldable = newCallout.isFoldable;
        if (newCallout.title != null) {
          calloutData.title = newCallout.title;
        }
      }

      // Generate callout root node
      node.data = {
        ...node.data,
        hName: options.root(calloutData).tagName,
        hProperties: {
          // @ts-ignore error TS2339: Property 'hProperties' does not exist on type 'BlockquoteData'.
          ...node.data?.hProperties,
          ...options.root(calloutData).properties,
        },
      };

      // Generate callout body node
      const bodyNode: (mdast.BlockContent | mdast.DefinitionContent)[] = [
        {
          type: "paragraph",
          children: [],
        },
        ...node.children.splice(1),
      ];
      if (bodyNode[0].type !== "paragraph") return; // type check
      if (calloutBodyText.length > 0) {
        bodyNode[0].children.push({
          type: "text",
          value: calloutBodyText.join("\n"),
        });
      }

      // Generate callout title node
      const titleNode: mdast.Paragraph = {
        type: "paragraph",
        data: {
          hName: options.title(calloutData).tagName,
          hProperties: {
            ...options.title(calloutData).properties,
          },
        },
        children: [],
      };
      const iconNode = options.icon(calloutData);
      if (iconNode != null) {
        titleNode.children.push(toHtml(iconNode));
      }
      if (calloutData.title != null) {
        titleNode.children.push({
          type: "text",
          value: calloutData.title,
        });
      }
      if (calloutBodyText.length <= 0) {
        for (const [i, child] of paragraphNode.children.slice(1).entries()) {
          // All inline node before the line break is added as callout title
          if (child.type !== "text") {
            titleNode.children.push(child);
            continue;
          }

          // Add the part before the line break as callout title and the part after as callout body
          const [titleText, ...bodyTextLines] = child.value.split("\n");
          if (titleText) {
            // Add the part before the line break as callout title
            titleNode.children.push({
              type: "text",
              value: titleText,
            });
          }
          if (bodyTextLines.length > 0) {
            // Add the part after the line break as callout body
            if (bodyNode[0].type !== "paragraph") return;
            bodyNode[0].children.push({
              type: "text",
              value: bodyTextLines.join("\n"),
            });
            // Add all nodes after the current node as callout body
            bodyNode[0].children.push(...paragraphNode.children.slice(i + 2));
            break;
          }
        }
      } else {
        // Add all nodes after the current node as callout body
        bodyNode[0].children.push(...paragraphNode.children.slice(1));
      }

      // Add body and title to callout root node children
      node.children = [
        titleNode,
        {
          type: "blockquote",
          data: {
            hName: options.body(calloutData).tagName,
            hProperties: {
              ...options.body(calloutData).properties,
            },
          },
          children: bodyNode,
        },
      ];
    });
  };
};

export type Callout = {
  /**
   * The type of the callout.
   */
  type: string;

  /**
   * Whether the callout is foldable.
   */
  isFoldable: boolean;

  /**
   * Whether the callout is folded by default.
   */
  defaultFolded?: boolean;

  /**
   * The title of the callout.
   */
  title?: string;
};

/**
 * @example
 * ```
 * const callout = parseCallout("[!info]");  // { type: "info", isFoldable: false, title: undefined }
 * const callout = parseCallout("[!info");   // undefined
 * ```
 */
export const parseCallout = (
  text: string | null | undefined,
): Callout | undefined => {
  if (text == null) return;

  const match = text.match(
    /^\[!(?<type>[^\]]+)?\](?<isFoldable>[+-])?(?: (?<title>.*))?$/,
  );
  if (match?.groups?.type == null) return undefined;

  const callout: Callout = {
    type: match.groups.type,
    isFoldable: match.groups.isFoldable != null,
  };

  if (match.groups.isFoldable != null) {
    callout.defaultFolded = match.groups.isFoldable === "-";
  }

  if (match.groups.title != null) {
    callout.title = match.groups.title;
  } else {
    callout.title = capitalize(callout.type);
  }

  return callout;
};

export const toHtml = (
  from: WithChildren<NodeOptions>,
): mdast.PhrasingContent => {
  if (typeof from === "string") {
    return {
      type: "html",
      value: from,
    };
  }
  if (typeof from.children === "string") {
    return {
      type: "html",
      data: {
        hName: from.tagName,
        hProperties: from.properties,
      },
      value: from.children,
    };
  }
  return {
    type: "html",
    data: {
      hName: from.tagName,
      hProperties: from.properties,
      hChildren: from.children,
    },
    value: "",
  };
};

function capitalize(word: string): string {
  if (word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
