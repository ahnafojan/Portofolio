"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import useScrollDirection from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  href: string;
  sectionId?: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", href: "#about", sectionId: "about" },
  { id: "projects", label: "Projects", href: "#projects", sectionId: "projects" },
  { id: "skills", label: "Skills", href: "#skills", sectionId: "skills" },
  { id: "experience", label: "Experience", href: "#experience", sectionId: "experience" },
  { id: "organizations", label: "Organizations", href: "#organizations", sectionId: "organizations" },
  { id: "certificates", label: "Certificates", href: "#certificates", sectionId: "certificates" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("about");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const closeMenuOnScrollDown = useCallback(() => {
    setOpen(false);
  }, []);
  const { scrollDir, isAtTop } = useScrollDirection(closeMenuOnScrollDown);
  const brandClass = isAtTop ? "text-[#111111]" : "text-[#FFD447]";
  const contactButtonClass = isAtTop
    ? "border-2 border-[#111111] bg-transparent text-[#111111] shadow-[3px_3px_0_#111111] hover:shadow-none"
    : "border-2 border-[#111111] bg-[#FFD447] text-[#111111] shadow-[3px_3px_0_#111111] hover:shadow-none";
  const menuContactButtonClass =
    "border-2 border-[#111111] bg-[#FFD447] text-[#111111] shadow-[3px_3px_0px_#FFD447] hover:shadow-none";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.getAttribute("id");
        if (nextId) setActiveId(nextId);
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    NAV_ITEMS.forEach((item) => {
      if (!item.sectionId) return;
      const section = document.getElementById(item.sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const getNavHref = useCallback(
    (href: string) => {
      if (href.startsWith("#") && !isHomePage) return `/${href}`;
      return href;
    },
    [isHomePage],
  );

  const scrollToHash = useCallback((hash: string) => {
    const section = document.getElementById(hash.slice(1));
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", hash);
  }, []);

  const handleNavClick = useCallback(
    (id: string, href: string, event?: MouseEvent<HTMLAnchorElement>) => {
      setActiveId(id);
      setOpen(false);

      if (!href.startsWith("#") || !isHomePage) return;

      event?.preventDefault();
      window.requestAnimationFrame(() => scrollToHash(href));
    },
    [isHomePage, scrollToHash],
  );

  const desktopNavLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        const active = isHomePage ? activeId === item.id : false;
        const linkColor = isAtTop ? "text-[#111111]" : "text-white";
        const className = cn(
          linkColor,
          "hover:text-[#FFD447]",
          active && "underline decoration-[#FFD447] decoration-2 underline-offset-4",
        );
        const href = getNavHref(item.href);

        if (href.startsWith("/")) {
          return (
            <Link
              key={item.id}
              href={href}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow ${className}`}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={item.id}
            href={href}
            onClick={(event) => handleNavClick(item.id, item.href, event)}
            className={`font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow ${className}`}
          >
            {item.label}
          </a>
        );
      }),
    [activeId, getNavHref, handleNavClick, isAtTop, isHomePage],
  );

  const mobileNavLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        const active = isHomePage ? activeId === item.id : false;
        const className = cn(
          "flex min-h-[56px] items-center border-b border-[#333333] py-4 text-2xl font-extrabold text-white hover:text-[#FFD447]",
          active && "text-[#FFD447]",
        );
        const href = getNavHref(item.href);

        if (href.startsWith("/")) {
          return (
            <Link
              key={item.id}
              href={href}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow ${className}`}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={item.id}
            href={href}
            onClick={(event) => handleNavClick(item.id, item.href, event)}
            className={`transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow ${className}`}
          >
            {item.label}
          </a>
        );
      }),
    [activeId, getNavHref, handleNavClick, isHomePage],
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full [transition:transform_200ms_ease-out,background-color_250ms_ease,border-color_250ms_ease,box-shadow_250ms_ease]",
          scrollDir === "down" && !isAtTop ? "-translate-y-full" : "translate-y-0",
          isAtTop
            ? "border-b-0 border-transparent bg-transparent shadow-none"
            : "border-b-0 border-transparent bg-[#111111] shadow-none",
        )}
      >
        <nav className="nb-container flex min-h-16 items-center justify-between gap-4 py-3 lg:py-4">
          <a
            href={getNavHref("#home")}
            className={cn(
              "shrink-0 font-heading text-xl font-black transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow",
              brandClass,
            )}
            onClick={(event) => handleNavClick("home", "#home", event)}
          >
            Hey, let&apos;s connect!
          </a>
          <div className="hidden min-w-0 items-center justify-center gap-4 text-sm lg:flex xl:gap-5 xl:text-base">
            {desktopNavLinks}
          </div>

          <div className="hidden lg:block">
            <Button
              href={getNavHref("#contact")}
              size="sm"
              variant="primary"
              className={contactButtonClass}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => handleNavClick("contact", "#contact", event)}
            >
              Contact
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 bg-transparent shadow-[3px_3px_0_#111111] transition-[transform,box-shadow,color,border-color] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow active:translate-x-[3px] active:translate-y-[3px] active:shadow-none lg:hidden",
              isAtTop ? "border-[#111111] text-[#111111]" : "border-[#FFD447] text-white",
            )}
          >
            {open ? <X aria-hidden="true" size={22} strokeWidth={3} /> : <Menu aria-hidden="true" size={22} strokeWidth={3} />}
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[999] flex h-full w-full flex-col bg-[#111111] px-6 py-5 text-white transition-transform lg:hidden",
          open
            ? "translate-x-0 duration-[250ms] ease-out"
            : "pointer-events-none translate-x-full duration-200 ease-in",
        )}
        aria-hidden={!open}
      >
        <div className="flex min-h-11 items-center justify-between gap-4">
          <a
            href={getNavHref("#home")}
            className="font-heading text-xl font-black text-[#FFD447] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
            onClick={(event) => handleNavClick("home", "#home", event)}
          >
            Portfolio
          </a>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-white text-white shadow-none transition-[transform,background-color,color,border-color] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#FFD447] hover:bg-[#FFD447] hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow active:translate-x-[2px] active:translate-y-[2px]"
          >
            <X aria-hidden="true" size={22} strokeWidth={3} />
          </button>
        </div>

        <div className="mt-8 flex flex-col">{mobileNavLinks}</div>

        <div className="mt-auto mb-8">
          <Button
            href={getNavHref("#contact")}
            variant="primary"
            className={`min-h-[48px] w-full ${menuContactButtonClass}`}
            onClick={(event: MouseEvent<HTMLAnchorElement>) => handleNavClick("contact", "#contact", event)}
          >
            Contact
          </Button>
        </div>
      </div>
    </>
  );
}
