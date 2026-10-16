const projects = Array.isArray(window.pixcubeProjects) ? window.pixcubeProjects : [];
const grid = document.querySelector('#projects-grid');
const emptyState = document.querySelector('#projects-empty');
const filters = document.querySelector('#project-filters');
const count = document.querySelector('#project-count');
const modal = document.querySelector('#project-modal');
let activeProject = null;
let activeImage = 0;

function updateModalImage() {
  if (!activeProject) return;
  const image = modal.querySelector('.project-modal-image');
  const placeholder = modal.querySelector('.project-modal-placeholder');
  const hasImages = Array.isArray(activeProject.images) && activeProject.images.length > 0;
  image.hidden = !hasImages;
  placeholder.hidden = hasImages;
  if (!hasImages) {
    modal.querySelector('.project-modal-counter').textContent = '';
    modal.querySelectorAll('.project-modal-arrow').forEach((button) => { button.hidden = true; });
    return;
  }
  image.src = activeProject.images[activeImage];
  image.alt = `${activeProject.title}, imagen ${activeImage + 1}`;
  modal.querySelector('.project-modal-counter').textContent = `${String(activeImage + 1).padStart(2, '0')} / ${String(activeProject.images.length).padStart(2, '0')}`;
  const multiple = activeProject.images.length > 1;
  modal.querySelectorAll('.project-modal-arrow').forEach((button) => { button.hidden = !multiple; });
}

function openProject(project) {
  if (!modal) return;
  activeProject = project;
  activeImage = 0;
  modal.querySelector('.project-modal-category').textContent = project.category || 'Proyecto PixCube';
  modal.querySelector('.project-modal-title').textContent = project.title || 'Proyecto PixCube';
  modal.querySelector('.project-modal-status').textContent = project.status || '';
  modal.querySelector('.project-modal-description').textContent = project.description || '';
  const tags = modal.querySelector('.project-modal-tags');
  tags.replaceChildren();
  (project.technologies || []).forEach((technology) => {
    const tag = document.createElement('span');
    tag.textContent = technology;
    tags.append(tag);
  });
  updateModalImage();
  modal.showModal();
  document.body.classList.add('project-modal-open');
}

function closeProject() {
  modal.close();
  document.body.classList.remove('project-modal-open');
}

function makeProjectCard(project, index) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';
  card.dataset.category = project.category || 'Otra';

  const art = document.createElement('div');
  art.className = 'portfolio-art';
  art.dataset.variant = String(index % 4 + 1);
  const images = Array.isArray(project.images) ? project.images : (project.image ? [project.image] : []);
  const preview = document.createElement('button');
  preview.type = 'button';
  preview.className = 'portfolio-preview';
  preview.setAttribute('aria-label', `Ver más información: ${project.title || 'proyecto PixCube'}`);
  preview.addEventListener('click', () => openProject(project));
  if (images.length) {
    const image = document.createElement('img');
    image.src = images[0];
    image.alt = `Vista previa: ${project.title || 'proyecto PixCube'}`;
    image.loading = 'lazy';
    preview.append(image);
  } else {
    const symbol = document.createElement('span');
    symbol.className = 'portfolio-art-symbol';
    symbol.textContent = ['✳︎', '◈', '⌘', '✦'][index % 4];
    preview.append(symbol);
  }
  art.append(preview);

  if (images.length > 1) {
    let active = 0;
    const image = preview.querySelector('img');
    const counter = document.createElement('span');
    counter.className = 'portfolio-image-counter';
    counter.textContent = `01 / ${String(images.length).padStart(2, '0')}`;
    const changeImage = (step) => {
      active = (active + step + images.length) % images.length;
      image.src = images[active];
      image.alt = `Vista previa ${active + 1}: ${project.title || 'proyecto PixCube'}`;
      counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    };
    [['←', -1, 'Imagen anterior'], ['→', 1, 'Imagen siguiente']].forEach(([label, step, accessibleLabel], idx) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `portfolio-arrow ${idx === 0 ? 'portfolio-arrow-prev' : 'portfolio-arrow-next'}`;
      button.setAttribute('aria-label', accessibleLabel);
      button.textContent = label;
      button.addEventListener('click', () => changeImage(step));
      art.append(button);
    });
    art.append(counter);
  }
  const category = document.createElement('span');
  category.className = 'portfolio-category';
  category.textContent = project.category || 'Proyecto PixCube';
  art.append(category);
  card.append(art);

  const details = document.createElement('div');
  details.className = 'portfolio-details';
  const meta = document.createElement('div');
  meta.className = 'portfolio-meta';
  const metaCategory = document.createElement('span');
  metaCategory.textContent = String(project.category || 'PROYECTO').toUpperCase();
  meta.append(metaCategory);
  const title = document.createElement('h3');
  title.textContent = project.title || 'Proyecto PixCube';
  const status = document.createElement('p');
  status.className = 'portfolio-status';
  status.textContent = project.status || '';
  const description = document.createElement('p');
  description.className = 'portfolio-description';
  description.textContent = project.description || '';
  details.append(meta, title);
  if (project.status) details.append(status);
  details.append(description);

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
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'portfolio-more';
  more.textContent = 'Ver proyecto y acercar ↗';
  more.addEventListener('click', () => openProject(project));
  details.append(more);
  card.append(details);
  return card;
}

if (!projects.length) {
  emptyState.hidden = false;
  count.textContent = 'PRÓXIMAMENTE';
  filters.hidden = true;
} else {
  count.textContent = `${String(projects.length).padStart(2, '0')} PROYECTOS`;
  const categories = ['Todos', ...new Set(projects.map((project) => project.category || 'Otra'))];
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-button${index === 0 ? ' active' : ''}`;
    button.textContent = category;
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      grid.querySelectorAll('.portfolio-card').forEach((card) => { card.hidden = category !== 'Todos' && card.dataset.category !== category; });
    });
    filters.append(button);
  });
  projects.forEach((project, index) => grid.append(makeProjectCard(project, index)));
}

if (modal) {
  modal.querySelector('.project-modal-close').addEventListener('click', closeProject);
  modal.querySelector('.project-modal-prev').addEventListener('click', () => {
    activeImage = (activeImage - 1 + activeProject.images.length) % activeProject.images.length;
    updateModalImage();
  });
  modal.querySelector('.project-modal-next').addEventListener('click', () => {
    activeImage = (activeImage + 1) % activeProject.images.length;
    updateModalImage();
  });
  modal.addEventListener('click', (event) => { if (event.target === modal) closeProject(); });
  modal.addEventListener('close', () => document.body.classList.remove('project-modal-open'));
}
