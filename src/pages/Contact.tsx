import React, { useEffect } from 'react';
import heroHtml from './templates/ContactHeroContent.html?raw';
import { ContactForm } from '../components/ContactForm';

export const Contact: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-contact">
      <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container w-container">
          <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'start' }}>
            <div style={{ paddingRight: '20px' }}>
              <h3 className="title-h2" style={{ fontSize: '28px', marginBottom: '24px', color: '#0f172a' }}>
                How we can help
              </h3>
              <ul className="contact-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#334155' }}>
                  <span style={{ color: '#4f46e5', fontWeight: 700 }}>✓</span> Startups looking to raise and administer equity cleanly
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#334155' }}>
                  <span style={{ color: '#4f46e5', fontWeight: 700 }}>✓</span> Private firms managing distributions and secondary transfers
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#334155' }}>
                  <span style={{ color: '#4f46e5', fontWeight: 700 }}>✓</span> Fund managers and family offices needing verified holdings
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#334155' }}>
                  <span style={{ color: '#4f46e5', fontWeight: 700 }}>✓</span> Legal advisors structuring cap table reorganizations
                </li>
              </ul>
            </div>

            <div className="form-block w-form contact-form-card" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
              <h3 className="title-h2" style={{ fontSize: '24px', marginBottom: '24px', color: '#0f172a' }}>
                Send a message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
