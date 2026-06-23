import Link from "next/link";
import { Project } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImageWithLoader from "@/components/ui/ImageWithLoader";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  priority?: boolean;
  compactOnMobile?: boolean;
  tileOnMobile?: boolean;
  horizontalOnMobile?: boolean;
  showFullImage?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
  priority = false,
  compactOnMobile = false,
  tileOnMobile = false,
  horizontalOnMobile = false,
  showFullImage = false,
}: ProjectCardProps) {
  const previewImage = project.thumbnails?.[0] ?? project.thumbnail;
  const detailHref = `/projects/${project.slug.current}`;
  const isMobilePreview = compactOnMobile || tileOnMobile || horizontalOnMobile;
  const imageDimensions = previewImage?.asset.metadata?.dimensions;
  const imageWidth = imageDimensions?.width ?? 960;
  const imageHeight = imageDimensions?.height ?? 540;
  const shouldShowFullImage = showFullImage || featured;
  const imageSrc = previewImage
    ? shouldShowFullImage
      ? urlFor(previewImage).auto("format").fit("max").width(1200).height(1200).url()
      : urlFor(previewImage).auto("format").fit("crop").width(960).height(540).url()
    : null;

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden p-0",
        featured && "lg:grid lg:grid-cols-[1.1fr_0.9fr]",
        compactOnMobile && !showFullImage && "grid grid-cols-[112px_minmax(0,1fr)] gap-0 sm:flex",
        horizontalOnMobile && "grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-0 sm:flex",
      )}
      interactive
      variant={featured && project.highlightYellow ? "yellow" : "default"}
    >
      <div
        className={cn(
          "relative nb-border overflow-hidden bg-nb-surface",
          showFullImage && tileOnMobile
            ? "m-2 mb-0 flex aspect-[4/3] items-center justify-center sm:m-4 sm:mb-0 sm:aspect-video"
            : showFullImage
            ? "m-3 mb-0 flex max-h-64 items-center justify-center sm:m-4 sm:mb-0 sm:max-h-80"
            : compactOnMobile
            ? "m-3 mb-3 h-[88px] sm:m-4 sm:mb-0 sm:h-auto"
            : tileOnMobile
              ? "m-2 mb-0 sm:m-4 sm:mb-0"
              : horizontalOnMobile
                ? "m-3 mb-3 sm:m-4 sm:mb-0"
              : "m-3 mb-0 sm:m-4 sm:mb-0",
          featured && "lg:mb-4",
        )}
      >
        {previewImage && imageSrc ? (
          <ImageWithLoader
            src={imageSrc}
            alt={project.title}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className={cn(
              featured
                ? "h-full w-full object-contain"
                : showFullImage
                ? tileOnMobile
                  ? "h-full w-full object-contain"
                  : "h-auto max-h-64 max-w-full object-contain sm:max-h-80"
                : compactOnMobile
                ? "h-full w-full object-cover sm:aspect-video sm:h-auto"
                : tileOnMobile
                  ? "aspect-[4/3] w-full object-cover sm:aspect-video"
                  : horizontalOnMobile
                    ? "h-full w-full object-cover sm:aspect-video sm:h-auto"
                    : "aspect-video w-full object-cover",
            )}
            sizes={
              showFullImage
                ? tileOnMobile
                  ? "(max-width: 640px) 45vw, (max-width: 1024px) 50vw, 33vw"
                  : "(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 50vw, 33vw"
                : compactOnMobile
                ? "(max-width: 640px) 112px, (max-width: 1024px) 50vw, 33vw"
                : featured
                  ? "(max-width: 1024px) 100vw, 620px"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        ) : (
          <div
            className={cn(
              "flex w-full items-center justify-center bg-nb-bg",
              showFullImage
                ? tileOnMobile
                  ? "h-full"
                  : "min-h-40 sm:min-h-56"
                : compactOnMobile
                ? "h-full sm:aspect-video"
                : tileOnMobile
                  ? "aspect-[4/3] sm:aspect-video"
                  : horizontalOnMobile
                    ? "h-full aspect-[4/3] sm:aspect-video"
                    : "aspect-video",
            )}
          >
            <span className="font-mono text-sm font-bold text-nb-muted">no preview</span>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          compactOnMobile
            ? showFullImage
              ? "gap-2 p-3 sm:gap-4 sm:p-5"
              : "gap-2 p-3 pl-0 sm:gap-4 sm:p-5"
            : tileOnMobile
              ? "gap-2 p-3 sm:gap-4 sm:p-5"
              : horizontalOnMobile
                ? "gap-2 p-3 pl-0 sm:gap-4 sm:p-5"
              : "gap-3 p-4 sm:gap-4 sm:p-5",
        )}
      >
        <div className={cn("flex flex-wrap items-center gap-2", isMobilePreview && "hidden sm:flex")}>
          {featured ? <Badge variant="dark">FEATURED</Badge> : null}
          {project.featured && !featured ? <Badge variant="yellow">Featured project</Badge> : null}
        </div>

        <div>
          <Link
            href={detailHref}
            className={cn(
              "break-words font-heading font-black leading-tight text-nb-text transition-colors duration-150 hover:text-nb-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow",
              compactOnMobile
                ? "line-clamp-2 text-base sm:nb-h3"
                : tileOnMobile
                  ? "line-clamp-2 text-sm sm:nb-h3"
                  : horizontalOnMobile
                    ? "line-clamp-3 text-sm sm:nb-h3"
                  : "nb-h3",
            )}
          >
            {project.title}
          </Link>
          {project.summary ? (
            <p
              className={cn(
                "leading-relaxed text-nb-muted",
                compactOnMobile
                  ? "mt-1.5 line-clamp-2 text-xs sm:mt-3 sm:text-sm"
                  : tileOnMobile
                    ? "mt-1.5 line-clamp-3 text-xs sm:mt-3 sm:text-[15px] lg:text-sm"
                    : horizontalOnMobile
                      ? "mt-1.5 line-clamp-3 text-xs sm:mt-3 sm:text-[15px] lg:text-sm"
                    : "mt-2 line-clamp-2 text-sm sm:mt-3 sm:line-clamp-3 sm:text-[15px] lg:text-sm",
              )}
            >
              {project.summary}
            </p>
          ) : null}
        </div>

        {project.techStack && project.techStack.length > 0 ? (
          <div className={cn("mt-auto flex flex-wrap gap-1.5 sm:gap-2", isMobilePreview && "hidden sm:flex")}>
            {project.techStack.slice(0, 5).map((tech, index) => (
              <Badge key={tech} variant="blue" className={index > 2 ? "hidden sm:inline-flex" : undefined}>
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 ? <Badge className="sm:hidden" variant="white">+{project.techStack.length - 3}</Badge> : null}
            {project.techStack.length > 5 ? <Badge className="hidden sm:inline-flex" variant="white">+{project.techStack.length - 5}</Badge> : null}
          </div>
        ) : null}

        {isMobilePreview ? (
          <Button href={detailHref} size="sm" variant="secondary" className="mt-auto min-h-0 px-2 py-1 text-[11px] sm:hidden">
            View project
          </Button>
        ) : null}

        <div className={cn("flex flex-wrap gap-2 pt-1 sm:gap-3", isMobilePreview && "hidden sm:flex")}>
          {project.demoUrl ? (
            <Button
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="primary"
              className="flex-1 px-2 text-xs sm:flex-none sm:px-3 sm:text-sm"
            >
              Live Demo -&gt;
            </Button>
          ) : null}
          {project.repoUrl ? (
            <Button
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="secondary"
              className="flex-1 px-2 text-xs sm:flex-none sm:px-3 sm:text-sm"
            >
              GitHub Repo -&gt;
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
