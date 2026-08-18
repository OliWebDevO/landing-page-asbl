/* ============================================================
   BABCAT & THE WILD — FILTRE DE LA BIBLIOTHÈQUE (guides)
   ------------------------------------------------------------
   Filtrage par catégorie, sans framework et SANS GSAP (régime
   sobre hors herbier — PLAN §5) : bascule d'un attribut
   data-filtered, la transition visuelle reste en CSS.
   Accessible : aria-pressed sur les boutons, état vide annoncé.
   Sans JS : toutes les cartes sont visibles (filtres masqués).
   ============================================================ */

(() => {
  "use strict";

  const bar = document.querySelector("[data-guides-filters]");
  const cards = document.querySelectorAll(".guide-card[data-category]");
  const empty = document.querySelector(".guides-empty");
  if (!bar || !cards.length) return;

  // Les filtres n'ont de sens qu'avec JS : on les révèle ici.
  bar.hidden = false;

  const buttons = bar.querySelectorAll(".tag--filter");

  function apply(category) {
    let visible = 0;

    cards.forEach((card) => {
      const match = category === "tous" || card.dataset.category === category;
      card.dataset.filtered = match ? "in" : "out";
      if (match) visible += 1;
    });

    if (empty) empty.hidden = visible > 0;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      apply(button.dataset.filter);
    });
  });
})();
