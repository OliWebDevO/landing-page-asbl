
const navLinks = {
  en: [
    { name: "Work", link: "#work" },
    { name: "Skills", link: "#skills" },
    { name: "Experience", link: "#experience" },
    { name: "Tech Stack", link: "#techstack" },
    { name: "Contact", link: "#contact" },
  ],
  fr: [
    { name: "Projets", link: "#work" },
    { name: "Compétences", link: "#skills" },
    { name: "Expérience", link: "#experience" },
    { name: "Tech Stack", link: "#techstack" },
    { name: "Contact", link: "#contact" },
  ]
};

const homeNavLinks = {
  en: [
    { name: "Work", link: "#work" },
    { name: "Services", link: "#services" },
    { name: "Products", link: "#products" },
    { name: "Steps", link: "#process" },
    { name: "FAQ", link: "#faq" },
    { name: "Contact", link: "#contact" },
  ],
  fr: [
    { name: "Projets", link: "#work" },
    { name: "Services", link: "#services" },
    { name: "Produits", link: "#products" },
    { name: "Étapes", link: "#process" },
    { name: "FAQ", link: "#faq" },
    { name: "Contact", link: "#contact" },
  ]
};

const serviceKeywords = {
  en: ["Consulting", "Digital Strategy", "Visual Identity", "Design", "Animation", "Development", "Process Automation"],
  fr: ["Conseil", "Stratégie Digitale", "Identité Visuelle", "Design", "Animation", "Développement", "Automatisation de Processus"],
};

const homeAbilities = {
  en: [
    {
      imgPath: "/images/services/tailored.svg",
      title: "Tailored to You",
      desc: "Every line of code is written for you. Design, features, performance : all crafted to meet your goals.",
    },
    {
      imgPath: "/images/services/partnership.svg",
      title: "Transparent Partnership",
      desc: "Every decision is made together. You always know where your project stands, no surprises.",
    },
    {
      imgPath: "/images/services/results.svg",
      title: "Results That Last",
      desc: "Your site performs from day one. Fast, optimized and built to adapt as you grow.",
    },
  ],
  fr: [
    {
      imgPath: "/images/services/tailored.svg",
      title: "Réalisation sur mesure",
      desc: "Chaque ligne de code est écrite pour vous. Design, fonctionnalités, performance : tout est pensé pour répondre à vos objectifs.",
    },
    {
      imgPath: "/images/services/partnership.svg",
      title: "Partenariat transparent",
      desc: "Chaque décision est prise ensemble. Vous savez toujours où en est votre projet, sans surprises.",
    },
    {
      imgPath: "/images/services/results.svg",
      title: "Résultats durables",
      desc: "Votre site performe dès le premier jour. Rapide, optimisé et construit pour s'adapter à mesure que vous grandissez.",
    },
  ],
};

const processSteps = {
  en: [
    {
      number: 1,
      title: "Initial Contact",
      shortTitle: "Contact",
      review: "Everything starts with a conversation. We discuss your project, your goals, and the vision you have in mind so I can fully understand what you need.",
      checkpoints: [
        "Call or meeting to discuss your project",
        "Analysis of your needs, target audience and objectives",
        "First recommendations on the best approach",
        "A clear plan to move forward together",
      ],
    },
    {
      number: 2,
      title: "Proposal & Quote",
      shortTitle: "Quote",
      review: "Based on our exchange, I put together a detailed proposal that outlines the approach, timeline, and pricing — no surprises, everything transparent from day one.",
      checkpoints: [
        "Every aspect of the project is defined and validated together",
        "Clear timeline with key milestones",
        "Transparent pricing, no hidden costs",
        "Adjustments until the plan fits perfectly",
      ],
    },
    {
      number: 3,
      title: "Design & Mockup",
      shortTitle: "Design",
      review: "Before writing a single line of code, we shape the visual identity of your project together. You see and approve every design before development starts.",
      checkpoints: [
        "Clear architecture and intuitive navigation",
        "A design that reflects your identity and values",
        "Feedback rounds until the design feels right",
        "Final sign-off before moving to development",
      ],
    },
    {
      number: 4,
      title: "Development",
      shortTitle: "Development",
      review: "Your project comes to life. I build it with modern, reliable technologies and keep you in the loop with regular demos so nothing comes as a surprise.",
      checkpoints: [
        "Built with the latest web technologies",
        "Development in phases with regular check-ins",
        "Live demos so you can follow the progress",
        "Clean, maintainable code for the long run",
      ],
    },
    {
      number: 5,
      title: "Testing & Revisions",
      shortTitle: "Testing",
      review: "Every detail is tested — performance, responsiveness, SEO. Your feedback is actively integrated to make sure the result matches your expectations.",
      checkpoints: [
        "Cross-browser and cross-device testing",
        "Performance optimization and SEO audit",
        "Your revision requests applied and validated",
        "Final review before launch",
      ],
    },
    {
      number: 6,
      title: "Deployment",
      shortTitle: "Deployment",
      review: "Your site goes live. I handle the full deployment process so you can focus on what matters — your business.",
      checkpoints: [
        "Deployment and domain/hosting setup",
        "SSL certificate and security configuration",
        "Performance checks in production",
        "Training on how to manage your content",
      ],
    },
    {
      number: 7,
      title: "Follow-Up",
      shortTitle: "Follow-Up",
      review: "It doesn't stop at launch. I stay available to make sure everything runs smoothly and to support your future needs.",
      checkpoints: [
        "Post-launch support for peace of mind",
        "Bug fixes and adjustments included",
        "Available for future updates and evolution",
        "Long-term partnership mindset",
      ],
    },
  ],
  fr: [
    {
      number: 1,
      title: "Prise de Contact",
      shortTitle: "Contact",
      review: "Tout commence par une conversation. On discute de votre projet, de vos objectifs et de la vision que vous avez en tête pour que je comprenne exactement ce dont vous avez besoin.",
      checkpoints: [
        "Appel ou rencontre pour discuter du projet",
        "Analyse de vos besoins, cible et objectifs",
        "Premières recommandations sur la meilleure approche",
        "Un plan précis pour avancer ensemble",
      ],
    },
    {
      number: 2,
      title: "Proposition & Devis",
      shortTitle: "Devis",
      review: "Sur base de notre échange, je prépare une proposition détaillée avec l'approche, le planning et le tarif — pas de surprises, tout est transparent dès le départ.",
      checkpoints: [
        "Chaque aspect du projet est défini et validé ensemble",
        "Planning clair avec jalons clés",
        "Tarification transparente, pas de coûts cachés",
        "Ajustements jusqu'à ce que le plan soit parfait",
      ],
    },
    {
      number: 3,
      title: "Design & Maquette",
      shortTitle: "Design",
      review: "Avant d'écrire la moindre ligne de code, on construit ensemble l'identité visuelle de votre projet. Vous voyez et validez chaque design avant le développement.",
      checkpoints: [
        "Architecture claire et navigation intuitive",
        "Un design qui reflète votre identité et vos valeurs",
        "Allers-retours jusqu'à ce que le design vous convienne",
        "Validation finale avant de passer au développement",
      ],
    },
    {
      number: 4,
      title: "Développement",
      shortTitle: "Création",
      review: "Votre projet prend vie. Je le construis avec des technologies modernes et fiables, et je vous tiens informé avec des démos régulières pour que rien ne soit une surprise.",
      checkpoints: [
        "Construit avec les dernières technologies web",
        "Développement par phases avec points réguliers",
        "Démos en direct pour suivre l'avancement",
        "Code propre et maintenable sur le long terme",
      ],
    },
    {
      number: 5,
      title: "Tests & Révisions",
      shortTitle: "Tests",
      review: "Chaque détail est testé — performance, responsive, SEO. Vos retours sont activement intégrés pour que le résultat corresponde parfaitement à vos attentes.",
      checkpoints: [
        "Tests multi-navigateurs et multi-appareils",
        "Optimisation des performances et audit SEO",
        "Vos demandes de révision appliquées et validées",
        "Revue finale avant la mise en ligne",
      ],
    },
    {
      number: 6,
      title: "Déploiement",
      shortTitle: "Déploiement",
      review: "Votre site est en ligne. Je gère le déploiement complet pour que vous puissiez vous concentrer sur l'essentiel — votre activité.",
      checkpoints: [
        "Configuration domaine et hébergement",
        "Certificat SSL et configuration sécurité",
        "Vérifications de performance en production",
        "Formation à la gestion de votre contenu",
      ],
    },
    {
      number: 7,
      title: "Suivi",
      shortTitle: "Suivi",
      review: "Ça ne s'arrête pas au lancement. Je reste disponible pour m'assurer que tout fonctionne parfaitement et vous accompagner dans vos besoins futurs.",
      checkpoints: [
        "Support post-lancement pour votre tranquillité",
        "Corrections et ajustements inclus",
        "Disponible pour les mises à jour et évolutions",
        "Partenariat sur le long terme",
      ],
    },
  ],
};

