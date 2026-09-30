import React from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';

export const Footer: React.FC = () => {
  const { openPreferences } = useConsent();

  return (
    <footer className="footer wf-section">
      <div className="container w-container">
        <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', paddingBottom: '60px' }}>
          {/* Brand Column */}
          <div className="footer-brand" style={{ maxWidth: '300px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="custom-logo-text" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
                arcstone.
              </div>
            </Link>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              The single verified ledger for equity management, investor coordination, and capital events across private firms.
            </p>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 700, marginBottom: '20px' }}>
              Solutions
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/platform" className="footer-link">Platform Overview</Link></li>
              <li><Link to="/manage-ownership" className="footer-link">Manage Ownership</Link></li>
              <li><Link to="/manage-distributions" className="footer-link">Manage Distributions</Link></li>
              <li><Link to="/administer-investors" className="footer-link">Administer Investors</Link></li>
              <li><Link to="/raise-capital" className="footer-link">Raise Capital</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 700, marginBottom: '20px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/start-ups" className="footer-link">For Start-ups</Link></li>
              <li><Link to="/private-firms" className="footer-link">For Private Firms</Link></li>
              <li><Link to="/about-us" className="footer-link">About Us</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 700, marginBottom: '20px' }}>
              Legal & Privacy
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/cookie-policy" className="footer-link">Cookie Policy</Link></li>
              <li><Link to="/legal-and-regulatory" className="footer-link">Legal & Regulatory</Link></li>
              <li>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="footer-link footer-cookie-settings"
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left', color: '#64748b' }}
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid rgba(226, 232, 240, 0.8)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '13px',
            color: '#94a3b8',
          }}
        >
          <div>© {new Date().getFullYear()} Arcstone. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/terms-and-conditions" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
            <Link to="/cookie-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
