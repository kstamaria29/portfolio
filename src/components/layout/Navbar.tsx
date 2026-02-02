import { profile } from "../../content/profile";
import { site } from "../../content/site";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { Container } from "./Container";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/75 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] rounded-md bg-white px-3 py-2 text-sm text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="font-semibold tracking-tight text-zinc-900 no-underline hover:underline dark:text-zinc-50"
          >
            {profile.name}
          </a>
          <span className="hidden text-sm text-zinc-600 dark:text-zinc-400 sm:inline">
            {profile.title}
          </span>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-medium text-zinc-700 no-underline hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <a
              href="#projects"
              className={cn(
                "rounded-md border border-zinc-200/70 bg-white px-3 py-2 text-sm font-medium text-zinc-800 no-underline",
                "hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10",
              )}
            >
              Projects
            </a>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </Button>
        </div>
      </Container>
    </header>
  );
}
