import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import { Experience as ExperienceType } from "@/lib/types";

interface ExperienceProps {
  experiences: ExperienceType[];
}

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

export default function Experience({ experiences }: ExperienceProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="scroll-mt-24 bg-nb-bg py-12 lg:py-20">
      <div className="nb-container">
        <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Career</SectionLabel>
            <h2 className="nb-h2 font-heading font-black text-nb-text">Experience</h2>
          </div>
          <Badge variant="white">
            {experiences.length} position{experiences.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        <div className="relative grid gap-5 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-0.5 before:bg-nb-border lg:before:left-1/2 lg:before:-translate-x-1/2">
          {experiences.map((exp, index) => {
            const descriptionItems = exp.description?.split(/\n+/).filter(Boolean) ?? [];
            const isLeft = index % 2 === 0;

            return (
              <article
                key={exp._id}
                className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] lg:gap-5"
              >
                <span className="z-10 mt-6 h-5 w-5 border-2 border-nb-border bg-nb-yellow shadow-[2px_2px_0px_#111111] lg:col-start-2 lg:justify-self-center" />
                <Card
                  interactive
                  className={`min-w-0 ${isLeft ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-3 lg:row-start-1"}`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="nb-h3 break-words font-heading font-black leading-tight text-nb-text">{exp.role}</h3>
                        {exp.isCurrent ? <Badge variant="green">Current</Badge> : null}
                      </div>
                      <p className="mt-1 break-words text-base font-extrabold text-nb-blue">@ {exp.company}</p>
                    </div>

                    <div className="shrink-0 font-mono text-xs font-bold uppercase text-nb-muted sm:text-right">
                      <p>
                        {formatDate(exp.startDate)} - {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                      </p>
                      {exp.startDate ? <p className="mt-1">{getDuration(exp.startDate, exp.endDate, exp.isCurrent)}</p> : null}
                    </div>
                  </div>

                  {descriptionItems.length > 0 ? (
                    <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-nb-muted lg:text-sm">
                      {descriptionItems.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 border-2 border-nb-border bg-nb-pink" />
                          <span className="min-w-0 break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
