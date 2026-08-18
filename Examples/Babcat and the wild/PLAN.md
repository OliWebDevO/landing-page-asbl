# Babcat & The Wild — Plan de site

> **Message central :** Les animaux sont ma boussole.
> **Esprit de marque :** Same song, different species.
> **Vision :** Comprendre l'animal, respecter sa nature, aménager son monde.

Site vitrine pour Elisabeth (« Babeth »), soigneuse animalière, conseillère en nutrition et comportement animal, diplômée en architecture d'intérieur — Bruxelles.

**Pas** un site vétérinaire froid. **Pas** une vitrine commerciale. Une **maison-refuge**, un sanctuaire en devenir. Ambiance magazine slow living : éditorial, lumineux, organique, généreux en espace, un peu sauvage, profondément humain.

---

## 1. Décisions structurantes

| Sujet | Décision | Pourquoi |
|---|---|---|
| Stack v1 | HTML / CSS / JS vanilla + GSAP (ScrollTrigger, SplitText) | Demande explicite ; performance maximale ; contrôle total des animations |
| Architecture | Multi-pages (5 pages HTML), composants partagés injectés en JS (header/footer), contenu éditorial en JSON | Prépare la migration WordPress : chaque bloc de contenu = futur champ ACF |
| Évolutif | Structure pensée pour accueillir plus tard : boutique en ligne, réservation calendrier, articles supplémentaires | « Le site doit être conçu pour grandir » |
| Formulaire v1 | `mailto:` enrichi ou service type Formspree/n8n → babcatandthewild@gmail.com, avec objet par catégorie de service | Pas de backend en v1 ; la prise de RDV calendrier arrive en v2 (WordPress ou Cal.com embarqué) |
| Blog v1 | Articles statiques + tri par catégorie en JS (filtrage client) | Migrera vers les posts WordPress natifs |
| Migration v2 | Thème WordPress custom + ACF (agent wordpress-expert) | Elisabeth gère elle-même contenus, articles, témoignages |

### Nav finale (5 entrées)
`Accueil · Qui suis-je · Consultations · Guides & conseils · Contact`

---

## 2. Design system

### 2.1 Couleurs (tokens CSS)

```css
:root {
  /* Marque */
  --terracotta: #C8622A;        /* titres, CTA, accents forts */
  --sauge: #8B9B7D;             /* éléments apaisants, tags, filets */
  --jaune-pastel: #FFE999;      /* détails, surlignages, scotch, soleil — JAMAIS en texte */
  --anthracite: #272727;        /* texte, fonds sombres, bandeaux */

  /* Structure — jamais de blanc pur, jamais de gris froid */
  --creme: #F7EEE6;             /* fond clair principal, blanc cassé chaud */
  --creme-2: #FFE9CF;           /* fond alterné, sections */
  --bois-miel: #B98A5A;         /* accents organiques */
  --kraft: #C9B394;             /* textures papier, cartes */
  --gres: #D8CBB8;              /* filets, bordures douces */

  /* Variantes d'opacité plutôt que nouvelles couleurs */
  --sauge-20: rgb(139 155 125 / .2);
  --terracotta-10: rgb(200 98 42 / .1);
  --anthracite-70: rgb(39 39 39 / .7);
}
```

**Règles d'usage**
- 60 % crème/fonds clairs · 30 % anthracite/sauge · 10 % terracotta (60-30-10).
- ⚠️ **Contraste WCAG 2.2 AA** : terracotta `#C8622A` sur crème ≈ 3.8:1 → OK en **grands titres uniquement** (18px+ / 14px+ bold). Pour du texte courant terracotta, prévoir une variante foncée `--terracotta-text: #A84E1E` (à valider ≥ 4.5:1). Le jaune pastel ne porte **jamais** de texte — décor uniquement (scotch, soulignés, soleil du pictogramme).
- Fonds sombres : anthracite mat + texte crème.

### 2.2 Typographie

| Rôle | Police | Usage |
|---|---|---|
| Titres | **Robelia Elegant Serif** | H1–H3, titres d'articles |
| Lecture | **Alegreya Sans** (OFL, 400/500 + italique) | corps de texte, formulaires — décision 06/07/2026 : Stellar fatigue en paragraphe |
| Étiquettes | **Stellar** | capitales courtes uniquement : sur-titres, tags, boutons, nav, h6 |
| Signature / poésie | **Wanderlust** (script) | phrases-boussole, mises en avant, annotations « manuscrites » de l'herbier — **sans accents** (ASCII only) |

