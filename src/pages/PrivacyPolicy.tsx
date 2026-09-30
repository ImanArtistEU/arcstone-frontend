import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div id="page-privacy-policy" className="wf">
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
          <h1>Privacy Policy</h1>
          <div className="legal-meta">
            <span>Coming soon</span>
          </div>
        </div>
      </div>

      <div className="legal-body">
        <div className="legal-highlight-box">
          <p>
            A full privacy policy is coming soon. The section below explains how we handle the details
            you share when you book a demo or join our waitlist. For any privacy enquiry, please get in
            touch.
          </p>
        </div>

        <div className="legal-section">
          <h2>Demo requests &amp; waitlist</h2>
          <p>
            When you submit the “Book a demo” form, we collect your first name, last name, work email
            address, and company name. If you tick the optional box, we also record your consent to
            receive product updates. For security and abuse prevention we store a one-way hashed
            (irreversible) version of your IP address and your browser’s user-agent string.
          </p>
          <p>
            <strong>Why we use it:</strong> to contact you and schedule your demo, to notify you when
            the platform launches in September, and—only if you opted in—to send occasional product
            updates. <strong>Legal basis:</strong> your consent and steps taken at your request prior to
            entering into a contract.
          </p>
          <p>
            <strong>Who can see it:</strong> the Arcstone team. Your details are stored on our website
            hosting infrastructure (Easyhost) and transmitted by email through our email provider. We do
            not sell your data or share it for third-party advertising.
          </p>
          <p>
            <strong>How long we keep it:</strong> we retain demo-request details only as long as needed
            to contact you about the launch, and we will delete records that do not lead to an ongoing
            relationship within a reasonable period after launch.
          </p>
          <p>
            <strong>Your choices:</strong> you can withdraw consent or ask us to correct or delete
            your details at any time by emailing{' '}
            <a href="mailto:info@arcstone.one">info@arcstone.one</a>. If you opted in to product
            updates, every marketing email will include an unsubscribe option.
          </p>
        </div>

        <div className="legal-contact-card">
          <div>
            <h3>Privacy enquiries</h3>
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
