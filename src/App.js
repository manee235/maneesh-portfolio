import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import InitialLoader from './InitialLoader';
import HeroStatement from './HeroStatement';
import About from './About';
import TechStack from './TechStack';
import Projects from './Projects';
import Testimonials from './Testimonials';
import NavMenu from './NavMenu';
import RequestModal from './RequestModal';

// ─── Main App Component ────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [localTime, setLocalTime] = useState('8:41am');
  const [width, setWidth] = useState(window.innerWidth);

  const lenisRef = useRef(null);
  const cursorRef = useRef(null);

  // Update viewport dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── 0. Light Mode Class ───────────────────────────────────────────────────────
  useEffect(() => {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    document.documentElement.classList.add('light-mode');
  }, []);

  // ── 1. Lenis smooth scroll ──────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll }) => {
      document.documentElement.style.setProperty('--scroll-y', `${scroll}px`);
      setScrolled(scroll > 25);
    });

    // Drive data-parallax elements with high-performance 3D transforms
    function updateParallax() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const vh = window.innerHeight;

      const els = document.querySelectorAll('[data-parallax]');
      els.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect = el.getBoundingClientRect();
        if (rect.bottom >= -50 && rect.top <= vh + 50) {
          const center = rect.top + rect.height / 2 - vh / 2;
          const offset = center * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        }
      });

      // Drive section transition depth
      const hero = document.getElementById('home');
      if (hero) {
        const heroProgress = Math.min(1, Math.max(0, scrollY / (vh * 0.85)));
        hero.style.setProperty('--hero-scroll-progress', heroProgress);
      }
    }

    function raf(t) {
      lenis.raf(t);
      updateParallax();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // ── 2. Scroll lock for overlays ─────────────────────────────────────────────
  useEffect(() => {
    const lenis = lenisRef.current;
    if (menuOpen || contactOpen) {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.removeProperty('overflow');
    }
  }, [menuOpen, contactOpen]);

  // ── 3. Live clock ──────────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const ampm = h >= 12 ? 'pm' : 'am';
      h = h % 12 || 12;
      setLocalTime(`${h}:${m}${ampm}`);
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  // ── 4. Scroll helper ───────────────────────────────────────────────────────
  const scrollTo = (id) => {
    if (lenisRef.current) lenisRef.current.scrollTo(id, { duration: 1.2 });
  };

  // ── 5. Mousemove custom cursor ──────────────────────────────────────────────
  useEffect(() => {
    const isDesktop = width >= 1024;
    const handleMouseMove = (e) => {
      if (cursorRef.current && isDesktop) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [width]);

  const [heroAnimated, setHeroAnimated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [footerSubmitted, setFooterSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(currentScroll > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    <>
      {/* ── PRELOADER / INTRO SCREEN (Matching Reference Design) ── */}
      <InitialLoader onComplete={() => setHeroAnimated(true)} />

      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* ── TOP HEADER (MORPHS TO FLOATING PILL ON SCROLL) ── */}
      <header className={`mv-top-header ${heroAnimated ? 'mv-animated' : ''} ${scrolled ? 'is-pill-scrolled' : ''}`}>
        {/* Left: Profile Image + Brand Name */}
        <div className="mv-brand-wrap" onClick={() => scrollTo('#home')}>
          <img
            src="/assets/Profile.png"
            alt="Maneesh"
            className="mv-brand-avatar"
          />
          <span className="mv-brand-name">
            onlymaneesh<span className="mv-brand-dot">.</span>
            <span className="mv-brand-rights">®</span>
          </span>
        </div>

        {/* Center: Nav Links */}
        <nav className="mv-center-nav-links">
          <button onClick={() => scrollTo('#home')}>HOME</button>
          <button onClick={() => scrollTo('#about')}>ABOUT</button>
          <button onClick={() => scrollTo('#works')}>PROJECTS</button>
          <button onClick={() => setContactOpen(true)}>CONTACT</button>
        </nav>

        {/* Right: Hire Now CTA + Menu Button */}
        <div className="mv-header-right-actions">
          <button className="mv-hire-now-btn" onClick={() => setContactOpen(true)}>
            <span>Hire Now</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>

          <button className="mv-menu-toggle-btn" onClick={() => setMenuOpen(true)} aria-label="Open Menu">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section id="home" className={`mv-hero-section ${heroAnimated ? 'mv-hero-animated' : ''}`}>

        {/* Giant Midnight Behind-Text — lowest layer */}
        <div className="mv-behind-name-layer" aria-hidden="true">
          <div className="mv-behind-word">MANEESH</div>
          <div className="mv-behind-word">AMINDU</div>
        </div>

        {/* Centerpiece Portrait — mid layer */}
        <div className="mv-portrait-stage">
          <img
            src="/assets/avatar.png"
            alt="Maneesh Amindu"
            className="mv-portrait-img"
          />
          <div className="mv-portrait-gradient-fade" />
        </div>

        {/* ── LEFT INFO PANEL ── */}
        <div className="mv-hero-left-panel">
          {/* Role Tags */}
          <div className="mv-roles-stack">
            <span>DEVELOPER</span>
            <span>DESIGNER</span>
            <span>CREATIVE</span>
            <span>ENGINEER</span>
          </div>

          {/* Download CV CTA */}
          <div className="mv-hero-ctas">
            <a
              href="/assets/maneesh_amindu_cv.pdf"
              download="maneesh_amindu_cv.pdf"
              className="mv-download-cv-btn"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* ── RIGHT BENTO STAT GRID (Reference Match) ── */}
        <div className="mv-hero-right-bento">
          {/* Card 1: Large Card (Left) */}
          <div className="mv-bento-card mv-bento-large">
            <div className="mv-bento-badge">SATISFACTION</div>
            <div className="mv-bento-big-num">99%</div>
            <p className="mv-bento-desc">
              Delivering high-performance web &amp; mobile solutions for international clients.
            </p>
            <div className="mv-bento-hatch-pattern" />
          </div>

          {/* Right Column Grid */}
          <div className="mv-bento-right-stack">
            {/* Card 2: Growth + Bars */}
            <div className="mv-bento-card mv-bento-growth">
              <div className="mv-bento-growth-left">
                <span className="mv-bento-label">PROJECTS</span>
                <span className="mv-bento-growth-num">20+</span>
              </div>
              <div className="mv-bento-bars">
                <span style={{ height: '24%' }} />
                <span style={{ height: '38%' }} />
                <span style={{ height: '48%' }} />
                <span style={{ height: '35%' }} />
                <span style={{ height: '62%' }} />
                <span style={{ height: '54%' }} />
                <span style={{ height: '78%' }} />
                <span style={{ height: '68%' }} />
                <span style={{ height: '92%' }} />
                <span style={{ height: '100%' }} />
              </div>
            </div>

            {/* Bottom Row: 2 Mini Cards */}
            <div className="mv-bento-bottom-row">
              {/* Card 3: 2+ Years */}
              <div className="mv-bento-card mv-bento-mini mv-bento-awards">
                <span className="mv-bento-mini-num">2+</span>
                <span className="mv-bento-mini-label">YEARS EXP</span>
              </div>

              {/* Card 4: 4.9/5.0 Reviews */}
              <div className="mv-bento-card mv-bento-mini mv-bento-rating">
                <div className="mv-bento-star-circle">
                  ★
                </div>
                <div className="mv-bento-rating-info">
                  <span className="mv-bento-rating-score">4.9 / 5.0</span>
                  <span className="mv-bento-rating-sub">Client Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── PORTFOLIO MAIN CONTENT ── */}
      <main id="main-content" style={{ position: 'relative', zIndex: 15, background: 'var(--background)' }}>

        {/* ABOUT & QUALIFICATIONS TIMELINE */}
        <About />

        {/* STATEMENT BANNER (We build smarter products) */}
        <HeroStatement />

        {/* WORKFLOW & MOVING TECH STACK */}
        <TechStack />

        {/* SELECTED WORK (Projects) SECTION */}
        <Projects />

        {/* WHAT OUR USERS SAY (Testimonials Section) */}
        <Testimonials />

      </main>

      {/* ── FOOTER SECTION (Reference Design in White BG) ── */}
      <footer className="footer" id="contact">
        <div className="shell footer-inner">
          <div className="footer-cols">
            {/* Left Brand & Newsletter Column */}
            <div className="footer-brand-col">
              <div className="footer-brand-header">
                <span className="footer-brand-logo">
                  onlymaneesh<span className="footer-brand-dot">.</span>
                  <span className="footer-brand-reg">®</span>
                </span>
              </div>
              <p className="footer-tagline">
                Creative developer, UI/UX engineer &amp; sound producer. Built for modern browsers, scalable by default.
              </p>

              {/* Contact Us / Leave a Message Form */}
              <form
                className="footer-contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFooterSubmitted(true);
                  setTimeout(() => setFooterSubmitted(false), 6000);
                }}
              >
                {footerSubmitted ? (
                  <div className="footer-form-success">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                ) : (
                  <>
                    <div className="footer-form-row">
                      <input
                        type="text"
                        placeholder="Your name"
                        className="footer-form-input"
                        required
                      />
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="footer-form-input"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Leave your message or project ideas..."
                      className="footer-form-textarea"
                      rows="3"
                      required
                    />
                    <button type="submit" className="footer-form-submit-btn">
                      <span>Send Message</span>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </>
                )}
              </form>
            </div>

            {/* Col 1: PRODUCT */}
            <div className="footer-col">
              <span className="footer-col-title">PRODUCT</span>
              <div className="footer-col-links">
                <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>OVERVIEW</a>
                <a href="#projects" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#projects'); }}>SELECTED WORK</a>
                <a href="#tech-stack" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#tech-stack'); }}>TECH STACK</a>
                <a href="#about" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#about'); }}>EXPERTISE</a>
                <a href="#projects" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#projects'); }}>CHANGELOG</a>
              </div>
            </div>

            {/* Col 2: RESOURCES */}
            <div className="footer-col">
              <span className="footer-col-title">RESOURCES</span>
              <div className="footer-col-links">
                <a href="/assets/maneesh_amindu_cv.pdf" download="maneesh_amindu_cv.pdf" className="footer-link-item">DOWNLOAD CV</a>
                <a href="https://github.com/manee235" target="_blank" rel="noreferrer" className="footer-link-item">GITHUB REPOS</a>
                <a href="https://www.behance.net/maneesh_amindu" target="_blank" rel="noreferrer" className="footer-link-item">BEHANCE SHOTS</a>
                <a href="https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA" target="_blank" rel="noreferrer" className="footer-link-item">SPOTIFY TRACKS</a>
                <a href="mailto:ganegodamaneesh@gmail.com" className="footer-link-item">DIRECT EMAIL</a>
              </div>
            </div>

            {/* Col 3: COMPANY */}
            <div className="footer-col">
              <span className="footer-col-title">COMPANY</span>
              <div className="footer-col-links">
                <a href="#about" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#about'); }}>ABOUT</a>
                <a href="https://instagram.com/only.maneesh" target="_blank" rel="noreferrer" className="footer-link-item">INSTAGRAM</a>
                <a href="tel:+94759051430" className="footer-link-item">PHONE</a>
                <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>CAREERS</a>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => setContactOpen(true)}
                >
                  CONTACT
                </button>
              </div>
            </div>

            {/* Col 4: LEGAL */}
            <div className="footer-col">
              <span className="footer-col-title">LEGAL</span>
              <div className="footer-col-links">
                <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>PRIVACY</a>
                <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>TERMS</a>
                <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>SECURITY</a>
                <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>COOKIES</a>
              </div>
            </div>
          </div>

          {/* Bottom Sub-footer */}
          <div className="footer-legal-bar">
            <div className="footer-copyright">
              © {new Date().getFullYear()} onlymaneesh.®
            </div>
            <div className="footer-systems-status">
              <span className="footer-status-dot" />
              <span>ALL SYSTEMS NORMAL</span>
            </div>
            <div className="footer-location-tag">
              SRI LANKA &nbsp;·&nbsp; REMOTE
            </div>
          </div>
        </div>
      </footer>

      {/* ── OVERLAYS ── */}
      <NavMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={scrollTo}
        onOpenContact={() => setContactOpen(true)}
        localTime={localTime}
      />
      <RequestModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}

export default App;
