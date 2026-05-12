# OVA Cálculo 1 - Unidad 1 Tema 4

## Descripción General

Objeto Virtual de Aprendizaje interactivo para el curso de **Cálculo 1** de Ingeniería de Sistemas, enfocado en el estudio de **funciones exponenciales, funciones logarítmicas y funciones trigonométricas inversas**.

El OVA integra contenido teórico, simulación gráfica, actividades complementarias, guardado manual del progreso y evaluación interactiva con retroalimentación.

## Objetivos de Aprendizaje

- Comprender el comportamiento de las funciones exponenciales, logarítmicas e inversas trigonométricas.
- Reconocer dominios, rangos, propiedades y transformaciones básicas de estas funciones.
- Interpretar modelos matemáticos aplicados a situaciones de Ingeniería de Sistemas.
- Utilizar representaciones gráficas y algebraicas para analizar funciones especiales.
- Resolver actividades interactivas con apoyo de verificación y retroalimentación.

## Características Principales

### Simulador Gráfico Interactivo

- Editor de funciones con entrada personalizada.
- Gráfica dinámica mediante Canvas.
- Ajuste de ventana de visualización para los ejes `x` y `y`.
- Herramientas de análisis para observar comportamiento gráfico.
- Soporte para funciones exponenciales, logarítmicas, trigonométricas y operaciones básicas.

### Actividades Interactivas

- 9 actividades complementarias organizadas por pestañas.
- Ejercicios contextualizados para Ingeniería de Sistemas.
- Listas desplegables para clasificación y selección de respuestas.
- Campos abiertos para justificar procedimientos e interpretar resultados.
- Botones de verificación con retroalimentación visual.
- Botones de limpieza por actividad.
- Teclado rápido de símbolos matemáticos en actividades que lo requieren.

### Guardado Manual de Progreso

- Botón **Guardar progreso** para almacenar respuestas en el navegador.
- Botón **Cargar progreso** para restaurar respuestas guardadas.
- Botón **Borrar guardado** para eliminar el progreso local.
- Uso de `localStorage`.
- No realiza guardado automático: el estudiante decide cuándo guardar.

### Evaluación del Tema

- Cuestionario interactivo de 10 preguntas alineadas con el contenido de la guía.
- Navegación entre preguntas con botones **Anterior** y **Siguiente**.
- Puntaje final automático.
- Retroalimentación general según desempeño.
- Revisión pregunta por pregunta al finalizar:
  - respuesta correcta o incorrecta,
  - respuesta seleccionada por el estudiante,
  - respuesta correcta cuando hay error.

### Recursos Educativos

- Khan Academy.
- Wolfram Alpha.
- Videos educativos.
- Desmos.
- GeoGebra.
- Symbolab.
- Códigos QR asociados a los recursos.

## Cómo Usar

### OVA Completo

1. Abrir el archivo `index.html` en un navegador compatible.
2. Navegar por las secciones del menú lateral:
   - Introducción.
   - Objetivos.
   - Contenido.
   - Simulador.
   - Actividades interactivas.
   - Evaluación.
   - Recursos.
   - Bibliografía.
3. Revisar el contenido teórico del tema.
4. Explorar funciones en el simulador gráfico.
5. Desarrollar las actividades complementarias.
6. Guardar manualmente el progreso cuando sea necesario.
7. Completar la evaluación final y revisar los aciertos y errores.

### Guardado de Actividades

Para conservar el avance:

1. Resolver las actividades.
2. Presionar **Guardar progreso**.
3. Al volver al OVA desde el mismo navegador, presionar **Cargar progreso**.
4. Si se desea empezar de nuevo, presionar **Borrar guardado**.

## Estructura de Archivos

```text
Tema4/
├── index.html                         # OVA completo del Tema 4
├── style.css                          # Estilos generales y ajustes responsivos
├── README.md                          # Descripción del proyecto
├── GUIA 4_UNIDAD 1_CALCULO I.pdf      # Guía original en PDF
└── img/                               # Imágenes y recursos visuales
    ├── logo.webp
    ├── qr1.png
    ├── qr2.png
    ├── qr3.png
    ├── qr4.png
    ├── qr5.png
    └── qr6.png
```

## Funciones Disponibles en el Simulador

### Funciones Básicas

- `x^2`, `x^3`: funciones polinómicas.
- `sqrt(x)`: raíz cuadrada.
- `abs(x)`: valor absoluto.
- `1/x`: función racional.

