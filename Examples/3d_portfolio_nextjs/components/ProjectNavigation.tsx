'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { useTheme } from '@/contexts/ThemeContext'

const ProjectNavigation = ({ slug }: { slug: string }) => {
  const { projects } = useTranslation()
  const { isDark } = useTheme()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  if (currentIndex === -1) return null

  const prev = projects[(currentIndex - 1 + projects.length) % projects.length]
  const next = projects[(currentIndex + 1) % projects.length]

  const bubbleBg = isDark ? '#ffffff' : '#000000'
  const arrowColor = isDark ? '#000000' : '#ffffff'

  return (
    <nav className="w-full flex justify-between items-center md:px-20 px-5 pt-32 md:pt-44 pb-16">
      <Link
        href={`/projects/${prev.slug}`}
        className="group flex items-center gap-4 text-th-muted hover:text-th-text transition-colors"
      >
        <div
          className="shrink-0 size-12 rounded-full flex items-center justify-center transition-transform group-hover:-translate-x-1"
          style={{ backgroundColor: bubbleBg }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke={arrowColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-sm md:text-base line-clamp-1">{prev.title}</span>
      </Link>

      <Link
        href={`/projects/${next.slug}`}
        className="group flex items-center gap-4 text-th-muted hover:text-th-text transition-colors text-right"
      >
        <span className="text-sm md:text-base line-clamp-1">{next.title}</span>
        <div
          className="shrink-0 size-12 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1"
          style={{ backgroundColor: bubbleBg }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke={arrowColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    </nav>
  )
}

export default ProjectNavigation
