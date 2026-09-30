import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import heroHtml from './templates/WaitlistHeroContent.html?raw';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DOW_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const BRUSSELS_TZ = 'Europe/Brussels';

function formatTime(date: Date, tz: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: tz,
  }).format(date);
}

function formatTzAbbr(date: Date, tz: string) {
  return (
    new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      timeZoneName: 'short',
    })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')?.value ?? ''
  );
}

function toYmd(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

interface Slot {
  utc: string;
  taken: boolean;
}

interface DaySlots {
  date: string;
  slots: Slot[];
}

interface BookedDetails {
  when: string;
  guests: string[];
}

// FRONTEND MOCK — BACKEND INTEGRATION REQUIRED LATER
function generateMockSlots(): { days: DaySlots[]; window: { from: string; to: string } } {
  const days: DaySlots[] = [];
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  for (let i = 0; i < 35; i++) {
    const cur = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const dow = cur.getDay(); // 0 is Sun, 6 is Sat
    if (dow !== 0 && dow !== 6) {
      const ymd = toYmd(cur.getFullYear(), cur.getMonth(), cur.getDate());
      const hours = [9, 10, 11, 14, 15, 16];
      const slots: Slot[] = hours.map((h) => {
        const d = new Date(Date.UTC(cur.getFullYear(), cur.getMonth(), cur.getDate(), h - 2, 0, 0));
        return {
          utc: d.toISOString(),
          taken: Math.random() < 0.25,
        };
      });
      days.push({ date: ymd, slots });
    }
  }

  const from = days[0]?.date || toYmd(now.getFullYear(), now.getMonth(), now.getDate());
  const to = days[days.length - 1]?.date || from;
  return { days, window: { from, to } };
}

// Step 1: Lead details
const LeadForm: React.FC<{ onSubmitted: () => void }> = ({ onSubmitted }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [raisedFunds, setRaisedFunds] = useState<'yes' | 'no' | null>(null);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !company.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    if (raisedFunds === null) {
      setErrorMessage('Please tell us whether you have raised funds before.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      onSubmitted();
    }, 300);
  };

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        className="custom-input field w-input"
        placeholder="First Name *"
        type="text"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        disabled={isLoading}
        autoComplete="given-name"
      />
      <input
        className="custom-input field w-input"
        placeholder="Last Name *"
        type="text"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        disabled={isLoading}
        autoComplete="family-name"
      />
      <input
        className="custom-input field w-input"
        placeholder="Work Email *"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        autoComplete="email"
      />
      <input
        className="custom-input field w-input"
        placeholder="Company Name *"
        type="text"
        required
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        disabled={isLoading}
        autoComplete="organization"
      />

      <fieldset className="wl-fieldset">
        <legend className="wl-legend">Have you raised funds before? *</legend>
        <div className="wl-radio-row">
          <label className={`wl-radio ${raisedFunds === 'yes' ? 'wl-radio-active' : ''}`}>
            <input
              type="radio"
              name="raised_funds"
              value="yes"
              checked={raisedFunds === 'yes'}
              onChange={() => setRaisedFunds('yes')}
              disabled={isLoading}
            />
            <span>Yes</span>
          </label>
          <label className={`wl-radio ${raisedFunds === 'no' ? 'wl-radio-active' : ''}`}>
            <input
              type="radio"
              name="raised_funds"
              value="no"
              checked={raisedFunds === 'no'}
              onChange={() => setRaisedFunds('no')}
              disabled={isLoading}
            />
            <span>No</span>
          </label>
        </div>
      </fieldset>

      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          fontSize: '13px',
          color: '#64748b',
          margin: '4px 0 8px',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => setMarketingConsent(e.target.checked)}
          disabled={isLoading}
          style={{ marginTop: '3px', flexShrink: 0 }}
        />
        <span>
          Send me occasional product updates and launch news from Arcstone. You can unsubscribe at any
          time.
        </span>
      </label>

      {status === 'error' && (
        <div style={{ fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
          {errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}

      <input
        type="submit"
        className="button w-button"
        value={isLoading ? 'Please wait…' : 'Continue to pick a time'}
        disabled={isLoading}
        style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
      />

      <div
        className="content-text"
        style={{ fontSize: '12px', marginTop: '16px', textAlign: 'center', color: '#94a3b8' }}
      >
        By submitting, you agree to our{' '}
        <Link to="/privacy-policy" style={{ color: '#4f46e5' }}>
          Privacy Policy
        </Link>
        .
      </div>
    </form>
  );
};

// Stepper navigation
const Stepper: React.FC<{ current: number }> = ({ current }) => {
  const steps = ['Your details', 'Pick a time', 'Confirmed'];
  return (
    <ol className="wl-stepper" aria-label="Booking progress">
      {steps.map((label, idx) => (
        <li
          key={label}
          className={`wl-step wl-step-${idx < current ? 'done' : idx === current ? 'active' : 'upcoming'}`}
          aria-current={idx === current ? 'step' : undefined}
        >
          <span className="wl-step-dot">{idx < current ? '✓' : idx + 1}</span>
          <span className="wl-step-label">{label}</span>
        </li>
      ))}
    </ol>
  );
};

// Step 2: Calendar picker
const CalendarPicker: React.FC<{ onBooked: (details: BookedDetails) => void }> = ({ onBooked }) => {
  const [loading, setLoading] = useState(true);
  const [error] = useState('');
  const [days, setDays] = useState<DaySlots[]>([]);
  const [windowRange, setWindowRange] = useState<{ from: string; to: string } | null>(null);

  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotUtc, setSelectedSlotUtc] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [showGuests, setShowGuests] = useState(false);
  const [guestEmails, setGuestEmails] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const panelRef = useRef<HTMLDivElement>(null);

  const userTz = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || BRUSSELS_TZ;
    } catch {
      return BRUSSELS_TZ;
    }
  }, []);

  const hasDiffTz = userTz !== BRUSSELS_TZ;

  const loadSlots = useCallback(() => {
    setLoading(true);
    // FRONTEND MOCK — BACKEND INTEGRATION REQUIRED LATER
    const data = generateMockSlots();
    setDays(data.days);
    setWindowRange(data.window);

    const firstAvailable = data.days.find((d) => d.slots.some((s) => !s.taken)) ?? data.days[0];
    if (firstAvailable) {
      const [y, m] = firstAvailable.date.split('-').map(Number);
      setCalYear(y);
      setCalMonth(m - 1);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const daysMap = useMemo(() => {
    const map = new Map<string, DaySlots>();
    for (const d of days) map.set(d.date, d);
    return map;
  }, [days]);

  const activeDay = selectedDate ? daysMap.get(selectedDate) : undefined;

  const monthBounds = useMemo(() => {
    if (!windowRange) return null;
    const [fy, fm] = windowRange.from.split('-').map(Number);
    const [ty, tm] = windowRange.to.split('-').map(Number);
    return { min: fy * 12 + (fm - 1), max: ty * 12 + (tm - 1) };
  }, [windowRange]);

  const currentMonthIdx = calYear * 12 + calMonth;
  const canPrevMonth = monthBounds ? currentMonthIdx > monthBounds.min : false;
  const canNextMonth = monthBounds ? currentMonthIdx < monthBounds.max : false;

  const prevMonth = () => {
    if (!canPrevMonth) return;
    const nextIdx = currentMonthIdx - 1;
    setCalYear(Math.floor(nextIdx / 12));
    setCalMonth(nextIdx % 12);
  };

  const nextMonth = () => {
    if (!canNextMonth) return;
    const nextIdx = currentMonthIdx + 1;
    setCalYear(Math.floor(nextIdx / 12));
    setCalMonth(nextIdx % 12);
  };

  const monthGrid = useMemo(() => {
    const startDayOfWeek = (new Date(calYear, calMonth, 1).getDay() + 6) % 7; // Monday = 0
    const totalDays = new Date(calYear, calMonth + 1, 0).getDate();
    const cells: { key: string; day: number | null; date: string | null }[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push({ key: `lead-${i}`, day: null, date: null });
    }
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = toYmd(calYear, calMonth, day);
      cells.push({ key: dateStr, day, date: dateStr });
    }
    return cells;
  }, [calYear, calMonth]);

  const selectDay = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedSlotUtc(null);
    setBookingError('');
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const addGuest = () => {
    setShowGuests(true);
    setGuestEmails((prev) => (prev.length < 2 ? [...prev, ''] : prev));
  };

  const updateGuest = (idx: number, val: string) => {
    setGuestEmails((prev) => prev.map((item, i) => (i === idx ? val : item)));
  };

  const removeGuest = (idx: number) => {
    setGuestEmails((prev) => prev.filter((_, i) => i !== idx));
  };

  const hasInvalidGuestEmail = guestEmails.some(
    (e) => e.trim() !== '' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.trim())
  );

  const confirmBooking = () => {
    if (!selectedSlotUtc || isBooking) return;
    if (hasInvalidGuestEmail) {
      setBookingError('Please check the guest email addresses.');
      return;
    }

    setIsBooking(true);
    setBookingError('');

    setTimeout(() => {
      const slotDate = new Date(selectedSlotUtc);
      const whenStr = `${slotDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })} at ${formatTime(slotDate, BRUSSELS_TZ)} ${formatTzAbbr(slotDate, BRUSSELS_TZ)}`;
      onBooked({
        when: whenStr,
        guests: guestEmails.map((e) => e.trim()).filter(Boolean),
      });
    }, 400);
  };

  if (loading) {
    return (
      <div className="bk-wrap" aria-busy="true">
        <div className="bk-skeleton bk-skeleton-cal" />
        <div className="bk-skeleton bk-skeleton-slots" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bk-wrap">
        <div className="bk-error-panel" role="alert">
          <p>{error}</p>
          <button type="button" className="button w-button bk-retry" onClick={loadSlots}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const selectedSlotDate = selectedSlotUtc ? new Date(selectedSlotUtc) : null;

  return (
    <div className="bk-wrap">
      <div className="bk-grid">
        <div className="bk-cal">
          <div className="bk-cal-head">
            <button
              type="button"
              className="bk-nav"
              onClick={prevMonth}
              disabled={!canPrevMonth}
              aria-label="Previous month"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <div className="bk-cal-title" aria-live="polite">
              {MONTH_NAMES[calMonth]} {calYear}
            </div>
            <button
              type="button"
              className="bk-nav"
              onClick={nextMonth}
              disabled={!canNextMonth}
              aria-label="Next month"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <div className="bk-dow-row" aria-hidden="true">
            {DOW_NAMES.map((d) => (
              <div key={d} className="bk-dow">
                {d}
              </div>
            ))}
          </div>

          <div className="bk-days" role="grid" aria-label="Choose a date">
            {monthGrid.map((cell) => {
              if (cell.day === null) {
                return <div key={cell.key} className="bk-cell bk-cell-empty" aria-hidden="true" />;
              }

              const dayData = cell.date ? daysMap.get(cell.date) : undefined;
              const openSlotsCount = dayData ? dayData.slots.filter((s) => !s.taken).length : 0;
              const hasOpen = !!dayData && openSlotsCount > 0;
              const isFull = !!dayData && openSlotsCount === 0;
              const isSelected = cell.date === selectedDate;

              return (
                <button
                  key={cell.key}
                  type="button"
                  className={[
                    'bk-cell',
                    'bk-day',
                    hasOpen ? 'bk-day-open' : 'bk-day-disabled',
                    isFull ? 'bk-day-full' : '',
                    isSelected ? 'bk-day-selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={!hasOpen}
                  aria-pressed={isSelected}
                  aria-label={
                    hasOpen
                      ? `${cell.day} ${MONTH_NAMES[calMonth]}, ${openSlotsCount} time${openSlotsCount === 1 ? '' : 's'} available`
                      : `${cell.day} ${MONTH_NAMES[calMonth]}, unavailable`
                  }
                  onClick={() => cell.date && selectDay(cell.date)}
                >
                  <span className="bk-day-num">{cell.day}</span>
                  {hasOpen && <span className="bk-day-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div className="bk-legend">
            <span className="bk-legend-item">
              <span className="bk-legend-dot bk-legend-open" /> Available
            </span>
            <span className="bk-legend-item">
              <span className="bk-legend-dot bk-legend-none" /> Full / closed
            </span>
          </div>
        </div>

        <div className="bk-panel" ref={panelRef}>
          {!activeDay && (
            <div className="bk-panel-empty">
              <div className="bk-panel-empty-icon" aria-hidden="true">
                🗓️
              </div>
              <p>Select a date to see available times.</p>
            </div>
          )}

          {activeDay && (
            <>
              <div className="bk-panel-title">
                {new Date(`${activeDay.date}T00:00:00`).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </div>

              <div className="bk-tz-note">
                Times shown in Brussels
                {hasDiffTz ? ` · your time (${userTz.replace(/_/g, ' ')}) below` : ''}
              </div>

              <div className="bk-slots" role="listbox" aria-label="Available times">
                {activeDay.slots.map((slot) => {
                  const slotDate = new Date(slot.utc);
                  const isSelected = slot.utc === selectedSlotUtc;
                  return (
                    <button
                      key={slot.utc}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={slot.taken}
                      className={[
                        'bk-slot',
                        slot.taken ? 'bk-slot-taken' : '',
                        isSelected ? 'bk-slot-selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => {
                        setSelectedSlotUtc(slot.utc);
                        setBookingError('');
                      }}
                    >
                      <span className="bk-slot-primary">{formatTime(slotDate, BRUSSELS_TZ)}</span>
                      {hasDiffTz && (
                        <span className="bk-slot-secondary">
                          {formatTime(slotDate, userTz)} local
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedSlotUtc && (
                <div className="bk-confirm">
                  <div className="bk-field">
                    <label className="bk-label" htmlFor="bk-note">
                      Anything we should know? <span className="bk-optional">(optional)</span>
                    </label>
                    <textarea
                      id="bk-note"
                      className="bk-textarea"
                      value={note}
                      maxLength={2000}
                      rows={3}
                      placeholder="Context, questions, or what you'd like us to focus on."
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <div className="bk-counter">{note.length}/2000</div>
                  </div>

                  <div className="bk-field">
                    {!showGuests && guestEmails.length === 0 ? (
                      <button type="button" className="bk-add-guest" onClick={addGuest}>
                        + Add guests
                      </button>
                    ) : (
                      <>
                        <span className="bk-label">
                          Add guests{' '}
                          <span className="bk-optional">(up to 2 — they’ll get the invite too)</span>
                        </span>
                        {guestEmails.map((emailVal, idx) => (
                          <div key={idx} className="bk-guest-row">
                            <input
                              type="email"
                              className="bk-input"
                              value={emailVal}
                              placeholder="guest@company.com"
                              autoComplete="off"
                              onChange={(e) => updateGuest(idx, e.target.value)}
                            />
                            <button
                              type="button"
                              className="bk-guest-remove"
                              aria-label="Remove guest"
                              onClick={() => removeGuest(idx)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {guestEmails.length < 2 && (
                          <button type="button" className="bk-add-guest" onClick={addGuest}>
                            + Add another
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <div className="bk-summary">
                    <span className="bk-summary-label">Selected</span>
                    <span className="bk-summary-value">
                      {selectedSlotDate && (
                        <>
                          {selectedSlotDate.toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                          })}{' '}
                          · {formatTime(selectedSlotDate, BRUSSELS_TZ)}{' '}
                          {formatTzAbbr(selectedSlotDate, BRUSSELS_TZ)}
                          {hasDiffTz && ` (${formatTime(selectedSlotDate, userTz)} your time)`}
                        </>
                      )}
                    </span>
                  </div>

                  {bookingError && (
                    <div className="bk-book-error" role="alert">
                      {bookingError}
                    </div>
                  )}

                  <button
                    type="button"
                    className="button w-button bk-confirm-btn"
                    onClick={confirmBooking}
                    disabled={isBooking || hasInvalidGuestEmail}
                  >
                    {isBooking ? 'Booking…' : 'Confirm booking'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Step 3: Confirmed screen
const ConfirmationCard: React.FC<{ booked: BookedDetails }> = ({ booked }) => {
  return (
    <div className="wl-done">
      <div className="wl-done-check" aria-hidden="true">
        ✓
      </div>
      <h3 className="title-h2 wl-done-title">You’re booked in</h3>
      <p className="wl-done-when">{booked.when}</p>
      {booked.guests.length > 0 && (
        <div className="wl-done-card">
          <div className="wl-done-row">
            <span className="wl-done-key">Guests invited</span>
            <span className="wl-done-val">{booked.guests.join(', ')}</span>
          </div>
        </div>
      )}
      <p className="wl-done-note">
        We’ve emailed you a confirmation with a calendar invite (.ics) — open it to add the meeting to
        your calendar, including the video-call link and a reminder set automatically.{' '}
        <strong>Can’t find it? Please check your spam or junk folder.</strong>
      </p>
    </div>
  );
};

export const Waitlist: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookedDetails, setBookedDetails] = useState<BookedDetails | null>(null);

  return (
    <div id="page-waitlist">
      <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <section className="section">
        <div className="container w-container">
          <div style={{ marginTop: '48px' }}>
            <Stepper current={currentStep} />

            {currentStep === 0 && (
              <div className="feature-grid" style={{ marginTop: '40px', alignItems: 'start' }}>
                <div style={{ paddingRight: '40px' }}>
                  <h3 className="title-h2" style={{ fontSize: '28px', marginBottom: '24px' }}>
                    What to expect
                  </h3>
                  <ul className="contact-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li
                      style={{
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <span style={{ color: '#4f46e5', flexShrink: 0 }}>✓</span> A personalised
                      walkthrough of cap table management and investor coordination
                    </li>
                    <li
                      style={{
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <span style={{ color: '#4f46e5', flexShrink: 0 }}>✓</span> A look at governance,
                      reporting, and lifecycle administration
                    </li>
                    <li
                      style={{
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <span style={{ color: '#4f46e5', flexShrink: 0 }}>✓</span> Answers to your
                      questions from a member of the Arcstone team
                    </li>
                    <li
                      style={{
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <span style={{ color: '#4f46e5', flexShrink: 0 }}>✓</span> Priority onboarding
                      when the platform goes live in September
                    </li>
                  </ul>
                  <div
                    style={{
                      marginTop: '40px',
                      padding: '28px 32px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#94a3b8',
                        marginBottom: '12px',
                      }}
                    >
                      Launching September 2026
                    </div>
                    <div style={{ fontSize: '16px', color: '#334155', lineHeight: 1.6 }}>
                      We're onboarding private companies, growth-stage startups, and operators. Leave
                      your details and we'll be in touch to schedule your demo.
                    </div>
                  </div>
                </div>

                <div className="form-block w-form contact-form-card">
                  <h3 className="title-h2" style={{ fontSize: '24px', marginBottom: '8px' }}>
                    Request your demo
                  </h3>
                  <p
                    className="content-text"
                    style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}
                  >
                    Tell us a little about you, then pick a time that suits you.
                  </p>
                  <LeadForm onSubmitted={() => setCurrentStep(1)} />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="wl-step-panel">
                <div className="wl-step-heading">
                  <h3 className="title-h2" style={{ fontSize: '24px', marginBottom: '6px' }}>
                    Pick a time
                  </h3>
                  <p className="content-text" style={{ fontSize: '14px', color: '#64748b' }}>
                    Each demo runs for 20 minutes. Choose whatever works best.
                  </p>
                </div>
                <CalendarPicker
                  onBooked={(details) => {
                    setBookedDetails(details);
                    setCurrentStep(2);
                  }}
                />
              </div>
            )}

            {currentStep === 2 && bookedDetails && (
              <div className="wl-step-panel">
                <ConfirmationCard booked={bookedDetails} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
