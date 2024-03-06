import type * as mdast from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const remarkCallout: Plugin<[], mdast.Root> = () => {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const paragraphNode = node.children[0];
      if (paragraphNode.type !== "paragraph") return;

      const calloutTypeTextNode = paragraphNode.children[0];
      if (calloutTypeTextNode.type !== "text") return;

      // Parse callout syntax
      // e.g. "[!note] title"
      const [calloutTypeText, ...calloutBodyText] =
        calloutTypeTextNode.value.split("\n");
      const calloutData = parseCallout(calloutTypeText);
      if (calloutData == null) return;

      // Generate callout root node
      node.data = {
        ...node.data,
        hName: "callout",
        hProperties: {
          calloutType: calloutData.type,
          calloutIsFoldable: String(calloutData.isFoldable),
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
          hName: "callout-title",
          hProperties: {
            calloutType: calloutData.type,
          },
        },
        children: [],
      };
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
      node.children = [titleNode, ...bodyNode];
    });
  };
};

export type Callout = {
  type: string;
  isFoldable: boolean;
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
    /^\[!(?<type>.+?)\](?<isFoldable>-)?\s?(?<title>.+)?$/,
  );
  if (match?.groups?.type == null) return undefined;

  return {
    type: match.groups.type,
    isFoldable: match.groups.isFoldable != null,
    title: match.groups.title,
  };
};
