import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';

const categories = [
  {
    key: 'necessary' as const,
    title: 'Strictly necessary',
    description:
      'Required for the site to function — security (anti-spam), form submission, and remembering your cookie choices. These cannot be switched off.',
    always: true,
  },
  {
    key: 'analytics' as const,
    title: 'Analytics & performance',
    description:
      'Help us understand how the site is used so we can improve it (Google Analytics via Google Tag Manager, and Datadog performance monitoring).',
    always: false,
  },
  {
    key: 'marketing' as const,
    title: 'Marketing & media',
    description:
      'Used for advertising and campaign measurement. These may set cookies from third parties.',
    always: false,
  },
];

export const CookieConsent: React.FC = () => {
  const {
    bannerVisible,
    preferencesOpen,
    acceptAll,
    rejectAll,
    openPreferences,
    closePreferences,
    choices,
    savePreferences,
    hasResponded,
  } = useConsent();

  const [analytics, setAnalytics] = useState(choices.analytics);
  const [marketing, setMarketing] = useState(choices.marketing);

  useEffect(() => {
    if (preferencesOpen) {
      setAnalytics(choices.analytics);
      setMarketing(choices.marketing);
    }
  }, [preferencesOpen, choices.analytics, choices.marketing]);

  useEffect(() => {
    if (!preferencesOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hasResponded) {
        closePreferences();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [preferencesOpen, hasResponded, closePreferences]);

  return (
    <>
      {bannerVisible && !preferencesOpen && (
        <div className="cookie-banner" role="dialog" aria-modal="false" aria-label="Cookie consent">
          <div className="cookie-banner-inner">
            <div className="cookie-banner-text">
              <h2 className="cookie-banner-title">We value your privacy</h2>
              <p className="cookie-banner-copy">
                We use cookies to run this site and, with your permission, to measure performance and improve your experience. You can accept all cookies, reject optional ones, or choose what to allow. Read our{' '}
                <Link to="/cookie-policy" className="cookie-link">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-ghost"
                onClick={openPreferences}
              >
                Manage preferences
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-secondary"
                onClick={rejectAll}
              >
                Reject all
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={acceptAll}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {preferencesOpen && (
        <div
          className="cookie-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          onClick={(e) => {
            if (e.target === e.currentTarget && hasResponded) {
              closePreferences();
            }
          }}
        >
          <div className="cookie-modal">
            <div className="cookie-modal-header">
              <h2 className="cookie-modal-title">Cookie preferences</h2>
              {hasResponded && (
                <button
                  type="button"
                  className="cookie-modal-close"
                  aria-label="Close"
                  onClick={closePreferences}
                >
                  ×
                </button>
              )}
            </div>

            <p className="cookie-modal-intro">
              Choose which categories of cookies you allow. For details on each cookie we use, see our{' '}
              <Link to="/cookie-policy" className="cookie-link" onClick={closePreferences}>
                Cookie Policy
              </Link>
              .
            </p>

            <div className="cookie-modal-categories">
              {categories.map((cat) => (
                <div className="cookie-category" key={cat.key}>
                  <div className="cookie-category-head">
                    <span className="cookie-category-title">{cat.title}</span>
                    {cat.always ? (
                      <span className="cookie-category-badge">Always active</span>
                    ) : (
                      <label className="cookie-switch">
                        <input
                          type="checkbox"
                          checked={cat.key === 'analytics' ? analytics : marketing}
                          onChange={(e) =>
                            cat.key === 'analytics'
                              ? setAnalytics(e.target.checked)
                              : setMarketing(e.target.checked)
                          }
                        />
                        <span className="cookie-slider" />
                      </label>
                    )}
                  </div>
                  <p className="cookie-category-desc">{cat.description}</p>
                </div>
              ))}
            </div>

            <div className="cookie-modal-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-secondary"
                onClick={rejectAll}
              >
                Reject all
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={() => savePreferences({ analytics, marketing })}
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
