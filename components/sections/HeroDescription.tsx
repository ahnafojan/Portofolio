"use client";

import { useState } from "react";

export default function HeroDescription({ text, className }: { text: string; className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionId = "hero-description";

  return (
    <div className={`mt-4 max-w-2xl ${className ?? ""}`}>
      <p
        id={descriptionId}
        className={`whitespace-pre-line text-sm leading-[1.7] text-nb-muted sm:text-[15px] lg:text-base ${
          isExpanded ? "line-clamp-none" : "line-clamp-3 md:line-clamp-none"
        }`}
      >
        {text}
      </p>
      <button
        type="button"
        aria-controls={descriptionId}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className="mt-1 inline-flex min-h-10 items-center font-mono text-xs font-bold uppercase tracking-[0.03em] text-nb-blue transition-colors hover:text-nb-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow md:hidden"
      >
        {isExpanded ? "Sembunyikan" : "Selengkapnya"}
      </button>
    </div>
  );
}
