/* ============================================================================
   PORTFOLIO — Yan AKOUEDENOUDJE
   Script UNIQUE partagé par les 4 pages.

   Chaque bloc ci-dessous vérifie d'abord que les éléments dont il a besoin
   existent sur la page ("if (element) { ... }") avant d'agir. Grâce à ça,
   on peut charger EXACTEMENT le même fichier main.js sur les 4 pages :
   le code du filtre de projets, par exemple, ne fera simplement rien sur
   une page qui n'a pas de filtres.

   SOMMAIRE :
     1. Année dynamique dans le footer
     2. Thème sombre / clair
     3. Menu mobile (hamburger)
     4. Filtres de projets/certifications
     5. Lightbox (zoom image)
     6. Copier le code source (bloc de code)
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. ANNÉE DYNAMIQUE DANS LE FOOTER
     Remplace <span id="year"></span> par l'année en cours, pour ne jamais
     avoir à mettre à jour le copyright à la main.
     ========================================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ==========================================================================
     2. THÈME SOMBRE / CLAIR
     Le thème choisi est mémorisé dans le navigateur (localStorage) afin que
     le visiteur retrouve son thème préféré même après avoir quitté le site.
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Applique le thème sauvegardé au chargement de la page (sinon : sombre par défaut)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    htmlEl.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = htmlEl.getAttribute('data-theme') === 'light';
      if (isLight) {
        htmlEl.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
      } else {
        htmlEl.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
      }
    });
  }


  /* ==========================================================================
     3. MENU MOBILE (HAMBURGER)
     Ouvre/ferme le panneau de navigation sur mobile. On ferme aussi le menu
     automatiquement si on clique sur un lien, ou en dehors du menu.
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Ferme le menu quand on clique sur un lien (utile en navigation single-page,
    // ex : cliquer sur "À propos" doit refermer le menu après avoir sauté à l'ancre)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Ferme le menu si on clique n'importe où en dehors de celui-ci
    document.addEventListener('click', (e) => {
      const clickedInsideMenu = navLinks.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInsideMenu && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ==========================================================================
     4. FILTRES DE PROJETS / CERTIFICATIONS
     Utilisé sur projets.html et certifications.html : chaque bouton .page-filter
     porte un attribut data-filter, et chaque carte .cert-card porte un
     attribut data-category (qui peut contenir plusieurs mots séparés par un
     espace, ex : data-category="certification python").
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.page-filter');
  const filterCards = document.querySelectorAll('#certsGrid .cert-card');
  const noResults = document.getElementById('noResults');

  if (filterBtns.length && filterCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Met à jour l'apparence du bouton actif
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let visibleCount = 0;

        filterCards.forEach(card => {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          const matches = filter === 'all' || categories.includes(filter);
          card.classList.toggle('hidden', !matches);
          if (matches) visibleCount++;
        });

        // Affiche le message "Aucun élément" si le filtre ne retourne rien
        if (noResults) {
          noResults.classList.toggle('show', visibleCount === 0);
        }
      });
    });
  }


  /* ==========================================================================
     5. LIGHTBOX (agrandissement d'image en plein écran)
     Déclenchée par onclick="openLightbox(this)" sur un élément contenant
     une <img>. Les fonctions sont posées sur `window` pour rester utilisables
     depuis les attributs onclick="" du HTML.
     ========================================================================== */
  window.openLightbox = function (el) {
    const img = el.querySelector('img');
    if (!img) return;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = img.src;
    if (caption) caption.textContent = img.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // empêche le scroll de la page en arrière-plan
  };

  window.closeLightbox = function (e) {
    const isCloseBtn = e.target.classList && e.target.classList.contains('lightbox-close');
    if (e.target === e.currentTarget || isCloseBtn) {
      const lightbox = document.getElementById('lightbox');
      if (lightbox) lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Fermeture de la lightbox avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const lightbox = document.getElementById('lightbox');
      if (lightbox) lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });


  /* ==========================================================================
     6. COPIER LE CODE SOURCE
     Déclenchée par onclick="copyCode(this)" sur le bouton "Copier" d'un bloc
     .code-wrapper. Copie le texte du bloc de code dans le presse-papier.
     ========================================================================== */
  window.copyCode = function (btn) {
    const codeBlock = btn.closest('.code-wrapper')?.querySelector('.code-block');
    if (!codeBlock) return;
    const codeText = codeBlock.innerText;

    const showCopied = () => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copié !';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('copied');
      }, 2000);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText).then(showCopied).catch(() => fallbackCopy(codeText, showCopied));
    } else {
      fallbackCopy(codeText, showCopied);
    }
  };

  // Ancienne méthode de copie, utilisée si l'API moderne du presse-papier
  // n'est pas disponible (vieux navigateurs).
  function fallbackCopy(text, onSuccess) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); onSuccess(); } catch (err) { console.error('Erreur copie :', err); }
    document.body.removeChild(textarea);
  }

});
