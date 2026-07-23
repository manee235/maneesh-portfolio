import React, { useState } from 'react';
import OptionWheel from './components/ui/OptionWheel';
import BlurText from './components/ui/BlurText';
import './WhatWeDoBest.css';

const SERVICES_STACK = [
  {
    number: '01',
    category: 'Full-Stack Architecture',
    title: 'Software Development & Web Apps',
    description: 'Software development, UI UX DESIGN, WEB DEVELOPMENT....',
    tags: ['React', 'Next.js', 'Node.js', 'PHP', 'Supabase', 'REST APIs'],
    badgeColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    borderColor: 'rgba(56, 189, 248, 0.25)'
  },
  {
    number: '02',
    category: 'Cross-Platform Mobile',
    title: 'Mobile App Development',
    description: 'Crafting high-performance iOS and Android applications using Flutter & native frameworks with smooth gestures, offline sync, and intuitive navigation.',
    tags: ['Flutter', 'Dart', 'iOS & Android', 'Firebase', 'State Management'],
    badgeColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    bgGradient: 'linear-gradient(135deg, #1c1917 0%, #451a03 50%, #1c1917 100%)',
    borderColor: 'rgba(251, 191, 36, 0.25)'
  },
  {
    number: '03',
    category: 'Experience & Interface',
    title: 'Product Design & UI/UX',
    description: 'Architecting clean, human-centered digital interfaces, interactive prototypes, visual brand systems, and frictionless user journeys.',
    tags: ['Figma', 'UI/UX Design', 'Design Systems', 'Wireframing', 'User Testing'],
    badgeColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    bgGradient: 'linear-gradient(135deg, #18181b 0%, #3b0764 50%, #18181b 100%)',
    borderColor: 'rgba(168, 85, 247, 0.25)'
  },
  {
    number: '04',
    category: 'Immersive Graphics',
    title: 'Interactive WebGL & Visual FX',
    description: 'Building mind-bending 3D experiences, particle systems, and advanced animations using WebGL, Three.js, and GSAP.',
    tags: ['WebGL', 'Three.js', 'GSAP', 'Framer Motion', 'Creative Coding'],
    badgeColor: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.4)',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #701a75 50%, #0f172a 100%)',
    borderColor: 'rgba(244, 114, 182, 0.25)'
  }
];

const WhatWeDoBest = ({ onStartProject }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectedService = SERVICES_STACK[selectedIndex] || SERVICES_STACK[0];

  return (
    <section id="services" className="what-we-do-best-section">
      <div className="what-we-do-best-header">
        <div className="eyebrow dark services-eyebrow">
          <span className="eyebrow-dot" />
          <span>Our Capabilities</span>
        </div>
        <BlurText
          text="What We Do Best"
          className="what-we-do-best-title"
          delay={120}
          animateBy="words"
          direction="top"
        />
        <p className="what-we-do-best-subtitle">
          Explore our core engineering & design capabilities—delivering end-to-end digital solutions crafted with technical precision.
        </p>
      </div>

      {!isMobile ? (
        /* Desktop Mode: OptionWheel + Side-by-Side Card */
        <div className="wwdb-wheel-container">
          <div className="wwdb-wheel-left">
            <OptionWheel
              items={SERVICES_STACK.map(s => s.title)}
              defaultSelected={0}
              onChange={(idx) => setSelectedIndex(idx)}
              textColor="rgba(255, 255, 255, 0.4)"
              activeColor="#ffffff"
              side="left"
              fontSize={1.8}
              spacing={1.8}
              curve={0.8}
              tilt={5}
              blur={1}
              fade={0.35}
              inset={30}
              loop={true}
              draggable={true}
            />
          </div>

          <div className="wwdb-wheel-right">
            <div
              className="wwdb-card-content"
              style={{
                background: selectedService.bgGradient,
                borderColor: selectedService.borderColor,
                '--card-glow': selectedService.glowColor
              }}
            >
              <div className="wwdb-card-top">
                <span className="wwdb-card-number">{selectedService.number}</span>
                <span
                  className="wwdb-card-category"
                  style={{ color: selectedService.badgeColor, borderColor: `${selectedService.badgeColor}40` }}
                >
                  {selectedService.category}
                </span>
              </div>

              <div className="wwdb-card-body">
                <h3 className="wwdb-card-title">{selectedService.title}</h3>
                <p className="wwdb-card-desc">{selectedService.description}</p>
              </div>

              <div className="wwdb-card-footer">
                <div className="wwdb-tags-list">
                  {selectedService.tags.map((tag, idx) => (
                    <span key={idx} className="wwdb-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {onStartProject && (
                  <button
                    className="wwdb-action-btn"
                    onClick={() => onStartProject()}
                    style={{ background: selectedService.badgeColor, color: '#09090b' }}
                  >
                    Start a Project
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="wwdb-btn-icon">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Mode: Clean Stack of Service Cards */
        <div className="wwdb-mobile-cards-list">
          {SERVICES_STACK.map((service, index) => (
            <div
              key={index}
              className="wwdb-card-content wwdb-mobile-card"
              style={{
                background: service.bgGradient,
                borderColor: service.borderColor,
                '--card-glow': service.glowColor
              }}
            >
              <div className="wwdb-card-top">
                <span className="wwdb-card-number">{service.number}</span>
                <span
                  className="wwdb-card-category"
                  style={{ color: service.badgeColor, borderColor: `${service.badgeColor}40` }}
                >
                  {service.category}
                </span>
              </div>

              <div className="wwdb-card-body">
                <h3 className="wwdb-card-title">{service.title}</h3>
                <p className="wwdb-card-desc">{service.description}</p>
              </div>

              <div className="wwdb-card-footer">
                <div className="wwdb-tags-list">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="wwdb-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {onStartProject && (
                  <button
                    className="wwdb-action-btn"
                    onClick={() => onStartProject()}
                    style={{ background: service.badgeColor, color: '#09090b' }}
                  >
                    Start a Project
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="wwdb-btn-icon">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WhatWeDoBest;
