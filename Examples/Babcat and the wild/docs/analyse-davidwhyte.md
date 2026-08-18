# Analyse mécanique — davidwhyte.com/experience/

> Rapport de l'agent site-analyzer (Playwright, viewport 1440×900 : captures à 13 positions de scroll + décorticage du bundle `app.js` du thème). Sert de base à la spec d'animation de la page « Qui suis-je » (voir PLAN.md §4.2 et §5).

## 0. Architecture générale (le « truc » à comprendre d'abord)

La page est un **document vertical classique d'environ 5 900 px (≈ 6,5 viewports)** — pas de scroll hijacké, pas de scroll horizontal. Trois couches superposées :

1. **Un canvas WebGL2 fixe plein écran** (`.xp-canvas`, Three.js custom) qui rend un monde aquarelle traversé par une caméra pilotée par la position de scroll.
2. **Le contenu DOM normal** (titres, offres, FAQ) qui défile par-dessus le canvas, animé avec GSAP + ScrollTrigger + SplitText.
3. **Lenis (smooth scroll)** dont les multiplicateurs sont écrasés à l'entrée de l'expérience : `wheelMultiplier: 0.1` (0.15 sur Firefox), `touchMultiplier: 0.5`, `syncTouch: true`. **C'est le secret du rythme contemplatif : un coup de molette ne déplace presque rien.** Les 5 900 px se parcourent comme 60 000 px.

Point capital : **aucun pin, aucun snap dans l'expérience elle-même**. La lenteur et le lissage Lenis suffisent. (Deux pins existent ailleurs : header en `pin: true, scrub: 0` et une colonne sticky d'offres en `pin` avec `pinSpacing: false` — de la mécanique utilitaire, pas poétique.)

