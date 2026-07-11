import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import PageLoader from './PageLoader';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import NavMenu from './NavMenu';
import RequestModal from './RequestModal';
import Particles from './Particles';

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
// ─── Brand Logo (SVG wordmark) ─────────────────────────────────────────────
const BrandLogo = ({ height = 18, style = {} }) => (
  <img
    src="/assets/logo new.svg"
    alt="onlymaneesh"
    style={{ height: height, width: 'auto', display: 'block', ...style }}
  />
);

// ─── Timings & Reveals Hook ───────────────────────────────────────────────────
function useRevealState(ready, delay) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [ready, delay]);
  return revealed;
}

// ─── Intersection Hook ────────────────────────────────────────────────────────
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

// ─── Stat Count-up Component ──────────────────────────────────────────────────
const StatNumber = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useOnScreen(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const startTime = performance.now();
    const num = parseInt(target, 10);
    let animFrame;
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(progress * num));
      if (progress < 1) animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [localTime, setLocalTime] = useState('8:41am');
  const lenisRef = useRef(null);

  // ── 1. Lenis smooth scroll ──────────────────────────────────────────────────
  // ── 0. Global Dark Mode Class ───────────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
  }, []);

  // ── 1. Lenis smooth scroll & parallax variables ─────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Track scroll for parallax translations
    lenis.on('scroll', ({ scroll, progress }) => {
      document.documentElement.style.setProperty('--scroll-y', `${scroll}px`);
      document.documentElement.style.setProperty('--scroll-progress', progress);
    });

    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // ── 2. Scroll lock ──────────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!ready || menuOpen || contactOpen) {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.removeProperty('overflow');
    }
  }, [ready, menuOpen, contactOpen]);

  // ── 3. Adaptive grid ───────────────────────────────────────────────────────
  useEffect(() => {
    function apply() {
      const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
      const w = window.innerWidth;
      const widthReduction = ((baseWidth - w) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
      if (size > FONT_BASE) document.documentElement.style.fontSize = size + 'px';
      else document.documentElement.style.removeProperty('font-size');
    }
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  // ── 4. Live clock ──────────────────────────────────────────────────────────
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

  // ── 5. Scroll helper ───────────────────────────────────────────────────────
  const scrollTo = (id) => {
    if (lenisRef.current) lenisRef.current.scrollTo(id, { duration: 1.2 });
  };

  // ── 6. Entrance reveal states ─────────────────────────────────────────────────
  const showHeroContent = useRevealState(ready, 400); // Navbar reveals after hero is ready

  // Section intersection observers
  const bandRef = useRef(null); const bandInView = useOnScreen(bandRef);
  const servicesRef = useRef(null); const servicesInView = useOnScreen(servicesRef);
  const statsRef = useRef(null); const statsInView = useOnScreen(statsRef);
  const footerRef = useRef(null); const footerInView = useOnScreen(footerRef);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* ── HEADER ── */}
      <header className={`hero-header ${showHeroContent ? 'reveal' : ''}`}>
        <div className="hero-header-left">
          <button onClick={() => scrollTo('#home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }} aria-label="Go to top">
            <BrandLogo height={16} />
          </button>
        </div>

        <div className="hero-header-right">
          <button className="hero-nav-link" onClick={() => scrollTo('#home')}>Home</button>
          <button className="hero-nav-link" onClick={() => scrollTo('#about')}>About</button>
          <button className="hero-nav-link" onClick={() => scrollTo('#tech-stack')}>Tech Stack</button>
          <button className="hero-nav-link" onClick={() => scrollTo('#works')}>Projects</button>
          <button className="hero-nav-link" onClick={() => setContactOpen(true)}>Contact</button>

          <button className="hero-close-button" onClick={() => setMenuOpen(true)} aria-label="Open Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem' }}>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── HERO SECTION (Video → Freeze → Content) ── */}
      <PageLoader onComplete={() => setReady(true)} />

      <main id="main-content">
        {/* 2. ABOUT */}
        <About />

        {/* Tech Stack (Skills) Section */}
        <Skills />

        {/* 3. CREATE BAND */}
        <section className="create-band" ref={bandRef}>
          <div className="shell">
            <ul className="create-band-list">
              {[
                { label: 'Code', cls: 'light' },
                { label: 'Design', cls: 'accent' },
                { label: '→', cls: 'dark', isSvg: true },
                { label: 'Ship', cls: 'ghost' },
              ].map((item, i) => (
                <li
                  key={item.label}
                  className={`create-band-item-wrapper ${bandInView ? 'reveal' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className={`create-band-tile ${item.cls}`}>
                    {item.isSvg
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      : item.label
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. PORTFOLIO */}
        <Projects />

        {/* 5. SERVICES */}
        <section id="services" className="services-section" ref={servicesRef}>
          <div className="shell">
            <div className="eyebrow dark services-eyebrow">
              <span className="eyebrow-dot" />
              <span>Expertise</span>
            </div>
            <div className="services-h2-reveal">
              <h2 className={`services-h2 services-h2-reveal-inner ${servicesInView ? 'reveal' : ''}`}>
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
                <li
                  key={service.idx}
                  className={`services-row-wrapper ${servicesInView ? 'reveal' : ''}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
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
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. STATS */}
        <section className="stats-section" ref={statsRef}>
          <div className="shell">
            <div className={`stats-panel-wrapper ${statsInView ? 'reveal' : ''}`}>
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
                  <h2 className={`stats-h2 stats-h2-reveal-inner ${statsInView ? 'reveal' : ''}`}>
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
                    <li
                      key={idx}
                      className={`stats-item-wrapper ${statsInView ? 'reveal' : ''}`}
                      style={{ transitionDelay: `${idx * 90}ms` }}
                    >
                      <div className="stats-num"><StatNumber target={stat.target} suffix={stat.suffix} /></div>
                      <div className="stats-label">{stat.label}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="footer" ref={footerRef}>
        <Particles
          particleColors={['#ffffff', '#4f6bff']}
          particleCount={40}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={80}
          className="footer-particles"
        />
        <div className="shell footer-inner">
          {/* CTA Row */}
          <div className="footer-cta-row">
            <div className="footer-cta-h2-reveal">
              <h2 className={`footer-cta-h2 footer-cta-h2-reveal-inner ${footerInView ? 'reveal' : ''}`}>
                Have a project in mind? Let's get to work.
              </h2>
            </div>
            <button className="pill-btn light with-arrow" onClick={() => setContactOpen(true)}>
              <span className="pill-btn-inner">
                <span>Start a project</span>
                <span className="pill-btn-arrow-badge up-right">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* Link columns */}
          <div className="footer-cols">
            <div className="footer-brand-col">
              <div className="footer-logo">
                <BrandLogo height={20} />
              </div>
              <p className="footer-tagline">
                A creative developer, designer, and music producer building digital experiences with quiet precision.
              </p>
              {/* Social icons in footer */}
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
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
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

            <div className="footer-col">
              <span className="footer-col-title">Social</span>
              <div className="footer-col-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="animated-link"><span className="animated-link-span">Facebook</span></a>
                <a href="https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA" target="_blank" rel="noreferrer" className="animated-link"><span className="animated-link-span">Spotify (SYNTHV)</span></a>
                <a href="https://github.com/manee235" target="_blank" rel="noreferrer" className="animated-link"><span className="animated-link-span">GitHub</span></a>
                <a href="https://instagram.com/only.maneesh" target="_blank" rel="noreferrer" className="animated-link"><span className="animated-link-span">Instagram</span></a>
              </div>
            </div>
          </div>

          {/* Legal bar */}
          <div className="footer-legal-bar">
            <div>© {new Date().getFullYear()} onlymaneesh. All rights reserved.</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
              Designed &amp; Developed by <span style={{ color: 'var(--accent-from)', fontWeight: 600 }}>Maneesh Amindu</span>
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
