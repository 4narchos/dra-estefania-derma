# Design System — Dra. Estefania Derma

## Palette

| Token | Hex | Role |
|-------|-----|------|
| Arena | `#D8CC9B` | Accent, highlights, CTA emphasis |
| Verde Bosque | `#2D5E46` | Primary action, trust, links |
| Azul Medianoche | `#000C1E` | Background, depth |
| Gris Carbón | `#3A3A3A` | Surfaces, cards, elevated panels |
| Pale Goldenrod | `#DACD96` | Secondary accent, hover states |

## Typography

- **Font**: Inter (Google Fonts)
- **Scale**: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 px
- **Body**: 16px/1.5 normal weight
- **Headings**: 24-56px, tight leading (1.2), semibold

## Spacing

- Base unit: 4px
- Used values: 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

## Border Radii

- `8px` — small elements, tags
- `12px` — buttons, inputs
- `16px` — cards, panels
- `24px` — large sections
- `9999px` — pills, avatars

## Depth (no box-shadows)

Depth via flat colour changes only:
- Background → Surface (`#000C1E` → `#3A3A3A`)
- Surface → Elevated (`#3A3A3A` → `#4A4A4A`)
- Borders via translucent accent (`rgba(216,204,155,0.12)`)

## Buttons

- **Primary**: `background: var(--color-verde)`, `color: white`, `border-radius: 12px`, `padding: 14px 28px`
- **Secondary**: `background: transparent`, `border: 1px solid var(--color-border-strong)`, `color: var(--color-text-primary)`
- **Ghost**: `background: transparent`, `color: var(--color-arena)`

## Cards

- `background: var(--color-surface)`
- `border-radius: 16px`
- `border: 1px solid var(--color-border)`
- No shadow

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
