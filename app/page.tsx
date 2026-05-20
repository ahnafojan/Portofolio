import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { client, hasSanityConfig } from "@/lib/sanity";
import {
  profileQuery,
  featuredProjectsQuery,
  experiencesQuery,
  skillsQuery,
  ORGANIZATIONS_QUERY,
  CERTIFICATES_QUERY,
} from "@/lib/queries";
import {
  Profile,
  Project,
  Experience as ExperienceType,
  Skill,
  Certificate,
  Organization,
} from "@/lib/types";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

const loadingFallback = () => (
  <div className="bg-nb-bg py-12">
    <div className="nb-container">
      <div className="border-2 border-nb-border bg-nb-surface p-4 font-mono text-sm font-bold text-nb-muted shadow-hard">
      ...
      </div>
    </div>
  </div>
);

const About = dynamic(() => import("@/components/sections/About"), { loading: loadingFallback });
const Experience = dynamic(() => import("@/components/sections/Experience"), { loading: loadingFallback });
const OrganizationSection = dynamic(() => import("@/components/sections/Organization"), { loading: loadingFallback });
const Projects = dynamic(() => import("@/components/sections/Projects"), { loading: loadingFallback });
const Skills = dynamic(() => import("@/components/sections/Skills"), { loading: loadingFallback });
const Certificates = dynamic(() => import("@/components/sections/Certificates"), { loading: loadingFallback });
const Contact = dynamic(() => import("@/components/sections/Contact"), { loading: loadingFallback });

export default async function Home() {
  if (!hasSanityConfig || !client) {
    return (
      <main className="min-h-screen bg-nb-bg text-nb-text">
        <Navbar />
        <section className="nb-container py-12">
          <Card>
            Data Sanity belum aktif di environment ini. Set{" "}
            <code className="font-mono font-bold text-nb-blue">NEXT_PUBLIC_SANITY_PROJECT_ID</code> dan{" "}
            <code className="font-mono font-bold text-nb-blue">NEXT_PUBLIC_SANITY_DATASET</code> di Vercel,
            lalu redeploy.
          </Card>
        </section>
        <Projects projects={[]} />
        <Skills skills={[]} />
        <Experience experiences={[]} />
        <OrganizationSection items={[]} />
        <Certificates items={[]} />
        <Footer />
      </main>
    );
  }

  const [
    profile,
    featuredProjects,
    experiences,
    skills,
    organizations,
    certificates,
  ] = await Promise.all([
    client.fetch<Profile | null>(profileQuery),
    client.fetch<Project[]>(featuredProjectsQuery),
    client.fetch<ExperienceType[]>(experiencesQuery),
    client.fetch<Skill[]>(skillsQuery),
    client.fetch<Organization[]>(ORGANIZATIONS_QUERY),
    client.fetch<Certificate[]>(CERTIFICATES_QUERY),
  ]);

  return (
    <main className="min-h-screen bg-nb-bg text-nb-text">
      <Navbar />
      {profile ? <Hero profile={profile} skills={skills ?? []} /> : null}
      {profile ? <About profile={profile} skills={skills ?? []} /> : null}
      <Experience experiences={experiences ?? []} />
      <OrganizationSection items={organizations ?? []} />
      <Projects projects={featuredProjects ?? []} />
      <Skills skills={skills ?? []} />
      <Certificates items={certificates ?? []} />
      {profile ? <Contact profile={profile} /> : null}
      <Footer fullName={profile?.fullName} />
    </main>
  );
}
