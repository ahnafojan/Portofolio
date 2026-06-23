import Badge from "@/components/ui/Badge";
import ExperienceCard from "@/components/sections/ExperienceCard";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Experience as ExperienceType } from "@/lib/types";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="scroll-mt-24 bg-nb-surface py-12 lg:py-20">
      <ScrollReveal className="nb-container">
        <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Career</SectionLabel>
            <h2 className="nb-h2 font-heading font-black text-nb-text">Experience</h2>
          </div>
          <Badge variant="white">
            {experiences.length} position{experiences.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        <div className="reveal-stagger relative grid gap-5 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-0.5 before:bg-nb-border lg:before:left-1/2 lg:before:-translate-x-1/2">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience._id} experience={experience} isLeft={index % 2 === 0} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
