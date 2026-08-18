'use client'
import Image from "next/image"
import GlowCard from "../components/GlowCard"
import TitleHeader from "../components/TitleHeader"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslation } from "@/hooks/useTranslation"
import { useRef } from "react"

const stepLogos = [
  "/images/steps/step1.svg", // soft purple
  "/images/steps/step2.svg", // indigo
  "/images/steps/step3.svg", // rose
  "/images/steps/step4.svg", // pink
  "/images/steps/step5.svg", // blue
  "/images/steps/step6.svg", // sky
  "/images/steps/step7.svg", // cyan
];

const stepGradients = [
  "from-[#a78bfa] to-[#3b1f7e]", // soft purple
  "from-[#818cf8] to-[#2e1a6e]", // indigo
  "from-[#e879a8] to-[#6e1a3d]", // rose
  "from-[#f472b6] to-[#831843]", // pink
  "from-[#60a5fa] to-[#1e3a5f]", // blue
  "from-[#38bdf8] to-[#0c4a6e]", // sky
  "from-[#67e8f9] to-[#083344]", // cyan
];

gsap.registerPlugin(ScrollTrigger)

const StepsSection = () => {
  const { t, processSteps, locale } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);


  useGSAP(() => {
    // Cards animation
    gsap.utils.toArray<HTMLElement>('.step-timeline-card').forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    // Text animation
    gsap.utils.toArray<HTMLElement>('.step-text').forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    // Align title+checkpoints with ball center on XL
    gsap.utils.toArray<HTMLElement>('.step-card-wrapper').forEach((card) => {
      const content = card.querySelector<HTMLElement>('.step-content');
      if (content && window.innerWidth >= 1280) {
        const ballY = card.offsetHeight / 2;
        const contentY = content.getBoundingClientRect().top - card.getBoundingClientRect().top;
        gsap.set(content, { y: ballY - contentY + 18 });
      }
    });

    // Offset lines to start at first ball center and adjust height
    const firstCard = sectionRef.current?.querySelector('.step-card-wrapper') as HTMLElement;
    const stepsContainer = sectionRef.current?.querySelector('.step-line')?.parentElement as HTMLElement;
    if (firstCard && stepsContainer) {
      const offset = firstCard.offsetHeight / 2;
      gsap.set('.step-line', { top: offset, height: stepsContainer.offsetHeight - offset });
    }

    // Timeline overlay shrinks top-down (xl)
    gsap.to('.step-line .step-timeline', {
      scrollTrigger: {
        trigger: '.step-line',
        start: 'top 80%',
        end: 'bottom center',
        scrub: true,
        invalidateOnRefresh: true,
      },
      scaleY: 0,
      transformOrigin: 'bottom center',
      ease: 'none',
    });

    // Timeline overlay shrinks top-down (mobile/tablet)
    gsap.to('.step-timeline-mobile', {
      scrollTrigger: {
        trigger: '.step-line-mobile',
        start: 'top 80%',
        end: 'bottom center',
        scrub: true,
        invalidateOnRefresh: true,
      },
      scaleY: 0,
      transformOrigin: 'bottom center',
      ease: 'none',
    });

    const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timeoutId);
  }, { scope: sectionRef, dependencies: [locale], revertOnUpdate: true });

  return (
    <section id="process" ref={sectionRef} className="w-full section-padding pb-44">
        <div className="w-full h-full md:px-20 px-5">
            <TitleHeader title={t.home.process.title} sub={t.home.process.subtitle} cn="mb-28"/>
            <div className="mt-3 relative">
                <div className="relative z-50">
                    {/* Lines inside z-50 but outside space-y */}
                    <div className="step-line hidden xl:flex absolute left-1/2 -translate-x-1/2 top-0 justify-center z-10">
                        <div className="step-timeline timeline"/>
                        <div className="gradient-line w-1 h-full"/>
                    </div>
                    <div className="step-line-mobile xl:hidden absolute md:left-10 left-5 top-5 md:top-10 h-full flex justify-center z-10">
                        <div className="step-timeline-mobile timeline"/>
                        <div className="gradient-line w-1 h-full"/>
                    </div>
                    {/* Cards wrapper with space-y */}
                    <div className="xl:space-y-32 space-y-10">
                    {processSteps.map((step, index) => (
                        <div key={`${step.title}-${locale}`} className="step-card-wrapper">
                           {/* Left: GlowCard */}
                           <div className="xl:w-[calc(50%-6rem)] step-timeline-card relative z-50 md:z-auto">
                                <GlowCard card={{ review: step.review }} index={index} className="card-inverted card-steps">
                                </GlowCard>
                            </div>
                            {/* Right: content */}
                            <div className="xl:w-[calc(50%-6rem)]">
                                <div className="flex items-start">
                                    <div className="step-text flex xl:gap-10 md:gap-10 gap-5 relative z-20 min-w-0">
                                        <div className="flex-none flex flex-col items-center xl:hidden">
                                            <div className="step-timeline-logo">
                                                <Image src={stepLogos[index % stepLogos.length]} alt="" width={60} height={60} loading="lazy" />
                                            </div>
                                        </div>
                                        <div className="step-content min-w-0 max-w-[calc(100vw-8rem)] md:max-w-none">
                                            <h1 className="font-semibold text-3xl flex gap-3 md:h-20 h-10 items-baseline mb-5 md:-translate-y-6 -translate-y-2">
                                                <span className={`text-5xl md:text-7xl font-black bg-gradient-to-b ${stepGradients[index % stepGradients.length]} bg-clip-text text-transparent`}>
                                                    {step.number}
                                                </span>
                                                <span className="-translate-y-1 hidden md:inline">{step.title}</span>
                                                <span className="-translate-y-1 md:hidden">{step.shortTitle}</span>
                                            </h1>
                                            <div className="card-inverted card-steps bg-th-surface border border-th-border rounded-xl p-5 flex flex-col gap-3">
                                                {step.checkpoints.map((point, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <div className="tick-light flex-none mt-1 w-5 h-5 rounded-md bg-th-surface-alt border border-th-border flex items-center justify-center">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <p className="text-th-muted text-lg">{point}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Centered logo on the line (xl only) */}
                            <div className="step-text hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                                <div className="step-timeline-logo">
                                    <Image src={stepLogos[index % stepLogos.length]} alt="" width={60} height={60} loading="lazy" />
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default StepsSection
