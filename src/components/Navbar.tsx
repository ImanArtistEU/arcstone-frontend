import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const DARK_HERO_ROUTES = new Set([
  '/contact',
  '/waitlist',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookie-policy',
  '/legal-and-regulatory',
]);

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isOnDarkHero, setIsOnDarkHero] = useState(() => DARK_HERO_ROUTES.has(location.pathname));

  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDarkByRoute = DARK_HERO_ROUTES.has(location.pathname);
    const hasDarkHeroEl = Boolean(
      document.querySelector('.legal-page-hero, [data-hero="dark"]')
    );
    setIsOnDarkHero(isDarkByRoute || hasDarkHeroEl);
  }, [location.pathname]);

  // Close menus on route change
  if (location.pathname !== currentPath) {
    setCurrentPath(location.pathname);
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(y > 20);
      if (y > lastScrollY.current && y > 100) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = y <= 0 ? 0 : y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navbarClasses = [
    'custom-navbar',
    scrolled ? 'scrolled' : '',
    navHidden ? 'nav-hidden' : '',
    isOnDarkHero ? 'is-on-dark-hero' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={navbarClasses} id="custom-navbar">
      <div className="custom-nav-container">
        <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined} className="logo-wrap" style={{ textDecoration: 'none' }}>
          <div className="custom-logo-text">arcstone.</div>
        </Link>

        <nav className={`custom-nav-menu${mobileMenuOpen ? ' is-open' : ''}`} id="custom-nav-menu" aria-label="Main">
          <Link
            className="custom-nav-link"
            to="/platform"
            aria-current={location.pathname === '/platform' ? 'page' : undefined}
          >
            Platform
          </Link>

          <div className={`nav-drop${solutionsOpen ? ' open' : ''}`} data-drop="" ref={dropdownRef}>
            <button
              className="nav-drop-btn"
              type="button"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setSolutionsOpen((prev) => !prev);
              }}
            >
              Solutions
              <svg className="chev" viewBox="0 0 12 12">
                <polyline points="2,4 6,8 10,4" />
              </svg>
            </button>

            <div className="nav-drop-panel cols-2" style={{ minWidth: '580px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                <div className="ndp-col-header">Capital &amp; Ownership</div>
                <div className="ndp-col-header">Administration</div>

                <Link
                  className="ndp-item"
                  to="/raise-capital"
                  aria-current={location.pathname === '/raise-capital' ? 'page' : undefined}
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg
                      style={{ flexShrink: 0, marginTop: '1px' }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                    <div>
                      <div className="ndp-name">Raise Capital</div>
                      <div className="ndp-desc">
                        Structured investor participation without unnecessary governance complexity.
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  className="ndp-item"
                  to="/administer-investors"
                  aria-current={location.pathname === '/administer-investors' ? 'page' : undefined}
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg
                      style={{ flexShrink: 0, marginTop: '1px' }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div>
                      <div className="ndp-name">Administer Investors</div>
                      <div className="ndp-desc">
                        Onboarding, records, updates, and lifecycle workflows in one place.
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  className="ndp-item"
                  to="/manage-ownership"
                  aria-current={location.pathname === '/manage-ownership' ? 'page' : undefined}
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg
                      style={{ flexShrink: 0, marginTop: '1px' }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18M3 9h6M3 15h6" />
                    </svg>
                    <div>
                      <div className="ndp-name">Manage Ownership</div>
                      <div className="ndp-desc">
                        Cap tables, rights, documents, and investors in one live record.
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  className="ndp-item"
                  to="/manage-distributions"
                  aria-current={location.pathname === '/manage-distributions' ? 'page' : undefined}
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg
                      style={{ flexShrink: 0, marginTop: '1px' }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div>
                      <div className="ndp-name">Manage Distributions</div>
                      <div className="ndp-desc">
                        Post-raise administration, governance, and reporting from one record.
                      </div>
                    </div>
                  </div>
                </Link>

                <div style={{ gridColumn: '1/-1', margin: '4px 0 0' }}>
                  <div className="ndp-divider" />
                  <Link
                    className="ndp-item ndp-span"
                    to="/platform"
                    aria-current={location.pathname === '/platform' ? 'page' : undefined}
                    onClick={() => setSolutionsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      background: '#f8fafc',
                      margin: '4px 0 0',
                    }}
                  >
                    <div>
                      <div className="ndp-name">Full Ownership Infrastructure</div>
                      <div className="ndp-desc">
                        Equity management, investor workflows, governance, and lifecycle administration on one data layer.
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#0f172a',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      Explore platform →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            className="custom-nav-link"
            to="/about-us"
            aria-current={location.pathname === '/about-us' ? 'page' : undefined}
          >
            Company
          </Link>

          <div className="custom-nav-actions">
            <Link
              to="/waitlist"
              className="custom-nav-button"
              aria-current={location.pathname === '/waitlist' ? 'page' : undefined}
            >
              Book a demo
            </Link>

            <button
              className="custom-dark-toggle"
              id="custom-theme-toggle"
              aria-label="Toggle dark mode"
              type="button"
              onClick={toggleTheme}
            >
              <svg
                id="custom-theme-icon-moon"
                viewBox="0 0 24 24"
                style={{ display: isDark ? 'none' : 'block' }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <svg
                id="custom-theme-icon-sun"
                viewBox="0 0 24 24"
                style={{ display: isDark ? 'block' : 'none' }}
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
          </div>
        </nav>

        <button
          className="custom-mobile-toggle"
          id="custom-mobile-toggle"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="custom-nav-menu"
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <div className="hamburger-line" />
          <div className="hamburger-line" />
          <div className="hamburger-line" />
        </button>
      </div>
    </header>
  );
};
