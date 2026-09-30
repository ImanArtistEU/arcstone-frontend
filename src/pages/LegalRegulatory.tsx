import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const LegalRegulatory: React.FC = () => {
  useEffect(() => {
    document.title = 'Legal & Regulatory | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-legal-and-regulatory" className="wf">
      <div className="legal-page-hero">
        <div className="legal-hero-video">
          <video autoPlay loop muted playsInline>
            <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.mp4" type="video/mp4" />
            <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.webm" type="video/webm" />
          </video>
        </div>
        <div className="legal-hero-scrim"></div>
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Compliance</div>
          <h1>Legal & Regulatory</h1>
          <div className="legal-meta">
            <span>Last updated: September 2026</span>
          </div>
        </div>
      </div>

      <div className="legal-body container w-container" style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div className="legal-highlight-box" style={{ background: '#f8fafc', borderLeft: '4px solid #4f46e5', padding: '20px 24px', borderRadius: '8px', marginBottom: '40px' }}>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.6 }}>
            Arcstone develops verified ledger infrastructure designed to integrate with corporate law standards and statutory register requirements.
          </p>
        </div>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>Regulatory Standards</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            Our infrastructure supports KYC/AML compliance checks, accredited investor verification, and immutable audit logs required for institutional oversight.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>Enquiries</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            For compliance queries, please reach out via our <Link to="/contact" style={{ color: '#4f46e5' }}>Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};
