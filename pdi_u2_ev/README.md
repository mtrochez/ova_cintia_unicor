# OVA Gerencia del Talento Humano - Unidad 2: Plan de Intervención Organizacional

## Descripción General

Objeto Virtual de Aprendizaje interactivo para la **Especialización en Gerencia del Talento Humano y Desarrollo Organizacional** de la Universidad de Córdoba, enfocado en el **Plan de Intervención Organizacional**.

El OVA integra contenido diagnóstico, tres actividades evaluativas interactivas con navegación wizard paso a paso, exportación de resultados y persistencia de datos en el navegador.

---

## Objetivos de Aprendizaje

- Diagnosticar el estado actual de la organización mediante preguntas orientadoras sobre cambio, estructura y aprendizaje organizacional.
- Aplicar metodologías de diseño organizacional para proponer estructuras alineadas con la estrategia.
- Implementar el modelo de los 8 pasos de Kotter para gestionar procesos de cambio organizacional.
- Identificar casos de aprendizaje de bucle simple y convertirlos en bucle doble según la teoría de Argyris y Schön.
- Reconocer rutinas defensivas y proponer intervenciones transformadoras orientadas al aprendizaje organizacional.

---

## Características Principales

### Diagnóstico
- 8 preguntas orientadoras sobre cambio planificado, obstáculos, liderazgo, cultura y aprendizaje organizacional.
- Tipos de pregunta: radio, radio con likert, radio con texto libre, checkbox y textarea.
- Guardado en `localStorage` (clave `diagnostico_u02`).
- Exportación a Word (.doc) y TXT.
- Botón de reinicio con limpieza completa.

### Actividad 1 — Simulacro de Diseño Organizacional
- Campos para nombre de organización, sector, número de colaboradores, descripción del modelo actual y propuesta de rediseño.
- Guardado en `localStorage` (clave `actividad1_u02`).
- Exportación a Word (.doc) y TXT.
- Botón de limpiar con scroll automático al inicio.

### Actividad 2 — Taller de Gestión del Cambio (Kotter)
- Wizard de **8 pasos** basado en el modelo de Kotter.
- Campo inicial: nombre del proceso de cambio a gestionar.
- Cada paso muestra icono, título, pregunta orientadora y textarea de respuesta (700 caracteres).
- Barra de progreso + contador de pasos completados.
- Dots numerados clicables para navegar entre pasos.
- Botones Anterior / Siguiente para navegación secuencial.
- En el paso 8 aparecen: **Guardar**, **Exportar** (Word/TXT) y **Limpiar**.
- Guardado en `localStorage` (clave `actividad2_u02`).
- Al limpiar: vuelve al paso 1 y hace scroll al inicio de la sección.

### Actividad 3 — Análisis de Caso Argyris
- Wizard de **5 pasos** basado en la teoría de Argyris y Schön:
  1. 🔍 Caso a analizar (500 caracteres)
  2. 🔄 Bucle simple — acción ajustada sin cuestionar la norma (300 caracteres)
  3. 🔁 Bucle doble — supuestos o valores a revisar (300 caracteres)
  4. 🛡️ Rutinas defensivas identificadas (300 caracteres)
  5. 💡 Propuesta de intervención para pasar a bucle doble (400 caracteres)
- Barra de progreso + contador de pasos completados.
- Dots numerados clicables para navegar entre pasos.
- Botones Anterior / Siguiente para navegación secuencial.
- En el paso 5 aparecen: **Generar prompt**, **Abrir Gemini**, **Exportar** (Word/TXT) y **Limpiar**.
- El prompt generado está estructurado para ser pegado en Google Gemini y recibir retroalimentación experta sobre el análisis.
- Guardado en `localStorage` (clave `actividad3_u02`) al generar el prompt.
- Al limpiar: vuelve al paso 1 y hace scroll al inicio de la sección.

---

## Cómo Usar

### OVA Completo

1. Abrir el archivo `index.html` en un navegador compatible.
2. Navegar por las secciones del menú lateral:
   - Introducción.
   - Diagnóstico.
   - Actividad 1.
   - Actividad 2.
   - Actividad 3.
3. Completar el diagnóstico respondiendo las 8 preguntas orientadoras.
4. Realizar las tres actividades evaluativas siguiendo el wizard paso a paso.

### Actividades Wizard (Act. 2 y Act. 3)

