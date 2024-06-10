import type { MDXComponents } from "mdx/types";
import {
  CalloutBody,
  CalloutRoot,
  CalloutTitle,
} from "./src/components/callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    "callout-root": CalloutRoot,
    "callout-title": CalloutTitle,
    "callout-body": CalloutBody,
    ...components,
  };
}
