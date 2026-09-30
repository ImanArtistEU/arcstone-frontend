import React, { useState } from 'react';
import { BookingCalendar } from './BookingCalendar';

export const WaitlistForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<string>('founder');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    capTableSize: '10-50',
    primaryGoal: 'cap-table-management',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wantsDemo, setWantsDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div className="wl-container" style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* Step Indicator */}
      <div
        className="wl-steps"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '40px',
          position: 'relative',
        }}
      >
        <div className={`wl-step ${step >= 1 ? 'wl-step-active' : ''} ${step > 1 ? 'wl-step-done' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
          <span className="wl-step-dot" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: step >= 1 ? '#4f46e5' : '#e2e8f0', color: step >= 1 ? '#fff' : '#64748b' }}>
            1
          </span>
          Profile
        </div>
        <div className={`wl-step ${step >= 2 ? 'wl-step-active' : ''} ${step > 2 ? 'wl-step-done' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
          <span className="wl-step-dot" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: step >= 2 ? '#4f46e5' : '#e2e8f0', color: step >= 2 ? '#fff' : '#64748b' }}>
            2
          </span>
          Company
        </div>
        <div className={`wl-step ${step >= 3 ? 'wl-step-active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
          <span className="wl-step-dot" style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: step >= 3 ? '#4f46e5' : '#e2e8f0', color: step >= 3 ? '#fff' : '#64748b' }}>
            3
          </span>
          Access
        </div>
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="wl-step-panel" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>
            Select your profile
          </h3>
          <p style={{ color: '#64748b', fontSize: '14.5px', marginBottom: '24px' }}>
            We personalize your onboarding depending on whether you issue equity, invest, or administer.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { id: 'founder', title: 'Start-up & Founder', desc: 'Managing cap table, option pools, and future funding rounds.' },
              { id: 'firm', title: 'Private Firm / SME', desc: 'Administering distributions, investor registers, and corporate actions.' },
              { id: 'investor', title: 'Investor / Family Office', desc: 'Tracking holdings, digital certificates, and secondary liquidity.' },
            ].map(item => (
              <div
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`wl-radio ${role === item.id ? 'wl-radio-active' : ''}`}
                style={{
                  border: role === item.id ? '2px solid #4f46e5' : '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  background: role === item.id ? '#eef2ff' : '#f8fafc',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '16px', color: '#0f172a', marginBottom: '6px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn is-primary w-button"
              style={{ padding: '12px 28px', fontSize: '15px', fontWeight: 600 }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Company Details */}
      {step === 2 && (
        <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="wl-step-panel" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>
            Tell us about your organization
          </h3>
          <p style={{ color: '#64748b', fontSize: '14.5px', marginBottom: '24px' }}>
            This helps our team prepare the verified cap table sandbox environment.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Sarah Connor"
                className="bk-input"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Work Email <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@company.com"
                className="bk-input"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Company / Firm Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Holdings Ltd"
                className="bk-input"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Number of Stakeholders / Cap Table Size
              </label>
              <select
                value={formData.capTableSize}
                onChange={e => setFormData({ ...formData, capTableSize: e.target.value })}
                className="bk-input"
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#fff' }}
              >
                <option value="1-10">1 – 10 stakeholders</option>
                <option value="10-50">10 – 50 stakeholders</option>
                <option value="50-250">50 – 250 stakeholders</option>
                <option value="250+">250+ stakeholders</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn is-ghost"
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn is-primary w-button"
              style={{ padding: '12px 28px', fontSize: '15px', fontWeight: 600 }}
            >
              Continue →
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Choose Walkthrough or Standard Waitlist */}
      {step === 3 && (
        <div className="wl-step-panel" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
          {!wantsDemo && !isSubmitted ? (
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>
                Almost done, {formData.name || 'there'}!
              </h3>
              <p style={{ color: '#64748b', fontSize: '14.5px', marginBottom: '28px' }}>
                Would you like to schedule an immediate 1-on-1 walkthrough with an equity specialist, or simply join the queue for cohort onboarding?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div
                  onClick={() => setWantsDemo(true)}
                  style={{
                    border: '2px solid #4f46e5',
                    borderRadius: '14px',
                    padding: '24px',
                    cursor: 'pointer',
                    background: '#eef2ff',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '12px' }}>🗓️</div>
                  <div style={{ fontWeight: 700, fontSize: '17px', color: '#0f172a', marginBottom: '8px' }}>
                    Schedule Live Demo
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>
                    Pick a 20-minute slot on our calendar right now and see a personalized walkthrough of your workflow.
                  </div>
                </div>

                <div
                  onClick={handleSubmit}
                  style={{
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '24px',
                    cursor: 'pointer',
                    background: '#f8fafc',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '12px' }}>✉️</div>
                  <div style={{ fontWeight: 700, fontSize: '17px', color: '#0f172a', marginBottom: '8px' }}>
                    Standard Early Access
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>
                    Join the waitlist. Our onboarding team will send your platform invitation once the next cohort opens.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn is-ghost"
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                ← Back
              </button>
            </div>
          ) : wantsDemo ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                  Select a convenient demo time
                </h3>
                <button
                  type="button"
                  onClick={() => setWantsDemo(false)}
                  className="btn is-ghost"
                  style={{ fontSize: '13px', padding: '6px 12px' }}
                >
                  ← Back to choices
                </button>
              </div>
              <BookingCalendar />
            </div>
          ) : (
            <div className="wl-done">
              <div className="wl-done-check">✓</div>
              <h3 className="wl-done-title">You're on the Waitlist!</h3>
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 24px auto' }}>
                Thank you for requesting early access for <strong>{formData.company || 'your firm'}</strong>. We have dispatched a confirmation email to <strong>{formData.email}</strong>.
              </p>
              <div className="wl-done-card">
                <div className="wl-done-row">
                  <span className="wl-done-key">Status</span>
                  <span className="wl-done-val" style={{ color: '#16a34a', fontWeight: 600 }}>Priority Queue Registered</span>
                </div>
                <div className="wl-done-row">
                  <span className="wl-done-key">Category</span>
                  <span className="wl-done-val">{role.toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
