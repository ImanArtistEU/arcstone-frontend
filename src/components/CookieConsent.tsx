import React, { useState } from 'react';
import { useConsent } from '../context/ConsentContext';
import { Link } from 'react-router-dom';

export const CookieConsent: React.FC = () => {
  const {
    hasDecided,
    isPreferencesOpen,
    closePreferences,
    acceptAll,
    denyAll,
    savePreferences,
    consent,
  } = useConsent();

  const [analytics, setAnalytics] = useState(consent?.analytics_storage ?? false);
  const [marketing, setMarketing] = useState(consent?.ad_storage ?? false);

  const handleSave = () => {
    savePreferences({
      analytics_storage: analytics,
      ad_storage: marketing,
      ad_user_data: marketing,
      ad_personalization: marketing,
    });
  };

  return (
    <>
      {/* Floating Banner */}
      {!hasDecided && (
        <div
          id="cookie-banner"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            maxWidth: '560px',
            margin: '0 auto',
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ fontSize: '24px' }}>🍪</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>
                Cookie & Privacy Choices
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                We use cookies and similar technologies to ensure site security, analyze performance, and understand how visitors interact with our platform. You can review our{' '}
                <Link to="/cookie-policy" style={{ color: '#4f46e5', textDecoration: 'underline' }}>
                  Cookie Policy
                </Link>{' '}
                to learn more.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={denyAll}
              className="btn is-ghost"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="btn is-primary"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              Accept All
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {isPreferencesOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
          }}
          onClick={closePreferences}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
                Cookie Preferences
              </h3>
              <button
                type="button"
                onClick={closePreferences}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  cursor: 'pointer',
                  color: '#94a3b8',
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
              Manage your cookie preferences below. Essential cookies are required for platform navigation and security.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px' }}>
              {/* Essential */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f8fafc', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>Strictly Necessary</div>
                  <div style={{ fontSize: '12.5px', color: '#64748b' }}>Required for core website security and operation.</div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px' }}>
                  Always Active
                </span>
              </div>

              {/* Analytics */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f8fafc', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>Analytics Cookies</div>
                  <div style={{ fontSize: '12.5px', color: '#64748b' }}>Help us measure and understand visitor engagement.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#4f46e5', cursor: 'pointer' }}
                />
              </div>

              {/* Marketing */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f8fafc', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>Marketing & Personalization</div>
                  <div style={{ fontSize: '12.5px', color: '#64748b' }}>Used to tailor relevant updates and outreach.</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={e => setMarketing(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#4f46e5', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={closePreferences}
                className="btn is-ghost"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="btn is-primary"
                style={{ padding: '8px 20px', fontSize: '13px' }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
