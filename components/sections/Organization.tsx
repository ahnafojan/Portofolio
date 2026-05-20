import { Users } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import { Organization } from "@/lib/types";

function formatRange(start?: string, end?: string, isCurrent?: boolean) {
  const startYear = start ? new Date(start).getFullYear() : null;
  const endYear = isCurrent ? "Now" : end ? new Date(end).getFullYear() : null;
  if (!startYear && !endYear) return "";
  if (startYear && !endYear) return `${startYear}`;
  if (!startYear && endYear) return `${endYear}`;
  return `${startYear} - ${endYear}`;
}

function OrganizationCard({ org }: { org: Organization }) {
  return (
    <Card interactive>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-nb-border bg-nb-yellow shadow-[3px_3px_0px_#111111]">
          <Users aria-hidden="true" size={24} strokeWidth={2.5} />
        </div>
        {org.isCurrent ? <Badge variant="green">Active</Badge> : null}
      </div>

      <h3 className="nb-h3 break-words font-heading font-black leading-tight text-nb-text">{org.name}</h3>
      <p className="mt-2 text-sm font-extrabold text-nb-blue">{org.role}</p>
      <p className="mt-3 font-mono text-xs font-bold uppercase text-nb-muted">
        {formatRange(org.startDate, org.endDate, org.isCurrent)}
      </p>

      {org.description ? (
        <p className="mt-4 text-sm leading-relaxed text-nb-muted">{org.description}</p>
      ) : null}
    </Card>
  );
}

export default function OrganizationSection({ items }: { items: Organization[] }) {
  if (!items?.length) return null;

  const currentItems = items.filter((item) => item.isCurrent);
  const pastItems = items.filter((item) => !item.isCurrent);

  return (
    <section id="organizations" className="scroll-mt-24 bg-nb-surface py-12 lg:py-20">
      <div className="nb-container">
        <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Involvement</SectionLabel>
            <h2 className="nb-h2 font-heading font-black text-nb-text">
              Organizations &amp; Committees
            </h2>
          </div>
          <Badge variant="white">
            {items.length} role{items.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {currentItems.length > 0 ? (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 border-2 border-nb-border bg-nb-green" />
              <p className="font-mono text-xs font-bold uppercase text-nb-muted">Active</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((org) => (
                <OrganizationCard key={org._id} org={org} />
              ))}
            </div>
          </div>
        ) : null}

        {pastItems.length > 0 ? (
          <div>
            {currentItems.length > 0 ? (
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 border-2 border-nb-border bg-nb-pink" />
                <p className="font-mono text-xs font-bold uppercase text-nb-muted">Past</p>
              </div>
            ) : null}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pastItems.map((org) => (
                <OrganizationCard key={org._id} org={org} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
