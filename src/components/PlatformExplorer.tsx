import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type ExplorerTab = 'captable' | 'workflows' | 'waterfall' | 'governance';
type ClassFilter = 'all' | 'common' | 'preferred' | 'options';

interface Shareholder {
  id: string;
  name: string;
  type: string;
  category: 'common' | 'preferred' | 'options';
  shares: number;
  ownership: string;
  instrument: string;
  status: 'Verified' | 'Active' | 'Vesting';
}

const shareholdersData: Shareholder[] = [
  { id: 'SH-01', name: 'Founding Team', type: 'Common Equity', category: 'common', shares: 5500000, ownership: '55.00%', instrument: 'Founders Agreement (SHA §4)', status: 'Active' },
  { id: 'SH-02', name: 'Index & Institutional Partners', type: 'Series A Preferred', category: 'preferred', shares: 2000000, ownership: '20.00%', instrument: 'Series A Subscription (1x Liq Pref)', status: 'Verified' },
  { id: 'SH-03', name: 'Early Angel Syndicate', type: 'Seed Preferred', category: 'preferred', shares: 1200000, ownership: '12.00%', instrument: 'SAFE Conversion Notice #12', status: 'Verified' },
  { id: 'SH-04', name: 'Employee Option Pool (ESOP)', type: 'Stock Options', category: 'options', shares: 1000000, ownership: '10.00%', instrument: '2025 ESOP Rules & Grant Deeds', status: 'Vesting' },
  { id: 'SH-05', name: 'Strategic Advisory Council', type: 'Common Warrants', category: 'common', shares: 300000, ownership: '3.00%', instrument: 'Advisory Warrant Agreement', status: 'Active' },
];

