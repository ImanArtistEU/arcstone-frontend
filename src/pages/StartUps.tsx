import React, { useEffect } from 'react';
import htmlContent from './templates/StartUpsContent.html?raw';

export const StartUps: React.FC = () => {
  useEffect(() => {
    document.title = 'For Start-ups | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-start-ups" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
