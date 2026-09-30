import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  if (isSubmitted) {
    return (
      <div className="w-form-done" style={{ display: 'block', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
        <div style={{ color: '#065f46', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
          Message Dispatched
        </div>
        <p style={{ color: '#047857', fontSize: '14.5px', margin: 0 }}>
          Thank you for reaching out. A representative from Arcstone will review your inquiry and follow up within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Full Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="bk-input"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
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
            placeholder="jane@firm.com"
            className="bk-input"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
          Company or Firm Name
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
          placeholder="Acme Capital"
          className="bk-input"
          style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
          Message <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can Arcstone assist your team?"
          className="bk-textarea"
          style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn is-primary w-button"
        style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600 }}
      >
        {isSubmitting ? 'Transmitting...' : 'Send Message →'}
      </button>

      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px', textAlign: 'center', margin: '12px 0 0 0' }}>
        By submitting, you agree to our Privacy Policy.
      </p>
    </form>
  );
};
