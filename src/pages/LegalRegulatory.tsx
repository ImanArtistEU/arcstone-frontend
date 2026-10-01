import React from 'react';
import { Link } from 'react-router-dom';
import { LegalHero } from '../components/LegalHero';

export const LegalRegulatory: React.FC = () => {
  return (
    <div id="page-legal-and-regulatory" className="wf">
      <LegalHero eyebrow="Legal" title="Legal & Regulatory" metaText="Coming soon" />

      <div className="legal-body">
        <div className="legal-highlight-box">
          <p>
            This page is coming soon. For legal or regulatory enquiries in the meantime, please get in touch.
          </p>
        </div>

        <div className="legal-contact-card">
          <div>
            <h3>Legal &amp; Regulatory enquiries</h3>
            <p>
              Reach our team directly at <a href="mailto:legal@arcstone.io">legal@arcstone.io</a>
            </p>
          </div>
          <Link to="/contact" className="legal-cta">
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
};
