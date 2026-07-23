import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from './supabaseClient';
import Stepper, { Step } from './Stepper';

export default function TestimonialForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    job_title: '',
    company: '',
    testimonial: '',
    rating: 5,
    image_url: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [errorMsg, setErrorMsg] = useState('');
  const panelRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData({ name: '', job_title: '', company: '', testimonial: '', rating: 5, image_url: '' });
        setStatus('idle');
        setErrorMsg('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitFinal = async () => {
    if (!formData.name || !formData.testimonial) {
       setErrorMsg('Name and Feedback are required.');
       return;
    }
    
    setStatus('sending');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('testimonials').insert([{
        name: formData.name,
        job_title: formData.job_title,
        company: formData.company,
        image_url: formData.image_url,
        testimonial: formData.testimonial,
        rating: formData.rating,
        is_active: false // Require approval
      }]);

      if (error) throw error;
      
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (!isOpen) return null;

  return createPortal(
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
                <span className="eyebrow-dot" style={{ backgroundColor: '#a855f7' }} />
                <span>Client Review</span>
              </div>
              <h2 className="request-modal-h2" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>
                Share Your Experience
              </h2>
            </div>

            {errorMsg && (
               <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  {errorMsg}
               </div>
            )}

            <Stepper
              initialStep={1}
              onFinalStepCompleted={handleSubmitFinal}
              backButtonText="Back"
              nextButtonText="Submit Review"
            >
              {/* STEP 1: Basic Info */}
              <Step>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    1. Basic Details
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    Let us know who you are.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                  <div className="request-modal-field">
                    <label className="request-modal-label-text">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="request-modal-input"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="request-modal-field">
                      <label className="request-modal-label-text">Job Title</label>
                      <input
                        type="text"
                        name="job_title"
                        className="request-modal-input"
                        placeholder="Product Manager"
                        value={formData.job_title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="request-modal-field">
                      <label className="request-modal-label-text">Company</label>
                      <input
                        type="text"
                        name="company"
                        className="request-modal-input"
                        placeholder="Tech Inc."
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </Step>

              {/* STEP 2: Photo */}
              <Step>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    2. Profile Photo (Optional)
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    Add a picture to personalize your review.
                  </p>
                </div>
                <div className="request-modal-field" style={{ textAlign: 'left' }}>
                   <label className="request-modal-label-text">Upload Image</label>
                   <input
                     type="file"
                     accept="image/*"
                     onChange={handleFileChange}
                     className="request-modal-input"
                     style={{ padding: '0.5rem 0.8rem', cursor: 'pointer' }}
                   />
                </div>
                {formData.image_url && (
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                     <img src={formData.image_url} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(168, 85, 247, 0.5)' }} />
                  </div>
                )}
              </Step>

              {/* STEP 3: Feedback */}
              <Step>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                    3. Your Feedback
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    How was your experience working with me?
                  </p>
                </div>
                
                <div className="request-modal-field" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                   <label className="request-modal-label-text">Rating *</label>
                   <div style={{ display: 'flex', gap: '8px', fontSize: '1.5rem', marginTop: '0.2rem' }}>
                     {[1, 2, 3, 4, 5].map(star => (
                       <button
                         key={star}
                         type="button"
                         onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                         style={{
                           background: 'none', border: 'none', cursor: 'pointer',
                           color: star <= formData.rating ? '#fbbf24' : 'rgba(255,255,255,0.2)',
                           transition: 'transform 0.15s ease'
                         }}
                       >
                         ★
                       </button>
                     ))}
                   </div>
                </div>

                <div className="request-modal-field" style={{ textAlign: 'left' }}>
                  <label className="request-modal-label-text">Testimonial *</label>
                  <textarea
                    name="testimonial"
                    rows="4"
                    className="request-modal-textarea"
                    placeholder="Creative, professional, and easy to work with..."
                    value={formData.testimonial}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {status === 'sending' && (
                  <p style={{ color: '#38bdf8', fontSize: '0.9rem', marginTop: '1rem' }}>Submitting your review...</p>
                )}
              </Step>
            </Stepper>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto'
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="request-modal-h2" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Review Submitted!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              Thank you for your feedback! It has been received and is pending approval.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
