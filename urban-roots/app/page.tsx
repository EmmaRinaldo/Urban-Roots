import Image from "next/image";
import { HeroSection } from "./components/HeroSection";
import { About } from "./components/About";
import { SectionCarte } from "./components/SectionCarte";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Separator />
      <HeroSection />
      <About />
      <Separator />
      <SectionCarte />
      <Separator />

    </>
  );
}
