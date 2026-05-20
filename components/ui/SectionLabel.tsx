import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export default function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-3 inline-block border-b-2 border-nb-border pb-1 font-mono text-xs font-bold uppercase tracking-[0.12em] text-nb-muted",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
