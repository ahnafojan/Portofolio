"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { Experience } from "@/lib/types";

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getDuration(start?: string, end?: string, isCurrent?: boolean): string {
  if (!start) return "";

  const startDate = new Date(start);
  const endDate = isCurrent ? new Date() : end ? new Date(end) : new Date();
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (months < 12) return `${Math.max(months, 0)}mo`;

  const years = Math.floor(months / 12);
  const restMonths = months % 12;
  return restMonths > 0 ? `${years}y ${restMonths}mo` : `${years}y`;
}

export default function ExperienceCard({ experience, isLeft }: { experience: Experience; isLeft: boolean }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionItems = experience.description?.split(/\n+/).filter(Boolean) ?? [];
  const descriptionId = `experience-description-${experience._id}`;

  return (
    <article
      className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] lg:gap-5"
    >
      <span className="z-10 mt-4 h-5 w-5 border-2 border-nb-border bg-nb-yellow shadow-[2px_2px_0px_#111111] sm:mt-6 lg:col-start-2 lg:justify-self-center" />
      <Card
        interactive
        className={`min-w-0 p-4 sm:p-6 ${isLeft ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-3 lg:row-start-1"}`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="break-words font-heading text-base font-black leading-tight text-nb-text sm:nb-h3">
                {experience.role}
              </h3>
              {experience.isCurrent ? (
                <Badge variant="green" className="px-2 py-0 text-[10px] sm:px-2.5 sm:py-0.5 sm:text-xs">
                  Current
                </Badge>
              ) : null}
            </div>
            <p className="mt-1 break-words text-[13px] font-extrabold text-nb-blue sm:text-base">@ {experience.company}</p>
          </div>

          <div className="font-mono text-[11px] font-bold uppercase text-nb-muted sm:shrink-0 sm:text-right sm:text-xs">
            <p>
              {formatDate(experience.startDate)} - {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
            </p>
            {experience.startDate ? <p className="mt-1">{getDuration(experience.startDate, experience.endDate, experience.isCurrent)}</p> : null}
          </div>
        </div>

        {descriptionItems.length > 0 ? (
          <div className="mt-3 sm:mt-5">
            <ul id={descriptionId} className="space-y-1.5 text-xs leading-relaxed text-nb-muted sm:space-y-2 sm:text-sm">
              {descriptionItems.map((item, index) => (
                <li key={item} className={`gap-2 sm:gap-3 ${index > 0 && !isDescriptionExpanded ? "hidden sm:flex" : "flex"}`}>
                  <span className="mt-1.5 h-2 w-2 shrink-0 border-2 border-nb-border bg-nb-pink sm:mt-2" />
                  <span className={`min-w-0 break-words ${index === 0 && !isDescriptionExpanded ? "line-clamp-2 sm:line-clamp-none" : ""}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-controls={descriptionId}
              aria-expanded={isDescriptionExpanded}
              onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
              className="mt-1 inline-flex min-h-11 items-center gap-1 font-mono text-xs font-bold uppercase tracking-[0.03em] text-nb-blue transition-colors hover:text-nb-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow sm:hidden"
            >
              {isDescriptionExpanded ? "Sembunyikan" : "Lihat detail"}
              <ChevronDown
                aria-hidden="true"
                size={16}
                strokeWidth={2.5}
                className={`transition-transform ${isDescriptionExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        ) : null}
      </Card>
    </article>
  );
}
