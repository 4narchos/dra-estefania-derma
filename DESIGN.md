---
version: alpha
name: Dra. Estefanía Derma — Homepage
description: A calm, premium dermatology landing page built as eight sequential blocks. The first two blocks act as a single cinematic scene on scroll, then the page unfolds into credentials, services, philosophy, value, reviews, and a final CTA. The visual language pairs warm clinical greens with editorial serif type and generous whitespace.

colors:
  primary: "#2D5E46"
  primary-hover: "#3a7a5a"
  accent: "#C4B896"
  accent-alt: "#B8AA82"
  background: "#FAF8F3"
  surface: "#F0EBE0"
  surface-dark: "#1a2332"
  midnight: "#000C1E"
  charcoal: "#3A3A3A"
  text-primary: "#1a1a1a"
  text-secondary: "#4a4a4a"
  text-muted: "#8a8a8a"
  on-primary: "#ffffff"
  on-dark: "#f5f5f0"
  border: "rgba(0, 0, 0, 0.08)"
  border-strong: "rgba(0, 0, 0, 0.15)"
  border-inverse: "rgba(255, 255, 255, 0.12)"
  success: "#325C46"
  star: "#F5B800"
  tag-bg: "#E8F4E8"

  # Affinity "Meet the new standard" carousel colors (measured)
  affinity-cyan: "#83D9E1"
  affinity-lime: "#A7F175"
  affinity-charcoal: "#363636"
  affinity-section-bg: "#211D1D"
  affinity-dark: "#0A0A0A"
  affinity-off-white: "#F4F4F0"

typography:
  hero-display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(3rem, 13vw, 9rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  hero-body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.5
  section-title:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  section-subtitle:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  presentation-title:
    fontFamily: "'Playfair Display', Georgia, sans-serif"
    fontSize: "clamp(2.25rem, 9vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  card-title:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  eyebrow:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
    textTransform: "uppercase"

rounded:
  sm: "0.5rem"    # 8px
  md: "0.75rem"   # 12px
  lg: "1rem"      # 16px
  xl: "1.5rem"    # 24px
  full: "9999px"

spacing:
  1: "0.25rem"   # 4px
  2: "0.5rem"    # 8px
  3: "0.75rem"   # 12px
  4: "1rem"      # 16px
  5: "1.25rem"   # 20px
  6: "1.5rem"    # 24px
  8: "2rem"      # 32px
  10: "2.5rem"   # 40px
  12: "3rem"     # 48px
  16: "4rem"     # 64px
  20: "5rem"     # 80px
  section: "5rem" # 80px default; 96px on desktop

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "1rem 1.5rem"
  button-primary-large:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "1rem 2rem"
    fontSize: "1.125rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "1px solid {colors.border-strong}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "1rem 1.5rem"
  hero:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.on-dark}"
    minHeight: "100vh"
    paddingTop: "calc(64px + 2rem)"
  hero-title-accent:
    color: "{colors.accent}"
    fontStyle: "italic"
  hero-collage-item:
    rounded: "{rounded.md}"
    border: "1px solid {colors.border-inverse}"
    shadow: "0 12px 40px rgba(0, 0, 0, 0.35)"
    overlay: "linear-gradient(to top, rgba(0, 12, 30, 0.9), transparent)"
  presentation:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    padding: "{spacing.16} 0"
  credentials:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    padding: "{spacing.20} 0"
  services-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.8}"
  philosophy-pillar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.6}"
  value-proposition:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.on-dark}"
    padding: "{spacing.20} 0"
  reviews-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.6}"
  contact-visual:
    rounded: "{rounded.lg}"
    aspectRatio: "4 / 5"
  contact-location:
    icon: "📍"
    textColor: "{colors.text-secondary}"
    cityTextColor: "{colors.text-primary}"
  contact-price:
    textColor: "{colors.text-secondary}"
    strongTextColor: "{colors.primary}"

