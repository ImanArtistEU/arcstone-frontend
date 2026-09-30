import React, { useEffect } from 'react';
import htmlContent from './templates/RaiseCapitalContent.html?raw';

export const RaiseCapital: React.FC = () => {
  useEffect(() => {
    document.title = 'Raise Capital | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-raise-capital" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
