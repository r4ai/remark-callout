import { cn } from "@/lib/utils"
import type { FC, ReactNode } from "react"

type FeatureCardProps = {
  className?: string
  icon?: ReactNode
  title: ReactNode
  children: ReactNode
}

export const FeatureCard: FC<FeatureCardProps> = ({ className, title, children, icon }) => {
  return (
    <div className={cn("flex w-full max-w-md shrink-0 flex-col gap-2 rounded-lg border p-4 sm:w-52", className)}>
      <div className="flex size-12 items-center rounded-md bg-muted">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}