animation:
  library: "GSAP + ScrollTrigger"
  defaultEase: "power2.out"
  entranceDuration: "0.9s"
  stagger: "0.12s"
  scrubSmoothness: true
  respectReducedMotion: true
---

## Overview

The homepage is conceived as a single scrolling narrative made of **eight blocks**:

1. **Hero (Hook)** — dark, cinematic entry: "Tu piel te habla" surrounded by orbital condition cards.
2. **Presentation** — the doctor's promise: "Yo te ayudo a entenderla" with photo and action menu.
3. **Credentials** — trust proof: certifications and diplomas.
4. **Services** — clinical, aesthetic, and minor surgery services in a horizontal carousel.
5. **Philosophy** — three pillars: science, experience, patient expectations.
6. **Value Proposition** — dark band explaining the consultation experience.
7. **Reviews** — patient testimonials.
8. **Contact / CTA** — final invitation to book.

The first two blocks are intentionally treated as a **single cinematic scene**. On scroll they transform together; when motion is reduced they fall back to two static, independent sections.

The visual tone is **clinical warmth**: deep greens and golds, off-white backgrounds, editorial serif display type for emotional headlines, clean sans-serif for everything else. There are no gradients, no auroras, no decorative meshes — contrast comes from color-block surfaces and whitespace.

## Colors

