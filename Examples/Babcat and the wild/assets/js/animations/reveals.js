/* ============================================================
   BABCAT & THE WILD — ANIMATIONS / REVEALS.JS
   ------------------------------------------------------------
   Régime SOBRE du site (PLAN §5 — hiérarchie d'intensité) :
   le site respire en sourdine, seule la page Qui suis-je
   déploiera l'arsenal (about-story.js, sprint dédié).

   Patterns pris en charge (hooks HTML) :
     [data-reveal]          fade + y 32→0 (16 en mobile), 1 fois
     [data-reveal-stagger]  enfants en cascade, stagger 0.08
     [data-reveal-text]     SplitText lignes (desktop uniquement),
                            y 24 + opacité, stagger 0.04/ligne,
                            masque de ligne, revert() en fin
     [data-parallax]        yPercent ± (4 % × data-lag), scrub 0.9
     [data-draw]            tracé SVG stroke-dashoffset, 1.2 s
     .mark-herbier          coup de marqueur background-size 0→100 %
     .hero                  timeline d'entrée au chargement (< 1.5 s)
     scotch (.taped-photo__tape / .polaroid__tape) : scale-in
                            discret ~0.4 s après son bloc [data-reveal]

   INTERDITS respectés (PLAN §5) : pas de pin, pas de snap, pas
   de scrub narratif (seule la parallaxe est scrubbée), pas de
   reverse (réservé à l'herbier), pas de bounce/elastic — seule
   exception : micro-overshoot du scotch, back.out(1.2).

   FOUC : les états initiaux sont posés ici (gsap.set) juste
   avant la création des triggers — jamais en CSS.
   ============================================================ */

