# Seminario Proyecto de Investigación I — Unidad 2

## Descripción general

Objeto Virtual de Aprendizaje (OVA) para el curso **Seminario Proyecto de Investigación I**, de la Maestría en Didáctica de las Ciencias Naturales (Universidad de Córdoba). Esta unidad acompaña la construcción del marco referencial del proyecto de investigación: antecedentes, categorías de estudio y marco teórico, apoyándose conceptualmente en la metodología PRISMA como referencia opcional.

## Objetivo de aprendizaje

Construir el marco referencial del proyecto de investigación: definir las categorías de estudio, consolidar los antecedentes mediante una búsqueda sistemática (con cadenas de búsqueda en español e inglés), articular el marco teórico y reflexionar sobre cómo contexto, teoría y problema se conectan en el texto final.

## Contenidos principales

- Origen, características, ventajas y limitantes del marco referencial.
- Antecedentes: revisión sistemática con cadenas de búsqueda.
- Marco teórico del proyecto de investigación.
- Articulación contexto–teoría–texto.

## Actividades

La actividad interactiva está organizada en 2 pestañas:

- **Construyendo mi marco referencial**: categorías de estudio del proyecto (lista dinámica de "agregar ítem", hasta 6), cadena(s) de búsqueda utilizada(s), bases de datos o repositorios consultados (checklist visual de chips, con opción "Otra"), síntesis de antecedentes, marco teórico y una reflexión de articulación.
- **Rúbrica**: tabla desplegable con los 6 criterios de evaluación del estado del arte, marco teórico, marco legal y marco contextual, en 4 niveles cada uno.

El formulario tiene botones **Guardar** y **Limpiar** (el avance se restaura solo al volver a cargar la página) y un botón **Exportar** con las respuestas del estudiante en Word (.doc) y en PDF real.

## Autoevaluación

Cuestionario interactivo de 10 preguntas sobre el marco referencial, la revisión de antecedentes y el marco teórico, con puntaje final, revisión de respuestas correctas e incorrectas, y botón para reiniciar el intento.

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
Unidad2/
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

- Biblioteca Universidad de Córdoba — bases de datos para apoyar la búsqueda sistemática de antecedentes y del marco teórico.
- Redalyc — repositorio de acceso abierto para localizar antecedentes en revistas iberoamericanas.
- Scielo — biblioteca científica electrónica para ubicar antecedentes en español y portugués.
- Declaración PRISMA 2020 — guía de referencia opcional, no evaluable en este curso, para quienes deseen dar mayor estructura a su revisión de antecedentes.

## Bibliografía enlazada

- Gallego Ramos, J. R. (2018). *Cómo se construye el marco teórico de la investigación*. Cadernos de Pesquisa, 48(169), 830-854.
- Guevara Patiño, R. (2016). *El estado del arte en la investigación: ¿análisis de los conocimientos acumulados o indagación por nuevos sentidos?* Folios, 44, 165-179.
- Gómez Vargas, M., Galeano Higuita, C., & Jaramillo Muñoz, D. A. (2015). *El estado del arte: una metodología de investigación*. Revista Colombiana de Ciencias Sociales.

## Desarrollado por

Centro de Innovación en TIC para el apoyo de la Docencia CINTIA
Universidad de Córdoba
