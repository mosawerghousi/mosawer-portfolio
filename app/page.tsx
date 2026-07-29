import Hero from "@/components/Hero";
import Playbook from "@/components/Playbook";
import Contacts from "@/components/Contacts";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <div className="noise-overlay" aria-hidden />
      <Nav />
      <Hero />
      <Playbook />
      <Contacts />
    </main>
  );
}
