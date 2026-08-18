# Documentation Technique - Portfolio 3D Next.js

## Vue d'ensemble

Portfolio web personnel construit avec Next.js 16 (App Router), React 19, TypeScript, Three.js et GSAP. Le site est bilingue (EN/FR), integre des scenes 3D interactives et des animations au scroll. Il est deploye sur Vercel.

- **URL** : https://www.olivervdb.com
- **Branche principale** : `main`
- **Node.js** : Compatible avec les versions supportees par Next.js 16

---

## Architecture du projet

```
3d_portfolio_nextjs/
├── app/                          # Next.js App Router
│   ├── api/contact/route.ts      # API endpoint pour le formulaire de contact
│   ├── projects/[slug]/page.tsx  # Pages projet dynamiques (SSG)
│   ├── providers/LenisProvider.tsx # Provider smooth scroll
│   ├── layout.tsx                # Layout racine (metadata, fonts, providers)
│   ├── page.tsx                  # Page d'accueil principale
│   ├── globals.css               # Styles globaux + composants Tailwind
│   ├── error.tsx                 # Error boundary par page
│   ├── global-error.tsx          # Error boundary racine
│   ├── not-found.tsx             # Page 404
│   ├── robots.ts                 # Generation robots.txt
│   └── sitemap.ts                # Generation sitemap.xml
├── components/                   # Composants reutilisables
│   ├── AnimatedCounter.tsx       # Compteurs animes (react-countup)
│   ├── Button.tsx                # Bouton CTA avec animation
│   ├── ButtonShowcase.tsx        # Variante bouton avec children/onClick
│   ├── ProjectButton.tsx         # Bouton CTA avec Next.js Link
│   ├── GlowCard.tsx              # Carte avec effet lueur (mouse tracking)
│   ├── GlowCardDetails.tsx       # Variante carte lueur (padding reduit)
│   ├── LanguageSwitcher.tsx      # Toggle EN/FR
│   ├── NavBar.tsx                # Barre de navigation
│   ├── TitleHeader.tsx           # En-tete de section (titre + badge)
│   ├── Lottie/
│   │   ├── LottiePreloader.tsx   # Ecran de chargement anime
│   │   └── preloader.json        # Donnees animation Lottie
│   └── models/                   # Composants 3D
│       ├── HeroModels/
│       │   ├── HeroExperience.tsx # Canvas 3D hero (responsive, fallback mobile)
│       │   ├── HeroLights.tsx    # Eclairage 3D (spot, area, point lights)
│       │   ├── Particles.tsx     # Systeme de particules tombantes
│       │   └── Room.tsx          # Modele 3D de bureau (GLTF + bloom)
│       ├── contact/
│       │   ├── Computer.tsx      # Modele 3D ordinateur vintage
│       │   └── ContactExperience.tsx # Canvas 3D contact (responsive)
│       ├── techlogos/
│       │   └── TechIcon.tsx      # Icone tech 3D flottante
│       └── MaterialUiSlider/
│           ├── Slider.tsx        # Carrousel Swiper avec effet Material
│           ├── effect-material.*  # Effet custom Swiper (CSS + JS)
│           ├── index.css         # Styles Swiper
│           └── images/           # Images du slider
├── sections/                     # Sections de page
│   ├── Hero.tsx                  # Hero avec titre anime + 3D
│   ├── ShowcaseSection.tsx       # Grille de projets (hover logos)
│   ├── LogoSection.tsx           # Marquee draggable de logos tech
│   ├── FeatureCards.tsx          # 3 cartes qualites (glow effect)
│   ├── ExperienceSection.tsx     # Timeline experience (GSAP)
│   ├── TechStack.tsx             # Grille icones 3D tech
│   ├── Contact.tsx               # Formulaire + 3D + popup succes
│   ├── Footer.tsx                # Footer avec reseaux sociaux
│   ├── ProjectHero.tsx           # Hero pour pages projet individuelles
│   ├── ProjectDetailsSection.tsx # Details projet en 3 cartes
│   └── Testimonials.tsx          # Temoignages (actuellement desactive)
├── constants/
│   └── index.ts                  # TOUTES les donnees et traductions (1141 lignes)
├── contexts/
│   └── LanguageContext.tsx        # Context React pour la langue (EN/FR)
├── hooks/
│   ├── useTranslation.tsx        # Hook d'acces aux traductions
│   └── useLenisScrollSync.tsx    # Hook de synchronisation Lenis + GSAP
├── public/
│   ├── images/                   # Images statiques (~67 MB)
│   │   ├── logos/                # Logos technologiques (27 fichiers)
│   │   ├── textures/            # Textures 3D (mat1.png)
│   │   └── ...                  # Screenshots projets, icones UI, avatars
│   └── models/                   # Modeles 3D GLB (~4.2 MB)
│       ├── optimized-room.glb    # Scene bureau hero (825 KB)
│       ├── computer-optimized-transformed.glb # Ordinateur contact (39 KB)
│       ├── react_logo-transformed.glb  # Logo React 3D (58 KB)
│       ├── node-transformed.glb  # Logo Node 3D (729 KB)
│       ├── git-svg-transformed.glb
│       ├── python-transformed.glb
│       └── three.js-transformed.glb
├── doc/                          # Documentation
├── env.d.ts                      # Interfaces TypeScript globales
├── .env.local                    # Variables d'environnement (SMTP)
├── next.config.ts                # Configuration Next.js
├── tailwind.config.ts            # Configuration Tailwind CSS
├── tsconfig.json                 # Configuration TypeScript
├── postcss.config.mjs            # PostCSS (import + tailwind)
└── eslint.config.mjs             # ESLint flat config
```

