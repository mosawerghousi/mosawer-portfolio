import type { Metadata, Viewport } from "next";
import { Archivo, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-space",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Portfolio of Mosawer Ghousi — full-stack developer and DevOps engineer in Kabul, Afghanistan. Multi-tenant ERP and SaaS, production Flutter apps, and React UI kits, from the interface down to the deploy pipeline.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.portfolio),
  title: {
    default: "Mosawer Ghousi — Creative Full-Stack Developer",
    template: "%s · Mosawer Ghousi",
  },
  description: DESCRIPTION,
  keywords: [
    "Mosawer Ghousi",
    "full-stack developer",
    "DevOps engineer",
    "Flutter developer",
    "Next.js",
    "Django",
    "Laravel",
    "ERP",
    "Kabul",
    "Afghanistan",
  ],
  authors: [{ name: profile.name, url: profile.portfolio }],
  creator: profile.name,
  openGraph: {
    title: "Mosawer Ghousi — Creative Full-Stack Developer",
    description: profile.pitch,
    url: profile.portfolio,
    siteName: "Mosawer Ghousi",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mosawer Ghousi — Creative Full-Stack Developer",
    description: profile.pitch,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06080a",
  colorScheme: "dark",
};

// Rich result for a person, so search engines can render the profile properly.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.portfolio,
  address: { "@type": "PostalAddress", addressLocality: "Kabul", addressCountry: "AF" },
  sameAs: [profile.github, profile.linkedin],
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${playfair.variable} ${mono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
