import React, { useEffect } from 'react';
import htmlContent from './templates/AboutUsContent.html?raw';

export const AboutUs: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-about-us" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