const productCards = {
  en: [
    {
      title: "Showcase Website",
      description: "A professional online presence with WordPress admin so you can manage your content independently.",
      features: ["Custom Design", "WordPress CMS", "SEO Optimized", "Responsive"],
      imgPath: "/images/products/showcase.svg",
    },
    {
      title: "Interactive Platform",
      description: "Dynamic web applications with advanced features: member areas, bookings, payments.",
      features: ["Custom Features", "User Accounts", "API Integrations", "Interactive UI"],
      imgPath: "/images/products/platform.svg",
    },
    {
      title: "Management App",
      description: "Custom-built tools to optimize your operations and workflows.",
      features: ["Dashboard", "Role-Based Access", "Data Management", "Automation"],
      imgPath: "/images/products/management.svg",
    },
  ],
  fr: [
    {
      title: "Site Vitrine",
      description: "Présence en ligne professionnelle avec WordPress admin pour gérer le contenu en autonomie.",
      features: ["Design sur mesure", "CMS WordPress", "Optimisé SEO", "Responsive"],
      imgPath: "/images/products/showcase.svg",
    },
    {
      title: "Plateforme Interactive",
      description: "Applications web dynamiques avec fonctionnalités avancées : espace membre, réservations, paiement.",
      features: ["Fonctionnalités sur mesure", "Comptes utilisateurs", "Intégrations API", "Interface interactive"],
      imgPath: "/images/products/platform.svg",
    },
    {
      title: "Application de Gestion",
      description: "Outils sur mesure pour optimiser opérations et flux de travail.",
      features: ["Tableau de bord", "Accès par rôles", "Gestion de données", "Automatisation"],
      imgPath: "/images/products/management.svg",
    },
  ],
};

const translations = {
  en: {
    nav: {
      contact: "Contact"
    },
    hero: {
      shaping: "Shapping",
      intoRealProjects: "into concrete solutions",
      deliverResults: "",
      description: "Based in Brussels, I turn your ideas into striking showcase websites, interactive web platforms or full-featured management apps, designed to simplify your day-to-day.",
      buttonText: "See My Work",
      buttonTextMobile: "Contact Me"
    },
    cta: {
      create: "Let's build together",
      contact: "Contact me",
    },
    slider: {
      title: "Projects",
      subtitle: "Quick Dive into the projects"
    },
    showcase: {
      title: "Explore the details of each project",
      subtitle: "Take a deeper dive"
    },
    projects: {
      lesarts: {
        title: "LESARTS : Bold showcase site for a custom framing atelier & art gallery",
        description: "An audacious, animation-rich showcase for a Brussels framing workshop and gallery"
      },
      "ovni-compta": {
        title: "OVNI Compta : Custom accounting app for a Belgian NGO",
        description: "A tailor-made web app to manage finances, members, and projects"
      },
      fanal: {
        title: "Le Fanal des Chats : Custom platform for an animal shelter",
        description: "A full-featured WordPress platform with quizzes, multi-step forms, blog, and online donations"
      },
      artgallery: {
        title: "Art Gallery : A social platform for artists",
        description: "A platform that allows artists to create profiles, upload their artwork, and connect with art enthusiasts."
      },
      portfolio: {
        title: "Portfolio Website",
        description: "An animated portfolio website showcasing my work."
      },
      lenoyer: {
        title: "Le Noyer : Professional website for a medical center",
        description: "A custom WordPress site built to inspire trust, inform patients, and let the team manage content autonomously"
      },
      annick: {
        title: "Annick Van Endert : Where Art Meets the Web",
        description: "A bold, immersive showcase for a Brussels-based painter, sculptor, and tattoo artist."
      }
    },
    skills: {
      title: "Skills",
      subtitle: "⚙️ My field of expertise" 
    },
    experience: {
      title: "Professional Work Experience",
      subtitle: "💼  My career Overview",
      resp: "Responsibilities"
    },
    techstack : {
      title: "Tech Stack",
      subtitle: "🛠️  My Toolbox"
    },
    contact: {
      title: "Get in Touch",
      subtitle: "📬  Let's connect",
      name: "Name",
      subject: "Subject",
      subjectPlaceholder: "Select a subject",
      scenarios: [
        "First contact",
        "Quote request",
        "Collaboration proposal",
        "Job offer",
        "Technical question",
        "Other",
      ],
      message: "Message",
      send: "Send",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successMessage: "Thank you for reaching out. I'll get back to you as soon as possible.",
      close: "Close"
    },
    projectpage: {
      visitProject: "Visit Project"
    },
    badges: {
      inDevelopment: "In Development"
    },
    home: {
      services: {
        title: "Services",
        subtitle: "💡 What I bring to the table",
      },
      process: {
        title: "Steps",
        subtitle: "🔄 How we work together",
      },
      products: {
        title: "Products",
        subtitle: "📦 What I build",
      },
      faq: {
        title: "FAQ",
        subtitle: "❓ Common questions answered",
      },
    }
  },
  fr: {
    nav: {
      contact: "Contact"
    },
    hero: {
      shaping: "Transformez vos",
      intoRealProjects: "en solutions concrètes",
      deliverResults: "",
      description: "Basé à Bruxelles, je transforme vos idées en sites vitrines percutants, plateformes web interactives ou applications de gestion complètes. Mon but : Simplifier votre quotidien.",
      buttonText: "Mes Projets",
      buttonTextMobile: "Contactez-moi"
    },
    cta: {
      create: "Créons ensemble",
      contact: "Contactez-moi",
    },
    slider: {
      title: "Projets",
      subtitle: "Aperçu rapide des projets"
    },
    showcase: {
      title: "Explorez les détails de chaque projet",
      subtitle: "Une plongée dans mes projets"
    },
    projects: {
      lesarts: {
        title: "LESARTS : Site vitrine audacieux pour un atelier d'encadrement & galerie d'art",
        description: "Une vitrine percutante et animée pour un atelier d'encadrement et une galerie bruxellois"
      },
      "ovni-compta": {
        title: "OVNI Compta : Application comptable sur mesure pour ASBL",
        description: "Une application web sur mesure pour gérer finances, membres et projets"
      },
      fanal: {
        title: "Le Fanal des Chats : Plateforme sur mesure pour un refuge animalier",
        description: "Une plateforme WordPress complète avec quiz, formulaires multi-étapes, blog et dons en ligne"
      },
      artgallery: {
        title: "Art Gallery : Plateforme sociale pour artistes",
        description: "Une plateforme qui permet aux artistes de créer des profils, télécharger leurs œuvres et se connecter avec les amateurs d'art."
      },
      portfolio: {
        title: "Site Web Portfolio",
        description: "Un site portfolio animé présentant mon travail."
      },
      lenoyer: {
        title: "Le Noyer : Site professionnel pour un centre médical",
        description: "Un site WordPress sur mesure conçu pour inspirer confiance, informer les patients et permettre une gestion autonome du contenu"
      },
      annick: {
        title: "Annick Van Endert : Quand l'art rencontre le web",
        description: "Une vitrine immersive pour une peintre, sculptrice et tatoueuse bruxelloise."
      }
    },
    skills: {
      title: "Compétences",
      subtitle: "⚙️ Mon domaine d'expertise",
    },
    experience: {
      title: "Expérience Professionnelle",
      subtitle: "💼  Mon parcours professionnel",
      resp : "Responsabilités",
    },
    techstack : {
      title: "Tech Stack",
      subtitle: "🛠️  Mes Outils"
    },
    contact : {
      title: "Contactez-moi",
      subtitle: "📬  Restons en contact",
      name: "Nom",
      subject: "Sujet",
      subjectPlaceholder: "Sélectionnez un sujet",
      scenarios: [
        "Premier contact",
        "Demande de devis",
        "Proposition de collaboration",
        "Offre d'emploi",
        "Question technique",
        "Autre",
      ],
      message: "Message",
      send: "Envoyer",
      sending: "Envoi en cours...",
      successTitle: "Message Envoyé !",
      successMessage: "Je vous répondrai dans les plus brefs délais.",
      close: "Fermer"
    },
    projectpage: {
      visitProject: "Visiter le projet"
    },
    badges: {
      inDevelopment: "En Développement"
    },
    home: {
      services: {
        title: "Services",
        subtitle: "💡 Ce que j'apporte",
      },
      process: {
        title: "Étapes",
        subtitle: "🔄 Comment on travaille ensemble",
      },
      products: {
        title: "Produits",
        subtitle: "📦 Ce que je construis",
      },
      faq: {
        title: "FAQ",
        subtitle: "❓ Questions fréquentes",
      },
    }
  },
};

