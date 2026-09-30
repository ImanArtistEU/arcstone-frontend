import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ConsentProvider } from './context/ConsentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';

// Pages
import { Home } from './pages/Home';
import { Platform } from './pages/Platform';
import { ManageOwnership } from './pages/ManageOwnership';
import { ManageDistributions } from './pages/ManageDistributions';
import { AdministerInvestors } from './pages/AdministerInvestors';
import { RaiseCapital } from './pages/RaiseCapital';
import { StartUps } from './pages/StartUps';
import { PrivateFirms } from './pages/PrivateFirms';
import { AboutUs } from './pages/AboutUs';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { Waitlist } from './pages/Waitlist';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { CookiePolicy } from './pages/CookiePolicy';
import { LegalRegulatory } from './pages/LegalRegulatory';

// Layout wrapper
const RootLayout: React.FC = () => {
  return (
    <div className="app-root">
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ConsentProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="platform" element={<Platform />} />
            <Route path="manage-ownership" element={<ManageOwnership />} />
            <Route path="manage-distributions" element={<ManageDistributions />} />
            <Route path="administer-investors" element={<AdministerInvestors />} />
            <Route path="raise-capital" element={<RaiseCapital />} />
            <Route path="start-ups" element={<StartUps />} />
            <Route path="private-firms" element={<PrivateFirms />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="careers" element={<Careers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="waitlist" element={<Waitlist />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="legal-and-regulatory" element={<LegalRegulatory />} />

            {/* Aliases & Webflow redirects */}
            <Route path="early-access" element={<Navigate to="/waitlist" replace />} />
            <Route path="issue-digitally" element={<Navigate to="/platform" replace />} />
            <Route path="token-layer" element={<Navigate to="/platform" replace />} />
            <Route path="full-ownership" element={<Navigate to="/platform" replace />} />
            <Route path="equity-management" element={<Navigate to="/manage-ownership" replace />} />
            <Route path="investor-workflows" element={<Navigate to="/administer-investors" replace />} />
            <Route path="lifecycle-admin" element={<Navigate to="/manage-distributions" replace />} />
            <Route path="for-founders" element={<Navigate to="/start-ups" replace />} />
            <Route path="for-operators" element={<Navigate to="/platform" replace />} />
            <Route path="for-investors" element={<Navigate to="/administer-investors" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ConsentProvider>
    </ThemeProvider>
  );
};
