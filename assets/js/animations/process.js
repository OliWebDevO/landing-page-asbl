/* ============================================================
   MON SITE ASBL — ANIMATIONS / PROCESS.JS
   ------------------------------------------------------------
   LA TIMELINE « BOULES + FIL » — la mécanique du portfolio
   (olivervdb.com, StepsSection) transposée en vanilla.

   Le principe : le fil dégradé est POSÉ en entier dans le DOM,
   et un masque couleur-fond le recouvre. Au scroll, le masque
   se rétracte vers le bas (scaleY → 0, origine en bas) : le
   fil semble se DESSINER de haut en bas, du premier au dernier
   rendez-vous. Un scrub le lie à la position exacte du scroll,
   donc remonter le rembobine.

   Chaque « boule » (.step__bullet) s'allume quand le fil
   l'atteint : la classe .is-active passe la bille en orange et
   un halo pulse une fois. Les cartes arrivent latéralement,
   alternées gauche/droite autour du fil sur desktop.

   Le fil ne court PAS sur toute la hauteur du bloc : il démarre
   au centre de la première boule et s'arrête au centre de la
   dernière — sinon il dépasse en l'air au-dessus et en dessous.
   Ce calage est refait à chaque resize (invalidateOnRefresh).
   ============================================================ */

(() => {
  "use strict";

  if (!window.gsap || !window.AsblAnim) return;

  const gsap = window.gsap;

  /** Centre vertical d'une boule, relatif au conteneur du fil.
      Sur desktop la boule est centrée sur la carte (translate
      -50 %), sur mobile elle est calée en haut : on mesure
      plutôt que de supposer. */
  function bulletCenter(bullet, track) {
    const b = bullet.getBoundingClientRect();
    const t = track.getBoundingClientRect();
    return b.top - t.top + b.height / 2;
  }

  window.AsblAnim.register((context) => {
    const track = document.getElementById("process-track");
    const line = track && track.querySelector(".process__line");
    const mask = document.getElementById("process-mask");
    const steps = gsap.utils.toArray("[data-step]");

    if (!track || !line || !mask || !steps.length) return;

    const bullets = steps
      .map((step) => step.querySelector(".step__bullet"))
      .filter(Boolean);

    if (!bullets.length) return;

    context.add(() => {
      /* --------------------------------------------------------
         1. CALAGE DU FIL — du centre de la 1re boule au centre
            de la dernière. Refait à chaque refresh/resize.
         -------------------------------------------------------- */

      const placeLine = () => {
        const first = bulletCenter(bullets[0], track);
        const last = bulletCenter(bullets[bullets.length - 1], track);
        gsap.set(line, { top: first, height: Math.max(0, last - first) });
      };

      placeLine();
      window.ScrollTrigger.addEventListener("refreshInit", placeLine);

      /* --------------------------------------------------------
         2. LE FIL SE DESSINE — le masque se rétracte vers le bas,
            lié au scroll (scrub) : le trait suit le doigt.
         -------------------------------------------------------- */

      gsap.fromTo(
        mask,
        { scaleY: 1 },
        {
          scaleY: 0,
          transformOrigin: "bottom center",
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      /* --------------------------------------------------------
         3. LES BOULES S'ALLUMENT quand le fil les atteint.
            Le trigger est la boule elle-même : elle bascule en
            orange au passage, et se rembobine si on remonte —
            cohérent avec le fil qui, lui aussi, se rembobine.
         -------------------------------------------------------- */

      // Déclaré AVANT la création des triggers : ScrollTrigger
      // évalue ses positions dès `create()`, et peut donc
      // appeler activate() sur-le-champ si la boule est déjà à
      // l'écran — `pulsing` doit exister à cet instant.
      let pulsing = null;

      steps.forEach((step) => {
        const bullet = step.querySelector(".step__bullet");
        if (!bullet) return;

        window.ScrollTrigger.create({
          trigger: bullet,
          start: "top 62%",
          end: "bottom 20%",
          onEnter: () => activate(step, bullet),
          onEnterBack: () => activate(step, bullet),
          onLeaveBack: () => step.classList.remove("is-active"),
        });
      });

      function activate(step, bullet) {
        if (step.classList.contains("is-active")) return;
        step.classList.add("is-active");

        // Un halo se propage une fois depuis la boule : le
        // pseudo-élément ::after est animé via une variable, on
        // passe donc par un tween sur l'élément lui-même.
        pulsing = gsap.fromTo(
          bullet,
          { scale: 0.86 },
          { scale: 1, duration: 0.5, ease: "back.out(2.4)", overwrite: true }
        );
      }

      /* --------------------------------------------------------
         4. LES CARTES ARRIVENT — depuis l'extérieur vers le fil
            sur desktop (alternance gauche/droite), depuis la
            gauche sur mobile où tout est aligné.
         -------------------------------------------------------- */

      const { isDesktop } = context.conditions;

      steps.forEach((step, index) => {
        const card = step.querySelector(".step__card");
        const body = step.querySelector(".step__body");
        if (!card) return;

        // Index pair = carte à gauche (elle entre par la gauche),
        // impair = carte à droite (elle entre par la droite).
        const fromLeft = !isDesktop || index % 2 === 0;
        const shift = isDesktop ? 60 : 32;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            once: true,
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, x: fromLeft ? -shift : shift },
          { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }
        );

        if (body) {
          tl.fromTo(
            body,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            0.15
          );
        }
      });

      /* --------------------------------------------------------
         5. NETTOYAGE — le listener refreshInit n'est pas géré
            par le contexte GSAP : on le retire à la main.
         -------------------------------------------------------- */

      return () => {
        window.ScrollTrigger.removeEventListener("refreshInit", placeLine);
        if (pulsing) pulsing.kill();
        steps.forEach((step) => step.classList.remove("is-active"));
        gsap.set(line, { clearProps: "top,height" });
      };
    });
  });
})();