const faqItems = {
  en: [
    {
      category: "Initial Contact",
      items: [
        { question: "How does the first contact work?", answer: "We start with a call or an in-person meeting, with no commitment. The goal is to understand your project, your objectives and your constraints. From there, I give you an initial overview of what's feasible, the timeline and an approximate budget." },
        { question: "I don't have a clear idea yet, can you still help?", answer: "Of course. Most projects start with a vague idea. We take the time to analyze your business, your target audience and your goals to define together the most suitable solution, whether it's a showcase site, a platform or something else." },
        { question: "What's the difference between a showcase site, an interactive platform and a management app?", answer: "A showcase site highlights your business, services and achievements. It's designed to inform, build trust and convert visitors into clients. An interactive platform goes further by integrating features like a member area, a booking system, advanced forms or an e-commerce section. A management app is a custom-built tool, often internal, designed to automate and simplify your processes: order tracking, inventory management, dashboards, etc." },
      ],
    },
    {
      category: "Proposal & Quote",
      items: [
        { question: "How is the price calculated?", answer: "The price is based on the number of pages, the features requested, the level of customization and the estimated development time. You receive a detailed line-by-line quote before committing, with no surprises or hidden fees along the way." },
        { question: "Do I need to pay everything upfront?", answer: "No. Payment is split into two parts: a deposit when the project starts, then the balance upon final delivery. No intermediate payments, no surprises. You only pay the rest once the result meets your expectations." },
      ],
    },
    {
      category: "Design & Mockup",
      items: [
        { question: "Do I see the design before development?", answer: "Yes, always. I create several design proposals based on your needs, and we choose together the direction that suits you best. Nothing is developed until the visual result is approved. You stay involved throughout the entire process." },
        { question: "Is everything custom or do you use templates?", answer: "It depends on the project and your needs. Sometimes we start from scratch, sometimes we use an existing base to move faster. Either way, everything is fully customized to match your branding, colors and identity. The end result is always unique." },
        { question: "What if I don't like the design?", answer: "We adjust. Each phase includes revisions: you share your feedback, I make the changes, and we repeat until the result matches exactly what you had in mind. There's no strict limit on back-and-forth." },
      ],
    },
    {
      category: "Development",
      items: [
        { question: "How long does development take?", answer: "A showcase site typically takes between 2 and 8 weeks. An interactive platform or management app, depending on its complexity, can range from 1 to 4 months. Exact timelines depend on the number of pages, features and how quickly feedback is provided during approvals." },
        { question: "Can I follow the progress?", answer: "Yes. You receive regular demos with a preview link to see the project in real conditions. We check in at every key milestone to make sure we stay aligned with your expectations." },
      ],
    },
    {
      category: "Testing & Revisions",
      items: [
        { question: "How many revisions are included?", answer: "Each phase of the project (wireframes, mockups, development) includes multiple revision rounds. The goal isn't to count back-and-forth, but to make sure the final result truly matches your expectations before moving to the next step." },
        { question: "Will my site be mobile and SEO optimized?", answer: "Yes. Every project is built with responsive design to adapt to all screens: mobile, tablet and desktop. On the SEO side, site structure, meta tags, loading speed and best practices are integrated from the start for strong organic search rankings." },
      ],
    },
    {
      category: "Deployment",
      items: [
        { question: "Who handles hosting and domain?", answer: "I handle everything from A to Z: choosing the right hosting for your project, configuring the domain name, installing the SSL certificate (for https) and deploying to production. You don't need to set up anything on your end." },
        { question: "Can I update the content myself?", answer: "Yes. Depending on the project, you'll have access to a CMS like WordPress with custom fields, or a tailored admin interface. I also train you on how to use it so you can update your texts, images and content on your own." },
      ],
    },
    {
      category: "Follow-Up",
      items: [
        { question: "What happens after launch?", answer: "I stay available after launch to fix any bugs, make adjustments and answer your questions. If you need regular updates or new features over time, we can set up a monthly support plan tailored to your needs." },
        { question: "Can features be added later?", answer: "Yes. The code is structured in a clean and modular way from the start, which makes it easy to add new pages, features or integrations without rebuilding everything. Your project can grow alongside your business." },
        { question: "Is my data secure?", answer: "Yes. Every project follows security best practices: SSL certificate, protection against common attacks (injections, XSS), access management and backups. If your project handles sensitive data, additional measures are put in place." },
      ],
    },
  ],
  fr: [
    {
      category: "Prise de contact",
      items: [
        { question: "Comment se passe le premier contact ?", answer: "On commence par un échange par appel ou en personne, sans engagement. L'idée est de comprendre votre projet, vos objectifs et vos contraintes. À partir de là, je vous donne une première orientation sur ce qui est faisable, les délais et le budget approximatif." },
        { question: "Je n'ai pas d'idée précise, vous pouvez quand même m'aider ?", answer: "Bien sûr. La plupart des projets commencent avec une idée vague. On prend le temps d'analyser votre activité, votre public cible et vos objectifs pour définir ensemble la solution la plus adaptée, que ce soit un site vitrine, une plateforme ou autre chose." },
        { question: "Quelle est la différence entre un site vitrine, une plateforme interactive et une app de gestion ?", answer: "Un site vitrine met en avant votre activité, vos services et vos réalisations. Il sert à informer, rassurer et convertir vos visiteurs en clients. Une plateforme interactive va plus loin en intégrant des fonctionnalités comme un espace membre, un système de réservation, un formulaire avancé ou un espace e-commerce. Une app de gestion est un outil sur mesure, souvent interne, conçu pour automatiser et simplifier vos processus : suivi de commandes, gestion de stocks, tableaux de bord, etc." },
      ],
    },
    {
      category: "Proposition & Devis",
      items: [
        { question: "Comment est calculé le prix ?", answer: "Le prix est basé sur le nombre de pages, les fonctionnalités demandées, le niveau de personnalisation et le temps de développement estimé. Vous recevez un devis détaillé ligne par ligne avant de vous engager, sans surprise ni frais cachés en cours de route." },
        { question: "Faut-il payer tout d'avance ?", answer: "Non. Le paiement se fait en deux temps : un acompte au démarrage du projet, puis le solde à la livraison finale. Pas de paiements intermédiaires, pas de surprises. Vous ne réglez le reste que lorsque le résultat vous convient." },
      ],
    },
    {
      category: "Design & Maquette",
      items: [
        { question: "Est-ce que je vois le design avant le développement ?", answer: "Oui, toujours. Je crée plusieurs propositions de design en fonction de vos besoins, et on choisit ensemble la direction qui vous correspond le mieux. Rien n'est développé tant que le rendu visuel n'est pas validé. Vous restez impliqué tout au long du processus." },
        { question: "Tout est sur mesure ou vous utilisez des templates ?", answer: "Ça dépend du projet et de vos besoins. Parfois on part de zéro, parfois on s'appuie sur une base existante pour aller plus vite. Dans tous les cas, tout est modifié et adapté pour correspondre à votre image, vos couleurs et votre identité. Le résultat final est toujours unique." },
        { question: "Et si le design ne me convient pas ?", answer: "On ajuste. Chaque phase inclut des révisions : vous donnez vos retours, je modifie, et on recommence jusqu'à ce que le résultat corresponde exactement à ce que vous aviez en tête. Il n'y a pas de limite stricte sur les allers-retours." },
      ],
    },
    {
      category: "Développement",
      items: [
        { question: "Combien de temps dure le développement ?", answer: "Un site vitrine prend généralement entre 2 et 8 semaines. Une plateforme interactive ou une app de gestion, selon sa complexité, peut aller de 1 à 4 mois. Les délais exacts dépendent du nombre de pages, des fonctionnalités et de la rapidité des retours lors des validations." },
        { question: "Est-ce que je peux suivre l'avancement ?", answer: "Oui. Vous recevez des démos régulières avec un lien de prévisualisation pour voir le projet en conditions réelles. On fait un point à chaque étape clé pour s'assurer qu'on reste alignés sur vos attentes." },
      ],
    },
    {
      category: "Tests & Révisions",
      items: [
        { question: "Combien de révisions sont incluses ?", answer: "Chaque phase du projet (wireframes, maquettes, développement) inclut plusieurs tours de révisions. L'objectif n'est pas de compter les allers-retours, mais de s'assurer que le résultat final correspond vraiment à vos attentes avant de passer à l'étape suivante." },
        { question: "Mon site sera-t-il optimisé pour le mobile et le SEO ?", answer: "Oui. Chaque projet est conçu en responsive design pour s'adapter à tous les écrans : mobile, tablette et desktop. Côté SEO, la structure du site, les balises, la vitesse de chargement et les bonnes pratiques sont intégrées dès le départ pour un bon référencement naturel." },
      ],
    },
    {
      category: "Déploiement",
      items: [
        { question: "Qui s'occupe de l'hébergement et du nom de domaine ?", answer: "Je gère tout de A à Z : choix de l'hébergeur adapté à votre projet, configuration du nom de domaine, installation du certificat SSL (pour le https) et déploiement en production. Vous n'avez rien à configurer de votre côté." },
        { question: "Est-ce que je pourrai modifier le contenu moi-même ?", answer: "Oui. Selon le projet, vous aurez accès à un CMS comme WordPress avec des champs personnalisés, ou une interface d'administration sur mesure. Je vous forme à l'utilisation pour que vous puissiez modifier vos textes, images et contenus en toute autonomie." },
      ],
    },
    {
      category: "Suivi",
      items: [
        { question: "Que se passe-t-il après la mise en ligne ?", answer: "Je reste disponible après le lancement pour corriger d'éventuels bugs, faire des ajustements et répondre à vos questions. Si vous avez besoin de mises à jour régulières ou d'évolutions, on peut mettre en place un suivi mensuel adapté à vos besoins." },
        { question: "Peut-on ajouter des fonctionnalités plus tard ?", answer: "Oui. Le code est structuré de manière propre et modulaire dès le départ, ce qui permet d'ajouter de nouvelles pages, fonctionnalités ou intégrations sans devoir tout reconstruire. Votre projet peut évoluer avec votre activité." },
        { question: "Mes données sont-elles sécurisées ?", answer: "Oui. Chaque projet intègre les bonnes pratiques de sécurité : certificat SSL, protection contre les attaques courantes (injections, XSS), gestion des accès et sauvegardes. Si votre projet traite des données sensibles, des mesures supplémentaires sont mises en place." },
      ],
    },
  ],
};

