import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-privacy-policy" className="wf">
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
          <h1>Privacy Policy</h1>
          <div className="legal-meta">
            <span>Last updated: September 2026</span>
          </div>
        </div>
      </div>

      <div className="legal-body container w-container" style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div className="legal-highlight-box" style={{ background: '#f8fafc', borderLeft: '4px solid #4f46e5', padding: '20px 24px', borderRadius: '8px', marginBottom: '40px' }}>
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.6 }}>
            Arcstone respects your privacy. This policy outlines how information is handled when you explore our platform, book a demonstration, or request early access.
          </p>
        </div>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>1. Information We Collect</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            We collect information provided directly when booking a demo, joining the waitlist, or contacting our team (such as name, corporate email, firm name, and stakeholder counts).
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>2. How Information Is Used</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            Data is strictly used to organize product demonstrations, configure sandbox access, coordinate onboarding schedules, and answer inquiries. We do not sell or monetize personal information.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>3. Questions and Rights</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>
            For privacy inquiries or data requests, please visit our <Link to="/contact" style={{ color: '#4f46e5' }}>Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};
