import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import { urlFor } from "@/lib/sanity";
import { Profile, Skill } from "@/lib/types";

const FALLBACK_SKILLS: Skill[] = [
  { _id: "hero-skill-1", name: "Next.js", level: 5, category: "Frontend" },
  { _id: "hero-skill-2", name: "TypeScript", level: 5, category: "Frontend" },
  { _id: "hero-skill-3", name: "React", level: 5, category: "Frontend" },
  { _id: "hero-skill-4", name: "Node.js", level: 4, category: "Backend" },
  { _id: "hero-skill-5", name: "Tailwind", level: 4, category: "Frontend" },
  { _id: "hero-skill-6", name: "Sanity", level: 4, category: "Tools" },
  { _id: "hero-skill-7", name: "PostgreSQL", level: 3, category: "Database" },
  { _id: "hero-skill-8", name: "Docker", level: 3, category: "DevOps" },
];

interface HeroProps {
  profile: Profile | null;
  skills?: Skill[];
}

export default function Hero({ profile, skills = [] }: HeroProps) {
  const fullName = profile?.fullName?.trim() || "Your Name";
  const headline = profile?.headline || "Full Stack Developer";
  const aboutText =
    profile?.about ||
    "I design and build web experiences that feel fast, clear, and memorable.";

  const socialLinks = [
    { href: profile?.socials?.github, label: "GitHub" },
    { href: profile?.socials?.linkedin, label: "LinkedIn" },
    { href: profile?.socials?.instagram, label: "Instagram" },
    { href: profile?.socials?.website, label: "Website" },
  ].filter((item): item is { href: string; label: string } => Boolean(item.href));

  const curatedSkills = (skills.length > 0 ? [...skills] : FALLBACK_SKILLS)
    .sort((a, b) => {
      const byLevel = (b.level ?? 0) - (a.level ?? 0);
      if (byLevel !== 0) return byLevel;
      return (a.order ?? 0) - (b.order ?? 0);
    })
    .slice(0, 8);

  const avatarUrl = profile?.avatar
    ? urlFor(profile.avatar).auto("format").fit("crop").width(720).height(720).url()
    : null;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-nb-bg">
      <div className="pointer-events-none absolute left-6 top-24 hidden h-16 w-16 border-2 border-nb-border bg-nb-pink shadow-hard lg:block" />
      <div className="pointer-events-none absolute bottom-16 right-8 hidden h-20 w-20 border-2 border-nb-border bg-nb-blue shadow-hard lg:block" />

      <div className="nb-container grid min-h-[calc(100svh-4rem)] items-center gap-8 py-12 md:grid-cols-[1fr_0.85fr] md:gap-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20">
        <div className="relative z-10 order-2 text-center md:order-1 md:text-left">
          <SectionLabel>Portfolio</SectionLabel>

          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Badge variant="green">Available</Badge>
            <p className="font-mono text-xs font-bold uppercase text-nb-muted">
              {profile?.location || "Remote / Hybrid"}
            </p>
          </div>

          <h1 className="nb-h1 break-words font-heading font-black leading-none text-nb-text">
            <span className="relative inline-block after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-4 after:w-full after:bg-nb-yellow">
              {fullName}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-snug text-nb-text md:mx-0 md:mt-6 md:text-xl lg:text-2xl">
            {headline}
          </p>

          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[15px] leading-relaxed text-nb-muted md:mx-0 lg:text-base">
            {aboutText}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button href="/projects" variant="primary">
              View Projects
            </Button>
            {profile?.socials?.github ? (
              <Button href={profile.socials.github} target="_blank" rel="noopener noreferrer" variant="secondary">
                GitHub -&gt;
              </Button>
            ) : (
              <Button href="#contact" variant="secondary">
                Contact
              </Button>
            )}
          </div>

          {socialLinks.length > 0 ? (
            <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold uppercase text-nb-blue underline decoration-2 underline-offset-4 transition-colors duration-150 hover:text-nb-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative z-10 order-1 mx-auto w-full max-w-[320px] md:order-2 md:max-w-[360px] lg:max-w-none">
          <Card variant="yellow" className="relative p-3 md:p-4 lg:p-5">
            <div className="absolute -right-2 -top-2 h-10 w-10 border-2 border-nb-border bg-nb-pink md:-right-4 md:-top-4 md:h-12 md:w-12" />
            <div className="absolute -bottom-2 -left-2 h-10 w-10 border-2 border-nb-border bg-nb-blue md:-bottom-4 md:-left-4 md:h-12 md:w-12" />

            <div className="nb-border bg-nb-surface p-3">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={fullName}
                  width={720}
                  height={720}
                  priority={true}
                  className="aspect-square w-full max-w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-nb-surface">
                  <span className="font-heading text-5xl font-black text-nb-text">DEV</span>
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs font-bold uppercase text-nb-muted">Orbit Focus</p>
                <p className="nb-h3 mt-1 font-heading font-black text-nb-text">
                  {curatedSkills[0]?.name ?? "Next.js"}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-bold uppercase text-nb-muted">Skills</p>
                <p className="nb-h3 mt-1 font-heading font-black text-nb-text">{curatedSkills.length}+</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {curatedSkills.slice(0, 6).map((skill, index) => (
                <Badge key={skill._id} variant={index % 2 === 0 ? "pink" : "blue"}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
