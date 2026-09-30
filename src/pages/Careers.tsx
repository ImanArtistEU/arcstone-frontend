import React, { useEffect } from 'react';
import htmlContent from './templates/CareersContent.html?raw';

export const Careers: React.FC = () => {
  useEffect(() => {
    document.title = 'Careers | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-careers" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