(() => {
  "use strict";

  if (!window.BabcatAnim || !window.gsap) return;

  /* ----------------------------------------------------------
     OUTILS
     ---------------------------------------------------------- */

  /** Déclencheur standard du régime sobre : une seule fois,
      jamais de reverse (réservé à l'herbier de Qui suis-je). */
  function triggerOnce(el, start) {
    return { trigger: el, start: start || "top 80%", once: true };
  }

  /** Ancêtre proche qui masque le débordement (≤ 3 niveaux) —
      la parallaxe y ajoute une micro-compensation d'échelle. */
  function findClippedAncestor(el) {
    let node = el.parentElement;
    for (let i = 0; node && node !== document.body && i < 3; i += 1) {
      const style = getComputedStyle(node);
      if (style.overflow !== "visible" || style.overflowY !== "visible") {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  /** Reveal simple : fade + y → 0. Fallback universel.
      clearProps en fin de course : on rend la main au CSS
      (sinon le transform inline écrase les :hover — lift des
      cartes, etc.). */
  function revealSimple(el, y) {
    gsap.set(el, { opacity: 0, y });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      clearProps: "transform,opacity",
      scrollTrigger: triggerOnce(el),
    });
  }

  /** Coup de marqueur : le surligneur se « donne » sous les yeux
      (background-size 0→100 %, hauteur lue depuis le CSS). */
  function initMark(mark) {
    const computed = getComputedStyle(mark).backgroundSize;
    const height = computed.split(" ")[1] || "0.42em";
    gsap.set(mark, { backgroundSize: `0% ${height}` });
    gsap.to(mark, {
      backgroundSize: `100% ${height}`,
      duration: 0.6,
      ease: "power1.out",
      scrollTrigger: triggerOnce(mark, "top 75%"),
    });
  }

  /* ----------------------------------------------------------
     HERO — timeline d'entrée au chargement (pas au scroll).
     Logo → phrase script → lead par lignes → CTA.
     Total < 1.5 s, jamais bloquant (contenu déjà là sans JS).
     ---------------------------------------------------------- */

  function initHero(isDesktop) {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const title = hero.querySelector(".hero__title");
    const script = hero.querySelector(".hero__script");
    const lead = hero.querySelector(".hero__lead");
    const actions = hero.querySelector(".hero__actions");
    const media = hero.querySelector(".hero__media");
    const parts = [title, script, lead, actions].filter(Boolean);
    if (!parts.length) return;

    const tl = gsap.timeline();
    if (media) {
      gsap.set(media, { opacity: 0 });
      tl.to(media, { opacity: 1, duration: 0.8, ease: "power1.out" }, 0);
    }

    if (!isDesktop) {
      // Mobile : timeline raccourcie, cascade simple (~0.9 s)
      gsap.set(parts, { opacity: 0, y: 16 });
      tl.to(
        parts,
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
        0.05
      );
      return;
    }

    // Desktop : lead découpé en lignes (davidwhyte §1.b, version douce)
    let leadTargets = lead;
    let split = null;
    if (lead) {
      try {
        split = new SplitText(lead, {
          type: "lines",
          mask: "lines",
          linesClass: "bw-hero-line",
        });
        leadTargets = split.lines;
      } catch (error) {
        split = null; // fallback : le lead entier
      }
    }

    gsap.set([title, script, actions].filter(Boolean), { opacity: 0, y: 24 });
    if (leadTargets) gsap.set(leadTargets, { opacity: 0, y: 16 });

    tl.to(title, { opacity: 1, y: 0, duration: 0.7 }, 0.05)
      .to(script, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to(
        leadTargets,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 },
        0.35
      )
      .to(actions, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

    if (split) {
      // Restitue le DOM d'origine (accessibilité, sélection, reflow)
      tl.call(() => split.revert());
    }
  }

  /* ----------------------------------------------------------
     [data-reveal] — bloc entier + micro-détail scotch
     ---------------------------------------------------------- */

  function initReveal(el, isDesktop) {
    const y = isDesktop ? 32 : 16;
    // .washi = scotchs SVG du kit client (remplacent le scotch
    // jaune générique sur les photos — 08/07/2026)
    const tapes = el.querySelectorAll(
      ".taped-photo__tape, .polaroid__tape, .washi"
    );

    if (!tapes.length || !isDesktop) {
      revealSimple(el, y);
      return;
    }

    // Avant-goût de l'herbier : le scotch se colle APRÈS la photo
    // (~0.4 s), micro-overshoot back.out(1.2) — l'exception autorisée.
    gsap.set(el, { opacity: 0, y });
    gsap.set(tapes, { scale: 0 });

    gsap
      .timeline({ scrollTrigger: triggerOnce(el) })
      .to(el, { opacity: 1, y: 0, duration: 0.7, clearProps: "transform,opacity" })
      .to(
        tapes,
        {
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.2)",
          stagger: 0.1,
          clearProps: "transform",   // restaure la rotation CSS du scotch
        },
        0.4
      );
  }

  /* ----------------------------------------------------------
     [data-reveal-stagger] — enfants en cascade
     (les enfants portant data-reveal-text gardent leur propre
     reveal par lignes — on ne les anime pas deux fois)
     ---------------------------------------------------------- */

  function initRevealStagger(el, isDesktop) {
    const y = isDesktop ? 32 : 16;
    const children = Array.from(el.children).filter(
      (child) => !child.hasAttribute("data-reveal-text")
    );
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y });
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      clearProps: "transform,opacity",  // rend la main aux :hover CSS
      scrollTrigger: triggerOnce(el),
    });
  }

  /* ----------------------------------------------------------
     [data-reveal-text] — titre ligne par ligne (SplitText)
     Desktop uniquement (coût mobile) ; revert() après complétion.
     Les .mark-herbier imbriqués sont rebranchés APRÈS le revert
     (revert() recrée les nœuds → on ne les anime qu'ensuite).
     ---------------------------------------------------------- */

  function initRevealText(el, isDesktop) {
    if (!isDesktop) {
      revealSimple(el, 16);
      return;
    }

    let split = null;
    try {
      split = new SplitText(el, {
        type: "lines",
        mask: "lines",
        linesClass: "bw-line",
      });
    } catch (error) {
      split = null;
    }
    if (!split || !split.lines.length) {
      if (split) split.revert();
      revealSimple(el, 24);
      return;
    }

    gsap.set(split.lines, { opacity: 0, y: 24 });
    gsap.to(split.lines, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.04,
      scrollTrigger: triggerOnce(el),
      onComplete() {
        split.revert();
        el.querySelectorAll(".mark-herbier").forEach(initMark);
      },
    });
  }

  /* ----------------------------------------------------------
     [data-parallax] — dérive minuscule (davidwhyte §6 :
     « la subtilité vient des petits nombres »)
     amplitude = ±(4 % × data-lag), plafonnée à ±4 %.
     Seul scrub autorisé sur cette page. Desktop uniquement.
     ---------------------------------------------------------- */

  function initParallax(el) {
    const lag = Math.abs(parseFloat(el.dataset.lag)) || 1;
    const amp = Math.min(4, 4 * lag);
    const clipped = findClippedAncestor(el);

    // Débord masqué (ex. .hero__media) : micro-zoom de compensation
    // pour que la dérive ne découvre jamais le bord de l'image.
    if (clipped) {
      gsap.set(el, { scale: 1 + (2 * amp) / 100, transformOrigin: "50% 50%" });
    }

    gsap.fromTo(
      el,
      { yPercent: amp },
      {
        yPercent: -amp,
        ease: "none",
        scrollTrigger: {
          trigger: clipped || el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  /* ----------------------------------------------------------
     [data-draw] — trait d'annotation qui se dessine
     (autoAlpha 0 au départ : évite le point parasite des
     linecap arrondis quand dashoffset = longueur)
     ---------------------------------------------------------- */

  function initDraw(svg) {
    const paths = svg.querySelectorAll("path, line, polyline");
    if (!paths.length) return;

    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        autoAlpha: 0,
      });
    });

    gsap
      .timeline({ scrollTrigger: triggerOnce(svg, "top 85%") })
      .set(paths, { autoAlpha: 1 })
      .to(paths, {
        strokeDashoffset: 0,
        duration: 1.2, // exception sanctionnée par le PLAN (tracé SVG)
        ease: "power1.inOut",
        stagger: 0.15, // la flèche se dessine après la courbe
      });
  }

  /* ----------------------------------------------------------
     MODULE — enregistré auprès de core.js, exécuté par
     gsap.matchMedia (jamais en reduced-motion).
     Créations en ordre DOM (haut → bas) pour ScrollTrigger.
     ---------------------------------------------------------- */

  window.BabcatAnim.register((context) => {
    const { isDesktop } = context.conditions;

    // 1. Hero — au chargement, hors scroll
    initHero(isDesktop);

    // 2. Reveals au scroll, dans l'ordre du document
    document
      .querySelectorAll("[data-reveal], [data-reveal-stagger], [data-reveal-text]")
      .forEach((el) => {
        if (el.closest(".hero")) return; // le hero a sa timeline
        if (el.hasAttribute("data-reveal-text")) {
          initRevealText(el, isDesktop);
        } else if (el.hasAttribute("data-reveal-stagger")) {
          initRevealStagger(el, isDesktop);
        } else {
          initReveal(el, isDesktop);
        }
      });

    // 3. Parallaxe — desktop uniquement (PLAN §5 + contexte mobile)
    if (isDesktop) {
      document.querySelectorAll("[data-parallax]").forEach(initParallax);
    }

    // 4. Traits dessinés
    document.querySelectorAll("[data-draw]").forEach(initDraw);

    // 5. Coups de marqueur — ceux imbriqués dans un [data-reveal-text]
    //    desktop sont branchés après le revert() du SplitText
    document.querySelectorAll(".mark-herbier").forEach((mark) => {
      if (isDesktop && mark.closest("[data-reveal-text]")) return;
      initMark(mark);
    });
  });
})();
