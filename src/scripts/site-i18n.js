(function initSiteI18n() {
  const contentRoot = document.querySelector('main') || document.body;

  const dictionary = {
    fr: {
      heroTitle: 'Le Plus Grand Tajine de Sardines',
      heroDate: 'Samedi 10 juillet 1999',
      heroLocation: 'Safi, Place Mohamed V',
      heroDescription: 'Le plus grand tajine de boulettes de sardines du monde a ete presente le samedi 10 juillet 1999 a Safi, sur la place Mohamed V, a l initiative de l Association des operateurs economiques de la capitale d Abda.',
      heroCta: 'Decouvrir',
      heritageTitle: 'Le Musee de la Poterie',
      heritageDescription: 'La poterie de Safi est un type de poterie ou de porcelaine produite dans la ville de Safi, au Maroc. Elle est fabriquee a la main par des artisans locaux utilisant des techniques traditionnelles. Cette poterie se distingue par ses designs uniques qui refletent les traditions et la culture marocaines.',
      heritageCta: 'Decouvrir',
      hoursTitle: 'Horaires',
      hoursCaption: 'Horaires d ouverture du musee',
      hoursDayHeader: 'Jour',
      hoursTimeHeader: 'Heures',
      galleryPremiumTitle: 'Galerie Premium',
      galleryPageTitle: 'Galerie',
      galleryPageIntro: 'Exemple de nos poteries',
      artistsTitle: 'Nos Artistes',
      atelierTitle: 'Horaires',
      atelierParticipateTitle: 'Pour Participer',
      atelierParticipateText: 'Nous sommes heureux de vous avoir avec nous',
      fullNamePlaceholder: 'nom et prenom',
      emailPlaceholder: 'adresse e-mail',
      cinPlaceholder: 'numero de carte d identite CIN',
      phonePlaceholder: 'numero de telephone',
      submitLabel: 'envoyer',
      navHomeLabel: 'Accueil',
      navGalleryLabel: 'Galerie',
      navWorkshopLabel: 'Atelier',
      footerLocationLabel: 'Localisation',
      statusOpen: 'Ouvert',
      statusClosed: 'Ferme',
      hoursRows: [
        ['Lundi', '10:00 - 18:00', false],
        ['Mardi', 'Ferme', true],
        ['Mercredi', '10:00 - 18:00', false],
        ['Jeudi', '10:00 - 18:00', false],
        ['Vendredi', '10:00 - 18:00', false],
        ['Samedi', '10:00 - 18:00', false],
        ['Dimanche', '10:00 - 18:00', false]
      ]
    },
    en: {
      heroTitle: "The World's Largest Sardine Ball Tajine",
      heroDate: 'Saturday, July 10, 1999',
      heroLocation: 'Safi, Place Mohamed V',
      heroDescription: "The world's largest Sardine Ball Tajine was presented on Saturday, July 10, 1999, in Safi at Place Mohamed V, initiated by the Association of Economic Operators of the Capital of Abda.",
      heroCta: 'Discover',
      heritageTitle: 'Ceramic Heritage of Safi',
      heritageDescription: 'Safi pottery is a distinctive ceramic tradition produced in Safi, Morocco. It is handcrafted by local artisans using traditional techniques. Each piece reflects Moroccan heritage through refined forms, motifs, and craftsmanship.',
      heritageCta: 'Discover',
      hoursTitle: 'Hours',
      hoursCaption: 'Museum opening hours',
      hoursDayHeader: 'Day',
      hoursTimeHeader: 'Time',
      galleryPremiumTitle: 'Premium Gallery',
      galleryPageTitle: 'Gallery',
      galleryPageIntro: 'A selection of our pottery pieces',
      artistsTitle: 'Our Artists',
      atelierTitle: 'Hours',
      atelierParticipateTitle: 'Join an Atelier',
      atelierParticipateText: 'We are delighted to welcome you',
      fullNamePlaceholder: 'full name',
      emailPlaceholder: 'email address',
      cinPlaceholder: 'national identity card number',
      phonePlaceholder: 'phone number',
      submitLabel: 'submit',
      navHomeLabel: 'Home',
      navGalleryLabel: 'Gallery',
      navWorkshopLabel: 'Workshop',
      footerLocationLabel: 'Location',
      statusOpen: 'Open Now',
      statusClosed: 'Closed',
      hoursRows: [
        ['Monday', '10:00 - 18:00', false],
        ['Tuesday', 'Closed', true],
        ['Wednesday', '10:00 - 18:00', false],
        ['Thursday', '10:00 - 18:00', false],
        ['Friday', '10:00 - 18:00', false],
        ['Saturday', '10:00 - 18:00', false],
        ['Sunday', '10:00 - 18:00', false]
      ]
    }
  };

  const setText = (id, value) => {
    const node = document.getElementById(id);
    if (node && typeof value === 'string') node.textContent = value;
  };

  const setPlaceholder = (id, value) => {
    const node = document.getElementById(id);
    if (node && typeof value === 'string') node.setAttribute('placeholder', value);
  };

  const setValue = (id, value) => {
    const node = document.getElementById(id);
    if (node && typeof value === 'string') node.value = value;
  };

  function renderHoursRows(rows) {
    const homeTable = document.getElementById('hoursTableBody');
    if (homeTable) {
      homeTable.innerHTML = rows.map(([day, time, closed]) => {
        const cls = closed ? ' class="closed-row"' : '';
        return `<tr${cls}><td>${day}</td><td>${time}</td></tr>`;
      }).join('');
    }

    const atelierList = document.getElementById('scheduleList');
    if (atelierList) {
      const dayMap = [1, 2, 3, 4, 5, 6, 0];
      atelierList.innerHTML = rows.map(([day, time, closed], index) => {
        const dayNum = dayMap[index];
        const closedClass = closed ? ' schedule-row-closed' : '';
        const timeAttrs = closed ? ' data-closed="true"' : ' data-open="10:00" data-close="18:00"';
        return `<li class="schedule-row${closedClass}" data-day="${dayNum}"${timeAttrs}><span class="day-label">${day}</span><span class="time-slot${closed ? ' closed-slot' : ''}"><svg class="slot-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>${time}</span></li>`;
      }).join('');
    }
  }

  function applyLanguage(lang) {
    const t = dictionary[lang] || dictionary.fr;

    setText('heroTitle', t.heroTitle);
    setText('heroDate', t.heroDate);
    setText('heroLocation', t.heroLocation);
    setText('heroDescription', t.heroDescription);
    setText('heroCta', t.heroCta);

    setText('heritageTitle', t.heritageTitle);
    setText('heritageDescription', t.heritageDescription);
    setText('heritageCta', t.heritageCta);

    setText('galleryPageTitle', t.galleryPageTitle);
    setText('artistsTitle', t.artistsTitle || (lang === 'fr' ? 'Nos Artistes' : 'Our Artists'));
    setText('galleryPageIntro', t.galleryPageIntro);

    setText('atelierTitle', t.atelierTitle);
    setText('atelierParticipateTitle', t.atelierParticipateTitle);
    setText('atelierParticipateText', t.atelierParticipateText);

    setPlaceholder('fullname', t.fullNamePlaceholder);
    setPlaceholder('email', t.emailPlaceholder);
    setPlaceholder('cin', t.cinPlaceholder);
    setPlaceholder('num', t.phonePlaceholder);
    setValue('submitBtn', t.submitLabel);

    setText('footerHomeLabel', t.navHomeLabel);
    setText('footerGalleryLabel', t.navGalleryLabel);
    setText('footerWorkshopLabel', t.navWorkshopLabel);
    setText('footerLocationLabel', t.footerLocationLabel);

    document.documentElement.lang = lang;
    document.dispatchEvent(new CustomEvent('app:language-applied', { detail: { language: lang, labels: { open: t.statusOpen, closed: t.statusClosed } } }));
  }

  function animateAndApply(lang) {
    contentRoot.classList.add('lang-switch-out');
    window.setTimeout(() => {
      applyLanguage(lang);
      contentRoot.classList.remove('lang-switch-out');
      contentRoot.classList.add('lang-switch-in');
      window.setTimeout(() => contentRoot.classList.remove('lang-switch-in'), 260);
    }, 180);
  }

  document.addEventListener('app:language-change', (event) => {
    animateAndApply(event.detail.language);
  });

  applyLanguage(localStorage.getItem('language') || 'fr');
})();





