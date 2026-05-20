import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={textareaId} className="block text-[13px] font-bold uppercase text-nb-text">
          {label}
        </label>
      ) : null}
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
        className={cn(
          "min-h-36 w-full resize-y border-2 border-nb-border bg-nb-surface px-3.5 py-2.5 text-[15px] leading-relaxed text-nb-text shadow-[3px_3px_0px_#111111] outline-none transition-[transform,box-shadow] duration-150 ease-out placeholder:text-[#888888] focus:-translate-x-px focus:-translate-y-px focus:shadow-hard-yellow",
          error && "border-nb-danger shadow-[3px_3px_0px_#FF4D4D]",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={textareaId ? `${textareaId}-error` : undefined} className="text-xs font-bold text-nb-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
