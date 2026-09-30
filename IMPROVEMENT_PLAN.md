# Arcstone Frontend: Rigorous Implementation & Visual Preservation Plan

> **Governing Standard:**  
> *Same website visually. Better implementation underneath.*  
> The current rendered frontend is the authoritative design source of truth. Architectural elegance is secondary to strict visual preservation. Under no circumstances should the design, typography, spacing, colors, animations, or responsive behavior be reinterpreted or modernized based on subjective preferences.

---

## 1. Current Repository & Architectural State

### 1.1 Architecture Overview
The Arcstone frontend is a modern single-page application (SPA) built with:
- **Framework & Language:** React 18.3.1 with TypeScript 5.5.3.
- **Build Tooling:** Vite 5.4.2 configured with `@vitejs/plugin-react` and path aliases (`@/*` -> `./src/*`).
- **Routing:** React Router DOM 6.26.1 with client-side history routing and global click delegation (`window.navigateTo` & internal anchor interception) for embedded Webflow templates.
- **Styling Architecture:** Single compiled Webflow-derived stylesheet (`src/styles/app.css`, 642 KB) containing base styles, Webflow class definitions, layout grids, embedded WOFF2 font declarations (Plus Jakarta Sans), dark mode overrides (`body.dark-mode ...`), and custom component classes.
- **Page Template System:** Hybrid approach:
  - Complex marketing sections are preserved with 100% pixel fidelity via static HTML template extracts (`src/pages/templates/*.html?raw`) rendered through `dangerouslySetInnerHTML`.
  - Interactive sections (forms, wizards, interactive comparison tables, steppers) are native React components integrated into the page layouts.
- **State & Theme Management:**
  - `ThemeContext.tsx`: Manages light/dark themes, synchronizes `theme` cookie/localStorage, and toggles `body.dark-mode`.
  - `ConsentContext.tsx`: Implements GDPR-compliant Google Consent Mode v2, granular cookie category choices (Necessary, Analytics, Marketing), 180-day TTL cookie/localStorage persistence, and `window.dataLayer` synchronization.
- **Asset Pipeline:**
  - Original Webflow media and vector graphics are housed in `/public/wf/` (111 items including video transcode mp4/webm, lottie/json, svgs, and images).
  - Favicons and site metadata are located in `/public/`.

### 1.2 Route Structure & Mapping
All primary Arcstone routes are fully active and mapped in `src/App.tsx`:
- **Core Marketing:**
  - `/` -> `Home.tsx` (includes dynamic comparison grid `#cmp-grid-wrap`)
  - `/platform` -> `Platform.tsx` (full infrastructure overview)
  - `/start-ups` -> `StartUps.tsx` (founder cap table & raise solutions)
  - `/private-firms` -> `PrivateFirms.tsx` (profit-share & structured financing)
  - `/raise-capital` -> `RaiseCapital.tsx` (structured participation workflows)
  - `/manage-ownership` -> `ManageOwnership.tsx` (live cap table source of truth)
  - `/manage-distributions` -> `ManageDistributions.tsx` (lifecycle governance & waterfalls)
  - `/administer-investors` -> `AdministerInvestors.tsx` (onboarding & investor portal)
  - `/about-us` -> `AboutUs.tsx` (mission, team & story)
  - `/careers` -> `Careers.tsx` (open roles & culture)
- **Interactive Conversion & Inquiries:**
  - `/contact` -> `Contact.tsx` (Brussels hub details & categorized inquiry form)
  - `/waitlist` -> `Waitlist.tsx` (3-step demo booking wizard with calendar & confirmation)
- **Legal & Compliance:**
  - `/privacy-policy` -> `PrivacyPolicy.tsx` (data retention, waitlist data & rights)
  - `/terms-and-conditions` -> `TermsAndConditions.tsx` (terms & legal notices)
  - `/cookie-policy` -> `CookiePolicy.tsx` (cookie audit table & interactive settings trigger)
  - `/legal-and-regulatory` -> `LegalRegulatory.tsx` (regulatory disclosures)
