import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";

import { profile } from "../../content/profile";
import { site } from "../../content/site";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Container } from "./Container";

function MobileMenu() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    return () => {
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed right-4 top-4 z-55 inline-flex h-11 w-11 items-center justify-center rounded-2xl",
          "border border-zinc-200/70 bg-white/80 text-zinc-900 shadow-sm backdrop-blur",
          "dark:border-white/10 dark:bg-zinc-950/60 dark:text-zinc-50",
        )}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <Modal open={open} title="Menu" onClose={() => setOpen(false)}>
        <div className="space-y-5">
          <nav aria-label="Mobile">
            <ul className="grid gap-2">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border border-zinc-200/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 no-underline",
                      "hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10",
                    )}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="h-px bg-zinc-200/60 dark:bg-white/10" />

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Theme</p>
            <Button
              type="button"
              variant="secondary"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" aria-hidden="true" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" aria-hidden="true" />
                  Dark
                </>
              )}
            </Button>
          </div>

          <div className="h-px bg-zinc-200/60 dark:bg-white/10" />

          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {profile.name} · {profile.title}
          </p>
        </div>
      </Modal>
    </div>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <MobileMenu />

      <header className="sticky top-0 z-50 hidden border-b border-zinc-200/60 bg-white/75 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60 md:block">
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
            <Button
              type="button"
              variant="ghost"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
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
    </>
  );
}
