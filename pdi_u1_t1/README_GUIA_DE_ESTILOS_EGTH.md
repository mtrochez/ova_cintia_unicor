# Guía de Estilos - OVA Gerencia de Talento Humano
## Tema 1: Fundamentos Conceptuales y Normativos

Guía completa de colores, tipografías y efectos visuales para el diseñador.

---

## 1. PALETA DE COLORES PRINCIPAL

### Variables CSS Base
```css
--bg: #e8f0e9           /* Fondo principal verde claro */
--surface: #ffffff      /* Fondos de tarjetas/cards */
--surface-soft: #f1f3f5 /* Fondos secundarios */
--text: #374151         /* Texto principal - Gris oscuro */
--heading: #569151      /* Títulos/encabezados - Verde */
--line: #dee2e6         /* Bordes/líneas divisorias */
--accent: #569151       /* Color de acento principal - Verde */
--accent-deep: #3d6a3a  /* Verde oscuro para hover */
--accent-soft: #16BAAF  /* Turquesa suave */
--shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
```

### Colores Específicos Azules (Turquesa)
```css
#17a2b8  /* Azul turquesa - Botones, acentos, hover */
#0c7b8a  /* Azul turquesa oscuro - Textos, títulos */
#D8EBF8  /* Azul celeste - Fondos hover, destacados */
#374151  /* Gris oscuro - Texto en flip cards */
```

---

## 2. TIPOGRAFÍA

- **Fuente principal**: Poppins (Google Fonts)
- **Pesos utilizados**: 400, 500, 600, 700

### Jerarquía de Texto
| Elemento | Tamaño | Peso | Color |
|----------|--------|------|-------|
| Título H1 (Hero) | 2.5rem (~40px) | 700 | Blanco #ffffff |
| Título H2 | 1.875rem (~30px) | 800 | --heading #569151 |
| Título H3 | 1.25rem (~20px) | 700 | --heading #569151 |
| Párrafo base | 1rem (16px) | 400 | --text #374151 |
| Texto pequeño | 0.75rem (12px) | 600 | #6c757d |
| Etiquetas (eyebrow) | 0.75rem (12px) | 600 | #6c757d |

---

## 3. BOTONES

### Botón Principal (btn-main)
```css
Fondo: #569151 (--accent)
Texto: #ffffff (blanco)
Peso: 600 (semibold)
Radio: 8px
Padding: 12px 24px
Hover: #3d6a3a (--accent-deep)
Transición: 0.25s ease
```

### Botón Suave (btn-soft)
```css
Fondo: #ffffff (--surface)
Texto: #495057 (gris medio)
Borde: 1px solid #dee2e6 (--line)
Peso: 600 (semibold)
Radio: 8px
Padding: 12px 24px
Hover fondo: #e9ecef
Hover borde: #adb5bd
Transición: 0.2s ease
```

### Botón Exportar (matrix-export-btn)
```css
Fondo: #D8EBF8 (azul celeste)
Texto: #0c7b8a (azul turquesa oscuro)
Borde: 1px solid #17a2b8 (azul turquesa)
Peso: 600 (semibold)
Radio: 8px
Padding: 12px 24px
Hover fondo: #17a2b8
Hover texto: #ffffff (blanco)
Sombra hover: 0 4px 12px rgba(23, 162, 184, 0.3)
```

### Botón Bibliografía (bib-link)
```css
Fondo: #f1f3f5 (--surface-soft)
Texto: #569151 (--heading)
Borde: 1px solid #dee2e6 (--line)
Peso: 700 (bold)
Tamaño: 0.75rem (12px)
Radio: 8px
Padding: 6px 12px
Hover fondo: #D8EBF8 (azul celeste)
Hover texto: #0c7b8a (azul oscuro)
Hover borde: #17a2b8 (azul turquesa)
Sombra hover: 0 4px 12px rgba(23, 162, 184, 0.25)
Transición: 0.25s ease
```