const words = {
  en: [
    { id: 1, text: "Ideas", imgPath: "/images/ideas.svg", color: "#c4b5fd", gradientFrom: "#c9b8fd", gradientTo: "#5f3ea6" },
    { id: 2, text: "Concepts", imgPath: "/images/concepts.svg", color: "#f9a8d4", gradientFrom: "#f49bc8", gradientTo: "#a63868" },
    { id: 3, text: "Designs", imgPath: "/images/designs.svg", color: "#93c5fd", gradientFrom: "#96c4f7", gradientTo: "#326298" },
    { id: 4, text: "Projects", imgPath: "/images/ideas.svg", color: "#c4b5fd", gradientFrom: "#c9b8fd", gradientTo: "#5f3ea6" },
    { id: 5, text: "Creations", imgPath: "/images/concepts.svg", color: "#f9a8d4", gradientFrom: "#f49bc8", gradientTo: "#a63868" },
  ],
  fr: [
    { id: 1, text: "Idées", imgPath: "/images/ideas.svg", color: "#c4b5fd", gradientFrom: "#c9b8fd", gradientTo: "#5f3ea6" },
    { id: 2, text: "Concepts", imgPath: "/images/concepts.svg", color: "#f9a8d4", gradientFrom: "#f49bc8", gradientTo: "#a63868" },
    { id: 3, text: "Designs", imgPath: "/images/designs.svg", color: "#93c5fd", gradientFrom: "#96c4f7", gradientTo: "#326298" },
    { id: 4, text: "Projets", imgPath: "/images/ideas.svg", color: "#c4b5fd", gradientFrom: "#c9b8fd", gradientTo: "#5f3ea6" },
    { id: 5, text: "Créations", imgPath: "/images/concepts.svg", color: "#f9a8d4", gradientFrom: "#f49bc8", gradientTo: "#a63868" },
  ]
};

const counterItems = [
  { value: 1, suffix: "+", label: "Year of Experience" },
  { value: 10, suffix: "+", label: "Completed Projects" },
  { value: 10, suffix: "+", label: "Satisfied Clients" },
//   { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    id: 1,
    imgPath: "/images/logos/nextjs.webp",
  },
  {
    id: 2,
    imgPath: "/images/logos/react.webp",
  },
  {
    id: 3,
    imgPath: "/images/logos/tailwind.webp",
  },
  {
    id: 4,
    imgPath: "/images/logos/node.webp",
  },
  {
    id: 5,
    imgPath: "/images/logos/sql.webp",
  },
  {
    id: 6,
    imgPath: "/images/logos/postgresql.webp",
  },
  {
    id: 7,
    imgPath: "/images/logos/three.webp",
  },
  {
    id: 8,
    imgPath: "/images/logos/git.svg",
  },
  {
    id: 9,
    imgPath: "/images/logos/html.webp",
  },
  {
    id: 10, 
    imgPath: "/images/logos/css.webp",
  },
  {
    id: 11,
    imgPath: "/images/logos/js.webp",
  },
  {
    id: 12,
    imgPath: "/images/logos/nextjs.webp",
  },
  {
    id: 13, 
    imgPath: "/images/logos/react.webp",
  },
  {
    id: 14,
    imgPath: "/images/logos/tailwind.webp",
  },
  {
    id: 15,
    imgPath: "/images/logos/node.webp",
  },
  {
    id: 16,
    imgPath: "/images/logos/sql.webp",
  },
  {
    id: 17,
    imgPath: "/images/logos/postgresql.webp",
  },
  {
    id: 18,
    imgPath: "/images/logos/three.webp",
  },
  {
    id: 19,
    imgPath: "/images/logos/git.svg",
  },
  {
    id: 20,
    imgPath: "/images/logos/html.webp",
  },
  {
    id: 21,
    imgPath: "/images/logos/css.webp",
  },
  {
    id: 22,
    imgPath: "/images/logos/js.webp",
  },
];

const abilities = {
  en: [
    {
      imgPath: "/images/seo.webp",
      title: "Quality Focus",
      desc: "Delivering high-quality results while maintaining attention to every detail.",
    },
    {
      imgPath: "/images/chat.webp",
      title: "Reliable Communication",
      desc: "Keeping you updated at every step to ensure transparency and clarity.",
    },
    {
      imgPath: "/images/time.webp",
      title: "On-Time Delivery",
      desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
    },
  ],
  fr: [
    {
      imgPath: "/images/seo.webp",
      title: "Focus Qualité",
      desc: "Livrer des résultats de haute qualité tout en maintenant l'attention sur chaque détail.",
    },
    {
      imgPath: "/images/chat.webp",
      title: "Communication Fiable",
      desc: "Vous tenir informé à chaque étape pour assurer transparence et clarté.",
    },
    {
      imgPath: "/images/time.webp",
      title: "Livraison Ponctuelle",
      desc: "S'assurer que les projets sont terminés dans les délais, avec qualité et attention aux détails.",
    },
  ]
};

const expCards = {
  en: [
    {
      review:
        "Through those projects, I have developed strong technical skills and adaptability across modern stacks. My work is composed of web apps, portfolio sites, and client platforms, always with a focus on quality and user experience.",
      imgPath: "/images/exp1.webp",
      logoPath: "/images/Asset1.webp",
      title: "Freelance Web Developer",
      date: "2024 – 2026",
      responsibilities: [
        "Built OVNI Compta, a custom accounting web app for a Belgian NGO (Next.js, React, TypeScript, Supabase, Tailwind CSS).",
        "Developed Le Fanal des Chats, a full-featured WordPress platform for an animal shelter with interactive quizzes, multi-step forms, blog, and online donations.",
        "Built and deployed client websites such as annickvanendert.com and lenoyer.be using WordPress, HTML, CSS, and JavaScript.",
        "Managed all aspects of project delivery: design translation, frontend and backend development, deployment, and client communication.",
        "Developed a personal portfolio (Next.js, React, GSAP) and Art Gallery, a full-stack social platform for artists (React, SQL, Node.js, Express, MUI5).",
      ],
    },
    {
      review:
        "During my training at DigitalCity, I built a solid foundation in frontend development, mastering modern tools and frameworks while delivering real-world projects.",
      imgPath: "/images/exp2.webp",
      logoPath: "/images/Asset2.webp",
      title: "Front End Development Training",
      date: "2023 – 2024",
      responsibilities: [
        "Produced multiple websites using HTML5, CSS, Vanilla JS, Flexbox, Grid, SASS, API management, GSAP, and React.",
        "Transcribed site designs and architecture into ready-to-use WordPress platforms.",
        "Developed a social network web app for Belgian artists using React, Node.js, and MySQL.",
      ],
    },
    {
      review:
        "My working holiday in Australia helped me foster strong soft skills and adaptability, enriching my professional and personal growth through diverse experiences.",
      imgPath: "/images/exp3.webp",
      logoPath: "/images/Asset3.webp",
      title: "Working Holiday & Soft Skills Development",
      date: "2019 – 2022",
      responsibilities: [
        "Worked various jobs across Western Australia: mining, farms, cattle stations, and more.",
        "Traveled extensively, developing autonomy, adaptability, stress management, resilience, and decision-making skills.",
        "Achieved English proficiency at C1 level.",
      ],
    },
  ],
  fr: [
    {
      review:
        "À travers ces projets, j'ai développé de solides compétences techniques et une adaptabilité à travers les stacks modernes. Mon travail est composé d'applications web, de sites portfolio et de plateformes clients, toujours avec un focus sur la qualité et l'expérience utilisateur.",
      imgPath: "/images/exp1.webp",
      logoPath: "/images/Asset1.webp",
      title: "Développeur Web Freelance",
      date: "2024 – 2026",
      responsibilities: [
        "Développement d'OVNI Compta, une application web comptable sur mesure pour une ASBL belge (Next.js, React, TypeScript, Supabase, Tailwind CSS).",
        "Développement du Fanal des Chats, une plateforme WordPress complète pour un refuge animalier avec quiz interactifs, formulaires multi-étapes, blog et dons en ligne.",
        "Construction et déploiement de sites clients tels que annickvanendert.com et lenoyer.be en utilisant WordPress, HTML, CSS et JavaScript.",
        "Gestion de tous les aspects de livraison de projet : traduction de design, développement frontend et backend, déploiement et communication client.",
        "Développement d'un portfolio personnel (Next.js, React, GSAP) et d'Art Gallery, une plateforme sociale pour artistes (React, SQL, Node.js, Express, MUI5).",
      ],
    },
    {
      review:
        "Pendant ma formation à DigitalCity, j'ai construit une base solide en développement frontend, maîtrisant les outils et frameworks modernes tout en livrant des projets concrets.",
      imgPath: "/images/exp2.webp",
      logoPath: "/images/Asset2.webp",
      title: "Formation Développement Front End",
      date: "2023 – 2024",
      responsibilities: [
        "Production de multiples sites web utilisant HTML5, CSS, Vanilla JS, Flexbox, Grid, SASS, gestion d'API, GSAP et React.",
        "Transcription de designs et architectures de sites en plateformes WordPress prêtes à l'emploi.",
        "Développement d'une application web de réseau social pour artistes belges en utilisant React, Node.js et MySQL.",
      ],
    },
    {
      review:
        "Mon working holiday en Australie m'a aidé à développer de solides soft skills et une adaptabilité, enrichissant ma croissance professionnelle et personnelle à travers diverses expériences.",
      imgPath: "/images/exp3.webp",
      logoPath: "/images/Asset3.webp",
      title: "Working Holiday & Développement des Soft Skills",
      date: "2019 – 2022",
      responsibilities: [
        "Travail dans divers emplois à travers l'Australie Occidentale : mines, fermes, stations de bétail, et plus.",
        "Voyages extensifs, développant autonomie, adaptabilité, gestion du stress, résilience et prise de décision.",
        "Atteinte d'un niveau de maîtrise de l'anglais C1.",
      ],
    },
  ]
};

