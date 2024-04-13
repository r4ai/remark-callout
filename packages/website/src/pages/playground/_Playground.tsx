import { useState, type FC, useMemo, type ReactNode, useEffect } from "react"
import Editor from "@monaco-editor/react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkCallout, { defaultOptions } from "@r4ai/remark-callout"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import { cn } from "@/lib/utils"
import * as prettier from "prettier/standalone"
import prettierPluginHtml from "prettier/plugins/html"
import { codeToHtml } from "shiki/bundle/web"
import dedent from "dedent"
import "./_callout.css"

type PlaygroundProps = {
  highlightedCss: string
}

export const Playground: FC<PlaygroundProps> = ({ highlightedCss }) => {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const html = useMemo(() => {
    try {
      return render(markdown)
    } catch (e) {
      return e instanceof Error ? `<pre>${[e.name, e.message, e.stack].join("\n")}</pre>` : String(e)
    }
  }, [markdown])
  const [highlightedHtml, setHighlightedHtml] = useState("")

  useEffect(() => {
    const highlightHtml = async () => {
      const formatted = await prettier.format(html, {
        parser: "html",
        plugins: [prettierPluginHtml],
      })
      const highlighted = await codeToHtml(formatted, {
        lang: "html",
        themes: {
          light: "github-light",
          dark: "one-dark-pro",
        },
      })
      setHighlightedHtml(highlighted)
    }
    highlightHtml()
  }, [html])

  return (
    <div className="grid grow grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
      <Tab
        defaultTab="Markdown"
        tabs={{
          Markdown: (
            <Editor
              height="100%"
              defaultLanguage="markdown"
              theme="vs-dark"
              value={markdown}
              onChange={(value) => value && setMarkdown(value)}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
          ),
        }}
      />
      <Tab
        defaultTab="Preview"
        tabs={{
          HTML: (
            <div
              className="h-full py-2 text-sm"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ),
          // biome-ignore lint/security/noDangerouslySetInnerHtml: safe
          CSS: <div className="h-full py-2 text-sm" dangerouslySetInnerHTML={{ __html: highlightedCss }} />,
          Preview: (
            <div
              className="prose h-full w-full px-4 py-2 dark:prose-invert"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ),
        }}
      />
    </div>
  )
}

type TabProps = {
  defaultTab: string
  tabs: Record<string, ReactNode>
}

const Tab: FC<TabProps> = ({ tabs, defaultTab }) => {
  const [tab, setTab] = useState<keyof typeof tabs>(defaultTab)

  return (
    <div className="flex h-0 min-h-full flex-col overflow-auto">
      <div className="mx-6 flex h-10 flex-row items-center gap-6">
        {Object.keys(tabs).map((key) => (
          <div
            key={key}
            className={cn(
              "flex h-full items-center border-b-[3px] border-transparent text-muted-foreground hover:text-foreground",
              key === tab && "border-zinc-500 text-foreground",
            )}
          >
            <button type="button" onClick={() => setTab(key)}>
              {key}
            </button>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "h-full grow overflow-auto border bg-zinc-50 dark:bg-zinc-900/75",
          "scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-200 hover:scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 hover:dark:scrollbar-thumb-zinc-700/60",
        )}
      >
        {tabs[tab]}
      </div>
    </div>
  )
}

const render = (html: string) =>
  unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkCallout)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .processSync(html)
    .toString()

const defaultMarkdown = dedent`
  > [!note]
  > Lorem ipsum dolor sit amet

  > [!abstract]
  > Lorem ipsum dolor sit amet

  > [!summary]
  > Lorem ipsum dolor sit amet

  > [!tldr]
  > Lorem ipsum dolor sit amet

  > [!info]
  > Lorem ipsum dolor sit amet

  > [!todo]
  > Lorem ipsum dolor sit amet

  > [!tip]
  > Lorem ipsum dolor sit amet

  > [!hint]
  > Lorem ipsum dolor sit amet

  > [!important]
  > Lorem ipsum dolor sit amet

  > [!success]
  > Lorem ipsum dolor sit amet

  > [!check]
  > Lorem ipsum dolor sit amet

  > [!done]
  > Lorem ipsum dolor sit amet

  > [!question]
  > Lorem ipsum dolor sit amet

  > [!help]
  > Lorem ipsum dolor sit amet

  > [!faq]
  > Lorem ipsum dolor sit amet

  > [!warning]
  > Lorem ipsum dolor sit amet

  > [!caution]
  > Lorem ipsum dolor sit amet

  > [!attention]
  > Lorem ipsum dolor sit amet

  > [!failure]
  > Lorem ipsum dolor sit amet

  > [!fail]
  > Lorem ipsum dolor sit amet

  > [!missing]
  > Lorem ipsum dolor sit amet

  > [!danger]
  > Lorem ipsum dolor sit amet

  > [!error]
  > Lorem ipsum dolor sit amet

  > [!bug]
  > Lorem ipsum dolor sit amet

  > [!example]
  > Lorem ipsum dolor sit amet

  > [!quote]
  > Lorem ipsum dolor sit amet

  > [!cite]
  > Lorem ipsum dolor sit amet
`
