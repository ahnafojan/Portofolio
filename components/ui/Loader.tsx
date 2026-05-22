import { cn } from "@/lib/utils";

type LoaderSize = "sm" | "md" | "lg";

type LoaderProps = {
  className?: string;
  label?: string;
  size?: LoaderSize;
};

const sizes: Record<LoaderSize, string> = {
  sm: "text-[8px]",
  md: "text-[12px]",
  lg: "text-[16px]",
};

export default function Loader({ className, label = "Loading", size = "md" }: LoaderProps) {
  return (
    <div aria-label={label} aria-live="polite" className={cn("inline-flex items-center justify-center", className)} role="status">
      <svg aria-hidden="true" className="gooey-loader-filter" focusable="false">
        <filter id="gooey-loader-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 48 -7" />
        </filter>
      </svg>
      <div className={cn("gooey-loader", sizes[size])} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
