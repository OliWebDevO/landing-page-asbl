'use client'
import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useLenisScrollSync() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!lenisRef.current) {
      const lenis = new Lenis({ lerp: 0.2 })
      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Sync Lenis with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Refresh after all images are loaded
    const images = Array.from(document.images)
    if (images.length) {
      let loaded = 0
      images.forEach(img => {
        if (img.complete) {
          loaded++
        } else {
          img.addEventListener('load', () => {
            loaded++
            if (loaded === images.length) {
              lenisRef.current?.resize()
              ScrollTrigger.refresh()
            }
          })
          img.addEventListener('error', () => {
            loaded++
            if (loaded === images.length) {
              lenisRef.current?.resize()
              ScrollTrigger.refresh()
            }
          })
        }
      })
      if (loaded === images.length) {
        lenisRef.current?.resize()
        ScrollTrigger.refresh()
      }
    } else {
      lenisRef.current?.resize()
      ScrollTrigger.refresh()
    }

    // Listen for 3D model loaded event
    const handleRoomLoaded = () => {
      lenisRef.current?.resize()
      ScrollTrigger.refresh()
    }
    window.addEventListener("room-loaded", handleRoomLoaded)

    // Fallback timeout
    const timeout = setTimeout(() => {
      lenisRef.current?.resize()
      ScrollTrigger.refresh()
    }, 1200)

    // Cleanup
    return () => {
      window.removeEventListener("room-loaded", handleRoomLoaded)
      clearTimeout(timeout)
      lenisRef.current?.destroy()
    }
  }, [])

  return lenisRef
}