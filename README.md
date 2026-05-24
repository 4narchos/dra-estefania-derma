# Dra. Estefanía García Borges — Sitio Web Profesional

Página web estática promocional para la **Dra. Mariana Estefanía García Borges**, dermatóloga en Mérida, Yucatán.

- **URL del sitio:** https://4narchos.github.io/dra-estefania-derma
- **Stack:** [Astro](https://astro.build) + HTML estático
- **Deploy:** GitHub Pages (automático vía GitHub Actions)

---

## Información del médico

| Campo | Valor |
|-------|-------|
| **Nombre** | Dra. Mariana Estefanía García Borges |
| **Especialidad** | Dermatología |
| **Cédula Profesional** | 11742402 |
| **Consultorio** | Evoke Aging Journey & Dermatology |
| **Dirección** | C. 20 No. 251, Calle 10 15-local 9, Morelos Oriente, Mérida 97130 |
| **Teléfono / WhatsApp** | 999 221 3021 |
| **Instagram** | [@dra.estefaniaderma](https://instagram.com/dra.estefaniaderma) |
| **Idiomas** | Español, Inglés |
| **Forma de pago** | Efectivo, tarjeta de crédito y débito |
| **Aseguradoras** | No acepta (solo pacientes privados) |

### Formación académica

- **2012-2019:** Médico Cirujano — Universidad Autónoma de Yucatán (UADY)
- **2022-2023:** Medicina Interna — Hospital Regional de Alta Especialidad de la Península / UNAM
- **2023-2026:** Especialidad en Dermatología — Instituto Dermatológico de Jalisco / UDG
- **2024:** Diplomado en Patología Ungueal — CILAD
- **2025:** Diplomado en Trilogía — CIAD
- **2026-Presente:** Diplomado en Dermatología Estética — CILAD

### Servicios

Primera visita dermatológica, Botox / toxina botulínica, peeling, microdermoabrasión, hydrafacial, limpieza facial, depilación láser, dermatoscopía, crioterapia, biopsia cutánea, extirpación de lunares, cirugía de uña encarnada, tumores cutáneos, tratamiento de acné, tratamiento para pérdida de cabello, electrocoagulación de verrugas, eliminación de acrocordones.

---

## Ideas implementadas del proceso de ideación

### 1. Google Business Profile como hub de descubrimiento
- [ ] Crear y verificar perfil de Google Business para "Dra. Mariana Estefanía García Borges"
- [ ] Mantener NAP (Nombre, Dirección, Teléfono) consistente entre sitio, Doctoralia y Google
- [ ] Solicitar reseñas en Google desde consultorio

### 2. Schema.org Physician + MedicalBusiness + LocalBusiness + FAQPage markup
- [x] Implementado en `src/layouts/Layout.astro` con JSON-LD
- [x] Schema `Physician` con datos completos (dirección, teléfono, formación, especialidad)
- [x] Schema `Physician` con `@id` y `sameAs` (Doctoralia, Instagram)
- [x] Schema `Physician` con `medicalCondition` y `availableService` (botox, hydrafacial, etc.)
- [x] Schema `LocalBusiness` + `MedicalBusiness` separado con `@id`, geo coordenadas, `employee` cross-reference
- [x] Schema `FAQPage` expandido de 3 a 10 preguntas (acné, melasma, rosácea, queratosis pilar, alopecia, botox, hydrafacial, inglés)
- [ ] Validar con [Google Rich Results Test](https://search.google.com/test/rich-results)

### 3. "Tu primer filtro no es Google, es ChatGPT" — optimizar para LLMs
- [x] Preguntas literales en H2 de la página (ej: "¿Qué dermatóloga en Mérida atiende acné hormonal?")
- [x] Contenido estructurado con respuestas claras y sin ambigüedad
- [x] Afirmaciones directas que una IA pueda extraer y citar
- [ ] Expandir a más preguntas según búsquedas comunes

### 4. El clima de Yucatán como especialidad — contenido hiperlocal
- [x] Sección "Dermatología para el clima de Yucatán" en página principal
- [ ] Crear páginas individuales por condición:
  - [ ] `/melasma-yucatan` — Melasma y manchas solares
  - [ ] `/acne-humedad-merida` — Acné por humedad
  - [ ] `/piel-playa-yucatan` — Piel y playa
  - [ ] `/foliculitis-calor` — Foliculitis por calor
  - [ ] `/pie-atleta-humedad` — Pie de atleta
- [ ] Cada página con schema `MedicalWebPage` y FAQ específica

### 5. Carta de linaje del restaurante estrella Michelin
- [x] Timeline de formación académica visual en la sección "Formación"
- [x] Enfasis en Instituto Dermatológico de Jalisco como institución de élite
- [x] Framing de graduación 2026 como "conocimiento de vanguardia"
- [ ] Agregar logos institucionales y fotos de formación

### 6. Pipeline de conversión WhatsApp con UTM tracking
- [x] Botón sticky flotante de WhatsApp en mobile (esquina inferior derecha)
- [x] Botón hero con mensaje pre-llenado y UTM parameters
- [x] Botón de contacto con UTM tracking (`utm_source=web`, `utm_medium=hero_button`)
- [ ] Configurar WhatsApp Business para recibir mensajes con UTM
- [ ] Crear dashboard simple de seguimiento

### 7. Jerarquía de percepción de Instagram — carga progresiva
- [x] Astro genera HTML estático sin JavaScript por defecto (cero JS)
- [x] HTML crítico carga instantáneamente (nombre, CTA, dirección)
- [ ] Implementar LQIP (Low-Quality Image Placeholders) para fotos
- [ ] Lazy loading para testimonios y secciones inferiores
- [ ] Optimizar imágenes a AVIF/WebP con fallbacks
- [ ] Medir Core Web Vitals objetivo: <1.5s LCP en 4G

---

## Scripts

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## Estructura del proyecto

```
dra-estefania-derma/
├── .github/workflows/deploy.yml   # GitHub Actions para deploy
├── src/
│   ├── layouts/
│   │   └── Layout.astro           # Layout base con Schema.org JSON-LD
│   ├── pages/
│   │   └── index.astro            # Página principal (single-page)
│   ├── components/                # Componentes reutilizables (por crear)
│   └── styles/                    # Estilos globales (por crear)
├── public/
│   └── images/                    # Imágenes estáticas
├── astro.config.mjs               # Configuración Astro (base path para GH Pages)
├── tsconfig.json                  # Configuración TypeScript
└── package.json
```

---

## Deploy

El deploy es automático: cada push a la rama `main` ejecuta el workflow de GitHub Actions que construye el sitio y lo publica en GitHub Pages.

Para activar GitHub Pages:
1. Ir a Settings → Pages del repositorio
2. Seleccionar fuente: "GitHub Actions"
3. El workflow `.github/workflows/deploy.yml` se encarga del resto

---

## Pendientes / Roadmap

- [ ] Agregar foto real de la Dra. García Borges
- [ ] Crear páginas de aterrizaje por condición dermatológica (hiperlocal)
- [ ] Implementar galería antes/después con consentimiento (libro de casos)
- [ ] Crear guías PDF descargables ("Preparación para tu primera consulta", "Rutina clima tropical")
- [ ] Blog MDX con artículos quincenales
- [ ] Optimización de imágenes (AVIF/WebP, LQIP)
- [ ] Medición de Core Web Vitals
- [ ] Integrar widget de reseñas de Doctoralia
- [ ] Sistema de solicitud de reseñas post-consulta
- [ ] Google Business Profile