---

## Systeme de traduction bilingue

### Fonctionnement

Le systeme repose sur 3 fichiers :

1. **`contexts/LanguageContext.tsx`** : Context React qui gere l'etat de la langue.
   - Detecte la langue du navigateur au premier chargement
   - Persiste le choix dans `localStorage` (cle : `'language'`)
   - Fournit `language`, `setLanguage`, et toutes les donnees traduites

2. **`hooks/useTranslation.tsx`** : Hook simplifie pour consommer le contexte.
   - Retourne : `t` (traductions), `locale`, `isEnglish`, `isFrench`, `navLinks`, `words`, `abilities`, `expCards`, `techStackIcons`, `projects`, `projectDetailsCards`

3. **`constants/index.ts`** : Source unique de toutes les traductions.
   - Structure : chaque export utilise des cles `en` / `fr`
   - Exemple : `translations.en.hero.shaping` / `translations.fr.hero.shaping`

### Ajouter une traduction

Dans `constants/index.ts`, ajouter les cles dans les deux langues :

```typescript
// Dans l'objet translations
export const translations = {
  en: {
    newSection: {
      title: "English title",
      description: "English description"
    },
    // ...
  },
  fr: {
    newSection: {
      title: "Titre francais",
      description: "Description en francais"
    },
    // ...
  }
};
```

Puis mettre a jour l'interface `Translations` dans `env.d.ts`.

### Ajouter une langue

1. Ajouter un type dans `env.d.ts` : `type Language = 'en' | 'fr' | 'nl'`
2. Ajouter les traductions dans chaque export de `constants/index.ts`
3. Ajouter le bouton dans `components/LanguageSwitcher.tsx`

---

## Composants 3D

### Dependances 3D

- `three` : Moteur 3D
- `@react-three/fiber` (via drei) : React renderer pour Three.js
- `@react-three/drei` : Helpers (useGLTF, OrbitControls, Float, Environment, Preload)
- `@react-three/postprocessing` : Effets de post-traitement (Bloom)
- `postprocessing` : Librairie sous-jacente (BlendFunction)

### Modeles 3D (format GLB)

Les modeles sont dans `/public/models/`. Ils sont charges avec `useGLTF` de drei.

