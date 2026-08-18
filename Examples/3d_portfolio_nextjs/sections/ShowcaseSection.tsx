'use client'
import { useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import TitleHeader from "@/components/TitleHeader";
import { useTranslation } from "@/hooks/useTranslation";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const { t, projects } = useTranslation();
  const showcaseRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  useGSAP(() => {
    const mobile = window.innerWidth < 768;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: mobile ? 0.8 : 1,
          delay: mobile ? 0 : 0.3 * (index + 0.3),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (
          trigger.trigger &&
          showcaseRef.current &&
          showcaseRef.current.contains(trigger.trigger as Node)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Show only first 5 projects, split for layout: first two on left, others stacked right
  const showcaseProjects = projects.slice(0, 5);
  const leftProjects = showcaseProjects.slice(0, 2);
  const rightProjects = showcaseProjects.slice(2);

  return (
    <>
  <section
    className="app-showcase"
    ref={showcaseRef}
  >
        <div className="w-full  3xl:px-20 2xl:px-10 xl:px-6">
          <TitleHeader title={t.showcase.title} sub={t.showcase.subtitle} cn='pt-20 pb-14' />
          <div className="showcaselayout xl:flex xl:gap-10 block">
            {/* LEFT : First two projects */}
            <div className="first-project-wrapper xl:w-[60%] w-full mb-10 xl:mb-0 flex flex-col gap-10">
              {leftProjects.map((project, idx) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="project-card group flex-1 rounded-xl transition-transform duration-300"
                >
                  <div
                    ref={el => { cardRefs.current[idx] = el; }}
                    className="image-wrapper card-border card-inverted card-frame group relative overflow-hidden rounded-xl p-3"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1800}
                      height={1200}
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      loading="lazy"
                      className="rounded-xl object-cover main-img w-full"
                    />
                    {project.slug === "lesarts" && (
                      <div className="dev-ribbon" aria-hidden="true">
                        <span className="dev-ribbon__label">{t.badges.inDevelopment}</span>
                      </div>
                    )}
                    </div>
                  <div className="text-content flex flex-col justify-center mt-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{t.projects[project.slug].title}</h2>
                    <p className="text-th-muted md:text-xl mt-4">{t.projects[project.slug].description}</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* RIGHT : Other projects stacked */}
            <div className="project-list-wrapper flex flex-col gap-10 xl:w-[40%] w-full">
              {rightProjects.map((project, idx) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="project-card group flex-1 rounded-xl transition-transform duration-300"
                >
                  <div
                    ref={el => { cardRefs.current[idx + leftProjects.length] = el; }}
                    className="image-wrapper card-border card-inverted card-frame group relative overflow-hidden rounded-xl p-3"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      loading="lazy"
                      className="rounded-xl main-img w-full"
                    />
                    {project.slug === "lesarts" && (
                      <div className="dev-ribbon" aria-hidden="true">
                        <span className="dev-ribbon__label">{t.badges.inDevelopment}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-content flex flex-col justify-center mt-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{t.projects[project.slug].title}</h2>
                    <p className="text-th-muted md:text-xl mt-4">{t.projects[project.slug].description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowcaseSection;
