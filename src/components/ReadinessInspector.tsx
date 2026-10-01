import React, { useState } from 'react';

interface AuditItem {
  id: string;
  category: 'Convertibles' | 'Identity' | 'Governance' | 'Vesting';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  status: 'Needs Action' | 'Verified';
  instrument: string;
}

const initialAuditItems: AuditItem[] = [
  {
    id: 'aud-1',
    category: 'Convertibles',
    title: 'Unlinked Series Seed SAFE Conversion Deed',
    description: 'Notice of conversion for €750k SAFE syndicate lacks cryptographic hash linkage to current Articles of Association.',
    impact: 'High',
    status: 'Needs Action',
    instrument: 'SAFE Instrument #SE-04',
  },
  {
    id: 'aud-2',
    category: 'Governance',
    title: 'Series A Shareholder Quorum Consent',
    description: 'Adoption resolution dated 14 Jan 2026 signed by 87.4% voting quorum. Fully stamped and countersigned.',
    impact: 'Low',
    status: 'Verified',
    instrument: 'Board Resolution 2026-01',
  },
  {
    id: 'aud-3',
    category: 'Vesting',
    title: 'ESOP Pool Grant Schedule Synchronization',
    description: '1,000,000 unallocated options reconciled against 2025 Approved Share Scheme rules.',
    impact: 'Medium',
    status: 'Verified',
    instrument: 'ESOP Plan Deed v2.1',
  },
  {
    id: 'aud-4',
    category: 'Identity',
    title: 'Institutional Lead KYC / Beneficial Ownership Passport',
    description: 'Verified ultimate beneficial owner (UBO) declaration on file for Index Partners fund vehicle.',
    impact: 'High',
    status: 'Verified',
    instrument: 'KYC Certificate #IE-9942',
  },
];

export const ReadinessInspector: React.FC = () => {
  const [items, setItems] = useState<AuditItem[]>(initialAuditItems);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Needs Action' | 'Verified'>('All');
  const [isResolving, setIsResolving] = useState(false);

  const totalItems = items.length;
  const verifiedCount = items.filter(i => i.status === 'Verified').length;
  const score = Math.round((verifiedCount / totalItems) * 100);

  const handleResolveAction = (id: string) => {
    setIsResolving(true);
    setTimeout(() => {
      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: 'Verified' as const } : item
        )
      );
      setIsResolving(false);
    }, 400);
  };

  const filteredItems = items.filter(item => {
    if (activeFilter === 'All') return true;
    return item.status === activeFilter;
  });

  return (
    <div
      className="readiness-inspector-container"
      style={{
        margin: '64px 0',
        padding: '36px',
        backgroundColor: '#0a0e1c',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#f8fafc',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '100px', backgroundColor: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: '14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#818cf8' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c7d2fe' }}>Real-Time Diligence Engine</span>
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Live Cap Table Readiness Inspector
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, maxWidth: '580px', lineHeight: '1.6' }}>
            Audit instrument linkages, verify corporate authority, and ensure round-closing readiness before counsel or auditors review your share register.
          </p>
        </div>

        {/* Readiness Score Gauge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px 24px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Diligence Score</div>
            <div style={{ fontSize: '13px', color: score === 100 ? '#4ade80' : '#fbbf24', fontWeight: 500, marginTop: '2px' }}>
              {score === 100 ? 'Audit Ready' : '1 Item Pending'}
            </div>
          </div>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `3px solid ${score === 100 ? '#22c55e' : '#f59e0b'}`,
              backgroundColor: 'rgba(0,0,0,0.2)',
              fontSize: '20px',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            {score}%
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
        {(['All', 'Needs Action', 'Verified'] as const).map(tab => {
          const count = tab === 'All' ? totalItems : items.filter(i => i.status === tab).length;
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab}</span>
              <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '10px', backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)' }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Checklist items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.map(item => {
          const isNeedsAction = item.status === 'Needs Action';
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                backgroundColor: isNeedsAction ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isNeedsAction ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.06)'}`,
                borderRadius: '10px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: '1 1 360px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: isNeedsAction ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.15)',
                      color: isNeedsAction ? '#f87171' : '#4ade80',
                    }}
                  >
                    {item.status}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>•</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.category}</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>•</span>
                  <span style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: 'monospace' }}>{item.instrument}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
                  {item.description}
                </div>
              </div>

              <div>
                {isNeedsAction ? (
                  <button
                    onClick={() => handleResolveAction(item.id)}
                    disabled={isResolving}
                    style={{
                      backgroundColor: '#6366f1',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: isResolving ? 'wait' : 'pointer',
                      transition: 'background-color 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isResolving ? 'Linking Instrument...' : 'Link Conversion Instrument →'}
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#4ade80' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Audited</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

