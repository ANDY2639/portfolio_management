---
name: Andrés Guerrero Portfolio
description: Terminal-workbench portfolio for a full-stack fintech engineer.
colors:
  carbon: "#0a0a0a"
  carbon-alt: "#0f0f0f"
  surface: "#111111"
  surface-raised: "#161616"
  hairline: "#1f1f1f"
  hairline-strong: "#2e2e2e"
  ink: "#e8e8e8"
  ink-muted: "#a0a0a0"
  ink-subtle: "#808080"
  phosphor: "#00ff88"
  phosphor-deep: "#00733a"
  amber: "#e5a86b"
  amber-deep: "#8a4b00"
  alert: "#ff6b6b"
  alert-deep: "#b3261e"
  info: "#7eb8f7"
  info-deep: "#1f5fa8"
  paper: "#f5f5f0"
  paper-alt: "#eeeeea"
  paper-surface: "#ffffff"
  paper-hairline: "#d8d8d4"
  paper-ink: "#0a0a0a"
typography:
  display:
    fontFamily: "JetBrains Mono, Fira Code, Cascadia Code, monospace"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "JetBrains Mono, Fira Code, Cascadia Code, monospace"
    fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "JetBrains Mono, Fira Code, Cascadia Code, monospace"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
  body:
    fontFamily: "JetBrains Mono, Fira Code, Cascadia Code, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, Fira Code, Cascadia Code, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  none: "0"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.phosphor}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1.25rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.phosphor}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.none}"
    padding: "0.5rem 1.25rem"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-subtle}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
    typography: "{typography.label}"
---

# Design System: Andrés Guerrero Portfolio

## Overview

**Creative North Star: "The Terminal Workbench"**

The portfolio behaves like a tool left open on a developer's desk: a quiet terminal, a status line, a file tree of evidence. It is not a retro CRT costume and it is not a generic dark SaaS dashboard. Surfaces are flat, divisions are 1px hairlines, and the phosphor green is a signal rather than a paint job. Type does most of the work; decoration is limited to the code-native details that a working interface would actually have.

Density comes from information design, not from ornament: line numbers in the gutter, prompts before actions, uppercase labels that read as commands, and a single accent that marks the active path. The light theme inverts the same workbench onto warm paper without becoming a different product.

**Key Characteristics:**
- Flat surfaces, 1px hairlines, no shadows.
- Square corners; no pills, no soft cards.
- JetBrains Mono at every level, including display.
- Phosphor green reserved for state, action, and section prefixes.
- Syntax accents (amber, blue) used only where a value or number needs a different voice.
- Keyboard-first: visible focus rings and reduced-motion support are part of the system.

## Colors

A two-theme palette: carbon at night, warm paper by day, with one phosphor accent and two syntax colors.

### Primary
- **Phosphor Green** (#00ff88 dark / #00733a light): the only brand accent. Used for active nav items, links, command prompts, section prefixes (`//`), the availability dot, focus rings, and the active theme icon. It is never body text at scale.
- **Phosphor Deep** (#00cc6a dark / #006633 light): hover and pressed states where the bright accent would be too loud.

### Secondary
- **Syntax Amber** (#e5a86b dark / #8a4b00 light): string-like values (location, quoted metadata) and warm highlights. In light mode it darkens enough to keep AA contrast.

### Tertiary
- **Signal Blue** (#7eb8f7 dark / #1f5fa8 light): numeric and meta accents in the about panel. Sparse by design.

### Neutral
- **Carbon** (#0a0a0a): dark page ground.
- **Carbon Alt** (#0f0f0f): alternating dark section.
- **Surface** (#111111): cards, panels, terminal window.
- **Surface Raised** (#161616): title bars and hover rows.
- **Hairline** (#1f1f1f): default 1px divider.
- **Hairline Strong** (#2e2e2e): interactive borders and menu edges.
- **Ink** (#e8e8e8): primary text.
- **Ink Muted** (#a0a0a0): secondary text.
- **Ink Subtle** (#808080): metadata and decorative indices; raised to meet AA.
- **Paper** (#f5f5f0) / **Paper Alt** (#eeeeea) / **Paper Surface** (#ffffff): light-theme ground, alternating section, and cards.
- **Paper Hairline** (#d8d8d4): light-theme divider.
- **Paper Ink** (#0a0a0a): light-theme primary text.

### Named Rules
**The One Accent Rule.** Phosphor green covers less than 10% of any screen. Its rarity is what makes an active state legible.

**The No Green Body Rule.** Green is a signal, not a reading color. Body copy uses Ink, Ink Muted, or Ink Subtle.

## Typography

**Display Font:** JetBrains Mono (with Fira Code, Cascadia Code, monospace)
**Body Font:** JetBrains Mono (same stack)
**Label/Mono Font:** JetBrains Mono

**Character:** One monospaced voice for the entire product. The hierarchy comes from size, weight, and case, not from a second family. This is a deliberate tool-like choice: a terminal has one font and earns hierarchy through composition.

### Hierarchy
- **Display** (700, clamp 2.5rem–4rem, line-height 1, tracking -0.03em): the name in the hero.
- **Headline** (700, clamp 1.6rem–2.5rem, line-height 1.2): section headings.
- **Title** (500, 1rem, line-height 1.4): card titles, job roles, project names.
- **Body** (400, 0.9rem, line-height 1.6): paragraphs; section leads cap at 540px.
- **Label** (400, 0.7rem, tracking 0.1em, uppercase): section tags, nav commands, metadata keys.

### Named Rules
**The Single Voice Rule.** Do not introduce a second typeface. If a section needs emphasis, change weight or size before changing family.

**The Code-Not-Costume Rule.** Monospace is used because the subject is code and data, not as a generic "technical" texture.

## Layout

A single 1080px container with a fluid gutter (`clamp(1.25rem, 5vw, 3rem)`). The nav is a fixed 56px bar; content begins below it. Sections alternate between Carbon and Carbon Alt (or Paper and Paper Alt) and are separated by a 1px hairline rather than a shadow.

Desktop grids: hero is a 48px gutter + content + 420px terminal window; about is two equal columns; experience is a single list with a two-column header; skills are a card grid; certifications and education are list rows. At 1000px the terminal window drops; at 768px the nav collapses to a menu and the grids become single-column; at 720px the gutter and decorative line numbers disappear.

Vertical rhythm uses the spacing scale: 0.25 / 0.5 / 0.75 / 1 / 1.25 / 1.5 / 2 / 2.5 / 3 / 4 / 5 / 6 / 8rem. Section padding is typically 5rem.

## Elevation & Depth

The system is flat. There are no box shadows, no glass, and no blurred glows used as decoration. Depth is communicated by tonal steps (Carbon → Carbon Alt → Surface → Surface Raised) and by 1px borders. The terminal window is a bordered surface, not a floating card. The only "glow" is a soft radial tint behind the hero on the OG asset, not in the product UI.

**The Flat-By-Default Rule.** If a component needs to separate itself, add a hairline or move one tonal step. Do not add a shadow.

## Shapes

Square corners everywhere (`border-radius: 0`). Borders are 1px; interactive borders may step up to `Hairline Strong`. There are no pills, no rounded cards, and no circular containers except the three window dots in the decorative terminal. The recurring silhouette is the rectangle: terminal window, list row, tag, button, input.

## Components

### Buttons
- **Shape:** square, 1px border.
- **Primary:** phosphor text on carbon, with a phosphor border; on hover the fill becomes phosphor and the text flips to carbon.
- **Ghost:** muted text on transparent, `Hairline Strong` border; hover raises text to Ink.
- **Focus:** 2px phosphor outline with 2px offset; never remove it.

### Tags / Chips
- Square, 1px `Hairline`, 10px uppercase-ish label in `Ink Subtle`, 2px × 8px padding.
- Used for certificate keywords and project tech. They are metadata, not actions.

### Cards / Containers
- Square, 1px `Hairline`, `Surface` background.
- No shadow; the border is the only edge.
- List rows use a bottom hairline and a 60ms stagger for entrance (transform only, never opacity).
- Internal padding follows the spacing scale (`1rem`–`1.5rem`).

### Navigation
- 56px bar, `Carbon`/`Paper` background, bottom hairline.
- Logo `[ag]` in phosphor brackets; links in `Ink Muted`, active link in phosphor with a soft green tint.
- Controls: language toggle (es/en), three-icon theme switch (sun/moon/monitor), hamburger under 768px.
- Mobile menu is a fixed panel below the bar with focus trapped, Escape to close, and focus returned to the hamburger.

### Theme Switch
- A `fieldset` with three square icon buttons (sun, moon, monitor), 34px wide (30px on mobile).
- Active state: phosphor icon on `green-bg`; inactive: `Ink Muted`.
- 1px separators between options; no dropdown, no absolute positioning.

### Line-Number Gutter
- Decorative 48px column with 11px numerals in `Ink Subtle`.
- Hidden below 720px and on print.

## Do's and Don'ts

### Do:
- **Do** keep the accent under 10% of the viewport; use it for state and action.
- **Do** separate surfaces with 1px hairlines and tonal steps.
- **Do** keep every interactive element keyboard-reachable with a visible focus ring.
- **Do** use JetBrains Mono for display, body, and labels.
- **Do** respect `prefers-reduced-motion`: entrances become instant, no typewriter, no blink.
- **Do** keep the light theme as warm paper, not pure white, and darken the green to #00733a for AA.

### Don't:
- **Don't** add shadows, glass, gradients, or blurred halos to the product UI.
- **Don't** round cards or buttons; the square edge is the identity.
- **Don't** introduce a second typeface for "editorial" contrast.
- **Don't** use phosphor green for long body copy.
- **Don't** animate opacity on text that carries information; animate transform only.
- **Don't** fabricate metrics, logos, testimonials, or client names to fill a layout.
