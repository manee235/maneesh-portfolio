import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles, Bookmark, ArrowRight, Star } from 'lucide-react';
import './Projects.css';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const WORK_CATEGORIES = [
  {
    id: 'nagomi-tours',
    badge: 'Client Project',
    title: 'Nagomi Lanka Tours',
    quote: '"Dynamic tour booking portal bridging Japan & Sri Lanka with high-speed headless CMS."',
    image: '/assets/projects/nagomi.png',
    link: 'https://www.nagomilankatours.jp/',
    rating: '4.9',
    techIcons: [
      { name: 'React', src: `${DEVICON_BASE}/react/react-original.svg` },
      { name: 'Sanity', src: `${DEVICON_BASE}/sanity/sanity-original.svg` },
      { name: 'Tailwind CSS', src: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    id: 'web-dev',
    badge: 'Commercial Project',
    title: 'Dreamscape Designs',
    quote: '"Responsive architecture and consulting web application with fluid micro-animations."',
    image: '/assets/projects/dreamscape.png',
    link: 'https://dreamscape-gray.vercel.app/',
    rating: '4.8',
    techIcons: [
      { name: 'Next.js', src: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
      { name: 'Framer Motion', src: `${DEVICON_BASE}/framermotion/framermotion-original.svg` },
      { name: 'React', src: `${DEVICON_BASE}/react/react-original.svg` },
    ],
  },
  {
    id: 'mobile-dev',
    badge: 'Academic Project',
    title: 'Routie Bus Tracker',
    quote: '"Cross-platform mobile transit tracking with real-time GPS and smart admin portal."',
    image: '/assets/projects/routie.png',
    link: 'https://routie-web.vercel.app',
    rating: '4.9',
    techIcons: [
      { name: 'Flutter', src: `${DEVICON_BASE}/flutter/flutter-original.svg` },
      { name: 'Dart', src: `${DEVICON_BASE}/dart/dart-original.svg` },
      { name: 'Supabase', src: `${DEVICON_BASE}/supabase/supabase-original.svg` },
    ],
  },
  {
    id: 'full-stack',
    badge: 'Academic Project',
    title: 'Nuvia - LMS Platform',
    quote: '"Full-scale automated student management, lecture streaming, and automated grading."',
    image: '/assets/projects/nuvia.png',
    link: 'https://github.com/manee235',
    rating: '4.7',
    techIcons: [
      { name: 'PHP', src: `${DEVICON_BASE}/php/php-original.svg` },
      { name: 'MySQL', src: `${DEVICON_BASE}/mysql/mysql-original.svg` },
      { name: 'JavaScript', src: `${DEVICON_BASE}/javascript/javascript-original.svg` },
    ],
  },
  {
    id: 'ui-ux',
    badge: 'Academic Project',
    title: 'Lily - Food Portal',
    quote: '"Clean & modern interface design for a frictionless culinary ordering experience."',
    image: '/assets/projects/lily.png',
    link: 'https://github.com/manee235',
    rating: '4.9',
    techIcons: [
      { name: 'Figma', src: `${DEVICON_BASE}/figma/figma-original.svg` },
      { name: 'HTML5', src: `${DEVICON_BASE}/html5/html5-original.svg` },
      { name: 'CSS3', src: `${DEVICON_BASE}/css3/css3-original.svg` },
    ],
  },
  {
    id: 'interactive-apps',
    badge: 'Academic Project',
    title: 'Digital Thorana 3D',
    quote: '"Cultural lighting visualizer featuring high-performance WebGL shaders and audio sync."',
    image: '/assets/projects/thorana.png',
    link: 'https://thoranait.vercel.app/',
    rating: '5.0',
    techIcons: [
      { name: 'Three.js', src: `${DEVICON_BASE}/threejs/threejs-original.svg` },
      { name: 'WebGL', src: `${DEVICON_BASE}/webgl/webgl-original.svg` },
      { name: 'JavaScript', src: `${DEVICON_BASE}/javascript/javascript-original.svg` },
    ],
  }
];

const Projects = () => {
  const sliderRef = useRef(null);
  const [savedProjects, setSavedProjects] = useState({});
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  // 60FPS Inertial Momentum drag physics state
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    prevX: 0,
    velocity: 0,
    rafId: null,
  });

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const toggleBookmark = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // ── 60FPS Inertia Momentum Animation Loop ──────────────────────────────────
  const applyMomentum = useCallback(() => {
    if (!sliderRef.current) return;
    const currentVelocity = dragInfo.current.velocity;
    if (Math.abs(currentVelocity) > 0.4) {
      sliderRef.current.scrollLeft += currentVelocity;
      dragInfo.current.velocity *= 0.94; // Smooth friction decay
      dragInfo.current.rafId = requestAnimationFrame(applyMomentum);
    } else {
      dragInfo.current.velocity = 0;
      if (dragInfo.current.rafId) {
        cancelAnimationFrame(dragInfo.current.rafId);
        dragInfo.current.rafId = null;
      }
    }
  }, []);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    if (dragInfo.current.rafId) {
      cancelAnimationFrame(dragInfo.current.rafId);
      dragInfo.current.rafId = null;
    }

    dragInfo.current.isDown = true;
    dragInfo.current.startX = e.pageX - sliderRef.current.offsetLeft;
    dragInfo.current.scrollLeft = sliderRef.current.scrollLeft;
    dragInfo.current.prevX = e.pageX;
    dragInfo.current.velocity = 0;

    setIsMouseDown(true);
    setHasDragged(false);
  };

  const handleMouseMove = (e) => {
    if (!dragInfo.current.isDown || !sliderRef.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.35; // Responsive speed multiplier
    sliderRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;

    // Track instant velocity for 60fps momentum release
    dragInfo.current.velocity = -(e.pageX - dragInfo.current.prevX) * 1.25;
    dragInfo.current.prevX = e.pageX;

    if (Math.abs(walk) > 6) {
      setHasDragged(true);
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!dragInfo.current.isDown) return;
    dragInfo.current.isDown = false;
    setIsMouseDown(false);

    // Trigger 60fps momentum inertia release
    dragInfo.current.rafId = requestAnimationFrame(applyMomentum);

    setTimeout(() => {
      setHasDragged(false);
    }, 80);
  };

  useEffect(() => {
    const currentDrag = dragInfo.current;
    return () => {
      if (currentDrag.rafId) {
        cancelAnimationFrame(currentDrag.rafId);
      }
    };
  }, []);

  const handleCardClick = (e, link) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="works" className="our-works-section">
      <div className="our-works-container">

        {/* Section Top Header & Slider Controls */}
        <div className="our-works-header">
          <div className="our-works-header-left">
            <div className="works-eyebrow">
              <span className="works-eyebrow-dot" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="our-works-title">Our Works</h2>
            <p className="our-works-subtitle">
              Explore digital journeys designed and developed with precision &amp; creativity.
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

        {/* 60FPS Drag-to-Scroll Horizontal Track */}
        <div
          className={`dreamscape-slider-track ${isMouseDown ? 'is-dragging' : ''}`}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {WORK_CATEGORIES.map((cat) => {
            const isBookmarked = !!savedProjects[cat.id];

            return (
              <div
                key={cat.id}
                onClick={(e) => handleCardClick(e, cat.link)}
                className="exact-card-link"
              >
                <div className="exact-project-card">
                  {/* Full-bleed background image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="exact-card-bg-img"
                    draggable="false"
                  />

                  {/* Gradient Overlay */}
                  <div className="exact-card-overlay" />

                  {/* Top Layer: Single Tag & Bookmark Button */}
                  <div className="exact-card-top-row">
                    <div className="exact-badge-pill">
                      <Sparkles size={12} className="exact-badge-icon" />
                      <span>{cat.badge}</span>
                    </div>

                    <button
                      className={`exact-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                      onClick={(e) => toggleBookmark(e, cat.id)}
                      aria-label="Save Project"
                    >
                      <Bookmark size={15} fill={isBookmarked ? '#ffffff' : 'none'} />
                    </button>
                  </div>

                  {/* Bottom Layer: Content, Tech Stack Icons & Action CTA */}
                  <div className="exact-card-bottom-content">
                    {/* Big Title */}
                    <h3 className="exact-card-title">{cat.title}</h3>

                    {/* Subtitle / Quote */}
                    <p className="exact-card-quote">{cat.quote}</p>

                    {/* Meta Chips Row: Rating + Tech Stack Icons (No Text Labels) */}
                    <div className="exact-chips-row">
                      {/* Rating Chip */}
                      <div className="exact-chip exact-rating-chip">
                        <Star size={13} fill="#eab308" color="#eab308" />
                        <span>{cat.rating}</span>
                      </div>

                      {/* Tech Stack Icons */}
                      <div className="exact-tech-icons-group">
                        {cat.techIcons.map((tech, idx) => (
                          <div
                            key={idx}
                            className="exact-tech-icon-pill"
                            title={tech.name}
                          >
                            <img
                              src={tech.src}
                              alt={tech.name}
                              className="exact-tech-img"
                              draggable="false"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full-width Explore CTA Button */}
                    <div className="exact-cta-btn">
                      <span className="exact-cta-text">EXPLORE NOW</span>
                      <div className="exact-cta-arrow-circle">
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
