import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import SplitText from './SplitText';
import Projects from './Projects';
import Skills from './Skills';

import About from './About';
import Features from './Features';
import Contact from './Contact';
import Footer from './Footer';
import Particles from './Particles';
import './Home.css';

// ─── Constants ────────────────────────────────────────────────────────────────
const ROLES = ["Software Developer", "UI/UX Designer", "Vibe Coder", "Music Producer", "Undergraduate"];
const SECTIONS = ['home', 'about', 'features', 'skills', 'projects', 'contact'];

const NAV_ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  features: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ activeSection, isDarkMode, setIsDarkMode }) {
  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navSections = ['home', 'about', 'features', 'skills', 'projects', 'contact'];

  return (
    <>
      <div className={`navbar-horizontal scrolled`}>
        {/* Desktop Navbar */}
        <div className="navbar-desktop">
          <div className="navbar-left">
            {navSections.map((id) => (
              <button
                key={id}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                onClick={() => scrollToSection(id)}
                title={id.toUpperCase()}
              >
                {NAV_ICONS[id]}
              </button>
            ))}
          </div>

          <div className="navbar-logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <img
              src={isDarkMode ? "assets/logo dark.svg" : "assets/logo.svg"}
              alt="Maneesh"
              className="logo-img"
            />
          </div>

          <div className="navbar-right">
            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Kurunegala, Sri Lanka</span>
            </div>
            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+94759051430">+94 75 905 1430</a>
            </div>

            <button className="theme-toggle" onClick={() => setIsDarkMode(d => !d)}>
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navbar — header only, no drawer */}
        <div className="navbar-mobile">
          <div className="mobile-nav-header">
            <img
              src={isDarkMode ? "assets/logo dark.svg" : "assets/logo.svg"}
              alt="Maneesh"
              className="logo-img-mobile"
              onClick={() => scrollToSection('home')}
              style={{ cursor: 'pointer' }}
            />
            <div className="mobile-actions">
              <button className="mobile-theme-toggle" onClick={() => setIsDarkMode(d => !d)}>
                {isDarkMode ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <button
                className="mobile-hire-btn"
                onClick={() => scrollToSection('contact')}
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating bottom pill nav - rendered outside navbar-horizontal */}
      <div className="mobile-bottom-nav">
        {navSections.map((id) => (
          <button
            key={id}
            className={`mobile-bottom-nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollToSection(id)}
            title={id.toUpperCase()}
          >
            {NAV_ICONS[id]}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── HomeContent ──────────────────────────────────────────────────────────────
function HomeContent({ roleIndex, isDarkMode }) {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="section-wrapper home-section">
      <div className="avatar-wrapper">
        <div className="avatar-particles-bg">
          <Particles
            particleColors={isDarkMode ? ["#ffffff"] : ["#000000"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <motion.img
          src="assets/avatar.png"
          alt="Maneesh"
          className="avatar-img"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>

      <div className="content-left">
        <motion.div
          className="main-name"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          I'M <span>MANEESH</span>
        </motion.div>

        <motion.div
          className="sub-slogan"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          WHERE CLEAN CODE MEETS FEARLESS DESIGN.
        </motion.div>

        <motion.div
          className="cta-group desktop-only"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button className="cta-btn-primary" onClick={scrollToContact}>Hire Now <span>↗</span></button>
          <a href="/assets/maneesh_amindu_cv.pdf" download="maneesh_amindu_cv.pdf" style={{ textDecoration: 'none' }}>
            <button className="cta-btn-secondary">Download CV</button>
          </a>
        </motion.div>
      </div>

      <div className="content-right">
        <div className="role-highlight">
          <AnimatePresence mode="wait">
            <SplitText
              key={ROLES[roleIndex]}
              text={ROLES[roleIndex]}
              className="role-text-animated"
              delay={0}
            />
          </AnimatePresence>
        </div>

        <motion.p
          className="main-desc"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Full-Stack Developer & UI/UX enthusiast focused on creating scalable,
          high-performance digital solutions with clean code, modern technologies,
          and intuitive user-centered design.
        </motion.p>

        <motion.div
          className="cta-group mobile-only"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button className="cta-btn-primary" onClick={scrollToContact}>Hire Now <span>↗</span></button>
          <a href="/assets/maneesh_amindu_cv.pdf" download="maneesh_amindu_cv.pdf" style={{ textDecoration: 'none' }}>
            <button className="cta-btn-secondary">Download CV</button>
          </a>
        </motion.div>

        <motion.div
          className="more-link desktop-only"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          More about me <span>↗</span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Preloader ─────────────────────────────────────────────────────────────
function Preloader({ finishLoading }) {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="loader-content">
        <motion.img
          src="assets/logo.svg"
          alt="only.Maneesh"
          className="preloader-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setTimeout(finishLoading, 1200)}
        />
      </div>
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  useTransform(mouseXSpring, [-0.5, 0.5], ['-20px', '20px']);
  useTransform(mouseYSpring, [-0.5, 0.5], ['-10px', '10px']);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const homeHeight = window.innerHeight;

      if (scrollY < homeHeight * 0.6) {
        setActiveSection('home');
        return;
      }

      const current = SECTIONS.slice(1).find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top } = el.getBoundingClientRect();
        return top >= -300 && top <= 300;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Role rotation
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Dark mode
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="loader" finishLoading={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            className="portfolio-container"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HomeContent roleIndex={roleIndex} isDarkMode={isDarkMode} />

            <div id="about" className="section-wrapper about-section-wrapper">
              <About />
            </div>

            <div id="features" className="section-wrapper features-section-wrapper">
              <Features isDarkMode={isDarkMode} />
            </div>

            <div id="skills" className="section-wrapper skills-section-wrapper">
              <Skills />
            </div>

            <div id="projects" className="section-wrapper projects-section-wrapper">
              <Projects />
            </div>

            <div id="contact" className="section-wrapper contact-section-wrapper">
              <Contact />
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <Navbar
          activeSection={activeSection}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}
    </>
  );
}

export default App;
