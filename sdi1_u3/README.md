# Seminario Proyecto de Investigación I — Unidad 3

## Descripción general

Objeto Virtual de Aprendizaje (OVA) para el curso **Seminario Proyecto de Investigación I**, de la Maestría en Didáctica de las Ciencias Naturales (Universidad de Córdoba). Esta unidad corresponde a la fase de diseño metodológico: parte de una idea de investigación ya consolidada, revisa y ajusta el árbol de problemas de la Unidad 1, y acompaña el diseño y la validación de un instrumento de recolección de información.

## Objetivo de aprendizaje

Reconocer los paradigmas y métodos de la investigación cualitativa, seleccionar la técnica y el instrumento de recolección de información pertinentes para el proyecto, construir la matriz de consistencia (pregunta–objetivo–categoría–indicador) y validar el instrumento mediante juicio de expertos.

## Contenidos principales

- Paradigmas de investigación cualitativa.
- Métodos de investigación cualitativa.
- Instrumentos y técnicas de recolección de información.
- Diseño y validación de instrumentos.
- Matriz de consistencia.

## Actividades

La actividad interactiva está organizada en 2 pestañas:

- **Ajuste del árbol de problemas y diseño de instrumentos**: se presenta como un asistente de 2 pasos, con navegación Anterior/Siguiente:
  - *Paso 1*: ajuste del problema central (si aplica), cambios realizados y su justificación, y coherencia verificada frente a la Unidad 1.
  - *Paso 2*: técnica de recolección seleccionada (tarjetas de selección visual: entrevista, observación, grupo focal, análisis documental, otra), borrador del instrumento, matriz de consistencia (mini-tabla dinámica de filas, hasta 6), tabla de validación con el nombre de los tres expertos, los criterios de evaluación aplicados (checklist visual de chips: claridad, pertinencia, coherencia) y los ajustes realizados al instrumento.
- **Rúbrica**: tabla desplegable con los 5 criterios de evaluación de la metodología, en 4 niveles cada uno.

El formulario tiene botones **Guardar** y **Limpiar** (el avance se restaura solo al volver a cargar la página, y funciona sin importar en qué paso esté el estudiante) y un botón **Exportar** con las respuestas en Word (.doc) y en PDF real.

## Autoevaluación

Cuestionario interactivo de 10 preguntas sobre paradigmas y métodos cualitativos, instrumentos de recolección y validación por juicio de expertos, con puntaje final, revisión de respuestas correctas e incorrectas, y botón para reiniciar el intento.

## Tecnologías utilizadas

- HTML5.
- Tailwind CSS mediante CDN.
- Font Awesome mediante CDN.
- Google Fonts (Poppins).
- JavaScript Vanilla (`js/script.js`, compartido y idéntico en las 3 unidades del curso).
- localStorage para guardado y restauración automática del avance del estudiante, sin enviar información a ninguna plataforma externa.
- jsPDF (vía CDN) para generar el PDF real de la actividad, directamente en el navegador del estudiante.
- API de códigos QR (qrserver.com) para generación dinámica de códigos en Recursos y Bibliografía.

## Estructura de archivos

```text
Unidad3/
├── index.html
├── README.md
├── style.css
├── js/
│   └── script.js
└── img/
    ├── logo-maestria.jpeg
    ├── escudo-unicordoba.jpg
    ├── cintia-logo-vertical-con-lema.png
    ├── cintia-logo-horizontal-con-lema.png
    ├── cintia-logo-vertical-sin-lema.png
    ├── cintia-logo-horizontal-sin-lema.png
    └── cintia-cubo-solo.png
```

## Recursos

- Biblioteca Universidad de Córdoba — bases de datos para consultar literatura sobre paradigmas y métodos de investigación cualitativa.
- Tutorial audiovisual "Cómo hacer el instrumento de validación de expertos".
- Scielo — biblioteca científica electrónica para consultar estudios cualitativos aplicados a la educación en ciencias.
- Nota: los talleres de construcción colectiva y el formato de validación los comparte directamente la docente en clase.

## Bibliografía enlazada

- Restrepo-Gómez, B. (2004). *La investigación-acción educativa y la construcción del saber pedagógico*. Educación y Educadores, 7, 45-55.
- Herr, K., & Anderson, G. L. (2015). *The Action Research Dissertation. A Guide for Students and Faculty* (2.ª ed.). Thousand Oaks, California: Sage Publications.
- Ñaupas, H., Mejía, E., Novoa, E., & Villagómez, A. (2014). *Metodología de la investigación cuantitativa-cualitativa y redacción de la tesis*. Bogotá: Ediciones de la U.

## Desarrollado por

Centro de Innovación en TIC para el apoyo de la Docencia CINTIA
Universidad de Córdoba
