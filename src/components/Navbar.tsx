import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const darkHeroPages = new Set([
  '/contact',
  '/waitlist',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookie-policy',
  '/legal-and-regulatory'
]);

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [lastPath, setLastPath] = useState(location.pathname);
  const lastScrollY = useRef(0);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const isOnDarkHero = darkHeroPages.has(location.pathname);

  // Close menus on route change
  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setIsMobileOpen(false);
    setIsSolutionsOpen(false);
  }

  // Scroll detection for header hide/reveal
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header
      id="custom-navbar"
      className={[
        'custom-navbar',
        isScrolled ? 'scrolled' : '',
        isHidden ? 'nav-hidden' : '',
        isOnDarkHero ? 'is-on-dark-hero' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="custom-nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo-wrap" style={{ textDecoration: 'none' }}>
          <div className="custom-logo-text">arcstone.</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`custom-nav-menu${isMobileOpen ? ' is-open' : ''}`} id="custom-nav-menu">
          <Link className="custom-nav-link" to="/platform">
            Platform
          </Link>

          {/* Solutions Dropdown */}
          <div className={`nav-drop${isSolutionsOpen ? ' open' : ''}`} ref={solutionsRef}>
            <button
              type="button"
              className="nav-drop-btn"
              onClick={e => {
                e.stopPropagation();
                setIsSolutionsOpen(!isSolutionsOpen);
              }}
            >
              Solutions
              <svg className="chev" viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="nav-drop-menu">
              <Link to="/manage-ownership" className="nav-drop-item">
                <span className="nav-drop-item-title">Manage Ownership</span>
                <span className="nav-drop-item-desc">Live verified records across every equity event.</span>
              </Link>
              <Link to="/manage-distributions" className="nav-drop-item">
                <span className="nav-drop-item-title">Manage Distributions</span>
                <span className="nav-drop-item-desc">Track entitlements and payouts from the same ledger.</span>
              </Link>
              <Link to="/administer-investors" className="nav-drop-item">
                <span className="nav-drop-item-title">Administer Investors</span>
                <span className="nav-drop-item-desc">Dedicated onboarding, KYC, and direct investor portal.</span>
              </Link>
              <Link to="/raise-capital" className="nav-drop-item">
                <span className="nav-drop-item-title">Raise Capital</span>
                <span className="nav-drop-item-desc">Issue digital shares and coordinate round closes securely.</span>
              </Link>
            </div>
          </div>

          <Link className="custom-nav-link" to="/start-ups">
            Start-ups
          </Link>
          <Link className="custom-nav-link" to="/private-firms">
            Private Firms
          </Link>
          <Link className="custom-nav-link" to="/about-us">
            About Us
          </Link>
          <Link className="custom-nav-link" to="/careers">
            Careers
          </Link>
          <Link className="custom-nav-link" to="/contact">
            Contact
          </Link>

          {/* Mobile Actions */}
          <div className="custom-nav-mobile-actions">
            <Link to="/waitlist" className="btn is-primary w-button">
              Request Access
            </Link>
          </div>
        </nav>

        {/* Right Nav Actions (Theme Toggle & CTA) */}
        <div className="custom-nav-actions">
          {/* Light / Dark Mode Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              background: 'transparent',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
            }}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <Link to="/waitlist" className="btn is-primary w-button nav-cta-btn">
            Request Access
          </Link>

          {/* Hamburger Icon */}
          <button
            type="button"
            className={`custom-nav-toggle${isMobileOpen ? ' is-active' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
