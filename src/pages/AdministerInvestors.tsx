import React, { useEffect } from 'react';
import htmlContent from './templates/AdministerInvestorsContent.html?raw';

export const AdministerInvestors: React.FC = () => {
  useEffect(() => {
    document.title = 'Administer Investors | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-administer-investors" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
