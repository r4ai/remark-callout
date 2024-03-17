import { cn, tw } from "@/lib/utils"
import { ChevronDownIcon, ChevronRightIcon, Pencil1Icon, RocketIcon } from "@radix-ui/react-icons"
import type { FC, ReactNode } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

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
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    className: {
      root: tw``,
      title: tw``,
    },
  },
  theorem: {
    label: "Theorem",
    icon: <RocketIcon className="size-5 shrink-0" />,
    className: {
      root: tw`bg-purple-500/10 border-purple-600/20 dark:border-purple-800/20`,
      title: tw`text-purple-600 dark:text-purple-400`,
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
      <CalloutTitle className={callout.className.title} type={type} isFoldable={isFoldable}>
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

export const CalloutRoot: FC<CalloutRootProps> = ({ children, className, type, isFoldable, defaultFolded }) => {
  const callout = getCallout(type)

  return (
    <Collapsible
      defaultOpen={!defaultFolded}
      disabled={!isFoldable}
      className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", callout.className.root, className)}
    >
      {children}
    </Collapsible>
  )
}

export type CalloutTitleProps = {
  type: keyof typeof callouts
  className?: string
  children?: ReactNode
  isFoldable: boolean
}

export const CalloutTitle: FC<CalloutTitleProps> = ({ type, isFoldable, children }) => {
  const callout = getCallout(type)

  return (
    <CollapsibleTrigger
      className={cn("group flex flex-row items-center gap-2 text-lg font-bold", callout.className.title)}
    >
      {callout.icon}
      <div>{children ?? callout.label}</div>
      {isFoldable && (
        <ChevronRightIcon className="ml-auto size-5 shrink-0 transition-transform group-data-[state=open]:rotate-90" />
      )}
    </CollapsibleTrigger>
  )
}

export type CalloutBodyProps = {
  className?: string
  children: ReactNode
}

export const CalloutBody: FC<CalloutBodyProps> = ({ children }) => {
  return <CollapsibleContent>{children}</CollapsibleContent>
}
