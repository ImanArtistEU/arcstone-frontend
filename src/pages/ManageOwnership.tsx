import React, { useEffect } from 'react';
import htmlContent from './templates/ManageOwnershipContent.html?raw';

export const ManageOwnership: React.FC = () => {
  useEffect(() => {
    document.title = 'Manage Ownership | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return <div id="page-manage-ownership" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
