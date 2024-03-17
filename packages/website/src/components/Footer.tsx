import { cn } from "@/lib/utils"
import type { FC } from "react"

type FooterProps = {
  className?: string
}

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("my-4 flex flex-col items-center gap-2 text-sm text-muted-foreground", { className })}>
      <div>Released under the MIT License</div>
      <div>Copyright © 2023-2024 Rai</div>
    </footer>
  )
}