- **Legacy Redirects:**
  - `/early-access` -> `/waitlist`
  - `/issue-digitally`, `/token-layer`, `/full-ownership` -> `/platform`
  - `/equity-management` -> `/manage-ownership`
  - `/investor-workflows`, `/for-investors` -> `/administer-investors`
  - `/lifecycle-admin` -> `/manage-distributions`
  - `/for-founders` -> `/start-ups`
  - `/for-operators` -> `/platform`

### 1.3 Completed Restoration Work (Do Not Repeat)
The following work has been fully implemented, verified, and committed (`main` branch):
1. **Webflow Execution Signaling:** Injected the canonical Webflow `w-mod-js` script into `<head>` of `index.html`.
2. **SPA Link Delegation:** Implemented internal link interception in `src/main.tsx` to prevent full page reloads when users click links inside embedded HTML templates.
3. **Exact Navbar Restoration:** Rebuilt `src/components/Navbar.tsx` with authentic `#custom-navbar` container, dynamic scroll tracking (`scrolled`, `nav-hidden`), dark hero route detection (`is-on-dark-hero`), exact 2-column Solutions dropdown panel (`cols-2`, 580px width, SVG icons, and bottom `/platform` banner), theme toggle, and mobile hamburger drawer.
4. **Exact Footer Restoration:** Rebuilt `src/components/Footer.tsx` matching Webflow container, newsletter subscription form, full 8-link footer menu, theme-aware Start it @KBC badge, and the brand watermark `<div className="footer-huge-text">Manage Reality</div>`.
5. **Cookie Consent System:** Implemented authentic banner and modal in `src/components/CookieConsent.tsx` with category switches and 180-day persistence.
6. **Verified Legal Pages:** Restored authentic legal copy, gradient video heroes, highlight boxes, and full cookie disclosure tables in `PrivacyPolicy.tsx`, `TermsAndConditions.tsx`, `CookiePolicy.tsx`, and `LegalRegulatory.tsx`.
7. **Interactive Comparison Table:** Restored the dynamic comparison grid builder and `IntersectionObserver` reveal trigger in `src/pages/Home.tsx`.
8. **Contact & Waitlist Conversion Workflows:** Restored Brussels office layout in `Contact.tsx` and the full 3-step booking wizard with calendar slot selection in `Waitlist.tsx`.
9. **Dynamic SEO & Metadata:** Built `src/components/SeoUpdater.tsx` providing route-aware document titles, descriptions, canonical links, and JSON-LD schemas (Organization, WebSite, Breadcrumbs, FAQPage).

---

## 2. Visual Preservation Strategy

To guarantee zero unintended visual drift, the following preservation protocols must govern all ongoing work.

### 2.1 Immutable Visual Reference Preservation
- **Location:** The complete standalone single-file bundle (`arcstone-standalone.html`, 23.4 MB) contains the exact visual ground truth, inlined styles, fonts, and assets.
- **Reference Repository Rule:** A clean, unminified snapshot must be preserved under `/reference/arcstone-standalone.html`.
- **Isolation Mandate:**
  - Must be explicitly excluded from production builds in `vite.config.ts`.
  - Must never be served as a public route.
  - Must remain strictly read-only and immutable.
  - Serves as the visual reference against which all components are audited.

### 2.2 Multi-Viewport Visual Baseline Testing Matrix
No layout or CSS changes may be committed without auditing across standard responsive viewports:

| Category | Viewport Width | Typical Target Device | Focus Areas |
| :--- | :--- | :--- | :--- |
| **Desktop Large** | `1440px` | Large Desktop / iMac | Max-container constraints, grid alignment, mega-panel spacing |
| **Desktop Standard**| `1280px` | MacBook Pro / Laptop | Navbar density, card proportions, video hero aspect ratios |
| **Tablet Landscape**| `1024px` | iPad Pro / Small Laptop | Navigation collapsing threshold, comparison table horizontal fit |
| **Tablet Portrait** | `768px` | iPad / Tablet | 2-column to 1-column wrapping, form padding, button widths |
| **Mobile Large** | `430px` | iPhone 15/16 Pro Max | Stepper wrapping, touch targets, modal dialog boundaries |
| **Mobile Standard** | `390px` | iPhone 14/15/16 | Banner text wrapping, footer link stacking, calendar grid padding |
| **Mobile Compact** | `375px` | iPhone SE / Compact | Horizontal overflow check, badge scaling, typography legibility |