### Brand
- **Primary** (`{colors.primary}` — #2D5E46): Main brand green. Used for primary buttons, success tags, avatars.
- **Primary Hover** (`{colors.primary-hover}` — #3a7a5a): Hover/press state.
- **Accent** (`{colors.accent}` — #C4B896): Gold-beige for highlights, eyebrow text, italic emphasis on dark surfaces.

### Surfaces
- **Background** (`{colors.background}` — #FAF8F3): Warm off-white page background.
- **Surface** (`{colors.surface}` — #F0EBE0): Slightly darker cream for cards and subtle bands.
- **Surface Dark** (`{colors.surface-dark}` — #1a2332): Used sparingly for the value block background.
- **Midnight** (`{colors.midnight}` — #000C1E): Hero and final CTA background.

### Text
- **Text Primary** (`{colors.text-primary}` — #1a1a1a): Headlines and body on light surfaces.
- **Text Secondary** (`{colors.text-secondary}` — #4a4a4a): Subtitles and descriptions.
- **Text Muted** (`{colors.text-muted}` — #8a8a8a): Dates, meta, captions.
- **On Primary / On Dark** (`{colors.on-primary}` / `{colors.on-dark}` — #ffffff / #f5f5f0): Text on dark or green surfaces.

### Semantic
- **Success** (`{colors.success}` — #325C46): Verified badges.
- **Star** (`{colors.star}` — #F5B800): Rating stars.
- **Tag BG** (`{colors.tag-bg}` — #E8F4E8): Review tag backgrounds.

## Typography

### Font Families
- **Display / emotional headlines**: Playfair Display (serif, italic allowed).
- **UI, body, buttons, labels**: Inter (sans-serif).
- **Junicode** is loaded but reserved for future editorial accents; not used in current homepage.

### Hierarchy

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.hero-display}` | clamp 48–144px | 600 | 0.92 | Hero title "Tu piel te habla" |
| `{typography.presentation-title}` | clamp 36–96px | 600 | 1.1 | Presentation title |
| `{typography.section-title}` | clamp 30–48px | 700 | 1.2 | Section headlines |
| `{typography.section-subtitle}` | 18px | 400 | 1.7 | Section subtitles |
| `{typography.card-title}` | 20px | 600 | 1.3 | Service / pillar titles |
| `{typography.body}` | 16px | 400 | 1.7 | Running text |
| `{typography.body-sm}` | 14px | 400 | 1.6 | Details, addresses, payment info |
| `{typography.button}` | 16px | 600 | 1.4 | All buttons |
| `{typography.eyebrow}` | 14px | 500 | 1.4 | Uppercase labels like "Agenda tu consulta" |

### Principles
- Display type is large and tight, never bold for bold's sake — emphasis comes from size, color, and italic contrast.
- Body text stays generous (1.7 line-height) for readability.
- On dark surfaces, type softens to `{colors.on-dark}` at 80–90% opacity for supporting copy.

## Layout

### Spacing System
- Base unit 4px.
- Section vertical padding defaults to `{spacing.20}` (80px); can scale to 96px on desktop.
- Cards use `{spacing.6}` to `{spacing.8}` internal padding.
- Max content width: 1200px, centered, with `{spacing.6}` horizontal padding.

### Grid
- Hero: centered single column.
- Presentation: single centered column; photo + content stacked.
- Credentials: centered single column (badge + list).
- Services: intro two-column (image + title) then horizontal scroll carousel.
- Philosophy: two-column on desktop (image left, content right), stacked on mobile.
- Value Proposition: two-column on desktop (content left, image right), stacked on mobile.
- Reviews: summary card + two-column review grid.
- Contact: dark CTA two-column on desktop, details grid 4-column → 2 → 1.

### Whitespace Philosophy
The page relies on whitespace and surface-color shifts for rhythm. Dark blocks (Hero, Value, CTA) alternate with warm off-white blocks to create natural pacing.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 8px | Buttons, small cards |
| `{rounded.md}` | 12px | Cards, inputs, large buttons |
| `{rounded.lg}` | 16px | Hero media, CTA media |
| `{rounded.xl}` | 24px | Large feature containers |
| `{rounded.full}` | 9999px | Pills, badges, avatars |

### Photography Geometry
- Hero is typographic; no full-bleed photo.
- Presentation photo: tall portrait, object-fit cover, max 70vh.
- Service/Philosophy/Value images: 4:5 or 2:3 aspect ratio, contained or covered.
- Review avatars: 40px circles.

## Components

### Buttons
- `{component.button-primary}` — main CTA. Solid green, white text, 12px radius, 16px×24px padding.
- `{component.button-primary-large}` — final CTA "Agendar cita". Larger padding and font.
- `{component.button-secondary}` — outline green, used for secondary actions like "Ver todas las credenciales".

### Hero
- Full viewport dark section.
- Large centered title "Tu piel *te habla*" in the upper area.
- No subtitle.
- Collage of five square placeholders for condition images (Acné, Melasma, Caída de cabello, Caspa, Arrugas) aligned in the lower third of the viewport.
- Placeholders are arranged in a podium/arc: center item higher, outer items lower.
- Each placeholder is a dashed-border square with a subtle background, ready for image upload later.
- Labels sit beneath each placeholder.
- Scroll-hint mouse indicator at bottom center.

### Presentation
- Full-viewport section directly after Hero.
- The doctor photo (background-removed) spans the full block height as the background element, anchored at the bottom center.
- A dark bottom gradient overlay keeps the foreground text readable.
- Centered text in the lower third: title "Yo te ayudo a entenderla" with italic emphasis on the last word.
- Affinity-style pill tab menu below the title with three actions: Ubicaciones, Reservar cita, Enviar mensaje.
- Tab bar has a dark translucent background, full rounded shape (`border-radius: 9999px`), and individual pills invert to white on hover.
- Signature block on the right side: "Dra. Estefanía Borges" in cursive (`Caveat`) with a typewriter/signing animation, followed by "DERMATOLOGA" in uppercase sans-serif.

### Credentials
- Light parchment-style background (`#F8F5ED`) inspired by a diploma/certificate.
- Centered header with laurel wreath, title "Dermatóloga *Certificada*", golden ribbon and red wax seal.
- Body layout: doctor photo (same PNG without background) on the left, CV/diploma card on the right.
- CV card has white background, soft shadow, golden border and lists credentials with elegant numbering.
- CTA button "Ver todas las credenciales" sits at the bottom of the CV card.

### Services
> **Persistent specification:** see `SERVICES_CAROUSEL.md` for the exact measured values, reference screenshots and implementation notes. This DESIGN.md section is a summary; `SERVICES_CAROUSEL.md` is the source of truth.

Réplica directa del carrusel "Meet the new standard" de Affinity (extraído de https://www.affinity.studio/).

- Section background: `#211D1D` (Affinity's dark surface).
- Full-bleed container with `128px 76px 160px` desktop padding; scales down on smaller screens.
- Header: 2/3 + 1/3 grid, `align-items: center`.
  - Left title: `Playfair Display`, `80px` / `78.4px` line-height, `700` weight, white.
  - Right lead: `Inter`, `24px` / `33.6px` line-height, `400` weight, `rgba(255,255,255,0.698)`.
- Navigation: two `56px × 56px` circular buttons below the header, separated by `16px`.
  - Transparent background, no border, white icon; disabled state uses `rgba(255,255,255,0.5)`.
  - Arrow SVG paths match Affinity's exact iconography.
- Horizontal carousel track with `24px` gap.
- Cards: `630px × 748px`, `20px` border-radius, `40px` internal padding.
  - Number: `Inter`, `16px` / `24px`, `400` weight, `8px` padding-bottom.
  - Category title: `Playfair Display`, `56px` / `56px`, `700` weight.
  - Description: `Inter`, `16px` / `24px`, `400` weight, `16px` padding-top, `max-width: 550px`.
  - Bullet list: `Inter`, `16px` / `24px`, `600` weight, `5px` dot marker.
- Card backgrounds taken from Affinity's real palette:
  - `#83D9E1` (cyan) with black text.
  - `#A7F175` (lime) with black text.
  - `#363636` (charcoal) with white text.
- Carousel advances one card at a time; prev/next buttons disable at the ends. JS calculates `cardWidth + gap`; `prefers-reduced-motion` removes the transform transition.
- Responsive: cards scale down on tablet; on mobile they become full-viewport-width slides with horizontal overflow.

### Philosophy
- Light section with centered header.
- Two-column layout: photo on the left, three pillar cards on the right.
- The three pillars are visually connected by a vertical dotted/line connector with a dot per pillar, suggesting harmony and sequence.
- Each pillar card shows a number, title, and body text.

### Value Proposition
- Dark section.
- Top marquee/cinta deslizable with conditions and procedures (Acné, Caspa, Manchas, Alopecia, Arrugas, Skincare, Bótox, Peelings, Bioestimulantes, Microneedling, Biopsias, Crioterapia, Electrocirugía, Quistes, Lipomas) separated by middots.
- Marquee loops infinitely with CSS and pauses under `prefers-reduced-motion`.
- Below the marquee: bulleted consultation process + highlighted clarity box.
- Doctor photo on the side.

### Reviews
- 5-star summary + tags.
- Two-column grid of patient testimonials.
- Link to Doctoralia.

### Contact / CTA
- Light section (`{colors.surface}`) closing the page.
- Two-column layout: doctor photo with dermatoscope on the left, content on the right.
- Title: "Me puedes encontrar en".
- Location list with pin icon: Mérida, Valladolid, Izamal.
- Price line: "Consulta dermatológica desde $1,100".
- Action buttons: "Ver todas las ubicaciones", "Reservar una cita" (primary), "Resuelve tus dudas más frecuentes", "Enviar mensaje".

## Animations

### Philosophy
All animations are **progressive enhancement**:
1. The static end state is designed first and works without JavaScript.
2. Motion is added via GSAP + ScrollTrigger only when JavaScript is available.
3. If `prefers-reduced-motion: reduce` is active, all scrubbed/pinned motion is disabled and only instant end states are shown.
4. No layout is broken when motion is disabled.

### Library
- **GSAP 3** with **ScrollTrigger** plugin.
- Shared module: `src/utils/animations.js` registers the plugin once.
- Per-component client `<script>` modules import from that shared module.

### Global Patterns
- **Entrance fade-up**: elements start at `opacity: 0; translateY(50px)` and animate to `opacity: 1; translateY(0)` when entering the viewport.
- **Stagger**: related elements (title lines, cards, list items) animate in sequence with `{animation.stagger}`.
- **Hero fade-out**: as the user scrolls past the Hero, the whole stage fades/scales slightly to create a sense of depth.
- **Reduced motion fallback**: skip entrance transforms, set opacity to 1 immediately.

### Timing
| Animation | Duration | Ease |
|---|---|---|
| Entrance fade-up | 0.9s | power2.out |
| Hero title lines | 1.0s | power3.out |
| Hero collage items | 0.9s | power3.out |
| Scroll fade-out | scrubbed | none |

## Scene Pair: Hero + Presentation

This is the most important animation on the page. The two blocks are designed to behave as **one continuous cinematic sequence** when motion is active, and as **two normal static sections** when motion is reduced.

### Reference: Affinity.studio First Sequence

Affinity's homepage opens with a dark hero containing a large serif headline and a scattered collage of colorful images. As the user scrolls:

1. **Initial state**: headline centered, collage images floating at different depths around it.
2. **Scroll phase 1**: the collage images drift inward and line up into a horizontal band beneath the headline.
3. **Scroll phase 2**: the hero text stays pinned while the collage continues to settle, then the entire hero fades.
4. **Transition**: the next section ("No more switching apps") fades/slides in from below, replacing the hero.
5. **Reduced motion**: the hero is just a normal block with the headline and a static row of images below it; the next section appears immediately underneath as a standard scroll.

### Our Adaptation

#### End State (Reduced Motion / No-JS)
```
<section class="hero">
  <div class="hero-content">
    <h1>Tu piel <em>te habla</em></h1>
    <p>Y su lenguaje luce así</p>
  </div>
  <div class="hero-collage">
    <div class="collage-item">
      <img src="..." alt="Imagen representativa de acné" />
      <span>Acné</span>
    </div>
    <div class="collage-item">
      <img src="..." alt="Imagen representativa de melasma" />
      <span>Melasma</span>
    </div>
    <div class="collage-item">
      <img src="..." alt="Imagen representativa de caída de cabello" />
      <span>Caída de cabello</span>
    </div>
    <div class="collage-item">
      <img src="..." alt="Imagen representativa de caspa" />
      <span>Caspa</span>
    </div>
    <div class="collage-item">
      <img src="..." alt="Imagen representativa de arrugas" />
      <span>Arrugas</span>
    </div>
  </div>
</section>

<section class="presentation">
  <img src="..." alt="Dra. Estefanía con dermatoscopio" />
  <h2>Yo te ayudo a <em>entenderla</em> ✨</h2>
  <p>Dra. Estefanía Borges · Dermatóloga Certificada</p>
  <p>📍 Mérida</p>
  <nav class="action-menu">...</nav>
</section>
```

- Hero is **not pinned**.
- Collage items sit in their final grid positions (no entrance animation).
- Presentation sits directly below Hero with normal document flow.
- Both sections are fully accessible and readable without motion.

#### Animated State

**1. Entrance (page load)**
- Hero background and title are already visible (no blank flash).
- Title lines fade up with stagger.
- Collage items fade up from `translateY(40px)` with stagger.
- Scroll hint fades in last.

**2. Scroll-driven scene transition**
- Hero section is **pinned** at the top for a scroll distance of roughly `200vh`.
- During the first half of the pinned distance:
  - Collage items drift from their grid positions toward a tighter horizontal band below the title.
  - Slight parallax: items at different grid positions move at different speeds.
- During the second half:
  - Hero stage opacity reduces to 0 and scale drops to ~0.98.
  - Simultaneously, the Presentation section, which starts `translateY(100vh)` and `opacity: 0`, moves up into view.
- At the end of the pinned range, Hero is fully invisible and Presentation is fully visible at normal position.
- Pin releases and normal scrolling resumes.

**3. Implementation sketch**
```js
// Hero timeline (scrubbed)
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=200%",
    pin: true,
    scrub: 0.8,
  },
});

heroTl
  .to(".collage-item", {
    // drift to horizontal band
    x: (i) => targetX[i],
    y: (i) => targetY[i],
    scale: (i) => targetScale[i],
    duration: 1,
  })
  .to(".hero-stage", {
    opacity: 0,
    scale: 0.96,
    duration: 1,
  }, 0.5)
  .from(".presentation-inner", {
    y: 100,
    opacity: 0,
    duration: 1,
  }, 0.6);
```

**4. Reduce-motion toggle**
- A "Reduce motion" button can be added in the corner (like Affinity).
- When activated:
  - Kill all ScrollTriggers.
  - Reset all animated elements to their end-state CSS.
  - Disable entrance animations.
  - Store preference in `localStorage`.

### Accessibility
- Hero content remains in the natural tab order.
- Pinned sections do not trap focus.
- `prefers-reduced-motion` is checked before any GSAP animation runs.
- Avoid vestibular triggers: no fast spins, no sudden direction changes.

## Do's and Don'ts

### Do
- Use `{colors.primary}` for the main CTA and success states.
- Keep display type in Playfair Display for emotional headlines.
- Use italic within headlines for emphasis (e.g., "te habla", "entenderla").
- Alternate dark and light surfaces to create section rhythm.
- Respect `prefers-reduced-motion` everywhere.
- Design the static end state before adding scroll animations.

### Don't
- Don't use gradients or mesh backgrounds — the system is color-block based.
- Don't make every element animate; reserve motion for the Hero/Presentation scene and subtle entrance fades.
- Don't break the document flow when JS is disabled.
- Don't use `{colors.accent}` as a primary button color; it's only for highlights and text emphasis.
- Don't add hover states beyond the existing CSS transitions unless specifically required.

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Single column; hero collage becomes a 2-column compact grid; presentation photo max 70vh; service carousel scrollable; contact CTA stacked. |
| Tablet | 768–1023px | Two-column where appropriate; hero collage uses 6-column asymmetric layout; contact CTA two-column. |
| Desktop | 1024px+ | Full two-column layouts; hero collage at full width; contact CTA two-column with photo left, content right. |

### Typography Scaling
- Hero title uses `clamp()` to scale from 48px on small screens to 144px on large screens.
- Presentation title scales from 36px to 96px.
- Section titles scale from 30px to 48px.

### Motion Scaling
- On mobile, reduce parallax distances and stagger counts to preserve performance.
- Disable pinning on very small screens if it hurts usability.

## Iteration Guide

1. **Design in pairs first.** The Hero + Presentation scene is the highest-leverage area; get the end state perfect before animating.
2. **Reference tokens with `{token}` syntax** when writing specs or prompts for UI work.
3. **Add one animation at a time.** Start with entrance fades, then add the Hero/Presentation scroll scene, then polish secondary entrances.
4. **Test reduced motion after every animation change.** The page must remain usable and beautiful without motion.
5. **Run `npm run build`** after structural changes to ensure static output remains valid.
6. **Keep `DESIGN.md` updated** when colors, tokens, or animation behavior change.

## Known Gaps

- Exact scroll distances and parallax multipliers for the Hero/Presentation scene need to be tuned on real devices.
- The reduce-motion toggle UI is not yet implemented; currently only `prefers-reduced-motion` is honored.
- Photography for Hero collage (acné, melasma, caída de cabello, caspa, arrugas), Services (guantes rosas), Philosophy (bata / puerta de cristal), Value (escritorio), and CTA uses placeholders until final assets are delivered.
- No marquee or infinite-scroll element is currently implemented; reserved for a future iteration if desired.
- Pricing/comparison table is not part of this homepage scope.
