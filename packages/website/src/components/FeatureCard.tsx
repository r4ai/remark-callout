import type { FC, ReactNode } from "react"
import { cn } from "@/lib/utils"

type FeatureCardProps = {
  className?: string
  icon?: ReactNode
  title: ReactNode
  children: ReactNode
}

export const FeatureCard: FC<FeatureCardProps> = ({ className, title, children, icon }) => {
  return (
    <div className={cn("flex w-52 flex-col gap-2 rounded-lg border p-4", className)}>
      <div className="flex size-12 items-center rounded-md bg-muted">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}
