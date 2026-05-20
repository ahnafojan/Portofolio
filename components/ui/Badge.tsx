import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "yellow" | "pink" | "blue" | "green" | "dark" | "white" | "default" | "accent";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  children?: ReactNode;
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  yellow: "bg-nb-yellow text-nb-text",
  pink: "bg-nb-pink text-nb-text",
  blue: "bg-nb-blue text-white",
  green: "bg-nb-green text-nb-text",
  dark: "bg-nb-text text-white",
  white: "bg-nb-surface text-nb-text",
  default: "bg-nb-surface text-nb-text",
  accent: "bg-nb-blue text-white",
};

export default function Badge({
  label,
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-[4px] border-2 border-nb-border px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.03em]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children ?? label}
    </span>
  );
}
