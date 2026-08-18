'use client'
import { useGSAP } from "@gsap/react"
import TitleHeader from "../components/TitleHeader"
import { gsap } from "gsap"
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import Image from "next/image";

import dynamic from "next/dynamic";
const TechIcon = dynamic(
  () => import("../components/models/techlogos/TechIcon"),
  { ssr: false }
);


const TechStack = () => {
    const { t, techStackIcons, techStackImgs } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      let lastWidth = window.innerWidth;
      const check = () => {
        const newWidth = window.innerWidth;
        if (newWidth === lastWidth) return;
        lastWidth = newWidth;
        setIsMobile(newWidth < 768);
      };
      setIsMobile(lastWidth < 768);
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    useGSAP(() => {
        gsap.fromTo('.tech-card',
            { y: 50, opacity: 0 },
            {   y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: '#skills',
                    start: 'top center',
                     toggleActions: "play none none reset",
                }
             }
        )
    }, [])

  return (
    <div id="techstack" className="flex-center section-padding">
        <div className="w-full h-full 3xl:px-28 2xl:px-20 xl:px-12">
            <TitleHeader title={t.techstack.title} sub={t.techstack.subtitle} />
            <div className="tech-grid">
                {isMobile
                  ? techStackImgs.map((img) => (
                      <div key={img.name} className="card-border tech-card overflow-hidden group rounded-lg xl:rounded-xl relative">
                        <div className="tech-card-animated-bg" />
                        <div className="tech-card-content">
                          <div className="tech-icon-wrapper">
                            <Image src={img.imgPath} alt={img.name} width={100} height={100} />
                          </div>
                          <div className="padding-x w-full">
                            <p>{img.name}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  : techStackIcons.map((icon) => (
                      <div key={icon.modelPath} className="card-border tech-card overflow-hidden group rounded-xl relative">
                        <div className="tech-card-animated-bg" />
                        <div className="tech-card-content">
                          <div className="tech-icon-wrapper">
                            <TechIcon model={icon} />
                          </div>
                          <div className="padding-x w-full">
                            <p>{icon.name}</p>
                          </div>
                        </div>
                      </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TechStack
