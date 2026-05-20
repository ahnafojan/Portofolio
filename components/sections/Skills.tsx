import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import { Skill } from "@/lib/types";

interface SkillsProps {
  skills: Skill[];
}

const categoryOrder = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"];

function getCategoryRank(category: string) {
  const index = categoryOrder.indexOf(category);
  return index === -1 ? categoryOrder.length : index;
}

export default function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) return null;

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const category = skill.category ?? "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => getCategoryRank(a) - getCategoryRank(b) || a.localeCompare(b),
  );

  return (
    <section id="skills" className="scroll-mt-24 bg-nb-surface py-12 lg:py-20">
      <div className="nb-container">
        <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="nb-h2 font-heading font-black text-nb-text">Skills &amp; Tools</h2>
          </div>
          <Badge variant="white">{skills.length} technologies</Badge>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedCategories.map((category, index) => (
            <Card key={category} variant={index % 3 === 0 ? "yellow" : "default"} interactive>
              <div className="mb-5 flex items-center justify-between gap-3 border-b-2 border-nb-border pb-4">
                <h3 className="font-mono text-sm font-black uppercase text-nb-text">{category}</h3>
                <Badge variant={index % 2 === 0 ? "pink" : "blue"}>{grouped[category].length}</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {grouped[category].map((skill) => (
                  <span
                    key={skill._id}
                    className="inline-flex min-h-8 max-w-full items-center gap-2 rounded-[4px] border-2 border-nb-border bg-nb-surface px-3 py-1.5 font-mono text-xs font-bold text-nb-text shadow-[2px_2px_0px_#111111]"
                  >
                    <span className="h-2.5 w-2.5 border-2 border-nb-border bg-nb-blue" aria-hidden="true" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