### 2.3 Component & State Inspection Checklist
In addition to full-page layouts, every shared component must be verified in all distinct states:
1. **Navbar:**
   - Default transparent state (top of page).
   - Scrolled state (`.scrolled` class with blurred backdrop and shadow).
   - Scroll-down hidden state (`.nav-hidden`).
   - Dark hero mode (`.is-on-dark-hero` on `/contact`, `/waitlist`, legal pages).
   - Solutions dropdown open (desktop hover / click).
   - Mobile hamburger drawer open (overlay and link stack).
2. **Footer:**
   - Light mode appearance (black KBC badge `/wf/KBCblack.png`).
   - Dark mode appearance (white KBC badge `/wf/KBCwhite.png`).
   - Newsletter input focus, loading, and simulated success receipt.
3. **Cookie Consent:**
   - Bottom banner initial appearance.
   - Preference modal open, category toggle states, backdrop blur.
4. **Interactive Controls:**
   - Button hover states (transition curves, color shifts).
   - Radio buttons and checkboxes in forms (`.wl-radio-active`).
   - Calendar date selection and slot selection highlight.

---

## 3. Finding Classification

All findings across the repository have been inspected and categorized according to the project's strict classification schema:

### 3.1 FRONTEND DEFECT
*Items that are genuinely broken or failing in the frontend implementation.*

1. **`npm run lint` Tooling Failure:**
   - *Issue:* `package.json` specifies `"lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"`, but `eslint` and its React/TypeScript plugins are not installed in `devDependencies`. Running `npm run lint` results in `sh: eslint: command not found` (exit code 127).
   - *Impact:* Prevents lint checking and CI verification.
   - *Visual Impact:* None (`VISUAL-SAFE`).

2. **Root Asset Reference Mismatch (`/og-image.png` & `/Logo.png`):**
   - *Issue:* `index.html` (lines 19, 25) and `SeoUpdater.tsx` reference `/og-image.png` and `/Logo.png` at the root path, but these files exist only at `/public/wf/og-image.png` and `/public/wf/Logo.png`.
   - *Impact:* External social media crawlers (LinkedIn, Twitter, OpenGraph) and browsers requesting `/og-image.png` or `/Logo.png` directly receive a 404 error.
   - *Visual Impact:* None on page render; resolves broken asset references for crawlers (`VISUAL-SAFE`).

---

### 3.2 FIDELITY RISK
*Aspects that could cause visual drift from the approved design if modified incorrectly.*

1. **Unversioned Source of Truth Reference:**
   - *Issue:* `arcstone-standalone.html` resides in the project root but is excluded via `.gitignore`. A single mistake or checkout could lose the visual source of truth.
   - *Remedy:* Place a protected copy in `/reference/arcstone-standalone.html` and document its non-production role.

2. **Absence of Automated Pixel Regression Testing:**
   - *Issue:* Modifying CSS rules or HTML template markup currently requires manual visual inspection without automated screenshot diffing.
   - *Remedy:* Establish an automated Playwright screenshot suite across the 7 required viewport widths.

3. **Monolithic HTML Template Injection:**
   - *Issue:* Pages like `Platform.tsx`, `RaiseCapital.tsx`, etc., inject large HTML strings via `dangerouslySetInnerHTML`.
   - *Caution:* Premature decomposition of these templates into React JSX creates significant risk of missing micro-classes, inline styles, or Webflow attributes. Any componentization must be done incrementally with screenshot diffing.

---

### 3.3 STRUCTURAL DEBT
*Code that works and preserves visual appearance, but is fragile or complex underneath.*

