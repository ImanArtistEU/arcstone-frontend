# Complete Arcstone Frontend Section & Experience Inventory

**Date**: October 2026  
**Auditor**: Senior Product Designer, Design-System Lead & Brand Guardian  
**Standard**: Experience-driven evaluation, brand fidelity, institutional authority, and responsive perfection.

---

## Evaluation Rubric (1 to 5 Stars)
- **Visual Quality**: Aesthetic refinement, linework precision, typography restraint, spacing balance.
- **Information Value**: Does it convey meaningful knowledge about Arcstone's platform and value proposition?
- **Clarity**: Is the message immediately understandable without jargon ambiguity?
- **Design-System Coherence**: Does it fit naturally with Arcstone's dark-navy institutional grammar?
- **Mobile Quality**: Layout responsiveness, touch ergonomics, font scaling, no cramped elements.
- **Action Recommendation**:
  - `KEEP`: Excellent execution; aligned with brand and function.
  - `IMPROVE`: Strong concept; needs typographic polish, tighter spacing, or cleaner CTA.
  - `MERGE`: Redundant messaging; consolidate into an authoritative unified section.
  - `REPLACE`: Flawed execution or foreign template asset; replace with bespoke Arcstone component.
  - `REMOVE`: Unintentional copy-paste or duplicate section with no valid purpose on this route.

---

## Route-by-Route Section Inventory

### 1. `/` (Homepage)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Subpage Hero** | Establish Arcstone as modern market infrastructure for private companies. | Full-bleed dark hero with looping ambient gradient mesh. | `Gradient-transcode.mp4` / `.webm` | `Book a demo` (`/waitlist`) | Unique on `/` | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. 4-Pillar Suite** | Educate visitors on Arcstone's 4 core modules: Equity, Capital, Investors, Lifecycle. | 2×2 grid of dark cards with thin borders and subtle badges. | `decor-wealth-management.png`, `decor-institutions.png` | Deep links to all 4 pillars | Distinct pillar breakdown | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **2. Platform Explorer** | Interactive demonstration of live cap table, workflows, waterfall simulator, and governance. | Interactive multi-tab card with dynamic sliders and status toggles. | Bespoke SVG & CSS UI | Interactive slider & tab controls | Interactive anchor | 5 | 5 | 5 | 5 | 4.8 | **KEEP** |
| **3. Audience Split** | Differentiate value proposition for Startups/SMEs vs Institutional Investors. | 2-column split with comparative feature checklist and dual CTAs. | None | `Startups` (`/start-ups`), `Firms` (`/private-firms`) | Low | 4.5 | 4.5 | 4.5 | 4.5 | 4.5 | **KEEP** |
| **4. Closing CTA** | Conversion banner inviting founders and investors to book a demo. | High-contrast dark banner with ambient glow. | `Gradient-transcode.mp4` | `Book a demo` (`/waitlist`) | Shared CTA pattern | 4.8 | 4.5 | 5 | 5 | 4.8 | **KEEP** |

---

### 2. `/platform` (Platform Overview)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Platform Hero** | Introduce Arcstone as the complete private market ownership OS. | Full-width subpage hero. | `Gradient-transcode.mp4` | `Get in touch` (`/contact`) | Standard subpage hero | 5 | 4.5 | 5 | 5 | 5 | **KEEP** |
| **1. Architecture Grid** | Detail the 4 architectural layers: Issuance, Cap Table, Compliance, Waterfall. | 4-column feature list with institutional icons. | SVG line icons | Links to individual pillar routes | Low | 4.5 | 5 | 4.5 | 5 | 4.5 | **KEEP** |
| **2. Platform Explorer** | Hands-on walkthrough of data structures and real-time computation. | Embedded `<PlatformExplorer />` interactive engine. | Bespoke interactive React component | Interactive tab controls | Shared with `/` | 5 | 5 | 5 | 5 | 4.8 | **KEEP** |
| **3. Security & Perimeter** | Reassure institutional stakeholders regarding custody, encryption, and auditability. | Institutional trust checklist with security badges. | SVG shield icons | `Contact security` (`/contact`) | Low | 4.5 | 4.8 | 4.8 | 5 | 4.5 | **KEEP** |

---

