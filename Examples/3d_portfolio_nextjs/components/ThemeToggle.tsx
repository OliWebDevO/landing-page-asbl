'use client'

import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '@/contexts/ThemeContext'
import gsap from 'gsap'

export default function ThemeToggle() {
  const { theme, applyTheme } = useTheme()
  const blobRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [animating, setAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleToggle = () => {
    if (animating) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    if (prefersReducedMotion) {
      applyTheme(nextTheme)
      return
    }

    setAnimating(true)
    const blob = blobRef.current
    if (!blob) {
      applyTheme(nextTheme)
      setAnimating(false)
      return
    }

    // Target bg = the bg of the NEXT theme (so blob matches what the page will become)
    const targetBg = nextTheme === 'light' ? '#ffffff' : '#000000'
    blob.style.backgroundColor = targetBg

    // Position blob centered on the button
    const btn = btnRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      blob.style.left = `${cx}px`
      blob.style.top = `${cy}px`
    }

    const content = '#theme-content'

    const tl = gsap.timeline({
      onComplete: () => {
        setAnimating(false)
        gsap.set(blob, { display: 'none' })
        gsap.set(content, { clearProps: 'opacity' })
      }
    })

    // 0s–0.4s: Blob grows to cover screen
    tl.set(blob, { display: 'block', scale: 0, xPercent: -50, yPercent: -50, opacity: 1 })
      .to(blob, { scale: 1, duration: 0.4, ease: 'power2.out' }, 0)

    // 0.15s–0.35s: Content fades out (hidden under blob)
    tl.to(content, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.15)

    // 0.4s: Flip theme + restore content (still hidden under opaque blob)
    tl.call(() => { applyTheme(nextTheme) }, [], 0.4)
    tl.set(content, { opacity: 0 }, 0.4)

    // 0.4s–0.8s: Blob fades out while content fades in
    tl.to(blob, { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0.4)
    tl.to(content, { opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.45)
  }

  const isDark = theme === 'dark'

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative flex items-center justify-center size-9 rounded-lg transition-colors duration-300"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {/* Sun icon (visible in dark mode) */}
        <svg
          className="absolute transition-all duration-300"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
          }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Moon icon (visible in light mode) */}
        <svg
          className="absolute transition-all duration-300"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'rotate(-90deg) scale(0)' : 'rotate(0deg) scale(1)',
          }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      {/* Full-screen blob overlay — portaled to body to escape navbar stacking context */}
      {mounted && createPortal(
        <div
          ref={blobRef}
          className="fixed z-[200] pointer-events-none"
          style={{
            display: 'none',
            width: '300vmax',
            height: '300vmax',
            borderRadius: '43% 57% 69% 31% / 34% 65% 35% 66%',
          }}
        />,
        document.body
      )}
    </>
  )
}
