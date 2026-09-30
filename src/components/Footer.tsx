import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useConsent } from '../context/ConsentContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { openPreferences } = useConsent();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please enter your name and email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    // Simulated frontend submission
    setTimeout(() => {
      setStatus('success');
    }, 400);
  };

  const isLoading = status === 'loading';

  return (
    <section className="footer">
      <div className="container w-container">
        <div className="footer-newsletter-wrap">
          <h3 className="footer-title">
            Sign up to our <br />
            newsletter
          </h3>
          <div className="footer-form-container">
            <div
              className="content-text"
              style={{ marginBottom: '32px', fontSize: '16px', color: '#475569' }}
            >
              Keep up with the latest Arcstone news and platform updates
            </div>

            {status === 'success' ? (
              <div
                style={{
                  paddingTop: '16px',
                  fontSize: '15px',
                  color: '#16a34a',
                  fontWeight: 500,
                }}
              >
                Thank you for signing up!
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div
                  style={{
                    display: 'flex',
                    gap: '32px',
                    flexWrap: 'wrap',
                    marginBottom: '32px',
                  }}
                >
                  <div className="footer-input-wrap">
                    <input
                      name="Name"
                      placeholder="Name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="footer-input-wrap">
                    <input
                      name="Email"
                      placeholder="Email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div
                  className="content-text"
                  style={{ fontSize: '14px', marginBottom: '24px', color: '#64748b' }}
                >
                  You accept the{' '}
                  <Link to="/terms-and-conditions" className="link-item">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="link-item">
                    Privacy Policy
                  </Link>{' '}
                  by submitting your request.
                </div>

                {status === 'error' && (
                  <div style={{ fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <div>
                  <input
                    type="submit"
                    className="button w-button"
                    value={isLoading ? 'Sending…' : 'Submit'}
                    disabled={isLoading}
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="divider is-gray" />

        <div className="footer-links-wrap">
          <div className="footer-menu">
            <Link to="/start-ups" className="footer-menu-link">
              Start ups
            </Link>
            <Link to="/private-firms" className="footer-menu-link">
              Private firms
            </Link>
            <Link to="/about-us" className="footer-menu-link">
              About us
            </Link>
            <Link to="/contact" className="footer-menu-link">
              Contact us
            </Link>
            <Link to="/legal-and-regulatory" className="footer-menu-link">
              Legal &amp; Regulatory
            </Link>
            <Link to="/privacy-policy" className="footer-menu-link">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="footer-menu-link">
              Terms &amp; Conditions
            </Link>
            <Link to="/cookie-policy" className="footer-menu-link">
              Cookie Policy
            </Link>
            <button
              type="button"
              className="footer-menu-link footer-cookie-settings"
              onClick={openPreferences}
            >
              Cookie settings
            </button>
          </div>

          <div className="footer-social-wrap">
            <div className="footer-social-title">Follow us</div>
            <div className="footer-menu" style={{ gap: '16px' }}>
              <a
                href="https://www.linkedin.com/company/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-menu-link"
                style={{ textDecoration: 'underline' }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div
          className="footer-legal-wrap"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            maxWidth: '100%',
            width: '100%',
          }}
        >
          <span>© 2026 Arcstone. All rights reserved.</span>
          <a
            href="https://startit-x.com/en/accelerate/start-it-kbc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={theme === 'dark' ? '/wf/KBCwhite.png' : '/wf/KBCblack.png'}
              alt="Start it @KBC"
              width={1604}
              height={286}
              style={{ height: '44px', width: 'auto', display: 'block' }}
            />
          </a>
        </div>

        <div className="footer-huge-text">Manage Reality</div>
      </div>
    </section>
  );
};