### 3. `/raise-capital` (Capital Formation)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | Communicate ability to raise capital without diluting founder control. | Full-width subpage hero with clean title. | `Gradient-transcode.mp4` | `Start a raise` (`/waitlist`) | Unique headline | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. Raise Architecture** | Explain non-voting economic participation rights vs ordinary shares. | 3-column structured feature grid. | SVG icons | None | Low | 4.5 | 5 | 4.5 | 5 | 4.5 | **KEEP** |
| **2. Investor Onboarding** | Show digital KYC/AML, subscription agreement signing, and automated cap table credit. | Step-by-step workflow progression cards. | SVG step badges | `Explore workflows` (`/platform`) | Low | 4.5 | 4.8 | 4.8 | 5 | 4.5 | **KEEP** |

---

### 4. `/manage-ownership` (Equity & Cap Table Management)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | Cap table as single source of legal and mathematical truth. | Standard subpage hero. | `Gradient-transcode.mp4` | `Request audit` (`/waitlist`) | Standard hero | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. Readiness Inspector** | Interactive audit engine showing cap table diligence score and 1-click issue resolution. | Interactive React card with score ring and live filter tabs. | Bespoke interactive component | `Link Conversion Instrument →` | Unique to this page | 5 | 5 | 5 | 5 | 4.8 | **KEEP** |
| **2. Cap Table Capabilities** | Detail instrument tracking, SAFE conversions, option vesting, and stakeholder access. | 3-column grid with clean typography. | Minimal SVG icons | None | Low | 4.5 | 4.8 | 4.5 | 5 | 4.5 | **KEEP** |

---

### 5. `/administer-investors` (Investor Relations & Stakeholders)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | Automated investor reporting, digital tax statements, and holding registers. | Subpage hero. | `Gradient-transcode.mp4` | `Explore portal` (`/waitlist`) | Standard hero | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. Investor Portal Features** | Transparency without email attachment chaos; self-serve document vaults. | Card grid with preview mockups. | SVG icons | None | Low | 4.5 | 4.5 | 4.5 | 5 | 4.5 | **KEEP** |
| **2. Institutional Diligence** | Regulatory perimeter, audit logs, and exportable cap table snapshots. | 2-column comparison layout. | SVG badges | `Book a demo` (`/waitlist`) | Low | 4.5 | 4.5 | 4.5 | 5 | 4.5 | **KEEP** |

---

### 6. `/manage-distributions` (Waterfalls & Distributions)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | Mathematical waterfall modeling and automated payout execution. | Subpage hero. | `Gradient-transcode.mp4` | `Simulate waterfall` (`/platform`) | Standard hero | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. Waterfall Rules** | Preference hurdles, catch-ups, and seniority structures modeled automatically. | High-density financial data table mockup. | SVG checkmarks | None | Low | 4.5 | 4.8 | 4.5 | 5 | 4.5 | **KEEP** |
| **2. Payout Infrastructure** | SEPA/SWIFT banking integration, automated withholding tax, and stamped statements. | 3-pillar distribution workflow cards. | SVG icons | `Get in touch` (`/contact`) | Low | 4.5 | 4.5 | 4.5 | 5 | 4.5 | **KEEP** |

---

### 7. `/start-ups` (Startups & Scaleups Solution)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | "Give investors upside, not voting power" — core startup value proposition. | Subpage hero with clear proposition. | `Gradient-transcode.mp4` | `Get in touch` (`/contact`) | Low | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. Problem / Solution** | Traditional equity is slow and dilutive; Arcstone participation rights are agile. | Split horizontal text comparison. | None | `About us` (`/about-us`) | Repeats About Us theme | 4 | 4 | 4 | 4 | 4 | **IMPROVE** (tighter copy) |
| **2. Startup Stat Band** | Highlights: 100% Founder voting retained, 0 Ordinary shares diluted, 24/7 visibility. | 4-column horizontal stat band. | None | None | Clean stat pattern | 4.8 | 4.8 | 5 | 5 | 4.8 | **KEEP** |
| **3. End-to-end Infrastructure** | Explains the full issuance and compliance workflow. | Two-column split with photo on left. | `wealth-image.png` (**Cadro office photo!**) | `Private firms` (`/private-firms`) | Low | 2 | 4 | 4 | 2 | 3 | **REPLACE** image with native Arcstone capital structure graphic |
| **4. Feature Grid** | Legally anchored rights, one clean dashboard, flexible structures. | 3-column feature cards with SVG icons. | SVG icons | None | Low | 4.5 | 4.5 | 4.5 | 5 | 4.5 | **KEEP** |
| **5. Employee Participation** | Reward team members without cap table dilution (synthetic/participation equity). | 2-column feature blocks. | None | `Talk to us` (`/contact`) | Low | 4.5 | 4.5 | 4.5 | 5 | 4.5 | **KEEP** |
| **6. We Work With** | Ecosystem coverage: Early-stage Startups, Scaleups, Founders, Advisors. | 5-item horizontal icon strip. | Minimalist line icons | None | Low | 4.5 | 4 | 4.5 | 4.5 | 4 | **KEEP** |

