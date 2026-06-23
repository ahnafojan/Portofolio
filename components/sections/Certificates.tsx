"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { urlFor } from "@/lib/sanity";
import type { Certificate, SanityImage } from "@/lib/types";

const INITIAL_CERTIFICATE_LIMIT = 4;
const INITIAL_FILTER_LIMIT = 4;

function getCertificateLogos(certificate: Certificate): SanityImage[] {
  if (certificate.logos && certificate.logos.length > 0) return certificate.logos;
  if (certificate.logo) return [certificate.logo];
  return [];
}

function getBadgeVariant(index: number): "pink" | "blue" | "yellow" | "green" {
  return ["pink", "blue", "yellow", "green"][index % 4] as "pink" | "blue" | "yellow" | "green";
}

export default function Certificates({ items }: { items: Certificate[] }) {
  const [activeSkill, setActiveSkill] = useState("all");
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const skillFilters = useMemo(() => {
    const counts = new Map<string, number>();

    items.forEach((certificate) => {
      certificate.skills?.forEach((skill) => {
        const normalizedSkill = skill.trim();
        if (!normalizedSkill) return;
        counts.set(normalizedSkill, (counts.get(normalizedSkill) ?? 0) + 1);
      });
    });

    return [...counts.entries()]
      .sort(([skillA, countA], [skillB, countB]) => countB - countA || skillA.localeCompare(skillB))
      .map(([skill]) => skill);
  }, [items]);

  const filteredCertificates = useMemo(
    () =>
      activeSkill === "all"
        ? items
        : items.filter((certificate) => certificate.skills?.some((skill) => skill.toLowerCase() === activeSkill.toLowerCase())),
    [activeSkill, items],
  );

  const displayedCertificates = showAllCertificates
    ? filteredCertificates
    : filteredCertificates.slice(0, INITIAL_CERTIFICATE_LIMIT);
  const hiddenCertificateCount = filteredCertificates.length - displayedCertificates.length;
  const displayedFilters = showAllFilters ? skillFilters : skillFilters.slice(0, INITIAL_FILTER_LIMIT);
  const hiddenFilterCount = skillFilters.length - displayedFilters.length;

  const selectSkill = (skill: string) => {
    setActiveSkill(skill);
    setShowAllCertificates(false);
  };

  if (!items?.length) return null;

  return (
    <section id="certificates" className="scroll-mt-24 bg-nb-surface py-12 lg:py-20">
      <ScrollReveal className="nb-container">
        <div className="mb-4">
          <SectionLabel className="mb-1">Credentials</SectionLabel>
          <h2 className="nb-h2 font-heading font-black text-nb-text">Certificates</h2>
          <Badge variant="white" className="mt-3">
            {items.length} credential{items.length !== 1 ? "s" : ""}
          </Badge>
        </div>

          <div className="mb-5 flex flex-wrap gap-2" aria-label="Certificate skill filters">
            <button
              type="button"
              onClick={() => selectSkill("all")}
              className={`min-h-8 border-2 border-nb-border px-3 py-1 font-mono text-[11px] font-bold uppercase transition-[transform,box-shadow,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow ${
                activeSkill === "all"
                  ? "bg-nb-yellow text-nb-text shadow-[2px_2px_0px_#111111]"
                  : "bg-nb-surface text-nb-text hover:bg-nb-yellow"
              }`}
            >
              Semua
            </button>

            {displayedFilters.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => selectSkill(skill)}
                className={`min-h-8 border-2 border-nb-border px-3 py-1 font-mono text-[11px] font-bold uppercase transition-[transform,box-shadow,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow ${
                  activeSkill === skill
                    ? "bg-nb-yellow text-nb-text shadow-[2px_2px_0px_#111111]"
                    : "bg-nb-surface text-nb-text hover:bg-nb-yellow"
                }`}
              >
                {skill}
              </button>
            ))}

            {hiddenFilterCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowAllFilters(true)}
                className="min-h-8 border-2 border-dashed border-nb-border bg-transparent px-3 py-1 font-mono text-[11px] font-bold uppercase text-nb-text transition-colors hover:bg-nb-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow"
              >
                +{hiddenFilterCount} lainnya
              </button>
            ) : null}
          </div>

          {filteredCertificates.length > 0 ? (
            <div className="reveal-stagger grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {displayedCertificates.map((certificate, index) => {
                const logo = getCertificateLogos(certificate)[0];
                const certificateSkill = certificate.skills?.[0];
                const content = (
                  <>
                    <div className="flex aspect-square items-center justify-center border-b-2 border-nb-border bg-nb-surface p-2.5 sm:p-4">
                      {logo ? (
                        <Image
                          src={urlFor(logo).auto("format").fit("max").width(560).height(360).url()}
                          alt={`${certificate.title} logo`}
                          width={560}
                          height={360}
                          loading="lazy"
                          sizes="(max-width: 639px) 42vw, (max-width: 1024px) 30vw, 22vw"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="font-heading text-2xl font-black text-nb-text">CERT</span>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">
                      {certificateSkill ? (
                        <Badge variant={getBadgeVariant(index)} className="mb-1.5 px-2 py-0 text-[10px] sm:mb-3 sm:px-2.5 sm:py-0.5 sm:text-xs">
                          {certificateSkill}
                        </Badge>
                      ) : null}
                      <h3 className="line-clamp-3 break-words font-heading text-[13px] font-black leading-tight text-nb-text sm:line-clamp-2 sm:nb-h3">
                        {certificate.title}
                      </h3>
                      {certificate.issuer ? (
                        <p className="mt-1 line-clamp-2 text-[11px] font-extrabold leading-snug text-nb-blue sm:mt-2 sm:line-clamp-1 sm:text-sm">
                          {certificate.issuer}
                        </p>
                      ) : null}
                    </div>
                  </>
                );

                return (
                  <Card key={certificate._id} className="h-full overflow-hidden p-0" interactive>
                    {certificate.credentialUrl ? (
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${certificate.title} credential`}
                        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex h-full flex-col">{content}</div>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="border-2 border-dashed border-nb-border bg-nb-surface p-4 font-mono text-sm font-bold text-nb-muted">
              Belum ada sertifikat untuk skill ini.
            </p>
          )}

        {hiddenCertificateCount > 0 ? (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setShowAllCertificates(true)}
              className="font-mono text-xs font-bold uppercase text-nb-text underline decoration-2 underline-offset-4 transition-colors hover:text-nb-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
            >
              + {hiddenCertificateCount} lainnya
            </button>
          </div>
        ) : showAllCertificates && filteredCertificates.length > INITIAL_CERTIFICATE_LIMIT ? (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setShowAllCertificates(false)}
              className="font-mono text-xs font-bold uppercase text-nb-text underline decoration-2 underline-offset-4 transition-colors hover:text-nb-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
            >
              Tampilkan lebih sedikit
            </button>
          </div>
        ) : null}
      </ScrollReveal>
    </section>
  );
}
