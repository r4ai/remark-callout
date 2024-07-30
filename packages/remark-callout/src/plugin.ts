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
   * The icon node is added in the title node before the title text.
   *
   * - If `undefined`, no icon is added.
   * - If a `string`, the string is added as HTML in the title node before the title text.
   * - If a `object`, the object is added as a node before the title text.
   *
   * @example
   * () => '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>' // lucide:pencil
   *
   * @example
   * (callout) => ({
   *   tagName: "div",
   *   properties: {
   *     className: "callout-icon",
   *   },
   *   children:
   *     callout.type === "warn"
   *       ? '<svg class="lucide-circle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' // lucide:circle-alert
   *       : '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>', // lucide:pencil
   * })
   *
   * @default
   * () => undefined
   */
  icon?: Optional<WithChildren<N>>;

  /**
   * The fold icon node of the callout.
   *
   * The fold icon node is added in the title node after the title text.
   *
   * - If `undefined`, no fold icon is added.
   * - If a `string`, the string is added as HTML in the title node after the title text.
   * - If a `object`, the object is added as a node after the title text.
   *
   * @example
   * (callout) =>
   *   callout.isFoldable
   *     ? {
   *         tagName: "div",
   *         properties: {
   *           className: "callout-fold-icon",
   *         },
   *         children:
   *           '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>', // lucide:chevron-right
   *       }
   *     : undefined,
   *
   * @default
   * () => undefined
   */
  foldIcon?: Optional<WithChildren<N>>;

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
   * The HTML properties of the node.
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
          /**
           * The HTML children of the node.
           *
           * - If a `string`, the string is added as raw HTML in the node.
           * - If a `object[]`, the object array is added as a hast node.
           *
           * @see https://github.com/syntax-tree/mdast?tab=readme-ov-file#html
           * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#element
           *
           * @example '<span class="icon">📝</span>'
           *
           * @example
           * [
           *   {
           *     type: "element",
           *     tagName: "span",
           *     properties: { className: ["icon"] },
           *     children: [
           *       {
           *         type: "text",
           *         value: "📝",
           *       },
           *     ],
           *   }
           * ]
           */
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
      dataCalloutType: formatForAttribute(callout.type),
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
  foldIcon: () => undefined,
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
        ["root", "title", "body", "icon", "foldIcon"].includes(key) &&
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
        // Add icon node before the title text
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

      const foldIconNode = options.foldIcon(calloutData);
      if (foldIconNode != null) {
        // Add fold icon node after the title text
        titleNode.children.push(toHtml(foldIconNode));
      }

      // Add body and title to callout root node children
      node.children = [titleNode];
      if (bodyNode.length > 1 || bodyNode[0].children.length > 0) {
        node.children.push({
          type: "blockquote",
          data: {
            hName: options.body(calloutData).tagName,
            hProperties: {
              ...options.body(calloutData).properties,
            },
          },
          children: bodyNode,
        });
      }
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

export function formatForAttribute(rawString: string) {
  return rawString.replace(/\s+/g, "-").toLowerCase();
}
