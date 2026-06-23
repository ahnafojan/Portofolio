"use client";

import { useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";

type SkillColor = "yellow" | "dark" | "pink" | "blue" | "green" | "white" | "cream";

type SkillCategory = {
  id: string;
  label: string;
  color: SkillColor;
  skills: Skill[];
  description?: string;
};

interface SkillsProps {
  skills: Skill[];
}

const categoryMeta: Record<string, Omit<SkillCategory, "skills">> = {
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

const SKILL_PREVIEW_COUNT = 3;

export default function Skills({ skills }: SkillsProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

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
          skills: group.skills,
        };
      })
      .sort((a, b) => b.skills.length - a.skills.length || a.label.localeCompare(b.label));
  }, [skills]);

  if (!skills || skills.length === 0) return null;

  const visibleCategories = activeFilter === "all" ? categories : categories.filter((category) => category.id === activeFilter);

  function toggleCategory(categoryId: string) {
    setExpandedCategoryId((current) => (current === categoryId ? null : categoryId));
  }

  return (
    <section id="skills" className="scroll-mt-24 bg-nb-bg py-12 lg:py-20">
      <ScrollReveal className="nb-container">
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
                  setExpandedCategoryId(null);
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

        <div className="reveal-stagger grid grid-cols-2 items-start gap-3 sm:gap-5 lg:grid-cols-3">
          {visibleCategories.map((category) => {
            const darkCard = category.color === "dark";
            const isExpanded = expandedCategoryId === category.id;
            const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, SKILL_PREVIEW_COUNT);
            const hiddenSkillCount = category.skills.length - visibleSkills.length;
            const skillsId = `skills-${category.id}`;

            return (
              <Card
                key={category.id}
                className={cn(
                  "flex min-w-0 self-start flex-col p-3 sm:min-h-[180px] sm:p-[18px] lg:px-6 lg:py-5",
                  cardColorMap[category.color] ?? cardColorMap.white,
                )}
                interactive
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={cn(
                      "font-mono text-[9px] font-black uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.24em]",
                      darkCard ? "text-[#FFD447]" : "text-[#111111]/65",
                    )}
                  >
                    {category.label}
                  </h3>
                  <p
                    className={cn(
                      "font-heading text-2xl font-black leading-none sm:text-[32px] lg:text-[40px]",
                      darkCard ? "text-[#FFD447]" : "text-[#111111]",
                    )}
                  >
                    {category.skills.length}
                  </p>
                </div>

                <div
                  className={cn(
                    "my-2.5 h-0.5 w-full sm:my-3.5",
                    darkCard ? "bg-[#FFD447] opacity-25" : "bg-[#111111] opacity-15",
                  )}
                />

                <div id={skillsId} className="flex flex-wrap items-start gap-1 sm:gap-1.5">
                  {visibleSkills.map((skill) => (
                    <span
                      key={skill._id}
                      title={skill.description}
                      className={cn(
                        "inline-flex min-h-6 max-w-full items-center border-2 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.03em] sm:min-h-7 sm:px-3 sm:py-[5px] sm:text-[11px]",
                        chipBgMap[category.color] ?? chipBgMap.white,
                      )}
                    >
                      <span className="min-w-0 break-words">{skill.name}</span>
                    </span>
                  ))}

                  {hiddenSkillCount > 0 ? (
                    <button
                      type="button"
                      aria-controls={skillsId}
                      aria-expanded={isExpanded}
                      onClick={() => toggleCategory(category.id)}
                      className={cn(
                        "inline-flex min-h-6 items-center border-2 border-dashed px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.03em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow sm:min-h-7 sm:px-3 sm:py-[5px] sm:text-[11px]",
                        darkCard ? "border-[#FFD447] text-[#FFD447] hover:bg-[#FFD447] hover:text-[#111111]" : "border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white",
                      )}
                    >
                      +{hiddenSkillCount} tools
                    </button>
                  ) : isExpanded && category.skills.length > SKILL_PREVIEW_COUNT ? (
                    <button
                      type="button"
                      aria-controls={skillsId}
                      aria-expanded={isExpanded}
                      onClick={() => toggleCategory(category.id)}
                      className={cn(
                        "inline-flex min-h-6 items-center border-2 border-dashed px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.03em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow sm:min-h-7 sm:px-3 sm:py-[5px] sm:text-[11px]",
                        darkCard ? "border-[#FFD447] text-[#FFD447] hover:bg-[#FFD447] hover:text-[#111111]" : "border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white",
                      )}
                    >
                      Show less
                    </button>
                  ) : null}
                </div>

                {isExpanded && category.description ? (
                  <p className={cn("mt-3 text-xs leading-relaxed sm:mt-4 sm:text-sm", darkCard ? "text-white/55" : "text-[#111111]/65")}>
                    {category.description}
                  </p>
                ) : null}
              </Card>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
