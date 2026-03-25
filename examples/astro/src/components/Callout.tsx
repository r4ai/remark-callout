import {
  CheckIcon,
  ChevronRightIcon,
  DrawingPinIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Pencil1Icon,
  QuestionMarkIcon,
  RocketIcon,
} from "@radix-ui/react-icons"
import type { FC, ReactNode } from "react"

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

type CalloutConfig = {
  label: string
  icon: ReactNode
  rootClass: string
  titleClass: string
}

const callouts: Record<string, CalloutConfig> = {
  note: {
    label: "Note",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    rootClass: "bg-blue-500/10 border-blue-600/20 dark:border-blue-800/20",
    titleClass: "text-blue-600 dark:text-blue-400",
  },
  info: {
    label: "Info",
    icon: <InfoCircledIcon className="size-5 shrink-0" />,
    rootClass: "bg-blue-500/10 border-blue-600/20 dark:border-blue-800/20",
    titleClass: "text-blue-600 dark:text-blue-400",
  },
  abstract: {
    label: "Abstract",
    icon: <RocketIcon className="size-5 shrink-0" />,
    rootClass: "bg-purple-500/10 border-purple-600/20 dark:border-purple-800/20",
    titleClass: "text-purple-600 dark:text-purple-400",
  },
  tip: {
    label: "Tip",
    icon: <RocketIcon className="size-5 shrink-0" />,
    rootClass: "bg-cyan-500/10 border-cyan-600/20 dark:border-cyan-800/20",
    titleClass: "text-cyan-600 dark:text-cyan-400",
  },
  important: {
    label: "Important",
    icon: <DrawingPinIcon className="size-5 shrink-0" />,
    rootClass: "bg-purple-500/10 border-purple-600/20 dark:border-purple-800/20",
    titleClass: "text-purple-600 dark:text-purple-400",
  },
  success: {
    label: "Success",
    icon: <CheckIcon className="size-5 shrink-0" />,
    rootClass: "bg-green-500/10 border-green-600/20 dark:border-green-800/20",
    titleClass: "text-green-600 dark:text-green-400",
  },
  question: {
    label: "Question",
    icon: <QuestionMarkIcon className="size-5 shrink-0" />,
    rootClass: "bg-yellow-500/10 border-yellow-600/20 dark:border-yellow-800/20",
    titleClass: "text-yellow-600 dark:text-yellow-400",
  },
  warning: {
    label: "Warning",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: "bg-orange-500/10 border-orange-600/20 dark:border-orange-800/20",
    titleClass: "text-orange-600 dark:text-orange-400",
  },
  caution: {
    label: "Caution",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: "bg-red-500/10 border-red-600/20 dark:border-red-800/20",
    titleClass: "text-red-600 dark:text-red-400",
  },
  danger: {
    label: "Danger",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: "bg-red-500/10 border-red-600/20 dark:border-red-800/20",
    titleClass: "text-red-600 dark:text-red-400",
  },
  failure: {
    label: "Failure",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: "bg-red-500/10 border-red-600/20 dark:border-red-800/20",
    titleClass: "text-red-600 dark:text-red-400",
  },
  bug: {
    label: "Bug",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: "bg-red-500/10 border-red-600/20 dark:border-red-800/20",
    titleClass: "text-red-600 dark:text-red-400",
  },
  example: {
    label: "Example",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    rootClass: "bg-purple-500/10 border-purple-600/20 dark:border-purple-800/20",
    titleClass: "text-purple-600 dark:text-purple-400",
  },
  quote: {
    label: "Quote",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    rootClass: "bg-zinc-500/10 border-zinc-600/20 dark:border-zinc-800/20",
    titleClass: "text-zinc-600 dark:text-zinc-400",
  },
}

const getCallout = (type: string): CalloutConfig =>
  callouts[type.toLowerCase()] ?? callouts.note

// ----------------------------------------
// CalloutRoot
// ----------------------------------------

export type CalloutRootProps = {
  type: string
  isFoldable: "true" | "false"
  defaultFolded?: "true" | "false"
  className?: string
  children?: ReactNode
}

export const CalloutRoot: FC<CalloutRootProps> = ({
  children,
  className,
  type,
  isFoldable: isFoldableStr,
  defaultFolded: defaultFoldedStr,
}) => {
  const config = getCallout(type)
  const isFoldable = isFoldableStr === "true"
  const defaultFolded = defaultFoldedStr === "true"

  const sharedClass = cn(
    "group/root my-6 rounded-lg border p-4",
    config.rootClass,
    className,
  )

  return isFoldable ? (
    <details open={!defaultFolded} className={sharedClass}>
      {children}
    </details>
  ) : (
    <div className={sharedClass}>{children}</div>
  )
}

// ----------------------------------------
// CalloutTitle
// ----------------------------------------

export type CalloutTitleProps = {
  type: string
  isFoldable: "true" | "false"
  className?: string
  children?: ReactNode
}

export const CalloutTitle: FC<CalloutTitleProps> = ({
  type,
  isFoldable: isFoldableStr,
  children,
}) => {
  const config = getCallout(type)
  const isFoldable = isFoldableStr === "true"

  const sharedClass = cn(
    "flex flex-row items-center gap-2 font-bold",
    config.titleClass,
  )

  return isFoldable ? (
    <summary className={sharedClass}>
      {config.icon}
      <span>{children ?? config.label}</span>
      <ChevronRightIcon className="ml-auto size-5 shrink-0 transition-transform group-open/root:rotate-90" />
    </summary>
  ) : (
    <div className={sharedClass}>
      {config.icon}
      <span>{children ?? config.label}</span>
    </div>
  )
}

// ----------------------------------------
// CalloutBody
// ----------------------------------------

export type CalloutBodyProps = {
  className?: string
  children?: ReactNode
}

export const CalloutBody: FC<CalloutBodyProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mt-2 flex flex-col gap-2",
        "prose-headings:my-0 prose-p:my-0 prose-blockquote:my-0 prose-pre:my-0 prose-ol:my-0 prose-ul:my-0",
        className,
      )}
    >
      {children}
    </div>
  )
}
