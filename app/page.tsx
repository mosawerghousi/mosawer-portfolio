import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Studio from "@/components/Studio";
import Work from "@/components/Work";
import MobileRail from "@/components/MobileRail";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden />
      <Nav />
      <CommandPalette />
      <main>
        <Hero />
        <Marquee />
        <Studio />
        <Work />
        <MobileRail />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
