import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from './supabaseClient';
import './TestimonialForm.css';

export default function TestimonialForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    job_title: '',
    company: '',
    testimonial: '',
    rating: 5,
    image_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

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

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // Insert new testimonial. We set is_active: false so it requires approval before showing up.
      const { error } = await supabase.from('testimonials').insert([{
        name: formData.name,
        job_title: formData.job_title,
        company: formData.company,
        image_url: formData.image_url,
        testimonial: formData.testimonial,
        rating: formData.rating,
        is_active: true 
      }]);

      if (error) throw error;

      setSuccessMsg('Thank you! Your feedback has been submitted for review.');
      setFormData({ name: '', job_title: '', company: '', image_url: '', testimonial: '', rating: 5 });
      
      // Close automatically after 3 seconds
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 3000);
      
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="tf-overlay" onClick={onClose}>
      <div className="tf-modal" onClick={e => e.stopPropagation()}>
        <button className="tf-close" onClick={onClose}>&times;</button>
        
        <h2 className="tf-title">Share Your Experience</h2>
        <p className="tf-subtitle">How was your experience working with me?</p>

        {successMsg ? (
          <div className="tf-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{successMsg}</p>
          </div>
        ) : (
          <form className="tf-form" onSubmit={handleSubmit}>
            <div className="tf-row">
              <div className="tf-group">
                <label>Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" />
              </div>
              <div className="tf-group">
                <label>Profile Picture</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{ padding: '9px 12px' }}
                />
              </div>
            </div>

            <div className="tf-row">
              <div className="tf-group">
                <label>Job Title</label>
                <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} placeholder="Product Manager" />
              </div>
              <div className="tf-group">
                <label>Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Tech Inc." />
              </div>
            </div>

            <div className="tf-group tf-full">
              <label>Rating *</label>
              <div className="tf-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`tf-star-btn ${star <= formData.rating ? 'active' : ''}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="tf-group tf-full">
              <label>Your Feedback *</label>
              <textarea name="testimonial" value={formData.testimonial} onChange={handleChange} required placeholder="Creative, professional, and easy to work with. Love the final design!" rows="4" />
            </div>

            {errorMsg && <div className="tf-error">{errorMsg}</div>}

            <button type="submit" className="tf-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
