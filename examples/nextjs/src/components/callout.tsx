import { cn, tw } from "@/libs/utils";
import {
  CheckIcon,
  ChevronRightIcon,
  DrawingPinIcon,
  ExclamationTriangleIcon,
  Pencil1Icon,
  QuestionMarkIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import type { FC, ReactNode } from "react";

type Callout = {
  label: string;
  icon: ReactNode;
  className: {
    root: string;
    title: string;
  };
};

export const callouts = {
  note: {
    label: "Note",
    icon: <Pencil1Icon className="size-5 shrink-0" />,
    className: {
      root: tw``,
      title: tw``,
    },
  },
  abstract: {
    label: "Abstract",
    icon: <RocketIcon className="size-5 shrink-0" />,
    className: {
      root: tw`bg-purple-500/10 border-purple-600/20 dark:border-purple-800/20`,
      title: tw`text-purple-600 dark:text-purple-400`,
    },
  },
  important: {
    label: "Important",
    icon: <DrawingPinIcon className="size-5 shrink-0" />,
    className: {
      root: tw`bg-purple-500/10 border-purple-600/20 dark:border-purple-800/20`,
      title: tw`text-purple-600 dark:text-purple-400`,
    },
  },
  success: {
    label: "Success",
    icon: <CheckIcon className="size-5 shrink-0" />,
    className: {
      root: tw`bg-green-500/10 border-green-600/20 dark:border-green-800/20`,
      title: tw`text-green-600 dark:text-green-400`,
    },
  },
  question: {
    label: "Question",
    icon: <QuestionMarkIcon className="size-5 shrink-0" />,
    className: {
      root: tw`bg-yellow-500/10 border-yellow-600/20 dark:border-yellow-800/20`,
      title: tw`text-yellow-600 dark:text-yellow-400`,
    },
  },
  caution: {
    label: "Caution",
    icon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
    className: {
      root: tw`bg-red-500/10 border-red-600/20 dark:border-red-800/20`,
      title: tw`text-red-600 dark:text-red-400`,
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
} as const satisfies Record<string, Callout>;

const getCallout = (type: keyof typeof callouts) =>
  callouts[type] ?? callouts.note;

export type CalloutProps = {
  type: keyof typeof callouts;
  isFoldable: boolean;
  defaultFolded?: boolean;
  title?: ReactNode;
  className?: string;
  children: ReactNode;
};

export const Callout: FC<CalloutProps> = ({
  type,
  isFoldable,
  defaultFolded,
  title,
  children,
  className,
}) => {
  const callout = getCallout(type);
  const isFoldableString = isFoldable.toString() as "true" | "false";
  const defaultFoldedString = defaultFolded?.toString() as
    | "true"
    | "false"
    | undefined;

  return (
    <CalloutRoot
      className={cn(className, callout.className.root)}
      type={type}
      isFoldable={isFoldableString}
      defaultFolded={defaultFoldedString}
    >
      <CalloutTitle
        className={callout.className.title}
        type={type}
        isFoldable={isFoldableString}
      >
        {title}
      </CalloutTitle>
      <CalloutBody>{children}</CalloutBody>
    </CalloutRoot>
  );
};

type DetailsProps = {
  isFoldable: boolean;
  defaultFolded?: boolean;
  children: ReactNode;
  className?: string;
};

const Details: FC<DetailsProps> = ({
  isFoldable,
  defaultFolded,
  children,
  ...props
}) => {
  return isFoldable ? (
    <details open={!defaultFolded} {...props}>
      {children}
    </details>
  ) : (
    <div {...props}>{children}</div>
  );
};

type SummaryProps = {
  isFoldable: boolean;
  children: ReactNode;
  className?: string;
};

const Summary: FC<SummaryProps> = ({ isFoldable, children, ...props }) => {
  return isFoldable ? (
    <summary {...props}>{children}</summary>
  ) : (
    <div {...props}>{children}</div>
  );
};

export type CalloutRootProps = {
  type: keyof typeof callouts;
  isFoldable: "true" | "false";
  defaultFolded?: "true" | "false";
  className?: string;
  children: ReactNode;
};

export const CalloutRoot: FC<CalloutRootProps> = ({
  children,
  className,
  type,
  isFoldable: isFoldableString,
  defaultFolded: defaultFoldedString,
}) => {
  const callout = getCallout(type);
  const isFoldable = isFoldableString === "true";
  const defaultFolded = defaultFoldedString === "true";

  return (
    <Details
      isFoldable={isFoldable}
      defaultFolded={defaultFolded}
      className={cn(
        "group/root my-6 rounded-lg border bg-card p-4",
        callout.className.root,
        className,
      )}
    >
      {children}
    </Details>
  );
};

export type CalloutTitleProps = {
  type: keyof typeof callouts;
  className?: string;
  children?: ReactNode;
  isFoldable: "true" | "false";
};

export const CalloutTitle: FC<CalloutTitleProps> = ({
  type,
  isFoldable: isFoldableString,
  children,
}) => {
  const callout = getCallout(type);
  const isFoldable = isFoldableString === "true";

  return (
    <Summary
      isFoldable={isFoldable}
      className={cn(
        "flex flex-row items-center gap-2 font-bold",
        callout.className.title,
      )}
    >
      {callout.icon}
      <div>{children ?? callout.label}</div>
      {isFoldable && (
        <ChevronRightIcon className="size-5 shrink-0 transition-transform group-open/root:rotate-90" />
      )}
    </Summary>
  );
};

export type CalloutBodyProps = {
  className?: string;
  children: ReactNode;
};

export const CalloutBody: FC<CalloutBodyProps> = ({ children }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mt-2",
        "prose-headings:my-0 prose-p:my-0 prose-blockquote:my-0 prose-pre:my-0 prose-ol:my-0 prose-ul:my-0",
      )}
    >
      {children}
    </div>
  );
};
