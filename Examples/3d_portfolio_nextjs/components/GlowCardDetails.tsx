'use client'
import { useRef } from "react";
import type { ReactNode } from "react";



interface GlowCardProps {
  children?: ReactNode;
  index: number;
}

const GlowCardDetails = ({ children, index }: GlowCardProps) => {
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
      className="card card-border card-inverted card-frame timeline-card rounded-xl p-4 mb-5 break-inside-avoid-column"
    >
      <div className="glow" />

      {children}
    </div>
  );
};

export default GlowCardDetails;