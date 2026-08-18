/* ============================================================
   BABCAT & THE WILD — ANIMATIONS / TESTIMONIALS.JS
   ------------------------------------------------------------
   Carrousel de témoignages de l'accueil (section .home-testimonial).
   Slider vanilla — PAS de Swiper : un seul témoignage visible, deux
   flèches prev/next. Données : assets/data/testimonials.json.

   Comportement :
     · flèche « précédent » masquée au 1er témoignage, « suivant »
       masquée au dernier (hidden → retiré du flux + du tab order) ;
     · au clic, le TEXTE (citation + auteur) et la PHOTO (polaroïd)
       font un fade-out → swap → fade-in via GSAP ;
     · le washi tape se RECOLLE à la fin (chute + rotation), un tape
       DIFFÉRENT à chaque témoignage (champ `tape` du JSON).

   Robustesse :
     · sans JS  → le 1er témoignage inliné reste affiché, flèches
       masquées (attribut hidden par défaut sur prev, next visible
       mais inerte) ; la page est complète.
     · sans GSAP ou en prefers-reduced-motion → le swap se fait
       INSTANTANÉMENT (aucun fade), navigation pleinement utilisable.
     · fetch du JSON en échec → on ne câble rien, le témoignage
       inliné reste seul (flèches masquées).
   ============================================================ */

(() => {
  "use strict";

  const ROOT =
    (document.currentScript && document.currentScript.dataset.root) || ".";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /** GSAP dispo ET mouvement autorisé → on anime ; sinon swap direct. */
  const canAnimate = () => !!window.gsap && !prefersReduced;

  let started = false;

  async function init() {
    if (started) return; // babcat:ready ET load peuvent tous deux tirer
    started = true;

    const root = document.querySelector("[data-testimonials]");
    if (!root) return;

    // Références DOM (toutes présentes dans le HTML inliné)
    const els = {
      quote: root.querySelector("[data-testimonial-quote]"),
      prenom: root.querySelector("[data-testimonial-prenom]"),
      animal: root.querySelector("[data-testimonial-animal]"),
      textZone: root.querySelector("[data-testimonial-text]"),
      photo: root.querySelector("[data-testimonial-photo]"),
      caption: root.querySelector("[data-testimonial-caption]"),
      tape: root.querySelector("[data-testimonial-tape]"),
      prev: root.querySelector("[data-testimonial-prev]"),
      next: root.querySelector("[data-testimonial-next]"),
    };
    if (!els.quote || !els.prev || !els.next) return;

    // Charge les données ; en cas d'échec, on laisse le témoignage inliné.
    let items;
    try {
      const res = await fetch(`${ROOT}/assets/data/testimonials.json`, {
        cache: "no-cache",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      items = Array.isArray(data.temoignages) ? data.temoignages : [];
    } catch (error) {
      console.warn("Témoignages non chargés :", error);
      return;
    }
    if (items.length < 2) return; // un seul → pas de carrousel

    let index = 0; // le HTML inliné correspond au 1er témoignage
    let busy = false;

    /** Affiche/masque les flèches selon la position dans la liste. */
    function syncArrows() {
      els.prev.hidden = index === 0;
      els.next.hidden = index === items.length - 1;
    }

    /** Écrit les données du témoignage `i` dans le DOM (sans animation). */
    function paint(i) {
      const t = items[i];
      els.quote.textContent = t.citation;
      els.prenom.textContent = t.prenom;
      els.animal.textContent = `& ${t.animal}`;
      if (t.photo && els.photo) {
        els.photo.src = `${ROOT}/${t.photo.src}`.replace("./", "");
        els.photo.alt = t.photo.alt || "";
      }
      if (els.caption) {
        els.caption.textContent = `${t.prenom} & ${t.animal.split(",")[0]}`;
      }
      if (t.tape && els.tape) {
        // Espaces encodés pour les noms de fichiers « Tape 5.svg »
        els.tape.src = encodeURI(`${ROOT}/${t.tape}`).replace("./", "");
      }
    }

    /** Transition animée (ou instantanée) vers le témoignage `i`. */
    function goTo(i) {
      if (busy || i === index || i < 0 || i > items.length - 1) return;
      index = i;

      if (!canAnimate()) {
        paint(index);
        syncArrows();
        return;
      }

      const gsap = window.gsap;
      busy = true;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          busy = false;
        },
      });

      // 1) FADE OUT du texte et de la photo (léger décalage vertical)
      tl.to(
        [els.textZone, els.photo],
        { opacity: 0, y: 8, duration: 0.32 },
        0
      );
      // Le tape se « décolle » (remonte + pivote) pendant le fade out
      tl.to(
        els.tape,
        { opacity: 0, y: -14, rotate: -6, duration: 0.32 },
        0
      );

      // 2) SWAP du contenu au creux de l'animation
      tl.add(() => paint(index));

      // 3) FADE IN du nouveau texte et de la nouvelle photo
      tl.fromTo(
        [els.textZone, els.photo],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4 },
        ">"
      );
      // 4) Le tape se RECOLLE : chute depuis le haut + petit rebond de rotation
      tl.fromTo(
        els.tape,
        { opacity: 0, y: -22, rotate: 8 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
        "<0.05"
      );

      syncArrows();
    }

    els.prev.addEventListener("click", () => goTo(index - 1));
    els.next.addEventListener("click", () => goTo(index + 1));

    /** Léger balancement horizontal en boucle des flèches — indice visuel
        « cliquez-moi ». Chaque flèche oscille vers SON sens (prev ← / next →).
        On anime le BOUTON (jamais le span .arrow, qui porte le scaleX(-1) du
        « suivant ») : ainsi le flip CSS reste intact. Pause au survol pour
        laisser place au feedback de couleur. */
    function initArrowHint() {
      if (!canAnimate()) return;
      const gsap = window.gsap;

      [
        { btn: els.prev, dir: -1 },
        { btn: els.next, dir: 1 },
      ].forEach(({ btn, dir }) => {
        if (!btn) return;
        const tween = gsap.to(btn, {
          x: dir * 5,
          duration: 0.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        btn.addEventListener("mouseenter", () => {
          tween.pause();
          gsap.to(btn, { x: 0, duration: 0.2, overwrite: "auto" });
        });
        btn.addEventListener("mouseleave", () => tween.resume());
      });
    }

    initArrowHint();

    // Le HTML inliné = 1er témoignage : on ne le repeint pas, on aligne
    // juste ses attributs (photo/tape depuis le JSON, au cas où) et les flèches.
    paint(0);
    syncArrows();
  }

  // Démarre après l'injection des partials (comme les modules GSAP).
  if (window.__babcatReady) {
    init();
  } else {
    document.addEventListener("babcat:ready", init, { once: true });
    window.addEventListener("load", init, { once: true });
  }
})();
