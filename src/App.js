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
import FlowingMenu from './FlowingMenu';
import InitialLoader from './InitialLoader';
import { supabase } from './supabaseClient';

const IconCode = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.293 6.293 2.586 12l5.707 5.707 1.414-1.414L5.414 12l4.293-4.293zm7.414 11.414L21.414 12l-5.707-5.707-1.414 1.414L18.586 12l-4.293 4.293z"></path></svg>;
const IconDesign = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c1.225 0 2.507-.358 2.507-1.793 0-.54-.2-1.018-.543-1.391A1.666 1.666 0 0 1 13.5 17.5h1.798c3.155 0 6.702-2.316 6.702-7.5C22 5.589 17.514 2 12 2zm0 18c0 .323-.105.415-.125.438-.02.022-.115.127-.438.127C6.673 20 4 17.327 4 12S6.673 4 12 4s8 3.589 8 6c0 4.093-2.651 5.5-4.702 5.5h-1.798a3.67 3.67 0 0 0-2.457 1.042c-.524.571-.979 1.493-.979 2.571a3.023 3.023 0 0 0 .164 1.026c-.052-.089-.148-.139-.228-.139z"></path><circle cx="8.5" cy="10.5" r="1.5"></circle><circle cx="10.5" cy="6.5" r="1.5"></circle><circle cx="14.5" cy="7.5" r="1.5"></circle><circle cx="16.5" cy="11.5" r="1.5"></circle></svg>;
const IconDeploy = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.203 11.233c-.22.112-.34.341-.31.58.03.24.195.438.423.51l5.441 1.705 3.393 7.828c.092.213.298.344.524.344h.018c.23-.005.43-.146.516-.364l7.632-19.464c.096-.245.031-.527-.165-.724-.195-.196-.477-.26-.723-.165L2.203 11.233zm16.143-6.26-9.67 9.67-3.955-1.24 13.625-8.43zm-8.43 13.625-1.24-3.955 9.67-9.67-8.43 13.625z"></path></svg>;

const flowingMenuItems = [
  { link: '#', text: 'Code', icon: IconCode },
  { link: '#', text: 'Design', icon: IconDesign },
  { link: '#', text: 'Deploy', icon: IconDeploy }
];

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

        {/* 3. FLOWING MENU (Replaces Create Band) */}
        <section style={{ height: '600px', position: 'relative', margin: '100px 0' }}>
          <FlowingMenu items={flowingMenuItems} speed={12} bgColor="#ffffff" textColor="#111111" marqueeBgColor="#111111" marqueeTextColor="#ffffff" borderColor="rgba(0,0,0,0.1)" />
        </section>

        {/* 4. SELECTED WORK (Projects) SECTION */}
        <Projects />

        {/* 5. EXPERTISE (Services) SECTION */}
        <section id="services" className="services-section">
          <div className="shell">
            <div className="eyebrow dark services-eyebrow">
              <span className="eyebrow-dot" />
              <span>Expertise</span>
            </div>
            <div className="services-h2-reveal">
              <h2 className="services-h2 services-h2-reveal-inner reveal">
                What we do best
              </h2>
            </div>

            <ul className="services-list">
              {[
                { idx: '01', name: 'Software Development', desc: 'Scalable web & mobile products built to last.' },
                { idx: '02', name: 'Product Design', desc: 'Interfaces that feel effortless and look sharp.' },
                { idx: '03', name: 'Music Production', desc: 'Sound design, electronic scores, and audio arrangement.' },
                { idx: '04', name: 'Graphic Design', desc: 'Visually striking assets, brand identities, and layouts.' },
              ].map((service, index) => (
                <li key={service.idx} className="services-row-wrapper reveal" style={{ transitionDelay: `${index * 80}ms` }}>
                  <a
                    href="#services"
                    className="services-row-link"
                    onClick={(e) => { e.preventDefault(); setContactOpen(true); }}
                  >
                    <span className="services-row-index">{service.idx}</span>
                    <h3 className="services-row-h3">{service.name}</h3>
                    <p className="services-row-desc">{service.desc}</p>
                    <div className="services-row-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. STATS SECTION */}
        <section className="stats-section">
          <div className="shell">
            <div className="stats-panel-wrapper reveal">
              <div className="stats-panel">
                <Particles
                  particleColors={['#ffffff', '#4f6bff']}
                  particleCount={30}
                  particleSpread={10}
                  speed={0.1}
                  particleBaseSize={70}
                  className="stats-panel-particles"
                />
                <div className="stats-eyebrow">
                  <div className="eyebrow light">
                    <span className="eyebrow-dot" />
                    <span>By the numbers</span>
                  </div>
                </div>
                <div className="stats-h2-reveal">
                  <h2 className="stats-h2 stats-h2-reveal-inner reveal">
                    Proof in the work, not the words.
                  </h2>
                </div>
                <ul className="stats-grid">
                  {[
                    { target: '20', suffix: '+', label: 'Projects & designs' },
                    { target: '98', suffix: '%', label: 'Client satisfaction' },
                    { target: '2', suffix: '+', label: 'Years of craft' },
                    { target: '12', suffix: '+', label: 'Happy clients' },
                  ].map((stat, idx) => (
                    <li key={idx} className="stats-item-wrapper reveal" style={{ transitionDelay: `${idx * 90}ms` }}>
                      <div className="stats-num">
                        <span>{stat.target}{stat.suffix}</span>
                      </div>
                      <div className="stats-label">{stat.label}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

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
