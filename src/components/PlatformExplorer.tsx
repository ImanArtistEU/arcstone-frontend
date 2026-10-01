import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type ExplorerTab = 'captable' | 'workflows' | 'waterfall' | 'governance';

interface Shareholder {
  name: string;
  type: string;
  shares: number;
  ownership: string;
  instrument: string;
  status: 'Verified' | 'Active' | 'Vesting';
}

const initialShareholders: Shareholder[] = [
  { name: 'Founding Team', type: 'Common Equity', shares: 5500000, ownership: '55.0%', instrument: 'Founders Agreement (SHA §4)', status: 'Active' },
  { name: 'Index & Institutional Partners', type: 'Series A Preferred', shares: 2000000, ownership: '20.0%', instrument: 'Series A Subscription (1x Liq)', status: 'Verified' },
  { name: 'Early Angel Syndicate', type: 'Seed Preferred', shares: 1200000, ownership: '12.0%', instrument: 'SAFE Conversion Notice #12', status: 'Verified' },
  { name: 'Employee Option Pool (ESOP)', type: 'Stock Options', shares: 1000000, ownership: '10.0%', instrument: '2025 ESOP Rules & Grant Deeds', status: 'Vesting' },
  { name: 'Strategic Advisory Council', type: 'Common Warrants', shares: 300000, ownership: '3.0%', instrument: 'Advisory Warrant Agreement', status: 'Active' },
];

