import {
  CheckIcon,
  ChevronRightIcon,
  DrawingPinIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Pencil1Icon,
  QuestionMarkIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import type { FC, ReactNode } from "react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

type CalloutConfig = {
  label: string;
  icon: ReactNode;
  rootClass: string;
  titleClass: string;
};

const warningRootClass =
  "bg-orange-500/10 border-orange-600/20 dark:border-orange-800/20";
const warningTitleClass = "text-orange-600 dark:text-orange-400";
const dangerRootClass =
  "bg-red-500/10 border-red-600/20 dark:border-red-800/20";
const dangerTitleClass = "text-red-600 dark:text-red-400";
const questionRootClass =
  "bg-yellow-500/10 border-yellow-600/20 dark:border-yellow-800/20";
const questionTitleClass = "text-yellow-600 dark:text-yellow-400";
const abstractRootClass =
  "bg-purple-500/10 border-purple-600/20 dark:border-purple-800/20";
const abstractTitleClass = "text-purple-600 dark:text-purple-400";
const tipRootClass =
  "bg-cyan-500/10 border-cyan-600/20 dark:border-cyan-800/20";
const tipTitleClass = "text-cyan-600 dark:text-cyan-400";
const noteRootClass =
  "bg-blue-500/10 border-blue-600/20 dark:border-blue-800/20";
const noteTitleClass = "text-blue-600 dark:text-blue-400";
const successRootClass =
  "bg-green-500/10 border-green-600/20 dark:border-green-800/20";
const successTitleClass = "text-green-600 dark:text-green-400";
const quoteRootClass =
  "bg-zinc-500/10 border-zinc-600/20 dark:border-zinc-800/20";
const quoteTitleClass = "text-zinc-600 dark:text-zinc-400";

const callouts: Record<string, CalloutConfig> = {
  note: {
    label: "Note",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    rootClass: noteRootClass,
    titleClass: noteTitleClass,
  },
  info: {
    label: "Info",
    icon: <InfoCircledIcon className="size-5 shrink-0" />,
    rootClass: noteRootClass,
    titleClass: noteTitleClass,
  },
  todo: {
    label: "ToDo",
    icon: <CheckIcon className="size-5 shrink-0" />,
    rootClass: noteRootClass,
    titleClass: noteTitleClass,
  },
  abstract: {
    label: "Abstract",
    icon: <RocketIcon className="size-5 shrink-0" />,
    rootClass: tipRootClass,
    titleClass: tipTitleClass,
  },
  summary: {
    label: "Summary",
    icon: <RocketIcon className="size-5 shrink-0" />,
    rootClass: tipRootClass,
    titleClass: tipTitleClass,
  },
  tldr: {
    label: "TL;DR",
    icon: <RocketIcon className="size-5 shrink-0" />,
    rootClass: tipRootClass,
    titleClass: tipTitleClass,
  },
  tip: {
    label: "Tip",
    icon: <RocketIcon className="size-5 shrink-0" />,
    rootClass: tipRootClass,
    titleClass: tipTitleClass,
  },
  hint: {
    label: "Hint",
    icon: <RocketIcon className="size-5 shrink-0" />,
    rootClass: tipRootClass,
    titleClass: tipTitleClass,
  },
  important: {
    label: "Important",
    icon: <DrawingPinIcon className="size-5 shrink-0" />,
    rootClass: abstractRootClass,
    titleClass: abstractTitleClass,
  },
  success: {
    label: "Success",
    icon: <CheckIcon className="size-5 shrink-0" />,
    rootClass: successRootClass,
    titleClass: successTitleClass,
  },
  check: {
    label: "Check",
    icon: <CheckIcon className="size-5 shrink-0" />,
    rootClass: successRootClass,
    titleClass: successTitleClass,
  },
  done: {
    label: "Done",
    icon: <CheckIcon className="size-5 shrink-0" />,
    rootClass: successRootClass,
    titleClass: successTitleClass,
  },
  question: {
    label: "Question",
    icon: <QuestionMarkIcon className="size-5 shrink-0" />,
    rootClass: questionRootClass,
    titleClass: questionTitleClass,
  },
  help: {
    label: "Help",
    icon: <QuestionMarkIcon className="size-5 shrink-0" />,
    rootClass: questionRootClass,
    titleClass: questionTitleClass,
  },
  faq: {
    label: "FAQ",
    icon: <QuestionMarkIcon className="size-5 shrink-0" />,
    rootClass: questionRootClass,
    titleClass: questionTitleClass,
  },
  warning: {
    label: "Warning",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: warningRootClass,
    titleClass: warningTitleClass,
  },
  caution: {
    label: "Caution",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: warningRootClass,
    titleClass: warningTitleClass,
  },
  attention: {
    label: "Attention",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: warningRootClass,
    titleClass: warningTitleClass,
  },
  danger: {
    label: "Danger",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: dangerRootClass,
    titleClass: dangerTitleClass,
  },
  error: {
    label: "Error",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: dangerRootClass,
    titleClass: dangerTitleClass,
  },
  failure: {
    label: "Failure",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: dangerRootClass,
    titleClass: dangerTitleClass,
  },
  fail: {
    label: "Fail",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: dangerRootClass,
    titleClass: dangerTitleClass,
  },
  missing: {
    label: "Missing",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: dangerRootClass,
    titleClass: dangerTitleClass,
  },
  bug: {
    label: "Bug",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    rootClass: dangerRootClass,
    titleClass: dangerTitleClass,
  },
  example: {
    label: "Example",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    rootClass: abstractRootClass,
    titleClass: abstractTitleClass,
  },
  quote: {
    label: "Quote",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    rootClass: quoteRootClass,
    titleClass: quoteTitleClass,
  },
  cite: {
    label: "Cite",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    rootClass: quoteRootClass,
    titleClass: quoteTitleClass,
  },
};

const getCallout = (type: string): CalloutConfig =>
  callouts[type.toLowerCase()] ?? callouts.note;

// ----------------------------------------
// CalloutRoot
// ----------------------------------------

export type CalloutRootProps = {
  type: string;
  isFoldable: "true" | "false";
  defaultFolded?: "true" | "false";
  className?: string;
  children?: ReactNode;
};

export const CalloutRoot: FC<CalloutRootProps> = ({
  children,
  className,
  type,
  isFoldable: isFoldableStr,
  defaultFolded: defaultFoldedStr,
}) => {
  const config = getCallout(type);
  const isFoldable = isFoldableStr === "true";
  const defaultFolded = defaultFoldedStr === "true";

  const sharedClass = cn(
    "group/root my-6 rounded-lg border p-4",
    config.rootClass,
    className,
  );

  return isFoldable ? (
    <details open={!defaultFolded} className={sharedClass}>
      {children}
    </details>
  ) : (
    <div className={sharedClass}>{children}</div>
  );
};

// ----------------------------------------
// CalloutTitle
// ----------------------------------------

export type CalloutTitleProps = {
  type: string;
  isFoldable: "true" | "false";
  className?: string;
  children?: ReactNode;
};

export const CalloutTitle: FC<CalloutTitleProps> = ({
  type,
  isFoldable: isFoldableStr,
  children,
}) => {
  const config = getCallout(type);
  const isFoldable = isFoldableStr === "true";

  const sharedClass = cn(
    "flex flex-row items-center gap-2 font-bold",
    config.titleClass,
  );

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
  );
};

// ----------------------------------------
// CalloutBody
// ----------------------------------------

export type CalloutBodyProps = {
  className?: string;
  children?: ReactNode;
};

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
  );
};
