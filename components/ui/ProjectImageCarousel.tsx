"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { SanityImage } from "@/lib/types";

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

  const prev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-nb-surface"
      style={{ aspectRatio: activeRatio }}
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
        className="flex h-full w-full transition-transform duration-150 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={image.asset?._ref ?? `${title}-${index}`}
            className="flex h-full w-full shrink-0 items-center justify-center bg-nb-surface"
          >
            <Image
              src={urlFor(image).auto("format").fit("max").width(1600).height(900).url()}
              alt={`${title} preview ${index + 1}`}
              width={1600}
              height={900}
              loading="lazy"
              className="h-full w-full object-contain p-2 sm:p-3"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        ))}
      </div>

      {hasMultiple ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-nb-border bg-nb-yellow font-bold text-nb-text shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow"
          >
            &lt;
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-nb-border bg-nb-yellow font-bold text-nb-text shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow"
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
