(function initGlobalNav() {
  const isSubPage = window.location.pathname.includes('/src/pages/');
  const rootPrefix = isSubPage ? '../../' : '';

  document.body.classList.add('has-global-nav');

  const mount = document.getElementById('globalNavMount') || document.body;
  const currentPath = window.location.pathname.replace(/\\/g, '/');

  const navHtml = `
    <header class="global-nav" role="banner">
      <a class="global-nav__brand" href="${rootPrefix}index.html" aria-label="Home">
        <img src="${rootPrefix}src/assets/images/logo.png" alt="Musee logo" class="global-nav__logo" />
        <span class="global-nav__title">Mucem</span>
      </a>

      <nav class="global-nav__menu" aria-label="Primary">
        <a id="navHome" class="global-nav__link" href="${rootPrefix}index.html">Accueil</a>
        <a id="navGallery" class="global-nav__link" href="${rootPrefix}src/pages/galerie.html">Galerie</a>
        <a id="navWorkshop" class="global-nav__link" href="${rootPrefix}src/pages/atelier.html">Atelier</a>
      </nav>

      <div class="global-nav__actions">
        <button id="langToggle" class="global-nav__btn" type="button" aria-label="Toggle language">
          <svg class="global-nav__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm7.93 9h-3.06a15.7 15.7 0 0 0-1.3-5.02A8.03 8.03 0 0 1 19.93 11ZM12 4.07c.84 1.12 1.78 3.2 2.2 6.93H9.8c.42-3.73 1.36-5.81 2.2-6.93ZM4.07 13h3.06a15.7 15.7 0 0 0 1.3 5.02A8.03 8.03 0 0 1 4.07 13Zm3.06-2H4.07a8.03 8.03 0 0 1 4.36-5.02A15.7 15.7 0 0 0 7.13 11Zm1.99 2h5.76c-.17 1.66-.56 3.26-1.14 4.67A8.75 8.75 0 0 1 12 19.93a8.75 8.75 0 0 1-1.74-2.26A14.24 14.24 0 0 1 9.12 13Zm0-2c.17-1.66.56-3.26 1.14-4.67A8.75 8.75 0 0 1 12 4.07a8.75 8.75 0 0 1 1.74 2.26c.58 1.41.97 3.01 1.14 4.67Zm6.45 7.02A15.7 15.7 0 0 0 16.87 13h3.06a8.03 8.03 0 0 1-4.36 5.02Z" fill="currentColor"/></svg>
          <span id="langLabel">FR</span>
        </button>
        <button id="themeToggle" class="global-nav__btn" type="button" aria-label="Toggle theme">
          <svg class="global-nav__icon global-nav__icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4V2m0 20v-2m8-8h2M2 12h2m12.95 6.95 1.41 1.41M4.64 4.64l1.41 1.41m10.9-1.41-1.41 1.41M6.05 17.95l-1.41 1.41M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg class="global-nav__icon global-nav__icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span id="themeLabel">Light</span>
        </button>
      </div>
    </header>
  `;

  if (mount === document.body) {
    document.body.insertAdjacentHTML('afterbegin', navHtml);
  } else {
    mount.innerHTML = navHtml;
  }

  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const navHome = document.getElementById('navHome');
  const navGallery = document.getElementById('navGallery');
  const navWorkshop = document.getElementById('navWorkshop');

  function setActiveLink() {
    const activeClass = 'is-active';
    [navHome, navGallery, navWorkshop].forEach((el) => el && el.classList.remove(activeClass));

    if (currentPath.endsWith('/src/pages/galerie.html')) {
      navGallery && navGallery.classList.add(activeClass);
    } else if (currentPath.endsWith('/src/pages/atelier.html')) {
      navWorkshop && navWorkshop.classList.add(activeClass);
    } else {
      navHome && navHome.classList.add(activeClass);
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  const savedLanguage = localStorage.getItem('language') || 'fr';

  const setLanguage = (lang) => {
    localStorage.setItem('language', lang);
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    if (navHome && navGallery && navWorkshop) {
      if (lang === 'fr') {
        navHome.textContent = 'Accueil';
        navGallery.textContent = 'Galerie';
        navWorkshop.textContent = 'Atelier';
      } else {
        navHome.textContent = 'Home';
        navGallery.textContent = 'Gallery';
        navWorkshop.textContent = 'Workshop';
      }
    }

    document.dispatchEvent(new CustomEvent('app:language-change', { detail: { language: lang } }));
  };

  const setThemeLabel = () => {
    if (!themeLabel) return;
    themeLabel.textContent = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
  };

  setActiveLink();
  setLanguage(savedLanguage);
  setThemeLabel();

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = localStorage.getItem('language') || 'fr';
      setLanguage(current === 'fr' ? 'en' : 'fr');
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      setThemeLabel();
    });
  }
})();


