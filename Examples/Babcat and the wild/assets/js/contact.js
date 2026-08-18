/* ============================================================
   BABCAT & THE WILD — CONTACT.JS
   ------------------------------------------------------------
   1. Pré-remplissage de l'objet via ?service= (liens des CTA
      Consultations — PLAN §4.3/§4.5).
   2. Validation accessible : messages doux, jamais couleur
      seule (icône + texte via composants .field--error).
   3. Envoi : le backend (n8n / Web3Forms) n'est PAS ENCORE
      CHOISI par la cliente (PLAN §9) — en attendant, on
      bascule sur un mailto pré-rempli, honnête et fonctionnel.
   ============================================================ */

(() => {
  "use strict";

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const select = form.querySelector("#champ-objet");
  const status = form.querySelector(".contact-form__status");

  /* --- 1. Pré-remplissage depuis l'URL ----------------------- */
  const service = new URLSearchParams(location.search).get("service");
  const mapping = {
    comportement: "Comportement",
    nutrition: "Nutrition",
    amenagement: "Aménagement intérieur",
    "garde-soins": "Garde & soins",
  };
  if (select && service && mapping[service]) {
    select.value = mapping[service];
  }

  /* --- 2 & 3. Validation puis envoi (mailto provisoire) ------ */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validation native + retours visibles
    let valid = true;
    form.querySelectorAll("[required]").forEach((input) => {
      const field = input.closest(".field");
      const ok = input.checkValidity();
      if (field) field.classList.toggle("field--error", !ok);
      const error = field && field.querySelector(".field__error");
      if (error) error.hidden = ok;
      if (!ok) valid = false;
    });

    if (!valid) {
      if (status) status.textContent = "Quelques champs demandent votre attention ci-dessus.";
      const firstError = form.querySelector(".field--error input, .field--error select, .field--error textarea");
      if (firstError) firstError.focus();
      return;
    }

    const nom = form.querySelector("#champ-nom").value.trim();
    const objet = select ? select.value : "Prise de contact";
    const message = form.querySelector("#champ-message").value.trim();

    // ⚠ Provisoire : mailto pré-rempli tant que le backend
    // d'envoi (n8n / Web3Forms) n'est pas choisi par la cliente.
    const body = encodeURIComponent(`${message}\n\n— ${nom}`);
    const subject = encodeURIComponent(`[Site] ${objet}`);
    location.href = `mailto:babcatandthewild@gmail.com?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent =
        "Votre logiciel de messagerie s'ouvre avec votre message prêt à partir. Merci !";
    }
  });
})();
