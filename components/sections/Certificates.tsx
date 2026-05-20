import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import { urlFor } from "@/lib/sanity";
import { Certificate, SanityImage } from "@/lib/types";

function formatMonthYear(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", { month: "short", year: "numeric" });
}

function getCertificateLogos(cert: Certificate): SanityImage[] {
  if (cert.logos && cert.logos.length > 0) return cert.logos;
  if (cert.logo) return [cert.logo];
  return [];
}

export default function Certificates({ items }: { items: Certificate[] }) {
  if (!items?.length) return null;

  return (
    <section id="certificates" className="scroll-mt-24 bg-nb-bg py-12 lg:py-20">
      <div className="nb-container">
        <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Credentials</SectionLabel>
            <h2 className="nb-h2 font-heading font-black text-nb-text">Certificates</h2>
          </div>
          <Badge variant="white">
            {items.length} credential{items.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((certificate, index) => {
            const logo = getCertificateLogos(certificate)[0];

            return (
              <Card key={certificate._id} className="flex h-full flex-col p-0" interactive>
                <div className="m-4 mb-0 flex aspect-video items-center justify-center border-2 border-nb-border bg-nb-surface">
                  {logo ? (
                    <Image
                      src={urlFor(logo).auto("format").fit("max").width(560).height(360).url()}
                      alt={`${certificate.title} logo`}
                      width={560}
                      height={360}
                      loading="lazy"
                      className="h-full w-full object-contain p-4"
                    />
                  ) : (
                    <span className="font-heading text-4xl font-black text-nb-text">CERT</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {certificate.skills?.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant={index % 2 === 0 ? "pink" : "blue"}>
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="nb-h3 break-words font-heading font-black leading-tight text-nb-text">{certificate.title}</h3>
                  {certificate.issuer ? (
                    <p className="mt-2 text-sm font-extrabold text-nb-blue">{certificate.issuer}</p>
                  ) : null}
                  {certificate.issueDate ? (
                    <p className="mt-3 font-mono text-xs font-bold uppercase text-nb-muted">
                      {formatMonthYear(certificate.issueDate)}
                    </p>
                  ) : null}

                  {certificate.credentialUrl ? (
                    <div className="mt-auto pt-5">
                      <Button
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        size="sm"
                        variant="secondary"
                      >
                        View Credential
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
