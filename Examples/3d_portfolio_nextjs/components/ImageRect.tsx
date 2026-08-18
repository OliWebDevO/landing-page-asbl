'use client'
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"
import { useTranslation } from "@/hooks/useTranslation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

const tlShapes = [
    { src: '/images/triangle header/1.avif', alt: 'Triangle 1', clipId: 'cta-trapezoid-tl' },
    { src: '/images/triangle header/1.avif', alt: 'Triangle 1', clipId: 'cta-triangle-tl' },
];

const brShapes = [
    { src: '/images/triangle header/2.avif', alt: 'Triangle 2', clipId: 'cta-trapezoid-br' },
    { src: '/images/triangle header/2.avif', alt: 'Triangle 2', clipId: 'cta-triangle-br' },
];

const splitText = (text: string) =>
    text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
            <span className="cta-char inline-block">
                {char === ' ' ? '\u00A0' : char}
            </span>
        </span>
    ));

const ImageRect = () => {
    const { isDark } = useTheme();
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isDark) return;

        // Parallax: animate wrapper top position (no transforms = no clip-path artifacts)
        gsap.fromTo('.cta-pan-tl',
            { top: '-10%' },
            {
                top: '0%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );

        gsap.fromTo('.cta-pan-br',
            { top: '0%' },
            {
                top: '-10%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );

        gsap.utils.toArray<HTMLElement>('.cta-text').forEach((el) => {
            const chars = el.querySelectorAll('.cta-char');
            gsap.fromTo(chars,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    duration: 0.5,
                    stagger: 0.03,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    }
                }
            );
        });
    }, { scope: containerRef, dependencies: [isDark], revertOnUpdate: true });

    // Refresh ScrollTrigger positions when component appears/disappears
    useEffect(() => {
        const id = setTimeout(() => ScrollTrigger.refresh(), 100);
        return () => clearTimeout(id);
    }, [isDark]);

    if (isDark) return null;

    return (
        <div ref={containerRef} className="hidden xl:block w-full md:px-20 px-5 py-16 space-y-24 xl:space-y-32">
            {/* SVG clip path defs */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    {/* Top-left trapezoid */}
                    <clipPath id="cta-trapezoid-tl" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0,0.54
                            Q 0,0.51 0.021,0.489
                            L 0.489,0.021
                            Q 0.51,0 0.54,0
                            L 0.95,0
                            Q 0.98,0 0.959,0.021
                            L 0.021,0.959
                            Q 0,0.98 0,0.95
                            Z
                        " />
                    </clipPath>
                    {/* Top-left triangle */}
                    <clipPath id="cta-triangle-tl" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0,0.03
                            Q 0,0 0.03,0
                            L 0.46,0
                            Q 0.49,0 0.469,0.021
                            L 0.021,0.469
                            Q 0,0.49 0,0.46
                            Z
                        " />
                    </clipPath>
                    {/* Bottom-right trapezoid */}
                    <clipPath id="cta-trapezoid-br" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0.03,1
                            Q 0,1 0.021,0.979
                            L 0.979,0.021
                            Q 1,0 1,0.03
                            L 1,0.46
                            Q 1,0.49 0.979,0.511
                            L 0.511,0.979
                            Q 0.49,1 0.46,1
                            Z
                        " />
                    </clipPath>
                    {/* Bottom-right triangle */}
                    <clipPath id="cta-triangle-br" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 0.54,1
                            Q 0.51,1 0.531,0.979
                            L 0.979,0.531
                            Q 1,0.51 1,0.54
                            L 1,0.97
                            Q 1,1 0.97,1
                            Z
                        " />
                    </clipPath>
                </defs>
            </svg>

            {/* Both groups side by side */}
            <div className="relative flex items-start gap-4 md:gap-8">
                {/* LEFT group: TL shapes */}
                <div className="relative flex-1 aspect-square">
                    {tlShapes.map(({ src, alt, clipId }) => (
                        <div
                            key={clipId}
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `url(#${clipId})` }}
                        >
                            <div className="cta-pan-tl absolute left-0 right-0" style={{ top: '-10%', height: '120%' }}>
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                    quality={80}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT group: BR shapes */}
                <div className="relative flex-1 aspect-square">
                    {brShapes.map(({ src, alt, clipId }) => (
                        <div
                            key={clipId}
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `url(#${clipId})` }}
                        >
                            <div className="cta-pan-br absolute left-0 right-0" style={{ top: '0%', height: '120%' }}>
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                    quality={80}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Centered text */}
                <h2
                    className="cta-text absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-3xl xl:text-4xl font-bold text-th-text leading-tight whitespace-nowrap"
                >
                    {splitText(t.cta.create)}
                </h2>
            </div>
        </div>
    );
};

export default ImageRect;
