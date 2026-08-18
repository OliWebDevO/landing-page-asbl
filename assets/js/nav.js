/* ============================================================
   MON SITE ASBL — NAV.JS
   ------------------------------------------------------------
   · Header qui se densifie au scroll (fond + ombre)
   · Menu mobile : ouverture en cercle depuis le burger,
     entrées en cascade, burger qui se mue en croix
   · Scrollspy : le lien de la section visible est marqué
     .is-active (et aria-current)
   · Piège à focus + fermeture Échap quand le menu est ouvert

   Le défilement doux vers les ancres est géré par core.js
   (Lenis) ; ici on se contente de refermer le panneau, via
   l'évènement `asbl:navclose` qu'il émet.

   Sans GSAP, tout reste fonctionnel : le panneau bascule en
   visibilité et le menu s'ouvre/se ferme normalement.
   ============================================================ */

(() => {
  "use strict";

  const gsap = window.gsap;
  const header = document.getElementById("site-header");
  const burger = document.getElementById("burger");
  const panel = document.getElementById("navpanel");

  /* ----------------------------------------------------------
     HEADER — densification au scroll
     ---------------------------------------------------------- */

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-stuck", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------
     MENU MOBILE
     ---------------------------------------------------------- */

  if (burger && panel) {
    const links = Array.from(panel.querySelectorAll("a"));
    let open = false;
    let timeline = null;

    const reduced = window.AsblAnim ? window.AsblAnim.reduced : false;

    /** L'ouverture part du burger : un cercle s'étend depuis le
        coin supérieur droit jusqu'à couvrir l'écran. */
    function buildTimeline() {
      if (!gsap) return null;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
        onReverseComplete: () => {
          panel.hidden = true;
          panel.classList.remove("is-open");
          document.body.style.overflow = "";
        },
      });

      tl.fromTo(
        panel,
        { clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" },
        { clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)", duration: 0.6 }
      );

      tl.fromTo(
        links,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
        0.2
      );

      // Le burger devient une croix.
      tl.to(burger.querySelector('[data-line="1"]'),
        { rotate: 45, y: 7, duration: 0.35 }, 0);
      tl.to(burger.querySelector('[data-line="2"]'),
        { opacity: 0, scaleX: 0.2, duration: 0.25 }, 0);
      tl.to(burger.querySelector('[data-line="3"]'),
        { rotate: -45, y: -7, duration: 0.35 }, 0);

      return tl;
    }

    function openMenu() {
      if (open) return;
      open = true;

      panel.hidden = false;
      panel.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Fermer le menu");
      document.body.style.overflow = "hidden";

      if (gsap && !reduced) {
        if (!timeline) timeline = buildTimeline();
        if (timeline) timeline.play();
      }

      // Le premier lien reçoit le focus : la navigation au
      // clavier entre directement dans le menu.
      if (links[0]) links[0].focus({ preventScroll: true });
    }

    function closeMenu() {
      if (!open) return;
      open = false;

      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Ouvrir le menu");

      if (gsap && !reduced && timeline) {
        timeline.reverse();
      } else {
        panel.hidden = true;
        panel.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    }

    burger.addEventListener("click", () => {
      if (open) closeMenu();
      else openMenu();
    });

    // core.js émet cet évènement avant de défiler vers une ancre.
    document.addEventListener("asbl:navclose", closeMenu);

    // Échap ferme et rend le focus au burger.
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !open) return;
      closeMenu();
      burger.focus({ preventScroll: true });
    });

    // Piège à focus : tant que le menu est ouvert, la tabulation
    // tourne entre ses liens et le burger.
    panel.addEventListener("keydown", (event) => {
      if (event.key !== "Tab" || !open) return;

      const focusables = [burger].concat(links);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Repasser en desktop pendant que le menu est ouvert doit
    // rendre la page à son état normal. Le seuil suit celui du
    // CSS (1160px) : c'est là que la nav complète remplace le
    // burger et que le panneau passe en display:none.
    window.matchMedia("(min-width: 1160px)").addEventListener("change", (e) => {
      if (e.matches && open) closeMenu();
    });
  }

  /* ----------------------------------------------------------
     SCROLLSPY — le lien de la section visible est marqué actif
     ---------------------------------------------------------- */

  const navLinks = Array.from(document.querySelectorAll(".header__link"));

  if (navLinks.length && "IntersectionObserver" in window) {
    const byId = new Map();

    navLinks.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      if (section) byId.set(section, link);
    });

    const setActive = (link) => {
      navLinks.forEach((other) => {
        const isActive = other === link;
        other.classList.toggle("is-active", isActive);
        if (isActive) other.setAttribute("aria-current", "true");
        else other.removeAttribute("aria-current");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // La section la plus haute encore visible gagne : quand
        // deux sections se chevauchent, on suit le sens de lecture.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (!visible.length) return;
        const link = byId.get(visible[0].target);
        if (link) setActive(link);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    byId.forEach((_link, section) => observer.observe(section));
  }
})();
