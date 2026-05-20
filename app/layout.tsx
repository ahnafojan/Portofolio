import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "Personal portfolio",
  openGraph: {
    title: "Portfolio",
    description: "Personal portfolio",
    type: "website",
    images: [
      {
        url: "/logoahnaf.png",
        width: 1200,
        height: 630,
        alt: "Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description: "Personal portfolio",
    images: ["/logoahnaf.png"],
  },
  icons: {
    icon: "/logoahnaf.png",
    shortcut: "/logoahnaf.png",
    apple: "/logoahnaf.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-nb-bg text-nb-text antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