1. **Monolithic CSS Layer (`src/styles/app.css`):**
   - *Issue:* 642 KB compiled stylesheet combining Webflow layout grids, utility classes, typography, dark mode rules, and animations.
   - *Protocol:* **Strictly Protected.** Do NOT clean up, prune, or deduplicate globally. Only make isolated, verified adjustments.

2. **Template Redundancy in `src/pages/templates/`:**
   - *Issue:* 11 separate static HTML files containing thousands of lines of raw HTML.
   - *Protocol:* Retain until automated visual regression testing is active.

---

### 3.4 PERFORMANCE
*Opportunities to optimize loading and execution without visibly reducing presentation quality.*

1. **Hero Gradient Video Loading:**
   - *Observation:* Video files (`6491ab1c780fa954eb9a3f02_Gradient-transcode.mp4` / `.webm`, ~1.2 MB each) are loaded on all legal pages and the waitlist page.
   - *Audit:* Videos are properly set with `muted`, `playsinline`, `loop`, and `autoplay`, with correct poster images.
   - *Opportunity:* Add `preload="metadata"` to conserve mobile data while preserving instant playback.

2. **Asset Deduplication in `/public/wf/`:**
   - *Observation:* 111 Webflow assets exist in `/public/wf/`.
   - *Mandate:* Do NOT delete any file without absolute proof that no CSS class, template, or script references it.

---

### 3.5 ACCESSIBILITY
*Semantic and assistive improvements that remain completely visually neutral.*

1. **Navbar Dropdown ARIA State:**
   - *Issue:* The Solutions dropdown button in `Navbar.tsx` (line 82) toggles `solutionsOpen` state but lacks `aria-expanded={solutionsOpen}` and `aria-haspopup="true"`.
   - *Fix:* Add ARIA attributes to button (`VISUAL-SAFE`).

2. **Mobile Hamburger Toggle ARIA State:**
   - *Issue:* The mobile button in `Navbar.tsx` (line 283) has a static `aria-label="Open menu"` and lacks `aria-expanded={mobileMenuOpen}` and `aria-controls="custom-nav-menu"`.
   - *Fix:* Update dynamic label (`mobileMenuOpen ? 'Close menu' : 'Open menu'`) and `aria-expanded` (`VISUAL-SAFE`).

3. **Navigation Landmark Semantics:**
   - *Issue:* The `<nav>` element in `Navbar.tsx` (line 76) lacks an `aria-label="Main"`.
   - *Fix:* Add `aria-label="Main"` (`VISUAL-SAFE`).

---

### 3.6 SEO
*Search engine and structured data consistency improvements.*

1. **Duplicate Organization JSON-LD in DOM:**
   - *Issue:* `index.html` (lines 36-45) contains a hardcoded Organization JSON-LD script, while `SeoUpdater.tsx` dynamically injects and updates a comprehensive JSON-LD block (`#arcstone-jsonld`) with Organization, WebSite, Breadcrumbs, and FAQPage schemas.
   - *Fix:* Remove the redundant static script in `index.html` so search engines receive a single, authoritative structured data graph (`VISUAL-SAFE`).

2. **Social OpenGraph & Twitter Meta Synchronization:**
   - *Issue:* `SeoUpdater.tsx` updates `document.title`, description, keywords, and canonical links on route changes, but does not update `og:title`, `og:description`, `og:url`, `twitter:title`, and `twitter:description`.
   - *Fix:* Extend `SeoUpdater.tsx` to keep OpenGraph and Twitter tags synchronized on route transitions (`VISUAL-SAFE`).

---

### 3.7 FRONTEND MOCK / BACKEND INTEGRATION LATER
*Functionality that is intentionally simulated on the frontend. Not a defect.*

The following workflows are properly identified and categorized:
- **`Waitlist Demo Request` (`src/pages/Waitlist.tsx`):**
  - Qualification form captures fields, validates email and fund status, and simulates step transition.
  - Interactive calendar detects timezone, displays Brussels + local times, allows slot selection and guest email addition, and presents the confirmed card.
  - *Status:* `FRONTEND MOCK / BACKEND INTEGRATION LATER`.
