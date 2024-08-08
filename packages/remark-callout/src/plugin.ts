import { defu } from "defu";
import type * as hast from "hast";
import type * as mdast from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

export type Options = {
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
  root?: NodeOptions | ((callout: Callout) => NodeOptions);

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
  title?: NodeOptions | ((callout: Callout) => NodeOptions);

  /**
   * The inner title node of the callout.
   *
   * This node is used to wrap the text content of the title.
   *
   * - If `undefined`, title text is not wrapped.
   *
   *   Example output:
   *
   *   ```html
   *   <div data-callout data-callout-type="abstract">
   *     <div data-callout-title>
   *       <div data-callout-icon>😎</div>
   *       Title
   *     </div>
   *   </div>
   *   ```
   *
   * - If a `object`, the object used as a node to wrap the title text.
   *
   *   Example output with options `{ tagName: "div", properties: { dataCalloutTitleInner: true } }`:
   *
   *   ```html
   *   <div data-callout data-callout-type="abstract">
   *     <div data-callout-title>
   *       <div data-callout-icon>😎</div>
   *       <div data-callout-title-inner>Title</div>
   *     </div>
   *   </div>
   *   ```
   *
   * @example
   * () => undefined  // the title text will not be wrapped
   *
   * @example
   * // the title text will be wrapped in a div with the class "callout-title-inner"
   * () => ({
   *   tagName: "div",
   *   properties: { className: "callout-title-inner" },
   * })
   *
   * @default
   * (callout, options) =>
   *   options.icon(callout) == null && options.foldIcon(callout) == null
   *     ? undefined
   *     : {
   *         tagName: "div",
   *         properties: {
   *           dataCalloutTitleInner: true,
   *         },
   *       },
   */
  titleInner?:
    | NodeOptions
    | undefined
    | ((
        callout: Callout,
        options: Required<Callable<Options>>,
      ) => NodeOptions | undefined);

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
  body?: NodeOptions | ((callout: Callout) => NodeOptions);

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
  icon?:
    | NodeOptionsWithChildren
    | string
    | undefined
    | ((callout: Callout) => NodeOptionsWithChildren | string | undefined);

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
  foldIcon?:
    | NodeOptionsWithChildren
    | string
    | undefined
    | ((callout: Callout) => NodeOptionsWithChildren | string | undefined);

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

export type NodeOptionsWithChildren = NodeOptions & {
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
};

// biome-ignore lint/suspicious/noExplicitAny: any is necessary for checking if T is a function
export type ExtractFunction<T> = Extract<T, (...args: any) => any>;

export type Callable<T> = {
  [P in keyof T]: ExtractFunction<T[P]> extends never
    ? T[P]
    : ExtractFunction<T[P]>;
};

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
  titleInner: (callout, options) =>
    options.icon(callout) == null && options.foldIcon(callout) == null
      ? undefined
      : {
          tagName: "div",
          properties: {
            dataCalloutTitleInner: true,
          },
        },
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
        ["root", "title", "titleInner", "body", "icon", "foldIcon"].includes(
          key,
        ) &&
        typeof value !== "function"
      ) {
        return [key, () => value];
      }

      return [key, value];
    }),
  ) as Required<Callable<Options>>;
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
      const titleNode: mdast.Blockquote | mdast.Paragraph = {
        type:
          options.titleInner(calloutData, options) == null
            ? "paragraph"
            : "blockquote",
        data: {
          hName: options.title(calloutData).tagName,
          hProperties: {
            ...options.title(calloutData).properties,
          },
        },
        children: [],
      };

      // Add icon node before the title text
      const iconNode = options.icon(calloutData);
      if (iconNode != null) {
        titleNode.children.push(toHtml(iconNode));
      }

      // Add title text node
      const titleInnerNode: mdast.Paragraph = {
        type: "paragraph",
        data: {
          hName: options.titleInner(calloutData, options)?.tagName,
          hProperties: options.titleInner(calloutData, options)?.properties,
        },
        children: [],
      };
      if (calloutData.title != null) {
        titleInnerNode.children.push({
          type: "text",
          value: calloutData.title,
        });
      }
      if (calloutBodyText.length <= 0) {
        for (const [i, child] of paragraphNode.children.slice(1).entries()) {
          // Add all nodes after the break as callout body
          if (child.type === "break") {
            titleInnerNode.children.push(child); // Add the line break as callout title
            bodyNode[0].children.push(
              ...paragraphNode.children.slice(i + 1 + 1),
            ); // +1 for the callout type node, +1 for the break
            break;
          }

          // All inline node before the line break is added as callout title
          if (child.type !== "text") {
            titleInnerNode.children.push(child);
            continue;
          }

          // Add the part before the line break as callout title and the part after as callout body
          const [titleText, ...bodyTextLines] = child.value.split("\n");
          if (titleText) {
            // Add the part before the line break as callout title
            titleInnerNode.children.push({
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
      if (titleNode.type === "paragraph")
        titleNode.children.push(...titleInnerNode.children);
      else titleNode.children.push(titleInnerNode);

      // Add fold icon node after the title text
      const foldIconNode = options.foldIcon(calloutData);
      if (foldIconNode != null) {
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

export const toHtml = (from: NodeOptionsWithChildren | string): mdast.Html => {
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
