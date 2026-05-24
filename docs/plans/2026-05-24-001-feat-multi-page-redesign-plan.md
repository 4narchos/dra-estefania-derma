---
title: "feat: Rediseño multi-página con estilo Krepling y sistema de diseño propio"
type: feat
status: active
date: 2026-05-24
---

# feat: Rediseño multi-página con estilo Krepling y sistema de diseño propio

## Summary

Reestructurar el sitio actual (single-page monolítico) en una arquitectura multi-página Astro con un sistema de diseño propio inspirado en el estilo Krepling (moderno, flat, SaaS) pero aplicando la paleta de colores definida por el cliente. El resultado son 4 páginas principales — Inicio, Acerca, Servicios y Contacto/Linktree — más una plantilla iterable para subpáginas de servicios individuales.

---

## Problem Frame

El sitio actual es una sola página (`index.astro`, ~793 líneas) que contiene todo el contenido, estilos y datos inline. Esto dificulta:
- Escalar a nuevas secciones sin duplicar código
- Iterar sobre subpáginas de servicios (el cliente quiere agregarlas progresivamente)
- Mantener consistencia visual al no haber un sistema de diseño centralizado
- Reutilizar componentes entre páginas (ej: ubicaciones aparecen en Inicio y Contacto)

Además, el diseño actual no refleja la identidad visual deseada: falta aplicar la paleta cromática definida (#D8CC9B, #2D5E46, #000C1E, #3A3A3A, #DACD96) y no hay una página dedicada a "link in bio" que centralice todas las formas de contacto y redes sociales.

---

## Requirements

- R1. El sitio debe mantener la arquitectura Astro 5 static con zero-JS por defecto
- R2. Todas las páginas deben preservar el SEO actual (Schema.org JSON-LD, meta tags, Open Graph)
- R3. Aplicar la paleta de colores definida en todo el sitio mediante tokens CSS centralizados
- R4. El sitio debe tener navegación persistente (header) con estado activo por página
- R5. La página de inicio debe conservar todo el contenido actual pero usando componentes extraídos
- R6. La página Acerca debe mostrar: CV, cédula profesional, certificaciones, enlaces a instituciones (UNAM, IDJ)
- R7. La página Servicios debe listar todos los servicios y servir como índice para subpáginas individuales
- R8. Debe existir una plantilla/documento de referencia para crear nuevas subpáginas de servicios consistentes
- R9. La página Contacto debe ser estilo "link in bio" / linktree: todas las redes, WhatsApp, Doctoralia, formas de agendar
- R10. El diseño debe ser mobile-first y mantener los breakpoints responsive existentes
- R11. El botón flotante de WhatsApp debe persistir en todas las páginas
- R12. Todas las URLs internas deben respetar el `base` path de GitHub Pages (`/dra-estefania-derma/`)

---

## Scope Boundaries

- No se agrega blog MDX ni sistema de artículos en esta iteración
- No se implementan páginas de condiciones hiperlocales individuales (melasma-yucatan, etc.) — quedan como subpáginas de servicios
- No se agrega widget embebido de Doctoralia
- No se optimizan imágenes a AVIF/WebP (solo mover a `public/` y referenciar)
- No se agrega sistema de i18n (el sitio permanece en español)
- No se modifica el workflow de deploy de GitHub Actions

### Deferred to Follow-Up Work

- Subpáginas individuales de cada servicio (8 planeadas): iterar usando la plantilla definida en U6
- Optimización de imágenes (AVIF/WebP, LQIP, lazy loading)
- Blog MDX con artículos quincenales
- Widget de reseñas de Doctoralia embebido
- Google Business Profile (trabajo externo al sitio)

---

## Context & Research

### Relevant Code and Patterns

- `src/pages/index.astro` — Página monolítica actual con ~793 líneas; contiene todos los datos inline, estilos scoped, y 8 secciones
- `src/layouts/Layout.astro` — Layout base con Schema.org triple (Physician, MedicalBusiness, FAQPage), meta tags, OG/Twitter Card, y CSS global en `is:global`
- `astro.config.mjs` — `base: '/dra-estefania-derma'` requiere que todos los links internos usen `import.meta.env.BASE_URL`
- `.github/workflows/deploy.yml` — Deploy automático a GitHub Pages, no requiere cambios
- Patrón actual: datos en frontmatter + render inline, estilos scoped en cada archivo, sin componentes reutilizables

### Institutional Learnings

- El proyecto fue creado manualmente tras falla del wizard interactivo de Astro — estructura limpia sin deuda de plantilla
- Las fotos están en `Fotos/` (root) pero NO en `public/images/` — no están siendo servidas

### External References

- [Krepling design style](https://getdesign.md/design-md/krepling) — Flat SaaS, sin sombras, profundidad por cambio de color, tipografía Inter, bordes redondeados progresivos (8px-30px)
- [Google DESIGN.md spec](https://github.com/google-labs-code/design.md) — Formato de documento de diseño

---

## Key Technical Decisions

- **CSS puro sin framework UI**: Mantener zero-JS. Los tokens de diseño van en variables CSS en `:root`, no en Tailwind ni similar. Rationale: alineado con la arquitectura actual y minimiza dependencias.
- **Componentes Astro (.astro) con scoped styles**: Cada componente lleva sus propios estilos `<style scoped>`. No se crea CSS global extenso. Rationale: Astro optimiza esto automáticamente; evita colisiones de nombres.
- **Datos en archivos `.js` planos**: Arrays de objetos exportados desde `src/data/`. No Content Collections ni MDX para esta iteración. Rationale: simplicidad; los datos son estructurados y pequeños.
- **Schema.org por layout props**: El layout acepta props opcionales para controlar qué schemas inyectar por página. Rationale: no todas las páginas necesitan FAQPage ni LocalBusiness.
- **Plantilla de servicio como `.md` documental**: En lugar de código, un archivo markdown que describe la estructura requerida para nuevas subpáginas. Rationale: más mantenible que código-template; el cliente puede iterar siguiéndolo.
- **Linktree como componente Astro reutilizable**: Un grid de tarjetas de link que puede usarse tanto en `/contacto` como en otra página si se necesita. Rationale: el patrón "link in bio" es un componente visual cohesivo.

---

## Open Questions

### Resolved During Planning

- **¿Krepling tiene un DESIGN.md descargable?** No. Solo está catalogado en getdesign.md. Se creará un DESIGN.md propio basado en los tokens extraídos de Refero Styles + paleta del cliente.
- **¿Cuántas subpáginas de servicios inicialmente?** 8 para empezar, iterando después. Se crea una plantilla/documento de referencia, no 8 páginas de una vez.
- **¿Linktree es página separada o sección dentro de Contacto?** Página dedicada `/contacto` con estilo linktree.

### Deferred to Implementation

- **Foto final de la Dra.**: Depende del cliente seleccionando y recortando la imagen. El plan incluye placeholder con instrucciones claras de dimensiones.
- **Contenido exacto del CV/certificaciones para About**: Depende de datos que el cliente proveerá. El plan incluye estructura lista para poblar.

---

## Output Structure

```
src/
├── components/
│   ├── Header.astro           # Navegación persistente
│   ├── Footer.astro           # Pie de página reutilizable
│   ├── WhatsAppSticky.astro   # Botón flotante
│   ├── Hero.astro             # Sección hero
│   ├── ServicesGrid.astro     # Grid de servicios
│   ├── ServiceCard.astro      # Tarjeta individual de servicio
│   ├── EducationTimeline.astro # Timeline de formación
│   ├── LocationCard.astro     # Tarjeta de ubicación
│   ├── ClimateCard.astro      # Tarjeta de clima
│   ├── ReviewCard.astro       # Tarjeta de reseña
│   ├── ContactInfo.astro      # Info de contacto
│   ├── LinktreeCard.astro     # Tarjeta de link (linktree)
│   ├── SectionHeader.astro    # Título + subtítulo de sección
│   └── Button.astro           # Botones primario/secundario
├── data/
│   ├── services.js            # Array de servicios
│   ├── education.js           # Timeline académico
│   ├── locations.js           # Ubicaciones con horarios
│   ├── reviews.js             # Testimonios
│   ├── faq.js                 # Preguntas frecuentes
│   └── links.js               # Links para linktree
├── layouts/
│   └── Layout.astro           # Layout base refactorizado
├── pages/
│   ├── index.astro            # Inicio (refactorizado)
│   ├── acerca.astro           # About / CV
│   ├── servicios.astro        # Índice de servicios
│   ├── contacto.astro         # Linktree / Contacto
│   └── servicios/
│       └── _template.md       # Documento de referencia para nuevas subpáginas
├── styles/
│   └── tokens.css             # Variables CSS del sistema de diseño
public/
├── images/
│   └── (fotos del cliente)
DESIGN.md                      # Sistema de diseño del proyecto
```

---

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

### Flujo de página y navegación

```
┌─────────────────────────────────────────────────────────────┐
│  Header (sticky)                                            │
│  [Logo]  [Inicio] [Acerca] [Servicios] [Contacto]  [CTA]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   index      │  │   acerca     │  │  servicios   │      │
│  │   (Inicio)   │  │   (About)    │  │  (Índice)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│         ┌─────────────────────────────────────┐             │
│         │           contacto                  │             │
│         │      (Linktree / Links)             │             │
│         └─────────────────────────────────────┘             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                     │
│  WhatsApp Sticky (floating, all pages)                      │
└─────────────────────────────────────────────────────────────┘
```

### Jerarquía de tokens de diseño

```
DESIGN.md (documento humano-readable)
    ↓
src/styles/tokens.css (variables CSS en :root)
    ↓
Layout.astro (inyecta tokens.css global)
    ↓
Componentes Astro (usan var(--token) en scoped styles)
```

---

## Implementation Units

### U1. Crear DESIGN.md y sistema de tokens CSS

**Goal:** Establecer el lenguaje visual del sitio documentado en DESIGN.md y codificado en variables CSS.

**Requirements:** R3, R10

**Dependencies:** None

**Files:**
- Create: `DESIGN.md`
- Create: `src/styles/tokens.css`
- Modify: `src/layouts/Layout.astro`

**Approach:**
- Crear `DESIGN.md` siguiendo el formato Google DESIGN.md spec: colores, tipografía, espaciado, componentes, layout
- Colores: mapear la paleta del cliente a roles semánticos (primary: #2D5E46, background: #000C1E, surface: #3A3A3A, accent: #D8CC9B, accent-alt: #DACD96)
- Tipografía: Inter (Google Fonts) con escala tipoescalograma inspirada en Krepling (caption, body, subheading, heading, display)
- Espaciado: escala base 4px (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Radios: 8px default, 12px cards, 16px buttons, 9999px pills/badges
- No box-shadows — profundidad por cambio de color plano (patrón Krepling)
- Crear `tokens.css` con todas las variables CSS custom properties
- Modificar `Layout.astro` para importar `tokens.css` en lugar de las variables inline actuales

**Patterns to follow:**
- Variables CSS actuales en `Layout.astro` líneas 233-243 — mantener nombres similares pero expandir

**Test scenarios:**
- Happy path: Todas las variables CSS se computan correctamente sin valores inválidos
- Edge case: Verificar contraste WCAG entre texto y fondo para cada combinación primary/accent

**Verification:**
- `npm run build` compila sin errores
- Inspección visual confirma que los tokens aplican correctamente en todas las páginas

---

### U2. Refactorizar Layout.astro con navegación y schemas adaptativos

**Goal:** Transformar el layout de wrapper pasivo a layout activo con navegación, schemas controlados por props, y nuevos tokens CSS.

**Requirements:** R2, R4, R11, R12

**Dependencies:** U1

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/WhatsAppSticky.astro`
- Modify: `src/layouts/Layout.astro`

**Approach:**
- Extraer el footer actual de `index.astro` a `Footer.astro`
- Crear `Header.astro` con: logo/nombre, nav links (Inicio, Acerca, Servicios, Contacto), estado activo por página, menú hamburguesa mobile
- Crear `WhatsAppSticky.astro` con el SVG y estilos actuales
- Refactorizar `Layout.astro`:
  - Aceptar props: `title`, `description`, `schemaType` (controla qué schemas inyectar)
  - Inyectar `tokens.css` global
  - Incluir `<Header />`, `<slot />`, `<Footer />`, `<WhatsAppSticky />`
  - Mantener Schema.org pero hacerlo condicional: siempre Physician, opcional FAQPage y LocalBusiness
  - Preservar todos los meta tags existentes (OG, Twitter, theme-color)
  - Los links internos deben usar `import.meta.env.BASE_URL` para respetar el subpath de GitHub Pages

**Patterns to follow:**
- Schema.org actual en `Layout.astro` — preservar estructura exacta, solo hacer condicional
- Botón WhatsApp actual en `index.astro` — mover a componente separado

**Test scenarios:**
- Happy path: Cada página (/, /acerca, /servicios, /contacto) renderiza con el header activo correspondiente
- Integration: Los schemas JSON-LD aparecen correctamente en el HTML generado de cada página
- Edge case: El menú mobile se colapsa/expande correctamente en viewports < 768px
- Error path: Links internos no generan 404 en GitHub Pages (verificar base path)

**Verification:**
- `npm run build` genera 4 archivos HTML en `dist/`
- Cada HTML contiene los schemas apropiados
- Navegación funcional en preview

---

### U3. Extraer datos a archivos modulares

**Goal:** Centralizar todos los datos inline del monolito en archivos importables reutilizables.

**Requirements:** R5, R7, R8, R9

**Dependencies:** None

**Files:**
- Create: `src/data/services.js`
- Create: `src/data/education.js`
- Create: `src/data/locations.js`
- Create: `src/data/reviews.js`
- Create: `src/data/faq.js`
- Create: `src/data/links.js`

**Approach:**
- Extraer cada array de datos de `index.astro` frontmatter a su propio archivo `.js`
- Cada archivo exporta un array de objetos con la estructura existente
- `services.js`: nombre, icono, slug (para URLs de subpáginas futuras), descripción corta
- `education.js`: año, título, institución, detalle
- `locations.js`: nombre, ciudad, dirección, horarios, teléfono
- `reviews.js`: texto, autor, tratamiento
- `faq.js`: pregunta, respuesta (para Schema.org y posible sección FAQ futura)
- `links.js`: título, URL, icono, categoría (whatsapp, social, agenda, profesional)

**Patterns to follow:**
- Estructura de datos actual en `index.astro` líneas 11-77

**Test scenarios:**
- Happy path: Todos los archivos se importan correctamente sin errores de sintaxis
- Edge case: Verificar que todos los slugs de servicios son URL-safe (kebab-case, sin acentos)

**Verification:**
- `npm run build` compila exitosamente
- Ningún dato se pierde en la extracción (comparar arrays originales vs extraídos)

---

### U4. Refactorizar index.astro en componentes reutilizables

**Goal:** Descomponer el monolito de 793 líneas en componentes Astro independientes y reensamblar la página de inicio.

**Requirements:** R5, R10

**Dependencies:** U2, U3

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ServicesGrid.astro`
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/EducationTimeline.astro`
- Create: `src/components/LocationCard.astro`
- Create: `src/components/ClimateCard.astro`
- Create: `src/components/ReviewCard.astro`
- Create: `src/components/SectionHeader.astro`
- Create: `src/components/Button.astro`
- Modify: `src/pages/index.astro`

**Approach:**
- Extraer cada sección visual del index actual a su componente con scoped styles
- `Hero.astro`: badge, título, subtítulo, descripción, CTA buttons, placeholder de foto
- `ServicesGrid.astro`: grid de `ServiceCard` con datos importados de `services.js`
- `EducationTimeline.astro`: timeline vertical con datos de `education.js`
- `ClimateCard.astro`: tarjetas de contenido hiperlocal (mantener 3 actuales)
- `ReviewCard.astro`: tarjetas de testimonios con datos de `reviews.js`
- `LocationCard.astro`: grid de 4 ubicaciones con horarios (ya extraído en commit anterior)
- `SectionHeader.astro`: título + subtítulo reutilizable para todas las secciones
- `Button.astro`: variantes primary, secondary, ghost, large (usando tokens CSS)
- Reescribir `index.astro` para que solo importe componentes y pase datos
- Preservar exactamente el mismo contenido y estructura visual

**Patterns to follow:**
- Scoped styles actuales en `index.astro` — preservar selectores y media queries, migrar a usar tokens CSS
- Emojis como iconos — mantener patrón, no agregar librería de iconos

**Test scenarios:**
- Happy path: La página de inicio renderiza visualmente idéntica (mismo contenido, nuevo diseño)
- Integration: Todos los componentes se importan y renderizan sin errores
- Edge case: Viewport mobile (< 640px) mantiene layouts en 1 columna
- Edge case: Viewport desktop (> 1024px) muestra grids multicolumna

**Verification:**
- `npm run build` sin errores
- Visual comparison: contenido de inicio es equivalente al original
- Lighthouse mantiene métricas similares o mejora

---

### U5. Crear página Acerca (/acerca)

**Goal:** Página de autoridad médica con CV, cédula, certificaciones y enlaces institucionales.

**Requirements:** R6, R10

**Dependencies:** U2, U3, U4

**Files:**
- Create: `src/pages/acerca.astro`

**Approach:**
- Usar `Layout.astro` con prop `schemaType="about"`
- Estructura de secciones:
  1. Hero pequeño: nombre + "Dermatóloga certificada" + cédula profesional 11742402
  2. Formación académica: reutilizar `EducationTimeline` con datos de `education.js`
  3. Certificaciones y diplomados: grid de tarjetas con instituciones (CILAD, CIAD, UNAM, IDJ)
  4. Instituciones: enlaces a perfiles académicos (UNAM, IDJ/UDG)
  5. CTA final: "Agenda tu consulta" → WhatsApp
- Cada institución como tarjeta con logo/placeholder, nombre, período, enlace externo
- Incluir `MedicalWebPage` schema para esta página

**Patterns to follow:**
- `EducationTimeline.astro` de U4
- `SectionHeader.astro` de U4
- `Button.astro` de U4

**Test scenarios:**
- Happy path: La página renderiza con todas las secciones y datos correctos
- Integration: Los enlaces externos a instituciones abren en nueva pestaña con `rel="noopener noreferrer"`
- Edge case: Schema.org `MedicalWebPage` se inyecta correctamente en el HTML

**Verification:**
- `npm run build` genera `dist/acerca/index.html`
- Navegación desde el header funciona
- Schema validable con Google's Rich Results Test

---

### U6. Crear página maestra de servicios (/servicios) y plantilla de subpágina

**Goal:** Índice visual de todos los servicios con tarjetas clickeables, más documentación para iterar subpáginas.

**Requirements:** R7, R8, R10

**Dependencies:** U2, U3, U4

**Files:**
- Create: `src/pages/servicios.astro`
- Create: `src/pages/servicios/_template.md`

**Approach:**
- Página maestra:
  - Hero: "Servicios dermatológicos" + descripción
  - Grid de servicios: reutilizar `ServicesGrid` con tarjetas expandidas (nombre, icono, descripción corta)
  - Cada tarjeta enlaza a su futura subpágina (`/servicios/[slug]/`)
  - Por ahora, los slugs pueden mostrar "Próximamente" o redirigir a WhatsApp
  - Sección de "¿No sabes qué necesitas?" → CTA a WhatsApp
- Plantilla `_template.md`:
  - Documento markdown que describe la estructura requerida para crear una nueva subpágina de servicio
  - Incluye: frontmatter requerido, secciones obligatorias (qué es, causas, tratamiento, expectativas, FAQs), schema.org a usar, estilos a seguir
  - Ejemplo con un servicio dummy para que el cliente/ implementador futuro copie el patrón

**Patterns to follow:**
- `ServicesGrid.astro` y `ServiceCard.astro` de U4
- Tarjetas con hover state (transform translateY) del diseño actual

**Test scenarios:**
- Happy path: Grid muestra los 8 servicios con datos correctos
- Happy path: Cada tarjeta tiene un link con slug URL-safe
- Integration: El link incluye el base path correcto para GitHub Pages

**Verification:**
- `npm run build` genera `dist/servicios/index.html`
- `src/pages/servicios/_template.md` es legible y completo
- Navegación desde header funciona

---

### U7. Crear página Contacto/Linktree (/contacto)

**Goal:** Página dedicada estilo "link in bio" con todas las formas de contacto, redes y agendamiento.

**Requirements:** R9, R10, R11

**Dependencies:** U2, U3

**Files:**
- Create: `src/components/LinktreeCard.astro`
- Create: `src/pages/contacto.astro`

**Approach:**
- Diseño linktree: centrado, fondo oscuro (#000C1E o gradiente sutil), tarjetas de link apiladas verticalmente
- Componente `LinktreeCard.astro`:
  - Icono (emoji o SVG), título, URL
  - Variantes: destacado (CTA principal, ej: WhatsApp), normal (redes sociales), secundario (otros links)
  - Estilo: fondo #3A3A3A, borde sutil #D8CC9B, radio 12px, hover con cambio de fondo
- Secciones de la página:
  1. Foto de perfil (placeholder circular) + nombre + especialidad
  2. Links de contacto directo: WhatsApp (destacado), teléfono, email (si aplica)
  3. Links de agenda: Doctoralia, WhatsApp Business
  4. Redes sociales: Instagram
  5. Links profesionales: Doctoralia perfil, cédula profesional (si hay URL)
  6. Ubicaciones: grid compacto de 4 ubicaciones
- Cada link con UTM tracking para medir conversión por canal
- Incluir `LocalBusiness` schema completo (ya existe en layout)

**Patterns to follow:**
- Tarjetas con hover del diseño actual
- UTM tracking actual en links de WhatsApp
- `LocationCard.astro` de U4 para sección de ubicaciones

**Test scenarios:**
- Happy path: Todos los links renderizan con URL y texto correctos
- Integration: Cada link externo tiene `target="_blank" rel="noopener noreferrer"`
- Happy path: El link destacado de WhatsApp usa UTM parameters
- Edge case: Los datos de `links.js` se mapean correctamente a las variantes visuales

**Verification:**
- `npm run build` genera `dist/contacto/index.html`
- Visual: parece un linktree profesional, no una página genérica de contacto
- Todos los links son funcionales (no rotos)

---

### U8. Integrar assets visuales (foto de la Dra., Open Graph)

**Goal:** Reemplazar placeholders con la foto real y configurar Open Graph/Twitter Card con imagen.

**Requirements:** R2, R5

**Dependencies:** U2

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/acerca.astro`
- Modify: `src/pages/contacto.astro`

**Approach:**
- Mover la foto seleccionada del cliente desde `Fotos/` a `public/images/`
- Crear versión vertical (2400x3600 original) para hero y about
- Crear versión recortada horizontal (1200x630) para Open Graph / Twitter Card
- Actualizar `Layout.astro` para usar la imagen OG en meta tags
- Actualizar `Hero.astro` para mostrar la foto real en lugar del placeholder
- Actualizar `contacto.astro` para mostrar foto circular de perfil
- Actualizar `acerca.astro` para incluir foto en sección de perfil
- Asegurar que las rutas de imagen respeten el `base` path (`/dra-estefania-derma/images/`)

**Patterns to follow:**
- `og:image` y `twitter:image` meta tags ya existentes en `Layout.astro`
- Placeholder actual en `index.astro` líneas 101-106

**Test scenarios:**
- Happy path: La foto se sirve correctamente desde `public/images/`
- Integration: Los meta tags OG apuntan a URL absoluta válida (`siteUrl + base + /images/...`)
- Edge case: Imagen con fallback si no carga (placeholder de color)

**Verification:**
- `npm run build` incluye las imágenes en `dist/images/`
- Facebook/Twitter card validators muestran preview correcto
- Foto visible en hero, about, y contacto

---

## System-Wide Impact

- **Interaction graph:** El `Header.astro` nuevo aparece en todas las páginas vía `Layout.astro`. Los links del header deben respetar `import.meta.env.BASE_URL` para funcionar en GitHub Pages.
- **Error propagation:** Si el `base` path no se aplica correctamente a un link interno, resulta en 404 en producción. Todos los `<a href>` internos deben pasar por una verificación manual.
- **State lifecycle risks:** El cambio de `Layout.astro` de wrapper pasivo a layout activo rompe cualquier página que no pase las props esperadas. Verificar que todas las páginas nuevas y existentes usen el layout correctamente.
- **API surface parity:** No aplica — no hay APIs externas.
- **Integration coverage:** Navegación entre páginas en preview local y en GitHub Pages post-deploy; menú mobile en ambos entornos.
- **Unchanged invariants:** El workflow de GitHub Actions (`.github/workflows/deploy.yml`) no cambia. Los schemas Schema.org existentes se preservan y solo se hacen condicionales.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Foto del cliente no está lista | U8 es la última unidad; puede aplazarse. Los placeholders están diseñados para no romper visualmente. |
| Base path de GitHub Pages causa 404 en links | Audit manual de todos los href internos. Usar `import.meta.env.BASE_URL` consistentemente. |
| Refactor del monolito introduce regresiones visuales | U4 preserva el mismo contenido; comparación visual post-build. |
| Cliente quiere más subpáginas de las 8 iniciales | La plantilla `_template.md` permite iterar sin planificación adicional. |

---

## Documentation / Operational Notes

- Actualizar `README.md` con la nueva estructura de páginas
- Documentar en README cómo agregar una nueva subpágina de servicio usando `_template.md`
- Verificar post-deploy que todas las rutas funcionen en `https://4narchos.github.io/dra-estefania-derma/`

---

## Sources & References

- Diseño de referencia: [Krepling en getdesign.md](https://getdesign.md/design-md/krepling)
- Paleta extraída de: [Refero Styles — Krepling](https://styles.refero.design/style/055f12af-b7b9-46af-81b7-93e0ed6d5ce2)
- FORMATO DESIGN.md: [Google DESIGN.md spec](https://github.com/google-labs-code/design.md)
- Código actual: `src/pages/index.astro`, `src/layouts/Layout.astro`
