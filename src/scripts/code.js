const revealTargets = document.querySelectorAll('.reveal');
const faqQuestions = document.querySelectorAll('.faq-question');
const heroCta = document.getElementById('heroCta');
const heritageCta = document.getElementById('heritageCta');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
);

revealTargets.forEach((el) => revealObserver.observe(el));

faqQuestions.forEach((questionBtn) => {
  questionBtn.addEventListener('click', () => {
    const answer = questionBtn.nextElementSibling;
    const icon = questionBtn.querySelector('.faq-icon');
    const opened = answer.style.display === 'block';

    answer.style.display = opened ? 'none' : 'block';
    if (icon) icon.textContent = opened ? '+' : '-';
  });
});

if (heroCta) {
  heroCta.addEventListener('click', () => {
    window.location.href = 'src/pages/galerie.html';
  });
}

if (heritageCta) {
  heritageCta.addEventListener('click', () => {
    window.location.href = 'src/pages/galerie.html';
  });
}
