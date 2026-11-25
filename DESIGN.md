# Design System — "Studio Editorial"

Direction B from the approved proposal: light-first with a dark-mode toggle, warm neutrals, editorial display headings, case-study cards styled like credits plaques. Gaming-industry-appropriate without being flashy.

## Palette

Defined as CSS custom properties in `src/styles/global.css`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#faf6f1` | `#1a1714` | Page background |
| `--bg-elevated` | `#ffffff` | `#211d1a` | Cards, header |
| `--surface` | `#f2e9df` | `#2a241f` | Chips, subtle fills |
| `--ink` | `#211d1a` | `#f3ece3` | Primary text |
| `--ink-muted` | `#5b544f` | `#b9afa5` | Secondary text |
| `--accent` | `#a64c21` | `#e2904f` | Links, metrics, primary buttons |
| `--border` | `#e1d5c6` | `#3a322b` | Hairlines |
| `--border-strong` | `#8f7c66` | `#71675c` | Borders that are the sole visual boundary of a control (e.g. secondary button at rest) — meets the 3:1 non-text contrast minimum, unlike `--border` |
| `--focus-ring` | `#1557c2` | `#8ab4ff` | Focus outline (intentionally distinct from the accent so focus is never mistaken for a hover/active state) |

Contrast was checked against WCAG 2.2 AA (4.5:1 normal text, 3:1 large text/non-text UI) for every text/background and button pairing above — all pass with margin (lowest ratio observed: ~5.3:1 for accent-on-background body links). Re-check with a contrast tool if any of these values change.

Theme switching: defaults to the visitor's OS preference (`prefers-color-scheme`), with a manual toggle (top-right) that overrides and persists via `localStorage`. An inline, render-blocking script in `<head>` applies the stored/detected theme before first paint to avoid a flash of the wrong theme.

## Typography

No web fonts — system font stacks only, so there's no render-blocking font request and no layout shift from font swapping.

- **Display** (`--font-display`): `ui-serif, Charter, 'Iowan Old Style', Georgia, 'Times New Roman', serif` — used for all headings, giving the "editorial" character.
- **Body** (`--font-body`): `ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.

Type scale is fluid (`clamp()`) rather than fixed breakpoint-specific sizes, so headings scale smoothly between mobile and desktop.

## Layout

- Single page, anchor-nav sections: `#home → #about → #experience → #impact → #skills → #resume → #contact`.
- Max content width `72rem` (`--max-width`), body text measure capped at `38rem` (`--measure`) for readable line length.
- Section vertical rhythm via `--space-section` (fluid `clamp(3.5rem, 8vw, 7rem)`).
- Desktop (≥1024px): sticky top nav with scroll-spy active-state highlighting; hero as a two-column grid (content + monogram/photo slot); skills/impact as 3-column card grids.
- Mobile (<768px): nav collapses into a hamburger-triggered panel (not an overlay — pushes content down, which avoids z-index/focus-trap complexity while staying fully keyboard- and screen-reader-operable); all grids collapse to one column; CTAs stack full-width.

## Components

`SiteNav` (desktop nav + mobile menu + theme toggle), `Hero`, `SectionHeading`, `AboutSection`, `ExperienceSection` (timeline with per-role `<details>` disclosure — no custom JS needed, keyboard-operable by default), `ImpactSection` (case-study cards), `SkillsSection`, `ResumeSection`, `ContactSection`, `Footer`, `ThemeToggle`.

## Interaction & motion

- All CSS transitions/animations are disabled under `prefers-reduced-motion: reduce` (global rule in `global.css`), including smooth-scroll for anchor navigation.
- The only client-side JavaScript: mobile menu open/close (with Escape-to-close and focus-to-first-link), theme toggle (click + persist), and an `IntersectionObserver`-based active-nav-link highlighter. No animation libraries, no client framework.
- Experience role details use native `<details>/<summary>` — expand/collapse is keyboard-operable and accessible with zero custom script.

## Avoiding "generic template" look

- No stock hero illustration, no gradient mesh background, no glassmorphism, no carousel.
- Metrics ("At a glance" stats, impact-card headline metric) are treated as a first-class visual element rather than buried in paragraph text — a deliberate choice for a QA/metrics-driven profile.
- Serif display type + warm neutral palette intentionally diverges from the blue/indigo SaaS-template look common in developer portfolios.
