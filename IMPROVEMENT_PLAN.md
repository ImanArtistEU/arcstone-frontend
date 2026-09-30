# Arcstone Frontend: High-Fidelity Baseline Audit & Execution Roadmap

> **Standard:** *Same website visually. Better implementation underneath.*  
> Visual design and rendered layout from the source of truth (`arcstone-standalone.html`) are authoritative.

---

## 1. Baseline Audit Findings

### A. Genuine Frontend Defects & Fidelity Discrepancies
*(Visual or structural discrepancies where current modular implementation deviates from `arcstone-standalone.html`)*

1. **Navbar Layout & Elements (`src/components/Navbar.tsx`)**:
   - The current navbar implementation is an approximation. The authentic navbar in `arcstone-standalone.html` utilizes:
     - Header container: `#custom-navbar` with conditional state classes: `scrolled`, `nav-hidden` (scroll-direction detection), and `is-on-dark-hero` (for `/contact`, `/waitlist`, `/privacy-policy`, `/terms-and-conditions`).
     - Logo: `<div className="custom-logo-text">arcstone.</div>` inside `<Link to="/" aria-current="page" className="logo-wrap">`.
     - Navigation items: `Platform`, `Solutions` (dropdown toggle with chevron `<svg className="chev">`), `Company` (`/about-us`).
     - Solutions Mega-Panel: 2-column grid (`Capital & Ownership` and `Administration`) featuring 4 service cards (`/raise-capital`, `/administer-investors`, `/manage-ownership`, `/manage-distributions`) with specific SVG icons and microcopy, plus full-width bottom banner (`ndp-span`) pointing to `/platform`.
     - Actions: CTA button `<Link to="/waitlist" className="custom-nav-button">Book a demo</Link>`, theme toggle `<button className="custom-dark-toggle" id="custom-theme-toggle">` with inline moon/sun SVG vectors, and mobile toggle `<button className="custom-mobile-toggle" id="custom-mobile-toggle">` with 3 `hamburger-line` spans.
   - **Risk:** LOW VISUAL RISK (Restoring original fidelity).

2. **Footer Structure (`src/components/Footer.tsx`)**:
   - The current footer is a generic 4-column placeholder. The authentic Arcstone footer has:
     - Newsletter block: `h3.footer-title` ("Sign up to our <br/>newsletter"), `content-text` subtitle, input fields `Name` & `Email`, `button.w-button`, and legal consent line.
     - Divider: `div.divider.is-gray`.
     - Menu row: `Start ups`, `Private firms`, `About us`, `Contact us`, `Legal & Regulatory`, `Privacy Policy`, `Terms & Conditions`, `Cookie Policy`, and `Cookie settings` button.
     - Social column: "Follow us" with LinkedIn link.
     - Bottom legal row: Copyright `© 2026 Arcstone. All rights reserved.` and the Start it @KBC badge (`/wf/KBCwhite.png` or `/wf/KBCblack.png`).
     - Distinctive brand watermark: `<div className="footer-huge-text">Manage Reality</div>`.
   - **Risk:** LOW VISUAL RISK (Restoring authentic Webflow footer layout).

3. **Cookie Consent & Preferences Modal (`src/components/CookieConsent.tsx`)**:
   - The original stylesheet in `app.css` defines exact classes for the banner and modal: `.cookie-banner`, `.cookie-banner-inner`, `.cookie-banner-text`, `.cookie-btn-ghost`, `.cookie-btn-secondary`, `.cookie-btn-primary`, and `.cookie-modal-overlay` with granular toggles (`Necessary`, `Analytics & performance`, `Marketing & media`).
   - **Risk:** LOW VISUAL RISK.

4. **Legal Pages Content & Layout (`PrivacyPolicy.tsx`, `TermsAndConditions.tsx`, `CookiePolicy.tsx`, `LegalRegulatory.tsx`)**:
   - Current files contain generic placeholder text. The source of truth contains verified legal copy, gradient video heroes (`/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.mp4` / `.webm`), `.legal-highlight-box`, and `.legal-contact-card`.
   - **Risk:** VISUAL-SAFE (Restores authentic content and hero videos).

5. **Home Page Comparison Table (`src/pages/Home.tsx`)**:
   - The dynamic comparison table (`#cmp-grid-wrap`) and `IntersectionObserver` reveal animation (`.cmp-wrap`) from `Io()` was not triggered.
   - **Risk:** LOW VISUAL RISK.

