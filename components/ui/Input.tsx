import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="block text-[13px] font-bold uppercase text-nb-text">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        className={cn(
          "min-h-11 w-full border-2 border-nb-border bg-nb-surface px-3.5 py-2.5 text-[15px] text-nb-text shadow-[3px_3px_0px_#111111] outline-none transition-[transform,box-shadow] duration-150 ease-out placeholder:text-[#888888] focus:-translate-x-px focus:-translate-y-px focus:shadow-hard-yellow",
          error && "border-nb-danger shadow-[3px_3px_0px_#FF4D4D]",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={inputId ? `${inputId}-error` : undefined} className="text-xs font-bold text-nb-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