const techStackImgs = {
  en: [
    {
      name: "Frontend Developer",
      imgPath: "/images/logos/react.webp",
    },
    {
      name: "Python Developer",
      imgPath: "/images/logos/python.svg",
    },
    {
      name: "Backend Developer",
      imgPath: "/images/logos/node.webp",
    },
    {
      name: "Interactive Developer",
      imgPath: "/images/logos/three.webp",
    },
    {
      name: "Project Management",
      imgPath: "/images/logos/git.svg",
    },
  ],
  fr: [
    {
      name: "Développeur Frontend",
      imgPath: "/images/logos/react.webp",
    },
    {
      name: "Développeur Python",
      imgPath: "/images/logos/python.svg",
    },
    {
      name: "Développeur Backend",
      imgPath: "/images/logos/node.webp",
    },
    {
      name: "Développeur Interactif",
      imgPath: "/images/logos/three.webp",
    },
    {
      name: "Gestion de Projet",
      imgPath: "/images/logos/git.svg",
    },
  ]
};

const techStackIcons = {
  en: [
    {
      name: "Frontend Developer",
      modelPath: "/models/react_logo-transformed.glb",
      scale: 1,
      rotation: [0, 0, 0],
    },
    // {
    //   name: "Python Developer",
    //   modelPath: "/models/python-transformed.glb",
    //   scale: 0.8,
    //   rotation: [0, 0, 0],
    // },
    {
      name: "Backend Developer",
      modelPath: "/models/node-transformed.glb",
      scale: 5,
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      name: "Interactive Developer",
      modelPath: "/models/three.js-transformed.glb",
      scale: 0.05,
      rotation: [0, 0, 0],
    },
    {
      name: "Project Management",
      modelPath: "/models/git-svg-transformed.glb",
      scale: 0.05,
      rotation: [0, -Math.PI / 4, 0],
    },
  ],
  fr: [
    {
      name: "Développeur Frontend",
      modelPath: "/models/react_logo-transformed.glb",
      scale: 1,
      rotation: [0, 0, 0],
    },
    // {
    //   name: "Développeur Python",
    //   modelPath: "/models/python-transformed.glb",
    //   scale: 0.8,
    //   rotation: [0, 0, 0],
    // },
    {
      name: "Développeur Backend",
      modelPath: "/models/node-transformed.glb",
      scale: 5,
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      name: "Développeur Interactif",
      modelPath: "/models/three.js-transformed.glb",
      scale: 0.05,
      rotation: [0, 0, 0],
    },
    {
      name: "Gestion de Projet",
      modelPath: "/models/git-svg-transformed.glb",
      scale: 0.05,
      rotation: [0, -Math.PI / 4, 0],
    },
  ]
};

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.webp",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.webp",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.webp",
  },
];

