import React, { useState } from 'react';
import './PortfolioFooter.css';

export default function PortfolioFooter({ onNavigate, onOpenContact }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [nlSubmitted, setNlSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleNlSubmit = (e) => {
    e.preventDefault();
    setNlSubmitted(true);
    setNewsletterEmail('');
    setTimeout(() => setNlSubmitted(false), 4000);
  };

  const nav = (id) => (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate(id);
  };

  return (
    <footer className="pf-footer" id="contact">

      {/* ── TOP CARD: Contact Us (replaces affiliate card) ── */}
      <div className="pf-top-card-wrap">
        <div className="pf-contact-card">

          {/* Left: Text content */}
          <div className="pf-contact-card-left">
            <span className="pf-contact-card-eyebrow">Get in Touch</span>
            <h2 className="pf-contact-card-title">
              Start a <span className="pf-contact-highlight">Conversation</span>
            </h2>
            <p className="pf-contact-card-desc">
              Have a project in mind? I'd love to hear about it.
              Let's create something <strong>exceptional</strong> together.
            </p>

            {/* Inline mini social links */}
            <div className="pf-contact-socials">
              <a href="https://github.com/manee235" target="_blank" rel="noreferrer" className="pf-contact-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a href="https://instagram.com/only.maneesh" target="_blank" rel="noreferrer" className="pf-contact-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
              <a href="https://www.behance.net/maneesh_amindu" target="_blank" rel="noreferrer" className="pf-contact-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM13 19.928c-1.564 1.426-4.789 1.284-7.014 1.284v-14h6.874c3.021 0 5.188 1.068 5.188 3.758 0 1.504-.784 2.637-2.045 3.164C18.225 14.666 19 16.072 19 17.5c0 1.928-2.174 2.318-3.026 2.428H13zm-4.89-9.078h3.876c1.328 0 2.014-.438 2.014-1.441 0-1.07-.787-1.441-2.014-1.441H8.11v2.882zm0 4.985h4.122c1.474 0 2.254-.524 2.254-1.728 0-1.136-.845-1.648-2.254-1.648H8.11v3.376z" />
                </svg>
                Behance
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="pf-contact-card-right">
            {submitted ? (
              <div className="pf-form-success">
                <div className="pf-form-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="26" height="26">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <p className="pf-form-success-text">Message sent! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="pf-contact-form">
                <div className="pf-form-row">
                  <div className="pf-form-field">
                    <label className="pf-form-label">Name</label>
                    <input
                      type="text"
                      className="pf-form-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="pf-form-field">
                    <label className="pf-form-label">Email</label>
                    <input
                      type="email"
                      className="pf-form-input"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="pf-form-field">
                  <label className="pf-form-label">Message</label>
                  <textarea
                    className="pf-form-input pf-form-textarea"
                    placeholder="Tell me about your project..."
                    rows="3"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="pf-form-submit">
                  <span>Send Message</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Background decorative nodes (like reference) */}
          <div className="pf-card-deco" aria-hidden="true">
            <div className="pf-deco-node pf-deco-n1" />
            <div className="pf-deco-node pf-deco-n2" />
            <div className="pf-deco-node pf-deco-n3" />
            <div className="pf-deco-node pf-deco-n4" />
            <div className="pf-deco-ring" />
            <div className="pf-deco-dot pf-deco-d1" />
            <div className="pf-deco-dot pf-deco-d2" />
          </div>
        </div>
      </div>

      {/* ── BOTTOM FOOTER BAR ── */}
      <div className="pf-bottom-wrap">
        <div className="pf-bottom-inner">

          {/* Brand column */}
          <div className="pf-brand-col">
            <div className="pf-brand-logo-row">
              <img
                src="/assets/Profile.png"
                alt="Maneesh Ganegoda"
                className="pf-brand-avatar"
              />
              <span className="pf-brand-name">
                onlymaneesh<span className="pf-brand-dot">.</span>
              </span>
            </div>
            <p className="pf-brand-tagline">
              The most expressive creative portfolio.<br />
              UI/UX, Code &amp; Sound — by Maneesh Ganegoda.
            </p>
          </div>

          {/* Company links */}
          <div className="pf-links-col">
            <span className="pf-col-heading">Company</span>
            <ul className="pf-link-list">
              <li><a href="#home" onClick={nav('#home')}>Overview</a></li>
              <li><a href="#works" onClick={nav('#works')}>Selected Work</a></li>
              <li><a href="#about" onClick={nav('#about')}>About</a></li>
              <li><button type="button" onClick={onOpenContact} className="pf-link-btn">Contact Us</button></li>
            </ul>
          </div>

          {/* Socials links */}
          <div className="pf-links-col">
            <span className="pf-col-heading">Socials</span>
            <ul className="pf-link-list">
              <li>
                <a href="https://github.com/manee235" target="_blank" rel="noreferrer" className="pf-ext-link">
                  GitHub
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                    <path d="M3 11L11 3M11 3H6M11 3V8" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/only.maneesh" target="_blank" rel="noreferrer" className="pf-ext-link">
                  Instagram
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                    <path d="M3 11L11 3M11 3H6M11 3V8" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.behance.net/maneesh_amindu" target="_blank" rel="noreferrer" className="pf-ext-link">
                  Behance
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                    <path d="M3 11L11 3M11 3H6M11 3V8" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs" target="_blank" rel="noreferrer" className="pf-ext-link">
                  Spotify
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                    <path d="M3 11L11 3M11 3H6M11 3V8" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="pf-newsletter-col">
            <span className="pf-col-heading">Newsletter</span>
            <p className="pf-nl-desc">
              Receive updates on new work, design insights, and creative experiments.
            </p>
            {nlSubmitted ? (
              <p className="pf-nl-thanks">✓ You're subscribed!</p>
            ) : (
              <form onSubmit={handleNlSubmit} className="pf-nl-form">
                <input
                  type="email"
                  className="pf-nl-input"
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="pf-nl-btn" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* ── Legal bar ── */}
        <div className="pf-legal-bar">
          <span className="pf-legal-copy">
            © {new Date().getFullYear()} onlymaneesh.® · All rights reserved.
          </span>
          <span className="pf-legal-mid">
            <span className="pf-legal-dot" />
            SRI LANKA · REMOTE
          </span>
          <span className="pf-legal-right">
            Built by Maneesh Ganegoda
          </span>
        </div>
      </div>

    </footer>
  );
}
