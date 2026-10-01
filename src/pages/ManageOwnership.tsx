import React, { useEffect } from 'react';
import htmlContent from './templates/ManageOwnershipContent.html?raw';
import { ReadinessInspector } from '../components/ReadinessInspector';

const [topHtml, bottomHtml] = htmlContent.split('<!-- READINESS_INSPECTOR_MOUNT -->');

export const ManageOwnership: React.FC = () => {
  useEffect(() => {
    document.title = 'Manage Ownership | Arcstone';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="page-manage-ownership" className="wf">
      <div dangerouslySetInnerHTML={{ __html: topHtml || '' }} />
      <div className="container w-container" style={{ padding: '0 24px' }}>
        <ReadinessInspector />
      </div>
      <div dangerouslySetInnerHTML={{ __html: bottomHtml || '' }} />
    </div>
  );
};
