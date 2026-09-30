import React, { useEffect } from 'react';
import htmlContent from './templates/HomeContent.html?raw';

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Arcstone | Equity Management & Cap Table Platform';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-home" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
