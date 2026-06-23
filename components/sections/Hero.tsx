import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import HeroDescription from "@/components/sections/HeroDescription";
import { urlFor } from "@/lib/sanity";
import { Profile, Skill } from "@/lib/types";
import { splitName } from "@/lib/utils";

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
  const { first, last } = splitName(fullName);
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
          <SectionLabel className="hero-enter hero-enter-label">About</SectionLabel>

          <div className="hero-enter hero-enter-profile mb-5 flex items-center gap-3 md:hidden">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border-2 border-nb-border bg-nb-surface shadow-[3px_3px_0px_#111111]">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={fullName}
                  width={160}
                  height={160}
                  priority={true}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <span className="font-heading text-2xl font-black text-nb-text">DEV</span>
              )}
            </div>

            <div className="min-w-0">
              <Badge variant="green" className="px-2 py-0 text-[10px]">Available</Badge>
              <h1 className="mt-1 break-words font-heading text-2xl font-black leading-none text-nb-text">
                {first ? <span className="font-light tracking-tight">{first} </span> : null}
                <span className="tracking-tighter">{last}</span>
              </h1>
              <p className="mt-1 line-clamp-1 text-sm font-bold text-nb-text">{headline}</p>
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase text-nb-muted">
                {profile?.location || "Remote / Hybrid"}
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="hero-enter hero-enter-status mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
              <Badge variant="green">Available</Badge>
              <p className="font-mono text-xs font-semibold uppercase text-nb-muted">
                {profile?.location || "Remote / Hybrid"}
              </p>
            </div>

            <h1 className="hero-enter hero-enter-name mb-2 break-words font-heading text-[clamp(40px,7vw,68px)] leading-none text-[#111111]">
              {first ? (
                <span className="font-light tracking-tight text-[#111111]">{first} </span>
              ) : null}
              <span className="font-black tracking-tighter text-[#111111]">{last}</span>
            </h1>

            <p className="hero-enter hero-enter-headline mt-4 max-w-2xl text-base font-semibold leading-snug text-nb-text md:mt-6 md:text-xl lg:text-2xl">
              {headline}
            </p>
          </div>

          <HeroDescription text={aboutText} className="hero-enter hero-enter-description" />

          <div className="hero-enter hero-enter-actions mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <Button href="/projects" variant="primary" className="min-h-[48px] w-full sm:w-auto">
              Lihat Proyek
            </Button>
            <Button href="#contact" variant="secondary" className="min-h-[48px] w-full sm:w-auto">
              Hubungi Saya
            </Button>
          </div>

          {socialLinks.length > 0 ? (
            <div className="hero-enter hero-enter-social mt-6 flex flex-wrap gap-4">
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

        <div className="hero-enter hero-enter-card relative z-10 order-2 mx-auto hidden w-full max-w-[360px] md:block md:translate-y-5 lg:max-w-none lg:translate-y-8">
          <Card variant="yellow" className="relative p-2 sm:p-3 md:p-4 lg:p-5">
            <div className="absolute -right-2 -top-2 hidden h-10 w-10 border-2 border-nb-border bg-nb-pink sm:block md:-right-4 md:-top-4 md:h-12 md:w-12" />
            <div className="absolute -bottom-2 -left-2 hidden h-10 w-10 border-2 border-nb-border bg-nb-blue sm:block md:-bottom-4 md:-left-4 md:h-12 md:w-12" />

            <div className="nb-border bg-nb-surface p-2 sm:p-3">
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

            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-nb-muted sm:text-xs">{heroFocusLabel}</p>
                <p className="mt-1 font-heading text-lg font-black text-nb-text sm:nb-h3">
                  {heroFocusValue}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-nb-muted sm:text-xs">{heroSkillCountLabel}</p>
                <p className="mt-1 font-heading text-lg font-black text-nb-text sm:nb-h3">{skillCount}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
              {heroSkills.map((skill, index) => (
                <Badge
                  key={skill._id}
                  variant={index % 2 === 0 ? "pink" : "blue"}
                  className={index > 3 ? "hidden sm:inline-flex" : "px-2 py-0 text-[10px] sm:px-2.5 sm:py-0.5 sm:text-xs"}
                >
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
