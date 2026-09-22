# Tribe design

The Vega Family Survivor tracker uses one visual language: **Tribe**. It is playful and handmade, not a polished product skin. Classic is retired.

This file is a snapshot of the look as of 22 September 2026. Iterate from here; keep this document in sync when the language changes.

## Intent

A family Survivor fantasy league should feel like a camping notebook and a tribal banner, not a SaaS dashboard. Surfaces are sand and cream. Marks are ink-outlined and a little crooked. Color is flat. Type is handwritten for titles and small labels, rounded sans for body copy.

## Type

Loaded from Google Fonts in `index.html`.

| Role | Face | Notes |
| --- | --- | --- |
| Body | Nunito | 400 / 600 / 800. Fallback `Trebuchet MS`. |
| Display | Walter Turncoat | Headings, `font-bold`, `font-semibold`, page titles. |
| Small | Walter Turncoat at `0.9rem` | The `text-sm` class. Footer, archive banner, nav labels, captions. Do not add extra size overrides on those. |

Root font size is **18px** (`--font-size` in `src/styles/theme.css`).

## Color

Tokens live on `:root` in `src/styles/tribal.css`.

| Token | Hex | Use |
| --- | --- | --- |
| `--sand` | `#e8cfa8` | Page ground |
| `--sand-deep` | `#d4b48a` | Spare depth |
| `--paper` | `#fbf3e4` | Header, nav, footer |
| `--cream` | `#fff8eb` | Cards, selects |
| `--ink` | `#24160f` | Primary text, outlines |
| `--ink-soft` | `#5c4333` | Secondary text |
| `--stroke` | `#2b1a12` | Borders, hard shadows |
| `--card-shadow` | `rgba(43, 26, 18, 0.16)` | Card offset shadow and empty score-bar track |
| `--terracotta` | `#c44520` | Primary action, active nav, header stripe |
| `--terracotta-hot` | `#e85a2a` | Clickable hover |
| `--mustard` | `#e8b84a` | Site mark, active accents |
| `--leaf` | `#6b9b3a` | Shield mark, spare accent |
| `--sage` | `#3f7a64` | Spare accent |
| `--mint` | `#3ddc97` | Spare accent |
| `--violet` | `#5b3cc4` | Spare accent |

Player colors on the leaderboard and tribe cards come from season data (each family member has a hex). Those stay as given. They are not the Tribe palette.

Soft callouts (`bg-red-50`, `bg-amber-50`, `bg-blue-50`) map to `#fff1d6`. Gray text utilities map to ink / ink-soft. White surfaces map to cream.

## Surfaces

- **Page:** sand fill plus a repeating handmade SVG doodle. A light noise overlay (`body::before`, `mix-blend-mode: multiply`) sits above the UI and does not capture clicks.
- **Chrome:** paper background, thick ink borders (header 4px, nav 3px, footer 4px).
- **Header stripe:** terracotta bar under the header with a jagged `clip-path`. Flat color, not a gradient.
- **Cards:** cream, 3px ink border, offset shadow `5px 6px 0 var(--card-shadow)`. Corners are irregular (`1.35rem 0.45rem 1.5rem 0.6rem / 0.7rem 1.4rem 0.5rem 1.25rem`). Adjacent cards tilt slightly (`±0.35deg` / `0.45deg`).
- **Archive banner:** `#fff0c8` with a 3px ink bottom edge.

No gradients. Fills are flat, including the season-winner banner (the family member’s solid color).

## Mark

`ShieldMark` in `src/app/components/ShieldMark.tsx` is the site logo. Hardcoded fills (ink, mustard, terracotta, leaf, cream) so it reads on mustard, sand, and colored banners. It sits in `.site-mark`: mustard blob, 3px ink stroke, lopsided radius, slight wiggle. Prefer this kind of filled geometric mark over stroke icons when adding new brand art.

Lucide icons remain for navigation and inline UI (trophy, charts, book).

## Components

**Nav.** Handmade tilt on links. Active item is terracotta on a mustard wash, irregular pill, 2px ink shadow. Hover color only (terracotta).

**Buttons and text links** that use `bg-blue-600` become terracotta with an ink outline and hard shadow. Hover (anchors and buttons only) goes `--terracotta-hot` with a small rotate/scale. Headers and other non-clickable blue blocks do not get that hover.

**Selects** (season switcher, week picker): cream, 3px ink border, irregular radius, 2px ink shadow, Walter Turncoat.

**Score category headers** on Rules stay rectangular and still. No lift, no hover.

**Weekly score bars:** filled segment is the player color. Empty track is `--card-shadow`, matching the card shadow tint.

## Motion

- Site mark wiggles (`tribal-wiggle`, 3.6s).
- Cards sit at a tiny rotation. They do not lift on hover.
- Hover feedback is for clickable controls only (nav, buttons, links, selects).
- `prefers-reduced-motion: reduce` turns off mark animation and related transitions.

## Layout chrome

Header (logo + title + season switcher) → nav → optional archive banner → main → footer. There is no theme toggle. Season switching stays in the header.

## How the CSS is layered

Pages still use Tailwind utility classes (`bg-white`, `text-gray-900`, `rounded-xl`, …). `src/styles/tribal.css` is imported last in `src/styles/index.css` and is **unlayered**, so it remaps those utilities into Tribe tokens. Prefer adding or changing rules there instead of restyling every page.

When a one-off needs a Tribe hook, add a class in the component (`site-mark`, `score-bar-track`, `score-category`, `nav-link-active`) and style it in `tribal.css`.

## Do / don’t

- Do keep fills flat.
- Do keep type assignments on the shared classes (`text-sm`, headings), not one-off overrides.
- Do keep hover on things people can click; leave cards, rows, and score headers still.
- Don’t reintroduce a Classic theme or a header style switcher.
- Don’t put secrets, passwords, or API keys in this file or in the UI.
