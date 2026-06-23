"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageWithLoaderProps = ImageProps & {
  loaderClassName?: string;
};

export default function ImageWithLoader({
  alt,
  className,
  loaderClassName,
  onError,
  onLoad,
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Image
        {...props}
        alt={alt}
        className={cn("transition-opacity duration-200", isLoading && "opacity-0", className)}
        onLoad={(event) => {
          setIsLoading(false);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoading(false);
          onError?.(event);
        }}
      />

      {isLoading ? (
        <span
          aria-label="Loading image"
          className={cn("pointer-events-none absolute inset-0 z-10 grid place-items-center bg-nb-surface/90", loaderClassName)}
          role="status"
        >
          <span aria-hidden="true" className="h-7 w-7 animate-spin rounded-full border-[3px] border-nb-border border-t-nb-yellow" />
          <span className="sr-only">Loading image</span>
        </span>
      ) : null}
    </>
  );
}
