# Arcstone Frontend Architecture & Agent Analysis Guide

This document is formatted for **AI coding agents and developers** analyzing, extending, and maintaining the Arcstone web platform frontend.

---

## 1. System Overview

**Arcstone** is a verified equity management, cap table administration, and investor coordination platform for private firms, start-ups, and investors.

The frontend is built on **React 18 + Vite + TypeScript**, decoupling the visual Webflow design system from monolithic bundles into modular, testable, and type-safe components.

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser Client                        │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
        ┌──────▼──────┐                 ┌──────▼──────┐
        │ React Router│                 │ Contexts    │
        │  6.26 (SPA) │                 │ Theme, GDPR │
        └──────┬──────┘                 └──────┬──────┘
               │                               │
┌──────────────▼───────────────────────────────▼──────────────┐
│                    Root Layout (App.tsx)                    │
│  Navbar ──► Page View (Outlet) ──► Footer ──► CookieBanner  │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
        ┌──────▼──────┐                 ┌──────▼──────┐
        │ Core Pages  │                 │ Interactive │
        │ (Templates) │                 │ Components  │
        └──────┬──────┘                 └──────┬──────┘
               │                               │
┌──────────────▼───────────────────────────────▼──────────────┐
│        Static Assets (/public/wf) & Stylesheets             │
│        Fonts, SVGs, Posters, Videos, Design Tokens          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure

```
.
├── .github/workflows/ci.yml     # Continuous Integration pipeline
├── index.html                   # HTML entry point with Consent Mode v2 & metadata
├── package.json                 # Modern dependencies & build scripts
├── vite.config.ts               # Vite configuration (port 3000, alias @/*)
├── tsconfig.json                # TypeScript strict configuration
├── public/
│   ├── favicon.svg              # Vector favicon
│   ├── favicon.ico              # Standard icon fallback
│   ├── apple-touch-icon.png     # iOS touch icon
│   └── wf/                      # Unpacked static media (71 images, videos, fonts, SVGs)
└── src/
    ├── main.tsx                 # Hydration & DOM root mounting
    ├── App.tsx                  # Main router & provider wrapper
    ├── vite-env.d.ts            # Raw template & bundler type declarations
    ├── context/
    │   ├── ThemeContext.tsx     # Light/Dark mode state with body.dark-mode sync
    │   └── ConsentContext.tsx   # Google Consent Mode v2 & cookie preferences
    ├── components/
    │   ├── Navbar.tsx           # Responsive header, solutions dropdown, theme switcher
    │   ├── Footer.tsx           # Footer columns, legal links, cookie trigger
    │   ├── BookingCalendar.tsx  # Interactive live demo scheduling widget
    │   ├── WaitlistForm.tsx     # Multi-step qualification and priority queue form
    │   ├── ContactForm.tsx      # Contact message submission form
    │   └── CookieConsent.tsx    # Banner & modal complying with ePrivacy / GDPR
    ├── styles/
    │   └── app.css              # Webflow styles, Plus Jakarta Sans, design tokens
    └── pages/
        ├── Home.tsx             # Route: /
        ├── Platform.tsx         # Route: /platform
        ├── ManageOwnership.tsx  # Route: /manage-ownership
        ├── ManageDistributions.tsx # Route: /manage-distributions
        ├── AdministerInvestors.tsx # Route: /administer-investors
        ├── RaiseCapital.tsx     # Route: /raise-capital
        ├── StartUps.tsx         # Route: /start-ups
        ├── PrivateFirms.tsx     # Route: /private-firms
        ├── AboutUs.tsx          # Route: /about-us
        ├── Careers.tsx          # Route: /careers
        ├── Contact.tsx          # Route: /contact
        ├── Waitlist.tsx         # Route: /waitlist
        ├── PrivacyPolicy.tsx    # Route: /privacy-policy
        ├── TermsAndConditions.tsx # Route: /terms-and-conditions
        ├── CookiePolicy.tsx     # Route: /cookie-policy
        ├── LegalRegulatory.tsx  # Route: /legal-and-regulatory
        └── templates/           # Clean, modular Webflow HTML section templates
```

