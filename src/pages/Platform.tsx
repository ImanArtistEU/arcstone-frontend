import React, { useEffect } from 'react';
import htmlContent from './templates/PlatformContent.html?raw';

export const Platform: React.FC = () => {
  useEffect(() => {
    document.title = 'Platform Overview | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-platform" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
