import React, { useState, useEffect } from 'react';

/* ─── Technology & Creative Tool Logo SVGs ─── */

// Web & Full Stack
const IconReact = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
  </svg>
);

const IconNextjs = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 17.534l-6.425-8.28V17.5h-1.63V6.5h1.63l6.425 8.28V6.5h1.63v11.034h-1.63z" />
  </svg>
);

const IconTailwind = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

// Mobile Apps
const IconFlutter = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM14.286 10.829L8.47 16.643 14.286 22.457h7.399l-5.815-5.814 5.815-5.814h-7.399z" />
  </svg>
);

const IconSwift = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
    <path d="M21.94 13.11c-.04-.08-.34-.73-1.07-1.46-1.51-1.5-3.66-2.23-5.2-2.12.87-.96 1.95-1.92 3.32-2.31.25-.07.4-.33.33-.58-.07-.25-.33-.4-.58-.33-1.68.48-3 1.65-4.04 2.79-1.2-1.02-2.61-1.78-4.14-2.13-.26-.06-.51.1-.57.36-.06.26.1.51.36.57 1.37.31 2.64.99 3.72 1.91-2.9.23-5.59 1.83-7.22 4.41-.14.22-.08.52.15.66.22.14.52.08.66-.15 1.48-2.34 3.96-3.8 6.64-3.95-1.07 1.09-1.89 2.45-2.29 3.99-.07.25.08.52.33.59.25.07.52-.08.59-.33.37-1.41 1.13-2.65 2.12-3.64 1.48-.12 3.49.52 4.88 1.91.56.56.84 1.1 1.01 1.45-3.32 2.47-7.64 3.01-11.45 1.54-.24-.09-.52.03-.61.27-.09.24.03.52.27.61 4.29 1.66 9.17 1.03 12.88-1.76.11.1.22.2.33.29.19.16.48.14.64-.05.16-.19.14-.48-.05-.64-.09-.07-.17-.15-.26-.23 1.13-1.12 1.6-1.53 1.64-1.57.19-.2.17-.51-.03-.7-.01 0-.02-.01-.03-.02z" />
  </svg>
);

// UI/UX & Product Design
const IconFigma = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 12a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm-3-9a3 3 0 0 0 0 6h3V3zm0 6a3 3 0 0 0 0 6h3V9zm0 6a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3H9zm6-6h3a3 3 0 0 0 0-6h-3z" />
  </svg>
);

const IconFramer = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
);

// Spatial UI & 3D
const IconSpatialUI = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const IconThreeJS = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
    <path d="M12 1.5L1.5 7.5v9L12 22.5l10.5-6v-9L12 1.5zm0 2.31l7.86 4.49-3.41 1.95L12 7.76l-4.45 2.49-3.41-1.95L12 3.81zm-8.5 5.5l3.45 1.97v4.94L3.5 14.25V9.31zm9.5 10.88v-4.94l3.45-1.97v4.94l-3.45 1.97zm-1-6.73L7.55 11 12 8.51 16.45 11 12 13.46zm1-7.7v4.94l3.45 1.97V7.73l-3.45-1.97z" />
  </svg>
);

// Music Production & Audio
const IconAudioWave = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="2" y1="12" x2="2" y2="12.01" />
    <line x1="6" y1="8" x2="6" y2="16" />
    <line x1="10" y1="4" x2="10" y2="20" />
    <line x1="14" y1="7" x2="14" y2="17" />
    <line x1="18" y1="9" x2="18" y2="15" />
    <line x1="22" y1="12" x2="22" y2="12.01" />
  </svg>
);



const DISCIPLINES = [
  { name: 'Web Applications', icon: <IconNextjs /> },
  { name: 'Mobile Apps (iOS & Android)', icon: <IconFlutter /> },
  { name: 'UI/UX & Product Design', icon: <IconFigma /> },
  { name: 'Spatial UI & 3D Shaders', icon: <IconSpatialUI /> },
  { name: 'Music Production (SYNTHV)', icon: <IconAudioWave /> },
  { name: 'React Architecture', icon: <IconReact /> },
  { name: 'Interactive Three.js', icon: <IconThreeJS /> },
  { name: 'Framer Design Systems', icon: <IconFramer /> },
  { name: 'Swift UI', icon: <IconSwift /> },
  { name: 'Tailwind CSS', icon: <IconTailwind /> },
];

const MAIN_TAGS = [
  { text: 'Websites', color: '#09090b' },
  { text: 'Mobile Apps', color: '#09090b' },
  { text: 'UI/UX', color: '#09090b' },
  { text: 'Spatial UI', color: '#09090b' },
  { text: 'Music Production', color: '#09090b' },
];

export default function TrustMarquee() {
  const [activeTag, setActiveTag] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTag((prev) => (prev + 1) % MAIN_TAGS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-trust-marquee-wrap">
      <div className="hero-trust-container">
        
        {/* Left-Aligned Animated Creative & Engineering Header */}
        <div className="hero-trust-header-left">
          <div className="hero-trust-sub-badge">
            <span className="hero-trust-live-dot" />
            <span className="hero-trust-sub">What We Develop &amp; Craft</span>
          </div>

          <h3 className="hero-trust-main">
            {MAIN_TAGS.map((tag, idx) => (
              <React.Fragment key={idx}>
                <span
                  className={`hero-discipline-tag ${activeTag === idx ? 'hero-tag-active' : ''}`}
                  onMouseEnter={() => setActiveTag(idx)}
                >
                  {tag.text}
                </span>
                {idx < MAIN_TAGS.length - 1 && (
                  <span className="hero-discipline-bullet">·</span>
                )}
              </React.Fragment>
            ))}
          </h3>
        </div>

        {/* Seamless Infinite Marquee Track */}
        <div className="hero-trust-track-outer">
          <div className="hero-trust-track">
            {[...DISCIPLINES, ...DISCIPLINES].map((item, index) => (
              <div key={index} className="hero-trust-item">
                <span className="hero-trust-item-icon">{item.icon}</span>
                <span className="hero-trust-item-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