- Chargement : `@font-face` local, `woff2`, `font-display: swap`, preload des 2 fontes critiques (Robelia + Alegreya regular). Licences : Envato ✓ (×3) + OFL ✓ (`assets/fonts/licences/`). Fallbacks : Georgia/serif, system-ui, cursive.
- Échelle modulaire fluide (`clamp()`), ratio 1.125 mobile → 1.333 desktop. Jamais de `px` : `rem` + `clamp()`.
- Ligne de lecture : `max-width: 65ch`.
- Wanderlust en parcimonie : 1–2 apparitions par écran max, taille généreuse (illisible en petit).

### 2.3 Grille & espacements
- CSS Grid natif, 12 / 8 / 4 colonnes (desktop / tablette / mobile).
- Espacement en multiples de 8 px ; sections aérées (96–160 px de respiration verticale desktop).
- Layouts éditoriaux : images qui débordent de la grille, textes décalés, superpositions douces — beau mais **pas trop lisse**.
- Breakpoints : 768 / 1024 / 1280 / 1536 — **mobile-first**, `min-width` uniquement.

### 2.4 Matières & détails organiques
- Textures discrètes : grain papier kraft sur les cartes, bords légèrement irréguliers (masques SVG), ombres chaudes portées douces.
- Scotch jaune pastel semi-transparent sur les photos (SVG réutilisable, rotation aléatoire ±3°).
- Filets et séparateurs : traits sauge fins, dessinés (SVG `stroke-dashoffset` animé).
- Photos : grandes, émotionnelles, coins très légèrement arrondis (2–4 px), jamais de filtres saturés.

### 2.5 Logos
1. **Logo typographique principal** → header desktop, hero, footer.
2. **Monogramme B (chien + chat)** → favicon, header mobile/scrollé (header qui se compacte), avatar réseaux.
3. **Pictogramme soleil (chien + chat de dos)** → page Contact, séparateurs de sections, puce de liste signature, états vides, 404.

---

## 3. Architecture technique

```
babcat-and-the-wild/
├── index.html                  # Accueil
├── qui-suis-je.html
├── consultations.html
├── guides-conseils.html
├── contact.html
├── mentions-legales.html
├── guides/                     # articles individuels
│   └── propylene-glycol-croquettes.html   (exemple)
├── assets/
│   ├── css/
│   │   ├── tokens.css          # variables (couleurs, typo, espaces)
│   │   ├── base.css            # reset, typo globale, utilitaires
│   │   ├── layout.css          # grille, header, footer
│   │   ├── components.css      # cartes, boutons, tags, formulaires (BEM)
│   │   └── pages/              # 1 fichier par page (hero.css, about.css…)
│   ├── js/
│   │   ├── main.js             # init global, header, injection partials
│   │   ├── animations/
│   │   │   ├── core.js         # setup GSAP, prefers-reduced-motion
│   │   │   ├── reveals.js      # reveals génériques (texte, sections, blocs)
│   │   │   └── about-story.js  # expérience « herbier » Qui suis-je
│   │   ├── guides-filter.js    # tri par catégories
│   │   └── contact-form.js     # validation + envoi
│   ├── fonts/                  # woff2 auto-hébergées
│   ├── img/                    # AVIF/WebP + fallback, tailles responsive
│   └── data/
│       ├── guides.json         # articles (titre, catégorie, résumé, visuel)
│       ├── services.json       # 4 consultations (→ futurs champs ACF)
│       └── testimonials.json   # témoignages (→ futur CPT WordPress)
├── partials/                   # header.html, footer.html (injectés)
└── PLAN.md
```

**Principes**
- GSAP auto-hébergé (core + ScrollTrigger + SplitText), chargé en `defer`. Un seul point d'entrée d'animation ; tout passe par `matchMedia` GSAP (mobile ≠ desktop) et `prefers-reduced-motion`.
- Zéro framework CSS, zéro inline style, classes BEM uniques (`.hero__title`, `.story__photo`, `.guide-card__tag`).
- Contenu séparé de la structure (JSON + data-attributes) → la migration WordPress devient un mapping ACF quasi mécanique.
- Images : `<picture>` AVIF/WebP, `srcset`, `loading="lazy"` (sauf hero en `fetchpriority="high"`), dimensions explicites (zéro CLS).

