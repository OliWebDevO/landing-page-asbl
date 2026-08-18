'use client';
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import Hero from "@/sections/Hero";
import ImageRect from "@/components/ImageRect";
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
const StepsSection = dynamic(() => import("@/sections/StepsSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100svh" }} />,
});
const ProductsSection = dynamic(() => import("@/sections/ProductsSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "60svh" }} />,
});
const FAQSection = dynamic(() => import("@/sections/FAQSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "60svh" }} />,
});
const Footer = dynamic(() => import("@/sections/Footer"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "10svh" }} />,
});

export default function HomeWrapper() {
  const loading = usePreloader();

  return (
    <>
      {loading && <Preloader />}
      <main>
        <NavBar />
        <Hero />
        <Slider />
        <ShowcaseSection />
        <LogoSection mode="text" />
        <FeatureCards variant="home" />
        <ProductsSection />
        <StepsSection />
        <ImageRect />
        <FAQSection />
        {/* Spacer to give last-section animations enough scroll room */}
        <div className="h-[15svh] md:h-[20svh]" aria-hidden="true" />
        <Footer />
      </main>
    </>
  );
}