| Modele | Utilise par | Section |
|--------|------------|---------|
| `optimized-room.glb` | `Room.tsx` | Hero |
| `computer-optimized-transformed.glb` | `Computer.tsx` | Contact |
| `react_logo-transformed.glb` | `TechIcon.tsx` | Tech Stack |
| `node-transformed.glb` | `TechIcon.tsx` | Tech Stack |
| `git-svg-transformed.glb` | `TechIcon.tsx` | Tech Stack |
| `python-transformed.glb` | `TechIcon.tsx` | Tech Stack |
| `three.js-transformed.glb` | `TechIcon.tsx` | Tech Stack |

### Pattern de rendu responsive

Tous les composants 3D (HeroExperience, ContactExperience, TechIcon) suivent ce pattern :

```typescript
const [isMobile, setIsMobile] = useState(false);
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Mobile : image statique de remplacement
// Desktop : Canvas 3D interactif
```

### Evenements custom

Les modeles 3D emettent des evenements pour signaler leur chargement :

- `Room.tsx` emet `'room-loaded'` quand le modele GLTF est charge
- `TechIcon.tsx` emet `'model-loaded'` quand un modele tech est charge
- `LenisProvider.tsx` ecoute ces evenements pour rafraichir le scroll

---

## Systeme d'animations GSAP

### Configuration

GSAP est utilise avec `@gsap/react` (hook `useGSAP`) et le plugin `ScrollTrigger`.

### Sections animees et leur logique

| Section | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Hero | Fade-in + slide-up des titres | Au chargement | `y: 50 → 0`, stagger 0.2s |
| ShowcaseSection | Fade-in des cartes projet | Scroll (`#work`, center) | Stagger avec delay calcule |
| LogoSection | Marquee + drag momentum | Interaction utilisateur | requestAnimationFrame |
| ExperienceSection | Slide-in cartes + timeline shrink | Scroll (chaque carte) | `xPercent: -100 → 0`, scaleY: 1 → 0 |
| TechStack | Fade-in des cartes tech | Scroll (`#skills`, center) | `y: 50 → 0`, stagger 0.2s |
| ProjectHero | Fade-in des logos tech | Scroll (`.tech-logos`, 80%) | `y: 40 → 0` |
| ProjectDetailsSection | Slide-in cartes + timeline | Scroll (chaque carte) | Similaire a Experience |

### Smooth Scroll (Lenis)

Configure dans `app/providers/LenisProvider.tsx` :

- `lerp: 0.12` (facteur de lissage)
- `wheelMultiplier: 1.2`
- `syncTouch: true`
- Synchronise avec GSAP ScrollTrigger via `gsap.ticker`
- Rafraichit apres : chargement d'images, chargement de modeles 3D, timeouts de secours (500ms, 1500ms, 3500ms)

---

## API Contact

### Endpoint : `POST /api/contact`

**Fichier** : `app/api/contact/route.ts`

**Body attendu** (JSON) :
```json
{
  "name": "string (requis)",
  "email": "string (requis)",
  "message": "string (requis)"
}
```

**Configuration SMTP** :
- Hote : `smtp.hostinger.com`
- Port : `465` (SSL/TLS)
- Identifiants : variables d'environnement `SMTP_USER` et `SMTP_PASSWORD`
- Expediteur : "Portfolio Contact" <SMTP_USER>
- Destinataire : SMTP_USER

**Reponses** :
- `200` : `{ success: true }`
- `400` : `{ error: 'Missing required fields' }`
- `500` : `{ error: 'Failed to send email' }`

**Protection anti-spam** : Le formulaire inclut un champ honeypot cache (`<input>` invisible). La validation cote client verifie que ce champ est vide avant l'envoi.

---

## SEO et Metadata

### Layout racine (`app/layout.tsx`)

- **Title** : "Oliver Van Droogenbroeck | Frontend Web Developer | React & Next.js Expert Belgium"
- **Open Graph** : Image `/images/portfolioCover.png` (1200x630)
- **Twitter Card** : summary_large_image
- **JSON-LD** : 3 schemas (Person, WebSite, ProfessionalService)
- **Hreflang** : en, fr, x-default
- **Geo** : Belgium (BE)