- **`Contact Form Inquiry` (`src/pages/Contact.tsx`):**
  - Captures name, work email, company, and inquiry category. Provides simulated submission delay and green receipt state.
  - *Status:* `FRONTEND MOCK / BACKEND INTEGRATION LATER`.
- **`Newsletter Subscription` (`src/components/Footer.tsx`):**
  - Validates email and toggles simulated "Thank you for signing up!" banner.
  - *Status:* `FRONTEND MOCK / BACKEND INTEGRATION LATER`.
- **`Cookie Consent Storage` (`src/context/ConsentContext.tsx`):**
  - Persists choices in cookies and localStorage, updates Google Consent Mode v2 via `dataLayer`. Real tag dispatch will activate when production GTM container ID is configured.
  - *Status:* `FRONTEND MOCK / BACKEND INTEGRATION LATER`.

---

### 3.8 CONTENT OBSERVATION
*Customer-facing copy and messaging to preserve exactly until an authoritative specification is provided.*

- **Launch Date:** "Launching September 2026" / "Platform launches September 2026".
- **Contact Channels:** `info@arcstone.one` and `legal@arcstone.io`.
- **Office Location:** "Rue de la Science 23, 1000 Brussels".
- **Accelerator Association:** "Start it @KBC".
- **Brand Watermark & Slogan:** "Manage Reality".
- **Rule:** Do NOT update or modernize this copy without explicit authorization.

---

## 4. Phased Implementation Roadmap

```
Phase 0: Protect the Baseline ───────► Phase 1: Frontend Stability
                                            │
                                            ▼
Phase 3: Safe Technical Cleanup ◄─── Phase 2: Visual Regression Infra
        │
        ▼
Phase 4: Responsive Hardening ────────► Phase 5: Controlled Maintainability
                                            │
                                            ▼
Phase 7: Content Migration ◄────────── Phase 6: Performance Optimization
(Only upon authoritative spec)
```

### Phase 0 — Protect the Baseline (COMPLETED)
**Goal:** Guarantee that the original visual source of truth is permanently preserved and impossible to lose.
- **Task 0.1:** Copy the authoritative standalone HTML into `/reference/arcstone-standalone.html` [COMPLETED].
- **Task 0.2:** Configure `vite.config.ts` to ensure `/reference/` is never included in build distributions or public bundles [COMPLETED].
- **Task 0.3:** Document the immutable role of `/reference/arcstone-standalone.html` in `reference/README.md` [COMPLETED].
- **Visual Risk:** `VISUAL-SAFE`.

---

