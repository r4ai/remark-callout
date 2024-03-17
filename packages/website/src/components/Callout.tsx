import { cn, tw } from "@/lib/utils"
import { Pencil1Icon } from "@radix-ui/react-icons"
import type { FC, ReactNode } from "react"

type Callout = {
  label: string
  icon: ReactNode
  className: {
    root: string
    title: string
  }
}

export const callouts = {
  note: {
    label: "Note",
    icon: <Pencil1Icon className="size-5" />,
    className: {
      root: tw``,
      title: tw``,
    },
  },
} as const satisfies Record<string, Callout>

const getCallout = (type: keyof typeof callouts) => callouts[type] ?? callouts.note

export type CalloutProps = {
  type: keyof typeof callouts
  isFoldable: boolean
  defaultFolded?: boolean
  title?: ReactNode
  className?: string
  children: ReactNode
}

export const Callout: FC<CalloutProps> = ({ type, isFoldable, defaultFolded, title, children, className }) => {
  const callout = getCallout(type)

  return (
    <CalloutRoot
      className={cn(className, callout.className.root)}
      type={type}
      isFoldable={isFoldable}
      defaultFolded={defaultFolded}
    >
      <CalloutTitle className={callout.className.title} type={type}>
        {title}
      </CalloutTitle>
      <CalloutBody>{children}</CalloutBody>
    </CalloutRoot>
  )
}

export type CalloutRootProps = {
  type: keyof typeof callouts
  isFoldable: boolean
  defaultFolded?: boolean
  className?: string
  children: ReactNode
}

export const CalloutRoot: FC<CalloutRootProps> = ({ type, children, className }) => {
  const callout = getCallout(type)

  return (
    <div className={cn("flex flex-col gap-2 rounded-lg border bg-card p-4", callout.className.root, className)}>
      {children}
    </div>
  )
}

export type CalloutTitleProps = {
  type: keyof typeof callouts
  className?: string
  children?: ReactNode
}

export const CalloutTitle: FC<CalloutTitleProps> = ({ type, children }) => {
  const callout = getCallout(type)

  return (
    <div className={cn("flex flex-row items-center gap-2 text-lg font-bold", callout.className.title)}>
      {callout.icon}
      <span>{children ?? callout.label}</span>
    </div>
  )
}

export type CalloutBodyProps = {
  className?: string
  children: ReactNode
}

export const CalloutBody: FC<CalloutBodyProps> = ({ children }) => {
  return <div>{children}</div>
}