---

### 8. `/private-firms` (Private Firms & SMEs Solution)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | Financing flexibility without equity dilution for SMEs and private firms. | Subpage hero. | `Gradient-transcode.mp4` | `Get in touch` (`/contact`) | Low | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. Revenue & Profit Share** | Structured economic rights for non-venture capital growth businesses. | Vertical text hierarchy with colored bullets. | None | None | Low | 4 | 4 | 4 | 4 | 4 | **IMPROVE** |
| **2. SME Stat Band** | Flexible structures, 0% equity diluted, 100% perimeter maintained. | 4-column metric band. | None | None | Low | 4.8 | 4.8 | 5 | 5 | 4.8 | **KEEP** |
| **3. SME Use Cases** | Revenue-share financing without bank debt or equity governance vetoes. | Two-column layout with image. | `wind-turbine-.png` (**Irrelevant stock photo!**) | `Get in touch` (`/contact`) | Low | 1.5 | 4 | 4 | 2 | 3 | **REPLACE** wind-turbine image with structured payout diagram |
| **4. Feature Grid** | Bespoke payout schedules, automated compliance gates, permanent audit trail. | 3-column card grid. | SVG icons | None | Low | 4.5 | 4.8 | 4.8 | 5 | 4.5 | **KEEP** |
| **5. Duplicate Careers Block** | An entire duplicate of the Careers page with Cadro photo and "No items found." CMS empty state. | Legacy Webflow template copy-paste artifact. | `careers-image.png` (**Cadro photo!**) | `Apply now`, `General app` | **100% duplicate of `/careers`!** | 1 | 1 | 1 | 1 | 2 | **REMOVE ENTIRELY** from this page |

---

### 9. `/about-us` (About Us — Critical Overhaul Surface)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | "Building modern market infrastructure" — institutional positioning. | Subpage hero with gradient mesh. | `Gradient-transcode.mp4` | `Get in touch` (`/contact`) | Repeats in section 1 | 4.8 | 4.5 | 4.5 | 5 | 4.8 | **KEEP & REFINE** |
| **1. Our Mission** | Describes Arcstone's position at intersection of fundraising, legal-tech, compliance. | Two-column layout with photo on left. | `home-image.webp` (**Cadro meeting with laptop sticker!**) | None | Repeats hero verbatim! | 2 | 2 | 2 | 2 | 3 | **REPLACE / MERGE** into authoritative thesis |
| **2. Core Principles** | 4 foundational pillars: Founder-friendly control, Contract-first, Compliance, End-to-end. | 4-card grid (`-A`, `-B`, `-C`, `-D`). | Monospace letter badges | None | Strong, authentic | 4.5 | 5 | 5 | 5 | 4.5 | **KEEP & POLISH** |
| **3. Serious Infrastructure** | "A serious infrastructure provider, not a speculation platform." | Two-column layout with photo on right. | `home-image-2.webp` (**Cadro staff with office sign!**) | `Contact us` (`/contact`) | Strong copy, foreign photo | 2 | 4.5 | 4.5 | 2 | 3 | **REPLACE** photo with clean institutional linework |
| **4. Ownership Gap** | Discusses the gap between public market and private market infrastructure. | Horizontal callout block. | None | None | Good thesis | 4 | 4.5 | 4.5 | 4.5 | 4 | **MERGE** with Mission |
| **5. Building That Infra** | Large quote card with looping video background. | Full-bleed contact card with video. | `Gradient-transcode.mp4` | `Book a demo` (`/waitlist`) | High visual impact | 4.8 | 4.5 | 4.8 | 5 | 4.5 | **KEEP** |
| **6. What We Are Building** | Universal ownership access, Structured private markets, Founder control. | 3-column card grid with SVG icons. | SVG icons | None | Low | 4.5 | 4.5 | 4.5 | 5 | 4.5 | **KEEP** |
| **7. Arcstone Today** | Re-states the ownership infrastructure layer narrative for a 4th time! | Two-column block repeating `home-image.webp` a second time! | `home-image.webp` (Cadro photo duplicated) | None | **Severe repetition** | 1.5 | 2 | 2 | 2 | 2 | **REMOVE** (absorbed into unified narrative) |
| **8. Pre-team CTA** | "Ready to get started? Configure your raise..." | Horizontal banner between dividers. | None | `Get in touch` (`/contact`) | Standard CTA | 4 | 4 | 4 | 4 | 4 | **KEEP** |
| **9. Co-founders** | Introduce Messiah Gord (CEO) and Nima Najar (CTO). | Team cards with click-to-open popup modals containing empty bios! | `messiah.jpeg`, `nima.jpeg` | LinkedIn profile links | High authentic value, broken modal | 2.5 | 5 | 4 | 4 | 3 | **REPLACE MODAL** with elegant executive card design |
| **10. Careers Duplicate** | Full duplicate Careers section with Cadro photo and "No items found." CMS state. | Ripped from `/careers`. | `careers-image.png` (**Cadro photo!**) | `Apply now`, `General app` | **100% duplicate** | 1 | 1 | 1 | 1 | 2 | **REPLACE** with a sleek 1-card "Join Our Team" bridge |

