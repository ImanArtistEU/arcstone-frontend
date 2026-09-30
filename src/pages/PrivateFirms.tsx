import React, { useEffect } from 'react';
import htmlContent from './templates/PrivateFirmsContent.html?raw';

export const PrivateFirms: React.FC = () => {
  useEffect(() => {
    document.title = 'For Private Firms | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-private-firms" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
