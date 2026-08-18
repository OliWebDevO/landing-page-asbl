/* ============================================================
   BABCAT & THE WILD — ANIMATIONS / ABOUT-STORY.JS
   ------------------------------------------------------------
   L'HERBIER ANIMÉ de la page Qui suis-je (PLAN §4.2) — la seule
   page où GSAP déploie l'arsenal. Base : analyse davidwhyte
   (docs/analyse-davidwhyte.md) + retours client 07/07 :
   « tout naît sous nos yeux » — plantes, papillons, lettres.

     [data-print]       Pattern A — le tirage « se pose », le
                        washi se colle, la légende naît lettre
                        à lettre — réversible. SANS dérive :
                        une photo scotchée ne glisse pas
                        (retour client 08/07)
     [data-ink]         la prose naît LETTRE PAR LETTRE :
                        chaque ligne garde sa bande de lecture
                        scrubbée, les lettres s'allument
                        gauche→droite au rythme du scroll
                        (desktop) ; déclenché lettre à lettre
                        en mobile (once)
     [data-write-title] titres — naissance des lettres,
                        déclenchée, réversible
     [data-write]       phrases courtes et encarts — idem ;
                        dans un [data-note], le texte naît
                        APRÈS la pose du papier
     [data-specimen]    la plante POUSSE path par path depuis
                        sa racine (SVG inliné au runtime) +
                        dérive parallaxe (desktop)
     [data-butterfly]   le papillon NAÎT du corps vers les
                        ailes (SVG inliné, paths triés par
                        distance à l'axe du corps), puis sa
                        COULEUR se gorge en tache d'encre
                        (clip circle depuis le côté corps —
                        même effet que le grand final) +
                        dérive parallaxe data-lag (desktop).
                        AUCUN flottement yoyo (supprimé —
                        retour client : « bancal, peu
                        organique »)
     [data-note]        encart papier — pose douce, puis son
                        texte [data-write] y naît
     Lenis              smooth scroll lerp 0.09 (desktop,
                        vendor auto-hébergé)

   NAISSANCE DES LETTRES (retour client) : SplitText en chars —
   chaque lettre se lève depuis sa base (opacity + y + scale).
   ⚠ Wanderlust/Robelia : le découpage par caractère casse les
   ligatures — assumé (rendu « tampon lettre à lettre » voulu).
   Fallback si SplitText échoue : balayage plume clipPath par
   élément (writeFrom/writeTo) — jamais de texte perdu.

   Le régime sobre ([data-reveal*], [data-parallax], [data-draw],
   .mark-herbier) reste géré par reveals.js — on n'y touche pas.

   RÉVERSIBILITÉ (davidwhyte §6.3) : toggleActions
   "play none none reverse" partout (sauf encre mobile, once).
   Les SplitText ne sont PAS revert() en cours de vie de la
   page (le reverse doit rejouer) — ils le sont au changement
   de contexte matchMedia (bascule desktop ↔ mobile).

   EASINGS : power1.out (naissance des lettres), power1.inOut
   (balayages fallback), none (scrubs), power1/2.out (poses,
   pousses, naissances), power2.in (chute de la goutte —
   gravité). Aucun bounce/elastic/back.

   FOUC : aucun état caché en CSS — tous les états de départ
   sont posés ici via fromTo (immediateRender) juste avant la
   création des triggers. Sans JS, la page est déjà complète ;
   en reduced-motion, core.js ne nous appelle pas.
   ============================================================ */

