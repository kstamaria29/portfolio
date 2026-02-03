import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm",
        "dark:border-white/10 dark:bg-white/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
