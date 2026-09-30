# Arcstone Web Platform Frontend

Modern frontend application for **Arcstone** — the single verified ledger for equity management, cap table administration, and investor coordination.

---

## 🚀 Quickstart

### Prerequisites
* Node.js v18+ (v22+ recommended)
* npm, pnpm, or yarn

### Installation
```bash
npm install
```

### Development Server
Run Vite with instant Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
Compile TypeScript and bundle optimized static assets:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🏗️ Tech Stack

* **Framework:** React 18
* **Language:** TypeScript 5.5
* **Build Tool:** Vite 5.4
* **Routing:** React Router v6
* **Styling:** Modular Webflow CSS & Design Tokens
* **Compliance:** Google Consent Mode v2 + ePrivacy / GDPR banner

---

## 📖 Architecture & Agent Navigation

For an exhaustive guide on the system design, component hierarchy, route map, and instructions for AI coding agents, consult:
👉 **[`ARCHITECTURE.md`](./ARCHITECTURE.md)**

---

## 📁 Repository Structure

```
.
├── public/                 # Static assets (images, fonts, videos, favicons)
│   ├── favicon.svg
│   └── wf/                 # 71 unpacked Webflow static media assets
├── src/
│   ├── components/         # Navbar, Footer, BookingCalendar, WaitlistForm, CookieConsent
│   ├── context/            # ThemeContext (Dark/Light), ConsentContext (GDPR)
│   ├── pages/              # 16 route pages (Home, Platform, Solutions, Legal)
│   │   └── templates/      # Modular HTML templates for each page
│   ├── styles/             # Stylesheets and typography
│   ├── App.tsx             # Root Layout & React Router setup
│   └── main.tsx            # Application entry point
├── ARCHITECTURE.md         # Comprehensive AI Agent navigation guide
└── vite.config.ts          # Vite bundler configuration
```

---

## 📄 License
All rights reserved © Arcstone.
