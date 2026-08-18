'use client'
import { useRef, useState, useCallback } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TitleHeader from "@/components/TitleHeader"
import { useTranslation } from "@/hooks/useTranslation"

gsap.registerPlugin(ScrollTrigger)

const categoryGradients = [
  "from-[#e879a8] to-[#6e1a3d]", // rose
  "from-[#f472b6] to-[#831843]", // pink
  "from-[#a78bfa] to-[#3b1f7e]", // soft purple
  "from-[#818cf8] to-[#2e1a6e]", // indigo
  "from-[#60a5fa] to-[#1e3a5f]", // blue
  "from-[#38bdf8] to-[#0c4a6e]", // sky
  "from-[#67e8f9] to-[#083344]", // cyan
]

const FAQSection = () => {
  const { t, faqItems, locale } = useTranslation()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const answerRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const toggle = useCallback((key: string) => {
    const el = answerRefs.current[key]
    if (!el) return

    setOpenItems(prev => {
      const next = new Set<string>()

      if (prev.has(key)) {
        // Close the clicked item
        gsap.to(el, { height: 0, duration: 0.4, ease: "power2.inOut" })
      } else {
        // Close all currently open items
        prev.forEach(openKey => {
          const openEl = answerRefs.current[openKey]
          if (openEl) gsap.to(openEl, { height: 0, duration: 0.4, ease: "power2.inOut" })
        })
        // Open the clicked item
        gsap.set(el, { height: "auto" })
        const h = el.offsetHeight
        gsap.fromTo(el, { height: 0 }, { height: h, duration: 0.4, ease: "power2.inOut" })
        next.add(key)
      }
      return next
    })
  }, [])

  useGSAP(() => {
    gsap.fromTo('.faq-category',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: '#faq',
          start: 'top center',
          toggleActions: "play reverse play reverse",
        }
      }
    )
  }, { dependencies: [locale], revertOnUpdate: true })

  return (
    <div id="faq" className="flex-center section-padding">
      <div className="w-full h-full 3xl:px-28 2xl:px-20 xl:px-12">
        <TitleHeader title={t.home.faq.title} sub={t.home.faq.subtitle} />
        <div className="mt-16 max-w-4xl mx-auto flex flex-col gap-10">
          {faqItems.map((category, catIdx) => (
            <div key={catIdx} className="faq-category">
              <h3 className="text-xl md:text-2xl font-semibold text-th-text mb-4 pl-1">
                {category.category}
              </h3>
              <div className="flex flex-col gap-2">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`
                  const isOpen = openItems.has(key)
                  return (
                    <div
                      key={key}
                      className="bg-th-surface-alt rounded-xl overflow-hidden border border-th-border faq-item"
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
                      >
                        <span className="text-th-text text-base md:text-lg font-medium pr-4">
                          {item.question}
                        </span>
                        <svg
                          className={`flex-none w-5 h-5 text-th-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div
                        ref={el => { answerRefs.current[key] = el }}
                        className="overflow-hidden"
                        style={{ height: 0 }}
                      >
                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-th-muted text-base md:text-lg leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQSection
