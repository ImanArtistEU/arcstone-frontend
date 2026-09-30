import React, { useEffect } from 'react';
import heroHtml from './templates/WaitlistHeroContent.html?raw';
import { WaitlistForm } from '../components/WaitlistForm';

export const Waitlist: React.FC = () => {
  useEffect(() => {
    document.title = 'Request Early Access | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-waitlist">
      <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <section className="section" style={{ padding: '60px 0 100px 0' }}>
        <div className="container w-container">
          <WaitlistForm />
        </div>
      </section>
    </div>
  );
};
