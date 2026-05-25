# Plantilla: Subpágina de Servicio

Usa este documento como referencia para crear nuevas subpáginas de servicios individuales. Copia la estructura, reemplaza el contenido y guarda el archivo como `src/pages/servicios/[slug].astro`.

---

## Convenciones de nombrado

- **Archivo**: `src/pages/servicios/{slug}.astro`
- **Slug**: kebab-case, sin acentos, en minúsculas. Ej: `tratamiento-acne`, `melasma-manchas`
- El slug debe coincidir con el definido en `src/data/services.js`

---

## Estructura del archivo

```astro
---
import Layout from "../../layouts/Layout.astro";
import SectionHeader from "../../components/SectionHeader.astro";
import { getBaseUrl } from "../../utils/baseUrl.js";

const base = getBaseUrl();

const title = "{Nombre del servicio} | Dra. Estefanía";
const description = "{Descripción SEO de 150-160 caracteres}";

// Opcional: schema más específico para este servicio
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": title,
  "description": description,
  "medicalSpecialty": "Dermatology",
};
---

<Layout
  title={title}
  description={description}
  pageSchema="none"
>
  <!-- Hero del servicio -->
  <section class="service-hero">
    <div class="container">
      <span class="service-badge">Servicio</span>
      <h1 class="service-title">{Nombre del servicio}</h1>
      <p class="service-intro">{Descripción breve de una línea}</p>
    </div>
  </section>

  <!-- ¿Qué es? -->
  <section class="service-section">
    <div class="container">
      <SectionHeader title="¿Qué es?" align="left" />
      <p>{Explicación clara y accesible de qué es el tratamiento/procedimiento}</p>
    </div>
  </section>

  <!-- Causas / ¿Quién lo necesita? -->
  <section class="service-section">
    <div class="container">
      <SectionHeader title="¿Quién lo necesita?" align="left" />
      <ul class="service-list">
        <li>{Indicación 1}</li>
        <li>{Indicación 2}</li>
        <li>{Indicación 3}</li>
      </ul>
    </div>
  </section>

  <!-- El tratamiento -->
  <section class="service-section">
    <div class="container">
      <SectionHeader title="El tratamiento" align="left" />
      <p>{Descripción del proceso, duración, sesiones, etc.}</p>
    </div>
  </section>

  <!-- Expectativas y resultados -->
  <section class="service-section">
    <div class="container">
      <SectionHeader title="Expectativas y resultados" align="left" />
      <p>{Qué puede esperar el paciente, tiempos de recuperación, etc.}</p>
    </div>
  </section>

  <!-- Preguntas frecuentes -->
  <section class="service-section">
    <div class="container">
      <SectionHeader title="Preguntas frecuentes" align="left" />
      <div class="faq-list">
        <details class="faq-item">
          <summary>{Pregunta 1}</summary>
          <p>{Respuesta 1}</p>
        </details>
        <details class="faq-item">
          <summary>{Pregunta 2}</summary>
          <p>{Respuesta 2}</p>
        </details>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="service-cta">
    <div class="container">
      <div class="cta-box">
        <h2 class="cta-title">¿Te interesa este tratamiento?</h2>
        <p class="cta-text">Agenda una consulta de evaluación para determinar si es la mejor opción para tu piel.</p>
        <a href={`{whatsappUrl}`} class="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">
          Agendar consulta
        </a>
      </div>
    </div>
  </section>
</Layout>

<style>
  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--space-6);
  }

  .service-hero {
    padding: var(--space-20) 0 var(--space-12);
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border);
  }

  .service-badge {
    display: inline-block;
    background: var(--color-accent);
    color: var(--color-text-on-accent);
    padding: var(--space-1) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    margin-bottom: var(--space-6);
  }

  .service-title {
    font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl));
    font-weight: var(--weight-bold);
    line-height: var(--leading-tight);
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
  }

  .service-intro {
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    max-width: 36rem;
  }

  .service-section {
    padding: var(--space-16) 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }

  .service-section:nth-child(even) {
    background: var(--color-background);
  }

  .service-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .service-list li {
    padding-left: var(--space-6);
    position: relative;
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
  }

  .service-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-weight: var(--weight-bold);
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .faq-item {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-4);
  }

  .faq-item summary {
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    cursor: pointer;
    list-style: none;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-item p {
    margin-top: var(--space-3);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
  }

  .service-cta {
    padding: var(--space-20) 0;
    background: var(--color-background);
  }

  .cta-box {
    background: var(--color-surface);
    padding: var(--space-12) var(--space-8);
    border-radius: var(--radius-lg);
    text-align: center;
    border: 1px solid var(--color-border);
    max-width: 48rem;
    margin: 0 auto;
  }

  .cta-title {
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-3);
  }

  .cta-text {
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-8);
    line-height: var(--leading-relaxed);
  }
</style>
```

---

## Checklist antes de publicar

- [ ] El slug coincide con `src/data/services.js`
- [ ] El `title` tiene el formato "Servicio | Dra. Estefanía"
- [ ] El `description` tiene entre 150-160 caracteres
- [ ] Todas las URLs internas usan `getBaseUrl()`
- [ ] Los links externos tienen `target="_blank" rel="noopener noreferrer"`
- [ ] El link de WhatsApp incluye UTM parameters
- [ ] `npm run build` compila sin errores
- [ ] Se genera `dist/servicios/{slug}/index.html`

---

## Ejemplo completo

Ver `src/pages/servicios/acne.astro` como referencia implementada (si existe).