const projects = {
  en: [
    {
      slug: "fanal",
      title: "Le Fanal des Chats : Custom platform for an animal shelter",
      description: "A full-featured WordPress platform with quizzes, multi-step forms, blog, and online donations",
      image: "/images/fanal_des_chats/fanal_home.webp",
      link: "https://www.lefanaldeschats.org/",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "lenoyer",
      title: "Le Noyer : Professional website for a medical center",
      description: "A custom WordPress site built to inspire trust, inform patients, and let the team manage content autonomously",
      image: "/images/lenoyer1.webp",
      link: "https://lenoyer.be",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "white",
    },
    {
      slug: "annick",
      title: "Annick Van Endert : Where Art Meets the Web",
      description: "A bold, immersive showcase for a Brussels-based painter, sculptor, and tattoo artist.",
      image: "/images/annick1.webp",
      link: "https://annickvanendert.com",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "lesarts",
      title: "LESARTS : Bold showcase site for a custom framing atelier & art gallery",
      description: "An audacious, animation-rich showcase for a Brussels framing workshop and gallery",
      image: "/images/lesarts/lesarts_cover.webp",
      link: "https://www.versiontest.site/",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "#ece4d8",
    },
    {
      slug: "ovni-compta",
      title: "OVNI Compta : Custom accounting app for a Belgian NGO",
      description: "A tailor-made web app to manage finances, members, and projects",
      image: "/images/asbl_ovni/ovni_dashboard.webp?v=2",
      link: "https://www.asbl-ovni.com/",
      techLogos: [
        "/images/logos/nextjs.webp",
        "/images/logos/react.webp",
        "/images/logos/tailwind.webp",
        "/images/logos/postgresql.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "portfolio",
      title: "Portfolio Website",
      description: "An animated portfolio website showcasing my work.",
      image: "/images/portfolioCover.webp",
      link: "https://olivervdb.com",
      techLogos: [
        "/images/logos/nextjs.webp",
        "/images/logos/react.webp",
        "/images/logos/node.webp",
        "/images/logos/tailwind.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "artgallery",
      title: "Art Gallery : A social platform for artists",
      description: "A platform that allows artists to create profiles, upload their artwork, and connect with art enthusiasts.",
      image: "/images/ag2.webp",
      link: "https://github.com/OliWebDevO/Art_Gallery_Front_End",
      techLogos: [
        "/images/logos/react.webp",
        "/images/logos/node.webp",
        "/images/logos/sql.webp",
      ],
      bg: "#1c1c21",
    },
  ],
  fr: [
    {
      slug: "fanal",
      title: "Le Fanal des Chats : Plateforme sur mesure pour un refuge animalier",
      description: "Une plateforme WordPress complète avec quiz, formulaires multi-étapes, blog et dons en ligne",
      image: "/images/fanal_des_chats/fanal_home.webp",
      link: "https://www.lefanaldeschats.org/",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "lenoyer",
      title: "Le Noyer : Site professionnel pour un centre médical",
      description: "Un site WordPress sur mesure conçu pour inspirer confiance, informer les patients et permettre une gestion autonome du contenu",
      image: "/images/lenoyer1.webp",
      link: "https://lenoyer.be",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "white",
    },
    {
      slug: "annick",
      title: "Annick Van Endert : Quand l'art rencontre le web",
      description: "Une vitrine immersive pour une peintre, sculptrice et tatoueuse bruxelloise.",
      image: "/images/annick1.webp",
      link: "https://annickvanendert.com",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "lesarts",
      title: "LESARTS : Site vitrine audacieux pour un atelier d'encadrement & galerie d'art",
      description: "Une vitrine percutante et animée pour un atelier d'encadrement et une galerie bruxellois",
      image: "/images/lesarts/lesarts_cover.webp",
      link: "https://www.versiontest.site/",
      techLogos: [
        "/images/logos/html.webp",
        "/images/logos/css.webp",
        "/images/logos/js.webp",
        "/images/logos/wordpress.webp",
      ],
      bg: "#ece4d8",
    },
    {
      slug: "ovni-compta",
      title: "OVNI Compta : Application comptable sur mesure pour ASBL",
      description: "Une application web sur mesure pour gérer finances, membres et projets",
      image: "/images/asbl_ovni/ovni_dashboard.webp?v=2",
      link: "https://www.asbl-ovni.com/",
      techLogos: [
        "/images/logos/nextjs.webp",
        "/images/logos/react.webp",
        "/images/logos/tailwind.webp",
        "/images/logos/postgresql.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "portfolio",
      title: "Site Web Portfolio",
      description: "Un site portfolio animé présentant mon travail.",
      image: "/images/portfolioCover.webp",
      link: "https://olivervdb.com",
      techLogos: [
        "/images/logos/nextjs.webp",
        "/images/logos/react.webp",
        "/images/logos/node.webp",
        "/images/logos/tailwind.webp",
      ],
      bg: "#ffefdb",
    },
    {
      slug: "artgallery",
      title: "Art Gallery : Plateforme sociale pour artistes",
      description: "Une plateforme qui permet aux artistes de créer des profils, télécharger leurs œuvres et se connecter avec les amateurs d'art.",
      image: "/images/ag2.webp",
      link: "https://github.com/OliWebDevO/Art_Gallery_Front_End",
      techLogos: [
        "/images/logos/react.webp",
        "/images/logos/node.webp",
        "/images/logos/sql.webp",
      ],
      bg: "#1c1c21",
    },
  ]
};

const socialImgs = [
  // {
  //   name: "insta",
  //   url: "https://www.instagram.com/",
  //   imgPath: "/images/insta.webp",
  // },
  // {
  //   name: "fb",
  //   url: "https://www.facebook.com/",
  //   imgPath: "/images/fb.webp",
  // },
  // {
  //   name: "x",
  //   url: "https://www.x.com/",
  //   imgPath: "/images/x.webp",
  // },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/oliver-van-droogenbroeck-44b699151/",
    imgPath: "/images/linkedin.webp",
  },
];

const projectDetailsCards = {
  en: [
    {
      slug: "lesarts",
      cards: [
        {
          imgPath: "/images/lesarts/lesarts_atelier.webp",
          logoPath: "/images/Asset1.webp",
          title: "LESARTS: A Framing Atelier, Reimagined Online",
          details: [
            "LESARTS is a Brussels atelier specialized in custom framing, based on rue du Bailli in Ixelles, where every artwork, photo, and poster is sublimated with precision and passion.",
            "The brief: a bold, modern, high-impact showcase site that feels as crafted as the framing itself — built to draw visitors in and let the work breathe.",
            "This showcase is phase one of a larger vision: an online store and a custom management app will follow to handle quotes, orders, and the gallery's day-to-day.",
          ],
        },
        {
          imgPath: "/images/lesarts/lesarts_realisations.webp",
          logoPath: "/images/Asset2.webp",
          title: "Bold Design & Crafted Experience",
          details: [
            "Editorial, oversized typography and full-bleed framing photography create a striking, gallery-like atmosphere across every section.",
            "Structured journeys guide visitors through the craft: custom framing of photos & posters, framing of artworks, gallery & artist exhibitions, and tailor-made advice with quotes.",
            "A mobile-first responsive layout keeps the experience immersive and legible on every device, from desktop to phone.",
          ],
        },
        {
          imgPath: "/images/lesarts/lesarts_services.webp",
          logoPath: "/images/Asset3.webp",
          title: "GSAP Animations & WordPress-Ready",
          details: [
            "Rich GSAP and ScrollTrigger animations drive scroll reveals, transitions, and micro-interactions that bring the atelier's universe to life.",
            "The site will be transformed into a fully custom WordPress theme so the client can edit galleries, services, and content autonomously — no developer needed.",
            "Currently in active development, this prototype lays the foundation for the upcoming e-commerce store and management application.",
          ],
        },
      ],
    },
    {
      slug: "ovni-compta",
      cards: [
        {
          imgPath: "/images/asbl_ovni/ovni_artistes.webp?v=2",
          logoPath: "/images/Asset1.webp",
          title: "OVNI Compta: Custom Accounting for a Belgian NGO",
          details: [
            "A custom-built accounting web app developed for a Belgian cultural NGO (ASBL) to replace shared Excel files with a secure, centralized tool.",
            "Manages finances at three levels: members, projects, and central treasury, with automated internal transfers that keep accounts balanced.",
            "Accessible from any device, the app lets the client manage everything autonomously : no technical intervention needed.",
          ],
        },
        {
          imgPath: "/images/asbl_ovni/ovni_transactions.webp?v=2",
          logoPath: "/images/Asset2.webp",
          title: "Key Features",
          details: [
            "Interactive dashboard with financial overview, charts, and recent transactions at a glance.",
            "Member and project tracking with real-time balances, budget indicators, and full transaction history.",
            "Automated financial reports (monthly, annual), CSV/PDF exports, and centralized document archiving.",
          ],
        },
        {
          imgPath: "/images/asbl_ovni/ovni_ressources.webp?v=2",
          logoPath: "/images/Asset3.webp",
          title: "Technical Stack & Security",
          details: [
            "Built with Next.js, React, TypeScript, and Tailwind CSS for a modern, responsive interface with dark/light mode.",
            "PostgreSQL database via Supabase for scalable data management and secure file storage.",
            "Invite-only access with three permission levels (Admin, Editor, Reader), encrypted credentials, and protection against common attacks.",
          ],
        },
      ],
    },
    {
      slug: "fanal",
      cards: [
        {
          imgPath: "/images/fanal_des_chats/fanal_about.webp",
          logoPath: "/images/Asset1.webp",
          title: "Le Fanal des Chats: Custom Platform for an Animal Shelter",
          details: [
            "A fully custom WordPress platform built for a Belgian cat shelter, featuring 12 custom pages, 3 interactive quizzes, 2 multi-step forms, a blog with nested comments, and online donations.",
            "Every page is managed via custom fields in the WordPress admin : the client updates all content autonomously without any technical skills.",
            "Designed to drive visitor engagement through structured journeys: adoption, volunteering, and donations.",
          ],
        },
        {
          imgPath: "/images/fanal_des_chats/fanal_service.webp",
          logoPath: "/images/Asset2.webp",
          title: "Interactive Features",
          details: [
            "3 interactive quizzes (adoption, volunteering, donation) with step-by-step visual progression and personalized results.",
            "Multi-step forms with conditional fields and real-time client-side validation for adoption and volunteering applications.",
            "Full blog system with pagination, 4 categories, photo galleries, social sharing buttons, and 3-level nested comments.",
          ],
        },
        {
          imgPath: "/images/fanal_des_chats/fanal_testimony.webp",
          logoPath: "/images/Asset3.webp",
          title: "Design & Technical Stack",
          details: [
            "100% custom WordPress theme : no template, no page builder. Built with ACF PRO, Bootstrap 5, SASS, and jQuery.",
            "Scroll animations (Animate.css, WOW.js), animated counters (Odometer.js), carousels (Slick, Swiper), and lightboxes (Fancybox).",
            "Online donations via GiveWP, downloadable PDF publications archive, responsive mobile-first design.",
          ],
        },
      ],
    },
    {
      slug: "artgallery",
      cards: [
        {
          imgPath: "/images/ag1.webp",
          logoPath: "/images/Asset1.webp",
          title: "A social platform for artists",
          details: [
            "This web app is the result of my final project at Digital City. The frontend is built with React, while the backend is constructed using Node & Express. User information is stored in a MySQL database.",
            "Through this project, I wanted to create a social network that allows artists to showcase and share their works, while enabling everyone to like and comment on each post. Users can create their own profile, where they can publish text and photos as posts. They can also display their artworks in a personal gallery.",
          ],
        },
        {
          imgPath: "/images/artg1.webp",
          logoPath: "/images/Asset2.webp",
          title: "Front End Technologies",
          details: [
            "React Router Dom handles routing, navigation, and links.",
            "MUI5 is used for the interface design.",
            "Axios is used for managing API queries.",
            "React Query is used for state management and data fetching.",
            "Toastify is used for notifications and pop-ups."
          ],
        },
        {
          imgPath: "/images/ag3.webp",
          logoPath: "/images/Asset3.webp",
          title: "Back End Technologies",
          details: [
            "Nodemon is used for server monitoring.",
            "CORS is used for managing cross-origin requests.",
            "Multer is used for file handling.",
            "Bcrypt is used for password encryption.",
            "JsonWebToken is used for authentication token management.",
            "Cookie Parser is used to store these tokens via cookie management.",
            "DotEnv is used for managing environment variables and securing sensitive information."
          ],
        },
      ],
    },
    {
      slug: "portfolio",
      cards: [
        {
          imgPath: "/images/portfolioCover.webp",
          logoPath: "/images/Asset1.webp",
          title: "Animated Portfolio Website",
          details: [
            "This portfolio website was designed and developed to showcase my work, skills, and experience as a front-end developer.",
            "The site features interactive animations, a modern UI, and responsive design to provide an engaging user experience on all devices.",
          ],
        },
        {
          imgPath: "/images/portfolioCover2.webp",
          logoPath: "/images/Asset2.webp",
          title: "Front End Technologies",
          details: [
            "Built with Next.js and React for fast, SEO-friendly rendering.",
            "Tailwind CSS is used for rapid and consistent styling.",
            "GSAP powers the smooth animations and transitions.",
            "TypeScript ensures type safety and maintainability.",
          ],
        },
        {
          imgPath: "/images/portfolioCover3.webp",
          logoPath: "/images/Asset3.webp",
          title: "Contact Me",
          details: [
            "Interested in working together or have a project in mind?",
            "Feel free to reach out to discuss your ideas, get a quote, or just say hello!",
            "I'm always open to new opportunities and collaborations.",
            "Let's build something great together, contact me today!"
          ],
        },
      ],
    },
    {
      slug: "annick",
      cards: [
        {
          imgPath: "/images/annick2.webp",
          logoPath: "/images/Asset1.webp",
          title: "An Artist's Universe, Brought Online",
          details: [
            "Annick Van Endert is a Brussels-based painter, sculptor, and tattoo artist whose work thrives on raw contrasts and bold expression.",
            "The challenge : build a site that feels as vivid and textured as her art — a digital space that draws visitors in and lets the work speak for itself.",
          ],
        },
        {
          imgPath: "/images/annick3.webp",
          logoPath: "/images/Asset2.webp",
          title: "Designed to Let the Art Shine",
          details: [
            "Every layout decision serves one goal : put the artwork front and center. Clean compositions, fluid transitions, and full-bleed galleries create a cinematic browsing experience across paintings, sculptures, and tattoo art.",
            "Built on WordPress with a fully custom theme, Annick updates her galleries, adds new pieces, and manages content on her own — no developer needed.",
          ],
        },
        {
          imgPath: "/images/annick4.webp",
          logoPath: "/images/Asset3.webp",
          title: "Smooth Animations & Immersive Browsing",
          details: [
            "Scroll-triggered animations (WOW.js & Animate.css) reveal content progressively, keeping the experience dynamic without overwhelming the art.",
            "Swiper powers the image sliders, SimpleLightBox opens high-res gallery views, and Lenis ensures buttery-smooth scrolling throughout the site.",
          ],
        },
      ],
    },
    {
      slug: "lenoyer",
      cards: [
        {
          imgPath: "/images/lenoyer1.webp",
          logoPath: "/images/Asset1.webp",
          title: "Le Noyer: A Professional Showcase for Healthcare",
          details: [
            "Custom WordPress website for a multidisciplinary medical center in Schaerbeek, Brussels. Designed to reflect the center's professionalism from the first visit.",
            "7 structured sections covering everything patients need: services, team, activities, how it works, blog, and contact with access info.",
            "The client manages all content independently through WordPress admin : no developer needed for updates, schedule changes, or team announcements.",
          ],
        },
        {
          imgPath: "/images/lenoyer2.webp",
          logoPath: "/images/Asset2.webp",
          title: "Designed for Patient Engagement",
          details: [
            "Clean, minimalist design that puts essential information front and center : patients find what they need in seconds, not minutes.",
            "Fully responsive layout ensuring a seamless experience on mobile, tablet, and desktop : critical for healthcare sites where users often search on the go.",
            "Smooth scroll animations and interactive carousels bring the content to life while maintaining a professional, reassuring tone.",
          ],
        },
        {
          imgPath: "/images/lenoyer3.webp",
          logoPath: "/images/Asset3.webp",
          title: "Custom WordPress Theme & Technical Stack",
          details: [
            "100% custom WordPress theme : no generic template, no page builder. Every element is tailored to the medical center's needs and branding.",
            "Built with ACF PRO for flexible content management, Slick Slider for team and gallery carousels, and Magnific Popup for image lightboxes.",
            "Scroll animations (WOW.js, Animate.css) add polish without compromising page speed or accessibility.",
          ],
        },
      ],
    },
  ],
  fr: [
    {
      slug: "lesarts",
      cards: [
        {
          imgPath: "/images/lesarts/lesarts_atelier.webp",
          logoPath: "/images/Asset1.webp",
          title: "LESARTS : Un atelier d'encadrement, réinventé en ligne",
          details: [
            "LESARTS est un atelier bruxellois spécialisé dans l'encadrement sur mesure, situé rue du Bailli à Ixelles, où chaque œuvre, photo et affiche est sublimée avec précision et passion.",
            "Le brief : un site vitrine audacieux, moderne et percutant, aussi soigné que l'encadrement lui-même — pensé pour capter le visiteur et laisser respirer les œuvres.",
            "Cette vitrine n'est que la première étape d'une vision plus large : une boutique en ligne et une application de gestion sur mesure suivront pour gérer devis, commandes et le quotidien de la galerie.",
          ],
        },
        {
          imgPath: "/images/lesarts/lesarts_realisations.webp",
          logoPath: "/images/Asset2.webp",
          title: "Design audacieux & expérience soignée",
          details: [
            "Une typographie éditoriale surdimensionnée et des photographies d'encadrement plein écran créent une atmosphère saisissante, digne d'une galerie, dans chaque section.",
            "Des parcours structurés guident le visiteur à travers le métier : encadrement de photos & affiches, encadrement d'œuvres d'art, galerie & expositions d'artistes, et conseil personnalisé avec devis.",
            "Une mise en page responsive mobile-first garde l'expérience immersive et lisible sur tous les écrans, du desktop au smartphone.",
          ],
        },
        {
          imgPath: "/images/lesarts/lesarts_services.webp",
          logoPath: "/images/Asset3.webp",
          title: "Animations GSAP & prêt pour WordPress",
          details: [
            "De riches animations GSAP et ScrollTrigger orchestrent révélations au scroll, transitions et micro-interactions qui donnent vie à l'univers de l'atelier.",
            "Le site sera transformé en thème WordPress entièrement sur mesure pour que le client modifie galeries, services et contenu en toute autonomie — sans développeur.",
            "Actuellement en cours de réalisation, ce prototype pose les fondations du futur e-commerce et de l'application de gestion.",
          ],
        },
      ],
    },
    {
      slug: "ovni-compta",
      cards: [
        {
          imgPath: "/images/asbl_ovni/ovni_artistes.webp?v=2",
          logoPath: "/images/Asset1.webp",
          title: "OVNI Compta : Comptabilité sur mesure pour ASBL",
          details: [
            "Application web comptable développée sur mesure pour une ASBL culturelle belge, en remplacement de fichiers Excel partagés par un outil centralisé et sécurisé.",
            "Gestion des finances à trois niveaux : membres, projets et trésorerie centrale, avec virements internes automatisés qui maintiennent l'équilibre des comptes.",
            "Accessible depuis n'importe quel appareil, l'application permet au client de tout gérer en autonomie, sans intervention technique.",
          ],
        },
        {
          imgPath: "/images/asbl_ovni/ovni_transactions.webp?v=2",
          logoPath: "/images/Asset2.webp",
          title: "Fonctionnalités clés",
          details: [
            "Tableau de bord interactif avec vue d'ensemble financière, graphiques et dernières transactions en un coup d'œil.",
            "Suivi des membres et projets avec soldes en temps réel, indicateurs de budget et historique complet des transactions.",
            "Rapports financiers automatiques (mensuels, annuels), exports CSV/PDF et archivage centralisé de documents.",
          ],
        },
        {
          imgPath: "/images/asbl_ovni/ovni_ressources.webp?v=2",
          logoPath: "/images/Asset3.webp",
          title: "Stack technique & Sécurité",
          details: [
            "Construit avec Next.js, React, TypeScript et Tailwind CSS pour une interface moderne et responsive avec mode sombre/clair.",
            "Base de données PostgreSQL via Supabase pour une gestion de données évolutive et un stockage de fichiers sécurisé.",
            "Accès sur invitation uniquement avec trois niveaux de droits (Admin, Éditeur, Lecteur), identifiants chiffrés et protection contre les attaques courantes.",
          ],
        },
      ],
    },
    {
      slug: "fanal",
      cards: [
        {
          imgPath: "/images/fanal_des_chats/fanal_about.webp",
          logoPath: "/images/Asset1.webp",
          title: "Le Fanal des Chats : Plateforme sur mesure pour un refuge",
          details: [
            "Plateforme WordPress entièrement sur mesure pour un refuge de chats belge : 12 pages personnalisées, 3 quiz interactifs, 2 formulaires multi-étapes, un blog avec commentaires imbriqués et des dons en ligne.",
            "Chaque page est gérée via des champs personnalisés dans l'admin WordPress : le client met à jour tout son contenu en autonomie, sans compétence technique.",
            "Conçue pour guider les visiteurs dans des parcours d'engagement structurés : adoption, bénévolat et dons.",
          ],
        },
        {
          imgPath: "/images/fanal_des_chats/fanal_service.webp",
          logoPath: "/images/Asset2.webp",
          title: "Fonctionnalités interactives",
          details: [
            "3 quiz interactifs (adoption, bénévolat, don) avec progression visuelle étape par étape et résultats personnalisés.",
            "Formulaires multi-étapes avec champs conditionnels et validation en temps réel pour les candidatures d'adoption et de bénévolat.",
            "Système de blog complet avec pagination, 4 catégories, galeries photos, partage social et commentaires imbriqués sur 3 niveaux.",
          ],
        },
        {
          imgPath: "/images/fanal_des_chats/fanal_testimony.webp",
          logoPath: "/images/Asset3.webp",
          title: "Design & Stack technique",
          details: [
            "Thème WordPress 100% sur mesure : aucun template, aucun page builder. Construit avec ACF PRO, Bootstrap 5, SASS et jQuery.",
            "Animations au scroll (Animate.css, WOW.js), compteurs animés (Odometer.js), carrousels (Slick, Swiper) et lightboxes (Fancybox).",
            "Dons en ligne via GiveWP, archive de publications PDF téléchargeables, design responsive mobile-first.",
          ],
        },
      ],
    },
    {
      slug: "artgallery",
      cards: [
        {
          imgPath: "/images/ag1.webp",
          logoPath: "/images/Asset1.webp",
          title: "Une plateforme sociale pour artistes",
          details: [
            "Cette application web est le résultat de mon projet final à Digital City. Le frontend est construit avec React, tandis que le backend est construit avec Node & Express. Les informations utilisateur sont stockées dans une base de données MySQL.",
            "À travers ce projet, j'ai voulu créer un réseau social qui permet aux artistes de présenter et partager leurs œuvres, tout en permettant à chacun d'aimer et commenter chaque publication. Les utilisateurs peuvent créer leur propre profil, où ils peuvent publier du texte et des photos comme publications. Ils peuvent également afficher leurs œuvres d'art dans une galerie personnelle.",
          ],
        },
        {
          imgPath: "/images/artg1.webp",
          logoPath: "/images/Asset2.webp",
          title: "Technologies Front End",
          details: [
            "React Router Dom gère le routage, la navigation et les liens.",
            "MUI5 est utilisé pour la conception de l'interface.",
            "Axios est utilisé pour gérer les requêtes API.",
            "React Query est utilisé pour la gestion d'état et la récupération de données.",
            "Toastify est utilisé pour les notifications et pop-ups."
          ],
        },
        {
          imgPath: "/images/ag3.webp",
          logoPath: "/images/Asset3.webp",
          title: "Technologies Back End",
          details: [
            "Nodemon est utilisé pour la surveillance du serveur.",
            "CORS est utilisé pour gérer les requêtes cross-origin.",
            "Multer est utilisé pour la gestion des fichiers.",
            "Bcrypt est utilisé pour le chiffrement des mots de passe.",
            "JsonWebToken est utilisé pour la gestion des jetons d'authentification.",
            "Cookie Parser est utilisé pour stocker ces jetons via la gestion des cookies.",
            "DotEnv est utilisé pour gérer les variables d'environnement et sécuriser les informations sensibles."
          ],
        },
      ],
    },
    {
      slug: "portfolio",
      cards: [
        {
          imgPath: "/images/portfolioCover.webp",
          logoPath: "/images/Asset1.webp",
          title: "Site Web Portfolio Animé",
          details: [
            "Ce site web portfolio a été conçu et développé pour présenter mon travail, mes compétences et mon expérience en tant que développeur front-end.",
            "Le site présente des animations interactives, une interface moderne et un design responsive pour offrir une expérience utilisateur engageante sur tous les appareils.",
          ],
        },
        {
          imgPath: "/images/portfolioCover2.webp",
          logoPath: "/images/Asset2.webp",
          title: "Technologies Front End",
          details: [
            "Construit avec Next.js et React pour un rendu rapide et optimisé pour le SEO.",
            "Tailwind CSS est utilisé pour un stylisme rapide et cohérent.",
            "GSAP alimente les animations fluides et les transitions.",
            "TypeScript assure la sécurité des types et la maintenabilité.",
          ],
        },
        {
          imgPath: "/images/portfolioCover3.webp",
          logoPath: "/images/Asset3.webp",
          title: "Contactez-moi",
          details: [
            "Intéressé par une collaboration ou avez-vous un projet en tête ?",
            "N'hésitez pas à me contacter pour discuter de vos idées, obtenir un devis ou simplement dire bonjour !",
            "Je suis toujours ouvert aux nouvelles opportunités et collaborations.",
            "Construisons quelque chose de fantastique ensemble, contactez-moi aujourd'hui !"
          ],
        },
      ],
    },
    {
      slug: "annick",
      cards: [
        {
          imgPath: "/images/annick2.webp",
          logoPath: "/images/Asset1.webp",
          title: "L'univers d'une artiste, mis en ligne",
          details: [
            "Annick Van Endert est une peintre, sculptrice et tatoueuse bruxelloise dont le travail vit de contrastes bruts et d'une expression sans compromis.",
            "Le défi : créer un site aussi vivant et texturé que son art — un espace digital qui attire le visiteur et laisse les œuvres parler d'elles-mêmes.",
          ],
        },
        {
          imgPath: "/images/annick3.webp",
          logoPath: "/images/Asset2.webp",
          title: "Conçu pour sublimer les œuvres",
          details: [
            "Chaque choix de mise en page sert un seul objectif : mettre l'art au premier plan. Compositions épurées, transitions fluides et galeries plein écran créent une expérience de navigation cinématographique à travers peintures, sculptures et tatouages.",
            "Construit sur WordPress avec un thème entièrement sur mesure, Annick met à jour ses galeries, ajoute de nouvelles pièces et gère son contenu en toute autonomie — sans intervention technique.",
          ],
        },
        {
          imgPath: "/images/annick4.webp",
          logoPath: "/images/Asset3.webp",
          title: "Animations fluides & navigation immersive",
          details: [
            "Des animations déclenchées au scroll (WOW.js & Animate.css) révèlent le contenu progressivement, gardant l'expérience dynamique sans éclipser l'art.",
            "Swiper anime les sliders d'images, SimpleLightBox ouvre les galeries en haute résolution, et Lenis assure un défilement parfaitement fluide sur l'ensemble du site.",
          ],
        },
      ],
    },
    {
      slug: "lenoyer",
      cards: [
        {
          imgPath: "/images/lenoyer1.webp",
          logoPath: "/images/Asset1.webp",
          title: "Le Noyer : Une vitrine professionnelle pour le secteur médical",
          details: [
            "Site WordPress sur mesure pour une maison médicale pluridisciplinaire à Schaerbeek, Bruxelles. Conçu pour refléter le professionnalisme du centre dès la première visite.",
            "7 sections structurées couvrant tout ce dont les patients ont besoin : services, équipe, activités, fonctionnement, blog, et contact avec infos d'accès.",
            "Le client gère tout son contenu en autonomie via l'admin WordPress : aucun développeur nécessaire pour les mises à jour, changements d'horaires ou annonces d'équipe.",
          ],
        },
        {
          imgPath: "/images/lenoyer2.webp",
          logoPath: "/images/Asset2.webp",
          title: "Conçu pour l'engagement des patients",
          details: [
            "Design épuré et minimaliste qui met l'essentiel au premier plan : les patients trouvent ce qu'ils cherchent en quelques secondes.",
            "Mise en page entièrement responsive garantissant une expérience fluide sur mobile, tablette et desktop : essentiel pour un site de santé où les utilisateurs consultent souvent en déplacement.",
            "Animations au scroll et carrousels interactifs donnent vie au contenu tout en maintenant un ton professionnel et rassurant.",
          ],
        },
        {
          imgPath: "/images/lenoyer3.webp",
          logoPath: "/images/Asset3.webp",
          title: "Thème WordPress sur mesure & Stack technique",
          details: [
            "Thème WordPress 100% sur mesure : aucun template générique, aucun page builder. Chaque élément est adapté aux besoins et à l'identité du centre médical.",
            "Construit avec ACF PRO pour une gestion de contenu flexible, Slick Slider pour les carrousels d'équipe et galeries, et Magnific Popup pour les lightboxes d'images.",
            "Animations au scroll (WOW.js, Animate.css) apportent du dynamisme sans compromettre la vitesse de chargement ni l'accessibilité.",
          ],
        },
      ],
    },
  ]
};








const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Oliver. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.webp",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Oliver was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.webp",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Oliver was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Oliver's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Oliver is the ideal partner.",
    imgPath: "/images/client2.webp",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Oliver was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.webp",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Oliver’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.webp",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Oliver was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.webp",
  },
];


export {
  translations,
  words,
  abilities,
  homeAbilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  homeNavLinks,
  serviceKeywords,
  processSteps,
  productCards,
  projects,
  projectDetailsCards,
  faqItems,
};