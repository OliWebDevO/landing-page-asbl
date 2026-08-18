# Mon Site ASBL — landing page (tunnel de vente)

Landing page one-page destinée à un nouveau domaine (type `mon-site-asbl.com`)
pour capter les responsables d'ASBL qui cherchent à créer ou refaire leur site,
et les convertir vers un premier contact — puis vers [olivervdb.com](https://olivervdb.com/).

**Statut : premier jet, fonctionnel et testé.** Voir « Reste à faire » en fin de document.

---

## Lancer le site

Site statique, aucune étape de build. Il faut un serveur HTTP (et non `file://`)
parce que `flora.js` charge les SVG des plantes en `fetch` :

```bash
python3 -m http.server 8747
# → http://localhost:8747
```

---

## Structure

```
index.html                    Page unique (7 sections)
assets/
  css/
    tokens.css                Design system : couleurs, typo, 8pt, ombres
    base.css                  Reset, typo, layout, header, boutons, footer
    components.css            Hero, offres, timeline, prairie, formulaire
  js/
    vendor/                   GSAP 3, ScrollTrigger, Lenis (copies locales)
    animations/
      core.js                 Lenis + registre de modules + scroll d'ancres
      reveals.js              Entrées au scroll des blocs [data-reveal]
      process.js              Timeline « boules + fil » (cf. plus bas)
      flora.js                Croissance des plantes path par path
    nav.js                    Header sticky, burger, scrollspy, piège à focus
    form.js                   Validation du formulaire de contact
  svg/plants/                 10 silhouettes végétales (SVG)
```

---

## Le contenu vient du pitch

Chaque section reprend une pièce du *Pitch & argumentaire de vente* (Module 7) :

| Section | Source |
|---|---|
| Hero | L'elevator pitch, presque mot pour mot |
| Le constat | La « double douleur » : visibilité + charge administrative |
| Solutions | Les caractéristiques du CAP, avec les tarifs de l'angle commercial |
| Méthode | Les 7 étapes du portfolio, condensées en 6 |
| Réalisations | Les preuves du CAP : OVNI, Fanal, Le Noyer |
| Questions | Les freins de l'argumentaire (« trop cher », « pas technophiles »…) |
| CTA | « On prend un café ? » — la conclusion du pitch |

La phrase « ce que je vends vraiment » du hero est reprise telle quelle : c'est
le fil rouge du document.

---

## Les trois animations demandées

### 1. La timeline « boules + fil » (`process.js`)

Reprise de la mécanique du portfolio (`sections/StepsSection.tsx`), transposée
en vanilla. Le fil dégradé est posé **en entier** dans le DOM, recouvert d'un
masque couleur-fond. Au scroll, le masque se rétracte vers le bas
(`scaleY → 0`, origine en bas) : le fil semble se dessiner de haut en bas. Un
`scrub` le lie à la position exacte du scroll, donc remonter le rembobine.

Le fil est calé du **centre de la première boule au centre de la dernière** —
sinon il dépasse en l'air. Ce calage est refait à chaque `refresh` (resize).

Chaque boule s'allume en orange quand le fil l'atteint, et les cartes arrivent
en alternance gauche/droite autour du fil (desktop) ou depuis la gauche (mobile).

### 2. Les plantes qui poussent (`flora.js`)

Reprise de « Babcat and the Wild ». Les SVG fournis sont des aplats : ils sont
**inlinés au runtime** (fetch + DOMParser) pour atteindre chaque `<path>`. La
plante pousse alors path par path, triée par point d'ancrage décroissant — les
racines d'abord, les fleurs en dernier. Les tiges élancées montent en `scaleY`,
le reste s'ouvre en `scale`.

La prairie pré-footer (`.meadow`) est enracinée dans le footer brun : les
plantes semblent émerger de la terre. Jouée **une seule fois** (`once`) : une
plante ne se rétracte pas quand on remonte la page.

### 3. Lenis + scroll d'ancres (`core.js`)

Lenis sur desktop uniquement (le scroll natif est parfait sur mobile et
économise du CPU), synchronisé avec ScrollTrigger via le ticker GSAP. Un seul
écouteur délégué gère **tous** les liens `#ancre` de la page : il ferme le menu
mobile, défile en douceur et met l'URL à jour.

---

## Choix techniques à connaître

**Le registre de modules.** `core.js` ouvre un `gsap.matchMedia` et joue les
modules dedans ; ceux qui s'enregistrent après le démarrage sont joués à la
volée. Aucune dépendance à un timing (ni `rAF`, ni `setTimeout`) — c'est ce qui
avait cassé les animations lors du premier essai.

**Aucun état caché en CSS.** Tous les états initiaux (`opacity: 0`…) sont posés
en JS par `fromTo`. Conséquence : sans JS, ou en `prefers-reduced-motion`, la
page est **entièrement visible** et utilisable — pas de FOUC, pas de contenu
invisible. En reduced-motion, aucun module n'est joué du tout.

**Les SVG de plantes gardent leurs couleurs d'origine** (verts, orangés,
jaunes) : elles s'accordent déjà à la palette. Chaque slot fixe sa hauteur, la
largeur suit le ratio du viewBox.

---

## Responsive

