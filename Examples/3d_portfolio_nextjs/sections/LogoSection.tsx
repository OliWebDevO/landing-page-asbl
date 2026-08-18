"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import TitleHeader from "@/components/TitleHeader";
import { logoIconsList } from "../constants";
import { useTranslation } from "@/hooks/useTranslation";

const LogoIcon = ({ icon }: { icon: LogoIconType }) => (
  <div className="flex-none flex-center marquee-item select-none">
    <Image
      src={icon.imgPath}
      alt="Tech logo"
      width={100}
      height={100}
      loading="lazy"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    />
  </div>
);

// Gradient colors following the step balls progression
const serviceColors = [
  "#c4b5fd", // purple (step 1)
  "#a5b4fc", // indigo (step 2)
  "#fbb4d0", // rose (step 3)
  "#f9a8d4", // pink (step 4)
  "#93c5fd", // blue (step 5)
  "#7dd3fc", // sky (step 6)
  "#c4b5fd", // loop back to purple
];

const TextItem = ({ text, color }: { text: string; color?: string }) => (
  <div className="flex-none flex-center select-none px-6">
    <span
      className="text-2xl md:text-3xl font-semibold whitespace-nowrap"
      style={{ color: color || 'var(--color-text)' }}
    >
      {text}
    </span>
  </div>
);

const LogoSection = ({ mode = "logos" }: { mode?: "logos" | "text" }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const momentumRef = useRef<gsap.core.Tween | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const { t, serviceKeywords } = useTranslation();

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const totalWidth = box.scrollWidth / 2;

    const tween = gsap.to(box, {
      x: -totalWidth,
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    tweenRef.current = tween;
    return () => {
      tween.kill();
      momentumRef.current?.kill();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (e.button !== 0) return;

    momentumRef.current?.kill();
    isDownRef.current = true;
    startXRef.current = e.pageX;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    startProgressRef.current = tweenRef.current?.progress() || 0;
    tweenRef.current?.pause();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDownRef.current || !tweenRef.current || !boxRef.current) return;
    e.preventDefault();

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (e.pageX - lastXRef.current) / dt;
    }
    lastXRef.current = e.pageX;
    lastTimeRef.current = now;

    const totalWidth = boxRef.current.scrollWidth / 2;
    const dx = e.pageX - startXRef.current;
    const progressDelta = -dx / totalWidth;
    let newProgress = startProgressRef.current + progressDelta;
    newProgress = ((newProgress % 1) + 1) % 1;
    tweenRef.current.progress(newProgress);
  };

  const handlePointerUp = () => {
    isDownRef.current = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);

    const tween = tweenRef.current;
    const box = boxRef.current;
    if (!tween || !box) return;

    const velocity = velocityRef.current;
    const totalWidth = box.scrollWidth / 2;
    const glideDistance = velocity * 800;
    const progressGlide = -glideDistance / totalWidth;
    const proxy = { value: tween.progress() };
    const targetValue = proxy.value + progressGlide;

    const momentum = gsap.to(proxy, {
      value: targetValue,
      duration: 1.2,
      ease: "power3.out",
      onUpdate: () => {
        tween.progress(((proxy.value % 1) + 1) % 1);
      },
      onComplete: () => {
        tween.progress(((proxy.value % 1) + 1) % 1);
        tween.resume();
      },
    });

    momentumRef.current = momentum;
  };

  const sectionId = mode === "text" ? "services" : "skills";
  const title = mode === "text" ? t.home.services.title : t.skills.title;
  const subtitle = mode === "text" ? t.home.services.subtitle : t.skills.subtitle;

  // For text mode, duplicate keywords for seamless loop
  const textItems = mode === "text"
    ? [...serviceKeywords, ...serviceKeywords]
    : [];

  return (
    <section id={sectionId} className="section-padding md:pb-20 pb-10">
      <TitleHeader title={title} sub={subtitle} />
      <div className="md:my-15 my-25 relative overflow-hidden">
        <div className="gradient-edge"></div>
        <div className="gradient-edge"></div>
        <div
          className="marquee h-52 md:cursor-grab active:md:cursor-grabbing"
          onPointerDown={handlePointerDown}
        >
          <div className="marquee-box md:gap-12 gap-5" ref={boxRef}>
            {mode === "text"
              ? textItems.map((keyword, idx) => (
                  <TextItem key={`${keyword}-${idx}`} text={keyword} color={serviceColors[idx % serviceKeywords.length]} />
                ))
              : logoIconsList.concat(logoIconsList).map((icon, idx) => (
                  <LogoIcon key={icon.id + "-" + idx} icon={icon} />
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
