import { notFound } from "next/navigation";
import { Metadata } from "next";
import { client, hasSanityConfig, urlFor } from "@/lib/sanity";
import { projectBySlugQuery, allProjectsQuery } from "@/lib/queries";
import { Project } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProjectImageCarousel from "@/components/ui/ProjectImageCarousel";
import SectionLabel from "@/components/ui/SectionLabel";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const revalidate = 60;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!hasSanityConfig || !client) return [];

  const projects = await client.fetch<Project[]>(allProjectsQuery);
  return (projects ?? []).map((project) => ({ slug: project.slug.current }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  if (!hasSanityConfig || !client) {
    return {
      title: "Project",
      description: "",
      openGraph: {
        title: "Project",
        description: "",
        images: ["/logoahnaf.png"],
      },
    };
  }

  const { slug } = await params;
  const project = await client.fetch<Project>(projectBySlugQuery, { slug });
  const previewImage = project?.thumbnails?.[0] ?? project?.thumbnail;
  const imageUrl = previewImage
    ? urlFor(previewImage).auto("format").fit("crop").width(1200).height(630).url()
    : "/logoahnaf.png";

  return {
    title: project?.title ?? "Project",
    description: project?.summary ?? "",
    openGraph: {
      title: project?.title ?? "Project",
      description: project?.summary ?? "",
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  if (!hasSanityConfig || !client) notFound();

  const { slug } = await params;
  const project = await client.fetch<Project>(projectBySlugQuery, { slug });

  if (!project) notFound();

  const techStack = project.techStack ?? [];
  const summary = project.summary ?? "No summary is available for this project yet.";
  const galleryImages =
    project.thumbnails && project.thumbnails.length > 0
      ? project.thumbnails
      : project.thumbnail
        ? [project.thumbnail]
        : [];

  return (
    <main className="min-h-screen bg-nb-bg text-nb-text">
      <Navbar />

      <div className="nb-container pt-24 pb-12 md:py-16">
        <Card variant="yellow" className="relative overflow-hidden">
          <div className="absolute right-5 top-5 hidden h-12 w-12 border-2 border-nb-border bg-nb-pink sm:block" />

          <Button href="/projects" variant="secondary" size="sm" className="mb-8 max-w-[calc(100%-3rem)]">
            &lt; All projects
          </Button>

          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <SectionLabel className="mb-0">Case Study</SectionLabel>
            {project.featured ? <Badge variant="dark">Featured project</Badge> : null}
          </div>

          <h1 className="nb-h1 break-words font-heading font-black leading-tight text-nb-text">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-nb-muted lg:text-base">{summary}</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Badge variant="white">
              {techStack.length} tech stack
            </Badge>
            <Badge variant={project.demoUrl ? "green" : "white"}>demo {project.demoUrl ? "available" : "none"}</Badge>
            <Badge variant={project.repoUrl ? "blue" : "white"}>
              repository {project.repoUrl ? "available" : "none"}
            </Badge>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.demoUrl ? (
              <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                Live Demo -&gt;
              </Button>
            ) : null}
            {project.repoUrl ? (
              <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                GitHub Repo -&gt;
              </Button>
            ) : null}
          </div>
        </Card>

        <section className="mt-8">
          {galleryImages.length > 0 ? (
            <Card className="overflow-hidden p-0">
              <ProjectImageCarousel images={galleryImages} title={project.title} />
            </Card>
          ) : (
            <Card className="py-16 text-center">
              <p className="font-mono text-sm font-bold text-nb-muted">No preview image available.</p>
            </Card>
          )}
        </section>

        <section className="mt-8">
          <Card>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SectionLabel className="mb-0">Tech Stack</SectionLabel>
              <Badge variant="white">
                {techStack.length} item{techStack.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {techStack.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2.5">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="blue">
                    {tech}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-nb-muted">No stack information provided.</p>
            )}
          </Card>
        </section>
      </div>

      <Footer />
    </main>
  );
}
