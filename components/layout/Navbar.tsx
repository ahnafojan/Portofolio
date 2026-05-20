"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

type NavItem = {
  id: string;
  label: string;
  href: string;
  sectionId?: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", href: "#about", sectionId: "about" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "skills", label: "Skills", href: "#skills", sectionId: "skills" },
  { id: "experience", label: "Experience", href: "#experience", sectionId: "experience" },
  { id: "organizations", label: "Organizations", href: "#organizations", sectionId: "organizations" },
  { id: "certificates", label: "Certificates", href: "#certificates", sectionId: "certificates" },
  { id: "contact", label: "Contact", href: "#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("about");
  const [open, setOpen] = useState(false);

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

  const navLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        const active = activeId === item.id;
        const className = active
          ? "text-nb-yellow underline decoration-nb-yellow decoration-2 underline-offset-4"
          : "text-white hover:text-nb-yellow";

        if (item.href.startsWith("/")) {
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveId(item.id);
                setOpen(false);
              }}
              className={`font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow ${className}`}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={() => {
              setActiveId(item.id);
              setOpen(false);
            }}
            className={`font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow ${className}`}
          >
            {item.label}
          </a>
        );
      }),
    [activeId],
  );

  return (
    <header className="sticky top-0 z-50 border-b-2 border-nb-border bg-nb-text text-white [box-shadow:0_4px_0px_#FFD447]">
      <nav className="nb-container flex min-h-16 items-center justify-between gap-4 py-3 lg:py-4">
        <a
          href="#home"
          className="shrink-0 font-heading text-xl font-black text-nb-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
          onClick={() => setOpen(false)}
        >
          Portfolio
        </a>

        <div className="hidden min-w-0 items-center justify-center gap-4 text-sm lg:flex xl:gap-5 xl:text-base">{navLinks}</div>

        <div className="hidden lg:block">
          <Button href="#contact" size="sm" variant="primary">
            Contact
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 border-nb-border bg-nb-yellow text-nb-text shadow-hard transition-[transform,box-shadow] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow active:translate-x-0.5 active:translate-y-0.5 active:[box-shadow:2px_2px_0px_#111111] lg:hidden"
        >
          {open ? <X aria-hidden="true" size={22} strokeWidth={3} /> : <Menu aria-hidden="true" size={22} strokeWidth={3} />}
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100svh-4rem)] overflow-y-auto border-b-2 border-nb-yellow bg-nb-text px-6 py-6 text-white shadow-hard lg:hidden">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 text-xl">{navLinks}</div>
            <Button href="#contact" variant="primary" className="w-full" onClick={() => setOpen(false)}>
              Contact
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