---

### 10. `/careers` (Careers & Talent)

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **0. Hero** | "Join Arcstone — We are building ownership infrastructure from first principles." | Subpage hero with gradient mesh. | `Gradient-transcode.mp4` | `Get in touch` (`/contact`) | Low | 5 | 5 | 5 | 5 | 5 | **KEEP** |
| **1. Who We Look For** | "A small team. A hard problem." Engineering and financial discipline. | Editorial two-column block. | None | None | Authentic institutional tone | 4.8 | 5 | 5 | 5 | 4.8 | **KEEP** |
| **2. Office & Culture** | London registered office — Berkeley Square; meaningful equity participation. | Minimalist bullet strip. | None | None | Grounded & real | 4.5 | 4.8 | 4.8 | 5 | 4.5 | **KEEP** |
| **3. Hiring Areas** | Engineering, Smart Contracts, Legal Structuring, Private Markets Operations. | Two-column layout with photo. | `careers-image.png` (**Cadro poster photo!**) | None | Good copy, foreign photo | 2 | 4.5 | 4.5 | 2 | 3 | **REPLACE** image with bespoke engineering architecture graphic |
| **4. Open Positions** | Talent tracks & General application card with "No items found." CMS box. | CMS empty state container + general app card. | None | `General application` (`/contact`) | Webflow artifact | 2 | 3.5 | 3.5 | 3 | 3 | **REPLACE** "No items found." with active institutional talent tracks |

---

### 11. `/contact` & 12. `/waitlist`

| Section | Purpose & Learning Goal | Visual Pattern | Assets Used | CTA | Repetition? | VQ | IV | CL | DS | MQ | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Contact Form** | Direct inquiry channel for startups, SMEs, and institutional partners. | Clean two-column card with functional form fields and validation. | None | `Send inquiry` | Low | 4.8 | 5 | 5 | 5 | 4.8 | **KEEP** |
| **Waitlist Wizard** | 3-step interactive booking wizard (Details → Calendar slot → Confirmation). | Interactive multi-step form with live date/time selection. | SVG calendar icons | `Confirm booking` | Low | 5 | 5 | 5 | 5 | 4.8 | **KEEP** |

---

## 3. High-Priority Implementation Roadmap (Immediate Execution)

Based on this complete section inventory and asset audit, the following implementation actions are scheduled for immediate execution:

1. **Overhaul `/about-us`**:
   - Purge all 3 Cadro template images (`home-image.webp`, `home-image-2.webp`, `careers-image.png`).
   - Merge repetitive narrative blocks into one authoritative, non-redundant statement on private market infrastructure.
   - Redesign the Co-founders section: eliminate broken empty bio popup modals and replace them with premium executive cards with direct LinkedIn verified badges.
   - Replace the duplicate Careers experience with a clean, intentional "Join Our Mission" bridge card linking to `/careers`.
2. **Purge Cadro & Stock Images from `/start-ups` and `/private-firms`**:
   - In `/start-ups`: replace `wealth-image.png` (Cadro meeting room) with a native SVG/CSS equity allocation diagram.
   - In `/private-firms`: replace `wind-turbine-.png` (irrelevant stock photo) with a structured revenue-share financial ledger graphic.
   - In `/private-firms`: remove the duplicate Careers section and its "No items found." CMS empty state completely.
3. **Upgrade `/careers`**:
   - Replace `careers-image.png` (Cadro poster) with an institutional technology architecture graphic.
   - Eradicate the "No items found." empty state box and replace it with active talent specialization tracks (Distributed Systems, Smart Contract / Legal Engineering, Private Markets Operations).
