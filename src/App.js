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

  // ── 0. Dark Mode Class ───────────────────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
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
          color="#000000"
          cursorBallColor="#000000"
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
        <section style={{ padding: '120px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '60px 0' }}>
          <div style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
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
          particleColors={['#ffffff', '#4f6bff']}
          particleCount={40}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={80}
          className="footer-particles"
        />
        <div className="shell footer-inner">
          <div className="footer-cta-row">
            <div className="footer-cta-h2-reveal">
              <h2 className="footer-cta-h2 footer-cta-h2-reveal-inner reveal">
                Have a project in mind? Let's get to work.
              </h2>
            </div>
            <button className="pill-btn light with-arrow" onClick={() => setContactOpen(true)}>
              <span className="pill-btn-inner">
                <span>Start a project</span>
                <span className="pill-btn-arrow-badge up-right">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* Columns */}
          <div className="footer-cols">
            <div className="footer-brand-col">
              <div className="footer-logo" style={{ width: '220px', mixBlendMode: 'normal' }}>
                <InlineLogo />
              </div>
              <p className="footer-tagline">
                A creative developer, designer, and music producer building digital experiences with quiet precision.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                {[
                  { href: 'https://facebook.com', icon: <IconFacebook />, label: 'Facebook' },
                  { href: 'https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs', icon: <IconSpotify />, label: 'Spotify' },
                  { href: 'https://github.com/manee235', icon: <IconGithub />, label: 'GitHub' },
                  { href: 'https://instagram.com/only.maneesh', icon: <IconInstagram />, label: 'Instagram' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    style={{
                      width: '2rem', height: '2rem',
                      display: 'grid', placeItems: 'center',
                      borderRadius: '9999px',
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.875rem',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">Navigate</span>
              <div className="footer-col-links">
                {[['About', '#about'], ['Work', '#works'], ['Services', '#services'], ['Contact', 'contact']].map(([label, id]) => (
                  <a
                    key={label}
                    href={id.startsWith('#') ? id : '#'}
                    className="animated-link"
                    onClick={(e) => { e.preventDefault(); id === 'contact' ? setContactOpen(true) : scrollTo(id); }}
                  >
                    <span className="animated-link-span">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">Services</span>
              <div className="footer-col-links">
                {['Software Development', 'Product Design', 'Music Production', 'Graphic Design'].map((s) => (
                  <a key={s} href="#services" className="animated-link" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}>
                    <span className="animated-link-span">{s}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-legal-bar">
            <div>© {new Date().getFullYear()} onlymaneesh. All rights reserved.</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
              Designed &amp; Developed by <span style={{ color: '#fff', fontWeight: 600 }}>Maneesh Amindu</span>
            </div>
            <div className="footer-legal-links">
              <a href="#home" className="animated-link legal"><span className="animated-link-span">Privacy</span></a>
              <a href="#home" className="animated-link legal"><span className="animated-link-span">Terms</span></a>
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
