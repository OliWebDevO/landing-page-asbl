# Oliver Van Droogenbroeck - Portfolio Web 3D

## Un site portfolio nouvelle generation

Ce site est un portfolio professionnel concu pour presenter le travail et les competences d'Oliver Van Droogenbroeck, developpeur web freelance base en Belgique. Il se distingue par son approche immersive, combinant des elements 3D interactifs, des animations fluides et un design moderne au service d'une experience utilisateur memorable.

---

## Points forts du site

### Experience 3D immersive

Le site integre des scenes 3D interactives directement dans le navigateur. La section hero presente une maquette de bureau en 3D que le visiteur peut faire pivoter, accompagnee de particules animees et d'un eclairage cinematographique. La section contact affiche un ordinateur vintage en 3D, renforce par un eclairage chaleureux. Les icones de technologies sont egalement des modeles 3D interactifs avec un effet de flottement.

### Animations professionnelles

Chaque section du site est animee grace a la bibliotheque GSAP (GreenSock Animation Platform), le standard de l'industrie pour les animations web haut de gamme. Les elements apparaissent progressivement au scroll, les cartes glissent dans le viewport, et la timeline d'experience se reduit au fur et a mesure que l'utilisateur descend. Un preloader anime (Lottie) accueille le visiteur lors de sa premiere visite.

### Bilingue francais / anglais

Le site est integralement disponible en francais et en anglais. Un bouton de bascule EN/FR est present dans la barre de navigation, et la langue est detectee automatiquement a la premiere visite en fonction du navigateur. Le choix de langue est memorise pour les visites suivantes.

### Design responsive

Le site s'adapte parfaitement a toutes les tailles d'ecran : mobile, tablette, ordinateur portable et grands ecrans (jusqu'a 3xl / 2100px). Sur mobile, les scenes 3D sont remplacees par des images statiques optimisees pour garantir des performances fluides.

### Defilement fluide (Smooth Scroll)

L'experience de navigation est enrichie par un defilement fluide et naturel grace a la bibliotheque Lenis, synchronisee avec les animations GSAP pour un rendu parfaitement coordonne.

---

## Sections du site

### Hero
Section d'accueil avec un titre anime, une description du developpeur, un carrousel de mots rotatifs (Ideas, Concepts, Designs, Code) accompagnes d'icones, et une scene 3D interactive en arriere-plan.

### Slider de projets
Carrousel interactif avec un effet de carte "Material" (transition 3D). Permet de parcourir les 5 projets principaux avec navigation par fleches. Un clic sur un projet ouvre sa page dediee.

### Vitrine de projets (Showcase)
Grille de projets en deux colonnes avec effet de survol : les logos des technologies utilisees apparaissent au passage de la souris. Chaque carte est un lien vers la page detail du projet.

### Competences (Logo Section)
Bandeau defilant de logos technologiques avec defilement infini et possibilite de glisser-deposer. Technologies affichees : Next.js, React, Tailwind, Node.js, PostgreSQL, Three.js, Git, HTML, CSS, JavaScript, Python, SQL.

### Points forts (Feature Cards)
Trois cartes avec effet de lueur dynamique qui suit le curseur. Mettent en avant : la qualite du travail, la communication fiable et le respect des delais.

### Experience professionnelle
Timeline verticale animee avec trois periodes : developpeur freelance (2024-2025), formation DigitalCity (2023-2024), et experiences internationales en Australie (2019-2022). Chaque carte contient un descriptif detaille et la liste des responsabilites.

### Tech Stack
Grille de cartes 3D interactives representant les domaines de competences : Frontend, Backend, Developpement Interactif, Gestion de Projet. Chaque carte affiche un modele 3D flottant de la technologie associee.

### Contact
Formulaire de contact fonctionnel avec envoi d'email (nom, email, message). Protection anti-spam (honeypot). Popup de confirmation bilingue apres envoi. Scene 3D d'un ordinateur vintage a cote du formulaire.

### Footer
Liens vers les reseaux sociaux (LinkedIn actif) et mention de copyright dynamique.

### Pages projet individuelles
Chaque projet dispose de sa propre page (`/projects/[slug]`) avec un hero dedie, une section de details techniques en 3 cartes, et un lien vers le projet en ligne.

---

## Projets presentes

| Projet | Type | Technologies | Lien |
|--------|------|-------------|------|
| BookWise | Systeme de gestion de bibliotheque | Next.js, React, Node, PostgreSQL | university-library-v2-nu.vercel.app |
| Art Gallery | Reseau social pour artistes | React, Node, SQL | GitHub |
| Portfolio | Site portfolio personnel | Next.js, React, Node, Tailwind | olivervdb.com |
| Le Noyer | Site de centre medical | HTML, CSS, JS, WordPress | lenoyer.be |
| Annick Van Endert | Site d'artiste | HTML, CSS, JS, WordPress | annickvanendert.com |

---

## Optimisations et bonnes pratiques

- **SEO complet** : metadonnees Open Graph, Twitter Cards, donnees structurees JSON-LD (Person, WebSite, ProfessionalService), sitemap XML et robots.txt
- **Performance** : images optimisees en AVIF/WebP, modeles 3D compresses (GLB), preload des ressources critiques, generation statique des pages projet
- **Securite** : en-tetes HTTP stricts (HSTS, X-Frame-Options, CSP), protection anti-spam sur le formulaire de contact
- **Accessibilite** : pas de zoom automatique sur iOS pour les champs de formulaire, barre de statut adaptee, viewport dynamique (dvh/dvw)

---

## Stack technologique

| Categorie | Technologies |
|-----------|-------------|
| Framework | Next.js 16, React 19, TypeScript |
| Styles | Tailwind CSS, PostCSS |
| 3D | Three.js, React Three Fiber, React Three Drei |
| Animations | GSAP, Lottie, React CountUp |
| UI | Swiper.js, Lenis (smooth scroll) |
| Backend | Nodemailer (envoi d'emails via SMTP) |
| Deploiement | Compatible Vercel |

---

## Informations de contact

- **Site** : olivervdb.com
- **Email** : contact@olivervdb.com
- **LinkedIn** : linkedin.com/in/oliver-van-droogenbroeck-44b699151