Un **loader-portail** (« Access David's library… ») précharge les assets, débloque l'audio (obligation navigateur) et met l'utilisateur en condition avant de céder au scroll.

## 1. Comment les textes apparaissent

Quatre mécaniques distinctes cohabitent :

### a. Les poèmes « peints » (dans le canvas)
Les poèmes existent dans le DOM (`.xp-text`, en `visibility: hidden` — sizing + accessibilité) mais sont **rendus en WebGL via un générateur de SDF** : le texte devient une texture distance-field que le shader révèle avec un seuil bruité → l'encre « fleurit » sur le papier, lettres aux bords irréguliers, sur une tache d'encre noire fixée à gauche de l'écran. Le reveal est **déclenché** (pas scrubbé) quand la caméra atteint la zone, et **réversible** si on remonte.

### b. Titres DOM au scroll — ligne par ligne
```js
new SplitText(el, { type: "lines", linesClass: "line" });
lines.forEach((line, i) => line.style.transitionDelay = `${0.08 * i}s`);
// puis un ScrollTrigger start: "top 92%" (héros : "top 100%") ajoute la classe
// → transitions CSS (translateY + opacity sous overflow clip), stagger 80 ms/ligne
```
Reveal **one-shot déclenché**, pas scrubbé. Variante « pretitle » : `type: "chars"`, délai **15 ms/caractère**.

### c. Paragraphes qui « se lisent » pendant le scroll — LE pattern clé
```js
split = new SplitText(description, { type: "lines" });
split.lines.forEach(line => {
  gsap.timeline({
    scrollTrigger: {
      trigger: line,
      start: "top 55%", end: "top 65%",   // bande de lecture étroite
      scrub: 2,                            // lissage fort
      toggleActions: "play none none reverse"
    }
  }).to(line, { opacity: 1 });             // depuis ~0.15–0.3
});
```
Chaque **ligne a son propre ScrollTrigger** sur une bande de ~10 % de viewport au milieu de l'écran : le texte s'allume ligne après ligne exactement au rythme de lecture, et s'éteint si on remonte. C'est l'effet « le texte s'écrit pendant que je scrolle ».

### d. Loader — mot par mot
`SplitText type: "words"`, `opacity 0→1` (1,8 s) + `y: 10→0, ease: "expo.out"`, **stagger 0.165 s** — lent, respiré, pas nerveux.

## 2. Comment les visuels entrent en scène

- **Scènes aquarelle (WebGL)** : chaque élément (arbre, vache, mouton, viaduc…) a un `show()` déclenché par la proximité caméra :
  - `uScale: →1, duration: 3, ease: "power1.out"` (la tache grandit doucement)
  - `visibleProgress` (seuil SDF = morsure de l'encre) en **linear**, décalé de 0,42 s, le tout en `timeScale(2)` → ~1,5–2 s effectifs.
  - `hide()` inverse avec `uScale: →1.4, ease: "power1.inOut"` : l'encre se dissout en s'étalant. **Le reveal est temporel, pas scrubbé : même si tu t'arrêtes, la peinture finit de fleurir.**
- **Parallaxe DOM** (attributs `data-parallax` / `data-lag`) : `scrub: 0.9`, `start: "top 80%"`, `end: "bottom top"`, amplitude = hauteur d'image/16 × lag (≈ 30–80 px). Subtil.
- **Dérive de fond** : grandes textures en `scale: 1.1` puis `fromTo(yPercent: 4→-4, xPercent: -4→4, ease: "none", scrub: 3)` — une dérive diagonale quasi imperceptible qui rend tout vivant.
- **« Open the landscape »** (tableau plein écran) : la transition utilise **deux vidéos MP4 pré-rendues par scène** (`base/1-6.mp4` + `over/1-6.mp4`, versions mobile/desktop) comme textures/masques de bavure d'aquarelle — l'effet le plus « waouh » est une simple vidéo de masque pré-calculée, pas du calcul temps réel.
- **Micro-interaction CTA** : ligne qui se dessine via shader `step(uProgress, uv.x)`, 0,8 s `expo.inOut`, + son au hover.

## 3. Structure du scroll

- Page verticale native ~5 900 px, canvas fixe derrière, DOM devant.
- **Pas de pin, pas de snap, pas de scrub global** : caméra = f(scrollY) lissée par Lenis ; reveals = triggers ponctuels temporels réversibles.
- La molette est **amortie ×0,1** pendant l'expérience (valeurs restaurées en sortie).
- Un bouton « Scroll to explore » (opacity → 0 dès le premier scroll) et « Restart the experience » à la fin.

## 4. Le rythme

Config des scènes extraite du bundle — positions `startAt` (distance caméra) :

| Scène | Titre | Cluster startAt | Trou avant |
|---|---|---|---|
| 1 | Dales with Cows | 0 – 2 (+ vache isolée à 7) | — |
| 2 | Nidderdale Farm | 7,5 – 9,25 | ~5 unités de brouillard |
| 3 | North York Moors | 14 – 15,5 | ~5 |
| 4 | Dales near Aysgarth | 20 – 23,5 | ~4,5 |
| 5 | Dales with Sheep | 31,5 – 34 | **~8 (grande respiration)** |
| 6 | Ribblehead Viaduct (final) | 39 – 40,5 | ~5 |

→ **6 scènes**, chacune = un bouquet de 3-6 éléments étagés en profondeur (fog exponentiel entre les plans), **séparées par des zones de brouillard quasi vides** représentant 30-40 % du parcours. Densité : ~1 idée forte par « moment », jamais deux animations en compétition. 3 poèmes seulement sur tout le parcours. Transitions entre scènes = lavis d'encre/brouillard qui envahit l'écran.

## 5. Techniques vérifiées (DOM + scripts)

| Technique | Vérifié | Détail |
|---|---|---|
| GSAP 3 + ScrollTrigger + SplitText + ScrollSmoother | ✅ bundlé dans `app.js` | configs citées ci-dessus |
| Lenis | ✅ (50 occurrences) | multiplicateurs dynamiques |
| Three.js custom (WebGL2) | ✅ | monde aquarelle, composer, fog shaders |
| SDF (texte + taches) | ✅ 389 occurrences | le cœur de l'effet encre |
| Vidéos-masques pré-rendues | ✅ `xp/videos/{desktop,mobile}/{base,over}/1-6.mp4` | tableaux plein écran |
| AudioManager (sons hover + ambiance) | ✅ | |
| Lottie / canvas 2D / SVG animé | ❌ absents | |
| WordPress + WooCommerce en dessous | ✅ | l'expérience est un thème custom |

## 6. Pourquoi c'est poétique et pas gadget

1. **Le scroll est freiné, jamais volé** : tu gardes le contrôle, mais tout pèse. Aucun pin qui te séquestre.
2. **Les reveals sont temporels et organiques** : l'encre continue de fleurir 1,5–3 s après ton geste — le site « respire tout seul ». Un scrub pur aurait un rendu mécanique.
3. **Tout est réversible** : remonter dissout la peinture. Le monde existe, tu ne déclenches pas des slides.
4. **Le vide est majoritaire** : brouillard, papier nu, une seule idée à l'écran.
5. **Cohérence totale de la métaphore** (aquarelle : texte, images, curseur, transitions, CTA, son) — aucun easing « tech » : `power1/2.out`, `expo.out`, linear pour l'encre. Pas de bounce, pas d'elastic.
6. **Amplitudes minuscules** : parallaxe ±4 %, y:10px sur les mots. La subtilité vient des petits nombres.

---

# Transposition — page « Qui suis-je » carnet de voyage / herbier

Pas besoin de WebGL. Les équivalents :

### Pattern A — Photo scotchée qui « se pose » (équivalent du show() aquarelle)
Déclenché, temporel, réversible — pas de scrub.
```js
// structure : .polaroid > .polaroid__tape + .polaroid__img (mask-image: déchiré/aquarelle PNG)
gsap.timeline({
  scrollTrigger: { trigger: ".polaroid", start: "top 75%",
                   toggleActions: "play none none reverse" }
})
.fromTo(".polaroid", { opacity: 0, scale: 1.06, rotation: rotBase + 3, y: 24 },
        { opacity: 1, scale: 1, rotation: rotBase, y: 0,
          duration: 1.4, ease: "power2.out" }, 0)
.fromTo(".polaroid__tape", { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power1.out" }, 0.55); // le scotch se colle après
```
`rotBase` = angle aléatoire ±2–4° par photo. Durées longues (1–1,5 s), jamais < 0,6 s.

### Pattern B — Texte qui « s'écrit » au scroll (copie directe du pattern 1.c)
```js
const split = new SplitText(".journal__text", { type: "lines" });
split.lines.forEach(line => {
  gsap.fromTo(line, { opacity: 0.15 }, {
    opacity: 1,
    scrollTrigger: { trigger: line, start: "top 60%", end: "top 48%",
                     scrub: 2, toggleActions: "play none none reverse" }
  });
});
```
Variante « plume » pour les titres manuscrits : SVG du tracé + `stroke-dashoffset` en trigger temporel `duration: 1.6, ease: "power1.inOut"`.

### Pattern C — Bavure d'encre / aquarelle sans WebGL
L'astuce des vidéos-masques est transposable telle quelle : **pré-rendre une tache qui s'étale (After Effects / Procreate) en séquence PNG ou vidéo luma**, puis `mask-image` CSS sur la photo, ou sprite-sheet animée avec `steps()`. Alternative légère : 5-6 PNG de tache de plus en plus étalée swappés dans une timeline GSAP.

### Pattern D — Parallaxe + dérive de fond (la « vie » permanente)
```js
// éléments épars (feuilles séchées, tickets) : data-lag 0.5–1.5
gsap.fromTo(el, { y: 40 * lag }, { y: -40 * lag, ease: "none",
  scrollTrigger: { trigger: el, start: "top 80%", end: "bottom top", scrub: 0.9 } });

// texture papier/carte en fond de section
gsap.set(".bg-map", { scale: 1.1 });
gsap.fromTo(".bg-map", { yPercent: 4, xPercent: -4 }, { yPercent: -4, xPercent: 4,
  ease: "none",
  scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 3 } });
```

### Pattern E — Rythme et respiration
- Lenis avec `lerp: 0.08–0.1` (ne pas reproduire le ×0,1 de molette — pertinent seulement pour une expérience narrative pure, frustrant sur une page « Qui suis-je »).
- **5-6 « planches » d'herbier max**, séparées par des sections de 60-80 vh presque vides (papier nu + une annotation griffonnée en parallaxe) — c'est le brouillard de David Whyte.
- 1 photo + 1 bloc de texte par moment, jamais plus.
- Easings à cohérence unique : `power2.out` / `expo.out` / `none` (scrub). Interdits : bounce, elastic, back prononcé.
- `prefers-reduced-motion` : tout en opacité simple sans y/rotation, scrub désactivé.

### Ce qui fera le « poétique »
Reveals **déclenchés + longs + réversibles** (A), lecture scrubbée en bande étroite (B), textures de masque organiques (C), micro-parallaxe permanente (D), et surtout **le vide entre les moments** (E). L'erreur à éviter : tout scrubber — chez David Whyte, seuls la caméra, la lecture et la parallaxe sont scrubbés ; **tout ce qui « fleurit » est temporel**.
