import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import NavMenu from './NavMenu';
import RequestModal from './RequestModal';
import Particles from './Particles';
import MetaBalls from './MetaBalls';
import Testimonials from './Testimonials';
import RotatingText from './components/ui/RotatingText';
import WhatWeDoBest from './WhatWeDoBest';
import { Stats } from './components/ui/statistics-card';
import InitialLoader from './InitialLoader';
import { supabase } from './supabaseClient';



// ─── Social Icon Components ───────────────────────────────────────────────────
const IconBehance = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.259 0-6.625-2.859-6.625-6.923 0-4.484 2.809-7.077 6.643-7.077 4.195 0 6.069 2.946 5.86 6.554h-9.45c.088 2.051 1.488 3.518 3.52 3.518 1.494 0 2.518-.737 2.955-1.782l2.198 2.71zm-9.043-5.548h6.467c-.073-1.686-.999-2.732-2.92-2.732-1.921 0-3.328 1.109-3.547 2.732zm-10.683-7.452h5.719c2.479 0 4.181.996 4.181 3.036 0 1.277-.665 2.215-1.777 2.684 1.439.421 2.378 1.543 2.378 3.208 0 2.454-2.024 3.572-4.521 3.572h-6.04v-12.5zm3.178 4.797h2.181c.883 0 1.562-.398 1.562-1.229 0-.853-.668-1.19-1.574-1.19h-2.169v2.419zm0 5.375h2.463c1.037 0 1.838-.456 1.838-1.393 0-.962-.832-1.404-1.879-1.404h-2.422v2.797z" />
  </svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IconSpotify = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.36a.624.624 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.78-.97a.625.625 0 0 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.12.3.18.39.57.2.86zm1.24-2.76a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 0 1-.44-1.49c3.63-1.1 8.14-.57 11.22 1.33.37.23.49.71.26 1.07zm.11-2.88C14.25 8.95 9.26 8.77 6.41 9.6a.937.937 0 1 1-.54-1.8c3.27-.99 8.71-.8 12.14 1.34.44.26.58.83.32 1.27a.937.937 0 0 1-1.34.31z" />
  </svg>
);
const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ─── Inline SVG Logo Wordmark ──────────────────────────────────────────────────
const InlineLogo = () => (
  <svg viewBox="0 0 355 110" style={{ width: '100%', height: 'auto', display: 'block' }}>
    <text
      x="0"
      y="80"
      fill="white"
      fontFamily="'Inter Tight', sans-serif"
      fontWeight="700"
      fontSize="58"
      letterSpacing="-0.05em"
    >
      onlymaneesh
    </text>
    <circle cx="330" cy="50" r="10" stroke="white" strokeWidth="2" fill="none" />
    <text
      x="330"
      y="53.5"
      fill="white"
      fontFamily="'Inter Tight', sans-serif"
      fontWeight="700"
      fontSize="9"
      textAnchor="middle"
    >
      R
    </text>
  </svg>
);

