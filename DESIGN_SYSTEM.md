# Arcstone Design System Specification

> **Version**: 1.0.0  
> **Authority**: Core Platform Brand & Frontend Architecture Standard  
> **Status**: Active & Enforced  

---

## 1. Design Philosophy & Emotional Character

Arcstone is private-market financial infrastructure designed with the **precision of an institutional terminal** and the **restraint of a premium European technology company**.

It is NOT:
- A generic AI startup (no floating pastel blobs, neon gradients, or vague promises)
- A crypto/Web3 protocol (no cyberpunk aesthetics, tokenomics widgets, or neon glow)
- A consumer fintech app (no bubbly shapes, oversized playful radiuses, or gamified animations)
- A generic Webflow SaaS template (no interchangeable feature-icon grids or generic stock photos)
- A legacy corporate bank portal (no rigid, bloated enterprise clutter or stale styling)

### Emotional Characteristics
| Principle | Definition | In Practice |
| :--- | :--- | :--- |
| **Precise** | Absolute geometric order, exact mathematical alignment | Crisp 1px structural borders, 90-degree alignment, structured grids |
| **Controlled** | Deliberate restraint over decoration | Minimalist palette, quiet accents, generous negative space |
| **Intelligent** | Information density with immediate clarity | Financial ledger tables, clean data hierarchies, state indicators |
| **Institutional** | Authoritative, reliable, serious financial gravity | Deep navy-black environments, structured metadata, neutral typography |
| **Quietly Technological** | Advanced infrastructure that speaks through execution | High-contrast monospace data, real-time reactive calculations, subtle motion |
| **Deliberate** | Every pixel and token serves legibility and confidence | Zero decorative fluff, zero emoji, zero unverified buzzwords |

---

## 2. Color System

Arcstone's palette is grounded in a deep navy-black atmospheric environment with a cool lavender / violet-blue accent language.

### 2.1 Dark Environment (Primary Terminal / Dark Mode)
The dark environment is **NOT literal `#000000`**. It possesses a deep blue-violet undertone that conveys depth and calm authority.

```css
:root {
  /* Dark Environment Canvas */
  --as-color-dark-canvas:       #05080f; /* Deepest near-black base background */
  --as-color-dark-surface-1:    #08071a; /* Primary section / canvas navy */
  --as-color-dark-surface-2:    #0a0e1c; /* Standard card & container surface */
  --as-color-dark-surface-3:    #0e0d24; /* Elevated interactive module surface */
  --as-color-dark-surface-4:    #161320; /* High-level popover / secondary elevated */

  /* Dark Environment Structural Borders */
  --as-color-dark-border-subtle:#1e1a2e; /* 1px structural grid border */
  --as-color-dark-border-card:  rgba(255, 255, 255, 0.08); /* Crisp card border */
  --as-color-dark-border-hover: rgba(255, 255, 255, 0.16); /* Interactive focus/hover */
  --as-color-dark-border-accent:rgba(129, 140, 248, 0.35); /* Subtle lavender border accent */

  /* Dark Environment Typography */
  --as-color-dark-text-primary:  #ffffff; /* Main headings and high-priority figures */
  --as-color-dark-text-secondary:#94a3b8; /* Explanatory body text and section intros */
  --as-color-dark-text-muted:    #64748b; /* Metadata, column headers, footnotes */
  --as-color-dark-text-faint:    #475569; /* Inactive labels, disabled indicators */
}
```

### 2.2 Light Environment (Editorial / Light Mode)
Light mode retains Arcstone's architectural sharpness, using slate and off-white rather than harsh white/grey contrasts.

```css
:root {
  /* Light Environment Canvas */
  --as-color-light-canvas:       #ffffff; /* Editorial clean page background */
  --as-color-light-surface-1:    #f8fafc; /* Subtle contrasting card/panel background */
  --as-color-light-surface-2:    #f1f5f9; /* Inset controls, table header strip */
  --as-color-light-surface-3:    #e2e8f0; /* Elevated toggle track, divider fill */

  /* Light Environment Structural Borders */
  --as-color-light-border:       #e2e8f0; /* 1px standard card / table border */
  --as-color-light-border-subtle:#f1f5f9; /* Table row divider */
  --as-color-light-border-hover: #cbd5e1; /* Interactive focus border */

  /* Light Environment Typography */
  --as-color-light-text-primary:  #0f172a; /* Slate 900 primary titles and content */
  --as-color-light-text-secondary:#475569; /* Slate 600 body copy and subheads */
  --as-color-light-text-muted:    #64748b; /* Slate 500 metadata and labels */
  --as-color-light-text-faint:    #94a3b8; /* Slate 400 placeholder text */
}
```

### 2.3 Primary Accent Family (Cool Lavender & Violet-Blue)
The accent family communicates intelligent technology and institutional restraint. It replaces generic SaaS electric indigo (`#4f46e5`) as the universal color.

```css
:root {
  --as-accent-lavender:         #b1a1ed; /* Core Arcstone lavender accent */
  --as-accent-lavender-subtle:  #c7d2fe; /* Light metadata, chip highlights */
  --as-accent-violet:           #818cf8; /* High-confidence interactive elements */
  --as-accent-indigo:           #6366f1; /* Focused button fills & primary CTAs */
  --as-accent-glow:             rgba(177, 161, 237, 0.15); /* Ambient focus glow */
  --as-accent-surface:          rgba(99, 102, 241, 0.08);  /* Pill/badge surface */
  --as-accent-border:           rgba(99, 102, 241, 0.25);  /* Pill/badge border */
}
```

### 2.4 Semantic State Colors (Strict Non-Decorative Usage)
Semantic colors are reserved **strictly for status, reconciliation, risk, and operational states**. They must NEVER be used as decorative background gradients or random card themes.

```css
:root {
  /* Success / Verified / Reconciled */
  --as-semantic-success-text:    #4ade80; /* Dark mode active status */
  --as-semantic-success-text-lt: #15803d; /* Light mode active status */
  --as-semantic-success-bg:      rgba(34, 197, 94, 0.12);
  --as-semantic-success-border:  rgba(34, 197, 94, 0.28);

  /* Warning / Pending / Needs Action */
  --as-semantic-warning-text:    #fbbf24; /* Dark mode alert */
  --as-semantic-warning-text-lt: #b45309; /* Light mode alert */
  --as-semantic-warning-bg:      rgba(245, 158, 11, 0.12);
  --as-semantic-warning-border:  rgba(245, 158, 11, 0.28);

  /* Danger / Unlinked / Error */
  --as-semantic-danger-text:     #f87171; /* Dark mode error */
  --as-semantic-danger-text-lt:  #b91c1c; /* Light mode error */
  --as-semantic-danger-bg:       rgba(239, 68, 68, 0.10);
  --as-semantic-danger-border:   rgba(239, 68, 68, 0.25);

  /* Informational / In Vesting */
  --as-semantic-info-text:       #38bdf8; /* Dark mode info */
  --as-semantic-info-text-lt:    #0369a1; /* Light mode info */
  --as-semantic-info-bg:         rgba(56, 189, 248, 0.10);
  --as-semantic-info-border:     rgba(56, 189, 248, 0.25);
}
```

---

## 3. Atmospheric Gradients & Surface Treatment

### Principles:
1. **Atmospheric, not decorative**: Gradients simulate diffuse illumination entering a dark navy room, never an iridescent candy rainbow.
2. **Low-contrast ramps**: Linear gradients between `#0e0d24` and `#080718` create subtle surface elevation.
3. **No saturated multi-color ramps**: Forbid cyan-to-pink, orange-to-purple, or neon green ramps.

### Approved Gradients:
```css
/* Dark Surface Card Elevation */
background: linear-gradient(145deg, #0e0d24 0%, #080718 100%);

/* Interactive Hero Panel */
background: linear-gradient(180deg, #08071a 0%, #05080f 100%);

/* Ambient Diffuse Background Glow (Behind Heroes) */
background: radial-gradient(ellipse 70% 60% at 50% -10%, rgba(99, 102, 241, 0.18) 0%, transparent 80%);

/* High-Focus CTA Banner (Refined Arcstone Navy/Violet) */
background: linear-gradient(155deg, #0c0b24 0%, #07091a 60%, #05080f 100%);
```

---

## 4. Geometry, Radii & Border Scale

Arcstone adheres to **90-degree mathematical alignment**. Containers and modules snap to a clean grid. Cards are never tilted, skewed, or randomly rotated.

### Corner Radius Scale:
| Radius | Purpose | Allowed Component Usage |
| :--- | :--- | :--- |
| **0px** | Terminal sharpness | Raw table dividers, vertical ledger bars, code snippets |
| **4px** | Micro indicators | Status pills, table badges, keyboard shortcuts, tags |
| **8px** | Technical controls | Filter buttons, table action triggers, input insets |
| **10px** | Form inputs & items | Form inputs, select dropdowns, inner sub-cards |
| **12px** | **STANDARD ARCSTONE SURFACE** | Standard cards, feature blocks, form containers, table wrappers |
| **14px - 16px** | Major modules | Main platform views, modal dialogs, interactive inspection engine |
| **20px - 24px** | Hero containers only | The primary interactive Platform Explorer hero object |
| **999px** | Pills only | System status pills (`ACTIVE`, `VERIFIED`), radio dot markers |

### Border Scale:
- **Default weight**: `1px` crisp structural line.
- **Dark mode standard**: `border: 1px solid rgba(255, 255, 255, 0.08);`
- **Dark mode grid divider**: `border: 1px solid #1e1a2e;`
- **Light mode standard**: `border: 1px solid #e2e8f0;`
- **Active / Focused border**: `border: 1px solid rgba(129, 140, 248, 0.5);`

### Shadows & Elevation:
Arcstone relies on **border separation and tonal contrast rather than heavy black box-shadows**.
- **Forbidden**: `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);` (excessive SaaS shadow)
- **Approved Card Elevation**:
  ```css
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  ```
- **Approved Hover Elevation**:
  ```css
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  transform: translateY(-2px);
  ```
- **Approved Inset Glow (Interactive Modules)**:
  ```css
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 12px 32px rgba(0, 0, 0, 0.35);
  ```

---

## 5. Typography Hierarchy

Arcstone uses **Plus Jakarta Sans** as its primary typeface across all viewports. Monospace typography is used selectively for numerical data, identifiers, dates, and instrument codes.

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | 56px – 72px | 34px – 42px | 500 / 600 | 1.08 – 1.12 | `-0.03em` | Primary page headline |
| **Section Title (H2)** | 32px – 44px | 24px – 28px | 500 / 600 | 1.18 – 1.22 | `-0.025em` | Major section header |
| **Module Title (H3)** | 20px – 24px | 18px – 20px | 600 | 1.30 – 1.35 | `-0.015em` | Card header, sub-feature |
| **Subhead / Lead** | 18px – 20px | 16px | 400 | 1.60 | `-0.01em` | Section introductory text |
| **Body Primary** | 15px – 16px | 14.5px | 400 | 1.65 | `0` | Standard descriptive copy |
| **Body Secondary** | 13.5px – 14.5px | 13px | 400 | 1.55 | `0` | Technical metadata, details |
| **Eyebrow / Subtitle** | 11px – 12px | 11px | 600 / 700 | 1.40 | `+0.10em` | Uppercase category marker |
| **Monospace / Data** | 12px – 14px | 11px – 12px | 500 | 1.45 | `0` | Shares, percentages, IDs |

---

## 6. Spacing Scale & Layout Rhythm

Arcstone spacing is built on a mathematical 4px/8px modular rhythm:
`4px` · `8px` · `12px` · `16px` · `24px` · `32px` · `40px` · `48px` · `64px` · `80px` · `96px` · `120px`

- **Section vertical padding**: `80px` – `120px` (desktop), `48px` – `64px` (mobile).
- **Major container gap**: `32px` – `48px`.
- **Card internal padding**: `24px` – `32px` (desktop), `20px` – `24px` (mobile).
- **Form input padding**: `11px 16px`.
- **Button padding**: `12px 24px` (standard), `10px 18px` (compact).

---

## 7. Component Specifications

### 7.1 Buttons
Buttons must feel authoritative and weighted. No pill buttons for primary actions unless specifically designated as early access or badge filters.

1. **Primary Button (`.btn-arcstone-primary`)**:
   - Background: `#6366f1` (hover `#4f46e5`)
   - Text: `#ffffff`, 14.5px, weight 600
   - Border radius: `10px`
   - Padding: `12px 24px`
   - Border: `1px solid rgba(255, 255, 255, 0.15)`
   - Shadow: `0 2px 8px rgba(99, 102, 241, 0.25)`

2. **Outline / Ghost Button (`.btn-arcstone-ghost`)**:
   - Background: `rgba(255, 255, 255, 0.04)` (hover `rgba(255, 255, 255, 0.08)`)
   - Text: `#ffffff`, 14.5px, weight 500
   - Border radius: `10px`
   - Border: `1px solid rgba(255, 255, 255, 0.12)`

3. **Subtle Pill CTA (`.btn-arcstone-pill`)**:
   - Background: `rgba(129, 140, 248, 0.12)` (hover `rgba(129, 140, 248, 0.20)`)
   - Text: `#c7d2fe`, 14px, weight 600
   - Border radius: `999px`
   - Border: `1px solid rgba(129, 140, 248, 0.35)`

### 7.2 Cards & Modules
1. **Standard Data Card**:
   - Surface: `#0a0e1c` or `linear-gradient(145deg, #0e0d24, #080718)`
   - Border: `1px solid rgba(255, 255, 255, 0.08)`
   - Radius: `12px` (Major interactive module: `14px` or `16px`)
   - Padding: `24px` to `32px`
   - Shadow: `0 4px 20px rgba(0, 0, 0, 0.25)`

2. **Table Container**:
   - Header: `11px` uppercase slate-muted, tracking `0.08em`
   - Divider: `1px solid rgba(255, 255, 255, 0.06)`
   - Numeric Data: Aligned right, monospace font, crisp white
   - Status Badge: 4px radius pill, 11px weight 600

### 7.3 Forms & Inputs
1. **Inputs & Selects**:
   - Background: `#0e0d24` (dark) or `#ffffff` (light)
   - Border: `1.5px solid #1e1a2e` (dark) or `1.5px solid #e2e8f0` (light)
   - Radius: `10px`
   - Focus: `border-color: #818cf8; outline: none; box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.15);`

### 7.4 Iconography
1. **Stroke**: Uniform `1.5px` to `2.0px` stroke line icons.
2. **Size**: `14px`, `16px`, `20px`, `24px` based on context.
3. **Color**: Monochrome (`#94a3b8`, `#ffffff`) or accent-tinted (`#818cf8`, `#b1a1ed`).
4. **STRICT PROHIBITION**: **Zero emoji**. No `📅`, `🗓️`, `✉️`, `🚀`, `✨`, or cartoon symbols anywhere in UI components. Use geometric SVG icons.

---

## 8. Anti-Patterns & Prohibited Patterns

| Anti-Pattern | Why It Is Prohibited | Approved Arcstone Replacement |
| :--- | :--- | :--- |
| **Emoji UI** (`🗓️`, `✉️`) | Childish, non-institutional | Clean SVG line icons (`<svg viewBox="0 0 24 24">`) |
| **Neon Cyan / Teal Gradients** | Drifts into generic crypto / AI SaaS | Deep navy base with cool lavender (`#b1a1ed`, `#818cf8`) |
| **Heavy Black Box-Shadows** (`0 16px 40px rgba(0,0,0,0.4)`) | Bloated, muddies dark background | 1px border separation + subtle glow (`0 4px 20px rgba(0,0,0,0.25)`) |
| **Large Arbitrary Radii** (`30px`, `40px`) | Distorts geometry, looks amateurish | Standard Arcstone radius: `12px` (standard) / `14-16px` (major) |
| **Excessive `#4f46e5` Blanket Usage** | Generic SaaS template signature | Muted lavender (`#b1a1ed`) and controlled violet-blue (`#818cf8`) |
| **Unverified Regulatory Claims** (`ISO-20022 / MiFID II ALIGNED`) | Legal and regulatory safety violation | Descriptive neutral wording: `STRUCTURED RECORD FORMAT` |
| **Arbitrary Inline Styles** | Fragmented styling, unmaintainable | Reusable Arcstone design system CSS classes |

---

## 9. System Utility Classes

The following CSS classes are standard and exported in `src/styles/arcstone-tokens.css`:

- `.as-card`: Standard Arcstone 12px surface with 1px border.
- `.as-card-elevated`: 14px major module surface with diffuse gradient.
- `.as-card-hero`: 20px hero interactive module surface.
- `.as-badge-success`: Reconciled / verified state pill.
- `.as-badge-warning`: Pending / action required pill.
- `.as-badge-info`: Structural informational pill.
- `.as-btn-primary`: Authoritative 10px violet interactive CTA.
- `.as-btn-ghost`: Bordered secondary action button.
- `.as-input`: Consistent 10px input field with focus ring.
- `.as-mono`: Monospace numerical and metadata font styling.
