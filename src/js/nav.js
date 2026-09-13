export function initNav() {
  const nav = document.getElementById('nav');
  const progressFill = nav.querySelector('.nav-progress-fill');
  const links = nav.querySelectorAll('.nav-links a');

  // ── Shrink on scroll ───────────────────────────────────────────────────
  const onScroll = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;

    nav.classList.toggle('scrolled', scrolled > 60);

    // Progress bar
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    progressFill.style.width = pct + '%';

    // Active link highlighting
    const sections = ['hero', 'about', 'subjects', 'results', 'desk', 'contact'];
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });

    links.forEach(link => {
      const section = link.getAttribute('data-section');
      link.classList.toggle('active', section === current);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Smooth anchor clicks ───────────────────────────────────────────────
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
