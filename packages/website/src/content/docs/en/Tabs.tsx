import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FC, ReactNode } from "react"

export type TabsProps = {
  [key: string]: ReactNode
  children?: ReactNode
  defaultValue: string
}

export const Tabs: FC<TabsProps> = ({ defaultValue, children, ...props }) => {
  const keys = Object.keys(props).sort()
  return (
    <ShadcnTabs defaultValue={defaultValue} className="mx-auto max-w-screen-md">
      <TabsList>
        {keys.map((key) => (
          <TabsTrigger key={key} value={key}>
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
      {keys.map((key) => (
        <TabsContent key={key} value={key}>
          {props[key]}
        </TabsContent>
      ))}
    </ShadcnTabs>
  )
}
