'use client'
import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";


const FeatureCards = ({ variant = "resume" }: { variant?: "resume" | "home" }) => {
   const cardRefs = useRef<HTMLDivElement[]>([]);
   const { abilities, homeAbilities } = useTranslation();

   const items = variant === "home" ? homeAbilities : abilities;

    const handleMouseMove = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRefs.current[index];
      if (!card) return;
      //Get the mouse position
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      // Calculate the angle
      let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
      angle = (angle + 360) % 360;

      card.style.setProperty('--start', (angle + 60).toString());
    };

  return (

    <div id={variant === "home" ? "services" : "skills"} className="w-full padding-x-lg md:pb-40 pb20">
        <div className="mx-auto grid-3-cols 3xl:px-20 2xl:px-10 xl:px-6">
            {items.map((ability, index) => (
              <div
              key={ability.imgPath}
              className="bg-th-surface card card-inverted rounded-xl p-8 flex flex-col gap-4"
              onMouseMove={handleMouseMove(index)}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              >
                <div className="glow" />
                <div className="size-14 flex items-center justify-center rounded-full">
                    <Image src={ability.imgPath} alt={ability.title} width={56} height={56} loading="lazy" />
                </div>
                  <h3 className="text-2xl font-semibold text-th-text">{ability.title}</h3>
                  <p className="text-th-muted text-lg md:text-justify">{ability.desc}</p>
              </div>
            ))}
        </div>
    </div>
  )
}

export default FeatureCards
