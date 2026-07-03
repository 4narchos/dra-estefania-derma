# Agent Notes — Dra. Estefanía Dermatología

## Deploy workflow

After making any code changes that affect the site, always:

1. Run `npm run build` and fix any errors before committing.
2. Stage, commit, and push to `main`.
3. The repository deploys automatically to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

Do not leave changes uncommitted or unpushed unless the user explicitly asks you to stop.

## Reusable components and data (read this first)

This project uses a single source of truth for contact info and reusable UI elements.

- `src/data/site.js` — canonical data for phone, address, email, WhatsApp, Doctoralia, Google Profile, Maps, embed src, and price. Always import from here; never hardcode these values.
- `src/components/FloatingCard.astro` — reusable floating card container (dropdown/tooltip style) used for hover actions.
- `src/components/DoctoraliaCalendarWidget.astro` — pure Doctoralia calendar widget snippet. Use it inside `FloatingCard` for dropdowns or inside any container for modals/inline.
- `src/components/HeaderAgendarButton.astro` — Header “Agendar” button with tap/hover layer effect and optional Doctoralia `FloatingCard` dropdown.
- `src/components/CTACard.astro` — blue Uiverse CTA card used in `#contacto`.
- `src/components/PillMenu.astro` — pill/tab menu used in `Presentation` and `ContactCTA`.
- `src/components/LocationWidgetMain.astro` — footer/location map widget.
- `src/components/QuickSocials.astro` — social handle tooltip with click/tap toggle.

When updating phone, address, email, WhatsApp link, Doctoralia URL, Google Profile, Maps link, or price, change `src/data/site.js` only. All components and pages consume from there.

## Archived sections

Inactive page sections are kept in `src/components/_archive/` instead of being deleted. To restore one, move the file back to `src/components/` and uncomment its import and usage in the relevant page. Currently archived:

- `src/components/_archive/Philosophy.astro` — formerly rendered between `ServicesSection` and `ValueProposition` on the homepage.

## Critical persistent references

If context has been compressed, read these files **before** modifying any section they describe:

- **`REFERENCE_WORKFLOW.md`** — the workflow we use to replicate a real web section from an external reference. Read this first if the user asks to copy or take inspiration from another website.
- **`SERVICES_CAROUSEL.md`** — complete specification for the Affinity-style Services carousel. Includes exact dimensions, colors, typography, responsive rules, and reference screenshots.
- **`DESIGN.md`** — overall design system and homepage structure.

## When the user wants to copy or reference another website

1. Open `REFERENCE_WORKFLOW.md`.
2. Follow the extraction and replication steps exactly.
3. Store raw reference data and screenshots under `reference/<site-name>/`.
4. Document the result in `DESIGN.md` and, if complex, in a dedicated `*.md` file.

## Services carousel in particular

The Services section (`src/components/ServicesSection.astro`) is a direct replica of Affinity's "Meet the new standard" carousel. Do not change its card sizes, colors, fonts or arrow styling without consulting `SERVICES_CAROUSEL.md` and the reference files in `reference/affinity-carousel/`.
