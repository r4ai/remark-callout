import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GitHubLogoIcon, HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useState, type FC, type ReactNode, useEffect } from "react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

type Route = {
  label: string
  href: string
}

export const routes = {
  index: {
    label: "Home",
    href: "/",
  },
  docs: {
    label: "Docs",
    href: "/docs",
  },
  playground: {
    label: "Playground",
    href: "/playground",
  },
} as const satisfies Record<string, Route>

type HeaderProps = {
  className?: string
  route: (typeof routes)[keyof typeof routes]["href"]
}

export const Header: FC<HeaderProps> = ({ route }) => {
  return (
    <TooltipProvider>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl flex-row items-center justify-between">
          <nav className="hidden sm:block">
            <ul className="flex flex-row items-center gap-4">
              <li>
                <Button variant="ghost" className="font-bold" asChild>
                  <a href={routes.index.href}>@r4ai/remark-callout</a>
                </Button>
              </li>
              <li>
                <a
                  href={routes.docs.href}
                  className={cn(
                    "text-muted-foreground transition hover:text-foreground",
                    route === "/docs" && "font-medium text-foreground",
                  )}
                >
                  {routes.docs.label}
                </a>
              </li>
              <li>
                <a
                  href={routes.playground.href}
                  className={cn(
                    "text-muted-foreground transition hover:text-foreground",
                    route === "/playground" && "font-medium text-foreground",
                  )}
                >
                  {routes.playground.label}
                </a>
              </li>
            </ul>
          </nav>
          <div className="sm:hidden">
            <NavDrawer />
          </div>
          <div className="flex flex-row">
            <IconButton tooltip="GitHub">
              <a href="https://github.com/r4ai/remark-callout">
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

const NavDrawer: FC = () => {
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
            <DrawerTitle>@r4ai/remark-callout</DrawerTitle>
            <DrawerDescription>A remark plugin to add obsidian style callouts to markdown</DrawerDescription>
          </DrawerHeader>
          <nav>
            <ul className="mx-24 flex flex-col">
              {Object.values(routes).map((route, i) => (
                <li key={route.href}>
                  {i > 0 && <div className="h-[1px] w-full bg-border" />}
                  <a href={route.href} className="block py-2.5 text-left hover:underline">
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <DrawerFooter>
            <div className="ml-auto flex flex-row">
              <Button variant="ghost" asChild>
                <a href="https://github.com/r4ai/remark-callout">
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
  const [theme, setTheme] = useState<"light" | "dark">("light")

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

  // TODO: do this before rendering html to avoid flicker (priority: high)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const savedTheme = getSavedTheme()
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

    if (savedTheme != null) setTheme(savedTheme)
    else setTheme(systemTheme)
  }, [])

  useEffect(() => {
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
