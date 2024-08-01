import { cn } from "@/lib/utils"
import type { MarkdownHeading } from "astro"
import { type ComponentPropsWithoutRef, type FC, useEffect } from "react"
import { tv } from "tailwind-variants"

export type TOCProps = ComponentPropsWithoutRef<"div"> & {
  headings: MarkdownHeading[]
}

export const TOC: FC<TOCProps> = ({ headings, className, ...props }) => {
  useEffect(() => {
    let activeTocItem: Element | null = null
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.reduce((prev, current) =>
        current.intersectionRatio > prev.intersectionRatio ? current : prev,
      )
      if (entry.intersectionRatio > 0) {
        const toActivateTocItem = document.querySelector(`a[href="#${entry.target.id}"]`)
        activeTocItem?.setAttribute("data-active", "false")
        toActivateTocItem?.setAttribute("data-active", "true")
        activeTocItem = toActivateTocItem
      }
    })
    for (const headingElm of document.querySelectorAll("h2[id], h3[id], h4[id], h5[id]")) {
      observer.observe(headingElm)
    }
  }, [])

  return (
    <div>
      <div
        className={cn("sticky top-[calc(3.5rem+1px)] mx-8 hidden min-w-56 flex-col gap-4 xl:flex", className)}
        {...props}
      >
        <span className="mt-6 font-bold">On this page</span>
        <ul className="flex flex-col gap-1">
          {headings.map((heading) => (
            <TOCItem key={heading.slug} heading={heading} />
          ))}
        </ul>
      </div>
    </div>
  )
}

type TOCItemProps = ComponentPropsWithoutRef<"a"> & {
  heading: MarkdownHeading
}

const TOCItem: FC<TOCItemProps> = ({ heading, className, ...props }) => {
  return (
    <li>
      <a
        data-active="false"
        className={tocItem({
          depth: Math.max(1, Math.min(heading.depth, 5)) as 1 | 2 | 3 | 4 | 5,
          className,
        })}
        href={`#${heading.slug}`}
        {...props}
      >
        {heading.text}
      </a>
    </li>
  )
}

const tocItem = tv({
  base: "text-muted-foreground data-[active=true]:text-foreground",
  variants: {
    depth: {
      1: "ml-0",
      2: "ml-0",
      3: "ml-4",
      4: "ml-8",
      5: "ml-12",
    },
  },
})
