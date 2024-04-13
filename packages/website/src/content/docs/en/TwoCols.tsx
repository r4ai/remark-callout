import { cn } from "@/lib/utils"
import type { FC, ReactNode } from "react"
import "./TwoCols.css"

type TwoColsProps = {
  className?: string
  left?: ReactNode
  right?: ReactNode
}

export const TwoCols: FC<TwoColsProps> = ({ className, left, right }) => {
  return (
    <div
      className={cn("my-6 grid !max-w-screen-lg grid-cols-1 items-start gap-6 sm:grid-cols-2", className)}
      data-two-cols
    >
      {left}
      {right}
    </div>
  )
}
