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

function uniqueSkillsByName(skills: Skill[]) {
  const seen = new Set<string>();
  return skills.filter((skill) => {
    const key = skill.name.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

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

  const sortedSkills = (skills.length > 0 ? [...skills] : FALLBACK_SKILLS)
    .sort((a, b) => {
      const byLevel = (b.level ?? 0) - (a.level ?? 0);
      if (byLevel !== 0) return byLevel;
      return (a.order ?? 0) - (b.order ?? 0);
    });
  const heroSkills = uniqueSkillsByName(sortedSkills).slice(0, 6);
  const skillCount = skills.length > 0 ? skills.length : FALLBACK_SKILLS.length;
  const heroFocusLabel = profile?.heroFocusLabel?.trim() || "Focus Area";
  const heroFocusValue = profile?.heroFocusValue?.trim() || sortedSkills[0]?.name || "Next.js";
  const heroSkillCountLabel = profile?.heroSkillCountLabel?.trim() || "Skills";

  const avatarUrl = profile?.avatar
    ? urlFor(profile.avatar).auto("format").fit("crop").width(720).height(720).url()
    : null;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-nb-bg">
      <div className="pointer-events-none absolute left-6 top-24 hidden h-16 w-16 border-2 border-nb-border bg-nb-pink shadow-hard sm:block lg:block" />
      <div className="pointer-events-none absolute bottom-16 right-8 hidden h-20 w-20 border-2 border-nb-border bg-nb-blue shadow-hard sm:block lg:block" />

      <div className="nb-container grid min-h-screen items-center gap-4 pt-24 pb-10 sm:gap-8 sm:py-12 md:min-h-[calc(100svh-4rem)] md:grid-cols-[1fr_0.85fr] md:gap-8 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20">
        <div className="relative z-10 order-1 text-left">
          <SectionLabel>Portfolio</SectionLabel>

          <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
            <Badge variant="green">Available</Badge>
            <p className="font-mono text-xs font-semibold uppercase text-nb-muted">
              {profile?.location || "Remote / Hybrid"}
            </p>
          </div>

          <h1 className="break-words font-heading text-[clamp(36px,10vw,52px)] font-black leading-none text-nb-text md:nb-h1">
            <span className="relative inline-block after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-4 after:w-full after:bg-nb-yellow">
              {fullName}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base font-semibold leading-snug text-nb-text md:mt-6 md:text-xl lg:text-2xl">
            {headline}
          </p>

          <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-[1.7] text-nb-muted sm:text-[15px] lg:text-base">
            {aboutText}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <Button href="/projects" variant="primary" className="min-h-[48px] w-full sm:w-auto">
              Lihat Proyek
            </Button>
            <Button href="#contact" variant="secondary" className="min-h-[48px] w-full sm:w-auto">
              Hubungi Saya
            </Button>
          </div>

          {socialLinks.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-4">
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

        <div className="relative z-10 order-2 mx-auto hidden w-full max-w-[360px] sm:block lg:max-w-none">
          <Card variant="yellow" className="relative p-3 md:p-4 lg:p-5">
            <div className="absolute -right-2 -top-2 hidden h-10 w-10 border-2 border-nb-border bg-nb-pink sm:block md:-right-4 md:-top-4 md:h-12 md:w-12" />
            <div className="absolute -bottom-2 -left-2 hidden h-10 w-10 border-2 border-nb-border bg-nb-blue sm:block md:-bottom-4 md:-left-4 md:h-12 md:w-12" />

            <div className="nb-border bg-nb-surface p-3">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={fullName}
                  width={720}
                  height={720}
                  priority={true}
                  className="aspect-square w-full max-w-full object-cover object-top"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-nb-surface">
                  <span className="font-heading text-5xl font-black text-nb-text">DEV</span>
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs font-bold uppercase text-nb-muted">{heroFocusLabel}</p>
                <p className="nb-h3 mt-1 font-heading font-black text-nb-text">
                  {heroFocusValue}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-bold uppercase text-nb-muted">{heroSkillCountLabel}</p>
                <p className="nb-h3 mt-1 font-heading font-black text-nb-text">{skillCount}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {heroSkills.map((skill, index) => (
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
