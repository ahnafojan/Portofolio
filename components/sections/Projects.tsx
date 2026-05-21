import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  const displayedProjects = projects.slice(0, 4);
  const [featuredProject, ...restProjects] = displayedProjects;

  return (
    <section id="projects" className="scroll-mt-24 bg-nb-bg py-12 lg:py-20">
      <div className="nb-container">
        <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="nb-h2 font-heading font-black text-nb-text">Featured Projects</h2>
          </div>
          <Button href="/projects" variant="secondary">
            All projects
          </Button>
        </div>

        <div className="grid gap-5">
          <ProjectCard project={featuredProject} featured priority={true} />

          {restProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {restProjects.map((project) => (
                <ProjectCard key={project._id} project={project} priority={true} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10">
          <Button href="/projects" variant="dark">
            View all {projects.length}+ projects
          </Button>
        </div>
      </div>
    </section>
  );
}