---

## 4. TARJETAS (CARDS)

### Tarjeta de Sección (section-card)
```css
Fondo: #ffffff (--surface)
Borde: 1px solid #dee2e6 (--line)
Radio: 12px
Sombra: 0 2px 8px rgba(0, 0, 0, 0.05)
Padding: 32px

/* Hover */
Transform: translateY(-4px)
Sombra: 0 8px 24px rgba(23, 162, 184, 0.25), 0 0 0 1px rgba(23, 162, 184, 0.35)
Borde izquierdo: #0c7b8a
Transición: 0.3s ease
```

### Mini Tarjeta (mini-card)
```css
Fondo: #ffffff (--surface)
Borde: 1px solid #dee2e6 (--line)
Radio: 8px
Sombra: 0 1px 4px rgba(0, 0, 0, 0.05)
Padding: 20px

/* Hover */
Transform: translateY(-4px)
Sombra: 0 8px 20px rgba(23, 162, 184, 0.25)
Borde: #17a2b8 (azul turquesa)
Transición: 0.3s ease
```

### Tarjeta Sin Hover (section-card.no-hover)
```css
Transición: none
Hover: Sin efectos (estático)
Sombra: 0 2px 8px rgba(0, 0, 0, 0.05)
```

---

## 5. CABECERA / HERO

```css
Fondo: Gradiente linear-gradient(135deg, #569151 0%, #3d6a3a 100%)
Texto: #ffffff (blanco)
Radio: 16px
Sombra: 0 4px 6px rgba(0, 0, 0, 0.1)
Padding: 40px

/* Efectos decorativos */
::before: Gradiente radial blanco 10% opacidad (top-right)
::after: Gradiente radial turquesa 15% opacidad (bottom-left)
```

---

## 6. BARRA LATERAL (SIDEBAR)

```css
Ancho: 280px
Fondo: #f0f4f1 (verde muy claro)
Sombra: 2px 0 8px rgba(0, 0, 0, 0.05)
Borde derecho: 1px solid #dee2e6
Padding: 20px 0

/* Logo */
Orb: 120px x 120px, borde 2px #569151, fondo #f1f3f5

/* Links de navegación */
Color base: #495057
Color hover/active: #569151 (--accent)
Borde izquierdo activo: 4px solid #569151
Fondo hover/active: rgba(13, 110, 253, 0.08)
Transición: 0.25s ease
```

---

## 7. RUTA DEL CONSULTOR

```css
/* Línea de conexión */
Fondo: linear-gradient(90deg, transparent, #17a2b8, #0c7b8a, #17a2b8, transparent)
Opacidad: 0.6
Altura: 3px

/* Nodos circulares */
Fondo: #ffffff (--surface)
Borde: 2px solid #17a2b8
Sombra: 0 8px 18px rgba(23, 162, 184, 0.2)
Color ícono/texto: #0c7b8a
Radio: 999px (círculo perfecto)
Tamaño: 58px x 58px

/* Títulos de paradas */
Color: #0c7b8a
Peso: 700

/* Descripciones */
Color: #495057
Tamaño: 0.84rem
```

---

## 8. FLIP CARDS (Plan de Vuelo)

```css
/* Cara frontal */
Fondo: linear-gradient(135deg, #D8EBF8 0%, #b8d4e8 100%)
Texto: #374151 (gris oscuro)
Sombra: 0 4px 16px rgba(216, 235, 248, 0.4)

/* Cara trasera */
Fondo: #ffffff (--surface)
Borde: 2px solid #D8EBF8
Texto: #374151 (gris oscuro)
Transición giro: 0.6s ease
```

---

## 9. OPCIONES DE QUIZ/AUTOEVALUACIÓN

