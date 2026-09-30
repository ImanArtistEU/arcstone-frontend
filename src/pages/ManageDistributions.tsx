import React, { useEffect } from 'react';
import htmlContent from './templates/ManageDistributionsContent.html?raw';

export const ManageDistributions: React.FC = () => {
  useEffect(() => {
    document.title = 'Manage Distributions | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-manage-distributions" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
