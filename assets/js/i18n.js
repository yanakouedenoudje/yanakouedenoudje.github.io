/* ============================================================================
   BASCULE FR / EN
   - Le français reste la langue de base écrite dans le HTML.
   - Chaque texte traduisible porte un attribut data-i18n="kXX" (ou
     data-i18n-alt / -title / -aria-label / -content pour les attributs).
   - Les traductions anglaises sont dans assets/js/i18n-data.js (window.I18N_EN).
     Un texte sans traduction reste simplement en français.
   - La langue choisie est mémorisée (localStorage) et partagée entre les pages.
   ============================================================================ */
(function () {
  const EN = window.I18N_EN || {};
  const ATTRS = ['alt', 'title', 'aria-label', 'content'];
  const store = (el, a, val) => { if (!el.hasAttribute('data-orig-' + a)) el.setAttribute('data-orig-' + a, val); };

  function setText(el, value, isTitle) {
    if (isTitle) el.textContent = value; else el.innerHTML = value;
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const isTitle = el.tagName === 'TITLE';
      if (el.dataset.origHtml === undefined) el.dataset.origHtml = isTitle ? el.textContent : el.innerHTML;
      const key = el.getAttribute('data-i18n');
      const val = lang === 'en' && EN[key] ? EN[key] : el.dataset.origHtml;
      setText(el, val, isTitle);
    });
    ATTRS.forEach(a => {
      document.querySelectorAll('[data-i18n-' + a + ']').forEach(el => {
        store(el, a, el.getAttribute(a));
        const key = el.getAttribute('data-i18n-' + a);
        el.setAttribute(a, lang === 'en' && EN[key] ? EN[key] : el.getAttribute('data-orig-' + a));
      });
    });
    const btn = document.getElementById('langToggle');
    if (btn) { btn.textContent = lang === 'en' ? 'FR' : 'EN'; btn.setAttribute('aria-label', lang === 'en' ? 'Passer en français' : 'Switch to English'); }
    const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    let lang = null;
    try { lang = localStorage.getItem('lang'); } catch (e) {}
    if (!lang) lang = (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
    if (lang === 'en') apply('en');
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', () => {
      lang = document.documentElement.lang === 'en' ? 'fr' : 'en';
      try { localStorage.setItem('lang', lang); } catch (e) {}
      apply(lang);
    });
    if (lang === 'fr' && btn) btn.textContent = 'EN';
  });
})();