export const PlatformExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('captable');
  const [classFilter, setClassFilter] = useState<ClassFilter>('all');
  const [exitValuation, setExitValuation] = useState<number>(35); // in millions
  const [workflowStep, setWorkflowStep] = useState<number>(3); // 1 to 4
  const [govFilter, setGovFilter] = useState<'all' | 'board' | 'shareholder'>('all');

  // Waterfall calculation simulation
  const seriesAInvested = 8.0; // €8.0M invested
  const seedInvested = 2.5; // €2.5M invested
  const totalSeniorPref = seriesAInvested + seedInvested; // €10.5M

  const seriesAPrefPayout = Math.min(exitValuation, seriesAInvested);
  const seedPrefPayout = Math.min(Math.max(0, exitValuation - seriesAInvested), seedInvested);
  const remainingProceeds = Math.max(0, exitValuation - totalSeniorPref);

  const seriesAParticipation = remainingProceeds * 0.20;
  const seedParticipation = remainingProceeds * 0.12;
  const esopPayout = remainingProceeds * 0.10;
  const commonPayout = remainingProceeds * 0.58;

  const seriesATotal = (seriesAPrefPayout + seriesAParticipation).toFixed(2);
  const seedTotal = (seedPrefPayout + seedParticipation).toFixed(2);
  const commonTotal = commonPayout.toFixed(2);
  const esopTotal = esopPayout.toFixed(2);

  // Percentages for stacked waterfall distribution bar
  const totalVal = Math.max(1, exitValuation);
  const seriesAPct = Math.min(100, Math.max(0, ((parseFloat(seriesATotal) / totalVal) * 100))).toFixed(1);
  const seedPct = Math.min(100, Math.max(0, ((parseFloat(seedTotal) / totalVal) * 100))).toFixed(1);
  const esopPct = Math.min(100, Math.max(0, ((parseFloat(esopTotal) / totalVal) * 100))).toFixed(1);
  const commonPct = Math.min(100, Math.max(0, (100 - parseFloat(seriesAPct) - parseFloat(seedPct) - parseFloat(esopPct)))).toFixed(1);

  const filteredShareholders = classFilter === 'all'
    ? shareholdersData
    : shareholdersData.filter(s => s.category === classFilter);

  const workflowSteps = [
    { step: 1, title: 'Term Sheet Allocation', subtitle: 'Electronic allocation reservation & lock' },
    { step: 2, title: 'KYC & Accreditation', subtitle: 'Institutional beneficial ownership passport' },
    { step: 3, title: 'Deed Counter-Signature', subtitle: 'Qualified electronic execution & escrow' },
    { step: 4, title: 'Cap Table Settlement', subtitle: 'Dual-register share issuance & stamp' },
  ];

  const workflowLogs = [
    {
      time: '14:20:12 UTC',
      tag: 'ALLOCATION_RESERVED',
      text: 'Series A term sheet allocation locked for Index & Institutional Partners. €2,000,000 ticket allocated at €2.450/share valuation benchmark.',
    },
    {
      time: '14:21:45 UTC',
      tag: 'PASSPORT_STAMPED',
      text: 'Institutional KYC/AML verified against European register. Beneficial ownership passport certified. Authorized signatories validated.',
    },
    {
      time: '14:22:30 UTC',
      tag: 'DEED_EXECUTED',
      text: 'Shareholder Agreement amendment and Subscription Deed executed via qualified e-signature. Cryptographic hash stamped into corporate record.',
    },
    {
      time: '14:23:02 UTC',
      tag: 'CAP_TABLE_RECONCILED',
      text: 'Escrow confirmation received. 816,326 Series A Preferred shares minted. Cap table, voting ledger, and register updated in real time.',
    },
  ];

  const governanceRecords = [
    {
      id: 'RES-2026-04',
      type: 'board',
      title: 'Adoption of 2026 ESOP Pool Expansion Scheme',
      quorum: '100.0% Quorum',
      voteBreakdown: '100% In Favor (3/3 Directors)',
      date: '18 May 2026',
      hash: 'sha256: 9b24...f18a',
      status: 'Ratified & Bound',
    },
    {
      id: 'RES-2026-03',
      type: 'shareholder',
      title: 'Series A Secondary Share Transfer Approval & Right of First Refusal Waiver',
      quorum: '84.2% Quorum',
      voteBreakdown: '84.2% In Favor • 15.8% Abstained',
      date: '02 April 2026',
      hash: 'sha256: 4e71...90cc',
      status: 'Ratified & Bound',
    },
    {
      id: 'RES-2026-02',
      type: 'shareholder',
      title: 'Appointment of External Supervisory Auditor & Financial Statements Review',
      quorum: '92.0% Quorum',
      voteBreakdown: '92.0% In Favor • 8.0% Abstained',
      date: '14 January 2026',
      hash: 'sha256: d83a...33ee',
      status: 'Ratified & Bound',
    },
  ];

  const filteredGov = govFilter === 'all'
    ? governanceRecords
    : governanceRecords.filter(r => r.type === govFilter);

  return (
    <div
      className="platform-explorer-container"
      style={{
        background: 'linear-gradient(180deg, #08071a 0%, #060814 60%, #05080f 100%)',
        border: '1px solid #1e1a2e',
        borderRadius: '16px',
        padding: 'clamp(20px, 3.5vw, 40px)',
        color: '#ffffff',
        margin: '0 auto',
        maxWidth: '1200px',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.35)',
      }}
    >
      {/* ── Terminal Cockpit Status Bar ───────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '16px',
          marginBottom: '28px',
          borderBottom: '1px solid #1e1a2e',
          fontSize: '11px',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          color: '#94a3b8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.28)',
              color: '#4ade80',
              fontWeight: 600,
              fontSize: '10.5px',
              letterSpacing: '0.04em',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 6px #4ade80',
              }}
            />
            LIVE RECONCILIATION
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#c7d2fe' }}>ARC-CORE v2.4 // OWNERSHIP ENGINE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '10.5px' }}>
          <span style={{ color: '#64748b' }}>SPEC: ISO-RECORD-2026</span>
          <span style={{ color: '#475569' }}>•</span>
          <span style={{ color: '#64748b' }}>LATENCY: &lt;120ms</span>
          <span style={{ color: '#475569' }}>•</span>
          <span style={{ color: '#818cf8' }}>DUAL-REGISTER SYNC</span>
        </div>
      </div>

      {/* ── Explorer Header Block ─────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#b1a1ed',
            background: 'rgba(177, 161, 237, 0.08)',
            border: '1px solid rgba(177, 161, 237, 0.2)',
            padding: '3px 10px',
            borderRadius: '999px',
            marginBottom: '14px',
          }}
        >
          Institutional Platform Preview
        </div>
        <h2
          style={{
            fontSize: 'clamp(24px, 3.4vw, 38px)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 12px 0',
          }}
        >
          The Arcstone Ownership Engine
        </h2>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          Experience how Arcstone binds legal documents, live cap tables, investor workflows, and lifecycle distributions into a single continuous source of institutional truth.
        </p>
      </div>

      {/* ── Institutional Segmented Navigation Controller ─────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '8px',
          marginBottom: '28px',
          padding: '6px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px solid #1e1a2e',
        }}
      >
        {[
          { id: 'captable', index: '01', title: 'Cap Table Truth', note: 'Continuous Legal Sync' },
          { id: 'workflows', index: '02', title: 'Investor Workflows', note: '4-Stage Issuance Pipeline' },
          { id: 'waterfall', index: '03', title: 'Waterfall Simulator', note: 'Real-time Liquidity Model' },
          { id: 'governance', index: '04', title: 'Governance Ledger', note: 'Cryptographic Audit Trail' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ExplorerTab)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '12px 14px',
                borderRadius: '8px',
                background: isActive ? 'linear-gradient(145deg, #16132a 0%, #0e0d24 100%)' : 'transparent',
                border: isActive ? '1px solid #818cf8' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 2px 12px rgba(99, 102, 241, 0.2)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
                <span
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isActive ? '#818cf8' : '#64748b',
                  }}
                >
                  {tab.index}
                </span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#818cf8',
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                  marginBottom: '2px',
                }}
              >
                {tab.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: isActive ? '#c7d2fe' : '#64748b',
                }}
              >
                {tab.note}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Main Interactive Screen Frame ─────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0b0917 0%, #080718 100%)',
          border: '1px solid #1e1a2e',
          borderRadius: '12px',
          padding: 'clamp(18px, 3vw, 28px)',
          minHeight: '440px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* ═════════════════════════════════════════════════════════════
            TAB 1: CAP TABLE TRUTH
            ═════════════════════════════════════════════════════════════ */}
        {activeTab === 'captable' && (
          <div>
            {/* Top Metric Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #1e1a2e',
                }}
              >
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Fully Diluted Capital
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '6px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  10,000,000
                </div>
                <div style={{ fontSize: '11.5px', color: '#4ade80', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80' }}></span> 100.0% Reconciled
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #1e1a2e',
                }}
              >
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Series A Benchmark
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '6px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  €24.50M
                </div>
                <div style={{ fontSize: '11.5px', color: '#b1a1ed', marginTop: '4px' }}>
                  €2.450 / share (Post-Money)
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #1e1a2e',
                }}
              >
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Registered Stakeholders
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '6px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  18 Entities
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>
                  14 Institutional / 4 Common
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #1e1a2e',
                }}
              >
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Dual-Register Sync
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#4ade80', marginTop: '6px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  100% Binding
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>
                  SHA, Articles &amp; Deeds Linked
                </div>
              </div>
            </div>

            {/* Filter Controls Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Securities (5)' },
                  { id: 'common', label: 'Common (2)' },
                  { id: 'preferred', label: 'Preferred (2)' },
                  { id: 'options', label: 'Options / ESOP (1)' },
                ].map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setClassFilter(f.id as ClassFilter)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: classFilter === f.id ? '1px solid #818cf8' : '1px solid #1e1a2e',
                      background: classFilter === f.id ? 'rgba(129, 140, 248, 0.14)' : 'rgba(255, 255, 255, 0.02)',
                      color: classFilter === f.id ? '#ffffff' : '#94a3b8',
                      transition: 'all 0.12s ease',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                REGISTER HASH: 0x8f2a...c014
              </div>
            </div>

            {/* Cap Table Grid */}
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #1e1a2e' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid #1e1a2e', color: '#94a3b8', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <th style={{ padding: '12px 14px' }}>ID</th>
                    <th style={{ padding: '12px 14px' }}>Shareholder Entity</th>
                    <th style={{ padding: '12px 14px' }}>Security Class</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Shares</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Ownership</th>
                    <th style={{ padding: '12px 14px' }}>Linked Legal Instrument</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShareholders.map((row, idx) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        fontSize: '13px',
                        background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 14px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '11px', color: '#818cf8' }}>
                        {row.id}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#ffffff' }}>
                        {row.name}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 500,
                            background: row.category === 'preferred'
                              ? 'rgba(129, 140, 248, 0.12)'
                              : row.category === 'options'
                              ? 'rgba(251, 191, 36, 0.10)'
                              : 'rgba(255, 255, 255, 0.05)',
                            color: row.category === 'preferred'
                              ? '#c7d2fe'
                              : row.category === 'options'
                              ? '#fbbf24'
                              : '#ffffff',
                            border: `1px solid ${
                              row.category === 'preferred'
                                ? 'rgba(129, 140, 248, 0.3)'
                                : row.category === 'options'
                                ? 'rgba(251, 191, 36, 0.3)'
                                : 'rgba(255, 255, 255, 0.12)'
                            }`,
                          }}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#ffffff', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontVariantNumeric: 'tabular-nums' }}>
                        {row.shares.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600, color: '#ffffff', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                        {row.ownership}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8', fontSize: '12px' }}>
                        <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>{row.instrument}</span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            background: row.status === 'Verified' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(129, 140, 248, 0.12)',
                            color: row.status === 'Verified' ? '#4ade80' : '#818cf8',
                            border: `1px solid ${row.status === 'Verified' ? 'rgba(16, 185, 129, 0.28)' : 'rgba(129, 140, 248, 0.28)'}`,
                          }}
                        >
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: row.status === 'Verified' ? '#4ade80' : '#818cf8' }} />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Meta Footnote */}
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                fontSize: '12px',
                color: '#64748b',
              }}
            >
              <div>* Continuous double-entry reconciliation updates cap table positions immediately upon counter-signed deeds.</div>
              <Link to="/manage-ownership" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 500 }}>
                Explore Ownership Management Architecture →
              </Link>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            TAB 2: INVESTOR WORKFLOWS (EXECUTION PIPELINE)
            ═════════════════════════════════════════════════════════════ */}
        {activeTab === 'workflows' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Fundraising Execution Pipeline
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', margin: '2px 0 0' }}>
                  Institutional Capital Call &amp; Issuance Stepper
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWorkflowStep((prev) => (prev < 4 ? prev + 1 : 1))}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#6366f1',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '12.5px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {workflowStep < 4 ? 'Simulate Next Stage →' : 'Restart Simulation ↺'}
              </button>
            </div>

            {/* 4 Stepper Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
                marginBottom: '24px',
              }}
            >
              {workflowSteps.map((s) => {
                const isPassed = workflowStep > s.step;
                const isCurrent = workflowStep === s.step;
                return (
                  <div
                    key={s.step}
                    onClick={() => setWorkflowStep(s.step)}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      background: isCurrent
                        ? 'rgba(99, 102, 241, 0.12)'
                        : isPassed
                        ? 'rgba(16, 185, 129, 0.06)'
                        : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isCurrent ? '#818cf8' : isPassed ? 'rgba(16, 185, 129, 0.35)' : '#1e1a2e'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          color: isCurrent ? '#818cf8' : isPassed ? '#4ade80' : '#64748b',
                        }}
                      >
                        STAGE 0{s.step}
                      </span>
                      {isPassed ? (
                        <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 600 }}>✓ STAMPED</span>
                      ) : isCurrent ? (
                        <span style={{ color: '#818cf8', fontSize: '11px', fontWeight: 600 }}>● IN PROGRESS</span>
                      ) : (
                        <span style={{ color: '#475569', fontSize: '11px' }}>QUEUED</span>
                      )}
                    </div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.4 }}>
                      {s.subtitle}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Split Execution Console */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {/* Left: Transaction Card */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '10px',
                  border: '1px solid #1e1a2e',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '8px' }}>
                  Transaction Entity Details
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '14px' }}>
                  Index &amp; Institutional Partners VI
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Allocated Commitment</span>
                    <span style={{ color: '#ffffff', fontWeight: 600, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>€2,000,000.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Security Entitlement</span>
                    <span style={{ color: '#c7d2fe', fontWeight: 500 }}>816,326 Series A Preferred</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '6px' }}>
                    <span style={{ color: '#94a3b8' }}>Benchmark Price</span>
                    <span style={{ color: '#ffffff', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>€2.450 / share</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: '#94a3b8' }}>Stage Authorization</span>
                    <span style={{ color: '#4ade80', fontWeight: 600 }}>Institutional Signature Ready</span>
                  </div>
                </div>
              </div>

              {/* Right: Live Audit Log Output */}
              <div
                style={{
                  background: '#070612',
                  borderRadius: '10px',
                  border: '1px solid #1e1a2e',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                      Live Execution Log
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#818cf8', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                      RECORD #{workflowStep} / 4
                    </span>
                  </div>

                  <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '11.5px', lineHeight: 1.6, color: '#c7d2fe' }}>
                    <span style={{ color: '#64748b' }}>[{workflowLogs[workflowStep - 1].time}]</span>{' '}
                    <span style={{ color: '#818cf8', fontWeight: 600 }}>{workflowLogs[workflowStep - 1].tag}</span>:
                    <div style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: '4px', fontSize: '12px', fontFamily: 'inherit' }}>
                      {workflowLogs[workflowStep - 1].text}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Verification Seal: VALID</span>
                  <Link to="/raise-capital" style={{ color: '#818cf8', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>
                    Raise Capital Flow Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            TAB 3: WATERFALL SIMULATION (LIQUIDITY MODEL)
            ═════════════════════════════════════════════════════════════ */}
        {activeTab === 'waterfall' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Real-time Distribution Engine
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', margin: '2px 0 0' }}>
                  Liquidity &amp; Exit Waterfall Simulator
                </h3>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Senior Preference Pool: <strong style={{ color: '#ffffff' }}>€10.50M</strong>
              </div>
            </div>

            {/* Slider & Preset Controls */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '10px',
                border: '1px solid #1e1a2e',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: '#c7d2fe' }}>Simulated Exit / M&amp;A Transaction Value:</span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  €{exitValuation}.00M
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={exitValuation}
                onChange={(e) => setExitValuation(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#818cf8',
                  cursor: 'pointer',
                  height: '6px',
                  borderRadius: '3px',
                }}
              />

              {/* Quick Preset Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { val: 15, label: '€15M (Downside)' },
                    { val: 35, label: '€35M (Base Case)' },
                    { val: 65, label: '€65M (Target)' },
                    { val: 100, label: '€100M (Growth)' },
                  ].map(p => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setExitValuation(p.val)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: exitValuation === p.val ? '1px solid #818cf8' : '1px solid #1e1a2e',
                        background: exitValuation === p.val ? 'rgba(129, 140, 248, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                        color: exitValuation === p.val ? '#ffffff' : '#94a3b8',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  CALCULATED VIA 1x NON-PARTICIPATING PREFERENCE
                </div>
              </div>
            </div>

            {/* Stacked Allocation Distribution Bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#94a3b8', marginBottom: '8px' }}>
                <span>Proceeds Allocation Breakdown</span>
                <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#4ade80' }}>
                  ● 100.0% RECONCILED ACCROSS STAKEHOLDERS
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  height: '18px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#161320',
                  border: '1px solid #1e1a2e',
                }}
              >
                <div style={{ width: `${seriesAPct}%`, background: '#6366f1', transition: 'width 0.2s ease' }} title={`Series A: ${seriesAPct}%`} />
                <div style={{ width: `${seedPct}%`, background: '#38bdf8', transition: 'width 0.2s ease' }} title={`Seed: ${seedPct}%`} />
                <div style={{ width: `${esopPct}%`, background: '#fbbf24', transition: 'width 0.2s ease' }} title={`ESOP: ${esopPct}%`} />
                <div style={{ width: `${commonPct}%`, background: '#10b981', transition: 'width 0.2s ease' }} title={`Common: ${commonPct}%`} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '6px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#6366f1' }} /> Series A ({seriesAPct}%)
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#38bdf8' }} /> Seed ({seedPct}%)
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#fbbf24' }} /> ESOP Pool ({esopPct}%)
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10b981' }} /> Common / Founders ({commonPct}%)
                </span>
              </div>
            </div>

            {/* 4 Waterfall Outcome Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.025)', padding: '16px', borderRadius: '10px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: '#818cf8', textTransform: 'uppercase', fontWeight: 600 }}>Series A Proceeds</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  €{seriesATotal}M
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>
                  {(parseFloat(seriesATotal) / 8.0).toFixed(2)}x MOIC on €8M Invested
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.025)', padding: '16px', borderRadius: '10px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 600 }}>Seed Preferred Proceeds</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  €{seedTotal}M
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>
                  {(parseFloat(seedTotal) / 2.5).toFixed(2)}x MOIC on €2.5M Invested
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.025)', padding: '16px', borderRadius: '10px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: '#10b981', textTransform: 'uppercase', fontWeight: 600 }}>Common &amp; Founders</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  €{commonTotal}M
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>
                  58% Net Participation Pool
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.025)', padding: '16px', borderRadius: '10px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 600 }}>Employee ESOP Value</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  €{esopTotal}M
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>
                  10% Net Pool for 1M Options
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <Link to="/manage-distributions" style={{ color: '#818cf8', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>
                Explore Waterfall &amp; Distribution Architecture →
              </Link>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            TAB 4: GOVERNANCE & COMPLIANCE LEDGER
            ═════════════════════════════════════════════════════════════ */}
        {activeTab === 'governance' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Corporate Governance Ledger
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', margin: '2px 0 0' }}>
                  Resolutions, Approvals &amp; Cryptographic Audit Trail
                </h3>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'all', label: 'All Records (3)' },
                  { id: 'board', label: 'Board Actions (1)' },
                  { id: 'shareholder', label: 'Shareholder Votes (2)' },
                ].map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGovFilter(g.id as 'all' | 'board' | 'shareholder')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: govFilter === g.id ? '1px solid #818cf8' : '1px solid #1e1a2e',
                      background: govFilter === g.id ? 'rgba(129, 140, 248, 0.16)' : 'rgba(255, 255, 255, 0.02)',
                      color: govFilter === g.id ? '#ffffff' : '#94a3b8',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Governance Resolution Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredGov.map((res) => (
                <div
                  key={res.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '10px',
                    border: '1px solid #1e1a2e',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span
                          style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            color: '#818cf8',
                            background: 'rgba(129, 140, 248, 0.12)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          {res.id}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{res.date}</span>
                      </div>
                      <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#ffffff' }}>
                        {res.title}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          background: 'rgba(16, 185, 129, 0.12)',
                          color: '#4ade80',
                          border: '1px solid rgba(16, 185, 129, 0.28)',
                        }}
                      >
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4ade80' }} />
                        {res.status}
                      </span>
                    </div>
                  </div>

                  {/* Quorum and Hash Row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: '#c7d2fe' }}>{res.voteBreakdown}</span>
                      <span style={{ color: '#475569' }}>•</span>
                      <span style={{ color: '#94a3b8' }}>{res.quorum}</span>
                    </div>
                    <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '11px', color: '#64748b' }}>
                      {res.hash}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <Link to="/administer-investors" style={{ color: '#818cf8', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>
                Explore Institutional Governance &amp; Administration →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Explorer Bottom Action & Reassurance Bar ──────────────────── */}
      <div
        style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid #1e1a2e',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818cf8' }} />
            CONTINUOUS DOUBLE-ENTRY RECONCILIATION
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818cf8' }} />
            LEGAL DEED SYNCHRONIZATION
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link
            to="/waitlist"
            className="as-btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '13px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Book a Live Demo →
          </Link>
          <Link
            to="/platform"
            className="as-btn-ghost"
            style={{
              padding: '9px 18px',
              fontSize: '13px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Platform Architecture
          </Link>
        </div>
      </div>
    </div>
  );
};
