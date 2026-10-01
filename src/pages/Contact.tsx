import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroHtml from './templates/ContactHeroContent.html?raw';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name and email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    // FRONTEND MOCK — BACKEND INTEGRATION REQUIRED LATER
    setTimeout(() => {
      setStatus('success');
    }, 500);
  };

  const isLoading = status === 'loading';

  return (
    <div id="page-contact">
      <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <section className="section">
        <div className="container w-container">
          <div className="feature-grid" style={{ marginTop: '64px', alignItems: 'start' }}>
            <div style={{ paddingRight: '40px' }}>
              <h3 className="title-h2" style={{ fontSize: '28px', marginBottom: '24px' }}>
                How we can help
              </h3>
              <ul className="contact-list" style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#818cf8' }}>✓</span> Startups looking to raise without losing control
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#818cf8' }}>✓</span> SMEs exploring revenue/profit-share financing
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#818cf8' }}>✓</span> Platforms seeking regulated distribution infrastructure
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#818cf8' }}>✓</span> General partnership and API inquiries
                </li>
              </ul>

              <h3 className="title-h2" style={{ fontSize: '24px', marginBottom: '16px' }}>
                Brussels Hub
              </h3>
              <p className="content-text" style={{ margin: 0 }}>
                Rue de la Science 23<br />
                1000 Brussels
              </p>
              <p className="content-text" style={{ marginTop: '16px' }}>
                <strong>Email:</strong> info@arcstone.one
              </p>
            </div>

            <div className="form-block w-form contact-form-card">
              <h3 className="title-h2" style={{ fontSize: '24px', marginBottom: '32px' }}>
                Send a message
              </h3>
              {status === 'success' ? (
                <div style={{ padding: '32px 0', fontSize: '16px', color: '#16a34a', fontWeight: 500 }}>
                  Thank you — we'll be in touch shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <input
                    className="custom-input field w-input"
                    placeholder="Full Name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                  <input
                    className="custom-input field w-input"
                    placeholder="Work Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <input
                    className="custom-input field w-input"
                    placeholder="Company Name"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={isLoading}
                  />
                  <select
                    className="custom-input is-select field w-input"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    disabled={isLoading}
                    aria-label="What are you looking for?"
                  >
                    <option value="">What are you looking for?</option>
                    <option value="startup">I want to raise capital (Startup)</option>
                    <option value="sme">I want to issue profit-share (SME)</option>
                    <option value="partner">I want to use your API (Partner)</option>
                    <option value="other">Other inquiry</option>
                  </select>

                  {status === 'error' && (
                    <div style={{ fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </div>
                  )}

                  <input
                    type="submit"
                    className="button w-button"
                    value={isLoading ? 'Sending…' : 'Submit Inquiry'}
                    disabled={isLoading}
                    style={{ width: '100%', justifyContent: 'center' }}
                  />

                  <div className="content-text" style={{ fontSize: '12px', marginTop: '16px', textAlign: 'center' }}>
                    By submitting, you agree to our <Link to="/privacy-policy">Privacy Policy</Link>.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
