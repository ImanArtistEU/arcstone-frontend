import React, { useState } from 'react';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DEFAULT_TIMEZONE = 'Europe/Brussels';

const AVAILABLE_SLOTS = [
  '09:00', '09:45', '10:30', '11:15', '14:00', '14:45', '15:30', '16:15'
];

interface BookingCalendarProps {
  onBooked?: (details: { date: string; slot: string; email: string }) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onBooked }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timezone] = useState<string>(DEFAULT_TIMEZONE);
  const [guestEmail, setGuestEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Generate 28-day demo calendar grid
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !guestEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      if (onBooked) {
        onBooked({
          date: `October ${selectedDate}, 2026`,
          slot: selectedSlot,
          email: guestEmail,
        });
      }
    }, 600);
  };

  if (isConfirmed) {
    return (
      <div className="wl-done">
        <div className="wl-done-check">✓</div>
        <h3 className="wl-done-title">Demonstration Confirmed</h3>
        <div className="wl-done-when">October {selectedDate}, 2026 at {selectedSlot} ({timezone})</div>
        <div className="wl-done-card">
          <div className="wl-done-row">
            <span className="wl-done-key">Attendee</span>
            <span className="wl-done-val">{guestEmail}</span>
          </div>
          <div className="wl-done-row">
            <span className="wl-done-key">Meeting Link</span>
            <span className="wl-done-link">https://meet.arcstone.one/demo-{Math.random().toString(36).substring(7)}</span>
          </div>
          {notes && (
            <div className="wl-done-row">
              <span className="wl-done-key">Notes</span>
              <span className="wl-done-note">{notes}</span>
            </div>
          )}
        </div>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          A calendar invite and meeting link have been dispatched to your email.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
      {/* Calendar Panel */}
      <div className="bk-cal" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="bk-cal-title" style={{ fontWeight: 700, fontSize: '17px' }}>
            October 2026
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>{timezone}</div>
        </div>

        {/* Days of week */}
        <div className="bk-dow-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
          {DAYS_OF_WEEK.map(d => (
            <div key={d} className="bk-dow" style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="bk-days" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {/* Empty prefix cells for alignment */}
          <div className="bk-cell-empty"></div>
          <div className="bk-cell-empty"></div>
          {days.map(d => {
            const isWeekend = (d + 1) % 7 === 0 || (d + 2) % 7 === 0;
            const isSelected = selectedDate === d;
            return (
              <button
                type="button"
                key={d}
                disabled={isWeekend}
                onClick={() => setSelectedDate(d)}
                className={[
                  'bk-day',
                  isWeekend ? 'bk-day-disabled' : 'bk-day-open',
                  isSelected ? 'bk-day-selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  height: '38px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '13.5px',
                  cursor: isWeekend ? 'not-allowed' : 'pointer',
                  border: isSelected ? '1.5px solid #4f46e5' : '1px solid transparent',
                  background: isSelected ? '#4f46e5' : isWeekend ? '#f8fafc' : '#ffffff',
                  color: isSelected ? '#ffffff' : isWeekend ? '#cbd5e1' : '#0f172a',
                }}
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="bk-legend" style={{ display: 'flex', gap: '16px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5' }}></span> Available
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }}></span> Unavailable
          </div>
        </div>
      </div>

      {/* Slots & Details Panel */}
      <div className="bk-panel" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        <h4 className="bk-panel-title" style={{ margin: '0 0 16px 0', fontSize: '17px', fontWeight: 700 }}>
          Available Slots: October {selectedDate}, 2026
        </h4>

        {/* Slots Grid */}
        <div className="bk-slots" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '8px', marginBottom: '24px' }}>
          {AVAILABLE_SLOTS.map(slot => (
            <button
              type="button"
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={[
                'bk-slot',
                selectedSlot === slot ? 'bk-slot-selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                padding: '10px 8px',
                borderRadius: '10px',
                border: selectedSlot === slot ? '1.5px solid #4f46e5' : '1.5px solid #e2e8f0',
                background: selectedSlot === slot ? '#4f46e5' : '#ffffff',
                color: selectedSlot === slot ? '#ffffff' : '#0f172a',
                fontWeight: 600,
                fontSize: '13.5px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {slot}
            </button>
          ))}
        </div>

        {/* Booking Confirmation Form */}
        {selectedSlot && (
          <form onSubmit={handleConfirm} className="bk-confirm">
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Work Email <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                required
                value={guestEmail}
                onChange={e => setGuestEmail(e.target.value)}
                placeholder="alex@company.com"
                className="bk-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1.5px solid #e2e8f0',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Notes or specific questions (optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Tell us about your team and cap table size..."
                className="bk-textarea"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1.5px solid #e2e8f0',
                  fontSize: '14px',
                  minHeight: '60px',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn is-primary w-button"
              style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 600 }}
            >
              {isSubmitting ? 'Confirming...' : `Confirm Demo at ${selectedSlot}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
