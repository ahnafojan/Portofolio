"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { SanityImage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectImageCarouselProps {
  images: SanityImage[];
  title: string;
}

function getImageAspectRatio(image: SanityImage) {
  const ref = image.asset?._ref ?? "";
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return 16 / 9;

  const width = Number.parseInt(match[1] ?? "", 10);
  const height = Number.parseInt(match[2] ?? "", 10);
  if (!width || !height) return 16 / 9;
  return width / height;
}

export default function ProjectImageCarousel({ images, title }: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasMultiple = images.length > 1;
  const ratios = useMemo(() => images.map((image) => getImageAspectRatio(image)), [images]);
  const activeRatio = ratios[activeIndex] ?? 16 / 9;
  const activeIsPortrait = activeRatio < 1;
  const frameStyle = {
    "--project-image-ratio": activeRatio.toString(),
    transform: `translateX(-${activeIndex * 100}%)`,
  } as CSSProperties;

  const prev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-nb-surface",
        activeIsPortrait && "mx-auto max-w-[560px] lg:max-w-[640px]",
      )}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (!hasMultiple || touchStartX.current === null) return;
        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = endX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) < 40) return;
        if (delta < 0) next();
        if (delta > 0) prev();
      }}
      onTouchCancel={() => {
        touchStartX.current = null;
      }}
    >
      <div
        className={cn(
          "flex w-full transition-transform duration-150 ease-out",
          activeIsPortrait
            ? "h-[72svh] min-h-[480px] max-h-[760px] sm:min-h-[560px]"
            : "min-h-[270px] sm:min-h-[360px]",
          "lg:h-auto lg:min-h-0 lg:max-h-none lg:[aspect-ratio:var(--project-image-ratio)]",
        )}
        style={frameStyle}
      >
        {images.map((image, index) => {
          const imageRatio = ratios[index] ?? 16 / 9;
          const imageIsPortrait = imageRatio < 1;

          return (
            <div
              key={image.asset?._ref ?? `${title}-${index}`}
              className="flex h-full w-full shrink-0 items-center justify-center bg-nb-surface p-1 sm:p-3"
            >
              <Image
                src={urlFor(image).auto("format").fit("max").width(imageIsPortrait ? 1100 : 1800).url()}
                alt={`${title} preview ${index + 1}`}
                width={imageIsPortrait ? 900 : 1600}
                height={imageIsPortrait ? 1600 : 900}
                loading="lazy"
                className="h-full w-full object-contain"
                sizes={imageIsPortrait ? "(max-width: 768px) 92vw, 560px" : "(max-width: 768px) 100vw, 1200px"}
              />
            </div>
          );
        })}
      </div>

      {hasMultiple ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border-2 border-nb-border bg-nb-yellow font-bold text-nb-text shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow sm:left-3 sm:h-10 sm:w-10"
          >
            &lt;
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border-2 border-nb-border bg-nb-yellow font-bold text-nb-text shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow sm:right-3 sm:h-10 sm:w-10"
          >
            &gt;
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((_image, index) => (
              <button
                key={`${title}-image-dot-${index}`}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className="h-3 border-2 border-nb-border bg-nb-surface transition-all duration-150"
                style={{
                  width: activeIndex === index ? "24px" : "12px",
                  background: activeIndex === index ? "#FFD447" : "#FFFFFF",
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
