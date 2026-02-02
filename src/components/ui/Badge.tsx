import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-200/70 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700",
        "dark:border-white/10 dark:bg-white/5 dark:text-zinc-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

