import React, { useState, useEffect } from 'react';

const SERVICES_OPTIONS = [
  { label: 'Web Development', iconClass: 'bx bx-globe' },
  { label: 'Mobile App Development', iconClass: 'bx bx-mobile-alt' },
  { label: 'UI/UX Design', iconClass: 'bx bx-palette' },
  { label: 'Full Stack Solution', iconClass: 'bx bx-layer' },
  { label: 'Music Production', iconClass: 'bx bx-music' },
  { label: 'Graphic Design', iconClass: 'bx bx-pen' },
];

const TIMELINE_OPTIONS = [
  { label: 'Urgent', sub: 'Less than 2 weeks', iconClass: 'bx bx-zap' },
  { label: 'Standard', sub: 'Around 1 month', iconClass: 'bx bx-calendar' },
  { label: 'Flexible', sub: '2+ months', iconClass: 'bx bx-time-five' },
];

const WHATSAPP_NUMBER = '94759051430';
const EMAIL_ADDRESS = 'ganegodamaneesh@gmail.com';

const TOTAL_STEPS = 3;
const stepLabels = ['Service', 'Timeline', 'Contact'];

export default function RequestModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: 'Web Development',
    timeline: 'Standard',
    name: '',
    email: '',
    project: '',
  });
  const [inquiryMethod, setInquiryMethod] = useState('whatsapp'); // 'whatsapp' | 'email'
  const [sent, setSent] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(1);
        setForm({ service: 'Web Development', timeline: 'Standard', name: '', email: '', project: '' });
        setInquiryMethod('whatsapp');
        setSent(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const buildMessage = () =>
    `Hi Maneesh! 👋\n\nI'd like to start a project with you.\n\n` +
    `📋 Service: ${form.service || 'Not selected'}\n` +
    `⏱ Timeline: ${form.timeline || 'Not selected'}\n` +
    `👤 Name: ${form.name || 'Not provided'}\n` +
    `✉️ Email: ${form.email || 'Not provided'}\n\n` +
    `Project Details:\n${form.project || 'No additional details provided.'}`;

  const handleSend = () => {
    if (inquiryMethod === 'whatsapp') {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`,
        '_blank'
      );
    } else {
      const subject = encodeURIComponent(`Project Inquiry: ${form.service} — from ${form.name || 'Client'}`);
      const body = encodeURIComponent(buildMessage());
      window.open(`mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`, '_blank');
    }
    setSent(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="rm-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="rm-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="rm-close" onClick={onClose} aria-label="Close">
          <i className="bx bx-x"></i>
        </button>

        {sent ? (
          /* ── Success State ── */
          <div className="rm-success">
            <div className="rm-success-icon">
              <i className="bx bx-check"></i>
            </div>
            <h2>Inquiry Ready!</h2>
            <p>
              {inquiryMethod === 'whatsapp'
                ? 'Your WhatsApp chat has been initiated with project details.'
                : 'Your email client has been opened with your inquiry ready to send.'}
            </p>
            <button className="rm-btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            {/* ── Step label + heading ── */}
            <div className="rm-header">
              <span className="rm-step-badge">
                Step {step} of {TOTAL_STEPS} · Start a Project
              </span>
              <h2 className="rm-title">
                {step === 1 && 'Select Required Service'}
                {step === 2 && 'Desired Timeline'}
                {step === 3 && 'Choose Inquiry Method'}
              </h2>
            </div>

            {/* ── Stepper Progress Bar ── */}
            <div className="rm-stepper-wrap">
              {stepLabels.map((label, i) => {
                const idx = i + 1;
                const isActive = idx === step;
                const isDone = idx < step;
                return (
                  <React.Fragment key={label}>
                    <div className={`rm-step-node ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                      <div className="rm-step-circle">
                        {isDone ? (
                          <i className="bx bx-check" style={{ fontSize: '1rem' }}></i>
                        ) : (
                          <span>{idx}</span>
                        )}
                      </div>
                      <span className="rm-step-label">{label}</span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div className={`rm-step-line ${isDone ? 'done' : ''}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* ── STEP 1: SERVICE (BOXICONS) ── */}
            {step === 1 && (
              <div className="rm-grid-2">
                {SERVICES_OPTIONS.map(({ label, iconClass }) => {
                  const sel = form.service === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      className={`rm-card ${sel ? 'selected' : ''}`}
                      onClick={() => setForm((p) => ({ ...p, service: label }))}
                    >
                      <div className="rm-card-left">
                        <i className={`rm-card-icon ${iconClass}`}></i>
                        <span className="rm-card-name">{label}</span>
                      </div>
                      {sel && <span className="rm-card-dot" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── STEP 2: TIMELINE ── */}
            {step === 2 && (
              <div className="rm-col">
                {TIMELINE_OPTIONS.map(({ label, sub, iconClass }) => {
                  const sel = form.timeline === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      className={`rm-row-card ${sel ? 'selected' : ''}`}
                      onClick={() => setForm((p) => ({ ...p, timeline: label }))}
                    >
                      <div className="rm-row-left">
                        <i className={`rm-row-icon ${iconClass}`}></i>
                        <div>
                          <div className="rm-row-label">{label}</div>
                          <div className="rm-row-sub">{sub}</div>
                        </div>
                      </div>
                      {sel && <span className="rm-card-dot" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── STEP 3: CONTACT + 2 INQUIRY OPTIONS (WHATSAPP & EMAIL) ── */}
            {step === 3 && (
              <div className="rm-col">
                {/* 2 Clear Inquiry Options */}
                <div className="rm-inquiry-toggle-container">
                  <span className="rm-inquiry-label">Select How to Contact:</span>
                  <div className="rm-inquiry-toggle">
                    <button
                      type="button"
                      className={`rm-inquiry-btn ${inquiryMethod === 'whatsapp' ? 'active' : ''}`}
                      onClick={() => setInquiryMethod('whatsapp')}
                    >
                      <i className="bx bxl-whatsapp" style={{ fontSize: '1.25rem' }}></i>
                      <span>WhatsApp Inquiry</span>
                    </button>

                    <button
                      type="button"
                      className={`rm-inquiry-btn ${inquiryMethod === 'email' ? 'active' : ''}`}
                      onClick={() => setInquiryMethod('email')}
                    >
                      <i className="bx bx-envelope" style={{ fontSize: '1.25rem' }}></i>
                      <span>Email Inquiry</span>
                    </button>
                  </div>
                </div>

                <div className="rm-contact-info-pill">
                  {inquiryMethod === 'whatsapp' ? (
                    <>
                      <i className="bx bxl-whatsapp" style={{ color: '#22c55e', fontSize: '1.1rem' }}></i>
                      <span>Direct to WhatsApp: <strong>+{WHATSAPP_NUMBER}</strong></span>
                    </>
                  ) : (
                    <>
                      <i className="bx bx-envelope" style={{ color: '#3b82f6', fontSize: '1.1rem' }}></i>
                      <span>Direct to Email: <strong>{EMAIL_ADDRESS}</strong></span>
                    </>
                  )}
                </div>

                <div className="rm-form-fields">
                  <div>
                    <label className="rm-input-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alex"
                      value={form.name}
                      onChange={handleChange}
                      className="rm-input"
                    />
                  </div>

                  <div>
                    <label className="rm-input-label">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. alex@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="rm-input"
                    />
                  </div>

                  <div>
                    <label className="rm-input-label">Project Details (Optional)</label>
                    <textarea
                      name="project"
                      placeholder="Briefly describe your project requirements..."
                      rows={3}
                      value={form.project}
                      onChange={handleChange}
                      className="rm-input rm-textarea"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Navigation Buttons ── */}
            <div className="rm-footer">
              {step > 1 ? (
                <button
                  type="button"
                  className="rm-btn-back"
                  onClick={() => setStep((p) => p - 1)}
                >
                  <i className="bx bx-left-arrow-alt"></i> Back
                </button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  className="rm-btn-primary"
                  onClick={() => setStep((p) => p + 1)}
                  disabled={(step === 1 && !form.service) || (step === 2 && !form.timeline)}
                >
                  Continue <i className="bx bx-right-arrow-alt"></i>
                </button>
              ) : (
                <button
                  type="button"
                  className={`rm-btn-send ${inquiryMethod === 'whatsapp' ? 'rm-send-whatsapp' : 'rm-send-email'}`}
                  onClick={handleSend}
                >
                  {inquiryMethod === 'whatsapp' ? (
                    <>
                      <i className="bx bxl-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                      <span>Send via WhatsApp</span>
                    </>
                  ) : (
                    <>
                      <i className="bx bx-envelope" style={{ fontSize: '1.2rem' }}></i>
                      <span>Send via Email</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
