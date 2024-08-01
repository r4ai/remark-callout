import { Button, type ButtonProps } from "@/components/ui/button"
import meta from "@/lib/metadata"
import { cn } from "@/lib/utils"
import { GitHubLogoIcon, HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { type FC, type ReactNode, useEffect, useState } from "react"
import { Nodes } from "./NavSideBar"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

type HeaderProps = {
  className?: string
  activeSlug: string
}

export const Header: FC<HeaderProps> = ({ activeSlug }) => {
  return (
    <TooltipProvider>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl flex-row items-center justify-between">
          <nav className="flex flex-row gap-4">
            <div className="md:hidden">
              <NavDrawer activeSlug={activeSlug} />
            </div>
            <ul className="hidden flex-row items-center gap-4 sm:flex">
              <li>
                <Button variant="ghost" className="font-bold" asChild>
                  <a href={meta.base}>{meta.name}</a>
                </Button>
              </li>
              {meta.entries.slice(1).map((entry) => (
                <li key={entry.slug}>
                  <a
                    href={`${meta.base}${entry.slug}`}
                    className={cn(
                      "text-muted-foreground transition hover:text-foreground",
                      activeSlug.startsWith(entry.slug) && "font-medium text-foreground",
                    )}
                  >
                    {entry.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-row">
            <IconButton tooltip="GitHub">
              <a href={meta.repository.url.href}>
                <GitHubLogoIcon className="size-5" />
              </a>
            </IconButton>
            <ToggleThemeButton />
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}

type NavDrawerProps = {
  activeSlug: string
}

const NavDrawer: FC<NavDrawerProps> = ({ activeSlug }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4">
          <DrawerHeader>
            <DrawerTitle className="text-center">{meta.name}</DrawerTitle>
            <DrawerDescription className="text-center">{meta.description}</DrawerDescription>
          </DrawerHeader>
          <nav>
            <Nodes className="mx-auto max-w-sm px-8" nodes={meta.entries} activeSlug={activeSlug} nested={false} />
          </nav>
          <DrawerFooter>
            <div className="ml-auto flex flex-row">
              <Button variant="ghost" asChild>
                <a href={meta.repository.url.href}>
                  <span className="mr-2">GitHub</span>
                  <GitHubLogoIcon className="size-5" />
                </a>
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const IconButton: FC<ButtonProps & { tooltip?: ReactNode }> = ({ children, tooltip, ...props }) => {
  return tooltip == null ? (
    <Button {...props}>{children}</Button>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

const ToggleThemeButton: FC = () => {
  const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined)

  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark"
    switch (savedTheme) {
      case "light":
        return "light"
      case "dark":
        return "dark"
      default:
        return null
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const savedTheme = getSavedTheme()
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

    if (savedTheme != null) setTheme(savedTheme)
    else setTheme(systemTheme)
  }, [])

  useEffect(() => {
    if (theme == null) return
    localStorage.setItem("theme", theme)
    document.documentElement.classList.remove(theme === "light" ? "dark" : "light")
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <IconButton
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
      }}
      tooltip={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </IconButton>
  )
}
