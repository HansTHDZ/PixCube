const projects = Array.isArray(window.pixcubeProjects) ? window.pixcubeProjects : [];
const grid = document.querySelector('#projects-grid');
const emptyState = document.querySelector('#projects-empty');
const filters = document.querySelector('#project-filters');
const count = document.querySelector('#project-count');

function makeProjectCard(project, index) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';
  card.dataset.category = project.category || 'Otra';

  const art = document.createElement('div');
  art.className = 'portfolio-art';
  art.dataset.variant = String(index % 4 + 1);
  if (project.image) {
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.title ? `Vista de ${project.title}` : 'Imagen del proyecto';
    image.loading = 'lazy';
    art.append(image);
  } else {
    const symbol = document.createElement('span');
    symbol.className = 'portfolio-art-symbol';
    symbol.textContent = ['✳', '◈', '⌘', '✦'][index % 4];
    art.append(symbol);
  }
  const category = document.createElement('span');
  category.className = 'portfolio-category';
  category.textContent = project.category || 'Proyecto PixCube';
  art.append(category);
  card.append(art);

  const meta = document.createElement('div');
  meta.className = 'portfolio-meta';
  const metaCategory = document.createElement('span');
  metaCategory.textContent = String(project.category || 'PROYECTO').toUpperCase();
  const metaYear = document.createElement('span');
  metaYear.textContent = project.year || '';
  meta.append(metaCategory, metaYear);
  const title = document.createElement('h3');
  title.textContent = project.title || 'Proyecto PixCube';
  const description = document.createElement('p');
  description.textContent = project.description || '';
  const details = document.createElement('div');
  details.className = 'portfolio-details';
  details.append(meta, title, description);

  if (Array.isArray(project.technologies) && project.technologies.length) {
    const tags = document.createElement('div');
    tags.className = 'portfolio-tags';
    project.technologies.forEach((technology) => {
      const tag = document.createElement('span');
      tag.textContent = technology;
      tags.append(tag);
    });
    details.append(tags);
  }
  if (project.url) {
    const link = document.createElement('a');
    link.className = 'portfolio-link';
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Ver proyecto ↗';
    details.append(link);
  }
  card.append(details);
  return card;
}

if (!projects.length) {
  emptyState.hidden = false;
  count.textContent = 'PRÓXIMAMENTE';
  filters.hidden = true;
} else {
  count.textContent = `${String(projects.length).padStart(2, '0')} PROYECTO${projects.length === 1 ? '' : 'S'}`;
  const categories = ['Todos', ...new Set(projects.map((project) => project.category || 'Otra'))];
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-button${index === 0 ? ' active' : ''}`;
    button.textContent = category;
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      grid.querySelectorAll('.portfolio-card').forEach((card) => {
        card.hidden = category !== 'Todos' && card.dataset.category !== category;
      });
    });
    filters.append(button);
  });
  projects.forEach((project, index) => grid.append(makeProjectCard(project, index)));
}
