const revealTargets = document.querySelectorAll('.reveal');
const staggerTargets = document.querySelectorAll('.image-card, .form-card, .background .list-group li, .background .contact-group li');

staggerTargets.forEach((el, index) => {
  el.classList.add('stagger-item');
  el.style.setProperty('--stagger-index', String(index % 8));
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
);

[...revealTargets, ...staggerTargets].forEach((target) => observer.observe(target));

function parseTimeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return (hours * 60) + minutes;
}

function updateOpenStatus() {
  const badge = document.getElementById('openStatusBadge');
  const rows = document.querySelectorAll('.schedule-row');

  if (!badge || !rows.length) {
    return;
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = (now.getHours() * 60) + now.getMinutes();

  const todayRow = Array.from(rows).find((row) => Number(row.dataset.day) === currentDay);

  let isOpen = false;

  if (todayRow && !todayRow.dataset.closed) {
    const openMinutes = parseTimeToMinutes(todayRow.dataset.open);
    const closeMinutes = parseTimeToMinutes(todayRow.dataset.close);
    isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  const lang = localStorage.getItem('language') || 'fr';
  const openLabel = lang === 'fr' ? 'Ouvert' : 'Open Now';
  const closedLabel = lang === 'fr' ? 'Ferme' : 'Closed';
  badge.textContent = isOpen ? openLabel : closedLabel;
  badge.classList.toggle('open', isOpen);
  badge.classList.toggle('closed', !isOpen);
}

updateOpenStatus();
setInterval(updateOpenStatus, 60000);


