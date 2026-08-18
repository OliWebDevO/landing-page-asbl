/* ============================================================
   BABCAT & THE WILD — ANIMATIONS / FLORA.JS
   ------------------------------------------------------------
   LA NATURE SUR TOUT LE SITE — toutes les pages SAUF l'herbier
   (qui-suis-je a son module dédié about-story.js, plus riche
   et réversible). Demande client 08/07/2026 : les mêmes
   croissances/naissances que l'herbier, mais jouées UNE SEULE
   FOIS (once — pas de rembobinage quand on remonte la page).

     [data-specimen]   la plante POUSSE path par path depuis sa
                       racine (SVG inliné au runtime : fetch +
                       DOMParser, les fournis sont des aplats)
     [data-butterfly]  le papillon NAÎT du corps vers les ailes,
                       puis sa COULEUR se gorge comme une tache
                       d'encre (clip circle depuis le côté corps)
     data-lag          dérive parallaxe continue (desktop) —
                       UNIQUEMENT si l'attribut est posé : les
                       plantes de la prairie pré-footer sont
                       ENRACINÉES dans le footer-terre, elles ne
                       dérivent pas.

   La PRAIRIE PRÉ-FOOTER (.meadow-strip, components.css) passe
   par [data-specimen] : croissance ancrée au sol → les plantes
   semblent émerger du footer anthracite et pousser vers le haut.

   FOUC : aucun état caché en CSS — les états 0 sont posés ici
   (fromTo immediateRender) à la création des triggers. Sans JS
   ou en reduced-motion : décor statique pleinement visible.
   ============================================================ */

(() => {
  "use strict";

  if (!window.gsap || !window.BabcatAnim) return;
  const gsap = window.gsap;

  /** Trigger UNE SEULE FOIS : joue à l'entrée, puis se tue
      (once) — jamais de reverse sur ces pages. */
  function triggerOnce(el, start) {
    return {
      trigger: el,
      start: start,
      once: true,
    };
  }

  function isDisplayed(el) {
    return el.offsetParent !== null || el.getClientRects().length > 0;
  }

  /** Tache de couleur d'aile ? (fill clair — la gravure des
      papillons est quasi noire #040507). */
  function isWingColor(path) {
    const m = (getComputedStyle(path).fill || "").match(
      /(\d+)[,\s]+(\d+)[,\s]+(\d+)/
    );
    return !!m && Math.max(+m[1], +m[2], +m[3]) > 90;
  }

  /* ----------------------------------------------------------
     INLINE — mêmes règles que l'herbier : cache par URL,
     promesse mémoïsée, échec ⇒ l'<img> reste (entrée simple).
     ---------------------------------------------------------- */

  let inlinePromise = null;

  function inlineDecor() {
    if (inlinePromise) return inlinePromise;

    const cache = new Map(); // url → Promise<texte SVG>
    const imgs = Array.from(
      document.querySelectorAll("img[data-specimen], img[data-butterfly]")
    );

    inlinePromise = Promise.all(
      imgs.map((img) => {
        const url = img.getAttribute("src");
        if (!cache.has(url)) {
          cache.set(
            url,
            fetch(url).then((response) => {
              if (!response.ok) throw new Error("HTTP " + response.status);
              return response.text();
            })
          );
        }

        return cache
          .get(url)
          .then((text) => {
            const doc = new DOMParser().parseFromString(
              text,
              "image/svg+xml"
            );
            const svg = doc.querySelector("svg");
            if (!svg || doc.querySelector("parsererror")) {
              throw new Error("SVG illisible : " + url);
            }

            const clone = document.importNode(svg, true);

            if (!clone.getAttribute("viewBox")) {
              const w = parseFloat(clone.getAttribute("width"));
              const h = parseFloat(clone.getAttribute("height"));
              if (w && h) {
                clone.setAttribute("viewBox", "0 0 " + w + " " + h);
              }
            }

            // L'inline hérite du rôle de l'<img> : classes
            // (position + taille + --rot), hooks, décor inerte.
            clone.setAttribute("class", img.getAttribute("class") || "");
            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("focusable", "false");
            if (img.dataset.lag) {
              clone.setAttribute("data-lag", img.dataset.lag);
            }

            if (img.hasAttribute("data-specimen")) {
              clone.setAttribute("data-specimen", "");
            } else {
              clone.setAttribute("data-butterfly", "");
            }
            // Le CSS garde la main sur les dimensions (classes
            // dec-* / meadow-slot-*) — pas d'attributs qui
            // écraseraient width/height/rotation.
            clone.removeAttribute("width");
            clone.removeAttribute("height");
            clone.removeAttribute("style");

            img.replaceWith(clone);
          })
          .catch((error) => {
            console.warn("Décor non inliné :", error);
          });
      })
    );

    return inlinePromise;
  }

  /* ----------------------------------------------------------
     [data-specimen] — LA PLANTE POUSSE depuis sa racine : tri
     par point d'ancrage (bbox.y + height) décroissant, tiges
     élancées en scaleY. Une seule fois.
     ---------------------------------------------------------- */

  function initSpecimenGrowth(svg, isDesktop) {
    const items = [];
    svg.querySelectorAll("path").forEach((path) => {
      let bbox = null;
      try {
        bbox = path.getBBox();
      } catch (error) {
        bbox = null;
      }
      if (!bbox || (!bbox.width && !bbox.height)) return;
      items.push({
        path: path,
        anchor: bbox.y + bbox.height,
        stem: bbox.height > 3 * bbox.width,
      });
    });

    if (!items.length) {
      initSpecimenFallback(svg);
      return;
    }

    items.sort((a, b) => b.anchor - a.anchor);

    const total = isDesktop ? 2.1 : 1.4;
    const dur = 0.55;
    const step =
      items.length > 1
        ? gsap.utils.clamp(0.04, 0.4, (total - dur) / (items.length - 1))
        : 0;

    const tl = gsap.timeline({
      scrollTrigger: triggerOnce(svg, "top 85%"),
    });

    items.forEach((item, i) => {
      const from = item.stem
        ? { opacity: 0, scaleY: 0.4, transformOrigin: "50% 100%" }
        : { opacity: 0, scale: 0.4, transformOrigin: "50% 100%" };
      const to = item.stem
        ? { opacity: 1, scaleY: 1, duration: dur, ease: "power2.out" }
        : { opacity: 1, scale: 1, duration: dur, ease: "power2.out" };
      tl.fromTo(item.path, from, to, i * step);
    });
  }

  /** Fallback <img> non inlinée : pousse d'un bloc. */
  function initSpecimenFallback(el) {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.85, transformOrigin: "50% 100%" },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: triggerOnce(el, "top 85%"),
      }
    );
  }

  /* ----------------------------------------------------------
     [data-butterfly] — NAISSANCE corps→ailes (tri par distance
     à l'axe vertical du viewBox), puis la COULEUR se gorge en
     tache d'encre. Une seule fois.
     ---------------------------------------------------------- */

  function initButterflyBirth(svg, isDesktop) {
    const vb = svg.viewBox && svg.viewBox.baseVal;
    const cx = vb && vb.width ? vb.x + vb.width / 2 : 0;

    const items = [];
    const patches = [];
    svg.querySelectorAll("path").forEach((path) => {
      let bbox = null;
      try {
        bbox = path.getBBox();
      } catch (error) {
        bbox = null;
      }
      if (!bbox || (!bbox.width && !bbox.height)) return;
      const it = {
        path: path,
        cx: bbox.x + bbox.width / 2,
        w: bbox.width,
        dist: Math.abs(bbox.x + bbox.width / 2 - cx),
      };
      if (isWingColor(path)) patches.push(it);
      else items.push(it);
    });

    if (!items.length && !patches.length) {
      initButterflyFallback(svg);
      return;
    }

    items.sort((a, b) => a.dist - b.dist);

    const total = isDesktop ? 2.2 : 1.5;
    const dur = 0.6;
    const step =
      items.length > 1
        ? gsap.utils.clamp(0.008, 0.35, (total - dur) / (items.length - 1))
        : 0;

    const tl = gsap.timeline({
      scrollTrigger: triggerOnce(svg, "top 82%"),
    });

    items.forEach((item, i) => {
      tl.fromTo(
        item.path,
        { opacity: 0, scale: 0.35, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: dur, ease: "power2.out" },
        i * step
      );
    });

    // L'encre coule du corps vers l'aile (même effet que
    // l'herbier — validé client 08/07).
    patches.forEach((it, i) => {
      const ox = 50 + gsap.utils.clamp(
        -40, 40, ((cx - it.cx) / Math.max(1, it.w)) * 100);
      tl.fromTo(
        it.path,
        { clipPath: "circle(0% at " + ox + "% 50%)", opacity: 1 },
        {
          clipPath: "circle(150% at " + ox + "% 50%)",
          duration: 0.9,
          ease: "power2.inOut",
        },
        total * 0.35 + i * 0.15
      );
    });
  }

  /** Fallback <img> non inlinée : entrée douce. */
  function initButterflyFallback(el) {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: triggerOnce(el, "top 85%"),
      }
    );
  }

  /* ----------------------------------------------------------
     Dérive parallaxe continue (desktop) — UNIQUEMENT pour les
     décors qui portent data-lag. Les plantes de la prairie
     sont enracinées : pas de data-lag, pas de dérive.
     ---------------------------------------------------------- */

  function initDrift(el) {
    const lag = parseFloat(el.dataset.lag);
    if (!lag) return;
    gsap.fromTo(
      el,
      { y: 40 * lag },
      {
        y: -40 * lag,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  /* ----------------------------------------------------------
     MODULE — jamais sur l'herbier (about-story.js y règne),
     jamais en reduced-motion (core.js ne nous appelle pas).
     ---------------------------------------------------------- */

  let decorRun = 0;

  window.BabcatAnim.register((context) => {
    if (document.body.classList.contains("page-herbier")) return;

    const { isDesktop } = context.conditions;

    const myRun = (decorRun += 1);
    inlineDecor().then(() => {
      if (myRun !== decorRun) return;
      context.add(() => {
        document
          .querySelectorAll("[data-specimen], [data-butterfly]")
          .forEach((el) => {
            if (!isDisplayed(el)) return;
            try {
              if (el.hasAttribute("data-specimen")) {
                initSpecimenGrowth(el, isDesktop);
              } else {
                initButterflyBirth(el, isDesktop);
              }
              if (isDesktop) initDrift(el);
            } catch (error) {
              // Un décor qui casse ne masque rien : les états
              // initiaux ne sont posés qu'à la création réussie.
              console.warn("Décor en échec :", error);
            }
          });

        // L'inline a changé la mise en page APRÈS la création
        // des triggers en amont (leçon de l'herbier) : on
        // recale toutes les positions.
        ScrollTrigger.refresh();
      });
    });
  });

  // Le réseau part tout de suite (defer : le DOM est là).
  if (
    document.body &&
    !document.body.classList.contains("page-herbier")
  ) {
    inlineDecor();
  }
})();