(() => {
  "use strict";

  if (!window.BabcatAnim || !window.gsap) return;

  /* ----------------------------------------------------------
     OUTILS
     ---------------------------------------------------------- */

  /** Lit l'inclinaison CSS d'un objet de l'herbier (custom
      property --rot, ex. "-2.5deg"). Les .print / .specimen /
      .paper-note portent leur rotation via
      transform: rotate(var(--rot)) : on anime `rotation` en
      valeurs EXPLICITES lues ici — laisser GSAP déduire le
      transform écraserait l'angle posé par le CSS. */
  function readRot(el, fallback) {
    const raw = getComputedStyle(el).getPropertyValue("--rot");
    const value = parseFloat(raw);
    return Number.isNaN(value) ? fallback : value;
  }

  /** Décor retiré par le CSS mobile (.specimen--desktop…) :
      inutile de créer tweens et triggers sur du display:none. */
  function isDisplayed(el) {
    return getComputedStyle(el).display !== "none";
  }

  /** Déclencheur réversible de l'herbier — l'inverse du régime
      sobre : remonter « efface » l'encre (davidwhyte §6.3). */
  function triggerReversible(el, start) {
    return {
      trigger: el,
      start: start,
      toggleActions: "play none none reverse",
    };
  }

  /** Dérive parallaxe permanente (desktop) — sur l'élément
      RACINE d'un décor : y ±40 px × data-lag, scrubbée. Props
      disjointes des naissances (qui animent les paths). */
  function initDrift(el) {
    const lag = parseFloat(el.dataset.lag) || 1;
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
     TEXTE — helpers de naissance des lettres + fallback plume.
     Objets de vars NEUFS à chaque appel (GSAP fusionne
     duration/ease/stagger dedans — un objet partagé serait
     pollué d'un tween à l'autre).
     ---------------------------------------------------------- */

  // Fallback « balayage plume » (clipPath) — utilisé quand
  // SplitText échoue : l'élément entier s'écrit d'un trait.
  // Marges verticales négatives : jambages/accents intacts.
  function writeFrom() {
    return {
      clipPath: "inset(-8% 100% -12% 0)",
      opacity: 0.4,
    };
  }

  function writeTo(extra) {
    return Object.assign(
      {
        clipPath: "inset(-8% -2% -12% 0)",
        opacity: 1,
      },
      extra
    );
  }

  // Naissance d'une lettre : elle se lève depuis sa base
  function charFrom() {
    return { opacity: 0, y: 8, scale: 0.94, transformOrigin: "50% 100%" };
  }

  function charTo(extra) {
    return Object.assign({ opacity: 1, y: 0, scale: 1 }, extra);
  }

  /* ----------------------------------------------------------
     SPLITTEXT — instances stockées au niveau du module et
     reverties quand matchMedia relance le module (bascule
     desktop ↔ mobile). Pas de revert() en cours de vie de la
     page : les triggers réversibles doivent pouvoir rejouer.
     ---------------------------------------------------------- */

  const writeSplits = [];

  function revertWriteSplits() {
    writeSplits.forEach((split) => {
      try {
        split.revert();
      } catch (error) {
        /* DOM déjà restitué — rien à faire */
      }
    });
    writeSplits.length = 0;
  }

  /** Découpe un élément en MOTS + LETTRES (les mots préservent
      les retours à la ligne — jamais de coupure en plein mot ;
      les lettres naissent une à une). Retourne les chars, ou
      null si SplitText échoue (l'appelant retombe sur le
      balayage plume — jamais de texte perdu). */
  function getChars(el) {
    let split = null;
    try {
      split = new SplitText(el, {
        type: "words,chars",
        wordsClass: "bw-write-word",
        charsClass: "bw-write-char",
      });
    } catch (error) {
      split = null;
    }
    if (!split || !split.chars || !split.chars.length) {
      if (split) split.revert();
      return null;
    }
    writeSplits.push(split);
    return split.chars;
  }

  /* ----------------------------------------------------------
     [data-print] — Pattern A : la photo scotchée « se pose ».
     Temporel (pas de scrub) : même si le scroll s'arrête, le
     tirage finit de se poser. Séquence : le tirage descend et
     se redresse (rot+3 → rot), le washi se colle (scaleX 0→1),
     puis la légende manuscrite NAÎT lettre à lettre (stagger
     0.03 — le tampon du carnet).
     PAS de dérive parallaxe (retour client 08/07) : la photo
     est SCOTCHÉE au carnet — la voir glisser contredisait la
     métaphore. La dérive data-lag reste réservée aux décors
     libres (plantes, papillons).
     ---------------------------------------------------------- */

  function initPrint(el) {
    const rot = readRot(el, -2);
    const washis = el.querySelectorAll("[data-washi]");
    const label = el.querySelector(".print__label");

    const tl = gsap.timeline({
      scrollTrigger: triggerReversible(el, "top 75%"),
    });

    tl.fromTo(
      el,
      { opacity: 0, scale: 1.06, y: 24, rotation: rot + 3 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: rot,
        duration: 1.4,
        ease: "power2.out",
      },
      0
    );

    // Le washi se colle APRÈS la pose. UNIQUEMENT scaleX : les
    // bandes portent leur propre rotation CSS (.washi--tl…) que
    // GSAP préserve en décomposant le transform.
    if (washis.length) {
      tl.fromTo(
        washis,
        { scaleX: 0, transformOrigin: "50% 50%" },
        {
          scaleX: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.12,
        },
        0.55
      );
    }

    // La légende naît lettre à lettre une fois la photo
    // scotchée (les chars ne touchent pas au transform du
    // parent : la rotation CSS --rot-label est intacte).
    if (label) {
      const chars = getChars(label);
      if (chars) {
        tl.fromTo(
          chars,
          charFrom(),
          charTo({ duration: 0.5, ease: "power1.out", stagger: 0.03 }),
          0.9
        );
      } else {
        tl.fromTo(
          label,
          writeFrom(),
          writeTo({ duration: 0.9, ease: "power1.inOut" }),
          0.9
        );
      }
    }

  }

  /* ----------------------------------------------------------
     [data-ink] — la prose naît LETTRE PAR LETTRE au rythme de
     lecture. Desktop : SplitText "lines,chars" — chaque LIGNE
     garde son ScrollTrigger scrubbé dans la bande de lecture
     (top 62% → top 50%, scrub 1.5) ; dedans, les lettres
     naissent une à une, gauche→droite, dans une timeline
     mappée sur le scrub (réversible : remonter rembobine la
     naissance). Mobile : lettres aussi, mais DÉCLENCHÉ,
     stagger 0.012, once.
     ---------------------------------------------------------- */

  /** Fallback ultime si SplitText échoue : fade doux du
      paragraphe entier — jamais de texte perdu. */
  function inkFallback(p) {
    gsap.fromTo(
      p,
      { opacity: 0.25, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: p, start: "top 80%", once: true },
      }
    );
  }

  function initInkDesktop(block) {
    block.querySelectorAll("p").forEach((p) => {
      let split = null;
      try {
        split = new SplitText(p, {
          type: "lines,chars",
          linesClass: "bw-ink-line",
          charsClass: "bw-ink-char",
        });
      } catch (error) {
        split = null;
      }

      if (!split || !split.lines.length) {
        if (split) split.revert();
        inkFallback(p);
        return;
      }

      writeSplits.push(split);

      // Une bande de lecture par ligne ; dans la bande, les
      // lettres naissent en cascade (ease none partout : c'est
      // le scroll qui donne le rythme — la main qui écrit).
      split.lines.forEach((line) => {
        const chars = line.querySelectorAll(".bw-ink-char");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: "top 62%",
            end: "top 50%",
            scrub: 1.5,
          },
        });

        if (chars.length) {
          tl.fromTo(
            chars,
            { opacity: 0, y: 6, scale: 0.92, transformOrigin: "50% 100%" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "none",
              stagger: { each: 0.02 },
            }
          );
        } else {
          // Ligne sans chars (cas limite) : balayage plume
          tl.fromTo(line, writeFrom(), writeTo({ ease: "none" }));
        }
      });
    });
  }

  function initInkMobile(block) {
    block.querySelectorAll("p").forEach((p) => {
      const chars = getChars(p);
      if (!chars) {
        inkFallback(p);
        return;
      }

      gsap.fromTo(
        chars,
        { opacity: 0, y: 6, scale: 0.92, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.012,
          scrollTrigger: { trigger: p, start: "top 80%", once: true },
        }
      );
    });
  }

  /* ----------------------------------------------------------
     [data-write-title] — chaque lettre du titre naît devant
     nous (stagger 0.018). Déclenché temporel réversible,
     desktop ET mobile. ⚠ Pas de revert() du SplitText après
     complétion : le trigger est réversible, la naissance doit
     pouvoir rejouer. Revert au changement de contexte.
     ---------------------------------------------------------- */

  function initWriteTitle(el) {
    const chars = getChars(el);
    if (!chars) {
      gsap.fromTo(
        el,
        writeFrom(),
        writeTo({
          duration: 0.9,
          ease: "power1.inOut",
          scrollTrigger: triggerReversible(el, "top 80%"),
        })
      );
      return;
    }

    gsap.fromTo(
      chars,
      charFrom(),
      charTo({
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.018,
        scrollTrigger: triggerReversible(el, "top 80%"),
      })
    );
  }

  /* ----------------------------------------------------------
     [data-write] — phrases courtes (boussoles) : naissance des
     lettres, stagger un peu plus lent (0.022). Les [data-write]
     logés dans un [data-note] sont pris en charge par initNote
     (le papier se pose PUIS le texte y naît) — sautés dans la
     boucle de dispatch.
     ---------------------------------------------------------- */

  function initWriteShort(el) {
    const chars = getChars(el);
    if (!chars) {
      gsap.fromTo(
        el,
        writeFrom(),
        writeTo({
          duration: 0.8,
          ease: "power1.inOut",
          scrollTrigger: triggerReversible(el, "top 80%"),
        })
      );
      return;
    }

    gsap.fromTo(
      chars,
      charFrom(),
      charTo({
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.022,
        scrollTrigger: triggerReversible(el, "top 80%"),
      })
    );
  }

  /* ----------------------------------------------------------
     DÉCORS INLINÉS — plantes ET papillons. Les SVG fournis
     sont des APLATS (paths remplis, pas de stroke) : pour les
     faire NAÎTRE morceau par morceau, on remplace les <img>
     par leur SVG inline (fetch + DOMParser, cache par URL,
     promesse mémoïsée — une seule passe, pas de re-fetch au
     changement de contexte matchMedia).
     Dimensionnement :
       - [data-specimen] : width/height="100%" (le CSS
         .specimen/.meadow-plant donne la largeur, height auto,
         le viewBox porte le ratio) ;
       - [data-butterfly] : attributs width/height RETIRÉS —
         .butterfly--giant est dimensionné par HAUTEUR (80vh,
         width auto) : le CSS garde la main, on ne l'écrase
         pas avec des attributs.
     Échec fetch/parse : l'<img> reste et retombe sur une
     entrée simple — jamais de décor invisible.
     ---------------------------------------------------------- */

  let inlinePromise = null;

  function inlineDecor() {
    if (inlinePromise) return inlinePromise;

    const cache = new Map(); // url → Promise<texte SVG>
    const imgs = Array.from(
      document.querySelectorAll(
        "img[data-specimen], img[data-butterfly], img[data-finale]"
      )
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

            // viewBox indispensable au dimensionnement fluide
            if (!clone.getAttribute("viewBox")) {
              const w = parseFloat(clone.getAttribute("width"));
              const h = parseFloat(clone.getAttribute("height"));
              if (w && h) {
                clone.setAttribute("viewBox", "0 0 " + w + " " + h);
              }
            }

            // L'inline hérite du rôle de l'<img> : classes
            // (taille + rotation --rot), hooks, décor inerte.
            clone.setAttribute("class", img.getAttribute("class") || "");
            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("focusable", "false");
            if (img.dataset.lag) {
              clone.setAttribute("data-lag", img.dataset.lag);
            }

            if (img.hasAttribute("data-specimen")) {
              clone.setAttribute("data-specimen", "");
              clone.setAttribute("width", "100%");
              clone.setAttribute("height", "100%");
            } else if (img.hasAttribute("data-finale")) {
              // Nuée plein écran : le SVG remplit .about-finale
              // (inset:0, 100%×100%). "slice" reproduit le
              // object-fit:cover prévu par le CSS — la nuée
              // couvre sans se déformer, centre gardé pour le CTA.
              clone.setAttribute("data-finale", "");
              clone.setAttribute("width", "100%");
              clone.setAttribute("height", "100%");
              clone.setAttribute("preserveAspectRatio", "xMidYMid slice");
              clone.removeAttribute("style");
              // Plein écran : sans masque, la nuée COMPLÈTE
              // flasherait entre l'inline et le scrub qui la fait
              // naître. On part invisible SI l'animation va
              // tourner (initFinaleFlock rallume path par path).
              // En reduced-motion le module n'inline puis n'anime
              // rien via ce chemin : on ne masque pas — la nuée
              // reste pleinement visible.
              if (!(rmQuery && rmQuery.matches)) {
                clone.style.opacity = "0";
              }
            } else {
              clone.setAttribute("data-butterfly", "");
              clone.removeAttribute("width");
              clone.removeAttribute("height");
              clone.removeAttribute("style");
            }

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
     [data-specimen] — LA PLANTE POUSSE path par path depuis sa
     racine : tri par point d'ancrage (bbox.y + bbox.height)
     décroissant — le plus bas d'abord, on monte vers le
     sommet. Timeline temporelle (~2.1 s desktop / ~1.4 s
     mobile), déclenchée, réversible : elle se « dé-pousse ».
     Vaut aussi pour la PRAIRIE (.meadow-plant, mêmes hooks).
     ---------------------------------------------------------- */

  function initSpecimenGrowth(svg, isDesktop) {
    const items = [];
    svg.querySelectorAll("path").forEach((path) => {
      let bbox = null;
      try {
        bbox = path.getBBox(); // exige un svg rendu
      } catch (error) {
        bbox = null;
      }
      if (!bbox || (!bbox.width && !bbox.height)) return;
      items.push({
        path: path,
        anchor: bbox.y + bbox.height, // le point le plus bas
        stem: bbox.height > 3 * bbox.width, // tige élancée
      });
    });

    if (!items.length) {
      gsap.fromTo(
        svg,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: triggerReversible(svg, "top 85%"),
        }
      );
      return;
    }

    // La racine d'abord : ancrage le plus bas en premier
    items.sort((a, b) => b.anchor - a.anchor);

    // Chevauchement adapté au nombre de paths (16–32)
    const total = isDesktop ? 2.1 : 1.4;
    const dur = 0.55;
    const step =
      items.length > 1
        ? gsap.utils.clamp(0.04, 0.4, (total - dur) / (items.length - 1))
        : 0;

    const tl = gsap.timeline({
      scrollTrigger: triggerReversible(svg, "top 85%"),
    });

    items.forEach((item, i) => {
      // Tige (bien plus haute que large) : scaleY seul — elle
      // s'étire vers le haut. Sinon scale uniforme depuis la
      // base du path (origin 50% 100% = bbox du path en SVG).
      const from = item.stem
        ? { opacity: 0, scaleY: 0.4, transformOrigin: "50% 100%" }
        : { opacity: 0, scale: 0.4, transformOrigin: "50% 100%" };
      const to = item.stem
        ? { opacity: 1, scaleY: 1, duration: dur, ease: "power2.out" }
        : { opacity: 1, scale: 1, duration: dur, ease: "power2.out" };
      tl.fromTo(item.path, from, to, i * step);
    });
  }

  /** Fallback des <img> non inlinés : la plante « pousse »
      d'un bloc depuis sa base. */
  function initSpecimenFallback(el) {
    const rot = readRot(el, 0);
    gsap.fromTo(
      el,
      {
        opacity: 0,
        scale: 0.85,
        rotation: rot - 6,
        transformOrigin: "50% 100%",
      },
      {
        opacity: 1,
        scale: 1,
        rotation: rot,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: triggerReversible(el, "top 85%"),
      }
    );
  }

  function initSpecimen(el, isDesktop) {
    if (el.tagName.toLowerCase() === "svg") {
      initSpecimenGrowth(el, isDesktop);
    } else {
      initSpecimenFallback(el);
    }
    if (isDesktop) initDrift(el);
  }

  /* ----------------------------------------------------------
     [data-butterfly] — LE PAPILLON NAÎT du corps vers les
     ailes (retour client : même logique de naissance que les
     plantes ; le flottement yoyo est SUPPRIMÉ).
     Axe du corps = axe vertical central du viewBox (cx) ;
     métrique d'un path = |centre bbox − cx| CROISSANT : le
     corps d'abord (distance ~0), puis les ailes se déploient
     vers l'extérieur. Fort chevauchement — le déploiement
     doit se LIRE : les papillons sont désormais LE sujet
     (14rem à 80vh).
     Le géant (.butterfly--giant) est le protagoniste :
     naissance ~2.8 s, déclenchée à "top 75%".
     Seul mouvement continu ensuite : la dérive data-lag.
     ---------------------------------------------------------- */

  /** Tache de couleur d'aile ? (fill clair — la gravure est
      quasi noire #040507). Vaut pour les papillons individuels
      ET la nuée du final. */
  function isWingColor(path) {
    const m = (getComputedStyle(path).fill || "").match(
      /(\d+)[,\s]+(\d+)[,\s]+(\d+)/
    );
    return !!m && Math.max(+m[1], +m[2], +m[3]) > 90;
  }

  function initButterflyBirth(svg) {
    const giant = svg.classList.contains("butterfly--giant");
    const start = giant ? "top 75%" : "top 82%";

    // Axe du corps = milieu du viewBox
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
      gsap.fromTo(
        svg,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: triggerReversible(svg, start),
        }
      );
      return;
    }

    // Le corps d'abord, puis les ailes vers l'extérieur
    items.sort((a, b) => a.dist - b.dist);

    // Plancher de pas très bas : certains papillons ont 150+
    // paths (Butterfly4) — la durée totale doit rester ~2.2 s
    // (géant : 2.8 s) quel que soit le découpage du dessin.
    const total = giant ? 2.8 : 2.2;
    const dur = 0.6;
    const step =
      items.length > 1
        ? gsap.utils.clamp(0.008, 0.35, (total - dur) / (items.length - 1))
        : 0;

    const tl = gsap.timeline({
      scrollTrigger: triggerReversible(svg, start),
    });

    items.forEach((item, i) => {
      tl.fromTo(
        item.path,
        { opacity: 0, scale: 0.35, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: dur, ease: "power2.out" },
        i * step
      );
    });

    // LA COULEUR SE GORGE comme une tache d'encre (retour client
    // 08/07 : « garde cette même animation de la couleur pour
    // tous les papillons de la page ») : cercle clip-path qui
    // part du bord du patch CÔTÉ CORPS et remplit l'aile comme
    // un liquide, une fois le trait bien engagé.
    patches.forEach((it, i) => {
      const ox = 50 + gsap.utils.clamp(
        -40, 40, ((cx - it.cx) / Math.max(1, it.w)) * 100);
      tl.fromTo(
        it.path,
        { clipPath: "circle(0% at " + ox + "% 50%)", opacity: 1 },
        {
          clipPath: "circle(150% at " + ox + "% 50%)",
          duration: giant ? 1.2 : 0.9,
          ease: "power2.inOut",
        },
        total * 0.35 + i * 0.15
      );
    });
  }

  /** Fallback des <img> non inlinés : entrée douce simple. */
  function initButterflyFallback(el) {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: triggerReversible(el, "top 85%"),
      }
    );
  }

  function initButterfly(el, isDesktop) {
    if (el.tagName.toLowerCase() === "svg") {
      initButterflyBirth(el);
    } else {
      initButterflyFallback(el);
    }
    if (isDesktop) initDrift(el);
  }

  /* ----------------------------------------------------------
     [data-finale] — LE GRAND FINAL (retour client 08/07) :
     DÉCLENCHÉ quand la section arrive au milieu de l'écran
     (pas scrubbé — le spectacle se joue pendant qu'on lit le
     CTA), réversible au remontage. Trois familles de paths,
     classées PAR COULEUR au runtime (résiste à une réédition
     du SVG dans Affinity, ex. retrait des étoiles) :

       · TRAITS DE VOL (#b7b29f dans le SVG, ~12 pièces,
         RECOLORÉS en terracotta au runtime — décor autorisé
         sur kraft) : ils SE TRACENT — la ligne GAUCHE monte
         (bas→haut), la ligne DROITE descend (haut→bas), en
         parallèle, balayage clip-path vertical pièce à pièce ;
       · PAPILLONS : le TRAIT DE GRAVURE (#040507) naît DU
         CORPS VERS LES AILES, comme les papillons de
         l'herbier ; puis la COULEUR des ailes (fills clairs,
         max(rgb)>90) SE GORGE comme une tache d'encre — cercle
         clip-path depuis le côté corps, façon liquide. Les
         papillons se touchent aile contre aile → séparés par
         DENSITÉ : grille de centroïdes 20 u., maxima locaux
         lissés = les corps (~17 détectés), chaque path
         rattaché au corps le plus proche, naissance triée par
         rayon depuis SON corps (invariant à la rotation) ;
       · ÉTOILES/ÉTINCELLES (blanc, ~23) : MASQUÉES (retour
         client 08/07 — elles seront supprimées du SVG dans
         Affinity ; d'ici là, opacity 0 permanent).

     Fallbacks : détection vide → vague simple opacity+scale ;
     SVG non inliné → fondu de l'<img>. Jamais de nuée absente.
     ---------------------------------------------------------- */

  function finaleClassify(svg) {
    const vb = svg.viewBox && svg.viewBox.baseVal;
    const W = vb && vb.width ? vb.width : 750;
    const H = vb && vb.height ? vb.height : 501;

    const parseRgb = (s) => {
      const m = (s || "").match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : null;
    };
    const near = (a, b, tol) =>
      a &&
      Math.abs(a[0] - b[0]) <= tol &&
      Math.abs(a[1] - b[1]) <= tol &&
      Math.abs(a[2] - b[2]) <= tol;

    const wings = [];
    const trails = [];
    const sparks = [];
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
        cy: bbox.y + bbox.height / 2,
        w: bbox.width,
        h: bbox.height,
      };
      // Marqueurs posés à la 1re passe : les traits sont ensuite
      // RECOLORÉS en terracotta — au re-run du contexte (resize),
      // la détection par couleur d'origine ne les reconnaîtrait
      // plus. L'attribut fait foi.
      if (path.hasAttribute("data-bw-trail")) {
        trails.push(it);
        return;
      }
      if (path.hasAttribute("data-bw-spark")) {
        sparks.push(it);
        return;
      }
      const rgb = parseRgb(getComputedStyle(path).fill);
      if (near(rgb, [183, 178, 159], 28)) {
        path.setAttribute("data-bw-trail", "");
        trails.push(it);
      } else if (rgb && rgb[0] > 235 && rgb[1] > 235 && rgb[2] > 235) {
        path.setAttribute("data-bw-spark", "");
        sparks.push(it);
      } else {
        // TACHE DE COULEUR vs trait de gravure (helper partagé
        // avec les papillons individuels) : tout fill clair est
        // une couleur d'aile (miel/orange/terracotta/sauge), qui
        // se remplira comme de l'encre au lieu de naître avec
        // le trait.
        it.patch = isWingColor(path);
        wings.push(it);
      }
    });
    return { W: W, H: H, wings: wings, trails: trails, sparks: sparks };
  }

  /** Les corps des papillons = maxima locaux de la densité des
      centroïdes (grille CELL, lissage 3×3, fusion des doublons). */
  function finaleFindBodies(items, W, H) {
    const CELL = 20;
    const MIN = 12;
    const gw = Math.ceil(W / CELL);
    const gh = Math.ceil(H / CELL);
    const grid = new Array(gw * gh).fill(0);
    items.forEach((it) => {
      const gx = Math.min(gw - 1, Math.max(0, Math.floor(it.cx / CELL)));
      const gy = Math.min(gh - 1, Math.max(0, Math.floor(it.cy / CELL)));
      grid[gy * gw + gx] += 1;
    });
    const sm = new Array(gw * gh).fill(0);
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        let s = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx;
            const yy = y + dy;
            if (xx >= 0 && xx < gw && yy >= 0 && yy < gh) {
              s += grid[yy * gw + xx];
            }
          }
        }
        sm[y * gw + x] = s;
      }
    }
    const raw = [];
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const v = sm[y * gw + x];
        if (v < MIN) continue;
        let isMax = true;
        for (let dy = -1; dy <= 1 && isMax; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const xx = x + dx;
            const yy = y + dy;
            if (xx >= 0 && xx < gw && yy >= 0 && yy < gh &&
                sm[yy * gw + xx] > v) {
              isMax = false;
              break;
            }
          }
        }
        if (isMax) raw.push({ x: (x + 0.5) * CELL, y: (y + 0.5) * CELL, s: v });
      }
    }
    raw.sort((a, b) => b.s - a.s);
    const bodies = [];
    raw.forEach((c) => {
      if (!bodies.some((m) => Math.hypot(m.x - c.x, m.y - c.y) < CELL * 1.8)) {
        bodies.push(c);
      }
    });
    return bodies;
  }

  function initFinaleScene(svg) {
    const parts = finaleClassify(svg);
    const cx = parts.W / 2;
    const cy = parts.H / 2;
    const bodies = finaleFindBodies(parts.wings, parts.W, parts.H);

    // Détection vide (SVG réédité de façon inattendue) : vague
    // simple centre→bords — jamais de nuée invisible.
    if (!bodies.length || !parts.wings.length) {
      initFinaleFallback(svg);
      svg.style.removeProperty("opacity");
      return;
    }

    // Chaque path d'aile rejoint le corps le plus proche
    const clusters = bodies.map((b) => ({
      x: b.x, y: b.y,
      dist: Math.hypot(b.x - cx, b.y - cy),
      items: [],
    }));
    parts.wings.forEach((it) => {
      let bi = 0;
      let bd = Infinity;
      clusters.forEach((c, i) => {
        const d = Math.hypot(c.x - it.cx, c.y - it.cy);
        if (d < bd) { bd = d; bi = i; }
      });
      it.r = bd; // rayon depuis SON corps : l'ordre corps→ailes
      clusters[bi].items.push(it);
    });
    clusters.forEach((c) => c.items.sort((a, b) => a.r - b.r));
    clusters.sort((a, b) => a.dist - b.dist); // éclosion centre→bords

    // Retours client 08/07 : les ÉTOILES ne s'affichent pas
    // (elles seront retirées du SVG dans Affinity — d'ici là,
    // masquées ici) ; les TRAITS DE VOL passent en terracotta
    // (autorisé en DÉCOR sur kraft — jamais en texte).
    const terracotta =
      (getComputedStyle(document.documentElement)
        .getPropertyValue("--terracotta") || "").trim() || "#C8622A";
    parts.trails.forEach((t) => {
      t.path.style.fill = terracotta;
    });
    if (parts.sparks.length) {
      gsap.set(parts.sparks.map((s) => s.path), { opacity: 0 });
    }

    const tl = gsap.timeline({
      scrollTrigger: triggerReversible(svg, "top 40%"),
    });

    // 1 — LES TRAITS SE TRACENT (retour client 08/07) : la ligne
    // de GAUCHE se dessine du BAS vers le HAUT, celle de DROITE
    // du HAUT vers le BAS — les deux chaînes en parallèle,
    // pièce par pièce dans le sens du dessin. Balayage clip-path
    // vertical (fill-box : les % se réfèrent à la bbox du path).
    const trailLeft = parts.trails
      .filter((t) => t.cx < cx)
      .sort((a, b) => (b.cy + b.h / 2) - (a.cy + a.h / 2)); // le plus BAS d'abord
    const trailRight = parts.trails
      .filter((t) => t.cx >= cx)
      .sort((a, b) => (a.cy - a.h / 2) - (b.cy - b.h / 2)); // le plus HAUT d'abord

    trailLeft.forEach((t, i) => {
      tl.fromTo(
        t.path,
        { clipPath: "inset(100% -5% -5% -5%)", opacity: 1 }, // monte
        {
          clipPath: "inset(-5% -5% -5% -5%)",
          duration: 0.5,
          ease: "power1.inOut",
        },
        i * 0.13
      );
    });
    trailRight.forEach((t, i) => {
      tl.fromTo(
        t.path,
        { clipPath: "inset(-5% -5% 100% -5%)", opacity: 1 }, // descend
        {
          clipPath: "inset(-5% -5% -5% -5%)",
          duration: 0.5,
          ease: "power1.inOut",
        },
        i * 0.13
      );
    });

    // 2 — CHAQUE PAPILLON NAÎT du corps vers les ailes (même
    // grammaire que [data-butterfly] : opacity + scale 0.35)…
    // pour le TRAIT DE GRAVURE seulement. La COULEUR des ailes
    // arrive APRÈS et SE GORGE comme une tache d'encre (retour
    // client 08/07) : cercle clip-path qui part du côté CORPS
    // du patch et remplit l'aile comme un liquide — même
    // vocabulaire que la scène d'encre plus haut dans la page.
    clusters.forEach((c, ci) => {
      const base = 0.25 + ci * 0.13;
      const dur = 0.35;
      const total = 0.9;
      const lines = c.items.filter((it) => !it.patch);
      const patches = c.items.filter((it) => it.patch);
      const step = lines.length > 1
        ? gsap.utils.clamp(0.004, 0.25, (total - dur) / (lines.length - 1))
        : 0;
      lines.forEach((it, i) => {
        tl.fromTo(
          it.path,
          { opacity: 0, scale: 0.35, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: dur, ease: "power2.out" },
          base + i * step
        );
      });
      patches.forEach((it, i) => {
        // Point de départ de l'encre : le bord du patch le plus
        // proche du corps (l'encre coule du corps vers l'aile).
        const ox = 50 + gsap.utils.clamp(
          -40, 40, ((c.x - it.cx) / Math.max(1, it.w)) * 100);
        const oy = 50 + gsap.utils.clamp(
          -40, 40, ((c.y - it.cy) / Math.max(1, it.h)) * 100);
        tl.fromTo(
          it.path,
          { clipPath: "circle(0% at " + ox + "% " + oy + "%)", opacity: 1 },
          {
            clipPath: "circle(150% at " + ox + "% " + oy + "%)",
            duration: 0.9,
            ease: "power2.inOut",
          },
          base + 0.35 + i * 0.15
        );
      });
    });

    // La timeline (immediateRender) a posé tous les états de
    // départ : on peut rallumer le conteneur masqué à l'inline
    // sans flash de nuée pleine. Ordre CRUCIAL — après la
    // construction, pas avant.
    svg.style.removeProperty("opacity");
  }

  /** Fallback des <img> non inlinés : fondu simple de la nuée. */
  function initFinaleFallback(el) {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: triggerReversible(el, "top 70%"),
      }
    );
  }

  function initFinale(el) {
    if (el.tagName.toLowerCase() === "svg") {
      initFinaleScene(el);
    } else {
      initFinaleFallback(el);
    }
  }

  /* (Scène d'encre [data-ink-scene] retirée — retour client
     08/07. L'effet « encre » survit dans le remplissage des
     couleurs des papillons.) */

  /* ----------------------------------------------------------
     [data-note] — l'encart papier se pose, puis son texte
     [data-write] y NAÎT lettre à lettre, 0.35 s après la fin
     de la pose. Même timeline, même trigger (les lettres sont
     à l'état 0 dès la création : pendant la pose, seul le
     papier apparaît).
     ---------------------------------------------------------- */

  function initNote(el) {
    const rot = readRot(el, -1.5);

    const tl = gsap.timeline({
      scrollTrigger: triggerReversible(el, "top 78%"),
    });

    tl.fromTo(
      el,
      { opacity: 0, y: 24, rotation: rot + 2 },
      {
        opacity: 1,
        y: 0,
        rotation: rot,
        duration: 1.2,
        ease: "power2.out",
      },
      0
    );

    const writeEl = el.querySelector("[data-write]");
    if (writeEl) {
      const chars = getChars(writeEl);
      if (chars) {
        tl.fromTo(
          chars,
          charFrom(),
          charTo({ duration: 0.5, ease: "power1.out", stagger: 0.022 }),
          ">0.35"
        );
      } else {
        tl.fromTo(
          writeEl,
          writeFrom(),
          writeTo({ duration: 0.8, ease: "power1.inOut" }),
          ">0.35"
        );
      }
    }
  }

  /* ----------------------------------------------------------
     LENIS — smooth scroll, desktop uniquement. lerp 0.09 : le
     scroll pèse sans voler le contrôle. Vendor auto-hébergé ;
     s'il manque, tout fonctionne sans lui (guard window.Lenis).
     Singleton : détruit à la bascule mobile, ou si
     reduced-motion s'active en cours de visite (core ne
     rappelle pas les modules — on écoute la media query).
     ---------------------------------------------------------- */

  let lenis = null;
  let lenisRaf = null;

  function startLenis() {
    if (lenis || !window.Lenis) return;

    lenis = new window.Lenis({ lerp: 0.09 });

    lenis.on("scroll", ScrollTrigger.update);
    lenisRaf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);
  }

  function stopLenis() {
    if (!lenis) return;
    gsap.ticker.remove(lenisRaf);
    gsap.ticker.lagSmoothing(500, 33); // défauts GSAP restaurés
    lenis.destroy();
    lenis = null;
    lenisRaf = null;
  }

  const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (rmQuery && rmQuery.addEventListener) {
    rmQuery.addEventListener("change", (event) => {
      if (event.matches) stopLenis();
    });
  }

  /* ----------------------------------------------------------
     MODULE — enregistré auprès de core.js, exécuté par
     gsap.matchMedia (jamais appelé en reduced-motion : textes
     et décors restent pleinement visibles). Tweens et triggers
     auto-nettoyés au changement de contexte.
     Créations en ordre DOM (haut → bas) ; les décors inlinés
     (plantes + papillons) sont traités après l'inline, dans
     le contexte via context.add().
     ---------------------------------------------------------- */

  let decorRun = 0;

  window.BabcatAnim.register((context) => {
    // Le module n'est chargé que sur Qui suis-je — ceinture
    // et bretelles au cas où il serait inclus ailleurs.
    if (!document.body.classList.contains("page-herbier")) return;

    const { isDesktop } = context.conditions;

    // Relance du contexte (resize) : on restitue le DOM des
    // SplitText de la passe précédente avant de redécouper.
    revertWriteSplits();

    // Lenis suit le contexte : desktop only
    if (isDesktop) startLenis();
    else stopLenis();

    // Hooks synchrones, en ordre du document (haut → bas)
    document
      .querySelectorAll(
        "[data-print], [data-ink], [data-write-title], [data-write], " +
          "[data-note]"
      )
      .forEach((el) => {
        if (!isDisplayed(el)) return;

        if (el.hasAttribute("data-print")) {
          initPrint(el);
        } else if (el.hasAttribute("data-ink")) {
          if (isDesktop) initInkDesktop(el);
          else initInkMobile(el);
        } else if (el.hasAttribute("data-write-title")) {
          initWriteTitle(el);
        } else if (el.hasAttribute("data-write")) {
          // Ceux des encarts naissent dans la timeline du
          // [data-note] parent — pas de trigger séparé ici.
          if (!el.closest("[data-note]")) initWriteShort(el);
        } else if (el.hasAttribute("data-note")) {
          initNote(el);
        }
      });

    // Décors inlinés (plantes + papillons + grand final) :
    // APRÈS l'inline (promesse en route depuis le chargement du
    // module). context.add() rattache les tweens au contexte
    // matchMedia même créés après coup ; le jeton decorRun évite
    // de construire dans un contexte déjà reverté.
    const myRun = (decorRun += 1);
    inlineDecor().then(() => {
      if (myRun !== decorRun) return;
      context.add(() => {
        document
          .querySelectorAll("[data-specimen], [data-butterfly], [data-finale]")
          .forEach((el) => {
            if (!isDisplayed(el)) return;
            try {
              if (el.hasAttribute("data-specimen")) {
                initSpecimen(el, isDesktop);
              } else if (el.hasAttribute("data-finale")) {
                initFinale(el);
              } else {
                initButterfly(el, isDesktop);
              }
            } catch (error) {
              // Un décor qui casse ne masque rien : les états
              // initiaux ne sont posés qu'à la création réussie.
              console.warn("Décor en échec :", error);
            }
          });

        // CRUCIAL : l'inline a changé la hauteur de la page APRÈS
        // la création de tous les triggers en amont (prose, notes,
        // et surtout le grand final tout en bas, qui accumule tout
        // le décalage). Sans ce refresh, les start/end sont figés
        // sur l'ancienne mise en page — le final ne s'anime jamais
        // (sa fenêtre tombe au-dessus de sa position réelle).
        ScrollTrigger.refresh();
      });
    });
  });

  // L'inline démarre dès le chargement du module (defer : le
  // DOM est là) — le réseau travaille pendant que core.js
  // attend l'injection des partials et les fontes.
  if (document.body && document.body.classList.contains("page-herbier")) {
    inlineDecor();
  }
})();
