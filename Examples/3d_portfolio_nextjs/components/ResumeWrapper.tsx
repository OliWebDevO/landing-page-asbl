'use client';
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import Hero from "@/sections/Hero";
import { usePreloader } from "@/hooks/usePreloader";

const Preloader = dynamic(
  () => import("@/components/Lottie/LottiePreloader"),
  { ssr: false }
);

const Slider = dynamic(() => import("@/components/models/MaterialUiSlider/Slider"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "80svh" }} />,
});
const ShowcaseSection = dynamic(() => import("@/sections/ShowcaseSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100svh" }} />,
});
const LogoSection = dynamic(() => import("@/sections/LogoSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "20svh" }} />,
});
const FeatureCards = dynamic(() => import("@/sections/FeatureCards"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "40svh" }} />,
});
const ExperienceSection = dynamic(() => import("@/sections/ExperienceSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100svh" }} />,
});
const TechStack = dynamic(() => import("@/sections/TechStack"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "60svh" }} />,
});
const Footer = dynamic(() => import("@/sections/Footer"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "10svh" }} />,
});

export default function ResumeWrapper() {
  const loading = usePreloader();

  return (
    <>
      {loading && <Preloader />}
      <main>
        <NavBar />
        <Hero />
        <Slider />
        <ShowcaseSection />
        <LogoSection mode="logos" />
        <FeatureCards variant="resume" />
        <ExperienceSection />
        <TechStack />
        {/* Spacer to give last-section animations enough scroll room */}
        <div className="h-[30svh] md:h-[40svh]" aria-hidden="true" />
        <Footer />
      </main>
    </>
  );
}
