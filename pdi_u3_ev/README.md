# OVA Gerencia del Talento Humano - Unidad 3: Ética Organizacional y Medición de Impacto

## Descripción General

Objeto Virtual de Aprendizaje interactivo para la **Especialización en Gerencia del Talento Humano y Desarrollo Organizacional** de la Universidad de Córdoba, enfocado en la **Ética Organizacional y la Medición de Impacto Social**.

El OVA integra contenido diagnóstico, tres actividades evaluativas interactivas (dos de ellas con navegación wizard paso a paso), generación de prompts para retroalimentación con IA y persistencia del diagnóstico en el navegador.

---

## Objetivos de Aprendizaje

- Diagnosticar prácticas y percepciones sobre ética, transparencia e indicadores de gestión del talento humano en contextos organizacionales.
- Aplicar los principios éticos de la UNESCO para auditar algoritmos de selección de personal y detectar sesgos.
- Identificar y clasificar stakeholders de un proyecto de intervención mediante una matriz de materialidad.
- Calcular el Retorno Social de la Inversión (SROI) de una iniciativa de bienestar laboral con justificación ética.
- Reconocer dilemas éticos organizacionales y proponer argumentaciones fundadas en la ética de las virtudes y la deontología.

---

## Características Principales

### Diagnóstico
- 8 preguntas orientadoras sobre ética organizacional, transparencia, integridad institucional e indicadores de gestión del talento humano.
- Tipos de pregunta: radio, radio con likert, radio con texto libre, checkbox y textarea.
- Guardado en `localStorage` (clave `diagnostico_u03`).
- Exportación a Word (.doc) y TXT.
- Botón de reinicio con limpieza completa.

### Actividad 1 — Auditoría de IA Ética
- Wizard de **5 pasos** para auditar un algoritmo de selección de personal:
  1. 🤖 Descripción del algoritmo de selección.
  2. ⚖️ Principios éticos de la UNESCO posiblemente vulnerados.
  3. 🔍 Sesgos identificados.
  4. 🛡️ Medidas de mitigación desde la ética de las virtudes y la deontología.
  5. ✍️ Conclusión ética sobre el uso del algoritmo.
- Barra de progreso + contador de pasos completados.
- Dots numerados clicables para navegar entre pasos.
- Botones **Anterior / Siguiente** para navegación secuencial.
- En el último paso aparecen: **Generar prompt**, **Limpiar**.
- El prompt generado está estructurado para ser pegado en Google Gemini y recibir retroalimentación experta.
- Al limpiar: vuelve al paso 1 y hace scroll al inicio de la sección.

### Actividad 2 — Mapa de Stakeholders
- Juego de arrastrar y soltar (drag & drop) para clasificar 5 tipos de stakeholders.
- Descripciones de stakeholders basadas en la matriz de materialidad del proyecto de intervención.
- Botones **Verificar** y **Reiniciar**.
- Retroalimentación inmediata con puntuación y respuestas correctas.
- Al reiniciar: limpia el tablero y hace scroll al inicio de la sección.

### Actividad 3 — Taller de SROI
- Wizard de **5 pasos** para calcular el SROI de una iniciativa de bienestar laboral:
  1. 📋 Descripción de la iniciativa de bienestar laboral.
  2. 👥 Grupos beneficiados (stakeholders).
  3. 📈 Beneficios sociales estimados (cuantitativos e intangibles).
  4. 💰 Inversión total estimada.
  5. 📊 Ratio SROI estimado y justificación ética.
- Barra de progreso + contador de pasos completados.
- Dots numerados clicables para navegar entre pasos.
- Botones **Anterior / Siguiente** para navegación secuencial.
- En el último paso aparecen: **Generar prompt**, **Limpiar**.
- El prompt generado está estructurado para ser pegado en Google Gemini y recibir retroalimentación experta.
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
4. Realizar las tres actividades evaluativas siguiendo las instrucciones de cada una.

### Actividades Wizard (Act. 1 y Act. 3)

1. Leer la pregunta orientadora de cada paso.
2. Escribir la respuesta en el textarea.
3. Presionar **Siguiente** para avanzar o usar los dots para saltar a un paso específico.
4. Al llegar al último paso, aparecen los botones de acción finales.
5. Presionar **Generar prompt** para obtener el prompt de retroalimentación con IA.
6. Copiar el prompt generado y pegarlo en Google Gemini.
7. Presionar **Limpiar** para reiniciar la actividad.

