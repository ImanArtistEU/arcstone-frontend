import React from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';
import { LegalHero } from '../components/LegalHero';

export const CookiePolicy: React.FC = () => {
  const { openPreferences } = useConsent();

  return (
    <div id="page-cookie-policy" className="wf">
      <LegalHero eyebrow="Legal" title="Cookie Policy" metaText="Last updated: 29 June 2026" />

      <div className="legal-body">
        <div className="legal-highlight-box">
          <p>
            This Cookie Policy explains how Arcstone uses cookies and similar technologies on this
            website, and how you can control them. You can change your choices at any time using the{' '}
            <button
              type="button"
              className="cookie-link footer-cookie-settings"
              onClick={openPreferences}
            >
              cookie settings
            </button>
            .
          </p>
        </div>

        <nav className="legal-toc" aria-label="Table of contents">
          <div className="legal-toc-title">On this page</div>
          <ol>
            <li>
              <a href="#what-are-cookies">What are cookies?</a>
            </li>
            <li>
              <a href="#how-we-use">How we use cookies</a>
            </li>
            <li>
              <a href="#categories">Cookie categories</a>
            </li>
            <li>
              <a href="#cookies-we-use">Cookies we use</a>
            </li>
            <li>
              <a href="#third-parties">Third-party cookies</a>
            </li>
            <li>
              <a href="#managing">Managing your preferences</a>
            </li>
            <li>
              <a href="#changes">Changes to this policy</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
          </ol>
        </nav>

        <section className="legal-section" id="what-are-cookies">
          <div className="legal-section-num">01</div>
          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They are
            widely used to make websites work, to improve their performance, and to provide
            information to site owners. Similar technologies such as local storage, pixels, and
            software development kits perform comparable functions, and we refer to all of these as
            “cookies” in this policy.
          </p>
        </section>

        <hr className="legal-divider" />

        <section className="legal-section" id="how-we-use">
          <div className="legal-section-num">02</div>
          <h2>How we use cookies</h2>
          <p>
            We use cookies to operate and secure this website, to remember your preferences
            (including your cookie choices), and—only with your consent—to understand how the site
            is used and to support media and marketing features. Strictly necessary cookies are
            always active because the site cannot function without them. All other cookies are set
            only after you give consent.
          </p>
        </section>

        <hr className="legal-divider" />

        <section className="legal-section" id="categories">
          <div className="legal-section-num">03</div>
          <h2>Cookie categories</h2>
          <ul>
            <li>
              <strong>Strictly necessary</strong> — required for core functionality such as
              security, anti-spam protection, form submission, and storing your cookie choices. These
              cannot be switched off.
            </li>
            <li>
              <strong>Analytics &amp; performance</strong> — help us measure and improve how the
              site performs and is used. Set only with your consent.
            </li>
            <li>
              <strong>Marketing &amp; media</strong> — support advertising and campaign measurement.
              Set only with your consent.
            </li>
          </ul>
        </section>

        <hr className="legal-divider" />

        <section className="legal-section" id="cookies-we-use">
          <div className="legal-section-num">04</div>
          <h2>Cookies we use</h2>
          <p>
            The table below lists the main cookies and technologies used on this site. Exact names
            and durations may vary as providers update their services.
          </p>
          <div className="cookie-table-wrap">
            <table className="cookie-table">
              <thead>
                <tr>
                  <th>Cookie / technology</th>
                  <th>Provider</th>
                  <th>Category</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>arcstone_consent</td>
                  <td>Arcstone (first party)</td>
                  <td>Strictly necessary</td>
                  <td>Stores your cookie consent choices.</td>
                  <td>180 days</td>
                </tr>
                <tr>
                  <td>PHP session cookie</td>
                  <td>Arcstone (first party)</td>
                  <td>Strictly necessary</td>
                  <td>Maintains session and CSRF protection for form submissions.</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Arcstone (first party)</td>
                  <td>Strictly necessary</td>
                  <td>Remembers your light/dark display preference.</td>
                  <td>Persistent (local storage)</td>
                </tr>
                <tr>
                  <td>_ga, _ga_*, _gid</td>
                  <td>Google Analytics (via Google Tag Manager)</td>
                  <td>Analytics &amp; performance</td>
                  <td>Measures site usage and distinguishes visitors.</td>
                  <td>Up to 2 years</td>
                </tr>
                <tr>
                  <td>_dd_s</td>
                  <td>Datadog</td>
                  <td>Analytics &amp; performance</td>
                  <td>Real-user monitoring and performance/session analysis.</td>
                  <td>15 minutes (rolling)</td>
                </tr>
                <tr>
                  <td>Advertising cookies</td>
                  <td>Tags managed via Google Tag Manager</td>
                  <td>Marketing &amp; media</td>
                  <td>Advertising and campaign measurement, where enabled.</td>
                  <td>Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="legal-divider" />

        <section className="legal-section" id="third-parties">
          <div className="legal-section-num">05</div>
          <h2>Third-party cookies</h2>
          <p>
            Some cookies are set by third parties that provide services on our behalf, including
            Google (Tag Manager and Analytics) and Datadog. These providers may process data outside
            your country. We recommend reviewing their respective privacy and cookie notices for
            further detail on how they use information.
          </p>
        </section>

        <hr className="legal-divider" />

        <section className="legal-section" id="managing">
          <div className="legal-section-num">06</div>
          <h2>Managing your preferences</h2>
          <p>
            You can accept or reject non-essential cookies, or set per-category preferences, using
            our{' '}
            <button
              type="button"
              className="cookie-link footer-cookie-settings"
              onClick={openPreferences}
            >
              cookie settings
            </button>
            . You can also control cookies through your browser settings, including deleting existing
            cookies and blocking future ones. Note that blocking strictly necessary cookies may
            affect how the site functions.
          </p>
        </section>

        <hr className="legal-divider" />

        <section className="legal-section" id="changes">
          <div className="legal-section-num">07</div>
          <h2>Changes to this policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in the cookies we
            use or for operational, legal, or regulatory reasons. When we make material changes, we
            will update the “last updated” date and, where appropriate, ask for your consent again.
          </p>
        </section>

        <hr className="legal-divider" />

        <section className="legal-section" id="contact">
          <div className="legal-section-num">08</div>
          <h2>Contact us</h2>
          <p>
            For more information about how we handle personal data, please see our{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>. If you have questions about this Cookie
            Policy, contact us using the details below.
          </p>
        </section>

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
