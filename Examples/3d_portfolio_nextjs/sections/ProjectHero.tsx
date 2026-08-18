// sections/ProjectHero.tsx
'use client'
import Image from "next/image";
import { useParams } from "next/navigation";
// Remove this line: import { projects } from "@/constants";
import { useTranslation } from "@/hooks/useTranslation"; // Add this
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectButton from "@/components/ProjectButton";

gsap.registerPlugin(ScrollTrigger);

function getSlug(param: string | string[] | undefined): string {
  if (Array.isArray(param)) return param[0];
  return param || "";
}

export default function ProjectHero({ slug: staticSlug }: { slug?: string }) {
  const { projects, t } = useTranslation(); // Add this to get translated projects
  
  // Always call useParams
  const params = useParams();
  const paramSlug = getSlug(params?.slug);

  // Prefer staticSlug if provided, otherwise use paramSlug
  const slug = staticSlug || paramSlug;
  const project = projects.find((p) => p.slug === slug); // Remove .en since projects is now an array

  const logoRefs = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(() => {
    if (logoRefs.current.length) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-logos",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reset",
        },
      });
      tl.fromTo(
        logoRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [project?.techLogos]);

  if (!project) return <div>Project not found.</div>;

  return (
    <>
    <section className="app-showcase min-h-screen flex items-center justify-center mobile-padding">
      <div className="showcaselayout flex flex-col md:flex-row gap-10">
        <div className="image-wrapper group relative overflow-hidden rounded-xl h-fit" style={{ background: project.bg }}>
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            className="rounded-xl card-border card-inverted card-frame p-5 block"
          />
        </div>
        <div className="text-content flex flex-col justify-center gap-4">
          <div className="tech-logos flex gap-4 mb-3">
            {project.techLogos && project.techLogos.map((logo, idx) => (
              <Image
                key={logo}
                src={logo}
                alt={`Tech logo ${idx + 1}`}
                width={80}
                height={80}
                loading="lazy"
                ref={el => {logoRefs.current[idx] = el}}
              />
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{project.title}</h2>
          <p className="text-th-muted md:text-xl mt-4">{project.description}</p>
          <ProjectButton className="md:w-80 md:h-16 w-60 h-12" text={t.projectpage.visitProject} href={project.link}/>
        </div>
      </div>
    </section>
    </>
  );
}