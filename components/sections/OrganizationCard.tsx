"use client";

import { ChevronDown, Users } from "lucide-react";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { Organization } from "@/lib/types";

function formatRange(start?: string, end?: string, isCurrent?: boolean) {
  const startYear = start ? new Date(start).getFullYear() : null;
  const endYear = isCurrent ? "Now" : end ? new Date(end).getFullYear() : null;
  if (!startYear && !endYear) return "";
  if (startYear && !endYear) return `${startYear}`;
  if (!startYear && endYear) return `${endYear}`;
  return `${startYear} - ${endYear}`;
}

export default function OrganizationCard({ org }: { org: Organization }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionId = `organization-description-${org._id}`;

  return (
    <Card interactive className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3 p-3 sm:block sm:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-nb-border bg-nb-yellow shadow-[3px_3px_0px_#111111] sm:mb-5 sm:h-12 sm:w-12">
          <Users aria-hidden="true" size={20} strokeWidth={2.5} className="sm:hidden" />
          <Users aria-hidden="true" size={24} strokeWidth={2.5} className="hidden sm:block" />
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 break-words font-heading text-base font-black leading-tight text-nb-text sm:nb-h3">
            {org.name}
          </h3>
          {org.isCurrent ? (
            <Badge variant="green" className="shrink-0 px-2 py-0 text-[10px] sm:px-2.5 sm:py-0.5 sm:text-xs">
              Active
            </Badge>
          ) : null}
        </div>

        <p className="mt-1 text-[13px] font-extrabold text-nb-blue sm:mt-2 sm:text-sm">{org.role}</p>
        <p className="mt-1.5 font-mono text-[11px] font-bold uppercase text-nb-muted sm:mt-3 sm:text-xs">
          {formatRange(org.startDate, org.endDate, org.isCurrent)}
        </p>

        {org.description ? (
          <div className="mt-2 sm:mt-4">
            <p
              id={descriptionId}
              className={`text-xs leading-relaxed text-nb-muted sm:text-sm ${
                isDescriptionExpanded ? "line-clamp-none" : "line-clamp-2 sm:line-clamp-none"
              }`}
            >
              {org.description}
            </p>
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
      </div>
    </Card>
  );
}