6. **Waitlist & Contact Two-Column Feature Grids**:
   - `Waitlist.tsx`: Should render `WaitlistHeroContent.html`, 3-step progress bar (`ol.wl-stepper`), step 0 with `What to expect` list (`rs`) and the demo qualification form, step 1 with the interactive calendar, and step 2 with the confirmation panel.
   - `Contact.tsx`: Should render `ContactHeroContent.html`, followed by the 2-column grid with `How we can help` list (`Wo`) and `Send a message` form card.
   - **Risk:** LOW VISUAL RISK.

7. **Webflow JS Mode Initialization (`index.html`)**:
   - Missing the `w-mod-js` document class script that signals Webflow styles that JavaScript is active.
   - **Risk:** VISUAL-SAFE.

8. **Dynamic Metadata & SEO (`src/components/SEO.tsx` or Layout Hook)**:
   - Dynamic page titles, meta descriptions, and canonical tags based on active route.
   - **Risk:** VISUAL-SAFE.

---

### B. Structural Debt
1. **Trailing JS String Escapes in Extracted CSS**: Fixed — stripped trailing `\n/*$vite$:1*/` which previously caused PostCSS parsing errors.
2. **Anchor Link Navigation**: Links inside HTML templates with `onclick="navigateTo(event, '...')"` need uniform client-side routing delegation so navigation doesn't trigger hard browser page reloads.

---

### C. Performance Observations
1. **Video Backgrounds**: Video hero gradients in `/public/wf/` (`.mp4` and `.webm`) are ~1.2 MB. They load smoothly and have poster fallbacks (`Gradient-poster-00001.jpg`).
2. **Web Fonts**: Plus Jakarta Sans `@font-face` is bundled in `app.css` as base64 WOFF2, ensuring instantaneous font rendering with zero layout shift (CLS = 0).

---

### D. Maintainability Weaknesses
1. Template strings in `src/pages/templates/` are static HTML strings rendered via `dangerouslySetInnerHTML`. They preserve 100% pixel fidelity but require careful separation between static visual sections and interactive form cards.

---

### E. Product / Content Observations *(Preserved — Not Changed)*
- Launch date: *"Launching September 2026"* / *"Coming soon"*.
- Inquiries: `info@arcstone.one` and `legal@arcstone.io`.
- Partner accelerator: `Start it @KBC`.
- Brand tagline: *"Manage Reality"*.
- **Note:** All copy remains preserved per design preservation protocol.

---

### F. Frontend Mock Classification *(Backend Integration Required Later)*
The following are marked as frontend mocks and will simulate realistic UX (validation, loading state, success/error feedback):
- `Waitlist submission` -> Simulates demo qualification and advances to calendar.
- `Calendar booking` -> Timezone detection, slot selection, and confirmed state.
- `Contact form submission` -> Form validation and simulated success receipt.
- `Newsletter subscription` -> Field validation and "Thank you for signing up!" confirmation.

---

## 2. Phased Execution Roadmap

| Phase | Description | Visual Risk | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Baseline Audit, CSS Cleanliness, Dependency Verification | VISUAL-SAFE | **Completed** |
| **Phase 2.1** | Add Webflow JS indicator (`w-mod-js`) & smooth routing delegation in `index.html` / `main.tsx` | VISUAL-SAFE | **Next** |
| **Phase 2.2** | Restore exact Navbar fidelity (`#custom-navbar`, 2-column Solutions dropdown, SVG icons, dark toggle) | LOW VISUAL RISK | **Next** |
| **Phase 2.3** | Restore exact Footer fidelity (newsletter, 8-link menu, Start it @KBC badge, watermark) | LOW VISUAL RISK | **Next** |
| **Phase 2.4** | Restore authentic Cookie Consent banner and preferences modal using exact `app.css` classes | LOW VISUAL RISK | **Next** |
| **Phase 2.5** | Restore verified Legal Pages content & video heroes (`PrivacyPolicy`, `Terms`, `Cookies`, `Legal`) | LOW VISUAL RISK | **Next** |
| **Phase 2.6** | Restore Home comparison table dynamic builder and observer in `Home.tsx` | LOW VISUAL RISK | Planned |
| **Phase 2.7** | Restore Waitlist 3-step wizard and Contact 2-column feature grids | LOW VISUAL RISK | Planned |
| **Phase 2.8** | Add Route Metadata / SEO synchronization | VISUAL-SAFE | Planned |
