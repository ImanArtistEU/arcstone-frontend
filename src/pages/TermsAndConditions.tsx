import React from 'react';
import { Link } from 'react-router-dom';

export const TermsAndConditions: React.FC = () => {
  return (
    <div id="page-terms-and-conditions" className="wf">
      <div className="legal-page-hero">
        <div className="legal-hero-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/wf/6491ab1c780fa954eb9a3f02_Gradient-poster-00001.jpg"
          >
            <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.mp4" type="video/mp4" />
            <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.webm" type="video/webm" />
          </video>
        </div>
        <div className="legal-hero-scrim" />
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Legal</div>
          <h1>Terms &amp; Conditions</h1>
          <div className="legal-meta">
            <span>Coming soon</span>
          </div>
        </div>
      </div>

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
