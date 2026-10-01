# Arcstone Frontend Design Coherence Audit

> **Scope**: Route-by-route and component-level coherence audit  
> **Standard**: [DESIGN_SYSTEM.md](file:///Users/throoni/Desktop/Arcstone%20front%20end%20file/DESIGN_SYSTEM.md)  
> **Status**: In Progress — Implementation Batches A through E  

---

## 1. Audit Matrix & Discrepancy Inventory

| ID | Route | Component / Section | Current Treatment | Arcstone Standard Treatment | Severity | Classification | Recommended Action | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AUD-01** | `/waitlist` | `Waitlist.tsx` (Empty Calendar) | Unicode emoji `🗓️` displayed in empty slot state (L530) | Geometric SVG line icon (calendar with crisp 1.5px stroke) | **HIGH** | `ICON DRIFT` | Replace emoji with inline SVG calendar line icon | **RESOLVED** |
| **AUD-02** | `/waitlist` | `WaitlistForm.tsx` (Step 3 Demo Option) | Unicode emoji `🗓️` (L230) and `✉️` (L249) in selection cards | Geometric SVG line icons (calendar and envelope) | **HIGH** | `ICON DRIFT` | Replace emoji with crisp SVG line icons | **RESOLVED** |
| **AUD-03** | `/platform` | `PlatformContent.html` (Closing CTA Banner) | Foreign teal/cyan gradient `linear-gradient(155deg,#0d2260 0%,#003848 55%,#0a1e55 100%)`, `#00c694`, `rgba(0,210,188,0.22)` (L205-216) | Native Arcstone dark navy-violet environment `#08071a` / `#05080f` with cool lavender / violet accents (`#818cf8`, `#b1a1ed`) | **CRITICAL** | `COLOR DRIFT` | Redesign CTA banner to native Arcstone palette and typography | **RESOLVED** |
| **AUD-04** | `/administer-investors` | `AdministerInvestorsContent.html` (NV Badge) | Bright teal/indigo gradient `linear-gradient(135deg,#4f46e5,#00c694)` (L95) | Arcstone refined violet gradient `linear-gradient(135deg, #6366f1, #818cf8)` or monochrome surface | **HIGH** | `COLOR DRIFT` | Harmonize to approved Arcstone violet gradient | **RESOLVED** |
| **AUD-05** | `/manage-distributions` | `ManageDistributionsContent.html` (Indicators) | Neon cyan `#00c694` indicator dot (L100); generic indigo `#4f46e5` and `#eef2ff` pill (L108) | Arcstone semantic emerald `#10b981` (state only) and subtle lavender-surface badge | **MEDIUM** | `COLOR DRIFT` | Harmonize dots and calculated badge to Arcstone tokens | **RESOLVED** |
| **AUD-06** | `/about-us` | `AboutUsContent.html` (Mission Visual) | Heavy black shadow `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4)` and `border-radius: 16px` (L21) | Arcstone standard 12px surface, 1px border separation, subtle ambient shadow `0 4px 20px rgba(0, 0, 0, 0.25)` | **HIGH** | `SHADOW DRIFT` / `RADIUS DRIFT` | Reduce shadow depth, adjust radius to standard 14px module | **RESOLVED** |
| **AUD-07** | `/about-us` | `AboutUsContent.html` (Data Spec Claim) | Unverified regulatory claim: `ISO-20022 / MiFID II ALIGNED` (L24) | Institutional descriptive standard: `STRUCTURED RECORD FORMAT / INSTITUTIONAL DATA SPEC` | **CRITICAL** | `CONTENT SAFETY DRIFT` | Replace with verified technical terminology | **RESOLVED** |
| **AUD-08** | `/about-us` | `AboutUsContent.html` (Co-founder Cards) | Heavy shadow `box-shadow: 0 16px 36px rgba(0,0,0,0.35)` and `border-radius: 16px` (L167, L189) | Arcstone standard 12px card radius, refined `0 4px 20px rgba(0,0,0,0.25)` elevation | **HIGH** | `SHADOW DRIFT` / `RADIUS DRIFT` | Standardize to 12px card radius and low-contrast elevation | **RESOLVED** |
| **AUD-09** | `/private-firms` | `PrivateFirmsContent.html` (Note Matrix) | Heavy shadow `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35)` and `border-radius: 16px` (L69) | Standard 14px module radius, 1px border `rgba(255, 255, 255, 0.08)`, subtle shadow | **HIGH** | `SHADOW DRIFT` / `RADIUS DRIFT` | Harmonize shadow and radius to Arcstone module scale | **RESOLVED** |
| **AUD-10** | `/start-ups` | `StartUpsContent.html` (Allocation Model) | Heavy shadow `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35)` and `border-radius: 16px` (L91) | Standard 14px module radius, 1px border separation, subtle shadow | **HIGH** | `SHADOW DRIFT` / `RADIUS DRIFT` | Harmonize shadow and radius to Arcstone module scale | **RESOLVED** |
| **AUD-11** | `/careers` | `CareersContent.html` (Systems Stack) | Heavy shadow `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4)` and `border-radius: 16px` (L60); claim `MiFID II / UK regulatory perimeters` (L155) | Standard 14px module radius, restrained shadow; neutral wording `institutional regulatory frameworks` | **HIGH** | `SHADOW DRIFT` / `CONTENT SAFETY DRIFT` | Harmonize shadow and radius; tone down regulatory scope claim | **RESOLVED** |
| **AUD-12** | Global / Home | `ReadinessInspector.tsx` | Heavy shadow `0 20px 48px rgba(0, 0, 0, 0.4)` (L88); claim `MiFID II Passport` (L44); heavy inline styles | Standard 14px module radius, `0 8px 24px rgba(0,0,0,0.25)` shadow; neutral `Beneficial Ownership Passport`; tokenized classes | **HIGH** | `SHADOW DRIFT` / `CONTENT SAFETY DRIFT` / `INLINE STYLE DRIFT` | Update shadow, copy, and extract styles | **RESOLVED** |
| **AUD-13** | Global / Home | `PlatformExplorer.tsx` | Heavy shadow `0 25px 60px -15px rgba(0, 0, 0, 0.7)` (L48); MiFID compliance claim (L342) | Subtle ambient glow `0 12px 36px rgba(0,0,0,0.35)`; neutral `regulatory compliance standards` | **MEDIUM** | `SHADOW DRIFT` / `CONTENT SAFETY DRIFT` | Soften shadow depth; verify copy | **RESOLVED** |
| **AUD-14** | `/waitlist` | `WaitlistForm.tsx` (Step Indicators & Radio Cards) | Blanket `#4f46e5` for step numbers (L40, 46, 52), radio borders (L80, 223), and light purple bg `#eef2ff` | Arcstone violet `#818cf8` / `#6366f1` with subtle lavender-surface `#f5f3ff` (light) or `rgba(129, 140, 248, 0.12)` (dark) | **HIGH** | `COLOR DRIFT` / `INLINE STYLE DRIFT` | Harmonize to Arcstone interactive token system | **RESOLVED** |
| **AUD-15** | `/waitlist` | `BookingCalendar.tsx` (Slot Selection) | Hardcoded `#4f46e5` for selected date pills (L128) and slot buttons (L172); radius 16px (L81) | Arcstone interactive violet `#818cf8` / `#6366f1`; radius 12px panel | **HIGH** | `COLOR DRIFT` / `RADIUS DRIFT` | Harmonize colors, radius, and hover states | **RESOLVED** |
| **AUD-16** | `/contact` & `/waitlist` | `Contact.tsx`, `Waitlist.tsx`, `ContactHeroContent.html`, `WaitlistHeroContent.html` | Hardcoded `color: #4f46e5;` on bullet checkmarks `✓` | Arcstone cool lavender / violet `#818cf8` or dark navy check icon | **MEDIUM** | `COLOR DRIFT` | Harmonize checkmark accents to Arcstone token | **RESOLVED** |
| **AUD-17** | Global | Global Buttons & Interactive Inputs | Mixed button styles (`.btn.is-primary.w-button`, `.button-outline`, custom inline buttons) | Standardized `.as-btn-primary`, `.as-btn-ghost`, `.as-btn-pill` | **MEDIUM** | `COMPONENT DRIFT` | Establish cohesive button utility classes in CSS | **RESOLVED** |
| **AUD-18** | Global | Section Rhythm & Density | Varied vertical paddings (`padding: 0 5% 0`, `padding: 100px 0`, `is-padding-24px`) across solution pages | Uniform 80px–100px desktop section spacing with balanced content hierarchy | **MEDIUM** | `LAYOUT RHYTHM DRIFT` | Harmonize container widths and section spacings | **BATCH C** |
| **AUD-19** | Global | Mobile Viewports (375px–430px) | Multi-column grids and large stat counters causing tight horizontal clearance | Controlled single-column stacking, minimum 44px touch targets, 20px edge gutters | **HIGH** | `MOBILE UX DRIFT` | Verify and test responsive fidelity across 7 viewports | **BATCH D** |
| **AUD-20** | Global | Design Token Consolidation | Over 120 inline CSS style blocks across React components | Extracted `arcstone-tokens.css` with structured variables and utility classes | **HIGH** | `INLINE STYLE DRIFT` | Connect global token stylesheet to `main.tsx` | **RESOLVED** |

---

## 2. Implementation Batches

- **Batch A (Immediate)**:
  - Clean all emoji UI from `Waitlist.tsx` and `WaitlistForm.tsx`.
  - Fix foreign neon cyan/teal banner on `PlatformContent.html`.
  - Harmonize heavy shadows (`0 16px 40px`, `0 20px 48px`, `0 25px 60px`) and calibrate radii (16px → 12px/14px).
  - Tweak unverified regulatory claims in `AboutUsContent.html`, `ReadinessInspector.tsx`, `PlatformExplorer.tsx`, `CareersContent.html`.
  - Remove teal gradients in `AdministerInvestorsContent.html` and `ManageDistributionsContent.html`.

- **Batch B (Component Harmonization)**:
  - Standardize `#4f46e5` buttons and state accents in `BookingCalendar.tsx`, `WaitlistForm.tsx`, `Contact.tsx`, `Waitlist.tsx`.
  - Harmonize form inputs and step indicators.
  - Implement `src/styles/arcstone-tokens.css`.

- **Batch C (Page-Level Rhythm & Visualizations)**:
  - Harmonize section rhythm, comparison tables, and data diagrams across solutions pages.

- **Batch D (Mobile Design Verification)**:
  - Review and refine mobile viewports (375px, 390px, 430px).

- **Batch E (Final Review, Snapshots & Verification)**:
  - Full test execution across all 7 viewports, snapshot verification, build and lint checks.
