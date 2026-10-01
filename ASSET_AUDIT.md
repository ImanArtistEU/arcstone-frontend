# Arcstone Asset & Imagery Audit

**Date**: October 2026  
**Auditor**: Senior Product Designer & Brand Guardian  
**Status**: Critical Brand Remediation & Asset Modernization

---

## Executive Summary & Critical Brand Finding

During this exhaustive asset audit of the rendered Arcstone frontend and underlying media directory (`/public/wf/`), a **critical brand integrity issue** was uncovered:

> [!CAUTION]
> **CADRO TEMPLATE INHERITANCE CONFIRMED**  
> Multiple key photographic assets across `/about-us`, `/careers`, `/start-ups`, and `/private-firms` were inherited directly from **Cadro** (a London-based wealth management firm, cadro.com) when the Webflow template was originally assembled. Several images visibly display the **"CADRO"** trademark in posters, laptop stickers, and office signage. Furthermore, unrelated stock photos (such as mountain wind turbines) remain embedded in private-firm solution pages.
>
> **Every inherited asset from Cadro or generic stock providers must be systematically eradicated and replaced with authentic, bespoke Arcstone technical visualizations and institutional artifacts.**

---

## 1. Complete Visual Asset Inventory

| Asset Filename | Rendered Routes | What It Depicts | Provenance / Brand Source | Authentic to Arcstone? | Brand Risk | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `6900f3dcdf9e...careers-image.png` | `/about-us`, `/careers`, `/private-firms` | Two employees at a table; **prominent "CADRO" poster** on the window sill. | **Cadro** (London Wealth Manager) | **NO (Foreign Brand)** | **CRITICAL** | **REMOVE / REPLACE** immediately with native engineering visualization. |
| `6900f3dc13e7...home-image.webp` | `/about-us` (used twice!) | Meeting in conference room overlooking The Gherkin; **"CADRO" sticker visible on laptop**. | **Cadro** (30 St Mary Axe office) | **NO (Foreign Brand)** | **CRITICAL** | **REMOVE / REPLACE** with Arcstone infrastructure diagram. |
| `6900f431e321...home-image-2.webp` | `/about-us` | Two women chatting on a blue couch; **"CADRO" sign visible** on frosted partition behind them. | **Cadro** London office | **NO (Foreign Brand)** | **CRITICAL** | **REMOVE / REPLACE** with Core Principles architecture block. |
| `6900f3ba59bc...wealth-image.png` | `/start-ups` | Man and woman in the same Cadro conference room (lime-green Herman Miller chairs, London skyline). | **Cadro** London office | **NO (Foreign Brand)** | **HIGH** | **REPLACE** with structured equity instrument lifecycle graphic. |
| `648c394c01c6...wind-turbine-.png` | `/private-firms` | Wind turbines spinning in mountain sunrise/sunset. | Generic stock photography | **NO (Irrelevant Stock)** | **MEDIUM** | **REPLACE** with private firm debt & profit-share financial ledger UI. |
| `messiah.jpeg` | `/about-us` | Messiah Gord (Co-founder & CEO) speaking with microphone at a conference. | Authentic Arcstone founder photography | **YES (Authentic)** | **LOW** | **KEEP & IMPROVE** (polish framing, remove broken pop-up). |
| `nima.jpeg` | `/about-us` | Nima Najar (Co-founder & CTO) smiling in outdoor portrait. | Authentic Arcstone founder photography | **YES (Authentic)** | **LOW** | **KEEP & IMPROVE** (polish framing, remove broken pop-up). |
| `Logo.png` | Global Header, OG, Footer | White serif "Arcstone." wordmark on deep navy ground (`#0c0b1d`). | Authentic Arcstone brand identity | **YES (Authentic)** | **NONE** | **KEEP (Core Brand Anchor)** |
| `KBCblack.png` / `KBCwhite.png` | Global Footer, Partner band | "Part of Start it @KBC" accelerator badge. | Authentic accelerator partnership (Belgium) | **YES (Authentic)** | **NONE** | **KEEP** |
| `6491ab1c780f...Gradient-transcode.mp4` / `.webm` | Global Subpage Heroes & CTA Cards | Ambient dark navy/violet looping fluid gradient mesh. | Arcstone core visual system | **YES (Brand Anchor)** | **NONE** | **KEEP (Atmospheric Identity)** |
| `6479ec59...Entrepreneurs-Outlines.svg` | `/platform`, `/start-ups` | Minimalist line icon: entrepreneurs. | Arcstone asset suite | **YES** | **NONE** | **KEEP** |
| `6479ec59...Professionals.svg` | `/platform`, `/start-ups` | Minimalist line icon: professionals. | Arcstone asset suite | **YES** | **NONE** | **KEEP** |
| `6479ec59...Wealthy-Families-Outline.svg` | `/platform`, `/start-ups` | Minimalist line icon: institutions/families. | Arcstone asset suite | **YES** | **NONE** | **KEEP** |
| `6479ec59...Trust.svg` | `/platform`, `/start-ups` | Minimalist line icon: trust. | Arcstone asset suite | **YES** | **NONE** | **KEEP** |
| `6479ec59...Foundations.svg` | `/platform`, `/start-ups` | Minimalist line icon: foundations. | Arcstone asset suite | **YES** | **NONE** | **KEEP** |
| `647ef2863d0...decor-wealth-management.png` | `/` (Home offerings) | Geometric gradient dots and square composition. | Visual decorative asset | **YES** | **NONE** | **KEEP** |
| `647ef287aeb...decor-institutions.png` | `/` (Home offerings) | Geometric lavender and violet ribbon path. | Visual decorative asset | **YES** | **NONE** | **KEEP** |
| `6479dc6e...Arrow_Up_Right_L.svg` | Cross-site navigation & cards | Clean diagonal arrow icon for external/interior links. | Arcstone utility icon | **YES** | **NONE** | **KEEP** |
| `64887a70...ic-button-arrow-black.svg` | Button hover states | Crisp forward navigation arrow (dark). | Arcstone utility icon | **YES** | **NONE** | **KEEP** |
| `647754ce...ic-button-arrow-white.svg` | Button default states | Crisp forward navigation arrow (white). | Arcstone utility icon | **YES** | **NONE** | **KEEP** |

