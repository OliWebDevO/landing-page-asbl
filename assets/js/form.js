/* ============================================================
   MON SITE ASBL — FORM.JS
   ------------------------------------------------------------
   Validation du formulaire de contact, côté client.

   Le natif `required` est conservé dans le HTML (garde-fou si
   le JS ne charge pas), mais `novalidate` sur le <form> nous
   laisse afficher NOS messages : les bulles natives ne
   respectent ni le design ni les exigences d'accessibilité
   (pas de lien programmatique champ ↔ erreur, disparition
   automatique, style non maîtrisable).

   Accessibilité : chaque champ en erreur reçoit aria-invalid,
   son message est relié par aria-describedby (déjà posé dans
   le HTML), et le focus va au premier champ fautif.

   ⚠ PREMIER JET : l'envoi est simulé (pas de backend). Pour
   passer en production, remplacer `fakeSend()` par un vrai
   POST vers l'endpoint d'envoi de mail.
   ============================================================ */

(() => {
  "use strict";

  const form = document.getElementById("contact-form");
  const wrap = document.getElementById("contact-form-wrap");
  if (!form || !wrap) return;

  const gsap = window.gsap;

  /* ----------------------------------------------------------
     RÈGLES DE VALIDATION
     ---------------------------------------------------------- */

  const rules = {
    nom: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
    message: (value) => value.trim().length >= 10,
  };

  function fieldOf(input) {
    return input.closest("[data-field]");
  }

  function setInvalid(input, invalid) {
    const field = fieldOf(input);
    if (!field) return;
    field.classList.toggle("is-invalid", invalid);
    if (invalid) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function validate(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const ok = rule(input.value);
    setInvalid(input, !ok);
    return ok;
  }

  /* ----------------------------------------------------------
     VALIDATION AU FIL DE LA SAISIE
     On ne signale une erreur qu'APRÈS une première sortie de
     champ : signaler pendant la frappe d'une adresse e-mail
     incomplète est agressif et inutile.
     ---------------------------------------------------------- */

  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    if (!input) return;

    input.addEventListener("blur", () => validate(input));

    input.addEventListener("input", () => {
      const field = fieldOf(input);
      // Déjà en erreur : on lève le signalement dès que c'est bon.
      if (field && field.classList.contains("is-invalid")) validate(input);
    });
  });

  /* ----------------------------------------------------------
     ENVOI
     ---------------------------------------------------------- */

  /** Placeholder d'envoi — à remplacer par un vrai POST. */
  function fakeSend(payload) {
    console.info("Formulaire prêt à être envoyé :", payload);
    return new Promise((resolve) => setTimeout(resolve, 700));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Piège à robots : rempli ⇒ on fait comme si tout allait
    // bien, sans rien envoyer.
    if (form.elements.site && form.elements.site.value) return;

    const invalid = [];

    Object.keys(rules).forEach((name) => {
      const input = form.elements[name];
      if (input && !validate(input)) invalid.push(input);
    });

    if (invalid.length) {
      invalid[0].focus({ preventScroll: false });

      // Une secousse brève rend l'échec perceptible sans texte
      // supplémentaire — désactivée en reduced-motion.
      if (gsap && !(window.AsblAnim && window.AsblAnim.reduced)) {
        gsap.fromTo(
          fieldOf(invalid[0]),
          { x: -6 },
          { x: 0, duration: 0.45, ease: "elastic.out(1, 0.35)" }
        );
      }
      return;
    }

    const submit = form.querySelector('button[type="submit"]');
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Envoi en cours…";
    }

    const payload = {
      nom: form.elements.nom.value.trim(),
      asbl: form.elements.asbl ? form.elements.asbl.value.trim() : "",
      email: form.elements.email.value.trim(),
      besoin: form.elements.besoin ? form.elements.besoin.value : "",
      message: form.elements.message.value.trim(),
    };

    fakeSend(payload)
      .then(() => {
        wrap.classList.add("is-sent");

        const success = document.getElementById("form-success");
        if (success && gsap && !(window.AsblAnim && window.AsblAnim.reduced)) {
          gsap.fromTo(
            success,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }
      })
      .catch(() => {
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Demander mon devis gratuit";
        }
      });
  });
})();
