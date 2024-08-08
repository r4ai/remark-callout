import metadata from "@/lib/metadata"
import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef, FC } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export type FileNode = {
  type: "file"
  slug: string
  title: string
}

export type DirectoryNode = {
  type: "directory"
  slug: string
  title: string
  children: Node[]
}

export type Node = FileNode | DirectoryNode

export type NavSideBarProps = ComponentPropsWithoutRef<"div"> & {
  entries: Node[]
  activeSlug: string
}

export const NavSideBar: FC<NavSideBarProps> = ({ className, entries, activeSlug, ...props }) => {
  return (
    <div>
      <div className={cn("sticky top-[calc(3.5rem+1px)] hidden w-56 flex-col gap-3 p-4 md:flex", className)} {...props}>
        <span className="inline-block w-full border-b pb-2 font-bold">Documentation</span>
        <nav>
          <Nodes nodes={entries} activeSlug={activeSlug} nested={false} />
        </nav>
      </div>
    </div>
  )
}

export type NodesProps = ComponentPropsWithoutRef<"div"> & {
  nodes: Node[]
  activeSlug: string
  nested: boolean
}

export const Nodes: FC<NodesProps> = ({ nodes, activeSlug, nested, ...props }) => {
  return (
    <div {...props}>
      {nodes.map((node) =>
        node.type === "directory" ? (
          <Directory key={node.slug} node={node} activeSlug={activeSlug} nested={nested} />
        ) : (
          <File key={node.slug} node={node} activeSlug={activeSlug} nested={nested} />
        ),
      )}
    </div>
  )
}

type FileProps = ComponentPropsWithoutRef<"a"> & {
  node: Node & { type: "file" }
  activeSlug: string
  nested: boolean
}

const File: FC<FileProps> = ({ className, node, activeSlug, nested, ...props }) => {
  return (
    <a
      href={`${metadata.base}${node.slug}`}
      data-active={node.slug === activeSlug}
      className={cn(
        "my-0 block w-full truncate py-1.5 text-muted-foreground transition data-[active=true]:font-bold data-[active=true]:text-foreground hover:text-foreground",
        nested && "ml-1 border-l pl-4",
        className,
      )}
      {...props}
    >
      {node.title}
    </a>
  )
}

type DirectoryProps = {
  node: Node & { type: "directory" }
  activeSlug: string
  nested: boolean
}

const Directory: FC<DirectoryProps> = ({ node, activeSlug, nested }) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={has(node.children, activeSlug) ? node.title : undefined}
      className={cn(nested && "ml-1 border-l pl-4")}
    >
      <AccordionItem className="border-b-0" value={node.title}>
        <AccordionTrigger className="py-1.5 text-muted-foreground hover:text-foreground hover:no-underline">
          {node.title}
        </AccordionTrigger>
        <AccordionContent className="pb-1.5 text-base">
          <Nodes nodes={node.children} activeSlug={activeSlug} nested />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const has = (nodes: Node[], activeSlug: string) => {
  for (const node of nodes) {
    if (node.type === "file" && node.slug === activeSlug) {
      return true
    }
    if (node.type === "directory" && has(node.children, activeSlug)) {
      return true
    }
  }
  return false
}