### Fichiers SEO

- `app/robots.ts` : Autorise tout sauf `/private/` et `/admin/`, crawl delay 2s pour Googlebot
- `app/sitemap.ts` : 6 URLs (accueil + 5 projets), priorite 1.0 pour l'accueil, 0.8 pour les projets

### Pages projet (`app/projects/[slug]/page.tsx`)

- Generation statique avec `generateStaticParams()` (5 slugs : library, artgallery, portfolio, lenoyer, annick)
- Metadata dynamique par projet (titre, description, image Open Graph)

---

## Configuration Next.js (`next.config.ts`)

- **En-tetes de securite** : X-DNS-Prefetch-Control, HSTS, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- **Compression** : Activee
- **Images** : Formats AVIF et WebP
- **Powered by** : Desactive en production

---

## Configuration Tailwind (`tailwind.config.ts`)

### Couleurs custom

| Nom | Valeur | Usage |
|-----|--------|-------|
| `white-50` | `#d9ecff` | Texte secondaire clair |
| `black-50` | `#1c1c21` | Fond de carte |
| `black-100` | `#0e0e10` | Fond principal |
| `black-200` | `#282732` | Fond alternatif |
| `blue-50` | `#839cb5` | Texte subtil |
| `blue-100` | `#2d2d38` | Fond d'input |

### Breakpoints custom

| Nom | Valeur | Usage |
|-----|--------|-------|
| `mobile` | `475px` | Petit mobile |
| `xxl` | `1800px` | Grand ecran |
| `3xl` | `2100px` | Tres grand ecran |

---

## Styles globaux (`app/globals.css`)

### Classes de layout reutilisables

- `.padding-x` : `px-5 md:px-10`
- `.padding-x-lg` : `px-5 md:px-20`
- `.section-padding` : Padding et margin-top responsives
- `.grid-2-cols`, `.grid-3-cols`, `.grid-4-cols` : Grilles responsives

### Animations CSS

- `wordSlider` : Rotation de mots dans le hero (21s, 8 keyframes)
- `marquee` : Defilement des logos (60s)

### Effets visuels

- Gradient border anime (conic-gradient) sur les cartes
- Effet `.glow` : blur + saturate sur les bordures
- `.gradient-line` : Degrade multicolore pour la timeline
- `.gradient-edge` : Fondu lateral pour le marquee

### Input styling important

Les inputs utilisent `font-size: 16px` pour eviter le zoom automatique sur iOS.

---

## Types TypeScript (`env.d.ts`)

Toutes les interfaces sont definies dans `env.d.ts` a la racine :

- **Composants** : `ButtonProps`, `ButtonProjectProps`, `TitleHeaderProps`, `GlowCardProps`, `ModelType`
- **Donnees** : `LogoIconType`, `CardType`, `ProjectType`, `WordType`, `AbilityType`, `ExpCardType`
- **Traductions** : `NavTranslations`, `HeroTranslations`, `SliderTranslations`, `ShowcaseTranslations`, `ProjectTranslations`, `SkillsTranslations`, `ExperienceTranslations`, `TechStackTranslations`, `ContactTranslations`, `ProjectPageTranslations`, `Translations`
- **Context** : `Language`, `LanguageContextType`, `UseTranslationReturn`

---

## Donnees centralisees (`constants/index.ts`)

Ce fichier de 1141 lignes contient toutes les donnees du site :