const DEMO_CLIENTS = [
  { id: 1, name: 'Sarah Chen', image_url: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Marcus Johnson', image_url: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=100&auto=format&fit=crop' },
  { id: 3, name: 'Elena Rodriguez', image_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop' }
];

// ─── Main App Component ────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [localTime, setLocalTime] = useState('8:41am');
  const [width, setWidth] = useState(window.innerWidth);
  const [scrollPast, setScrollPast] = useState(false);
  const [clientAvatars, setClientAvatars] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Fetch client avatars & preload core images
  useEffect(() => {
    let dbDone = false;
    let imgDone = false;

    const checkAllDone = () => {
      if (dbDone && imgDone) {
        setIsLoaded(true);
      }
    };

    // Preload main avatar image
    const img = new Image();
    img.src = '/assets/avatar.png';
    img.onload = () => {
      imgDone = true;
      checkAllDone();
    };
    img.onerror = () => {
      imgDone = true;
      checkAllDone();
    };

    const fetchClientAvatars = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('id, name, image_url')
          .order('display_order', { ascending: true })
          .limit(4);
        
        if (error) throw error;
        if (data && data.length > 0) {
          setClientAvatars(data);
        } else {
          setClientAvatars(DEMO_CLIENTS);
        }
      } catch (err) {
        console.error('Error fetching client avatars:', err);
        setClientAvatars(DEMO_CLIENTS);
      } finally {
        dbDone = true;
        checkAllDone();
      }
    };
    fetchClientAvatars();
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
    });

    // Drive data-parallax elements
    function updateParallax() {
      const els = document.querySelectorAll('[data-parallax]');
      els.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = center * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
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

  // ── 6. Detect scroll past hero for sticky nav ──────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrollPast(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <>
      <InitialLoader isLoaded={isLoaded} />
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Mobile Top Header (with Logo and Hamburger) */}
      <header className={`mobile-header${scrollPast ? ' mobile-header--scrolled' : ''}`}>
        <div className="mobile-header-logo" onClick={() => scrollTo('#home')}>
          onlymaneesh
        </div>
        <button 
          className="mobile-hamburger-btn" 
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </header>

      {/* ── HERO SECTION ── */}
      <section id="home" className="hero-typography-section">
        <MetaBalls
          className="hero-particles"
          color="#f1f5f9"
          cursorBallColor="#e2e8f0"
          cursorBallSize={2}
          ballCount={15}
          animationSize={28}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={2}
          speed={0.9}
        />

        {/* Top-left logo overlay */}
        <button className="hero-topleft-logo" onClick={() => scrollTo('#home')}>onlymaneesh</button>

        {/* Layer 1: Giant background name text (behind avatar) */}
        <div className="hero-bg-name" data-parallax="0.2">
          <div className="hero-bg-name-top">
            <span className="hero-eyebrow-tag">CREATIVE</span>
            <span className="hero-eyebrow-tag">UI/UX DESIGNER</span>
            <span className="hero-eyebrow-tag">SOFTWARE DEVELOPER</span>
          </div>
          <div className="hero-bg-word">MANEESH</div>
          <div className="hero-bg-word">AMINDU</div>
        </div>

        {/* Layer 2: Avatar portrait & Hiring Badge */}
        <div className="hero-portrait-wrap" >
          <img
            src="/assets/avatar.png"
            alt="Maneesh Amindu"
            className="hero-portrait-photo"
          />
          <div className="hero-hiring-badge">
            <span className="green-pulse-dot" />
            <span>Available for hiring</span>
          </div>
        </div>

        {/* Layer 3: Floating Left content (Intro & CV & Clients) */}
        <div className="hero-left-col hero-glass-card">
          <p className="hero-intro-text animated-intro">
            <strong>Mobile App Developer & Creative UI/UX Designer</strong> crafting clean digital products and modern user experiences.
          </p>
          
          {clientAvatars.length > 0 && (
            <div className="hero-clients-wrap">
              <div className="hero-clients-avatars">
                {clientAvatars.slice(0, 4).map((client, i) => (
                  <img 
                    key={client.id || i} 
                    src={client.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'} 
                    alt={client.name || 'Client'} 
                    className="hero-client-avatar-circle" 
                    title={client.name}
                  />
                ))}
              </div>
              <span className="hero-clients-text">Trusted by founders & creators</span>
            </div>
          )}

          <a href="/assets/maneesh_amindu_cv.pdf" download="maneesh_amindu_cv.pdf" className="hero-cv-btn">
            <span>Download CV</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hero-cv-btn-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>

        {/* Layer 4: Floating Right content (Stat Cards) */}
        <div className="hero-right-col">
          <div className="hero-stat-card-item hero-glass-card">
            <span className="hero-stat-number">20+</span>
            <span className="hero-stat-label">Projects Completed</span>
          </div>
          <div className="hero-stat-card-item hero-glass-card">
            <span className="hero-stat-number">2+</span>
            <span className="hero-stat-label">Years of Experience</span>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="hero-scroll-down">
          <span className="hero-scroll-down-text">Scroll</span>
          <div className="hero-scroll-down-mouse">
            <div className="hero-scroll-down-wheel" />
          </div>
        </div>

      </section>

      {/* ── STICKY CAPSULE NAVBAR ── */}
      <nav className={`capsule-navbar ${scrollPast ? 'capsule-navbar--visible' : ''}`} aria-label="Capsule navigation">
        <div className="capsule-navbar-inner">
          <button className="capsule-nav-item" onClick={() => scrollTo('#home')}>HOME</button>
          <button className="capsule-nav-item" onClick={() => scrollTo('#about')}>ABOUT</button>
          <button className="capsule-nav-item mobile-hide" onClick={() => scrollTo('#tech-stack')}>SKILLS</button>
          <button className="capsule-nav-item" onClick={() => scrollTo('#works')}>WORK</button>

          <button className="capsule-nav-talk-btn" onClick={() => setContactOpen(true)}>
            LET'S TALK
          </button>
        </div>
      </nav>

      {/* ── PORTFOLIO MAIN CONTENT ── */}
      <main id="main-content" style={{ position: 'relative', zIndex: 15, background: 'var(--background)' }}>

        {/* 1. ABOUT SECTION */}
        <About />

        {/* 1.5. TESTIMONIALS SECTION */}
        <Testimonials />

        {/* 2. TECH STACK (Skills) SECTION */}
        <Skills />

        {/* 3. ROTATING TEXT BAND (Replaces Flowing Menu) */}
        <section style={{ padding: '100px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0' }}>
          <div style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '900', color: 'var(--foreground, #0a0a0a)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
            <span>We</span>
            <RotatingText 
              texts={['Code', 'Design', 'Deploy']} 
              mainClassName="rotating-badge"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
            <span>Experiences.</span>
          </div>
        </section>

        {/* 4. SELECTED WORK (Projects) SECTION */}
        <Projects />

        {/* 5. EXPERTISE (What We Do Best) SECTION FEATURING SCROLL STACK */}
        <WhatWeDoBest onStartProject={() => setContactOpen(true)} />

        {/* 6. STATS SECTION */}
        <Stats />

      </main>

      {/* ── FOOTER SECTION ── */}
      <footer className="footer">
        <Particles
          particleColors={['#0f172a', '#3b82f6']}
          particleCount={35}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={60}
          className="footer-particles"
        />
        <div className="shell footer-inner">
          {/* Top CTA Banner */}
          <div className="footer-cta-card">
            <div className="footer-cta-content">
              <span className="footer-cta-eyebrow">LET'S COLLABORATE</span>
              <h2 className="footer-cta-h2">
                Have a project in mind? Let's build something extraordinary.
              </h2>
            </div>
            <button className="footer-cta-btn" onClick={() => setContactOpen(true)}>
              <span>Start a project</span>
              <span className="footer-cta-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </button>
          </div>

          {/* Grid Columns */}
          <div className="footer-cols">
            {/* Brand Col */}
            <div className="footer-brand-col">
              <div className="footer-logo">
                <InlineLogo />
              </div>
              <p className="footer-tagline">
                A creative developer, designer, and music producer building high-impact digital experiences with quiet precision.
              </p>

              <div className="footer-location-chip">
                <span className="green-pulse-dot" />
                <span>Available worldwide · Based in Sri Lanka</span>
              </div>

              <div className="footer-social-row">
                {[
                  { href: 'https://www.behance.net/maneesh_amindu', icon: <IconBehance />, label: 'Behance' },
                  { href: 'https://github.com/manee235', icon: <IconGithub />, label: 'GitHub' },
                  { href: 'https://instagram.com/only.maneesh', icon: <IconInstagram />, label: 'Instagram' },
                  { href: 'https://facebook.com', icon: <IconFacebook />, label: 'Facebook' },
                  { href: 'https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs', icon: <IconSpotify />, label: 'Spotify' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className="footer-social-btn"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate Col */}
            <div className="footer-col">
              <span className="footer-col-title">NAVIGATE</span>
              <div className="footer-col-links">
                {[
                  ['Home', '#home'],
                  ['About', '#about'],
                  ['Work', '#works'],
                  ['Skills', '#tech-stack'],
                  ['Contact', 'contact'],
                ].map(([label, id]) => (
                  <a
                    key={label}
                    href={id.startsWith('#') ? id : '#'}
                    className="footer-link-item"
                    onClick={(e) => { e.preventDefault(); id === 'contact' ? setContactOpen(true) : scrollTo(id); }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Col */}
            <div className="footer-col">
              <span className="footer-col-title">SERVICES</span>
              <div className="footer-col-links">
                {['Software Development', 'Product Design', 'Music Production', 'Graphic Design'].map((s) => (
                  <a key={s} href="#services" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Col */}
            <div className="footer-col footer-contact-col">
              <span className="footer-col-title">GET IN TOUCH</span>
              <div className="footer-contact-chips">
                <a href="tel:+94759051430" className="footer-contact-chip">
                  <span className="footer-chip-icon"><IconPhone /></span>
                  <span className="footer-chip-text">+94 75 905 1430</span>
                </a>
                <a href="mailto:ganegodmaneesh@gmail.com" className="footer-contact-chip">
                  <span className="footer-chip-icon"><IconMail /></span>
                  <span className="footer-chip-text">ganegodmaneesh@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="footer-legal-bar">
            <div className="footer-copyright">
              © {new Date().getFullYear()} onlymaneesh. All rights reserved.
            </div>
            <div className="footer-creator-tag">
              Designed &amp; Developed by <span>Maneesh Amindu</span>
            </div>
            <div className="footer-legal-links">
              <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>Privacy</a>
              <span className="footer-dot-sep">•</span>
              <a href="#home" className="footer-link-item" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-watermark">MANEESH</div>
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
