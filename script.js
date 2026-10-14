const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme, save = true) {
  document.documentElement.dataset.theme = theme;
  const isLight = theme === 'light';
  themeIcon.textContent = isLight ? '☾' : '☼';
  themeButton.setAttribute('aria-label', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
  themeButton.setAttribute('title', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
  themeMeta.setAttribute('content', isLight ? '#f5f4ee' : '#111110');
  if (save) {
    try { localStorage.setItem('pixcube-theme', theme); } catch (_) { /* El tema sigue funcionando sin almacenamiento local. */ }
  }
}

let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('pixcube-theme') || 'dark'; } catch (_) { /* El tema oscuro es el valor inicial. */ }
setTheme(savedTheme, false);
themeButton.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  nav.classList.toggle('open', open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  nav.classList.remove('open');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-kicker, .intro-layout, .service-card, .work-heading, .project-row, .manifesto p, .team-heading, .team-card, .contact-content').forEach((element, index) => {
  element.classList.add('reveal');
  if (element.matches('.service-card, .team-card')) element.style.transitionDelay = `${(index % 3) * 90}ms`;
  observer.observe(element);
});
