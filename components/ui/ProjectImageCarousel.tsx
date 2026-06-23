"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { SanityImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import ImageWithLoader from "@/components/ui/ImageWithLoader";

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
  const screenStyle = {
    "--project-image-ratio": activeRatio.toString(),
  } as CSSProperties;
  const trackStyle = {
    transform: `translateX(-${activeIndex * 100}%)`,
  } as CSSProperties;

  const prev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className={cn("mx-auto w-full", activeIsPortrait ? "max-w-[360px] sm:max-w-[420px] lg:max-w-[300px]" : "max-w-[1080px]")}>
      <div
        className={cn(
          "relative bg-nb-text",
          activeIsPortrait
            ? "rounded-[2rem] border-[7px] border-nb-border px-1.5 pb-3 pt-4 shadow-hard"
            : "rounded-t-xl border-[7px] border-nb-border p-1.5 pt-3",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 z-20 -translate-x-1/2 bg-nb-surface",
            activeIsPortrait ? "top-1.5 h-1 w-12 rounded-full" : "top-1 h-1.5 w-1.5 rounded-full",
          )}
        />

        <div
          className={cn(
            "relative w-full overflow-hidden bg-nb-text [aspect-ratio:var(--project-image-ratio)]",
            activeIsPortrait ? "rounded-[1.45rem]" : "rounded-sm",
          )}
          style={screenStyle}
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
          <div className="flex h-full w-full transition-transform duration-150 ease-out" style={trackStyle}>
            {images.map((image, index) => {
              const imageRatio = ratios[index] ?? 16 / 9;
              const imageIsPortrait = imageRatio < 1;

              return (
                <div
                  key={image.asset?._ref ?? `${title}-${index}`}
                  className="relative flex h-full w-full shrink-0 items-center justify-center bg-nb-text"
                >
                  <ImageWithLoader
                    src={urlFor(image).auto("format").fit("max").width(imageIsPortrait ? 1100 : 1800).url()}
                    alt={`${title} preview ${index + 1}`}
                    width={imageIsPortrait ? 900 : 1600}
                    height={imageIsPortrait ? 1600 : 900}
                    loading="lazy"
                    className="block h-full w-full object-contain"
                    loaderClassName="bg-nb-text/90"
                    sizes={imageIsPortrait ? "(max-width: 768px) 82vw, 420px" : "(max-width: 768px) 92vw, 1080px"}
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
                className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border-2 border-nb-border bg-nb-yellow text-nb-text shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow active:translate-x-[3px] active:shadow-none sm:left-3 sm:h-10 sm:w-10"
              >
                <ChevronLeft aria-hidden="true" size={20} strokeWidth={3} />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={next}
                className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center border-2 border-nb-border bg-nb-yellow text-nb-text shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow active:translate-x-[3px] active:shadow-none sm:right-3 sm:h-10 sm:w-10"
              >
                <ChevronRight aria-hidden="true" size={20} strokeWidth={3} />
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

        {activeIsPortrait ? <span aria-hidden="true" className="absolute bottom-1.5 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-nb-surface" /> : null}
      </div>

      {!activeIsPortrait ? (
        <div aria-hidden="true" className="relative -mt-px mx-auto h-4 w-[88%] border-2 border-t-0 border-nb-border bg-nb-text">
          <span className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 border-x-2 border-b-2 border-nb-border bg-nb-surface" />
        </div>
      ) : null}
    </div>
  );
}