---

## Estructura de Archivos

```text
Actividades evaluativas unidad 3/
├── index.html       # OVA completo de la Unidad 3
├── logo.webp        # Logotipo institucional
└── README.md        # Descripción del proyecto
```

---

## Contenido de las Actividades

### Actividad 1 — Auditoría de IA Ética

| Paso | Contenido |
|------|-----------|
| 1 | Descripción del algoritmo de selección |
| 2 | Principios éticos de la UNESCO posiblemente vulnerados |
| 3 | Sesgos identificados |
| 4 | Medidas de mitigación desde la ética de las virtudes y la deontología |
| 5 | Conclusión ética sobre el uso del algoritmo |

### Actividad 2 — Mapa de Stakeholders

| Stakeholder | Descripción |
|-------------|-------------|
| Primario | Directamente afectado por la intervención |
| Secundario | Involucrado indirectamente |
| Clave | Tiene poder de decisión o puede bloquear la intervención |
| Excluido | Grupo afectado que no participa en la decisión |
| Facilitador | Apoya la implementación sin ser destinatario directo |

### Actividad 3 — Taller de SROI

| Paso | Contenido |
|------|-----------|
| 1 | Descripción de la iniciativa de bienestar laboral |
| 2 | Grupos beneficiados (stakeholders) |
| 3 | Beneficios sociales estimados |
| 4 | Inversión total estimada |
| 5 | Ratio SROI estimado y justificación ética |

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
- **JavaScript Vanilla**: wizard de navegación, barra de progreso, dots, drag & drop, localStorage y exportación.
- **Font Awesome 6**: iconografía.
- **Google Fonts (Poppins)**: tipografía.

### Almacenamiento Local

| Clave localStorage | Contenido |
|-------------------|-----------|
| `diagnostico_u03` | Respuestas del diagnóstico |

---

## Público Objetivo

Estudiantes de:

- Especialización en Gerencia del Talento Humano y Desarrollo Organizacional.
- Universidad de Córdoba.
- Asignatura: Proyecto de Intervención — Unidad 3.

---

## Prerrequisitos

- Haber cursado las unidades previas del Proyecto de Intervención.
- Conocimientos básicos sobre ética organizacional, inteligencia artificial, stakeholders y medición de impacto social.
- Manejo básico de navegador web.

---

## Acceso Rápido

| Recurso | Archivo |
|---------|---------|
| OVA Completo | `index.html` |

---

## Impacto Educativo

### Beneficios

- Aprendizaje activo mediante análisis ético de algoritmos de selección.
- Aplicación práctica del mapeo de stakeholders en proyectos de intervención.
- Cálculo del SROI con justificación ética para iniciativas de bienestar laboral.
- Generación automática de prompts para retroalimentación con IA (Google Gemini).
- Exportación del diagnóstico en formatos reutilizables (Word, TXT).
- Persistencia del diagnóstico: el estudiante puede continuar donde lo dejó.

### Resultados Esperados

- Capacidad para identificar riesgos éticos en herramientas de gestión del talento humano basadas en IA.
- Comprensión práctica de la clasificación de stakeholders según su poder e interés.
- Habilidad para estimar y argumentar el valor social de una intervención mediante el SROI.
- Formulación de argumentaciones éticas organizacionales fundamentadas.

---

## Contribuciones

### Fortalezas

- ✅ Interfaz moderna, responsiva y de alta legibilidad.
- ✅ Wizard paso a paso que reduce la carga cognitiva en actividades extensas.
- ✅ Integración con IA (Google Gemini) para retroalimentación de las actividades 1 y 3.
- ✅ Juego interactivo de clasificación de stakeholders.
- ✅ Exportación del diagnóstico a Word y TXT.
- ✅ Datos del diagnóstico guardados automáticamente en el navegador.

### Mejoras Futuras

- Integración con plataforma LMS (Moodle).
- Registro de avance por usuario en las actividades evaluativas.
- Banco ampliado de preguntas diagnósticas.
- Módulo de comparación entre ética deontológica, teleológica y de las virtudes.
- Generación de informe consolidado de las tres actividades en un solo documento.
- Persistencia en localStorage de las respuestas de las actividades 1 y 3.

---

## Contacto

Desarrollado por:  
**CINTIA - Universidad de Córdoba**
