"use client";

import emailjs from "@emailjs/browser";
import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import SectionLabel from "@/components/ui/SectionLabel";
import Textarea from "@/components/ui/Textarea";
import { Profile } from "@/lib/types";

interface ContactProps {
  profile: Profile | null;
}

type FormData = {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
};

type SendStatus = "idle" | "loading" | "success" | "error";
type FormErrors = Partial<FormData>;
type SocialItem = { key: string; href?: string; label: string; icon: ReactNode };
type ActiveSocialItem = SocialItem & { href: string };

const initialForm: FormData = {
  from_name: "",
  from_email: "",
  subject: "",
  message: "",
};

function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="flex min-h-11 min-w-0 items-center gap-3 border-2 border-nb-border bg-nb-surface px-4 py-3 font-bold text-nb-text shadow-[3px_3px_0px_#111111] transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
    >
      <span className="text-nb-blue">{icon}</span>
      <span className="min-w-0 break-words">{label}</span>
    </a>
  );
}

export default function Contact({ profile }: ContactProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SendStatus>("idle");

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

  useEffect(() => {
    if (status !== "success") return;

    const timeout = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.from_name.trim()) nextErrors.from_name = "Nama wajib diisi";

    if (!form.from_email.trim()) {
      nextErrors.from_email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) {
      nextErrors.from_email = "Format email tidak valid";
    }

    if (!form.subject.trim()) nextErrors.subject = "Subjek wajib diisi";

    if (!form.message.trim()) {
      nextErrors.message = "Pesan wajib diisi";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Pesan minimal 10 karakter";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange =
    (field: keyof FormData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      setStatus("idle");
      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.from_name,
          from_email: form.from_email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("success");
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  }

  const submitLabel = {
    idle: "KIRIM PESAN",
    loading: "MENGIRIM...",
    success: "PESAN TERKIRIM!",
    error: "GAGAL KIRIM - COBA LAGI",
  }[status];

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
                  Pesan berhasil dikirim! Saya akan membalas segera.
                </div>
              ) : null}
              {status === "error" ? (
                <div className="border-2 border-nb-border bg-nb-danger px-4 py-3 font-bold text-white shadow-[3px_3px_0px_#111111]">
                  Gagal mengirim pesan. Cek koneksi dan coba lagi.
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="Nama"
                  name="from_name"
                  placeholder="Nama"
                  value={form.from_name}
                  onChange={handleChange("from_name")}
                  error={errors.from_name}
                />
                <Input
                  label="Email"
                  name="from_email"
                  type="email"
                  placeholder="Email"
                  value={form.from_email}
                  onChange={handleChange("from_email")}
                  error={errors.from_email}
                />
              </div>
              <Input
                label="Subjek"
                name="subject"
                placeholder="Subjek"
                value={form.subject}
                onChange={handleChange("subject")}
                error={errors.subject}
              />
              <Textarea
                label="Pesan"
                name="message"
                placeholder="Pesan"
                value={form.message}
                onChange={handleChange("message")}
                error={errors.message}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={[
                  "inline-flex min-h-12 w-full items-center justify-center gap-2 border-2 border-[#111111] px-5 py-3 font-bold uppercase tracking-[0.03em] transition-[transform,box-shadow,background-color,color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow",
                  status === "idle" &&
                    "bg-[#FFD447] text-[#111111] shadow-[3px_3px_0_#111111] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
                  status === "loading" && "cursor-not-allowed bg-[#111111] text-[#FFD447]",
                  status === "success" &&
                    "cursor-not-allowed bg-[#6BCB77] text-[#111111] shadow-[3px_3px_0_#111111]",
                  status === "error" &&
                    "bg-[#FF4D4D] text-white shadow-[3px_3px_0_#111111] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {status === "loading" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFD447] border-t-transparent" />
                ) : null}
                {submitLabel}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
