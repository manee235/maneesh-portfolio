import React, { useRef } from 'react';
import './Projects.css';

const WORK_CATEGORIES = [
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'A responsive architecture and consulting website featuring elegant UI, smooth animations, and an engaging user experience across all devices.',
    image: '/assets/projects/dreamscape.png',
    link: 'https://dreamscape-gray.vercel.app/',
    bgHover: '#2563eb', // Electric Blue
    glowColor: 'rgba(37, 99, 235, 0.45)',
    btnHover: '#38bdf8', // Sky Cyan
    btnText: '#0f172a'
  },

  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    subtitle: 'Flutter & iOS / Android Solutions',
    image: '/assets/projects/routie.png',
    link: 'https://github.com/manee235',
    bgHover: '#ea580c', // Sunset Amber / Orange
    glowColor: 'rgba(234, 88, 12, 0.45)',
    btnHover: '#fbbf24', // Warm Gold
    btnText: '#451a03'
  },

  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    subtitle: 'User Systems & Figma Prototypes',
    image: '/assets/projects/nuvia.png',
    link: 'https://github.com/manee235',
    bgHover: '#6c2bd9', // Signature Purple
    glowColor: 'rgba(108, 43, 217, 0.45)',
    btnHover: '#ccff00', // Neon Lime
    btnText: '#000000'
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    subtitle: 'End-to-End Node, React & Supabase Apps',
    image: '/assets/projects/lily.png',
    link: 'https://github.com/manee235',
    bgHover: '#059669', // Emerald Green
    glowColor: 'rgba(5, 150, 105, 0.45)',
    btnHover: '#a3e635', // Neon Mint
    btnText: '#064e3b'
  },

  {
    id: 'interactive-apps',
    title: 'Interactive Web Apps',
    subtitle: 'Cultural Installations & WebGL FX',
    image: '/assets/projects/thorana.png',
    link: 'https://thoranait.vercel.app/',
    bgHover: '#c026d3', // Deep Fuchsia / Magenta
    glowColor: 'rgba(192, 38, 211, 0.45)',
    btnHover: '#f472b6', // Bright Pink
    btnText: '#701a75'
  }
];

const Projects = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section id="works" className="our-works-section">
      <div className="our-works-container">

        {/* Section Top Header & Slider Controls */}
        <div className="our-works-header">
          <div className="our-works-header-left">
            <h2 className="our-works-title">Our Works</h2>
            <p className="our-works-subtitle">
              Explore digital journeys designed and developed with precision & creativity.
            </p>
          </div>

          <div className="our-works-header-right">
            {/* Slider Navigation Buttons */}
            <div className="slider-nav-controls">
              <button
                className="slider-arrow-btn"
                onClick={scrollLeft}
                aria-label="Slide Left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>

              <button
                className="slider-arrow-btn"
                onClick={scrollRight}
                aria-label="Slide Right"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Card Slider Track */}
        <div className="dreamscape-slider-track" ref={sliderRef}>
          {WORK_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={cat.link}
              target="_blank"
              rel="noopener noreferrer"
              className="dreamscape-card-link"
            >
              <div
                className="dreamscape-card"
                style={{
                  '--card-active-bg': cat.bgHover,
                  '--card-active-glow': cat.glowColor,
                  '--btn-active-bg': cat.btnHover,
                  '--btn-active-text': cat.btnText
                }}
              >
                {/* Top Title Inside Card */}
                <div className="dreamscape-card-header">
                  <h3 className="dreamscape-card-title">{cat.title}</h3>
                </div>

                {/* Inner Preview Box */}
                <div className="dreamscape-preview-box">
                  {/* Image container */}
                  <div className="dreamscape-image-wrapper">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="dreamscape-card-img"
                    />
                  </div>

                  {/* Bottom-Right Inverted Corner Cutout & Arrow Button */}
                  <div className="dreamscape-corner-cutout">
                    <div className="dreamscape-arrow-btn">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-icon"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Description Below Image */}
                <div className="dreamscape-card-footer">
                  <p className="dreamscape-card-subtitle">{cat.subtitle}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
