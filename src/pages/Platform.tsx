import React, { useEffect } from 'react';
import htmlContent from './templates/PlatformContent.html?raw';
import { PlatformExplorer } from '../components/PlatformExplorer';

const [topHtml, bottomHtml] = htmlContent.split('<!-- PLATFORM_EXPLORER_MOUNT -->');

export const Platform: React.FC = () => {
  useEffect(() => {
    document.title = 'Platform Overview | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-platform" className="wf">
      <div dangerouslySetInnerHTML={{ __html: topHtml || '' }} />
      <section className="section" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        <div className="container w-container">
          <PlatformExplorer />
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: bottomHtml || '' }} />
    </div>
  );
};
