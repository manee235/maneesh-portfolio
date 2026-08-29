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

      {/* ── CONTACT SECTION ── */}
      <div className="pf-contact-section">
        <div className="pf-contact-inner">

          {/* Left */}
          <div className="pf-contact-left">
            <p className="pf-eyebrow">Get in touch</p>
            <h2 className="pf-title">Let's build<br />something great.</h2>
            <p className="pf-subtitle">
              Open to freelance projects, collaborations,<br />
              and full-time opportunities.
            </p>
            <div className="pf-social-links">
              <a href="https://github.com/manee235" target="_blank" rel="noreferrer">GitHub</a>
              <span className="pf-divider" />
              <a href="https://instagram.com/only.maneesh" target="_blank" rel="noreferrer">Instagram</a>
              <span className="pf-divider" />
              <a href="https://www.behance.net/maneesh_amindu" target="_blank" rel="noreferrer">Behance</a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="pf-contact-right">
            {submitted ? (
              <div className="pf-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Message sent — I'll be in touch soon.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="pf-form">
                <div className="pf-form-row">
                  <div className="pf-field">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="pf-field">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="pf-field">
                  <label>Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows="4"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="pf-submit">
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="pf-bottom">
        <div className="pf-bottom-inner">

          {/* Brand */}
          <div className="pf-brand">
            <img src="/assets/Profile.png" alt="Maneesh" className="pf-avatar" />
            <span className="pf-brand-name">onlymaneesh<span>.</span></span>
          </div>

          {/* Nav links */}
          <nav className="pf-nav-links" aria-label="Footer navigation">
            <a href="#home" onClick={nav('#home')}>Overview</a>
            <a href="#works" onClick={nav('#works')}>Work</a>
            <a href="#about" onClick={nav('#about')}>About</a>
            <a href="https://github.com/manee235" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.behance.net/maneesh_amindu" target="_blank" rel="noreferrer">Behance</a>
          </nav>

          {/* Newsletter */}
          {nlSubmitted ? (
            <p className="pf-nl-thanks">✓ Subscribed</p>
          ) : (
            <form onSubmit={handleNlSubmit} className="pf-nl">
              <input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          )}

        </div>

        {/* Legal */}
        <div className="pf-legal">
          <span>© {new Date().getFullYear()} onlymaneesh. All rights reserved.</span>
          <span className="pf-legal-status">
            <span className="pf-dot" />
            Sri Lanka · Remote
          </span>
          <span>Built by Maneesh Ganegoda</span>
        </div>
      </div>

    </footer>
  );
}