Mobile-first, `min-width` uniquement. Points de rupture et raisons :

| Seuil | Ce qui bascule |
|---|---|
| 768px | Constats 1 → 2 col. · offres et réalisations 1 → 2 col. · footer 1 → 2 col. |
| 1024px | Offres, réalisations et footer → 3 col. · constats → 4 col. · hero et CTA → 2 col. · timeline centrée |
| **1160px** | **Nav complète remplace le burger** (voir ci-dessous) |
| 1500px | Prairie bornée en largeur (voir ci-dessous) |

Trois décisions méritent une explication, parce qu'elles s'écartent des
breakpoints standards :

**La nav desktop attend 1160px, pas 1024.** À 1024 la barre complète (logo +
5 liens + CTA) se tasse : « Le constat » et « Prendre un café » passaient sur
deux lignes. En dessous de 1160, le burger reste seul aux commandes — le menu
mobile est donc actif jusqu'en petit desktop, c'est voulu. Le seuil est répété
dans `nav.js` (fermeture auto du panneau) : **les deux doivent rester alignés.**

**Trois colonnes seulement à 1024px** pour les offres et réalisations. À 768,
trois cartes côte à côte tombent sous ~220px et le texte se hache sur 3 mots par
ligne. En tablette elles passent donc à 2 colonnes, la troisième prenant la
ligne entière — et pour les réalisations, cette carte pleine largeur bascule en
rangée (image à gauche, texte à droite), sinon son visuel en 16/10 doublerait
de hauteur.

**La prairie est bornée à 1500px.** Ses slots sont positionnés en pourcentages :
au-delà, les plantes s'écartent tellement qu'elles deviennent des herbes
isolées. Au-dessus de ce seuil elle est centrée et gagne en hauteur pour rester
à l'échelle du footer.

Enfin, `.process` porte un `overflow-x: clip` : les cartes de la timeline
entrent latéralement (décalage de ±60px avant leur arrivée), ce qui créait sans
lui une barre de défilement horizontale de quelques pixels.

---

## Accessibilité (WCAG 2.2 AA)

Vérifié : un seul `<h1>`, hiérarchie de titres continue, tous les champs
étiquetés, aucune image sans `alt`, cibles tactiles ≥ 44px, skip-link, anneau
de focus 3px visible partout, piège à focus dans le menu mobile, `Échap` qui
ferme, FAQ en `<details>` natif.

Les contrastes sont documentés token par token dans `tokens.css`. Les couleurs
« vives » (orange `#E07A3F`, vert `#7A9A6B`) ne portent jamais de texte normal :
elles ont chacune une variante `-text` vérifiée (≥ 4.5:1 sur crème).

---

## Tests effectués

Testé au navigateur (Playwright), fonctionnellement puis par balayage
responsive.

**Fonctionnel :**

- console sans erreur ni avertissement
- 34 ScrollTriggers créés, les 6 boules s'allument, le fil se dessine puis se rembobine
- les 7 plantes poussent (240 paths animés)
- formulaire : 3 champs invalidés à vide, focus au premier fautif, puis envoi et message de succès
- menu mobile : ouverture, focus, scroll bloqué, fermeture au clic, navigation vers la section — revalidé à 1024px, où le burger est désormais actif
- clavier : skip-link en premier, FAQ opérable
- accessibilité : un seul `<h1>`, hiérarchie continue, aucun champ sans label, aucune image sans `alt`

**Responsive — 17 largeurs balayées de 320 à 1920px**
(320, 360, 390, 414, 480, 600, 700, 767, 768, 820, 900, 1000, 1023, 1024, 1100,
1159, 1160, 1280, 1366, 1440, 1500, 1600, 1800, 1920) :

- aucun débordement horizontal, à aucune largeur
- aucun texte tronqué ni coupé
- les 6 boules de la timeline s'allument à chaque taille
- bascule burger ↔ nav nette à 1160px, sans état intermédiaire où les deux coexistent

Une seule réserve connue, sans impact visible : pendant leur animation
d'entrée, les `<li class="step">` dépassent de ~3px en interne (décalage GSAP).
Le `overflow-x: clip` de `.process` le contient — pas de barre de défilement,
rien de perceptible à l'écran.

---

## Reste à faire

1. **Brancher le formulaire.** `form.js` simule l'envoi (`fakeSend`) : il faut
   remplacer cet appel par un vrai POST vers un endpoint d'envoi de mail.
2. **Remplacer les vignettes de réalisations.** Les cartes affichent des aplats
   dégradés avec les initiales ; il faut y mettre les vraies captures d'écran
   (`assets/img/`).
3. **Les témoignages clients.** Le bloc citation reprend pour l'instant ta
   phrase de différenciation. Le pitch note que collecter des témoignages écrits
   (OVNI, Le Noyer, Fanal) est une prochaine étape — ce bloc est prêt à les recevoir.
4. **Chiffrer un cas concret** (« telle ASBL a gagné X heures/mois ») : le
   bandeau de chiffres existe en CSS (`.stats`) mais n'est pas encore posé dans
   la page, faute de données réelles.
5. **Domaine & analytics** : canonical, Open Graph et JSON-LD pointent vers
   `mon-site-asbl.com` — à ajuster au domaine retenu, avec une image OG.