---

## 2. In-Depth Audit of Compromised Template Imagery

### Asset A: `6900f3dcdf9e67517358d01f_d49b82bfea8caf24fa355c1c3f0ad9bd_careers-image.png`
- **Location**: Used on `/about-us` (section 12), `/careers` (section 4), and `/private-firms` (section 5).
- **Resolution**: 1536 × 763 px (2.0 MB uncompressed).
- **Content**: A middle-aged woman and South Asian man seated at an office desk looking at a smartphone.
- **The Brand Defect**: In the center of the frame, resting on the windowsill between the two individuals, is a framed poster clearly reading **"CADRO"** in large capital sans-serif letters, alongside another poster reading "Change a child's story".
- **Verdict**: Unacceptable on an institutional fintech platform. Gives the immediate impression that Arcstone is an unfinished copy of Cadro.
- **Remediation**: Eliminate from `/about-us`, `/careers`, and `/private-firms`. Replace with bespoke SVG/CSS platform architecture diagrams.

### Asset B: `6900f3dc13e70918ad3ae0e4_home-image.webp`
- **Location**: Used on `/about-us` (section 1: Our Mission) AND `/about-us` (section 8: Arcstone Today).
- **Resolution**: 1536 × 1026 px (126 KB).
- **Content**: A boardroom meeting of 5 professionals seated around a conference table in front of floor-to-ceiling glass windows overlooking The Gherkin (30 St Mary Axe, London).
- **The Brand Defect**: The laptop lid of the man seated at the head of the table has an official **"CADRO" sticker** attached to it.
- **Verdict**: Repeated twice on the same page, representing someone else's team.
- **Remediation**: Remove completely. Replace with structured cap-table / legal-tech data visualizations.

### Asset C: `6900f431e321ce08afa10c25_home-image-2.webp`
- **Location**: Used on `/about-us` (section 3: "A serious infrastructure provider").
- **Resolution**: 1536 × 1026 px (113 KB).
- **Content**: Two women conversing on a sofa in an office.
- **The Brand Defect**: On the frosted glass partition behind the woman on the left, a green desktop sign reading **"CADRO"** is visible.
- **Verdict**: Another Cadro internal staff photograph.
- **Remediation**: Replace with Arcstone's 4 Core Principles grid (`-A Founder-friendly control`, `-B Contract-first`, `-C Compliance by design`, `-D End-to-end administration`).

### Asset D: `6900f3ba59bc87b8e6ba06e6_1f0d4473b6cd826fe3004b6d50e77281_wealth-image.png`
- **Location**: Used on `/start-ups` (section 3: End-to-end infrastructure).
- **Resolution**: 2048 × 1425 px (3.8 MB!).
- **Content**: A blonde woman and a dark-haired man in the same London conference room with yellow-green office chairs.
- **The Brand Defect**: Part of the same Cadro photo shoot. Massive 3.8 MB payload that slows initial mobile rendering.
- **Remediation**: Remove. Replace with clean SVG equity waterfall & participation architecture diagram.

### Asset E: `648c394c01c6263f358d46e2_wind-turbine-.png`
- **Location**: Used on `/private-firms` (section 3).
- **Resolution**: 869 × 289 px.
- **Content**: Two wind turbines on a mountain ridge during sunset.
- **The Brand Defect**: Completely disconnected from financial market infrastructure, share registers, and revenue-share financing. A generic stock template asset.
- **Remediation**: Replace with revenue-share financing distribution flow visualization.

---

## 3. Approved Authentic Asset Guidelines for Arcstone

To ensure all visual media reinforces Arcstone's institutional authority:
1. **Never use stock photos of people in offices** (avoids the generic SaaS / agency feel).
2. **Prioritize high-density, precise product UI & data visualizations**:
   - Cap table share class hierarchies.
   - Cryptographic timestamp and document hash linkages.
   - Waterfall return distribution models.
   - Legal deed execution workflows.
3. **Founder Photography**:
   - Keep Messiah Gord and Nima Najar portraits, but render them in crisp, high-contrast, rounded geometric executive avatar frames with verified LinkedIn links.
4. **Hero Atmosphere**:
   - The dark navy/violet looping gradient video (`Gradient-transcode.mp4`) remains the approved atmospheric anchor for hero sections and CTA banners.
