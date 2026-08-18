'use client'
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import TitleHeader from "../components/TitleHeader"
import { gsap } from "gsap"
import { useTranslation } from "@/hooks/useTranslation"
import Image from "next/image"

const ProductsSection = () => {
    const { t, productCards } = useTranslation();
    const cardRefs = useRef<HTMLDivElement[]>([]);

    const handleMouseMove = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRefs.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;
        card.style.setProperty('--start', (angle + 60).toString());
    };

    useGSAP(() => {
        gsap.fromTo('.product-card',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: '#products',
                    start: 'top center',
                    toggleActions: "play reverse play reverse",
                }
            }
        )
    }, [])

  return (
    <div id="products" className="flex-center section-padding">
        <div className="w-full h-full 3xl:px-28 2xl:px-20 xl:px-12">
            <TitleHeader title={t.home.products.title} sub={t.home.products.subtitle} />
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16 padding-x-lg">
                {productCards.map((product, index) => (
                    <div
                        key={product.title}
                        className="card-border card card-inverted product-card overflow-hidden rounded-xl relative"
                        onMouseMove={handleMouseMove(index)}
                        ref={(el) => { if (el) cardRefs.current[index] = el; }}
                    >
                        <div className="relative z-10 p-8 flex flex-col gap-5 h-full">
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image
                                    src={product.imgPath}
                                    alt={product.title}
                                    width={64}
                                    height={64}
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-th-text">{product.title}</h3>
                            <p className="text-th-muted text-lg md:text-justify">{product.description}</p>
                            <ul className="mt-auto flex flex-col gap-3">
                                {product.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div className="tick-light flex-none w-5 h-5 rounded-md bg-th-surface-alt border border-th-border flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <span className="text-th-muted text-lg">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProductsSection
