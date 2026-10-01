# Arcstone Frontend: Design Evolution & Engineering Improvement Plan

> **Governing Principle:**  
> **The design can change. The Arcstone design philosophy cannot.**  
> The existing Arcstone frontend defines the core design philosophy and visual system. The implementation may evolve where there is a clear UX, structural, responsive, communication, or maintainability benefit. New or changed elements must remain coherent with Arcstone's established visual language: premium, restrained, institutional, dark navy/near-black environments, subtle cool lavender accents, thin linework, and clean geometric composition. Evolve Arcstone without losing Arcstone.

---

## 1. Architectural & Design Foundations

### 1.1 The Five Pillars of Design Governance

| Concept | Definition & Authority |
| :--- | :--- |
| **DESIGN PHILOSOPHY** | **Immutable.** Must remain stable. Governs typography hierarchy, color language, contrast rules, border precision, restrained motion, and institutional private-markets tone. |
| **CURRENT DESIGN** | **Evolvable.** May change where existing layouts are weak, underdeveloped, or fail on responsive screens. Section composition, diagrams, cards, tables, and workflows can be reimagined to improve clarity. |
| **HISTORICAL REFERENCE** | **Design-Language Anchor.** Housed in `/reference/arcstone-standalone.html`. Serves as an immutable touchstone for extracting authentic visual grammar and verifying that changes don't accidentally drift. |
| **APPROVED DESIGN CHANGE** | **Intentional Progression.** A deliberate, well-crafted improvement that clearly derives from Arcstone's visual grammar, solves a genuine UX or communication weakness, and updates regression baselines. |
| **ACCIDENTAL DESIGN DRIFT** | **Defect to Prevent.** Unintended visual discrepancies, broken layouts, horizontal overflow, missing CSS classes, or generic third-party SaaS styling that dilutes brand identity. |

---

### 1.2 Arcstone Visual Grammar & Design Philosophy

Any new component, redesigned section, or modified interaction must adhere to these established aesthetic criteria:
1. **Restrained, Institutional Color Palette:**
   - Primary dark canvas: `#08071a` (deep space navy), `#05080f` (near-black background), `#0b0914` (dark container background).
   - Light canvas: `#ffffff`, off-white cards with `#e2e8f0` and `#f1f5f9` subtle borders.
   - Accents: Cool lavender (`rgba(177, 161, 237, ...)`), subtle violet glow, and muted status indicators (emerald `#10b981`, amber `#f59e0b`).
   - Anti-pattern: No neon gradients, no arbitrary rainbow color accents, no generic purple SaaS tropes.
2. **Precision Linework & Structural Borders:**
   - 1px crisp borders (`#1e1a2e`, `#2d2744`, or `#e2e8f0`).
   - High-contrast geometric division rather than heavy drop shadows.
   - Deliberate, mathematically balanced grid structures (2-column, 3-column, structured tables).
3. **Typography & Hierarchy:**
   - Font family: **Plus Jakarta Sans** with clean letter-spacing (`-0.03em` on titles).
   - Large hero titles (`clamp(40px, 5.5vw, 72px)`) balanced with generous line heights (1.1 to 1.25).
   - Small uppercase eyebrows / section subtitles with wide tracking (`0.08em` to `0.12em`).
4. **Motion & Feedback:**
   - Subtle ease-in-out transitions (`0.2s` to `0.3s`).
   - Smooth backdrop blurs (`backdrop-filter: blur(10px)`).
   - No distracting bouncy animations, parallax jitter, or over-the-top particle effects.
5. **Authentic Financial Tone:**
   - The platform serves private company founders, VC/PE investors, and corporate operators.
   - Content presentation should emphasize accuracy, security, legal rights, cap table truth, and investor clarity.

---

## 2. Current Repository State & Inventory

### 2.1 Technology Stack
- **Framework & Language:** React 18.3.1 with TypeScript 5.5.3.
- **Build Tooling:** Vite 5.4.2 configured with `@vitejs/plugin-react` and path aliases (`@/*` -> `./src/*`).
- **Routing:** React Router DOM 6.26.1 with SPA history routing and global click delegation (`window.navigateTo` & internal anchor interception) for embedded Webflow templates.
- **Styling Architecture:** Single compiled stylesheet (`src/styles/app.css`, 642 KB) containing base Webflow classes, Plus Jakarta Sans embedded WOFF2 fonts, dark mode variables (`body.dark-mode`), responsive media queries, and component styles.
- **Testing & Quality Assurance:**
  - ESLint with TypeScript and React Hooks plugins (`npm run lint`).
  - Playwright multi-viewport test suite across 7 viewports (1440, 1280, 1024, 768, 430, 390, 375px) in `tests/functional-responsive.spec.ts`.
  - True screenshot visual comparison testing in `tests/screenshots.spec.ts` using `toHaveScreenshot()`.
  - Automated CI validation via GitHub Actions (`.github/workflows/ci.yml`).

### 2.2 Route Map & Status

| Route | Page Component | Hero Style | Integration Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `Home.tsx` | Light Header | Production Active | Dynamic comparison grid with `IntersectionObserver` |
| `/platform` | `Platform.tsx` | Subpage Dark Video | Production Active | High-level platform architecture |
| `/start-ups` | `StartUps.tsx` | Subpage Dark Video | Production Active | Founder & startup ownership solutions |
| `/private-firms` | `PrivateFirms.tsx` | Subpage Dark Video | Production Active | Institutional private company solutions |
| `/raise-capital` | `RaiseCapital.tsx` | Subpage Dark Video | Production Active | Capital formation & onboarding workflows |
| `/manage-ownership`| `ManageOwnership.tsx` | Subpage Dark Video | Production Active | Cap table management & participation rights |
| `/manage-distributions`| `ManageDistributions.tsx` | Subpage Dark Video | Production Active | Waterfall & lifecycle governance |
| `/administer-investors`| `AdministerInvestors.tsx` | Subpage Dark Video | Production Active | Investor portal & compliance onboarding |
| `/about-us` | `AboutUs.tsx` | Subpage Dark Video | Production Active | Mission, team, advisory & values |
| `/careers` | `Careers.tsx` | Subpage Dark Video | Production Active | Open roles & culture |
| `/contact` | `Contact.tsx` | Legal Dark Video | Front-End Mock | Brussels hub info & categorized inquiry form |
| `/waitlist` | `Waitlist.tsx` | Legal Dark Video | Front-End Mock | 3-step booking wizard with timezone calendar |
| `/privacy-policy` | `PrivacyPolicy.tsx` | Shared `LegalHero` | Production Active | Data protection & demo inquiry privacy terms |
| `/terms-and-conditions`| `TermsAndConditions.tsx`| Shared `LegalHero` | Production Active | Terms of service & legal notices |
| `/cookie-policy` | `CookiePolicy.tsx` | Shared `LegalHero` | Production Active | Audit table & interactive preference trigger |
| `/legal-and-regulatory`| `LegalRegulatory.tsx` | Shared `LegalHero` | Production Active | Regulatory framework disclosures |

---

## 3. Finding Categorization & Resolution Status

### 3.1 Genuinely Unresolved Issues
1. **Navbar Dark Hero Route Desynchronization:**
   - *Status:* In progress / resolving in Batch 2.
   - *Issue:* `Navbar.tsx` previously hardcoded only 4 routes (`/contact`, `/waitlist`, `/privacy-policy`, `/terms-and-conditions`). `/cookie-policy` and `/legal-and-regulatory` were missing, causing dark-on-dark text legibility failure before scroll.
   - *Resolution:* Implement comprehensive route set + dynamic DOM verification (`[data-hero="dark"]`, `.legal-page-hero`).
2. **Missing True Screenshot Regression Testing:**
   - *Status:* In progress / resolving in Batch 2.
   - *Issue:* Previous tests only verified functional DOM presence and overflow, not actual visual rendering.
   - *Resolution:* Add `tests/screenshots.spec.ts` using Playwright `toHaveScreenshot()` across 8 key surfaces and shared components with deterministic video freezing and font loading gates.
3. **CI Pipeline Coverage Gap:**
   - *Status:* In progress / resolving in Batch 2.
   - *Issue:* CI only ran `npm run build`, omitting `npm run lint` and automated Playwright tests.
   - *Resolution:* Configure GitHub Actions to execute linting, typecheck, build, and responsive/functional tests on every push.

### 3.2 Completed Technical Fixes (Preserved & Verified)
1. **Linting Tooling:** Fully operational (`eslint`, TypeScript parser, React hooks rules) with 0 errors, 0 warnings.
2. **Asset Resolution:** Direct `/og-image.png` and `/Logo.png` references copied and served from root public directory.
3. **Structured Data:** Redundant static JSON-LD in `index.html` eliminated; single dynamic `#arcstone-jsonld` graph in `SeoUpdater.tsx`.
4. **Social Meta Tags:** OpenGraph and Twitter title/description tags synchronized dynamically in `SeoUpdater.tsx`.
5. **Semantic Landmarks:** Converted `<section className="footer">` to semantic HTML5 `<footer className="footer">`.
6. **Navigation A11y:** Dynamic `aria-current="page"`, `aria-expanded`, `aria-haspopup`, and `aria-label="Main"` applied.
7. **Video Media Optimization:** `preload="metadata"` and poster images added to all legal background videos.