```css
Fondo: #ffffff (--surface)
Borde: 1px solid #dee2e6 (--line)
Radio: 14px
Padding: 12px 14px

/* Hover */
Fondo: #D8EBF8 (azul celeste)
Borde: #17a2b8 (azul turquesa)
Transición: 0.25s ease

/* Seleccionado */
Borde: #569151 (--accent)
Fondo: #f1f3f5 (--surface-soft)
Texto: #569151 (--accent)
```

---

## 10. TABS (7S de McKinsey)

```css
/* Tab inactivo */
Fondo: #ffffff (--surface)
Texto: #495057
Borde: 1px solid #dee2e6

/* Tab activo */
Fondo: #569151 (--accent)
Texto: #ffffff (blanco)

/* Hover */
Fondo: #D8EBF8 !important (azul celeste)
Texto: #374151 !important (gris oscuro)
```

---

## 11. MATRIZ DE PRIORIZACIÓN

```css
Contenedor:
- Fondo: #f1f3f5 (--surface-soft)
- Radio: 12px
- Borde: 1px solid #dee2e6

Tabla:
- Header color: #569151 (--heading)
- Borde inferior header: 2px solid #569151
- Celda padding: 14px 16px
- Borde celdas: 1px solid #dee2e6
```

---

## 12. SOMBRAS

```css
/* Sombra base */
0 2px 8px rgba(0, 0, 0, 0.05)       /* Cards */
0 4px 6px rgba(0, 0, 0, 0.1)        /* Hero */
0 8px 20px rgba(23, 162, 184, 0.25) /* Hover azul */
0 8px 24px rgba(23, 162, 184, 0.25) /* Card hover */
0 4px 12px rgba(23, 162, 184, 0.3)  /* Botón exportar hover */
0 4px 16px rgba(216, 235, 248, 0.4) /* Flip card */
2px 0 8px rgba(0, 0, 0, 0.05)       /* Sidebar */
```

---

## 13. RADIO DE ESQUINAS (BORDER RADIUS)

| Elemento | Radio |
|----------|-------|
| Hero | 16px |
| Section Card | 12px |
| Mini Card / Botones | 8px |
| Botones bib-link | 8px |
| Quiz Option | 14px |
| Flip Card | 14px |
| Route Node | 999px (círculo) |
| Logo Orb | 50% (círculo) |
| QR / Imágenes | rounded (4px) |

---

## 14. ESPACIADO (PADDING / MARGIN)

| Elemento | Padding | Margin |
|----------|---------|--------|
| Section Card | 32px | - |
| Mini Card | 20px | - |
| Hero | 40px | - |
| Botón Main/Soft | 12px 24px | - |
| Botón bib-link | 6px 12px | - |
| Sidebar link | 12px 20px | - |
| Main content | - | 32px |

---

## 15. ESTADOS ESPECIALES

### Mensaje de Éxito (Guardar)
```css
Color: #059669 (verde éxito)
Ícono: fa-check-circle
```

### Mensaje Informativo (Limpiar)
```css
Color: #6b7280 (gris)
Ícono: fa-rotate-right
```

### Feedback Neutro
```css
Fondo: #f1f3f5 (--surface-soft)
Radio: 8px
Padding: 16px
```

---

## RESUMEN VISUAL

```
VERDE PRINCIPAL:     #569151 (accent, heading)
VERDE OSCURO:        #3d6a3a (accent-deep)
AZUL TURQUESA:       #17a2b8 (hover, acentos)
AZUL TURQUESA OSCURO:#0c7b8a (textos, títulos)
AZUL CELESTE:        #D8EBF8 (fondos hover)
GRIS OSCURO:         #374151 (texto principal)
GRIS MEDIO:          #495057 (texto secundario)
GRIS CLARO:          #6c757d (etiquetas)
GRIS BORDES:         #dee2e6 (líneas)
BLANCO:              #ffffff (surface)
FONDO SECUNDARIO:    #f1f3f5 (surface-soft)
```

---

*Documento generado para el OVA de Gerencia de Talento Humano y Desarrollo Organizacional*
*Centro CINTIA - Universidad de Córdoba*
