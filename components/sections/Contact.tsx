"use client";

import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import SectionLabel from "@/components/ui/SectionLabel";
import Textarea from "@/components/ui/Textarea";
import { Profile } from "@/lib/types";

interface ContactProps {
  profile: Profile | null;
}

type FormErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type SocialItem = { key: string; href?: string; label: string; icon: ReactNode };
type ActiveSocialItem = SocialItem & { href: string };

function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="flex min-h-11 min-w-0 items-center gap-3 border-2 border-nb-border bg-nb-surface px-4 py-3 font-bold text-nb-text shadow-[3px_3px_0px_#111111] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
    >
      <span className="text-nb-blue">{icon}</span>
      <span className="min-w-0 break-words">{label}</span>
    </a>
  );
}

export default function Contact({ profile }: ContactProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const socialItems: SocialItem[] = [
    {
      key: "email",
      href: "mailto:ahnaffauzanzz@gmail.com",
      label: "ahnaffauzanzz@gmail.com",
      icon: <Mail aria-hidden="true" size={18} strokeWidth={2.5} />,
    },
    {
      key: "linkedin",
      href: profile?.socials?.linkedin,
      label: "LinkedIn",
      icon: <Linkedin aria-hidden="true" size={18} strokeWidth={2.5} />,
    },
    {
      key: "github",
      href: profile?.socials?.github,
      label: "GitHub",
      icon: <Github aria-hidden="true" size={18} strokeWidth={2.5} />,
    },
    {
      key: "instagram",
      href: profile?.socials?.instagram,
      label: "Instagram",
      icon: <Instagram aria-hidden="true" size={18} strokeWidth={2.5} />,
    },
    {
      key: "website",
      href: profile?.socials?.website,
      label: "Website",
      icon: <Globe aria-hidden="true" size={18} strokeWidth={2.5} />,
    },
  ];
  const socials = socialItems.filter(
    (item): item is ActiveSocialItem => typeof item.href === "string" && item.href.length > 0,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: FormErrors = {};
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name) nextErrors.name = "Nama wajib diisi.";
    if (!email) nextErrors.email = "Email wajib diisi.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Format email tidak valid.";
    if (!subject) nextErrors.subject = "Subjek wajib diisi.";
    if (!message) nextErrors.message = "Pesan wajib diisi.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-nb-bg py-12 lg:py-20">
      <div className="nb-container">
        <div className="mb-10">
          <SectionLabel>Let&apos;s Talk</SectionLabel>
          <h2 className="nb-h2 font-heading font-black leading-tight text-nb-text">
            Open to new opportunities
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-nb-muted lg:text-base">
            Have a project in mind or just want to connect? Feel free to reach out&mdash;I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card variant="yellow">
            <div className="mb-5 flex items-center gap-3">
              <Badge variant="green">Available for Work</Badge>
            </div>
            <p className="font-mono text-xs font-bold uppercase text-nb-muted">
              Available for freelance &amp; full-time
            </p>

            <div className="mt-6 grid gap-3">
              {socials.map((item) => (
                <SocialLink key={item.key} href={item.href} label={item.label} icon={item.icon} />
              ))}
            </div>
          </Card>

          <Card>
            <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
              {status === "success" ? (
                <div className="border-2 border-nb-border bg-nb-green px-4 py-3 font-bold text-nb-text shadow-[3px_3px_0px_#111111]">
                  Pesan berhasil divalidasi.
                </div>
              ) : null}
              {status === "error" ? (
                <div className="border-2 border-nb-border bg-nb-danger px-4 py-3 font-bold text-white shadow-[3px_3px_0px_#111111]">
                  Periksa kembali field yang ditandai.
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="Nama" name="name" placeholder="Nama" error={errors.name} />
                <Input label="Email" name="email" type="email" placeholder="Email" error={errors.email} />
              </div>
              <Input label="Subjek" name="subject" placeholder="Subjek" error={errors.subject} />
              <Textarea label="Pesan" name="message" placeholder="Pesan" error={errors.message} />
              <Button type="submit" variant="primary" className="w-full">
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
