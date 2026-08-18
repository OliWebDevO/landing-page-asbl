'use client'
import { useRef } from "react";
import type { ReactNode } from "react";

interface CardType {
  review: string;
  imgPath?: string;
  name?: string;
  logoPath?: string;
  title?: string;
  date?: string;
  responsibilities?: string[];
}

interface GlowCardProps {
  card: CardType;
  children?: ReactNode;
  index: number;
  className?: string;
}

const GlowCard = ({ card, children, index, className }: GlowCardProps) => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

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
    <div
      ref={(el) => {
        if (el) cardRefs.current[index] = el;
      }}
      onMouseMove={handleMouseMove(index)}
      className={`card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column ${className || ''}`}
    >
      <div className="glow" />
      {/* <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <img src="/images/star.png" alt="star" key={i} className="size-5" />
        ))}
      </div> */}
      <div className="mb-5">
        <p className="text-th-muted text-lg md:text-justify">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;