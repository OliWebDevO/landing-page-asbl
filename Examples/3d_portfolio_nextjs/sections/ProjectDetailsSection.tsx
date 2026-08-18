'use client'
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GlowCardDetails from "@/components/GlowCardDetails"
import { useParams } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

// Helper to get slug as string (for static export)
function getSlug(param: string | string[] | undefined): string {
  if (Array.isArray(param)) return param[0];
  return param || "";
}

const ProjectDetailsSection = ({ slug: staticSlug }: { slug?: string } = {}) => {
    const { projectDetailsCards } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    // Always call useParams
    const params = useParams();
    const paramSlug = getSlug(params?.slug);

    // Prefer staticSlug if provided, otherwise use paramSlug
    const slug = staticSlug || paramSlug;
    const details = projectDetailsCards?.find(p => p.slug === slug)?.cards;

    useGSAP(() => {
        if (!details) return;

        gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: 'left left',
                duration: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            })
        });

        gsap.to('.timeline', {
            scaleY: 0,
            transformOrigin: 'bottom center',
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: true,
                invalidateOnRefresh: true,
            },
        });

        gsap.utils.toArray<HTMLElement>('.expText').forEach((text) => {
            gsap.from(text, {
                xPercent: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse',
                }
            })
        })

        const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 200);
        return () => clearTimeout(timeoutId);
    }, { scope: sectionRef, dependencies: [details], revertOnUpdate: true })

    // Don't render if projectDetailsCards is not loaded yet
    if (!projectDetailsCards || !details) {
        return <div>Loading...</div>;
    }

  return (
    <section id="project-details" ref={sectionRef} className="w-full md:mt-4 mt2 section-padding">
        <div className="w-full h-full md:px-20 px-5">
            <div className="mt-3 relative">
                <div className="relative z-50 xl:space-y-32 space-y-10">
                    {details?.map((card, index) => (
                        <div key={card.title} className="exp-card-wrapper">
                           <div className="xl:w-2/6">
                                <GlowCardDetails index={index}>
                                    <div>
                                        <Image className="rounded-lg" src={card.imgPath} alt={card.imgPath} width={400} height={300} quality={80} sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                                    </div>
                                </GlowCardDetails>
                            </div>
                            <div className="xl:w-4/6 ">
                                <div className="flex items-start">
                                    <div className="timeline-wrapper">
                                        <div className="timeline"/>
                                        <div className="gradient-line w-1 h-full"/> 
                                    </div>
                                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                        <div className="timeline-logo xl:translate-x-5 2xl:translate-x-7 3xl:translate-x-10">
                                            <Image src={card.logoPath} alt="logo" width={60} height={60} loading="lazy" />
                                        </div>
                                        <div className="">
                                            <h1 className="font-semibold text-3xl">{card.title}</h1>
                                            <ul className="list-disc ms-g mt-5 flex flex-col gap-5 text-th-muted">
                                                {card.details?.map((detail, index) => (
                                                    <li key={index} className="text-lg md:text-justify">
                                                        {detail}
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

export default ProjectDetailsSection