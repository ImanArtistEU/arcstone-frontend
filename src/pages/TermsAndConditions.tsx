import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const TermsAndConditions: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-terms-and-conditions" className="wf">
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
          <h1>Terms & Conditions</h1>
          <div className="legal-meta">
            <span>Last updated: September 2026</span>
          </div>
        </div>
      </div>

      <div className="legal-body container w-container" style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div className="legal-highlight-box" style={{ background: '#f8fafc', borderLeft: '4px solid #4f46e5', padding: '20px 24px', borderRadius: '8px', marginBottom: '40px' }}>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.6 }}>
            Terms and conditions governing access to Arcstone preview services and early access modules.
          </p>
        </div>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>1. Platform Access</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            Arcstone provides software for equity lifecycle tracking, stakeholder directories, and corporate governance coordination.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>2. Contact</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            For legal inquiries, reach our team via <Link to="/contact" style={{ color: '#4f46e5' }}>Contact Us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};