### 3.3 Front-End Mock / Backend Later (Not Defects)
- Demo Booking Form & Calendar confirmation (`Waitlist.tsx`).
- Categorized Contact Form submission (`Contact.tsx`).
- Newsletter signup toast (`Footer.tsx`).
- Client-side Cookie Consent persistence in localStorage/cookies (`ConsentContext.tsx`).

### 3.4 Content Observations (Authoritative Hold)
- Brussels address: "Rue de la Science 23, 1000 Brussels".
- Brand watermark: "Manage Reality".
- Accelerator badge: "Start it @KBC".
- Contact emails: `info@arcstone.one` and `legal@arcstone.io`.

---

## 4. Phased Evolution Roadmap

```
Phase 0: Anchor Reference ─────────► Phase 1: Tooling & Assets
                                             │
                                             ▼
Phase 3: Shared UI Consistency ◄──── Phase 2: True Screenshot Testing
        │
        ▼
Phase 4: Componentization ─────────► Phase 5: Layout & Product Experience
                                             │
                                             ▼
Phase 7: Content Specification ◄──── Phase 6: Performance & Loading
```

### Phase 0 — Anchor the Visual Reference (COMPLETED)
- Preserved `/reference/arcstone-standalone.html` as the immutable design-language anchor.
- Excluded reference directory from Vite production build bundles.

### Phase 1 — Tooling & Infrastructure Repair (COMPLETED)
- Configured ESLint + TypeScript integration.
- Fixed root OpenGraph and Logo asset URLs.
- Zero-warning clean build and lint validation.

### Phase 2 — True Visual Regression Testing (BATCH 2)
- Created `tests/screenshots.spec.ts` with Playwright `toHaveScreenshot()` across 8 core surfaces (Home, Platform, Raise Capital, Manage Ownership, Administer Investors, Contact, Waitlist, About Us).
- Configured state snapshots for Desktop Navbar, Dropdown, Mobile Drawer, Dark Mode, Footer, and Cookie Consent.
- Captured initial golden baselines with deterministic video pausing.
- Renamed functional suite to `tests/functional-responsive.spec.ts`.

### Phase 3 — Shared Component Consistency & CI Hardening (BATCH 2)
- Harmonized dark hero navbar state across all 6 dark hero pages (`/contact`, `/waitlist`, `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, `/legal-and-regulatory`).
- Implemented dynamic DOM selector fallback (`[data-hero="dark"]`).
- Upgraded `.github/workflows/ci.yml` to run lint, build, and automated test execution.

### Phase 4 — Controlled Componentization (BATCH 2)
- Created shared `src/components/LegalHero.tsx` component unifying video background, poster, scrim, and typography.
- Refactored all 4 legal pages to consume `LegalHero.tsx`.
- Standardized legal body layout, typography hierarchy, and institutional contact cards.

### Phase 5 — Product Experience & Section Evolution (NEXT BATCH)
- Re-architect subpage product workflow diagrams (Raise Capital, Manage Ownership, Administer Investors) to improve explanatory clarity.
- Design interactive cap table / participation waterfall preview card.
- Improve tablet collapsing behavior for comparison grids and stats bands.

### Phase 6 — Performance & Asset Optimization (ONGOING)
- Convert large static PNG assets to modern WebP with fallbacks.
- Audit `/public/wf/` for demonstrably unreferenced legacy assets.

### Phase 7 — Product Copy & Positioning (DEFERRED)
- Retain all current customer-facing text until an authoritative content specification is delivered.

---

## 5. Visual Regression & Baseline Update Protocol

1. **When to run visual screenshot tests:**
   - Locally before any commit touching styles or layouts (`npm run test:visual`).
   - Automatically in CI on pull requests.
2. **Acceptable visual differences:**
   - Zero tolerance for unintended drift, font clipping, border collapse, or unexpected color shifts.
   - Intended design evolutions (e.g. improved component hierarchy) must be reviewed, verified across viewports, and updated via `npm run test:visual:update`.
3. **Flake Prevention:**
   - Background videos must be paused at `currentTime = 0`.
   - Animations disabled during screenshot comparison (`animations: 'disabled'`).
   - Custom fonts awaited prior to snapshot capture.
