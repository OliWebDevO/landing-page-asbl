'use client'
import { useEffect, useState, useRef, useCallback } from "react"
import type { ChangeEvent, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { usePathname, useRouter } from "next/navigation"

// Pre-computed gradient colors for "Oliver Van Droogenbroeck" (25 chars)
// Matches the 3 service card icon colors: Sur Mesure → Partenariat → Résultats
const logoName = 'Oliver Van Droogenbroeck'
const logoColors = logoName.split('').map((_, i) => {
    const t = i / (logoName.length - 1)
    // pink → purple → blue (service card icon gradients)
    const r1 = 251, g1 = 180, b1 = 208 // #fbb4d0 (Résultats Durables)
    const r2 = 196, g2 = 181, b2 = 253 // #c4b5fd (Sur Mesure)
    const r3 = 147, g3 = 197, b3 = 253 // #93c5fd (Partenariat Transparent)
    let r, g, b
    if (t < 0.5) {
        const p = t * 2
        r = Math.round(r1 + (r2 - r1) * p)
        g = Math.round(g1 + (g2 - g1) * p)
        b = Math.round(b1 + (b2 - b1) * p)
    } else {
        const p = (t - 0.5) * 2
        r = Math.round(r2 + (r3 - r2) * p)
        g = Math.round(g2 + (g3 - g2) * p)
        b = Math.round(b2 + (b3 - b2) * p)
    }
    return `rgb(${r},${g},${b})`
})


// Nav link hover colors — matches stepGradients "from" colors in StepsSection
const navHoverColors = [
    '#a78bfa', // soft purple
    '#818cf8', // indigo
    '#e879a8', // rose
    '#f472b6', // pink
    '#60a5fa', // blue
    '#38bdf8', // sky
    '#67e8f9', // cyan
]

const projectBubbles = [
    { src: '/images/annick1.webp', srcMobile: '/images/slider-mobile/annick.webp', slug: 'annick', label: 'Annick', bg: '#1c1c21' },
    { src: '/images/fanal_des_chats/fanal_home.webp', srcMobile: '/images/slider-mobile/fanal.webp', slug: 'fanal', label: 'Fanal', bg: '#ffefdb' },
    { src: '/images/lenoyer1.webp', srcMobile: '/images/slider-mobile/lenoyer.webp', slug: 'lenoyer', label: 'Le Noyer', bg: 'white' },
    { src: '/images/asbl_ovni/ovni_dashboard.webp?v=2', srcMobile: '/images/slider-mobile/ovni-compta.webp', slug: 'ovni-compta', label: 'OVNI', bg: '#ffefdb' },
]

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { t, navLinks: resumeNavLinks, homeNavLinks, isFrench } = useTranslation()
    const pathname = usePathname()
    const router = useRouter()
    const pendingNavRef = useRef<string | null>(null)

    const overlayRef = useRef<HTMLDivElement>(null)
    const blobRef = useRef<HTMLDivElement>(null)
    const menuItemsRef = useRef<(HTMLLIElement | null)[]>([])
    const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([])
    const bubblesPanelRef = useRef<HTMLDivElement | null>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)
    const burgerRef = useRef<HTMLButtonElement>(null)
    const line1Ref = useRef<HTMLSpanElement>(null)
    const line2Ref = useRef<HTMLSpanElement>(null)
    const line3Ref = useRef<HTMLSpanElement>(null)
    const langRef = useRef<HTMLDivElement>(null)
    const scrollStateRef = useRef<'visible' | 'burger-only'>('visible')
    const isProjectPageRef = useRef(false)

    // Desktop contact overlay refs
    const headerRef = useRef<HTMLElement>(null)
    const contactBtnRef = useRef<HTMLButtonElement>(null)
    const logoRef = useRef<HTMLAnchorElement>(null)
    const desktopNavRef = useRef<HTMLElement>(null)
    const desktopLangRef = useRef<HTMLDivElement>(null)
    const desktopOverlayRef = useRef<HTMLDivElement>(null)
    const desktopBlobRef = useRef<HTMLDivElement>(null)
    const desktopBubblesRef = useRef<(HTMLAnchorElement | null)[]>([])
    const desktopBubblesPanelRef = useRef<HTMLDivElement | null>(null)
    const desktopFormRef = useRef<HTMLDivElement | null>(null)
    const projectsTitleRef = useRef<HTMLHeadingElement | null>(null)
    const contactTitleRef = useRef<HTMLHeadingElement | null>(null)
    const dtlRef = useRef<gsap.core.Timeline | null>(null)
    const successTlRef = useRef<gsap.core.Timeline | null>(null)
    const [desktopContactOpen, setDesktopContactOpen] = useState(false)

    // Contact form state
    const [contactForm, setContactForm] = useState({ name: '', subject: '', message: '' })
    const [honeypot, setHoneypot] = useState('')
    const [contactLoading, setContactLoading] = useState(false)
    const mobileContactRef = useRef(false)
    const mobileSuccessTlRef = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        let lastY = window.scrollY;
        const isMobile = () => window.innerWidth < 768;

        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 10);

            if (isMobile() && !menuOpen) {
                if (currentY > lastY && currentY > 80 && scrollStateRef.current === 'visible') {
                    // Scroll down past 80px: slide lang left
                    gsap.to(langRef.current, {
                        x: -100, opacity: 0, duration: 0.4, ease: "power3.inOut"
                    })
                    scrollStateRef.current = 'burger-only'
                } else if (currentY <= 80 && scrollStateRef.current === 'burger-only') {
                    // Scroll back to top: bring lang back
                    gsap.to(langRef.current, {
                        x: 0, opacity: 1, duration: 0.3, ease: "power3.out"
                    })
                    scrollStateRef.current = 'visible'
                }
            }

            lastY = currentY;
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuOpen])

    const buildTimeline = useCallback(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.inOut" },
            onReverseComplete: () => {
                setMenuOpen(false)
                mobileContactRef.current = false
                document.body.style.overflow = ''
                // Clean up mobile contact/success styles
                gsap.set('.mobile-contact-form', { display: 'none', clearProps: 'opacity' })
                gsap.set('.mobile-success-svg', { display: 'none', clearProps: 'opacity' })
                gsap.set(['.mobile-field-1', '.mobile-field-2', '.mobile-field-3', '.mobile-field-4'], { clearProps: 'all' })
                gsap.set(['.m-svg-hand', '.m-svg-lines-pink', '.m-svg-shape-purple', '.m-svg-shape-green', '.m-svg-stars', '.m-svg-shape-blue', '.m-svg-cursor'], { clearProps: 'transform,opacity' })
                gsap.set('.mobile-success-text', { clearProps: 'all' })
                gsap.set('.mobile-success-letter', { clearProps: 'all' })
                gsap.set('.mobile-success-subtitle', { clearProps: 'all' })
                const mItems = menuItemsRef.current.filter(Boolean)
                gsap.set(mItems, { clearProps: 'all' })
                if (bubblesPanelRef.current) gsap.set(bubblesPanelRef.current, { clearProps: 'all' })
                const mBubbles = bubblesRef.current.filter(Boolean)
                if (mBubbles.length > 0) gsap.set(mBubbles, { clearProps: 'all' })
                if (langRef.current) gsap.set(langRef.current, { clearProps: 'visibility' })
                if (mobileSuccessTlRef.current) {
                    mobileSuccessTlRef.current.kill()
                    mobileSuccessTlRef.current = null
                }
                // If scrolled past 80px, keep lang hidden
                if (window.scrollY > 80 && langRef.current) {
                    gsap.set(langRef.current, { x: -100, opacity: 0 })
                    scrollStateRef.current = 'burger-only'
                }
                // Navigate after animation completes
                if (pendingNavRef.current) {
                    const dest = pendingNavRef.current
                    pendingNavRef.current = null
                    router.push(dest)
                }
            },
        })

        // Burger to X
        tl.to(line2Ref.current, { opacity: 0, duration: 0.3 }, 0)
        tl.to(line1Ref.current, { y: 7, rotation: 45, duration: 0.4 }, 0.15)
        tl.to(line3Ref.current, { y: -7, rotation: -45, duration: 0.4 }, 0.15)

        // Blob scales up organically from burger corner
        tl.fromTo(blobRef.current,
            { scale: 0, opacity: 1 },
            { scale: 1, duration: 1.4, ease: "power2.out" },
            0.2
        )

        // Lang switcher appears with first nav item (only if it was hidden)
        if (langRef.current && scrollStateRef.current === 'burger-only') {
            tl.fromTo(langRef.current,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
                0.5
            )
        }

        const items = menuItemsRef.current.filter(Boolean)
        const bubbles = bubblesRef.current.filter(Boolean)
        const onProject = isProjectPageRef.current

        // How many items come before the bubbles:
        // Project pages: Accueil (0) → Projets (1) → bubbles → rest
        // Home: Projets (0) → bubbles → rest
        const beforeBubbles = onProject ? 2 : 1
        let t = 0.5

        // Items before bubbles stagger in
        items.slice(0, beforeBubbles).forEach((item) => {
            tl.fromTo(item,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
                t
            )
            t += 0.2
        })

        // Panel appears with first bubble
        if (bubblesPanelRef.current) {
            tl.fromTo(bubblesPanelRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
                t
            )
        }

        // Project bubbles stagger in
        if (bubbles.length > 0) {
            tl.fromTo(bubbles,
                { y: 20, opacity: 0, scale: 0.5 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
                t
            )
        }

        // Remaining nav items join the same stagger rhythm as bubbles
        const afterItems = items.slice(beforeBubbles)
        if (afterItems.length > 0) {
            tl.fromTo(afterItems,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
                t + 0.1
            )
        }

        return tl
    }, [])

    const toggleMenu = useCallback(() => {
        if (!menuOpen) {
            setMenuOpen(true)
            const tl = buildTimeline()
            tlRef.current = tl
            tl.timeScale(1)
            tl.play()
            document.body.style.overflow = 'hidden'
            scrollStateRef.current = 'visible'
        } else {
            if (mobileContactRef.current) {
                // Close from contact form or success state
                const hasSuccess = !!mobileSuccessTlRef.current
                const target = hasSuccess ? '.mobile-success-svg' : '.mobile-contact-form'
                gsap.to(target, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set(target, { display: 'none' })
                        if (mobileSuccessTlRef.current) {
                            mobileSuccessTlRef.current.kill()
                            mobileSuccessTlRef.current = null
                        }
                        // Hide nav items so they don't flash during reverse
                        const items = menuItemsRef.current.filter(Boolean)
                        gsap.set(items, { visibility: 'hidden' })
                        if (bubblesPanelRef.current) gsap.set(bubblesPanelRef.current, { visibility: 'hidden' })
                        if (langRef.current) gsap.set(langRef.current, { visibility: 'hidden' })
                        if (tlRef.current) {
                            tlRef.current.timeScale(1.8)
                            tlRef.current.reverse()
                        }
                    }
                })
            } else {
                if (tlRef.current) {
                    tlRef.current.timeScale(1.8)
                    tlRef.current.reverse()
                }
            }
        }
    }, [menuOpen, buildTimeline])

    // Contact form handlers
    const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setContactForm(prev => ({ ...prev, [name]: value }))
    }

    const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (honeypot) {
            setContactForm({ name: '', subject: '', message: '' })
            return
        }
        setContactLoading(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactForm),
            })
            if (!response.ok) throw new Error('Failed to send')
            setContactForm({ name: '', subject: '', message: '' })
            if (mobileContactRef.current) {
                playMobileSuccess()
            } else {
                playDesktopSuccess()
            }
        } catch (error) {
            console.error('Contact Error:', error)
        } finally {
            setContactLoading(false)
        }
    }

    const playDesktopSuccess = () => {
        const tl = gsap.timeline()

        // Phase 1: Form fields disappear in reverse order
        tl.to('.desktop-field-4', { opacity: 0, y: 30, duration: 0.3, ease: "power3.in" })
          .to('.desktop-field-3', { opacity: 0, y: 30, duration: 0.25, ease: "power3.in" }, "-=0.1")
          .to('.desktop-field-2', { opacity: 0, y: 30, duration: 0.25, ease: "power3.in" }, "-=0.1")
          .to('.desktop-field-1', { opacity: 0, y: 30, duration: 0.25, ease: "power3.in" }, "-=0.1")

        // Hide the entire form card (border, background, everything)
        if (desktopFormRef.current) {
            tl.to(desktopFormRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power3.in" }, "-=0.15")
        }

        // Project bubbles slide out
        const bubbles = desktopBubblesRef.current.filter(Boolean)
        if (bubbles.length > 0) {
            tl.to(bubbles, { opacity: 0, x: 80, duration: 0.3, stagger: 0.05, ease: "power3.in" }, "-=0.3")
        }

        // Bubbles panel background
        if (desktopBubblesPanelRef.current) {
            tl.to(desktopBubblesPanelRef.current, { opacity: 0, duration: 0.2, ease: "power3.in" }, "-=0.2")
        }

        // Titles disappear
        if (projectsTitleRef.current) {
            const letters = projectsTitleRef.current.querySelectorAll('span')
            tl.to(letters, { y: '-100%', opacity: 0, duration: 0.3, ease: "power3.in" }, "-=0.3")
        }
        if (contactTitleRef.current) {
            const letters = contactTitleRef.current.querySelectorAll('span')
            tl.to(letters, { y: '-100%', opacity: 0, duration: 0.3, ease: "power3.in" }, "-=0.3")
        }

        // Phase 2: Show SVG composition
        tl.set('.desktop-success-svg', { display: 'flex' })
          .fromTo('.desktop-success-svg', { opacity: 0 }, { opacity: 1, duration: 0.4 })

        // Phase 3: SVG elements animate in with staggered timing
        tl.fromTo('.svg-hand',
            { opacity: 0, scale: 0.3, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" }
          )
          .fromTo('.svg-lines-pink',
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
            "-=0.35"
          )
          .fromTo('.svg-shape-purple',
            { opacity: 0, scale: 0, rotation: -90 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" },
            "-=0.25"
          )
          .fromTo('.svg-shape-green',
            { opacity: 0, y: 50, scale: 0.5 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo('.svg-stars',
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" },
            "-=0.2"
          )
          .fromTo('.svg-shape-blue',
            { opacity: 0, x: 40, scale: 0.5 },
            { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo('.svg-cursor',
            { opacity: 0, x: -300, y: 300 },
            { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
            "-=0.3"
          )
          // Title: letter-by-letter stagger (like the logo)
          .set('.desktop-success-text', { opacity: 1 })
          .fromTo('.desktop-success-letter',
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.5, stagger: 0.03, ease: "power3.out" },
            "-=0.2"
          )
          // Subtitle: fade in from bottom, all at once, after title is done
          .fromTo('.desktop-success-subtitle',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          )

        successTlRef.current = tl
    }

    const showMobileContact = () => {
        mobileContactRef.current = true
        const items = menuItemsRef.current.filter(Boolean)
        const bubbles = bubblesRef.current.filter(Boolean)
        const tl = gsap.timeline()

        // Animate nav items + lang switcher out
        if (items.length > 0) {
            tl.to([...items].reverse(), { x: -80, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power3.in" }, 0)
        }
        if (bubblesPanelRef.current) {
            tl.to(bubblesPanelRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.in" }, 0)
        }
        if (bubbles.length > 0) {
            tl.to(bubbles, { opacity: 0, duration: 0.2, ease: "power3.in" }, 0)
        }
        if (langRef.current) {
            tl.to(langRef.current, { x: -100, opacity: 0, duration: 0.3, ease: "power3.in" }, 0)
        }

        // Show form
        tl.set('.mobile-contact-form', { display: 'flex' })
          .fromTo('.mobile-field-1',
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" })
          .fromTo('.mobile-field-2',
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "-=0.15")
          .fromTo('.mobile-field-3',
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "-=0.15")
          .fromTo('.mobile-field-4',
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "-=0.15")
    }

    const playMobileSuccess = () => {
        const tl = gsap.timeline()

        // Form fields disappear in reverse
        tl.to('.mobile-field-4', { opacity: 0, y: 30, duration: 0.3, ease: "power3.in" })
          .to('.mobile-field-3', { opacity: 0, y: 30, duration: 0.25, ease: "power3.in" }, "-=0.1")
          .to('.mobile-field-2', { opacity: 0, y: 30, duration: 0.25, ease: "power3.in" }, "-=0.1")
          .to('.mobile-field-1', { opacity: 0, y: 30, duration: 0.25, ease: "power3.in" }, "-=0.1")
          .set('.mobile-contact-form', { display: 'none' })

        // Show SVG composition
        tl.set('.mobile-success-svg', { display: 'flex' })
          .fromTo('.mobile-success-svg', { opacity: 0 }, { opacity: 1, duration: 0.4 })

        // SVG elements animate in
        tl.fromTo('.m-svg-hand',
            { opacity: 0, scale: 0.3, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" }
          )
          .fromTo('.m-svg-lines-pink',
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
            "-=0.35"
          )
          .fromTo('.m-svg-shape-purple',
            { opacity: 0, scale: 0, rotation: -90 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" },
            "-=0.25"
          )
          .fromTo('.m-svg-shape-green',
            { opacity: 0, y: 30, scale: 0.5 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo('.m-svg-stars',
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" },
            "-=0.2"
          )
          .fromTo('.m-svg-shape-blue',
            { opacity: 0, x: 30, scale: 0.5 },
            { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo('.m-svg-cursor',
            { opacity: 0, x: -200, y: 200 },
            { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
            "-=0.3"
          )
          // Title: letter stagger
          .set('.mobile-success-text', { opacity: 1 })
          .fromTo('.mobile-success-letter',
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.5, stagger: 0.03, ease: "power3.out" },
            "-=0.2"
          )
          // Subtitle: fade in from bottom
          .fromTo('.mobile-success-subtitle',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          )

        mobileSuccessTlRef.current = tl
    }

    // Desktop contact overlay timeline
    const buildDesktopTimeline = useCallback(() => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.inOut" },
            onReverseComplete: () => {
                setDesktopContactOpen(false)
                document.body.style.overflow = ''
                // Clear GSAP inline styles so CSS classes take control again
                if (headerRef.current) gsap.set(headerRef.current, { clearProps: 'backgroundColor' })
                if (desktopNavRef.current) gsap.set(desktopNavRef.current, { clearProps: 'all' })
                // Clear logo letter styles + restore white color
                if (logoRef.current) {
                    const logoLetters = logoRef.current.querySelectorAll('span')
                    gsap.set(logoLetters, { clearProps: 'all' })
                    // Restore gradient colors per letter
                    logoLetters.forEach((span, i) => {
                        (span as HTMLElement).style.color = logoColors[i]
                    })
                }
                // Clear any leftover success animation styles for next open
                gsap.set(
                    ['.desktop-field-1', '.desktop-field-2', '.desktop-field-3', '.desktop-field-4'],
                    { clearProps: 'all' }
                )
                if (desktopFormRef.current) gsap.set(desktopFormRef.current, { clearProps: 'all' })
                if (desktopBubblesPanelRef.current) gsap.set(desktopBubblesPanelRef.current, { clearProps: 'all' })
                const bs = desktopBubblesRef.current.filter(Boolean)
                if (bs.length > 0) gsap.set(bs, { clearProps: 'all' })
                if (projectsTitleRef.current) {
                    gsap.set(projectsTitleRef.current, { clearProps: 'visibility' })
                    gsap.set(projectsTitleRef.current.querySelectorAll('span'), { clearProps: 'transform,opacity' })
                }
                if (contactTitleRef.current) {
                    gsap.set(contactTitleRef.current, { clearProps: 'visibility' })
                    gsap.set(contactTitleRef.current.querySelectorAll('span'), { clearProps: 'transform,opacity' })
                }
                gsap.set('.desktop-success-text', { clearProps: 'all' })
                gsap.set('.desktop-success-letter', { clearProps: 'all' })
                gsap.set('.desktop-success-subtitle', { clearProps: 'all' })
                if (pendingNavRef.current) {
                    const dest = pendingNavRef.current
                    pendingNavRef.current = null
                    router.push(dest)
                }
            },
        })

        // Header bg fades to transparent
        if (headerRef.current) {
            tl.to(headerRef.current, { backgroundColor: 'transparent', duration: 0.3, ease: "power2.in" }, 0)
        }

        // Nav elements disappear organically
        if (desktopNavRef.current) {
            tl.to(desktopNavRef.current, { y: -30, opacity: 0, duration: 0.35, ease: "power3.in" }, 0.05)
        }

        // Logo letters slide down to hide, then change color to black
        if (logoRef.current) {
            const logoLetters = logoRef.current.querySelectorAll('span')
            if (logoLetters.length > 0) {
                tl.to(logoLetters, { y: '100%', duration: 0.3, ease: "power3.in" }, 0)
            }
            // Override logo span colors to black for contact overlay
            const logoSpans = logoRef.current.querySelectorAll('span')
            tl.to(logoSpans, { color: 'var(--color-overlay-text)', duration: 0.01 }, 0.35)
        }

        // Blob scales up organically
        tl.fromTo(desktopBlobRef.current,
            { scale: 0, opacity: 1 },
            { scale: 1, duration: 1.4, ease: "power2.out" },
            0.1
        )

        // Make panel visible (container only, children still hidden)
        if (desktopBubblesPanelRef.current) {
            tl.set(desktopBubblesPanelRef.current, { opacity: 1 }, 0.4)
        }

        // Animate cards + form born from center
        const bubbles = desktopBubblesRef.current.filter(Boolean)
        const firstBubble = bubbles[0]
        const restBubbles = bubbles.slice(1)

        // Form + first card born from center simultaneously
        if (desktopFormRef.current) {
            tl.fromTo(desktopFormRef.current,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                0.4
            )
        }
        if (firstBubble) {
            tl.fromTo(firstBubble,
                { x: 80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                0.4
            )
        }

        // Logo letters stagger back in
        if (logoRef.current) {
            const logoLetters = logoRef.current.querySelectorAll('span')
            if (logoLetters.length > 0) {
                tl.fromTo(logoLetters,
                    { y: '100%' },
                    { y: '0%', duration: 0.5, stagger: 0.02, ease: "power3.out" },
                    0.4
                )
            }
        }

        // "Projets" title — letter stagger, same time as first card
        if (projectsTitleRef.current) {
            const letters = projectsTitleRef.current.querySelectorAll('span')
            if (letters.length > 0) {
                tl.fromTo(letters,
                    { y: '100%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 0.5, stagger: 0.03, ease: "power3.out" },
                    0.4
                )
            }
        }

        // "Contact" title — letter stagger, same time as form
        if (contactTitleRef.current) {
            const letters = contactTitleRef.current.querySelectorAll('span')
            if (letters.length > 0) {
                tl.fromTo(letters,
                    { y: '100%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 0.5, stagger: 0.03, ease: "power3.out" },
                    0.4
                )
            }
        }

        // Remaining cards stagger from center to left
        if (restBubbles.length > 0) {
            tl.fromTo(restBubbles,
                { x: 80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" },
                0.55
            )
        }

        return tl
    }, [router])

    const toggleDesktopContact = useCallback(() => {
        if (!desktopContactOpen) {
            setDesktopContactOpen(true)
            const tl = buildDesktopTimeline()
            dtlRef.current = tl
            tl.timeScale(1)
            tl.play()
            document.body.style.overflow = 'hidden'
        } else {
            // If success animation is showing, clean it up first
            if (successTlRef.current) {
                gsap.to('.desktop-success-svg', {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set('.desktop-success-svg', { display: 'none' })
                        successTlRef.current?.kill()
                        successTlRef.current = null
                        // Hide all content with visibility so nothing flashes during overlay reverse
                        if (desktopFormRef.current) gsap.set(desktopFormRef.current, { visibility: 'hidden' })
                        if (desktopBubblesPanelRef.current) gsap.set(desktopBubblesPanelRef.current, { visibility: 'hidden' })
                        const bubbles = desktopBubblesRef.current.filter(Boolean)
                        if (bubbles.length > 0) gsap.set(bubbles, { visibility: 'hidden' })
                        if (projectsTitleRef.current) gsap.set(projectsTitleRef.current, { visibility: 'hidden' })
                        if (contactTitleRef.current) gsap.set(contactTitleRef.current, { visibility: 'hidden' })
                        // Reverse overlay — only blob + header/nav/logo animate visually
                        if (dtlRef.current) {
                            dtlRef.current.timeScale(1.8)
                            dtlRef.current.reverse()
                        }
                    }
                })
            } else {
                if (dtlRef.current) {
                    dtlRef.current.timeScale(1.8)
                    dtlRef.current.reverse()
                }
            }
        }
    }, [desktopContactOpen, buildDesktopTimeline])

    const forceScrollTo = (hash: string) => {
        const el = document.querySelector(hash)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        // For page-navigating links, defer navigation until animation finishes
        if (link.startsWith('/') && menuOpen && tlRef.current) {
            e.preventDefault()
            pendingNavRef.current = link
            tlRef.current.timeScale(1.8)
            tlRef.current.reverse()
            return
        }

        // Desktop overlay bubble clicks
        if (link.startsWith('/') && desktopContactOpen && dtlRef.current) {
            e.preventDefault()
            pendingNavRef.current = link
            dtlRef.current.timeScale(1.8)
            dtlRef.current.reverse()
            return
        }

        // On mobile, show contact form inside the overlay
        if (link === '#contact' && menuOpen && window.innerWidth < 768) {
            e.preventDefault()
            showMobileContact()
            return
        }

        // Hash links: on project pages, navigate to home + hash; on home, force scroll
        if (link.startsWith('#')) {
            e.preventDefault()
            if (isProjectPage) {
                const dest = `/${link}`
                if (menuOpen && tlRef.current) {
                    pendingNavRef.current = dest
                    tlRef.current.timeScale(1.8)
                    tlRef.current.reverse()
                } else {
                    router.push(dest)
                }
            } else {
                if (menuOpen && tlRef.current) {
                    tlRef.current.timeScale(1.8)
                    tlRef.current.reverse()
                    setTimeout(() => forceScrollTo(link), 600)
                } else {
                    forceScrollTo(link)
                }
            }
            return
        }

        if (menuOpen && tlRef.current) {
            tlRef.current.timeScale(1.8)
            tlRef.current.reverse()
        }
    }

    const handleBubbleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const img = e.currentTarget.querySelector('img')
        if (img) {
            gsap.to(img, {
                padding: 0,
                borderWidth: 0,
                borderRadius: 12,
                duration: 0.4,
                ease: "power3.out",
            })
        }
    }

    const handleBubbleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const img = e.currentTarget.querySelector('img')
        if (img) {
            gsap.to(img, {
                padding: 12,
                borderWidth: 1,
                borderRadius: 12,
                duration: 0.4,
                ease: "power3.out",
            })
        }
    }

    const isProjectPage = pathname?.startsWith('/projects/')
    isProjectPageRef.current = !!isProjectPage
    const isHomePage = pathname === '/'
    const isResumePage = pathname === '/resume'
    const navLinks = isResumePage ? resumeNavLinks : homeNavLinks

    return (
        <>
            <header ref={headerRef} className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'} ${isHomePage || isResumePage ? 'home' : ''} ${menuOpen || desktopContactOpen ? 'menu-open' : ''}`}>
                <div className="inner">
                    {/* Mobile: Theme + EN/FR left, Burger right */}
                    <div ref={langRef} className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>

                    <Link
                        ref={logoRef}
                        className={`logo ${isHomePage ? 'hidden md:block' : 'hidden md:block'} overflow-hidden`}
                        href="/"
                        onClick={(e) => {
                            if (desktopContactOpen && dtlRef.current) {
                                e.preventDefault()
                                pendingNavRef.current = '/'
                                if (successTlRef.current) {
                                    gsap.to('.desktop-success-svg', {
                                        opacity: 0,
                                        duration: 0.3,
                                        ease: "power2.inOut",
                                        onComplete: () => {
                                            gsap.set('.desktop-success-svg', { display: 'none' })
                                            successTlRef.current?.kill()
                                            successTlRef.current = null
                                            if (desktopFormRef.current) gsap.set(desktopFormRef.current, { visibility: 'hidden' })
                                            if (desktopBubblesPanelRef.current) gsap.set(desktopBubblesPanelRef.current, { visibility: 'hidden' })
                                            const bubbles = desktopBubblesRef.current.filter(Boolean)
                                            if (bubbles.length > 0) gsap.set(bubbles, { visibility: 'hidden' })
                                            if (projectsTitleRef.current) gsap.set(projectsTitleRef.current, { visibility: 'hidden' })
                                            if (contactTitleRef.current) gsap.set(contactTitleRef.current, { visibility: 'hidden' })
                                            if (dtlRef.current) {
                                                dtlRef.current.timeScale(1.8)
                                                dtlRef.current.reverse()
                                            }
                                        }
                                    })
                                } else {
                                    dtlRef.current.timeScale(1.8)
                                    dtlRef.current.reverse()
                                }
                            } else if (isHomePage || isResumePage) {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                        }}
                    >
                        {logoName.split('').map((letter, i) => (
                            <span key={i} className="inline-block" style={{ color: logoColors[i] }}>{letter === ' ' ? '\u00A0' : letter}</span>
                        ))}
                    </Link>
                    <nav ref={desktopNavRef} className="desktop">
                        <ul>
                            {navLinks.filter(({link}) => link !== '#contact').map(({link, name}, i) => (
                                <li key={name} style={{ '--nav-hover': navHoverColors[i % navHoverColors.length] } as React.CSSProperties}>
                                    <Link
                                        href={isProjectPage ? `/${link}` : link}
                                        className="group"
                                        onClick={(e) => handleNavClick(e, link)}
                                    >
                                        <span>{name}</span>
                                        <span className="underline"/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>
                        <div ref={desktopLangRef} className="hidden md:block">
                            <LanguageSwitcher />
                        </div>

                        {/* Contact button — desktop only */}
                        <button
                            ref={contactBtnRef}
                            className={`contact-btn hidden lg:flex group ${desktopContactOpen ? 'open' : ''}`}
                            onClick={toggleDesktopContact}
                        >
                            <div className="inner">
                                <span>{desktopContactOpen ? (isFrench ? 'Retour' : 'Back') : 'Contact'}</span>
                            </div>
                        </button>

                        {/* Burger button — mobile only */}
                        <button
                            ref={burgerRef}
                            className="burger-btn md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg transition-colors duration-300"
                            style={{
                                backgroundColor: menuOpen ? 'var(--color-overlay-text)' : 'var(--color-text)',
                                borderColor: menuOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                                borderWidth: menuOpen ? 1 : 0,
                            }}
                            onClick={toggleMenu}
                            aria-label="Menu"
                        >
                            <span ref={line1Ref} className="block w-5 h-[2px] origin-center transition-colors duration-300" style={{ backgroundColor: menuOpen ? 'var(--color-overlay-blob)' : 'var(--color-bg)' }} />
                            <span ref={line2Ref} className="block w-5 h-[2px] origin-center transition-colors duration-300" style={{ backgroundColor: menuOpen ? 'var(--color-overlay-blob)' : 'var(--color-bg)' }} />
                            <span ref={line3Ref} className="block w-5 h-[2px] origin-center transition-colors duration-300" style={{ backgroundColor: menuOpen ? 'var(--color-overlay-blob)' : 'var(--color-bg)' }} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile fullscreen overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[105] md:hidden pointer-events-none overflow-hidden"
            >
                {/* Organic blob background */}
                <div
                    ref={blobRef}
                    className="absolute"
                    style={{
                        width: '250vmax',
                        height: '250vmax',
                        top: '-100vmax',
                        right: '-100vmax',
                        borderRadius: '43% 57% 69% 31% / 34% 65% 35% 66%',
                        transform: 'scale(0)',
                        backgroundColor: 'var(--color-overlay-blob)',
                    }}
                />

                {/* Menu content */}
                <nav className={`relative z-10 flex flex-col justify-center items-start h-full px-10 ${menuOpen ? 'pointer-events-auto' : ''}`}>
                    <ul className="flex flex-col gap-6">
                        {isProjectPage && (
                            <li
                                ref={(el) => { menuItemsRef.current[0] = el }}
                                className={menuOpen ? '' : 'opacity-0'}
                            >
                                <Link
                                    href="/"
                                    className="text-4xl font-bold transition-colors duration-200"
                                    style={{ color: 'var(--color-overlay-text)' }}
                                    onClick={(e) => handleNavClick(e, '/')}
                                >
                                    {isFrench ? 'Accueil' : 'Home'}
                                </Link>
                            </li>
                        )}
                        {(() => {
                            const filtered = navLinks.filter(({link}) => {
                                if (link === '#techstack' || link === '#skills') return false
                                return true
                            })
                            const offset = isProjectPage ? 1 : 0
                            const first = filtered[0]
                            const rest = filtered.slice(1)
                            return (
                                <>
                                    {first && (
                                        <li
                                            key={first.link}
                                            ref={(el) => { menuItemsRef.current[offset] = el }}
                                            className={menuOpen ? '' : 'opacity-0'}
                                        >
                                            <Link
                                                href={isProjectPage ? `/${first.link}` : first.link}
                                                className="text-4xl font-bold transition-colors duration-200"
                                                style={{ color: 'var(--color-overlay-text)' }}
                                                onClick={(e) => handleNavClick(e, first.link)}
                                            >
                                                {first.name}
                                            </Link>
                                        </li>
                                    )}
                                    <li className={`-mt-3 ml-2 ${menuOpen ? '' : 'opacity-0'}`}>
                                        <div
                                            ref={(el) => { bubblesPanelRef.current = el }}
                                            className="inline-flex gap-2.5 rounded-full px-3 py-1.5 opacity-0"
                                            style={{ backgroundColor: 'var(--color-overlay-surface)' }}
                                        >
                                            {projectBubbles.map((bubble, i) => (
                                                <Link
                                                    key={bubble.slug}
                                                    href={`/projects/${bubble.slug}`}
                                                    ref={(el) => { bubblesRef.current[i] = el }}
                                                    className="block w-7 h-7 rounded-full overflow-hidden opacity-0"
                                                    onClick={(e) => handleNavClick(e, `/projects/${bubble.slug}`)}
                                                    aria-label={bubble.label}
                                                >
                                                    <Image
                                                        src={bubble.srcMobile}
                                                        alt={bubble.label}
                                                        width={28}
                                                        height={28}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </li>
                                    {rest.map(({link, name}, i) => (
                                        <li
                                            key={link}
                                            ref={(el) => { menuItemsRef.current[offset + 1 + i] = el }}
                                            className={menuOpen ? '' : 'opacity-0'}
                                        >
                                            <Link
                                                href={isProjectPage ? `/${link}` : link}
                                                className="text-4xl font-bold transition-colors duration-200"
                                                style={{ color: 'var(--color-overlay-text)' }}
                                                onClick={(e) => handleNavClick(e, link)}
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            )
                        })()}
                    </ul>
                </nav>

                {/* Mobile contact form */}
                <div
                    className="mobile-contact-form absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-auto"
                    style={{ display: 'none' }}
                >
                    <div className="w-full max-w-md">
                        <div className="card-border rounded-xl p-6">
                            <form
                                onSubmit={handleContactSubmit}
                                className="w-full flex flex-col gap-5"
                            >
                                {/* Honeypot */}
                                <div className="absolute -left-[9999px]" aria-hidden="true">
                                    <input
                                        type="text"
                                        name="website"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={honeypot}
                                        onChange={(e) => setHoneypot(e.target.value)}
                                    />
                                </div>

                                <div className="mobile-field-1">
                                    <label htmlFor="m-name">{t.contact.name}</label>
                                    <input
                                        type="text"
                                        id="m-name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactChange}
                                        required
                                    />
                                </div>

                                <div className="mobile-field-2">
                                    <label htmlFor="m-subject">{t.contact.subject}</label>
                                    <select
                                        id="m-subject"
                                        name="subject"
                                        value={contactForm.subject}
                                        onChange={handleContactChange}
                                        required
                                        suppressHydrationWarning
                                        className="w-full px-4 py-4 text-base rounded-md"

                                    >
                                        <option value="" suppressHydrationWarning>{t.contact.subjectPlaceholder}</option>
                                        {t.contact.scenarios.map((scenario: string) => (
                                            <option key={scenario} value={scenario}>{scenario}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mobile-field-3">
                                    <label htmlFor="m-message">{t.contact.message}</label>
                                    <textarea
                                        id="m-message"
                                        name="message"
                                        value={contactForm.message}
                                        onChange={handleContactChange}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <button type="submit" className="mobile-field-4">
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {contactLoading ? t.contact.sending : t.contact.send}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <Image src="/images/arrow-down.svg" alt="arrow" width={24} height={24} />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Mobile success SVG composition */}
                <div
                    className="mobile-success-svg absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-auto"
                    style={{ display: 'none' }}
                >
                    <div
                        className="relative w-full max-w-xs mx-auto"
                        style={{ aspectRatio: '960 / 720' }}
                    >
                        <img src="/images/mail-svg/Lines.svg" alt="" className="m-svg-lines-pink absolute" style={{ left: '19.13%', top: '10.64%', width: '67.92%', height: '78.75%' }} />
                        <img src="/images/mail-svg/Stars.svg" alt="" className="m-svg-stars absolute" style={{ left: '15.03%', top: '14.43%', width: '69.90%', height: '66.11%' }} />
                        <img src="/images/mail-svg/Shape.svg" alt="" className="m-svg-shape-purple absolute" style={{ left: '59.57%', top: '19.03%', width: '12.60%', height: '11.53%' }} />
                        <img src="/images/mail-svg/Shape1.svg" alt="" className="m-svg-shape-green absolute" style={{ left: '19.46%', top: '50.88%', width: '24.90%', height: '30.56%' }} />
                        <img src="/images/mail-svg/Hand2.svg" alt="" className="m-svg-hand absolute" style={{ left: '26.70%', top: '25.45%', width: '47.29%', height: '60.42%' }} />
                        <img src="/images/mail-svg/Mouse_Pointer.svg" alt="" className="m-svg-cursor absolute" style={{ left: '32.38%', top: '50.88%', width: '8.85%', height: '13.89%' }} />
                        <img src="/images/mail-svg/Shape2.svg" alt="" className="m-svg-shape-blue absolute" style={{ left: '65.67%', top: '49.03%', width: '16.46%', height: '20.97%' }} />
                    </div>

                    <div className="mobile-success-text text-center mt-4 px-4 opacity-0">
                        <h3 className="text-xl font-bold mb-2 overflow-hidden" style={{ color: 'var(--color-overlay-text)' }}>
                            {t.contact.successTitle.split('').map((letter: string, i: number) => (
                                <span key={i} className="mobile-success-letter inline-block translate-y-full opacity-0">
                                    {letter === ' ' ? '\u00A0' : letter}
                                </span>
                            ))}
                        </h3>
                        <p className="mobile-success-subtitle text-sm mb-4 opacity-0" style={{ color: 'var(--color-overlay-text)', opacity: 0.6 }}>{t.contact.successMessage}</p>
                    </div>
                </div>
            </div>

            {/* Desktop fullscreen contact overlay */}
            <div
                ref={desktopOverlayRef}
                className="fixed inset-0 z-[105] hidden lg:block pointer-events-none overflow-hidden"
            >
                {/* Organic blob background */}
                <div
                    ref={desktopBlobRef}
                    className="absolute"
                    style={{
                        width: '250vmax',
                        height: '250vmax',
                        top: '-100vmax',
                        right: '-100vmax',
                        borderRadius: '43% 57% 69% 31% / 34% 65% 35% 66%',
                        transform: 'scale(0)',
                        backgroundColor: 'var(--color-overlay-blob)',
                    }}
                />

                {/* Content: centered wrapper */}
                <div className={`relative z-10 flex h-full items-center justify-center px-20 ${desktopContactOpen ? 'pointer-events-auto' : ''}`}>
                    {/* Inner row: fixed-width bubble column + form */}
                    <div className="flex items-stretch gap-4">
                        {/* Project column: title + cards */}
                        <div className="flex flex-col justify-between">
                            <h2
                                ref={(el) => { projectsTitleRef.current = el }}
                                className="text-4xl font-bold overflow-hidden text-right mb-4"
                            >
                                {(isFrench ? 'Projets' : 'Work').split('').map((letter, i) => (
                                    <span key={i} className="inline-block translate-y-full opacity-0" style={{ color: 'var(--color-overlay-text)' }}>{letter}</span>
                                ))}
                            </h2>
                            <div
                                ref={(el) => { desktopBubblesPanelRef.current = el }}
                                className="flex flex-col justify-between flex-1 opacity-0"
                            >
                            {projectBubbles.map((bubble, i) => (
                                <Link
                                    key={bubble.slug}
                                    href={`/projects/${bubble.slug}`}
                                    ref={(el) => { desktopBubblesRef.current[i] = el }}
                                    className="image-wrapper group relative overflow-hidden rounded-xl opacity-0 cursor-pointer w-[200px]"
                                    style={{ background: bubble.bg }}
                                    onClick={(e) => handleNavClick(e, `/projects/${bubble.slug}`)}
                                    onMouseEnter={handleBubbleMouseEnter}
                                    onMouseLeave={handleBubbleMouseLeave}
                                    aria-label={bubble.label}
                                >
                                    <Image
                                        src={bubble.src}
                                        alt={bubble.label}
                                        width={600}
                                        height={400}
                                        quality={80}
                                        sizes="200px"
                                        className="rounded-xl card-border p-3 block"
                                        style={{ color: 'transparent' }}
                                    />
                                </Link>
                            ))}
                            </div>
                        </div>

                        {/* Contact: form + title */}
                        <div ref={desktopFormRef} className="relative w-[520px] opacity-0">
                        <div className="card-border rounded-xl p-8 w-full">
                            <form
                                onSubmit={handleContactSubmit}
                                className="w-full flex flex-col gap-7"
                            >
                                {/* Honeypot */}
                                <div className="absolute -left-[9999px]" aria-hidden="true">
                                    <input
                                        type="text"
                                        name="website"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={honeypot}
                                        onChange={(e) => setHoneypot(e.target.value)}
                                    />
                                </div>

                                <div className="desktop-field-1">
                                    <label htmlFor="nav-name">{t.contact.name}</label>
                                    <input
                                        type="text"
                                        id="nav-name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactChange}
                                        required
                                    />
                                </div>

                                <div className="desktop-field-2">
                                    <label htmlFor="nav-subject">{t.contact.subject}</label>
                                    <select
                                        id="nav-subject"
                                        name="subject"
                                        value={contactForm.subject}
                                        onChange={handleContactChange}
                                        required
                                        suppressHydrationWarning
                                        className="w-full px-4 py-4 text-base rounded-md"

                                    >
                                        <option value="" suppressHydrationWarning>{t.contact.subjectPlaceholder}</option>
                                        {t.contact.scenarios.map((scenario: string) => (
                                            <option key={scenario} value={scenario}>{scenario}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="desktop-field-3">
                                    <label htmlFor="nav-message">{t.contact.message}</label>
                                    <textarea
                                        id="nav-message"
                                        name="message"
                                        value={contactForm.message}
                                        onChange={handleContactChange}
                                        rows={5}
                                        required
                                    />
                                </div>

                                <button type="submit" className="desktop-field-4">
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {contactLoading ? t.contact.sending : t.contact.send}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <Image src="/images/arrow-down.svg" alt="arrow" width={24} height={24} />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                        <h2
                            ref={(el) => { contactTitleRef.current = el }}
                            className="absolute left-full bottom-0 ml-4 text-4xl font-bold overflow-hidden whitespace-nowrap"
                        >
                            {'Contact'.split('').map((letter, i) => (
                                <span key={i} className="inline-block translate-y-full opacity-0" style={{ color: 'var(--color-overlay-text)' }}>{letter}</span>
                            ))}
                        </h2>
                        </div>
                    </div>

                    {/* Success SVG composition — centered in the white overlay */}
                    <div
                        className="desktop-success-svg absolute inset-0 flex flex-col items-center justify-center"
                        style={{ display: 'none' }}
                    >
                        <div
                            className="relative w-full max-w-2xl mx-auto"
                            style={{ aspectRatio: '960 / 720' }}
                        >
                            <img src="/images/mail-svg/Lines.svg" alt="" className="svg-lines-pink absolute" style={{ left: '19.13%', top: '10.64%', width: '67.92%', height: '78.75%' }} />
                            <img src="/images/mail-svg/Stars.svg" alt="" className="svg-stars absolute" style={{ left: '15.03%', top: '14.43%', width: '69.90%', height: '66.11%' }} />
                            <img src="/images/mail-svg/Shape.svg" alt="" className="svg-shape-purple absolute" style={{ left: '59.57%', top: '19.03%', width: '12.60%', height: '11.53%' }} />
                            <img src="/images/mail-svg/Shape1.svg" alt="" className="svg-shape-green absolute" style={{ left: '19.46%', top: '50.88%', width: '24.90%', height: '30.56%' }} />
                            <img src="/images/mail-svg/Hand2.svg" alt="" className="svg-hand absolute" style={{ left: '26.70%', top: '25.45%', width: '47.29%', height: '60.42%' }} />
                            <img src="/images/mail-svg/Mouse_Pointer.svg" alt="" className="svg-cursor absolute" style={{ left: '32.38%', top: '50.88%', width: '8.85%', height: '13.89%' }} />
                            <img src="/images/mail-svg/Shape2.svg" alt="" className="svg-shape-blue absolute" style={{ left: '65.67%', top: '49.03%', width: '16.46%', height: '20.97%' }} />
                        </div>

                        <div className="desktop-success-text text-center mt-6 px-4">
                            <h3 className="text-2xl font-bold mb-2 overflow-hidden" style={{ color: 'var(--color-overlay-text)' }}>
                                {t.contact.successTitle.split('').map((letter: string, i: number) => (
                                    <span key={i} className="desktop-success-letter inline-block translate-y-full opacity-0">
                                        {letter === ' ' ? '\u00A0' : letter}
                                    </span>
                                ))}
                            </h3>
                            <p className="desktop-success-subtitle mb-4 opacity-0" style={{ color: 'var(--color-overlay-text)', opacity: 0.6 }}>{t.contact.successMessage}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar
