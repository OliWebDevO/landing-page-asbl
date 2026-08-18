/* ============================================================
   MON SITE ASBL — ANIMATIONS / FLORA.JS
   ------------------------------------------------------------
   LES PLANTES POUSSENT — reprise de la mécanique éprouvée sur
   « Babcat and the Wild ».

   Les SVG fournis sont des aplats : on les INLINE au runtime
   (fetch + DOMParser) pour atteindre chaque <path>. La plante
   pousse alors path par path, triée par point d'ancrage (le
   bas de chaque forme) décroissant : les racines d'abord, les
   fleurs en dernier. Les tiges élancées montent en scaleY, les
   feuilles s'ouvrent en scale.

   Jouée UNE SEULE FOIS (once) : pas de rembobinage quand on
   remonte la page — une plante ne se rétracte pas.

   La PRAIRIE PRÉ-FOOTER (.meadow) est enracinée dans le footer
   brun : les plantes semblent émerger de la terre et pousser
   vers le haut, juste avant le pied de page.

   FOUC : aucun état caché en CSS — les états 0 sont posés ici
   à la création des triggers. Sans JS ou en reduced-motion,
   le décor est statique et pleinement visible.
   ============================================================ */

(() => {
  "use strict";

  if (!window.gsap || !window.AsblAnim) return;

  const gsap = window.gsap;

  /** Trigger « une seule fois » : joue à l'entrée, puis se tue. */
  function triggerOnce(el, start) {
    return { trigger: el, start: start, once: true };
  }

  function isDisplayed(el) {
    return el.offsetParent !== null || el.getClientRects().length > 0;
  }

  /* ----------------------------------------------------------
     INLINE — cache par URL + promesse mémoïsée : une plante
     réutilisée n'est téléchargée qu'une fois. En cas d'échec,
     l'<img> reste en place (décor statique, rien de cassé).
     ---------------------------------------------------------- */

  let inlinePromise = null;

  function inlineDecor() {
    if (inlinePromise) return inlinePromise;

    const cache = new Map(); // url → Promise<texte SVG>
    const imgs = Array.from(document.querySelectorAll("img[data-specimen]"));

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
            const doc = new DOMParser().parseFromString(text, "image/svg+xml");
            const svg = doc.querySelector("svg");
            if (!svg || doc.querySelector("parsererror")) {
              throw new Error("SVG illisible : " + url);
            }

            const clone = document.importNode(svg, true);

            if (!clone.getAttribute("viewBox")) {
              const w = parseFloat(clone.getAttribute("width"));
              const h = parseFloat(clone.getAttribute("height"));
              if (w && h) clone.setAttribute("viewBox", "0 0 " + w + " " + h);
            }

            // L'inline hérite du rôle de l'<img> : classes
            // (position, taille, --rot) et statut décoratif.
            clone.setAttribute("class", img.getAttribute("class") || "");
            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("focusable", "false");
            clone.setAttribute("data-specimen", "");

            // Le CSS garde la main sur les dimensions : on retire
            // les attributs qui écraseraient width/height/rotation.
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
     LA PLANTE POUSSE — tri par ancrage (bbox.y + height)
     décroissant : ce qui est le plus bas sort de terre d'abord.
     ---------------------------------------------------------- */

  function initGrowth(svg, isDesktop) {
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
        // Forme nettement plus haute que large ⇒ tige : elle
        // s'élance verticalement plutôt que de gonfler.
        stem: bbox.height > 3 * bbox.width,
      });
    });

    if (!items.length) {
      initFallback(svg);
      return;
    }

    items.sort((a, b) => b.anchor - a.anchor);

    const total = isDesktop ? 2.1 : 1.4;
    const dur = 0.55;
    const step =
      items.length > 1
        ? gsap.utils.clamp(0.02, 0.4, (total - dur) / (items.length - 1))
        : 0;

    const tl = gsap.timeline({ scrollTrigger: triggerOnce(svg, "top 92%") });

    items.forEach((item, i) => {
      const from = item.stem
        ? { opacity: 0, scaleY: 0.35, transformOrigin: "50% 100%" }
        : { opacity: 0, scale: 0.4, transformOrigin: "50% 100%" };
      const to = item.stem
        ? { opacity: 1, scaleY: 1, duration: dur, ease: "power2.out" }
        : { opacity: 1, scale: 1, duration: dur, ease: "power2.out" };

      tl.fromTo(item.path, from, to, i * step);
    });
  }

  /** Fallback <img> non inlinée : pousse d'un bloc. */
  function initFallback(el) {
    gsap.fromTo(
      el,
      { opacity: 0, scaleY: 0.7, transformOrigin: "50% 100%" },
      {
        opacity: 1,
        scaleY: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: triggerOnce(el, "top 92%"),
      }
    );
  }

  /* ----------------------------------------------------------
     MODULE
     ---------------------------------------------------------- */

  let decorRun = 0;

  window.AsblAnim.register((context) => {
    const { isDesktop } = context.conditions;

    // Si le breakpoint change pendant le fetch, la passe en
    // cours est périmée : on ne recrée pas des triggers doublons.
    const myRun = (decorRun += 1);

    inlineDecor().then(() => {
      if (myRun !== decorRun) return;

      context.add(() => {
        document.querySelectorAll("[data-specimen]").forEach((el) => {
          if (!isDisplayed(el)) return;
          try {
            initGrowth(el, isDesktop);
          } catch (error) {
            // Un décor qui casse ne masque rien : les états
            // initiaux ne sont posés qu'à la création réussie.
            console.warn("Décor en échec :", error);
          }
        });

        // L'inline a changé la mise en page APRÈS la création des
        // triggers en amont : on recale toutes les positions.
        window.AsblAnim.refresh();
      });
    });
  });

  // Le réseau part tout de suite (defer : le DOM est là) —
  // sauf en reduced-motion, où le décor reste tel quel.
  if (!window.AsblAnim.reduced) {
    inlineDecor();
  }
})();
