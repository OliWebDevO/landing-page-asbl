/* ============================================================
   MON SITE ASBL — ANIMATIONS / REVEALS.JS
   ------------------------------------------------------------
   Entrées au scroll des blocs [data-reveal] : montée douce +
   fondu, jouée UNE SEULE FOIS (once) — pas de rembobinage
   quand on remonte la page.

   Les éléments voisins entrent en cascade (stagger) : un
   groupe de cartes se révèle comme une vague, pas d'un bloc.

   FOUC : aucun état caché en CSS. L'état 0 est posé ici par
   fromTo(immediateRender) à la création du trigger. Sans JS
   ou en reduced-motion, tout est visible d'emblée.

   Le hero ne dépend pas du scroll : il joue à l'ouverture,
   sinon la première chose que voit le visiteur est un vide.
   ============================================================ */

(() => {
  "use strict";

  if (!window.gsap || !window.AsblAnim) return;

  const gsap = window.gsap;

  /** Regroupe les éléments qui partagent le même parent :
      ils entreront en cascade, décalés les uns des autres. */
  function groupBySibling(elements) {
    const groups = new Map();
    elements.forEach((el) => {
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    return Array.from(groups.values());
  }

  window.AsblAnim.register((context) => {
    const { isDesktop } = context.conditions;

    context.add(() => {
      /* --- HERO : entrée immédiate, sans attendre le scroll --- */

      const heroItems = gsap.utils.toArray(".hero [data-reveal]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.12,
            delay: 0.15,
          }
        );
      }

      /* --- Le trait sous le mot-clé du titre se dessine --- */

      const underline = document.querySelector("[data-underline]");
      if (underline && underline.getTotalLength) {
        const length = underline.getTotalLength();
        gsap.fromTo(
          underline,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.inOut",
            delay: 0.75,
          }
        );
      }

      /* --- RESTE DE LA PAGE : entrée au scroll, une seule fois --- */

      const rest = gsap.utils
        .toArray("[data-reveal]")
        .filter((el) => !el.closest(".hero"));

      groupBySibling(rest).forEach((group) => {
        gsap.fromTo(
          group,
          { opacity: 0, y: isDesktop ? 32 : 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: group[0],
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    });
  });
})();
