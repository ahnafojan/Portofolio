import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ fullName }: { fullName?: string }) {
  return (
    <footer className="border-t-2 border-nb-border bg-nb-text text-white">
      <div className="nb-container flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="break-words font-mono text-xs font-bold uppercase text-nb-yellow">
          {fullName ?? "Portfolio"} &copy; {new Date().getFullYear()}
        </p>

        <div className="flex flex-wrap gap-4">
          {FOOTER_LINKS.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-white transition-colors duration-150 hover:text-nb-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-white transition-colors duration-150 hover:text-nb-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nb-yellow"
              >
                {item.label}
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
