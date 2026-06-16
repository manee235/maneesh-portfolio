import React, { useState, useEffect, useRef } from 'react';
import { LogoMark } from './PageLoader';

const RequestModal = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({ name: '', email: '', project: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const panelRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form status when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormState({ name: '', email: '', project: '' });
        setStatus('idle');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const whatsappNumber = '94759051430';
    const text = encodeURIComponent(
      `Hi Maneesh! 👋\n\nI'd like to start a project with you.\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nProject details:\n${formState.project}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      setStatus('success');
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`request-modal-backdrop ${isOpen ? 'open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className="request-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="request-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '0.875rem', height: '0.875rem' }}>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {status !== 'success' ? (
          <>
            <div className="request-modal-header">
              <div className="eyebrow dark">
                <span className="eyebrow-dot" style={{ backgroundColor: '#b15f2c' }} />
                <span>Start a project</span>
              </div>
              <h2 className="request-modal-h2">Tell us what you're building.</h2>
            </div>

            <form onSubmit={handleSubmit} className="request-modal-form">
              <div className="request-modal-field">
                <label htmlFor="req-name" className="request-modal-label-text">Name</label>
                <input
                  id="req-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={formState.name}
                  onChange={handleChange}
                  className="request-modal-input"
                />
              </div>

              <div className="request-modal-field">
                <label htmlFor="req-email" className="request-modal-label-text">Email</label>
                <input
                  id="req-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  value={formState.email}
                  onChange={handleChange}
                  className="request-modal-input"
                />
              </div>

              <div className="request-modal-field">
                <label htmlFor="req-project" className="request-modal-label-text">Project</label>
                <textarea
                  id="req-project"
                  name="project"
                  required
                  rows={4}
                  placeholder="A few words about your project, timeline, and budget."
                  value={formState.project}
                  onChange={handleChange}
                  className="request-modal-textarea"
                />
              </div>

              <div className="request-modal-bottom">
                <span className="request-modal-note">We reply within one business day.</span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="pill-btn dark with-arrow"
                >
                  <span className="pill-btn-inner">
                    <span>{status === 'sending' ? 'Sending…' : 'Send request'}</span>
                    <span className="pill-btn-arrow-badge up-right">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="request-modal-success">
            <div className="request-modal-success-badge">
              <LogoMark size="1.5rem" />
            </div>
            <h2 className="request-modal-success-h2">Request received</h2>
            <p className="request-modal-success-p">
              Thanks for reaching out — we'll get back to you within one business day.
            </p>
            <button className="pill-btn dark no-arrow" onClick={onClose}>
              <span className="pill-btn-inner">Close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestModal;
