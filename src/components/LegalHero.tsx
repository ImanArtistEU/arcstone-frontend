import React from 'react';

interface LegalHeroProps {
  eyebrow?: string;
  title: string;
  metaText?: string;
}

export const LegalHero: React.FC<LegalHeroProps> = ({
  eyebrow = 'Legal',
  title,
  metaText = 'Coming soon',
}) => {
  return (
    <div className="legal-page-hero" data-hero="dark">
      <div className="legal-hero-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/wf/6491ab1c780fa954eb9a3f02_Gradient-poster-00001.jpg"
        >
          <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.mp4" type="video/mp4" />
          <source src="/wf/6491ab1c780fa954eb9a3f02_Gradient-transcode.webm" type="video/webm" />
        </video>
      </div>
      <div className="legal-hero-scrim" />
      <div className="legal-hero-inner">
        <div className="legal-eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {metaText && (
          <div className="legal-meta">
            <span>{metaText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