1. Leer la pregunta orientadora de cada paso.
2. Escribir la respuesta en el textarea.
3. Presionar **Siguiente** para avanzar o usar los dots para saltar a un paso específico.
4. Al llegar al último paso, aparecen los botones de acción finales.
5. Presionar **Guardar** (Act. 2) o **Generar prompt** (Act. 3) para registrar las respuestas.
6. Para Act. 3: copiar el prompt generado y pegarlo en Google Gemini.
7. Exportar el resultado en Word o TXT según necesidad.

---

## Estructura de Archivos

```text
Actividades evaluativas unidad 2/
├── index.html       # OVA completo de la Unidad 2
├── logo.webp        # Logotipo institucional
└── README.md        # Descripción del proyecto
```

---

## Contenido de las Actividades

### Actividad 2 — 8 Pasos de Kotter

| Paso | Título |
|------|--------|
| 1 | Crear urgencia |
| 2 | Formar una coalición |
| 3 | Desarrollar visión y estrategia |
| 4 | Comunicar la visión |
| 5 | Eliminar obstáculos |
| 6 | Generar victorias a corto plazo |
| 7 | Consolidar logros y generar más cambio |
| 8 | Anclar el cambio en la cultura |

### Actividad 3 — Análisis Argyris

| Paso | Contenido |
|------|-----------|
| 1 | Descripción del caso organizacional |
| 2 | Acción de bucle simple (corrección sin cuestionar) |
| 3 | Revisión de supuestos (bucle doble) |
| 4 | Rutinas defensivas presentes |
| 5 | Propuesta de intervención transformadora |

---

## Requisitos Técnicos

### Navegadores Compatibles

- Chrome 80+.
- Firefox 75+.
- Safari 13+.
- Edge 80+.

### Tecnologías Utilizadas

- **HTML5**: estructura semántica del OVA.
- **Tailwind CSS (CDN)**: diseño responsivo y componentes visuales.
- **CSS3**: estilos personalizados, variables de color y animaciones.
- **JavaScript Vanilla**: wizard de navegación, barra de progreso, dots, localStorage y exportación.
- **Font Awesome 6**: iconografía.
- **Google Fonts (Poppins)**: tipografía.

### Almacenamiento Local

| Clave localStorage | Contenido |
|-------------------|-----------|
| `diagnostico_u02` | Respuestas del diagnóstico |
| `actividad1_u02`  | Datos del simulacro de diseño organizacional |
| `actividad2_u02`  | Respuestas del taller Kotter (JSON) |
| `actividad3_u02`  | Respuestas del análisis Argyris (JSON) |

---

## Público Objetivo

Estudiantes de:

- Especialización en Gerencia del Talento Humano y Desarrollo Organizacional.
- Universidad de Córdoba.
- Asignatura: Proyecto de Intervención — Unidad 2.

---

## Prerrequisitos

- Haber cursado la Unidad 1 del Proyecto de Intervención.
- Conocimientos básicos sobre cambio organizacional y gestión del talento humano.
- Manejo básico de navegador web.

---

## Acceso Rápido

| Recurso | Archivo |
|---------|---------|
| OVA Completo | `index.html` |

---

## Impacto Educativo

### Beneficios

- Aprendizaje activo mediante análisis de casos reales de la propia organización del estudiante.
- Aplicación directa del modelo Kotter en un proceso de cambio concreto.
- Generación automática de prompts para retroalimentación con IA (Google Gemini).
- Exportación de resultados en formatos reutilizables (Word, TXT).
- Persistencia de datos: el estudiante puede continuar donde lo dejó.

### Resultados Esperados

- Capacidad para diseñar un plan de gestión del cambio basado en los 8 pasos de Kotter.
- Comprensión práctica de la diferencia entre bucle simple y bucle doble de Argyris y Schön.
- Identificación de rutinas defensivas en contextos organizacionales reales.
- Formulación de intervenciones transformadoras orientadas al aprendizaje organizacional.

---

## Contribuciones

### Fortalezas

- ✅ Interfaz moderna, responsiva y de alta legibilidad.
- ✅ Wizard paso a paso que reduce la carga cognitiva en actividades extensas.
- ✅ Integración con IA (Google Gemini) para retroalimentación del análisis Argyris.
- ✅ Exportación a Word y TXT en todas las actividades.
- ✅ Datos guardados automáticamente en el navegador.

### Mejoras Futuras

- Integración con plataforma LMS (Moodle).
- Registro de avance por usuario.
- Banco ampliado de preguntas diagnósticas.
- Módulo de comparación entre ciclo Kotter y modelo ADKAR.
- Generación de informe consolidado de las tres actividades en un solo documento.

---

## Contacto

Desarrollado por:  
**CINTIA - Universidad de Córdoba**
