import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  priority?: boolean;
}

export default function ProjectCard({ project, featured = false, priority = false }: ProjectCardProps) {
  const previewImage = project.thumbnails?.[0] ?? project.thumbnail;

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden p-0",
        featured && "lg:grid lg:grid-cols-[1.1fr_0.9fr]",
      )}
      interactive
      variant={featured ? "yellow" : "default"}
    >
      <div className="nb-border m-4 mb-0 overflow-hidden bg-nb-surface lg:mb-4">
        {previewImage ? (
          <Image
            src={urlFor(previewImage).auto("format").fit("crop").width(960).height(540).url()}
            alt={project.title}
            width={960}
            height={540}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="aspect-video w-full max-w-full object-cover"
            sizes={featured ? "(max-width: 1024px) 100vw, 620px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-nb-bg">
            <span className="font-mono text-sm font-bold text-nb-muted">no preview</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {featured ? <Badge variant="dark">FEATURED</Badge> : null}
          {project.featured && !featured ? <Badge variant="yellow">Featured project</Badge> : null}
        </div>

        <div>
          <Link
            href={`/projects/${project.slug.current}`}
            className="nb-h3 break-words font-heading font-black leading-tight text-nb-text transition-colors duration-150 hover:text-nb-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
          >
            {project.title}
          </Link>
          {project.summary ? (
            <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-nb-muted lg:text-sm">{project.summary}</p>
          ) : null}
        </div>

        {project.techStack && project.techStack.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="blue">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 5 ? <Badge variant="white">+{project.techStack.length - 5}</Badge> : null}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-1">
          {project.demoUrl ? (
            <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" size="sm" variant="primary">
              Live Demo -&gt;
            </Button>
          ) : null}
          {project.repoUrl ? (
            <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer" size="sm" variant="secondary">
              GitHub Repo -&gt;
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
