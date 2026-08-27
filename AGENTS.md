# Agent Notes — Dra. Estefanía Dermatología

## Git sync workflow

Before making any changes, always sync with the remote repository so the local copy is up to date.

1. Run `git pull` to fetch and merge the latest changes from `origin/main`.
2. Make the requested edits.
3. Run `npm run build` and fix any errors before committing.
4. Stage, commit, and push to `main`.
5. Do not leave changes uncommitted or unpushed unless the user explicitly asks to stop.

This workflow keeps both development machines aligned and prevents merge conflicts.

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
- `src/components/DoctoraliaCalendarWidget.astro` — pure Doctoralia calendar widget snippet. Accepts optional `id` and `href` props.
- `src/components/DoctoraliaModal.astro` — single shared modal that hosts `DoctoraliaCalendarWidget`. Rendered once in `Layout.astro`. Any component can open it by dispatching `open-doctoralia-modal` on `window`.
- `src/components/AgendarButton.astro` — reusable “Agendar” button. Hover (1s delay) dispatches `open-doctoralia-modal`; click opens WhatsApp. Supports `variant` and `href` props. Since the modal is shared, it works identically on every page, including `/contacto`.
- `src/components/CTACard.astro` — blue Uiverse CTA card used in `#contacto`.
- `src/components/PillMenu.astro` — pill/tab menu used in `Presentation` and `ContactCTA`.
- `src/components/LocationWidgetMain.astro` — footer/location map widget.
- `src/components/QuickSocials.astro` — social handle tooltip with click/tap toggle.

When updating phone, address, email, WhatsApp link, Doctoralia URL, Google Profile, Maps link, or price, change `src/data/site.js` only. All components and pages consume from there.

### Hard rule: no literal contact data in components

Never write these values as string literals or fallback defaults outside of `src/data/site.js` and `src/data/socialLinks.js`:

- Email (`estefaniaborges.derma@gmail.com`)
- Phone (`999 221 3021`, `529992213021`)
- WhatsApp URL or message text
- Doctoralia URL or short URL
- Instagram URL or handle (`@dra.estefaniaderma`)
- Address (`C. 20 251...`, `C.20 #251...`)
- Consultation price (`$1,100 MXN`)
- Google Maps link or embed URL
- Credential URL

Always import from `src/data/site.js` or `src/data/socialLinks.js`. Build phone links with `getTelUrl()` and WhatsApp links with `getWhatsAppUrl()`.

For inline browser scripts (`is:inline`) that cannot import modules, pass values through `data-*` attributes rendered by Astro. Do not use hardcoded fallback strings inside the script.

Before committing, run `npm run audit:hardcoded` to catch accidental literals.

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
