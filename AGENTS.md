# Agent Notes — Dra. Estefanía Dermatología

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
