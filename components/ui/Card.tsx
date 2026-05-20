import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "yellow" | "pink" | "blue" | "dark";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
}

const variants: Record<CardVariant, string> = {
  default: "bg-nb-surface text-nb-text",
  yellow: "bg-nb-yellow text-nb-text",
  pink: "bg-nb-pink text-white",
  blue: "bg-nb-blue text-white",
  dark: "bg-nb-text text-white",
};

export default function Card({
  children,
  variant = "default",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "nb-border bg-nb-surface p-6",
        variants[variant],
        "w-full shadow-[3px_3px_0px_#111111] sm:shadow-hard",
        variant === "dark" && "shadow-[3px_3px_0px_#FFD447] sm:shadow-hard-yellow",
        interactive && "nb-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
