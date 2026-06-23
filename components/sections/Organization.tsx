import Badge from "@/components/ui/Badge";
import SectionLabel from "@/components/ui/SectionLabel";
import OrganizationCard from "@/components/sections/OrganizationCard";
import { Organization } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function OrganizationSection({ items }: { items: Organization[] }) {
  if (!items?.length) return null;

  const currentItems = items.filter((item) => item.isCurrent);
  const pastItems = items.filter((item) => !item.isCurrent);

  return (
    <section id="organizations" className="scroll-mt-24 bg-nb-bg py-12 lg:py-20">
      <ScrollReveal className="nb-container">
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
            <div className="reveal-stagger grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="reveal-stagger grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pastItems.map((org) => (
                <OrganizationCard key={org._id} org={org} />
              ))}
            </div>
          </div>
        ) : null}
      </ScrollReveal>
    </section>
  );
}
