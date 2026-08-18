/* ============================================================
   BABCAT & THE WILD — ANIMATIONS / CORE.JS
   ------------------------------------------------------------
   Point d'entrée UNIQUE du système GSAP (PLAN §5) :
     - registerPlugin (ScrollTrigger, SplitText — auto-hébergés,
       assets/js/vendor/, AUCUN CDN au runtime) ;
     - défauts du projet : ease power2.out, durées ≤ 0.8 s ;
     - gsap.matchMedia() à 3 contextes :
         · desktop  ≥ 1024px  — régime complet (sobre)
         · mobile   < 1024px  — reveals simplifiés
         · reduced-motion     — AUCUN mouvement, rien n'est créé
     - démarre APRÈS l'injection des partials (événement
       « babcat:ready » émis par main.js) ET après le chargement
       des fontes (SplitText mesure les lignes — les fontes
       doivent être posées avant de découper).

   RÈGLE FOUC / PROGRESSIVE ENHANCEMENT (non négociable) :
   aucun état initial caché en CSS. Les modules posent leurs
   états de départ en JS (gsap.set) juste avant d'animer —
   sans JS, ou si GSAP échoue, la page est parfaitement visible.

   Les pages enregistrent leurs animations via
   BabcatAnim.register(fn) — fn reçoit le contexte matchMedia
   (conditions isDesktop / isMobile). Cleanup automatique par
   gsap.matchMedia (revert des tweens, ScrollTriggers et
   gsap.set au changement de contexte).
   ============================================================ */

(() => {
  "use strict";

  // Progressive enhancement : si GSAP ou un plugin manque,
  // on ne crée rien — la page reste complète et visible.
  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
    console.warn("GSAP absent ou incomplet : animations désactivées.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Défauts du projet (PLAN §5) — durées ≤ 0.8 s hors cas dédiés
  gsap.defaults({ ease: "power2.out", duration: 0.7 });

  const modules = [];
  let started = false;

  function runModules() {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023.98px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        // REDUCED-MOTION : aucun mouvement, aucun ScrollTrigger.
        // Rien n'ayant été caché en CSS, il n'y a rien à montrer :
        // on ne crée simplement aucune animation.
        if (context.conditions.reduceMotion) return;

        modules.forEach((fn) => {
          try {
            fn(context);
          } catch (error) {
            // Une animation qui casse ne doit JAMAIS casser la page.
            console.warn("Module d'animation en échec :", error);
          }
        });
      }
    );

    window.BabcatAnim.mm = mm;
  }

  function start() {
    if (started) return;
    started = true;

    // SplitText découpe en lignes d'après la métrique réelle des
    // fontes : on attend document.fonts.ready (les 2 fontes
    // critiques sont préchargées — attente quasi nulle).
    const fontsReady =
      document.fonts && document.fonts.ready
        ? document.fonts.ready
        : Promise.resolve();

    fontsReady.then(runModules, runModules);
  }

  window.BabcatAnim = {
    /** Enregistre un module d'animation (appelé avant start). */
    register(fn) {
      modules.push(fn);
    },
    mm: null,
  };

  // Démarrage après l'injection des partials par main.js
  if (window.__babcatReady) {
    start();
  } else {
    document.addEventListener("babcat:ready", start, { once: true });
    // Filet de sécurité : si main.js n'émet jamais l'événement
    // (script bloqué, erreur amont), on démarre au load.
    window.addEventListener("load", start, { once: true });
  }
})();