export const PlatformExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('captable');
  const [exitValuation, setExitValuation] = useState<number>(35); // in millions
  const [workflowStep, setWorkflowStep] = useState<number>(3); // 1 to 4

  // Waterfall calculation simulation
  const seriesAPreference = 8; // €8M invested
  const seedPreference = 2.5; // €2.5M invested
  const totalPreference = seriesAPreference + seedPreference;
  const remainingForCommon = Math.max(0, exitValuation - totalPreference);
  const commonAndEsopShares = 6800000;
  const totalShares = 10000000;
  const commonPercentage = commonAndEsopShares / totalShares;
  const commonPayout = (remainingForCommon * commonPercentage).toFixed(1);
  const seriesAPayout = (seriesAPreference + (remainingForCommon * (2000000 / totalShares))).toFixed(1);

  return (
    <div className="platform-explorer-container" style={{
      background: 'linear-gradient(180deg, #08071a 0%, #05080f 100%)',
      border: '1px solid #1e1a2e',
      borderRadius: '20px',
      padding: 'clamp(24px, 4vw, 48px)',
      color: '#ffffff',
      margin: '0 auto',
      maxWidth: '1200px',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
    }}>
      {/* Explorer Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#b1a1ed',
          marginBottom: '12px',
        }}>
          Interactive Platform Preview
        </div>
        <h2 style={{
          fontSize: 'clamp(24px, 3.2vw, 40px)',
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          marginBottom: '12px',
        }}>
          The Arcstone Ownership Engine
        </h2>
        <p style={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: 'rgba(255, 255, 255, 0.68)',
          maxWidth: '680px',
          margin: '0 auto',
        }}>
          Experience how Arcstone unifies legal documents, live cap tables, investor workflows, and lifecycle distributions into a single living source of truth.
        </p>
      </div>

      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '32px',
        padding: '6px',
        background: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '12px',
        border: '1px solid #1e1a2e',
        maxWidth: '740px',
        margin: '0 auto 36px',
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('captable')}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            border: activeTab === 'captable' ? '1px solid rgba(177, 161, 237, 0.4)' : '1px solid transparent',
            background: activeTab === 'captable' ? 'rgba(177, 161, 237, 0.12)' : 'transparent',
            color: activeTab === 'captable' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.2s ease',
          }}
        >
          1. Cap Table Truth
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('workflows')}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            border: activeTab === 'workflows' ? '1px solid rgba(177, 161, 237, 0.4)' : '1px solid transparent',
            background: activeTab === 'workflows' ? 'rgba(177, 161, 237, 0.12)' : 'transparent',
            color: activeTab === 'workflows' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.2s ease',
          }}
        >
          2. Investor Workflows
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('waterfall')}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            border: activeTab === 'waterfall' ? '1px solid rgba(177, 161, 237, 0.4)' : '1px solid transparent',
            background: activeTab === 'waterfall' ? 'rgba(177, 161, 237, 0.12)' : 'transparent',
            color: activeTab === 'waterfall' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.2s ease',
          }}
        >
          3. Waterfall Simulation
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('governance')}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            border: activeTab === 'governance' ? '1px solid rgba(177, 161, 237, 0.4)' : '1px solid transparent',
            background: activeTab === 'governance' ? 'rgba(177, 161, 237, 0.12)' : 'transparent',
            color: activeTab === 'governance' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.2s ease',
          }}
        >
          4. Governance &amp; Audit
        </button>
      </div>

      {/* Main Interactive Screen */}
      <div style={{
        background: '#0b0914',
        border: '1px solid #1e1a2e',
        borderRadius: '16px',
        padding: 'clamp(20px, 3vw, 32px)',
        minHeight: '420px',
      }}>
        {/* TAB 1: CAP TABLE TRUTH */}
        {activeTab === 'captable' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fully Diluted Shares</div>
                <div style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>10,000,000</div>
                <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>● 100% Allocated</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Latest Round Price</div>
                <div style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>€2.45 / share</div>
                <div style={{ fontSize: '12px', color: '#b1a1ed', marginTop: '4px' }}>Series A Val: €24.5M</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stakeholders</div>
                <div style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>18 Registered</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>14 Institutional / 4 Common</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal Binding Status</div>
                <div style={{ fontSize: '22px', fontWeight: 600, color: '#10b981', marginTop: '4px' }}>100% Synced</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>SHA &amp; Articles Linked</div>
              </div>
            </div>

            {/* Cap Table Rows */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e1a2e', color: 'rgba(255,255,255,0.5)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <th style={{ padding: '12px 16px' }}>Shareholder</th>
                    <th style={{ padding: '12px 16px' }}>Security Class</th>
                    <th style={{ padding: '12px 16px' }}>Shares</th>
                    <th style={{ padding: '12px 16px' }}>Ownership</th>
                    <th style={{ padding: '12px 16px' }}>Linked Legal Instrument</th>
                    <th style={{ padding: '12px 16px' }}>Audit</th>
                  </tr>
                </thead>
                <tbody>
                  {initialShareholders.map((row, idx) => (
                    <tr key={idx} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      fontSize: '13px',
                      background: idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                    }}>
                      <td style={{ padding: '14px 16px', fontWeight: 500, color: '#ffffff' }}>{row.name}</td>
                      <td style={{ padding: '14px 16px', color: '#b1a1ed' }}>{row.type}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.85)', fontFamily: 'monospace' }}>{row.shares.toLocaleString()}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#ffffff' }}>{row.ownership}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                        <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>{row.instrument}</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 500,
                          background: row.status === 'Verified' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(177, 161, 237, 0.15)',
                          color: row.status === 'Verified' ? '#10b981' : '#b1a1ed',
                          border: `1px solid ${row.status === 'Verified' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(177, 161, 237, 0.3)'}`,
                        }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              <div>* Cap table balances update automatically upon signature and settlement verification.</div>
              <Link to="/manage-ownership" style={{ color: '#b1a1ed', textDecoration: 'none', fontWeight: 500 }}>
                Learn more about Ownership Management →
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: INVESTOR WORKFLOWS */}
        {activeTab === 'workflows' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', color: '#b1a1ed', marginBottom: '4px' }}>Fundraising Execution Pipeline</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Step-by-Step Capital Call &amp; Issuance</h3>
            </div>

            {/* Steps Progress */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '32px',
            }}>
              {[
                { step: 1, title: 'Term Sheet Allocation', desc: 'Pre-set allocation amounts & terms' },
                { step: 2, title: 'KYC / AML & Accredited', desc: 'Digital institutional passport' },
                { step: 3, title: 'Digital Execution', desc: 'SHA & deed counter-signatures' },
                { step: 4, title: 'Live Cap Table Issuance', desc: 'Automatic share entitlement grant' },
              ].map((s) => (
                <div
                  key={s.step}
                  onClick={() => setWorkflowStep(s.step)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: workflowStep >= s.step ? 'rgba(177, 161, 237, 0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${workflowStep === s.step ? '#b1a1ed' : workflowStep > s.step ? 'rgba(16, 185, 129, 0.5)' : '#1e1a2e'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: workflowStep >= s.step ? '#b1a1ed' : 'rgba(255,255,255,0.4)' }}>
                      STEP {s.step}
                    </span>
                    {workflowStep > s.step ? (
                      <span style={{ color: '#10b981', fontSize: '12px' }}>✓ Done</span>
                    ) : workflowStep === s.step ? (
                      <span style={{ color: '#b1a1ed', fontSize: '12px' }}>● Active</span>
                    ) : null}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Workflow Simulation Details */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '12px',
              border: '1px solid #1e1a2e',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Sample Investor Action</span>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>Index Ventures Capital VI — €2,000,000 Ticket</div>
                </div>
                <button
                  type="button"
                  onClick={() => setWorkflowStep((prev) => (prev < 4 ? prev + 1 : 1))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    color: '#08071a',
                    fontWeight: 600,
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {workflowStep < 4 ? 'Simulate Next Stage →' : 'Restart Workflow ↺'}
                </button>
              </div>

              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                {workflowStep === 1 && 'Terms and valuation confirmed with investor counsel. Allocation reserved in round room with electronic term sheet counter-signature.'}
                {workflowStep === 2 && 'Institutional entity documents and beneficial ownership verified under regulatory compliance standards. Verification certificate stamped.'}
                {workflowStep === 3 && 'Shareholder agreement, subscription deed, and power of attorney executed securely with qualified electronic signature.'}
                {workflowStep === 4 && 'Funds received in escrow. Arcstone automatically issues 816,326 Series A Preferred shares and updates the live company register.'}
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Link to="/raise-capital" style={{ color: '#b1a1ed', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>
                Explore Raise Capital Solutions →
              </Link>
            </div>
          </div>
        )}

        {/* TAB 3: WATERFALL SIMULATION */}
        {activeTab === 'waterfall' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: '#b1a1ed', marginBottom: '4px' }}>Real-time Distribution Engine</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                Liquidity &amp; Exit Waterfall Simulator
              </h3>
            </div>

            {/* Valuation Slider */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '12px',
              border: '1px solid #1e1a2e',
              padding: '20px',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Simulated Exit / Valuation Event:</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', fontFamily: 'monospace' }}>€{exitValuation}M</span>
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
                  accentColor: '#b1a1ed',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
                <span>€10M</span>
                <span>€35M (Baseline)</span>
                <span>€70M</span>
                <span>€100M</span>
              </div>
            </div>

            {/* Results Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: '#b1a1ed', textTransform: 'uppercase' }}>Series A Preferred</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>€{seriesAPayout}M</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>1x Liq Pref + Pro-rata Participation</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: '#10b981', textTransform: 'uppercase' }}>Founders &amp; Common Equity</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>€{commonPayout}M</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Net proceed entitlement</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid #1e1a2e' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Total Distributed</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>€{exitValuation}.0M</div>
                <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>● 100% Calculated &amp; Balanced</div>
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Link to="/manage-distributions" style={{ color: '#b1a1ed', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>
                Learn more about Waterfall Administration →
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: GOVERNANCE & COMPLIANCE */}
        {activeTab === 'governance' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: '#b1a1ed', marginBottom: '4px' }}>Corporate Governance Ledger</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                Resolutions, Board Approvals &amp; Compliance Audit
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { ref: 'RES-2026-04', title: 'Adoption of 2026 ESOP Scheme Extension', quorum: '100% Quorum', date: '18 May 2026', status: 'Approved & Stamped' },
                { ref: 'RES-2026-03', title: 'Series A Secondary Share Transfer Approval', quorum: '84.2% Voted', date: '02 April 2026', status: 'Approved & Stamped' },
                { ref: 'RES-2026-02', title: 'Appointment of External Supervisory Auditor', quorum: '92.0% Voted', date: '14 January 2026', status: 'Approved & Stamped' },
              ].map((res, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '10px',
                  border: '1px solid #1e1a2e',
                  padding: '14px 18px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}>
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#b1a1ed' }}>{res.ref}</span>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#ffffff', marginTop: '2px' }}>{res.title}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{res.quorum}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{res.date}</span>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}>
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Link to="/administer-investors" style={{ color: '#b1a1ed', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }}>
                Explore Investor Portal &amp; Administration →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Explorer Bottom CTA Bar */}
      <div style={{
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '1px solid #1e1a2e',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
          Ready to transition your company from fragmented tools to an institutional ownership system?
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link
            to="/waitlist"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: '#ffffff',
              color: '#08071a',
              fontWeight: 600,
              fontSize: '13px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            Book a live demo
          </Link>
          <Link
            to="/platform"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              fontWeight: 500,
              fontSize: '13px',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            Platform architecture →
          </Link>
        </div>
      </div>
    </div>
  );
};
