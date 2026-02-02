import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

function getButtonClasses(variant: ButtonVariant, size: ButtonSize) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold no-underline transition-colors";

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300",
    secondary:
      "border border-zinc-200/70 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10",
    ghost:
      "text-zinc-800 hover:bg-zinc-100/70 dark:text-zinc-100 dark:hover:bg-white/10",
  };

  return cn(base, sizes[size], variants[variant]);
}

export function Button(props: ButtonProps | ButtonLinkProps) {
  const {
    children,
    className: extraClassName,
    variant: variantProp,
    size: sizeProp,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const variant = (variantProp as ButtonVariant | undefined) ?? "secondary";
  const size = (sizeProp as ButtonSize | undefined) ?? "md";
  const className = cn(getButtonClasses(variant, size), extraClassName);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href as string} className={className} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
