# Seminario Proyecto de Investigación I — Unidad 1

## Descripción general

Objeto Virtual de Aprendizaje (OVA) para el curso **Seminario Proyecto de Investigación I**, de la Maestría en Didáctica de las Ciencias Naturales (Universidad de Córdoba). Esta unidad es el punto de partida del proceso investigativo del maestrante: acompaña la construcción y delimitación del objeto de estudio, desde una inquietud general hasta un problema de investigación concreto, con su pregunta, su justificación y sus objetivos.

## Objetivo de aprendizaje

Delimitar el problema de investigación mediante la construcción de un árbol de problemas, formular la pregunta de investigación que lo articula, justificar su relevancia en las dimensiones social, académica, disciplinar e institucional, y plantear el objetivo general junto con los objetivos específicos del proyecto.

## Contenidos principales

- Concreción de la idea de investigación.
- Delimitación del problema mediante el árbol de problemas.
- La pregunta de investigación como eje articulador.
- Justificación: relevancia social, académica, disciplinar e institucional.
- Objetivos: del objetivo general a los específicos.

## Actividades

La actividad interactiva está organizada en 3 pestañas:

- **Árbol de problemas**: el estudiante registra el problema central, agrega sus causas y efectos (listas dinámicas de "agregar ítem", hasta 4 cada una) y redacta una síntesis del problema.
- **Pregunta, justificación y objetivos**: pregunta de investigación, un párrafo de justificación por cada dimensión (social, académica, disciplinar, institucional), el objetivo general y los objetivos específicos (lista dinámica, de 2 a 4 ítems).
- **Rúbrica**: tabla desplegable con los 12 criterios de evaluación del estado de la propuesta (problema de investigación y objetivos), en 4 niveles cada uno.

Cada formulario tiene botones **Guardar** y **Limpiar** propios (el avance se restaura solo al volver a cargar la página, sin necesidad de un botón de restaurar), y un botón **Exportar** con las respuestas del estudiante en Word (.doc) y en PDF real.

## Autoevaluación

Cuestionario interactivo de 10 preguntas sobre delimitación del problema, formulación de la pregunta de investigación, justificación y objetivos, con puntaje final, revisión de respuestas correctas e incorrectas, y botón para reiniciar el intento.

## Tecnologías utilizadas

- HTML5.
- Tailwind CSS mediante CDN.
- Font Awesome mediante CDN.
- Google Fonts (Poppins).
- JavaScript Vanilla (`js/script.js`, compartido y idéntico en las 3 unidades del curso).
- localStorage para guardado y restauración automática del avance del estudiante, sin enviar información a ninguna plataforma externa.
- jsPDF (vía CDN) para generar el PDF real de cada actividad, directamente en el navegador del estudiante.
- API de códigos QR (qrserver.com) para generación dinámica de códigos en Recursos y Bibliografía.

## Estructura de archivos

```text
Unidad1/
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

- Biblioteca Universidad de Córdoba — bases de datos para apoyar la búsqueda de antecedentes que sustenten la justificación del problema.
- Red Colombiana de Información Científica (RedCol / Minciencias) — repositorio nacional para ubicar investigaciones previas relacionadas con el problema planteado.
- Tutorial audiovisual "¿Cómo hacer un árbol de problemas?".
- Nota: la plantilla/formato de árbol de problemas la comparte directamente la docente en clase.

## Bibliografía enlazada

- Asti Vera, A. (1973). *Metodología de la Investigación*. Buenos Aires, Argentina: Editorial Kapelusz.
- Sautu, R., Boniolo, P., Dalle, P., & Elbert, R. (2005). *Manual de metodología. Construcción del marco teórico, formulación de los objetivos y elección de la metodología*. Buenos Aires: CLACSO Libros.
- Ñaupas, H., Mejía, E., Novoa, E., & Villagómez, A. (2014). *Metodología de la investigación cuantitativa-cualitativa y redacción de la tesis*. Bogotá: Ediciones de la U.

## Desarrollado por

Centro de Innovación en TIC para el apoyo de la Docencia CINTIA
Universidad de Córdoba
