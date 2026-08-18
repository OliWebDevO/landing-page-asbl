/* ============================================================
   BABCAT & THE WILD — MAIN.JS
   ------------------------------------------------------------
   Init global, sans framework et sans GSAP :
     1. Injection des partials header/footer (fetch) — chaque
        page embarque un header/footer minimal en dur (fallback
        sans JS), remplacé ici par la version complète.
     2. Lien de navigation actif (aria-current).
     3. Header compacté au scroll (classe CSS, ~10 lignes).
     4. Burger mobile : panneau plein écran accessible
        (aria-expanded, Échap, piège de focus, retour de focus).

   Les animations (data-reveal, data-parallax, data-draw…)
   sont prises en charge en Phase 3 par l'agent GSAP — rien
   ici ne dépend d'elles : la page est complète sans JS.

   Pages imbriquées (ex. guides/…) : poser data-root=".." sur
   la balise <script> — les chemins des partials sont réécrits.
   ============================================================ */

(() => {
  "use strict";

  const ROOT =
    (document.currentScript && document.currentScript.dataset.root) || ".";

  /* ----------------------------------------------------------
     1. INJECTION DES PARTIALS
     ---------------------------------------------------------- */

  /** Préfixe les URL relatives du partial pour les pages imbriquées. */
  function rebasePaths(fragment) {
    if (ROOT === ".") return;
    fragment.querySelectorAll("[href], [src]").forEach((el) => {
      const attr = el.hasAttribute("href") ? "href" : "src";
      const value = el.getAttribute(attr);
      if (!value || /^(?:[a-z]+:|\/\/|\/|#)/i.test(value)) return;
      el.setAttribute(attr, `${ROOT}/${value}`);
    });
  }

  /** Remplace l'élément #id par le contenu du partial. */
  async function injectPartial(file, id) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return null;
    try {
      // cache: "no-cache" force la revalidation du partial à chaque
      // chargement (évite qu'un footer/header modifié reste figé en cache).
      const response = await fetch(`${ROOT}/partials/${file}`, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const template = document.createElement("template");
      // Certains serveurs de dev (ex. Live Server) injectent un <script> de
      // live-reload au milieu du fragment, ce qui casse le balisage au parsing
      // et tronque le partial. On le retire avant d'analyser le HTML.
      const html = (await response.text())
        .replace(/<!--\s*Code injected by live-server\s*-->[\s\S]*?<\/script>/gi, "")
        .trim();
      template.innerHTML = html;
      const element = template.content.querySelector("header, footer");
      if (!element) throw new Error("partial vide");
      rebasePaths(element);
      placeholder.replaceWith(element);
      return element;
    } catch (error) {
      // Le fallback en dur reste en place : la page reste utilisable.
      console.warn(`Partial « ${file} » non injecté :`, error);
      return null;
    }
  }

  /* ----------------------------------------------------------
     2. LIEN ACTIF — aria-current sur la page courante
     ---------------------------------------------------------- */

  function markCurrentLink(header) {
    const current = location.pathname.split("/").pop() || "index.html";
    header.querySelectorAll(".site-header__link").forEach((link) => {
      const target = link.getAttribute("href").split("/").pop();
      if (target === current) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ----------------------------------------------------------
     3. HEADER COMPACTÉ AU SCROLL — logo typo → monogramme
     ---------------------------------------------------------- */

  function initCompactHeader(header) {
    let ticking = false;
    const update = () => {
      header.classList.toggle("site-header--compact", window.scrollY > 32);
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ----------------------------------------------------------
     4. BURGER MOBILE — panneau plein écran anthracite
     ---------------------------------------------------------- */

  function initBurger(header) {
    const burger = header.querySelector(".site-header__burger");
    const nav = header.querySelector(".site-header__nav");
    if (!burger || !nav) return;

    // Le panneau plein écran (mobile) doit être SORTI du header : le header
    // porte un backdrop-filter (verre dépoli), et un filtre crée un bloc
    // conteneur qui bornerait le panneau `position: fixed` à la hauteur du
    // header (bug : menu confiné en haut, repli en « bande »). Frère du body,
    // il couvre tout le viewport. MAIS en DESKTOP la nav est une rangée de
    // liens DANS le header : on ne la déplace que sous 1024px, et on la
    // remet à sa place d'origine au-dessus. Une ancre <template> mémorise
    // l'emplacement d'origine dans le header.
    const navAnchor = document.createComment("nav-anchor");
    nav.parentNode.insertBefore(navAnchor, nav);
    const mobile = window.matchMedia("(max-width: 1023.98px)");

    function placeNav() {
      if (mobile.matches) {
        if (nav.parentElement !== document.body) document.body.appendChild(nav);
      } else if (navAnchor.parentNode && nav.previousSibling !== navAnchor) {
        navAnchor.parentNode.insertBefore(nav, navAnchor.nextSibling);
      }
    }
    placeNav();
    mobile.addEventListener("change", placeNav);

    let lastFocused = null;

    const isOpen = () => document.body.classList.contains("has-nav-open");

    function setOpen(open) {
      header.classList.toggle("site-header--open", open);
      document.body.classList.toggle("has-nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
      if (open) {
        lastFocused = document.activeElement;
        const firstLink = nav.querySelector(".site-header__link");
        if (firstLink) firstLink.focus();
      } else if (lastFocused) {
        lastFocused.focus();
        lastFocused = null;
      }
    }

    burger.addEventListener("click", () => setOpen(!isOpen()));

    // Un clic sur une entrée referme le panneau (ancres internes)
    nav.addEventListener("click", (event) => {
      if (event.target.closest(".site-header__link") && isOpen()) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!isOpen()) return;

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      // Piège de focus : Tab boucle entre le burger et les liens
      if (event.key === "Tab") {
        const focusables = [burger, ...nav.querySelectorAll("a[href]")];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Passage en desktop : on referme proprement le panneau
    const desktop = window.matchMedia("(min-width: 1024px)");
    desktop.addEventListener("change", (event) => {
      if (event.matches && isOpen()) setOpen(false);
    });
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */

  async function init() {
    const [header] = await Promise.all([
      injectPartial("header.html", "site-header-fallback"),
      injectPartial("footer.html", "site-footer-fallback"),
    ]);

    if (header) {
      markCurrentLink(header);
      initCompactHeader(header);
      initBurger(header);
    }

    // Signale que le DOM est stabilisé (partials injectés) — point
    // d'entrée des modules d'animation (assets/js/animations/core.js).
    // Toujours émis, même si un partial a échoué : la page reste
    // complète grâce aux fallbacks, les animations peuvent démarrer.
    window.__babcatReady = true;
    document.dispatchEvent(new CustomEvent("babcat:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
