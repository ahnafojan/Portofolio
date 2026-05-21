"use client";

import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

export default function useScrollDirection(onScrollDown?: () => void) {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>("up");
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const threshold = 10;

    const updateDirection = () => {
      const current = window.scrollY;

      setIsAtTop(current < 50);

      if (Math.abs(current - lastScrollY.current) < threshold) return;

      const nextDir = current > lastScrollY.current ? "down" : "up";

      if (nextDir === "down") {
        onScrollDown?.();
      }

      setScrollDir(nextDir);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", updateDirection, { passive: true });
    updateDirection();

    return () => window.removeEventListener("scroll", updateDirection);
  }, [onScrollDown]);

  return { scrollDir, isAtTop };
}
