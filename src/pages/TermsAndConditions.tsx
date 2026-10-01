import React from 'react';
import { Link } from 'react-router-dom';
import { LegalHero } from '../components/LegalHero';

export const TermsAndConditions: React.FC = () => {
  return (
    <div id="page-terms-and-conditions" className="wf">
      <LegalHero eyebrow="Legal" title="Terms & Conditions" metaText="Coming soon" />

      <div className="legal-body">
        <div className="legal-highlight-box">
          <p>
            This page is coming soon. For any enquiries in the meantime, please get in touch.
          </p>
        </div>

        <div className="legal-contact-card">
          <div>
            <h3>Legal enquiries</h3>
            <p>
              Reach our team directly at <a href="mailto:info@arcstone.one">info@arcstone.one</a>
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
