import type { Metadata } from "next";
import { client, hasSanityConfig } from "@/lib/sanity";
import { allProjectsQuery } from "@/lib/queries";
import { Project } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProjectCard from "@/components/ui/ProjectCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of my projects and work.",
  openGraph: {
    title: "Projects",
    description: "A collection of my projects and work.",
    images: ["/logoahnaf.png"],
  },
};

export default async function ProjectsPage() {
  const projects = hasSanityConfig && client ? await client.fetch<Project[]>(allProjectsQuery) : [];
  const totalProjects = projects?.length ?? 0;
  const featuredProjects = projects?.filter((project) => project.featured).length ?? 0;
  const projectsWithDemo = projects?.filter((project) => Boolean(project.demoUrl)).length ?? 0;
  const projectsWithRepo = projects?.filter((project) => Boolean(project.repoUrl)).length ?? 0;

  return (
    <main className="min-h-screen bg-nb-bg text-nb-text">
      <Navbar />

      <div className="nb-container pt-28 pb-12 md:pt-32 md:pb-16">
        <Card variant="yellow" className="relative overflow-hidden">
          <div className="absolute right-5 top-5 hidden h-12 w-12 border-2 border-nb-border bg-nb-pink sm:block" />

          <Button href="/" variant="secondary" size="sm" className="mb-8 max-w-[calc(100%-3rem)]">
            &lt; Back home
          </Button>

          <h1 className="nb-h1 break-words font-heading font-black leading-tight text-nb-text">All Projects</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-nb-muted lg:text-base">
            Kumpulan project yang pernah saya kerjakan, dengan fokus pada pengalaman pengguna, performa, dan kualitas
            implementasi.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              `${totalProjects} total`,
              `${featuredProjects} featured`,
              `${projectsWithDemo} with demo`,
              `${projectsWithRepo} with repo`,
            ].map((item, index) => (
              <Badge key={item} variant={index % 2 === 0 ? "white" : "blue"}>
                {item}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <div className="nb-container pb-16 md:pb-20">
        {!projects || projects.length === 0 ? (
          <Card className="py-20 text-center">
            <p className="font-mono text-sm font-bold text-nb-muted">No projects yet.</p>
            <p className="mt-2 text-sm text-nb-muted">Tambahkan project baru dari Sanity Studio di /studio.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} priority={index === 0} tileOnMobile showFullImage />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
