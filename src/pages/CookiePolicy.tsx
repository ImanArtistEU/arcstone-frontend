import React, { useEffect } from 'react';
import { useConsent } from '../context/ConsentContext';

export const CookiePolicy: React.FC = () => {
  const { openPreferences } = useConsent();

  useEffect(() => {
    document.title = 'Cookie Policy | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-cookie-policy" className="wf">
      <div className="legal-page-hero">
        <div className="legal-hero-video">
          <video autoPlay loop muted playsInline>
            <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.mp4" type="video/mp4" />
            <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.webm" type="video/webm" />
          </video>
        </div>
        <div className="legal-hero-scrim"></div>
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Legal</div>
          <h1>Cookie Policy</h1>
          <div className="legal-meta">
            <span>Last updated: September 2026</span>
          </div>
        </div>
      </div>

      <div className="legal-body container w-container" style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div className="legal-highlight-box" style={{ background: '#f8fafc', borderLeft: '4px solid #4f46e5', padding: '20px 24px', borderRadius: '8px', marginBottom: '40px' }}>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.6 }}>
            This Cookie Policy explains how Arcstone uses cookies and similar technologies, and how you can configure them.{' '}
            <button
              type="button"
              onClick={openPreferences}
              style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', padding: 0, font: 'inherit', textDecoration: 'underline' }}
            >
              Manage Cookie Preferences
            </button>.
          </p>
        </div>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>1. What Are Cookies?</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            Cookies are compact data packets placed on your device to maintain session integrity, preserve theme preferences, and provide analytical metrics.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>2. Categories We Use</h2>
          <ul style={{ color: '#475569', lineHeight: 1.8 }}>
            <li><strong>Strictly Necessary:</strong> Essential for platform security, form submissions, and routing.</li>
            <li><strong>Analytics:</strong> Aggregated measurement of visits, pages viewed, and engagement.</li>
            <li><strong>Functional / Theme:</strong> Stores your light or dark mode choice.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
