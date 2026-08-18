/* ============================================================
   MON SITE ASBL — ANIMATIONS / CORE.JS
   ------------------------------------------------------------
   Le socle dont dépendent tous les autres modules :

     · Lenis (scroll fluide, desktop uniquement — le natif est
       parfait sur mobile et économise du CPU)
     · Synchronisation Lenis ↔ ScrollTrigger via le ticker GSAP
     · Défilement doux vers les ancres (#section), piloté par
       Lenis quand il tourne, natif sinon
     · Un registre de modules joués dans un gsap.matchMedia :
       chaque module reçoit le contexte et se nettoie tout seul
       aux changements de breakpoint
     · prefers-reduced-motion : AUCUN module n'est joué, aucun
       état initial n'est posé → la page reste pleinement
       visible et utilisable, en version statique

   Ordre de chargement (defer, cf. index.html) :
     gsap → ScrollTrigger → lenis → core → modules → nav/form
   ============================================================ */

(() => {
  "use strict";

  if (!window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     LENIS — scroll fluide desktop
     ---------------------------------------------------------- */

  let lenis = null;

  function initLenis() {
    // Pas de scroll « custom » en reduced-motion : l'utilisateur
    // a demandé du mouvement sobre, on lui rend le scroll natif.
    if (reduced) return;
    if (!window.Lenis) return;
    if (window.innerWidth < 768) return;

    lenis = new window.Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    if (ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ----------------------------------------------------------
     ANCRES — défilement doux vers une section
     Un seul écouteur délégué : tous les liens #ancre de la page
     (header, menu mobile, footer, CTA) passent par ici.
     ---------------------------------------------------------- */

  function scrollToTarget(target) {
    const header = document.getElementById("site-header");
    const offset = header ? header.offsetHeight + 8 : 0;

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -offset,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    // Sans Lenis (mobile, reduced-motion, échec de chargement) :
    // scroll natif — `scroll-padding-top` gère déjà le décalage
    // du header fixe, donc on ne le compense pas deux fois.
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }

  function initAnchors() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      // Le menu mobile se referme avant le défilement (nav.js
      // écoute cet évènement) — sinon on scrolle sous un
      // panneau plein écran.
      document.dispatchEvent(new CustomEvent("asbl:navclose"));

      scrollToTarget(target);

      // L'URL suit, sans saut brutal : le lien reste partageable.
      if (window.history.replaceState) {
        window.history.replaceState(null, "", href);
      }
    });
  }

  /* ----------------------------------------------------------
     REGISTRE DE MODULES
     Chaque module s'enregistre puis reçoit le contexte
     matchMedia : `context.conditions` (isDesktop…) et
     `context.add()` pour du code nettoyé automatiquement.
     ---------------------------------------------------------- */

  const modules = [];

  // Contexte matchMedia courant, tant qu'un breakpoint est actif.
  // Il sert à jouer immédiatement un module qui s'enregistre
  // APRÈS le démarrage (voir register ci-dessous).
  let liveContext = null;

  /** Joue un module en isolant ses erreurs : un module qui
      casse ne doit jamais masquer la page. */
  function play(fn, context) {
    try {
      fn(context);
    } catch (error) {
      console.warn("Module d'animation en échec :", error);
    }
  }

  window.AsblAnim = {
    register(fn) {
      modules.push(fn);
      // Le socle tourne déjà (module chargé tardivement, ou
      // ordre des scripts différé) : on le joue sans attendre
      // un hypothétique prochain changement de breakpoint.
      if (liveContext) play(fn, liveContext);
    },
    /** Exposé pour les modules qui doivent recaler le scroll
        après avoir changé la hauteur du document. */
    refresh() {
      if (ScrollTrigger) ScrollTrigger.refresh();
    },
    get lenis() {
      return lenis;
    },
    scrollToTarget,
    reduced,
  };

  function runModules() {
    // En reduced-motion, on ne joue AUCUN module : les états
    // initiaux (opacity 0…) ne sont posés que par les modules
    // eux-mêmes, donc la page reste entièrement visible.
    if (reduced) return;
    if (!ScrollTrigger) return;

    gsap.matchMedia().add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        liveContext = context;
        modules.forEach((fn) => play(fn, context));

        // Au changement de breakpoint, GSAP nettoie tout ce que
        // les modules ont créé : le contexte n'est plus valable.
        return () => {
          liveContext = null;
        };
      }
    );
  }

  /* ----------------------------------------------------------
     DÉMARRAGE
     ---------------------------------------------------------- */

  initLenis();
  initAnchors();

  // Les modules s'enregistrent dans les scripts qui SUIVENT
  // celui-ci (defer, même file d'attente) : le registre est donc
  // encore vide à cet instant. Ce n'est pas un problème — on
  // ouvre le contexte matchMedia tout de suite, et chaque module
  // qui s'enregistre ensuite est joué à la volée (cf. register).
  // Aucune dépendance à un timing : ni rAF, ni setTimeout.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runModules);
  } else {
    runModules();
  }

  // Le chargement des polices et des images change la hauteur
  // du document : on recale les déclencheurs.
  window.addEventListener("load", () => {
    if (ScrollTrigger) ScrollTrigger.refresh();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (ScrollTrigger) ScrollTrigger.refresh();
    });
  }
})();