---

## 3. Route Map & Navigation Matrix

| Path | Component | Template File | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home.tsx` | `HomeContent.html` | Hero, Audience switcher, Cap table overview, Metrics |
| `/platform` | `Platform.tsx` | `PlatformContent.html` | Core platform capabilities & infrastructure |
| `/manage-ownership` | `ManageOwnership.tsx` | `ManageOwnershipContent.html` | Real-time ownership records, cap table management |
| `/manage-distributions` | `ManageDistributions.tsx` | `ManageDistributionsContent.html` | Entitlements, liquidity events, payout records |
| `/administer-investors` | `AdministerInvestors.tsx` | `AdministerInvestorsContent.html` | Stakeholder KYC, onboarding, investor portal |
| `/raise-capital` | `RaiseCapital.tsx` | `RaiseCapitalContent.html` | Digital issuance, corporate rounds, legal governance |
| `/start-ups` | `StartUps.tsx` | `StartUpsContent.html` | Founder solutions, option pools, investor alignment |
| `/private-firms` | `PrivateFirms.tsx` | `PrivateFirmsContent.html` | Mid-market & private enterprise equity tracking |
| `/about-us` | `AboutUs.tsx` | `AboutUsContent.html` | Team mission, institutional backing, leadership |
| `/careers` | `Careers.tsx` | `CareersContent.html` | Open positions & engineering culture |
| `/contact` | `Contact.tsx` | `ContactHeroContent.html` | Contact details + interactive `ContactForm` |
| `/waitlist` | `Waitlist.tsx` | `WaitlistHeroContent.html` | 3-step waitlist + embedded `BookingCalendar` |
| `/privacy-policy` | `PrivacyPolicy.tsx` | (JSX) | Privacy standards & data rights |
| `/terms-and-conditions` | `TermsAndConditions.tsx` | (JSX) | Terms of access & preview disclaimer |
| `/cookie-policy` | `CookiePolicy.tsx` | (JSX) | Cookie usage & interactive preferences launcher |
| `/legal-and-regulatory` | `LegalRegulatory.tsx` | (JSX) | Statutory register compliance & auditability |

### Route Aliases
* `/early-access` ➔ redirects to `/waitlist`
* `/equity-management` ➔ redirects to `/manage-ownership`
* `/investor-workflows`, `/for-investors` ➔ redirects to `/administer-investors`
* `/lifecycle-admin` ➔ redirects to `/manage-distributions`
* `/for-founders` ➔ redirects to `/start-ups`
* `/for-operators`, `/token-layer`, `/issue-digitally`, `/full-ownership` ➔ redirects to `/platform`

---

## 4. Key Agent Working Recipes

### Recipe A: Modifying or Adding a Page Section
1. Locate the page in `src/pages/<PageName>.tsx` and its template in `src/pages/templates/<PageName>Content.html`.
2. Static HTML markup can be edited directly in the template file.
3. If the section requires interactivity (e.g. state, modals, APIs), convert that section in `<PageName>.tsx` to a native React component.

### Recipe B: Styling & Design Tokens
* All styles reside in `src/styles/app.css`.
* Primary Brand Purple: `#4f46e5` (`rgb(79, 70, 229)`)
* Accent Dark Navy: `#0f172a`
* Neutral Slate: `#64748b` / `#94a3b8`
* Dark Mode is activated by the `.dark-mode` class on `document.body` managed by `ThemeContext`.

### Recipe C: Google Consent Mode v2 & Cookie State
* All user consent defaults to `denied` until the user interacts with `<CookieConsent />`.
* Calling `useConsent().openPreferences()` launches the modal from anywhere in the application (e.g. from the footer or policy pages).
