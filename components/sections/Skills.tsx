"use client";

import { useEffect, useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

type SkillColor = "yellow" | "dark" | "pink" | "blue" | "green" | "white" | "cream";

type SkillCategory = {
  id: string;
  label: string;
  color: SkillColor;
  wide?: boolean;
  skills: Skill[];
  description?: string;
};

interface SkillsProps {
  skills: Skill[];
}

const categoryMeta: Record<string, Omit<SkillCategory, "skills" | "wide">> = {
  tools: {
    id: "tools",
    label: "Tools",
    color: "yellow",
  },
  frontend: {
    id: "frontend",
    label: "Frontend",
    color: "green",
  },
  backend: {
    id: "backend",
    label: "Backend",
    color: "pink",
  },
  fullstack: {
    id: "fullstack",
    label: "Fullstack",
    color: "dark",
    description: "End-to-end dari UI sampai server.",
  },
  database: {
    id: "database",
    label: "Database",
    color: "blue",
  },
  devops: {
    id: "devops",
    label: "Devops",
    color: "white",
  },
  other: {
    id: "other",
    label: "Other",
    color: "cream",
  },
};

const cardColorMap: Record<SkillColor, string> = {
  yellow: "bg-[#FFD447] text-[#111111]",
  green: "bg-[#6BCB77] text-[#111111]",
  pink: "bg-[#FF6B9A] text-[#111111]",
  dark: "bg-[#111111] text-white shadow-[3px_3px_0px_#FFD447] sm:shadow-hard-yellow",
  blue: "bg-[#4D96FF] text-white",
  white: "bg-white text-[#111111]",
  cream: "bg-[#F8F4E3] text-[#111111]",
};

const chipBgMap: Record<SkillColor, string> = {
  yellow: "bg-[#F8F4E3] text-[#111] border-[#111]",
  green: "bg-[#f0faf0] text-[#111] border-[#111]",
  pink: "bg-[#fff0f5] text-[#111] border-[#111]",
  dark: "bg-[#1e1e1e] text-white border-[#333]",
  blue: "bg-[#eaf2ff] text-[#111] border-[#111]",
  white: "bg-white text-[#111] border-[#111]",
  cream: "bg-white text-[#111] border-[#111]",
};

const activeColorMap: Record<string, string> = {
  all: "bg-[#111] text-[#FFD447] shadow-[3px_3px_0_#FFD447] hover:shadow-none active:shadow-none",
  tools: "bg-[#FFD447] text-[#111] shadow-[3px_3px_0_#111] hover:shadow-none active:shadow-none",
  frontend: "bg-[#6BCB77] text-[#111] shadow-[3px_3px_0_#111] hover:shadow-none active:shadow-none",
  backend: "bg-[#FF6B9A] text-[#111] shadow-[3px_3px_0_#111] hover:shadow-none active:shadow-none",
  fullstack: "bg-[#111] text-[#FFD447] shadow-[3px_3px_0_#FFD447] hover:shadow-none active:shadow-none",
  database: "bg-[#4D96FF] text-white shadow-[3px_3px_0_#111] hover:shadow-none active:shadow-none",
  devops: "bg-white text-[#111] border-[#111] shadow-[3px_3px_0_#111] hover:shadow-none active:shadow-none",
  other: "bg-[#F8F4E3] text-[#111] shadow-[3px_3px_0_#111] hover:shadow-none active:shadow-none",
};

function normalizeCategoryId(category?: string) {
  const normalized = (category || "Other").toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized || "other";
}

function formatCategoryLabel(category: string) {
  return category
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getCategoryMeta(id: string, fallbackLabel: string) {
  return categoryMeta[id] ?? { id, label: formatCategoryLabel(fallbackLabel), color: "white" as SkillColor };
}

function getFilterActiveClass(id: string) {
  return activeColorMap[id] ?? "bg-[#111] text-white";
}

const isSingleSkill = (cat: SkillCategory) => cat.skills.length === 1;

const hasDesc = (skill: Skill) => Boolean(skill.description && skill.description.trim().length > 0);

const isWide = (cat: SkillCategory) => cat.skills.length >= 5;

export default function Skills({ skills }: SkillsProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openDesc, setOpenDesc] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("[data-skill-card='true']")) return;
      setOpenDesc(null);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const categories = useMemo<SkillCategory[]>(() => {
    const grouped = skills.reduce<Record<string, { label: string; skills: Skill[] }>>((acc, skill) => {
      const label = skill.category ?? "Other";
      const id = normalizeCategoryId(label);

      if (!acc[id]) acc[id] = { label, skills: [] };
      acc[id].skills.push(skill);
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([id, group]) => {
        const meta = getCategoryMeta(id, group.label);
        return {
          ...meta,
          wide: group.skills.length >= 5,
          skills: group.skills,
        };
      })
      .sort((a, b) => b.skills.length - a.skills.length || a.label.localeCompare(b.label));
  }, [skills]);

  if (!skills || skills.length === 0) return null;

  const visibleCategories = activeFilter === "all" ? categories : categories.filter((category) => category.id === activeFilter);

  function toggleDesc(catId: string, skillName: string) {
    const key = `${catId}-${skillName}`;
    setOpenDesc((current) => (current === key ? null : key));
  }

  return (
    <section id="skills" className="scroll-mt-24 bg-nb-surface py-12 lg:py-20">
      <div className="nb-container">
        <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="nb-h2 font-heading font-black text-nb-text">Skills &amp; Tools</h2>
          </div>
          <Badge variant="white">{skills.length} technologies</Badge>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {[{ id: "all", label: "All", skills }, ...categories].map((category) => {
            const active = activeFilter === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveFilter(category.id);
                  setOpenDesc(null);
                }}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 border-2 border-[#111] px-3 py-1.5 font-mono text-xs font-black uppercase transition-[transform,box-shadow,background-color,color] duration-150 hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[3px] active:translate-y-[3px]",
                  active
                    ? getFilterActiveClass(category.id)
                    : "bg-white text-[#111] shadow-[2px_2px_0_#111] hover:shadow-none active:shadow-none",
                )}
              >
                <span>{category.label}</span>
                <span>{category.skills.length}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
          {visibleCategories.map((category) => {
            const singleSkill = isSingleSkill(category);
            const singleSkillDescription = singleSkill && hasDesc(category.skills[0]) ? category.skills[0].description : null;
            const darkCard = category.color === "dark";
            const wideCard = isWide(category) && activeFilter === "all";

            return (
              <Card
                key={category.id}
                className={cn(
                  "flex min-h-[140px] flex-col justify-start p-4 sm:min-h-[180px] sm:p-[18px] lg:px-6 lg:py-5",
                  cardColorMap[category.color] ?? cardColorMap.white,
                  wideCard && "sm:col-span-2 lg:col-span-2",
                )}
                interactive
                data-skill-card="true"
                onClick={(event) => event.stopPropagation()}
              >
                <div>
                  <h3
                    className={cn(
                      "font-mono text-xs font-black uppercase tracking-[0.24em]",
                      darkCard ? "text-[#FFD447]" : "text-[#111111]/65",
                    )}
                  >
                    {category.label}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 mb-2.5 font-heading text-[32px] font-black leading-none lg:text-[40px]",
                      darkCard ? "text-[#FFD447]" : "text-[#111111]",
                    )}
                  >
                    {category.skills.length}
                  </p>
                </div>

                <div
                  className={cn(
                    "mb-3.5 h-0.5 w-full",
                    darkCard ? "bg-[#FFD447] opacity-25" : "bg-[#111111] opacity-15",
                  )}
                />

                <div className="flex flex-wrap items-start gap-[5px] sm:gap-1.5">
                  {category.skills.map((skill) => {
                    const clickable = !singleSkill && hasDesc(skill);
                    const key = `${category.id}-${skill.name}`;
                    const isOpen = openDesc === key;

                    return (
                      <div
                        key={skill._id}
                        className={cn("relative inline-block", isOpen && "z-[70]")}
                        onClick={(event) => {
                          if (!clickable) return;
                          event.stopPropagation();
                          toggleDesc(category.id, skill.name);
                        }}
                      >
                        <span
                          className={cn(
                            "relative inline-flex min-h-7 max-w-full items-center border-2 px-3 py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.03em]",
                            chipBgMap[category.color] ?? chipBgMap.white,
                            clickable ? "chip-clickable" : "cursor-default",
                            darkCard && clickable && "dark",
                          )}
                        >
                          <span className="min-w-0 break-words">{skill.name}</span>
                          {clickable ? <span className="chip-dot" aria-hidden="true" /> : null}
                        </span>

                        {clickable && isOpen ? (
                          <div className="skill-popover" role="tooltip">
                            {skill.description}
                            <span className="popover-arrow" aria-hidden="true" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {singleSkillDescription ? <p className="skill-inline-desc">{singleSkillDescription}</p> : null}
                {category.description && !singleSkillDescription ? (
                  <p className={cn("mt-4 text-sm leading-relaxed", darkCard ? "text-white/55" : "text-[#111111]/65")}>
                    {category.description}
                  </p>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
