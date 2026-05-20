import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import { urlFor } from "@/lib/sanity";
import { Profile, Skill } from "@/lib/types";

interface AboutProps {
  profile: Profile | null;
  skills?: Skill[];
}

export default function About({ profile, skills = [] }: AboutProps) {
  const fullName = profile?.fullName?.trim() || "Your Name";
  const aboutText =
    profile?.about ||
    "I design and build web experiences that feel fast, clear, and memorable.";
  const paragraphs = aboutText.split(/\n+/).filter(Boolean).slice(0, 4);
  const socialCount = Object.values(profile?.socials ?? {}).filter(Boolean).length;
  const avatarUrl = profile?.avatar
    ? urlFor(profile.avatar).auto("format").fit("crop").width(640).height(720).url()
    : null;

  return (
    <section id="about" className="scroll-mt-24 bg-nb-surface py-12 lg:py-20">
      <div className="nb-container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start lg:gap-10">
        <div className="mx-auto w-full max-w-[360px] md:max-w-none">
          <SectionLabel>About</SectionLabel>
          <Card className="p-4" interactive>
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={fullName}
                width={640}
                height={720}
                loading="lazy"
                className="aspect-[8/9] w-full max-w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[8/9] w-full items-center justify-center bg-nb-yellow">
                <span className="font-heading text-5xl font-black text-nb-text">DEV</span>
              </div>
            )}
          </Card>
        </div>

        <div>
          <h2 className="nb-h2 break-words font-heading font-black leading-tight text-nb-text">
            {fullName}
          </h2>
          <p className="mt-2 text-lg font-bold text-nb-muted">{profile?.headline || "Full Stack Developer"}</p>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-nb-muted lg:text-base">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card variant="yellow" className="p-4">
              <p className="font-mono text-xs font-bold uppercase text-nb-muted">Skills</p>
              <p className="mt-1 font-heading text-3xl font-black text-nb-text">{skills.length}+</p>
            </Card>
            <Card className="p-4">
              <p className="font-mono text-xs font-bold uppercase text-nb-muted">Links</p>
              <p className="mt-1 font-heading text-3xl font-black text-nb-text">{socialCount}</p>
            </Card>
            <Card className="p-4">
              <p className="font-mono text-xs font-bold uppercase text-nb-muted">Location</p>
              <p className="mt-2 text-sm font-bold text-nb-text">{profile?.location || "Remote / Hybrid"}</p>
            </Card>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="green">Available</Badge>
            {profile?.socials?.github ? (
              <Button href={profile.socials.github} target="_blank" rel="noopener noreferrer" variant="dark">
                GitHub -&gt;
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
