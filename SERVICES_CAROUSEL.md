# Services Carousel — Persistent Reference

> **SOURCE OF TRUTH** for the “Meet the new standard” Affinity-style carousel on the homepage.  
> This file exists so the implementation survives context compression. Any future change to the Services section must respect the values documented here.

## Reference URL

`https://www.affinity.studio/`

The target block is the dark carousel titled **“Meet the new standard”**.

## Files that implement this

- `src/components/ServicesSection.astro` — component code, styles and carousel logic.
- `src/layouts/Layout.astro` — loads `Playfair Display` and `Inter` from Google Fonts.
- `reference/affinity-carousel/` — raw extraction data, screenshots and reference images from Affinity.

## Why these fonts

Affinity uses:

- `Affinity Serif Variable` for headings.
- `Canva Sans` for body/numbers.

We do **not** have licenses for those fonts, so the implementation uses the closest free equivalents already loaded in the project:

- `Playfair Display` → replaces Affinity Serif Variable.
- `Inter` → replaces Canva Sans.

If the real Affinity/Canva font files are ever licensed, swap the `font-family` declarations only; sizes, weights and layout must stay the same.

## Measured values from Affinity (desktop, 1440 px viewport)

### Section container

| Property | Value |
|---|---|
| Background | `#211D1D` |
| Horizontal padding | `76px` |
| Top padding | `128px` |
| Bottom padding | `160px` |
| Max-width | none (full-bleed) |

### Header

- Two-column grid: `2fr 1fr`, `align-items: center`, gap `64px`.

| Element | Font | Size | Weight | Line-height | Color |
|---|---|---|---|---|---|
| Title | Playfair Display | `80px` | `700` | `78.4px` | `#FFFFFF` |
| Lead | Inter | `24px` | `400` | `33.6px` | `rgba(255,255,255,0.698)` |

### Navigation arrows

| Property | Value |
|---|---|
| Size | `56px × 56px` |
| Border-radius | `9999px` |
| Padding | `0 20px` |
| Background | transparent |
| Border | none |
| Gap between buttons | `16px` |
| Default color | `#FFFFFF` |
| Disabled color | `rgba(255,255,255,0.5)` |
| Hover (enabled) | `background: rgba(255,255,255,0.1)` |

Arrow SVG paths match Affinity exactly (see `ServicesSection.astro`).

### Carousel track

| Property | Value |
|---|---|
| Display | flex |
| Gap | `24px` |
| Advance step | `card width + 24px` |

### Cards

| Property | Value |
|---|---|
| Width | `630px` |
| Min-height | `748px` |
| Border-radius | `20px` |
| Padding | `40px` |
| Layout | flex column, space-between |

#### Card backgrounds (Affinity real palette)

1. `#83D9E1` (cyan) → black text
2. `#A7F175` (lime) → black text
3. `#363636` (charcoal) → white text

Because this project has only three service categories, we use these three colors in that order.

#### Card typography

| Element | Font | Size | Weight | Line-height | Notes |
|---|---|---|---|---|---|
| Number | Inter | `16px` | `400` | `24px` | padding-bottom `8px` |
| Title | Playfair Display | `56px` | `700` | `56px` | |
| Description | Inter | `16px` | `400` | `24px` | padding-top `16px`, max-width `550px` |
| Bullet items | Inter | `16px` | `600` | `24px` | `5px` dot marker |

## Component structure

```astro
<section class="services" id="servicios">
  <div class="services-inner">
    <header class="services-header">
      <h2 class="services-title">…</h2>
      <p class="services-lead">…</p>
    </header>
    <div class="services-nav">
      <button aria-label="Anterior" disabled>…</button>
      <button aria-label="Siguiente">…</button>
    </div>
    <div class="services-carousel" role="region" aria-label="Servicios">
      <div class="services-carousel-track">
        <article class="service-card">…</article>
        …
      </div>
    </div>
  </div>
</section>
```

## JavaScript behavior

- Prev/Next move the track by exactly one card + gap.
- Buttons disable at the first/last slide.
- Step is recalculated on resize so responsive card widths still work.
- `transform: translate3d(…)` is used for smooth motion.
- If `prefers-reduced-motion: reduce` is active, the transform transition is removed.

## Responsive rules

- Desktop (`> 1280px`): exact 630 × 748 cards, 76 px horizontal padding.
- Tablet (`≤ 1280px`): cards scale to `520px` wide, padding reduces to `48px`.
- Mobile (`≤ 900px`): header stacks to a single column, cards become `calc(100vw - 96px)`.
- Small mobile (`≤ 640px`): padding drops to `16px`, cards become `calc(100vw - 32px)`.

## Important decisions

1. **Full-bleed section** — unlike other sections, this block intentionally breaks the site’s `1200px` max-width to match Affinity’s edge-to-edge carousel.
2. **Buttons below the header, left-aligned** — Affinity places the arrows under the title, not inside the right-hand lead column.
3. **Text color per card background** — cyan and lime cards use black text; charcoal card uses white text, exactly as Affinity does.
4. **No fake numbering format** — Affinity shows `1/6`; we show `1/3`, `2/3`, `3/3` because there are three service categories.

## Reference screenshots

Stored in `reference/affinity-carousel/`:

- `affinity-carousel-compare.png` — Affinity original.
- `dra-services-screenshot.png` — our current desktop view.
- `dra-services-next.png` — our carousel after clicking Next.
- `dra-services-mobile.png` — our mobile view.

## If this breaks in the future

1. Re-read `src/components/ServicesSection.astro`.
2. Check `reference/affinity-carousel/affinity-carousel-exact.json` for the original computed styles.
3. Compare against `reference/affinity-carousel/affinity-carousel-compare.png`.
4. Do not change card dimensions, font sizes, colors or arrow styling without checking this file first.