### Phase 1 — Frontend Stability & Tooling Repair (COMPLETED)
**Goal:** Ensure build, tooling, and asset integrity across all environments.
- **Task 1.1:** Fix `npm run lint` tooling by installing ESLint, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react-hooks`, and configuring `.eslintrc.cjs` [COMPLETED].
- **Task 1.2:** Resolve root asset references: Copied `/public/wf/og-image.png` and `/public/wf/Logo.png` to `/public/og-image.png` and `/public/Logo.png` so direct URLs succeed [COMPLETED].
- **Task 1.3:** Verify `npm run build`, `npm run lint`, and dev server startup with zero errors [COMPLETED].
- **Visual Risk:** `VISUAL-SAFE`.

---

### Phase 2 — Visual Regression Infrastructure (COMPLETED)
**Goal:** Make visual fidelity quantifiable and regression-proof before any structural edits.
- **Task 2.1:** Install Playwright (`@playwright/test`) and browser binaries [COMPLETED].
- **Task 2.2:** Configure Playwright test matrix covering the 7 mandatory viewports (1440px, 1280px, 1024px, 768px, 430px, 390px, 375px) in `playwright.config.ts` [COMPLETED].
- **Task 2.3:** Write multi-viewport test suite for all 16 routes, plus interactive states (Navbar scrolled/dropdown/mobile drawer, Cookie banner/modal, Theme toggle, Waitlist wizard) [COMPLETED - 140/140 tests passing].
- **Task 2.4:** Verified test execution across all viewports with zero horizontal overflow [COMPLETED].
- **Visual Risk:** `VISUAL-SAFE`.

---

### Phase 3 — Safe Technical Cleanup (COMPLETED)
**Goal:** Improve semantics, SEO, and accessibility without altering a single pixel.
- **Task 3.1:** Deduplicate Organization JSON-LD by removing the redundant static script from `index.html` [COMPLETED].
- **Task 3.2:** Extend `SeoUpdater.tsx` to dynamically update OpenGraph and Twitter tags on route changes [COMPLETED].
- **Task 3.3:** Add missing ARIA attributes to `Navbar.tsx` (`aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-label`) [COMPLETED].
- **Task 3.4:** Add dynamic `aria-current="page"` to all active navigation and dropdown links in `Navbar.tsx` [COMPLETED].
- **Task 3.5:** Converted footer container in `Footer.tsx` to semantic `<footer>` HTML5 landmark while preserving CSS classes [COMPLETED].
- **Visual Risk:** `VISUAL-SAFE`.

---

### Phase 4 — Responsive Hardening (COMPLETED)
**Goal:** Systematically eliminate genuine layout failures on mobile and tablet without altering the desktop design philosophy.
- **Task 4.1:** Tested `430px`, `390px`, and `375px` viewports for horizontal overflow across all 16 routes — 100% pass, zero unconstrained overflow [COMPLETED].
- **Task 4.2:** Verified table horizontal scrolling in `CookiePolicy.tsx` on narrow screens (`.cookie-table-wrap` with container overflow-x: auto) [COMPLETED].
- **Task 4.3:** Verified comparison table and feature grid responsiveness on tablet (`1024px` / `768px`) and mobile [COMPLETED].
- **Task 4.4:** Verified touch targets and responsive drawer states on mobile hamburger toggle and theme controls [COMPLETED].
- **Visual Risk:** `LOW VISUAL RISK`.

---

### Phase 5 — Controlled Maintainability Improvements (Next Phase)
**Goal:** Safely decompose repeated patterns only after visual test coverage is active.
- **Task 5.1:** Extract common page hero video background markup into a shared, isolated component (`LegalHero.tsx`) and verify pixel identity.
- **Task 5.2:** Modularize repeated form input styles (`custom-input field w-input`) without modifying underlying CSS classes.
- **Task 5.3:** Isolate page-specific styles from `app.css` into modular CSS files only when verified safe.
- **Visual Risk:** `MEDIUM VISUAL RISK` (Only proceed with active visual regression tests).

---

### Phase 6 — Performance Optimization (In Progress)
**Goal:** Measurably improve loading speed and resource consumption while preserving pristine visual quality.
- **Task 6.1:** Add `preload="metadata"` and proper poster references (`/wf/6491ab1c780fa954eb9a3f02_Gradient-poster-00001.jpg`) to all hero video elements [COMPLETED].
- **Task 6.2:** Optimize image formats where file sizes are high.
- **Task 6.3:** Audit `/public/wf/` assets against all templates and CSS rules to identify demonstrably unreferenced files.
- **Visual Risk:** `LOW VISUAL RISK`.

---

### Phase 7 — Product Content Migration (Deferred)
**Goal:** Incorporate updated product positioning only when an authoritative specification is provided.
- **Prerequisite:** Authoritative content brief supplied by leadership.
- **Protocol:**
  1. Map existing text nodes to new text nodes.
  2. Test text fitting in existing card and header constraints.
  3. Only adjust layout if text physically overflows container.
- **Visual Risk:** `MEDIUM VISUAL RISK`.

---

## 5. Prioritization Framework

Every proposed task is classified using this standard evaluation framework:

| Task ID | Description | Classification | Affected Files | Visual Risk | User Impact | Complexity | Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0.1** | Create `/reference/arcstone-standalone.html` | FIDELITY RISK | `reference/*`, `.gitignore` | `VISUAL-SAFE` | High (Safety) | Low | None |
| **1.1** | Fix `npm run lint` ESLint tooling | FRONTEND DEFECT | `package.json`, `.eslintrc.cjs` | `VISUAL-SAFE` | High (Code quality)| Low | None |
| **1.2** | Copy `/og-image.png` & `/Logo.png` to `/public/` | FRONTEND DEFECT | `public/*` | `VISUAL-SAFE` | Medium (SEO/Social)| Low | None |
| **2.1-2.4**| Implement Playwright Visual Regression Suite | FIDELITY RISK | `playwright.config.ts`, `tests/*` | `VISUAL-SAFE` | Critical (Safety) | Medium | None |
| **3.1** | Deduplicate Organization JSON-LD in `index.html`| SEO | `index.html` | `VISUAL-SAFE` | Medium (Search) | Low | Task 1.3 |
| **3.2** | Synchronize OpenGraph/Twitter in `SeoUpdater` | SEO | `src/components/SeoUpdater.tsx` | `VISUAL-SAFE` | Medium (Sharing) | Low | Task 3.1 |
| **3.3** | Add ARIA state to Navbar controls | ACCESSIBILITY | `src/components/Navbar.tsx` | `VISUAL-SAFE` | High (A11y) | Low | None |
| **4.1-4.4**| Mobile & Tablet Responsive Hardening | DEFECT / DEBT | `src/styles/app.css`, pages | `LOW VISUAL RISK` | High (Mobile UX) | Medium | Phase 2 |
| **5.1** | Componentize LegalHero Primitive | STRUCTURAL DEBT| `src/components/*`, legal pages| `MEDIUM VISUAL RISK`| Low (Maintenance) | Medium | Phase 2 |

---

## 6. Recommended First Implementation Batch (Immediate Next Step)

### Batch 1: Baseline Protection & Zero-Risk Defect Resolution (`VISUAL-SAFE`)

We recommend executing the following strictly `VISUAL-SAFE` batch before moving to regression infrastructure:

1. **Task 0.1 — Baseline Reference Preservation:**
   - Create `/reference/arcstone-standalone.html` from `arcstone-standalone.html`.
   - Update `.gitignore` and `vite.config.ts` to ensure `/reference/` is never included in build artifacts.
2. **Task 1.1 — Repair ESLint Tooling:**
   - Install `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, and create `.eslintrc.cjs`.
   - Ensure `npm run lint` and `npm run build` run cleanly.
3. **Task 1.2 — Resolve Root Asset Discrepancies:**
   - Copy `/public/wf/og-image.png` -> `/public/og-image.png` and `/public/wf/Logo.png` -> `/public/Logo.png`.
4. **Task 3.1 & 3.3 — Clean SEO & Accessibility:**
   - Remove redundant static JSON-LD from `index.html`.
   - Add `aria-expanded`, `aria-haspopup`, and dynamic `aria-label` to `Navbar.tsx`.

- **Visual Risk:** **`VISUAL-SAFE`** (0% change to rendered design, layouts, typography, or styling).
- **Verification:** `npm run build`, `npm run lint`, and browser inspection of Navbar & SEO head tags.

---

## 7. What Not to Do

Throughout all upcoming phases, the following actions remain strictly forbidden:
- ❌ Do NOT redesign any section, banner, hero, or card.
- ❌ Do NOT globally edit, normalize, or prune `src/styles/app.css`.
- ❌ Do NOT migrate away from React Router or Vite.
- ❌ Do NOT introduce Tailwind CSS, Bootstrap, Material UI, or any component library.
- ❌ Do NOT replace custom Webflow CSS with generic SaaS designs.
- ❌ Do NOT alter brand colors (`#05080f`, `#4f46e5`, `#94a3b8`, `#1e293b`, etc.).
- ❌ Do NOT alter typography, line-heights, letter-spacing, or fonts (Plus Jakarta Sans).
- ❌ Do NOT simplify or remove animations, gradients, or hover interactions.
- ❌ Do NOT unilaterally rewrite product copy without an approved specification.
- ❌ Do NOT delete assets from `/public/wf/` based on assumptions.
- ❌ Do NOT make structural changes without testing against visual baselines.