### Funciones Exponenciales y Logarítmicas

- `2^x`: función exponencial.
- `exp(x)`: función exponencial natural.
- `log(x)`: logaritmo natural o logaritmo implementado según el evaluador del simulador.

### Funciones Trigonométricas

- `sin(x)`: seno.
- `cos(x)`: coseno.
- `tan(x)`: tangente.

### Operaciones

- Suma: `x + 2`.
- Resta: `x - 3`.
- Multiplicación: `2*x`.
- División: `x/2`.
- Potencias: `x^2`.
- Paréntesis para agrupar expresiones.

## Actividades Complementarias

El OVA incluye 9 actividades complementarias orientadas a:

- identificación de funciones exponenciales, logarítmicas e inversas trigonométricas,
- análisis de crecimiento exponencial,
- interpretación de modelos logarítmicos,
- evaluación de expresiones,
- construcción de tablas,
- selección de procedimientos adecuados,
- interpretación de resultados,
- argumentación matemática mediante justificaciones escritas.

## Evaluación: Contenido del Quiz

El cuestionario final incluye 10 preguntas sobre:

- reconocimiento de funciones exponenciales,
- dominio de funciones logarítmicas,
- cálculo de logaritmos,
- equivalencia entre forma logarítmica y exponencial,
- evaluación de funciones exponenciales,
- interpretación de modelos de crecimiento,
- valores principales de funciones trigonométricas inversas,
- uso de `arctan` para calcular ángulos,
- interpretación de modelos logarítmicos.

## Retroalimentación

- ✅ Respuestas correctas: se identifican con color verde y etiqueta de acierto.
- ❌ Respuestas incorrectas: se identifican con color rojo e incluyen la respuesta correcta.
- Al finalizar, el estudiante puede revisar pregunta por pregunta.

## Requisitos Técnicos

### Navegadores Compatibles

- Chrome 80+.
- Firefox 75+.
- Safari 13+.
- Edge 80+.

### Tecnologías Utilizadas

- **HTML5**: estructura semántica del OVA.
- **Tailwind CSS**: diseño responsivo y componentes visuales.
- **CSS3**: ajustes personalizados de estilo.
- **JavaScript Vanilla**: interactividad, navegación, simulador, actividades y evaluación.
- **Canvas API**: representación gráfica de funciones.
- **localStorage**: guardado manual del progreso en el navegador.

## Público Objetivo

Estudiantes de:

- Ingeniería de Sistemas.
- Universidad de Córdoba.
- Cálculo 1.
- Cursos universitarios de ciencias e ingeniería con énfasis en matemáticas aplicadas.

## Prerrequisitos

- Conocimientos básicos de álgebra.
- Manejo de potencias y radicales.
- Nociones de funciones y gráficas.
- Comprensión inicial del plano cartesiano.
- Conocimientos básicos de razones trigonométricas.

## Acceso Rápido

### OVA Completo

[index.html](index.html)

### Guía del Tema

[GUIA 4_UNIDAD 1_CALCULO I.pdf](GUIA%204_UNIDAD%201_CALCULO%20I.pdf)

## Impacto Educativo

### Beneficios

- Aprendizaje activo mediante simulación y práctica.
- Visualización de conceptos matemáticos abstractos.
- Retroalimentación inmediata en actividades y evaluación.
- Autonomía del estudiante mediante guardado manual del avance.
- Relación entre modelos matemáticos y aplicaciones en Ingeniería de Sistemas.

### Resultados Esperados

- Mayor comprensión de funciones exponenciales y logarítmicas.
- Mejor interpretación de gráficas y modelos funcionales.
- Uso adecuado de funciones trigonométricas inversas en contextos aplicados.
- Desarrollo de pensamiento matemático y análisis funcional.

## Contribuciones

### Fortalezas

- ✅ Interfaz moderna y responsiva.
- ✅ Contenido alineado con la guía del Tema 4.
- ✅ Simulador gráfico integrado.
- ✅ Actividades interactivas con verificación.
- ✅ Guardado manual del progreso.
- ✅ Evaluación con revisión de aciertos y errores.

### Mejoras Futuras

- Integración con plataforma LMS.
- Exportación de resultados de actividades.
- Banco ampliado de preguntas para evaluación.
- Registro de avance por usuario.
- Más ejemplos aplicados a Ingeniería de Sistemas.

## Contacto

Desarrollado por:

**CINTIA - Universidad de Córdoba**
