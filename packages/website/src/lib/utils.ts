import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const tw = (strings: TemplateStringsArray, ...args: unknown[]) =>
  strings.reduce((acc, str, i) => acc + str + (args.at(i) ?? ""), "")
