import type { CollectionEntry } from "astro:content"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import metadata from "@/lib/metadata"
import type { FC } from "react"

export type _BreadcrumbProps = {
  entry: CollectionEntry<"docs">
}

export const DocsBreadcrumb: FC<_BreadcrumbProps> = ({ entry }) => {
  return (
    <Breadcrumb className="not-prose">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`${metadata.base}/docs/en`}>Docs</BreadcrumbLink>
        </BreadcrumbItem>
        {entry.slug
          .split("/")
          .splice(1)
          .map((slug, index, slugs) => (
            <>
              <BreadcrumbSeparator key={`sep-${slug}`} />
              <BreadcrumbItem key={`item-${slug}`}>
                {index < slugs.length - 1 ? (
                  pretty(slug)
                ) : (
                  <BreadcrumbLink href={`${metadata.base}/docs/en/${slugs.slice(0, index + 1).join("/")}`}>
                    {entry.data.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const pretty = (str: string) =>
  str
    .split("-")
    .map((s) => (s.at(0)?.toUpperCase() ?? "") + s.slice(1))
    .join(" ")
