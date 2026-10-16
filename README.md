# PixCube — portafolio web

Sitio estático hecho con HTML, CSS y JavaScript, listo para publicar en GitHub Pages. No requiere compilación ni dependencias. Abre `index.html` para verlo localmente.

## Contenido

- `index.html`: inicio, servicios, equipo y contacto.
- `proyectos.html`: galería del portafolio con filtros por **Diseño** y **Desarrollo**.
- `projects-data.js`: proyectos, descripciones, imágenes y tecnologías; este es el archivo para actualizar la galería.
- `projects-page.js`: renderizado de tarjetas, filtros y navegación entre imágenes de cada proyecto.
- `styles.css` y `script.js`: diseño adaptable, animaciones, menú móvil y tema claro/oscuro.
- `assets/projects/`: imágenes optimizadas de los proyectos.

## Presentación responsable de los proyectos

Las piezas de Prepa Adolfo se muestran como muestras de trabajo, no como campañas necesariamente publicadas o finales. Se difuminaron los rostros visibles en las fotos escolares. Los diseños del club de danza son piezas gráficas; el logotipo TIC es una propuesta conceptual y la pantalla de florería es una exploración inicial. La tienda de refaccionaria corresponde a una implementación en Odoo. Las automatizaciones n8n se describen sin pantallas ni datos por confidencialidad.

El video de entrevista no está incluido. Conviene publicarlo solo cuando tengan autorización de la escuela y de todas las personas identificables que aparecen; si hay menores, también de sus tutores.

## Actualizar o agregar proyectos

1. Copien las imágenes optimizadas a `assets/projects/`.
2. En `projects-data.js`, agreguen un objeto dentro del arreglo `window.pixcubeProjects`.
3. Completen `title`, `category` (`Diseño` o `Desarrollo`), `status`, `description`, `technologies` e `images`.
4. En `images`, usen rutas relativas, por ejemplo `"assets/projects/mi-proyecto.webp"`. Se puede incluir más de una imagen por proyecto; aparecerán flechas para recorrerlas.

Ejemplo:

```js
{
  title: "Nombre del proyecto",
  category: "Diseño",
  status: "Propuesta conceptual",
  description: "Qué se diseñó y qué alcance tuvo.",
  technologies: ["Adobe Illustrator", "Adobe Photoshop"],
  images: ["assets/projects/mi-proyecto.webp"]
}
```

Usen `category: "Desarrollo"` para desarrollos funcionales y describan con precisión el estado real del proyecto. Si no cuentan con permiso para compartir un trabajo, pueden incluir solo una descripción general sin información identificable.

## Publicar en GitHub Pages

Suban el contenido de esta carpeta a la rama del sitio. En GitHub, abran **Settings → Pages**, seleccionen **Deploy from a branch**, elijan la rama y la carpeta raíz (`/`). Los enlaces internos son relativos y funcionan en sitios de proyecto como `usuario.github.io/repositorio/`.

## Datos que faltan por completar

El equipo ya aparece con los seis nombres proporcionados. Revisen que cuentan con permiso para mostrar cada pieza antes de publicar.

