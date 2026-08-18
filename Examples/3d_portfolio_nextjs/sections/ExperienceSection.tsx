'use client'
import Image from "next/image"
import GlowCard from "../components/GlowCard"
import TitleHeader from "../components/TitleHeader"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslation } from "@/hooks/useTranslation"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const ExperienceSection = () => {
  const { t, expCards, locale } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Cards animation
    gsap.utils.toArray<HTMLElement>('.exp-timeline-card').forEach((card) => {
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
    gsap.utils.toArray<HTMLElement>('.exp-text').forEach((text) => {
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

    // Timeline (black background) - shrinks as you scroll
    gsap.to('.timeline', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        invalidateOnRefresh: true,
      },
      scaleY: 0,
      transformOrigin: 'bottom center',
      ease: 'none',
    });

    // Deferred refresh: recalculate positions after hash navigation (#hero) settles
    const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timeoutId);
  }, { scope: sectionRef, dependencies: [locale], revertOnUpdate: true });

  return (
    <section id="experience" ref={sectionRef} className="w-full section-padding">
        <div className="w-full h-full md:px-20 px-5">
            <TitleHeader title={t.experience.title} sub={t.experience.subtitle} cn="mb-28"/>
            <div className="mt-3 relative">
                <div className="relative z-50 xl:space-y-32 space-y-10">
                    {expCards.map((card, index) => (
                        <div key={`${card.title}-${locale}`} className="exp-card-wrapper">
                           <div className="xl:w-2/6 exp-timeline-card relative z-50 md:z-auto">
                                <GlowCard card={card} index={index}>
                                </GlowCard>
                            </div>
                            <div className="xl:w-4/6 ">
                                <div className="flex items-start">
                                    <div className="timeline-wrapper">
                                        <div className="timeline"/>
                                        <div className="gradient-line w-1 h-full"/>
                                    </div>
                                    <div className="exp-text flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                        <div className="timeline-logo xl:translate-x-5 2xl:translate-x-7 3xl:translate-x-10">
                                            <Image src={card.logoPath} alt="logo" width={60} height={60} loading="lazy" />
                                        </div>
                                        <div className="">
                                            <h1 className="font-semibold text-3xl">{card.title}</h1>
                                            <p className="my-5 text-th-muted">
                                                📅 {card.date}
                                            </p>
                                            <p className="text-th-placeholder italic">
                                               {t.experience.resp}
                                            </p>
                                            <ul className="list-disc ms-g mt-5 flex flex-col gap-5 text-th-muted">
                                                {card.responsibilities.map((responsibility, index) => (
                                                    <li key={index} className="text-lg md:text-justify">
                                                        {responsibility}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default ExperienceSection