| Export | Description | Bilingue |
|--------|------------|----------|
| `navLinks` | Liens de navigation (5 items) | Oui |
| `translations` | Tous les textes de l'interface | Oui |
| `words` | Mots rotatifs du hero (8 items) | Oui |
| `counterItems` | Compteurs statistiques (3 items) | Non |
| `logoIconsList` | Logos tech pour le marquee (22 items) | Non |
| `abilities` | Cartes de competences (3 items) | Oui |
| `expCards` | Cartes d'experience (3 items) | Oui |
| `techStackImgs` | Images du tech stack (5 items) | Oui |
| `techStackIcons` | Modeles 3D tech stack (5 items) | Oui |
| `expLogos` | Logos des entreprises (3 items) | Non |
| `projects` | Donnees des projets (5 items) | Oui |
| `socialImgs` | Liens reseaux sociaux (1 actif : LinkedIn) | Non |
| `projectDetailsCards` | Details techniques des projets (5 x 3 cartes) | Oui |
| `testimonials` | Temoignages clients (6 items, inactif) | Non |

---

## Elements desactives / commentes

- **Section Testimonials** : Commentee dans `app/page.tsx`. Les donnees existent dans `constants/index.ts` (6 temoignages). Pour reactiver : decommenter `<Testimonials />` dans `page.tsx`.
- **Reseaux sociaux** : Instagram, Facebook, X sont commentes dans `socialImgs`. Seul LinkedIn est actif. Pour reactiver : decommenter les entrees dans `constants/index.ts`.
- **Python Developer** : Le modele 3D Python est commente dans `techStackIcons`. Le fichier `python-transformed.glb` existe dans `/public/models/`.

---

## Scripts npm

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Linting ESLint |

---

## Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `SMTP_USER` | Adresse email SMTP (expediteur et destinataire) |
| `SMTP_PASSWORD` | Mot de passe SMTP |

---

## Dependances principales

| Package | Version | Utilite |
|---------|---------|--------|
| `next` | ^16.1.6 | Framework React SSR/SSG |
| `react` | ^19.0.0 | Librairie UI |
| `three` | ^0.176.0 | Moteur 3D |
| `@react-three/drei` | ^10.0.8 | Helpers Three.js pour React |
| `@react-three/postprocessing` | ^3.0.4 | Effets visuels 3D (bloom) |
| `gsap` | ^3.13.0 | Animations professionnelles |
| `@gsap/react` | ^2.1.2 | Hook useGSAP pour React |
| `lenis` | ^1.3.4 | Smooth scroll |
| `swiper` | ^11.2.8 | Carrousel tactile |
| `lottie-react` | ^2.4.1 | Animations vectorielles |
| `react-countup` | ^6.5.3 | Compteurs animes |
| `react-intersection-observer` | ^9.16.0 | Detection de scroll |
| `react-responsive` | ^10.0.1 | Breakpoints responsive |
| `nodemailer` | ^8.0.0 | Envoi d'emails |
| `tailwindcss` | ^3.4.1 | Framework CSS utilitaire |
| `typescript` | ^5.8.3 | Typage statique |

---

## Ajouter un nouveau projet

1. **Images** : Ajouter les screenshots dans `/public/images/` et le logo dans `/public/images/logos/`
2. **Donnees** : Dans `constants/index.ts` :
   - Ajouter une entree dans `projects.en` et `projects.fr` avec : `slug`, `title`, `description`, `image`, `bg`, `techLogos[]`, `link`
   - Ajouter une entree dans `projectDetailsCards.en` et `projectDetailsCards.fr` avec 3 cartes de details
   - Ajouter les traductions dans `translations.en.projects` et `translations.fr.projects`
3. **Sitemap** : Ajouter le slug dans `app/sitemap.ts`
4. **Slider** : Ajouter une image dans `components/models/MaterialUiSlider/images/` et une entree dans le tableau `slides` de `Slider.tsx`
5. **Types** : Mettre a jour `ProjectsTranslations` dans `env.d.ts` si necessaire

---

## Ajouter une nouvelle section

1. Creer le composant dans `/sections/NouvelleSection.tsx`
2. L'importer et l'ajouter dans `app/page.tsx` a la position souhaitee
3. Ajouter les traductions dans `constants/index.ts` (en + fr)
4. Mettre a jour les interfaces dans `env.d.ts`
5. Si navigation necessaire : ajouter un lien dans `navLinks` de `constants/index.ts`
