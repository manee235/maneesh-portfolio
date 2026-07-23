import React, { useState, useEffect, useRef } from 'react';
import Stepper, { Step } from './Stepper';
import { LogoMark } from './PageLoader';

const SERVICES_OPTIONS = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Full Stack Solution',
  'Music Production',
  'Graphic Design'
];

const TIMELINE_OPTIONS = [
  'Urgent (< 2 weeks)',
  'Standard (1 month)',
  'Flexible (2+ months)'
];

const BUDGET_OPTIONS = [
  '< LKR 200,000',
  'LKR 200,000 – 1,000,000',
  'LKR 1,000,000 – 3,000,000',
  'LKR 3,000,000+'
];

const RequestModal = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    service: 'Web Development',
    timeline: 'Standard (1 month)',
    budget: 'LKR 200,000 – 1,000,000',
    name: '',
    email: '',
    project: ''
  });

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
        setFormState({
          service: 'Web Development',
          timeline: 'Standard (1 month)',
          budget: '$1,000 – $5,000',
          name: '',
          email: '',
          project: ''
        });
        setStatus('idle');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSelectOption = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleSubmitFinal = () => {
    setStatus('sending');

    const whatsappNumber = '94759051430';
    const text = encodeURIComponent(
      `Hi Maneesh! 👋\n\nI'd like to start a project with you.\n\n` +
      `📋 Service: ${formState.service}\n` +
      `⏱ Timeline: ${formState.timeline}\n` +
      `💰 Budget: ${formState.budget}\n` +
      `👤 Name: ${formState.name || 'Not specified'}\n` +
      `✉️ Email: ${formState.email || 'Not specified'}\n\n` +
      `Project Details:\n${formState.project || 'No additional details provided.'}`
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
        style={{ maxWidth: '620px', padding: '2rem 1.5rem' }}
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
            <div className="request-modal-header" style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
              <div className="eyebrow dark" style={{ justifyContent: 'center' }}>
                <span className="eyebrow-dot" style={{ backgroundColor: '#2563eb' }} />
                <span>Start a Project</span>
              </div>
              <h2 className="request-modal-h2" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>
                Tell us what you're building
              </h2>
            </div>

            <Stepper
              initialStep={1}
              onFinalStepCompleted={handleSubmitFinal}
              backButtonText="Back"
              nextButtonText="Continue"
            >
              {/* STEP 1: SERVICE */}
              <Step>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    1. Select Required Service
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    What core expertise does your project require?
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginTop: '1rem' }}>
                  {SERVICES_OPTIONS.map((item) => {
                    const isSelected = formState.service === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSelectOption('service', item)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '16px',
                          background: isSelected ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                          border: isSelected ? '1.5px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                          fontWeight: isSelected ? '700' : '500',
                          fontSize: '0.85rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{item}</span>
                        {isSelected && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />}
                      </button>
                    );
                  })}
                </div>
              </Step>

              {/* STEP 2: TIMELINE */}
              <Step>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    2. Desired Timeline
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    When do you need this project completed?
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
                  {TIMELINE_OPTIONS.map((item) => {
                    const isSelected = formState.timeline === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSelectOption('timeline', item)}
                        style={{
                          padding: '14px 18px',
                          borderRadius: '16px',
                          background: isSelected ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                          border: isSelected ? '1.5px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                          fontWeight: isSelected ? '700' : '500',
                          fontSize: '0.9rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{item}</span>
                        {isSelected && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />}
                      </button>
                    );
                  })}
                </div>
              </Step>

              {/* STEP 3: BUDGET */}
              <Step>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    3. Estimated Budget
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    Select an approximate budget range for your project.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '1rem' }}>
                  {BUDGET_OPTIONS.map((item) => {
                    const isSelected = formState.budget === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSelectOption('budget', item)}
                        style={{
                          padding: '16px',
                          borderRadius: '16px',
                          background: isSelected ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                          border: isSelected ? '1.5px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                          fontWeight: isSelected ? '700' : '500',
                          fontSize: '0.92rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </Step>

              {/* STEP 4: CONTACT & DETAILS */}
              <Step>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    4. Your Name & Project Details
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    How can we reach you with the proposal?
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '0.8rem' }}>
                  <div className="request-modal-field">
                    <label htmlFor="req-name" className="request-modal-label-text">Your Name</label>
                    <input
                      id="req-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formState.name}
                      onChange={handleChange}
                      className="request-modal-input"
                    />
                  </div>

                  <div className="request-modal-field">
                    <label htmlFor="req-email" className="request-modal-label-text">Email Address</label>
                    <input
                      id="req-email"
                      type="email"
                      name="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={handleChange}
                      className="request-modal-input"
                    />
                  </div>

                  <div className="request-modal-field">
                    <label htmlFor="req-project" className="request-modal-label-text">Additional Project Brief (Optional)</label>
                    <textarea
                      id="req-project"
                      name="project"
                      rows={3}
                      placeholder="Tell us a few words about your goals or specific features..."
                      value={formState.project}
                      onChange={handleChange}
                      className="request-modal-textarea"
                    />
                  </div>
                </div>
              </Step>
            </Stepper>
          </>
        ) : (
          <div className="request-modal-success">
            <div className="request-modal-success-badge">
              <LogoMark size="1.5rem" />
            </div>
            <h2 className="request-modal-success-h2">Request Received!</h2>
            <p className="request-modal-success-p">
              Thanks for reaching out — we've captured your project requirements (Service, Timeline, Budget & Details) and will contact you within one business day!
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