---

## 4. Pages — plan détaillé

### 4.1 Accueil — *la porte du sanctuaire*
Objectif : donner envie **d'entrer dans un univers**, pas de lire une offre. Une action principale : découvrir les consultations / prendre contact.

| # | Section | Contenu | Ambiance / animation |
|---|---|---|---|
| 1 | **Hero plein écran** | Logo typographique, « Les animaux sont ma boussole. » (Wanderlust, apparition manuscrite), phrase de positionnement en Stellar, CTA « Découvrir les consultations » | Grande image nature/animal chaleureuse, léger parallaxe, reveal du titre par mots |
| 2 | **Bandeau axes** | Nutrition • comportement • garde • soins • aménagement animal-friendly | Défilement doux ou apparition en cascade, filets sauge |
| 3 | **Elle, en 3 phrases** | Teaser « Qui suis-je » : portrait + extrait du récit + « Avec les animaux, je suis partout chez moi. » → lien vers la page | Photo scotchée (avant-goût de l'herbier), texte reveal ligne par ligne |
| 4 | **Les 4 consultations** | 4 cartes éditoriales (Comportement / Nutrition / Aménagement ★ signature / Garde & soins), une phrase chacune + visuel | Cartes kraft, hover doux (lift 4 px + ombre chaude), stagger à l'entrée |
| 5 | **Signature : l'aménagement animal-friendly** | Mise en avant dédiée de la spécialité — « Un intérieur beau pour l'humain, juste pour l'animal. » | Section fond anthracite, image large, contraste éditorial |
| 6 | **Derniers guides** | 3 dernières cartes d'articles → « Guides & conseils » | Grille magazine |
| 7 | **Témoignage** | 1 témoignage en grand (rotation possible), prénom + nom de l'animal | Citation en Robelia, guillemets terracotta |
| 8 | **Pré-footer contact** | Pictogramme soleil, « à domicile à Bruxelles et alentours, ou en visio », CTA contact | Fond crème-2, soleil qui se dessine (SVG stroke) |

### 4.2 Qui suis-je — *l'herbier animé* ⭐ pièce maîtresse
Référence : davidwhyte.com/experience, **transposé en scroll vertical naturel** (pas de scroll détourné). Analyse technique complète du site de référence : [docs/analyse-davidwhyte.md](docs/analyse-davidwhyte.md) — patterns GSAP identifiés et transposés. Spec d'animation détaillée à valider avec toi avant développement (tu as prévu de revenir avec plus de détails).

**Les 5 leçons de l'analyse (à respecter) :**
1. **Rien n'est pinné, rien n'est snappé** — le poétique vient d'un scroll libre mais lissé (Lenis `lerp: 0.08–0.1`) et de reveals lents.
2. **Deux régimes d'animation distincts** : ce qui « fleurit » (photos, scotch, traits dessinés) est **déclenché, temporel (1–1,5 s) et réversible** (`toggleActions: "play none none reverse"`) ; seuls la **lecture du texte** et la **parallaxe** sont scrubbés. Ne jamais tout scrubber.
3. **Texte qui s'écrit** = un ScrollTrigger **par ligne** (SplitText), bande étroite au milieu du viewport (`start: "top 60%", end: "top 48%"`, `scrub: 2`), opacité 0.15 → 1. S'éteint si on remonte.
4. **Le vide est majoritaire** : 5-6 planches d'herbier max, séparées par 60-80 vh presque vides (papier nu + une annotation en parallaxe). 1 photo + 1 bloc de texte par moment, jamais plus.
5. **Amplitudes minuscules, easings cohérents** : parallaxe ±4 %, `power2.out` / `expo.out` / linear uniquement. Interdits : bounce, elastic, back prononcé (exception : le scotch, léger).

**Concept : un carnet de voyage / herbier qu'on feuillette en scrollant.**
- Les **photos apparaissent « accrochées »** : elles tombent/se posent doucement, puis le scotch jaune pastel vient les fixer (2 petits SVG en coin, scale-in avec léger overshoot).
- Le **texte s'écrit au moment du scroll** : reveal par mots/lignes lié au scrub pour la prose (Stellar), effet « encre qui apparaît » pour les phrases Wanderlust (masque + `stroke-dashoffset` sur version SVG des phrases clés).
- **Annotations manuscrites** : lieux et dates en Wanderlust près des photos (Humpty Doo, Balkans…), petite flèche ou trait dessiné.
- Éléments poétiques discrets entre les chapitres : trait de boussole qui se trace, feuille séchée, patte, vague — SVG line-drawings animés au scroll.

**Structure narrative (prose à la 1ʳᵉ personne, un récit — pas un CV) :**
1. **Ouverture** — portrait + « Les animaux sont ma boussole. » Bruxelles, aujourd'hui.
2. **L'Australie** — cattle stations, Humpty Doo. Photos + annotations.
3. **Les Balkans** — refuges, chiens des rues.
4. **Les dauphins** — en kayak. Respiration visuelle pleine largeur.
5. **Mémé & la chèvre anglo-nubienne** — la tendresse, l'absurde, le vivant.
6. **Le Fanal Des Chats** — deux ans en refuge félin : le métier, le sérieux.
7. **L'architecture d'intérieur** — le diplôme, la bascule : unir aménagement, esthétique et bien-être animal.
8. **Aujourd'hui** — ses quatre chats, Bruxelles, le sanctuaire en devenir. « Avec les animaux, je suis partout chez moi. »
9. **Témoignages** — 3 à 5, courts, prénom + nom du chat/chien, façon polaroïds scotchés.
10. **CTA doux** → Consultations / Contact.

**Garde-fous techniques**
- Scrub léger (`scrub: 0.5–1`), pins courts et rares, jamais plus d'un élément animé « fort » par viewport.
- Mobile : version allégée via `gsap.matchMedia()` — reveals simples, pas de pin, photos et scotch conservés (l'âme reste).
- `prefers-reduced-motion` : tout visible d'office, transitions d'opacité minimales.
- Budget perf : SVG + transforms uniquement (pas de layout thrashing), images lazy, `will-change` ponctuel.

### 4.3 Consultations — *l'offre, claire et incarnée*
Une page longue, 4 grandes sous-rubriques ancrées (sous-nav sticky discrète en haut : Comportement · Nutrition · Aménagement · Garde). Chaque rubrique = mini-chapitre éditorial : grande image, intro incarnée, « sujets abordés » en liste visuelle (puces pictogramme soleil ou tags sauge), déroulé **par étapes** (comment ça se passe : 1. échange → 2. observation/visite → 3. plan personnalisé → 4. suivi), et CTA.

1. **Comportement** — chats & chiens, à domicile ou en visio. Griffades, agressivité, anxiété, malpropreté, intégration d'un nouvel animal, cohabitation multi-chats/chiens, promenades, difficultés du quotidien, signaux de l'animal. **Ton rassurant, non culpabilisant** (« Il n'y a pas de mauvais humain ici. »).
2. **Nutrition** — bilan personnalisé, transition alimentaire, lecture des compositions, recettes maison, BARF, compléments naturels. Mise en avant : **le chat, carnivore strict ; le chien, carnivore latent** — respecter la physiologie.
3. **Aménagement intérieur animal-friendly** ★ — **la spécialité signature**, traitement visuel distinct (section plus riche, fond anthracite ou pleine largeur). « Créer un intérieur beau pour l'humain, juste pour l'animal. » Parcours muraux, hauteurs, points d'eau/fontaine, zone d'alimentation, litières, plantes safe, repos, cachettes, enrichissement, multi-chats, chats d'intérieur, choix de mobilier. Montrer que **l'intérieur est un territoire vivant**. Idéal : un schéma/illustration annotée d'un intérieur (annotations Wanderlust animées au scroll).
4. **Garde & soins à domicile** — garde professionnelle par une soigneuse animalière : visites quotidiennes ou biquotidiennes, alimentation respectée, médicaments, suivi santé & comportement, **compte rendu quotidien photos/vidéos**.

Chaque rubrique : bouton **« Réserver une consultation »** ou **« Me contacter »** → Contact avec l'objet pré-rempli (`contact.html?service=nutrition`).

### 4.4 Guides & conseils — *la bibliothèque*
- **Header** de page : « La bibliothèque Babcat & The Wild » + phrase d'intention (du vrai partage d'expertise, pas du contenu SEO froid).
- **Filtres par catégorie** (tags sauge, filtrage JS + animation FLIP douce) : Nutrition animale · Comportement · Aménagement animal-friendly · Soins & prévention · Bien-être.
- **Grille magazine** de cartes : visuel, titre Robelia, résumé Stellar, catégorie, « Lire la suite ».
- **Gabarit article** : hero image, chapô, corps `65ch`, encadrés « le conseil de Babeth » (kraft + Wanderlust), articles liés.
- **Sujets de lancement** (6–8 articles pour ouvrir avec de la matière) : additifs dans l'alimentation, propylène glycol dans les croquettes, humidité dans l'alimentation du chat, lecture d'étiquettes, malpropreté, stress, choix de fontaine, emplacement de litière, plantes toxiques/safe, enrichissement du chat d'intérieur, prévention & observation quotidienne.
- Ton : personnel, pédagogique, rigoureux, engagé — basé sur l'expérience réelle d'Elisabeth.

### 4.5 Contact — *simple, claire, rassurante*
- **Formulaire** : nom, email, objet (select : Comportement / Nutrition / Aménagement intérieur / Garde & soins / Prise de contact / Proposition de partenariat / Question / Autre), message. Validation accessible, messages d'erreur doux, envoi → babcatandthewild@gmail.com.
- Pré-remplissage de l'objet via paramètre d'URL depuis les CTA Consultations.
- **Infos** : email, téléphone, Instagram / TikTok / Facebook — @babcatandthewild.
- **Zone d'intervention** : « Les consultations se font à domicile, à Bruxelles et alentours, ou en visio selon la demande. »
- **Pictogramme soleil** en respiration + **phrase douce de clôture** (ex. « Prenez le temps. On vous répond avec soin. » — à écrire avec Elisabeth).
- Lien **Mentions légales** (+ page RGPD simple pour le formulaire).
- v2 : module de réservation calendrier (Cal.com embarqué ou plugin WP).

### 4.6 Transverses
- **Header** : crème translucide + blur léger, logo typo → monogramme au scroll, nav Stellar, état actif terracotta, burger mobile plein écran anthracite (nav en Robelia, entrée stagger).
- **Footer** : anthracite, logo, nav secondaire, réseaux, phrase-signature « Same song, different species. » en Wanderlust, mentions légales.
- **404** : pictogramme soleil, « Ce sentier ne mène nulle part… » + retour accueil.
- Skip-link, hiérarchie de titres stricte, focus visibles (outline terracotta), cibles tactiles ≥ 44 px.

---

## 5. Stratégie d'animation GSAP (globale)

**Philosophie : subtil, professionnel, jamais gênant.** L'animation raconte (l'herbier, l'écriture, le dessin) — elle ne décore pas.

**Hiérarchie d'intensité (règle non négociable) :**
- **Tout le site respire en GSAP**, mais en sourdine : reveals discrets, parallaxe légère, micro-détails (trait qui se dessine, scotch d'un teaser). Sobre et délicat — un visiteur pressé ne doit jamais être ralenti ni même remarquer consciemment les animations.
- **« Qui suis-je » est le seul endroit où GSAP prend le dessus** : c'est là que vit l'expérience (herbier, écriture au scroll, planches, respirations). Le contraste entre la sobriété du site et la richesse du récit fait partie de l'effet — si tout le site en faisait autant, l'herbier perdrait sa magie.
- Concrètement : hors Qui suis-je, uniquement les patterns « reveal texte », « reveal sections », « ligne dessinée » et parallaxe ≤ ±4 % ; jamais de scrub narratif, jamais de pin, jamais d'élément qui attend le scroll pour être lisible.

| Pattern | Usage | Réglages indicatifs |
|---|---|---|
| Reveal texte par mots/lignes (SplitText) | H1/H2, intros | `y: 24, opacity 0→1, stagger 0.04, power2.out, 0.7s` — déclenché à 75 % viewport, une seule fois |
| Reveal sections/blocs | toutes pages | fade + `y: 32`, stagger 0.08 sur les enfants |
| Ligne dessinée (SVG stroke) | séparateurs, soleil, boussole | `drawSVG`-like via `stroke-dashoffset`, scrub doux |
| Photo scotchée | Qui suis-je, teasers | déclenché + temporel + réversible : photo `opacity 0→1, scale 1.06→1, rotate ±2-4°, y 24→0, 1.4s power2.out` ; scotch `scaleX 0→1, 0.5s` décalé de 0.55 s |
| Écriture au scroll | prose du récit | 1 ScrollTrigger **par ligne** (SplitText lines), bande `top 60%`→`top 48%`, `scrub: 2`, opacité 0.15→1 |
| Parallaxe léger | heros, grandes images | `yPercent: ±6`, scrub |
| Micro-interactions | boutons, cartes, liens | CSS d'abord ; GSAP seulement si nécessaire |

**Règles dures** : `prefers-reduced-motion` partout (fallback opacité) · `gsap.matchMedia()` pour différencier mobile/desktop · pas d'animation sur le chemin critique de lecture · durées ≤ 0.8 s hors scrub · développement de **tout le GSAP par l'agent animation-gsap-expert** (jamais inline).

---

## 6. Performance, SEO, accessibilité

**Performance** (cibles : LCP < 2 s, CLS < 0.05, Lighthouse ≥ 95)
- Images AVIF/WebP responsive, hero préchargé, lazy ailleurs ; fontes woff2 sous-ensemblées (`subset` latin) et préchargées ; CSS critique inline-able en fin de build si besoin ; JS `defer`, GSAP chargé une fois, `about-story.js` chargé uniquement sur sa page.

**SEO** (agent seo-expert en fin de build)
- FR, ciblage local Bruxelles : « comportementaliste chat Bruxelles », « nutrition chat/chien Bruxelles », « cat-sitting professionnel Bruxelles », « aménagement intérieur pour chat »…
- Schema.org : `LocalBusiness` (+ `Person` pour Elisabeth, `Article` pour les guides, `FAQPage` possible sur Consultations), Open Graph + images sociales, sitemap.xml, meta uniques par page.
- Les guides = moteur SEO long terme (vraie expertise = vrai contenu).

**Accessibilité** — WCAG 2.2 AA non négociable : contrastes validés (cf. réserve terracotta/jaune §2.1), navigation clavier complète y compris filtres et burger, `aria-live` sur le résultat du filtrage et du formulaire, alt soignés (les photos portent le récit), reduced-motion.

---

## 7. Migration WordPress (v2 — anticipée dès la v1)

| Élément v1 | Devient en v2 |
|---|---|
| `partials/header.html`, `footer.html` | `header.php`, `footer.php` |
| Pages HTML | Templates de page + blocs ACF flexibles |
| `services.json` | CPT `consultation` ou champs ACF (repeater sujets, étapes, CTA) |
| `guides.json` + articles | Posts natifs + catégories WP |
| `testimonials.json` | CPT `temoignage` (prénom, animal, texte) |
| Textes de l'herbier | ACF flexible content : bloc « chapitre » (texte, photo, annotation, position) — Elisabeth pourra réordonner son récit |
| Formulaire | Plugin de formulaire + notification email, ou intégration calendrier |

Règle d'or v1 : **aucun contenu en dur dans le JS**, tout dans le HTML ou les JSON → le wordpress-expert transpose sans réécrire.

---

## 8. Phases de production & agents

> **RÉVISION 06/07/2026** — le design system étant construit et validé (styleguide, polices licenciées, palette finale), les phases maquette (1c) / build (2) / animation (3) sont **fusionnées en tranches verticales** : chaque page est livrée complète, animations incluses, et validée avant la suivante. Ordre : ① Accueil (pilote — fixe les layouts ET le ton animatique) → ② Qui suis-je (herbier, sprint dédié) → ③ Consultations + Guides (parallèle) → ④ Contact + mentions légales. SEO/QA/audit restent en phases finales. Le découpage ci-dessous est conservé pour référence.

```
Phase 0 — VALIDATION (toi + Elisabeth)
  └─ Ce plan + réponses aux questions du §9. Détails de l'herbier (tu reviens vers moi).

Phase 1 — DIRECTION ARTISTIQUE
  ├─ design-inspiration-expert : moodboard slow living / éditorial animalier (validation ambiance)
  ├─ site-analyzer-expert : analyse davidwhyte.com/experience  ✅ EN COURS
  └─ ux-ui-expert : design system (tokens, typo, composants) + maquettes HTML/CSS
       des 5 pages (statiques, sans animation) → validation client

Phase 2 — BUILD
  └─ static-web-expert : intégration des 5 pages + mentions légales + gabarit article,
     responsive mobile-first, formulaire, filtres guides. Zéro animation à ce stade.

Phase 3 — ANIMATION
  ├─ animation-gsap-expert : système de reveals global (toutes pages)
  └─ animation-gsap-expert : expérience « herbier » Qui suis-je (sprint dédié,
     sur base de la spec issue de l'analyse + tes précisions)

Phase 4 — SEO
  └─ seo-expert : meta, schema.org, OG, sitemap, maillage interne, SEO local Bruxelles

Phase 5 — QA
  └─ testing-qa-expert : parcours complets, responsive (375/768/1024/1280/1440),
     cross-browser, formulaire, filtres, reduced-motion, clavier

Phase 6 — AUDIT FINAL
  └─ performance-security-expert : Lighthouse, poids, headers, durcissement formulaire

Phase 7 (plus tard) — WORDPRESS
  └─ wordpress-expert : thème custom + ACF selon le mapping §7
Phase 8 (plus tard) — BOUTIQUE
  └─ WooCommerce sur la base WordPress (anticipé : la DA et les composants cartes
     produits découleront du design system existant)
```

Phases 4 et 6 peuvent tourner en parallèle ; la 5 après la 3.

---

## 9. Questions ouvertes / matière à fournir

**Bloquant avant la Phase 2 :**
1. ✅ **Polices** : licences commerciales **Envato Elements achetées le 06/07/2026** ✓ (certificats : `assets/fonts/licences/`, sources : `assets/fonts/sources/`, woff2 auto-hébergés : `assets/fonts/`). Fallbacks Google retirés du projet — polices de marque uniquement. ⚠️ **Règle éditoriale** : la Wanderlust licenciée est **ASCII only** (aucun accent français) → rédiger les phrases script sans accents autant que possible (« Les animaux sont ma boussole. » ✓), sinon envisager l'ajout des glyphes via fontTools (modification autorisée par la licence Envato). Robelia/Stellar : accents ✓, seuls œ/Œ/« » manquent (rendus par la stack système, quasi invisible).
2. ✅ **Logos** : reçus (`assets/img/logos/`, 3 PNG). Sources vectorielles SVG/AI à demander si elles existent ; sinon optimisation PNG multi-tailles en Phase 2.
3. ✅ **Photos** : 12 photos reçues et inventoriées (`docs/photos-inventaire.md`). Manques pour l'herbier : Balkans, dauphins/kayak, Mémé, le Fanal Des Chats, intérieurs aménagés, portrait Bruxelles, prénoms des chats.
4. **Textes du récit** : premier jet du texte « Qui suis-je » (ou on le co-écrit à partir des éléments du brief).

**À trancher (non bloquant) :**
5. **Formulaire** : simple `mailto` (fragile), Formspree/Web3Forms (gratuit, fiable), ou webhook n8n (tu as n8n dispo) ? → je recommande **n8n ou Web3Forms**.
6. **Téléphone** : le numéro à afficher.
7. **Témoignages** : les 3–5 vrais témoignages (prénom + nom de l'animal).
8. **Tarifs** : affichés sur Consultations ou « sur demande » ? (le brief ne les mentionne pas → je pars sur « sur demande » avec CTA contact).
9. **Bilinguisme** : FR uniquement, ou NL/EN prévus (Bruxelles) ? Impacte la structure dès la v1.
10. **Ancien brief vs nouveau** : le premier message mentionnait sensibilisation, shiatsu animalier, promenade — le brief détaillé structure tout en 4 consultations. Je considère le brief détaillé comme référence (promenades intégrées à Comportement, garde = rubrique 4). Le shiatsu/la sensibilisation réapparaîtront-ils comme services ou articles ?

---

*Plan v1 — 06/07/2026. Prochaine étape : ta validation + tes précisions sur l'herbier « Qui suis-je », puis lancement Phase 1.*
