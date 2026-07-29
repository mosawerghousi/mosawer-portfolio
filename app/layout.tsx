import type { Metadata } from "next";
import { Archivo, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Mosawer Ghousi — Creative Full-Stack Developer",
  description:
    "Portfolio of Mosawer Ghousi, a full-stack developer and DevOps engineer in Kabul, Afghanistan — building Zoroo, a multi-tenant business SaaS, plus production Flutter and React UI kits.",
  openGraph: {
    title: "Mosawer Ghousi — Creative Full-Stack Developer",
    description:
      "Building the software behind real Afghan businesses — from the interface down to the deploy pipeline.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${playfair.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
