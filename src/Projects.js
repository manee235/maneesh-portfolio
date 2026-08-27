import React, { useRef, useState } from 'react';
import { MapPin, Sparkles, Bookmark, ArrowRight, Star } from 'lucide-react';
import './Projects.css';

const WORK_CATEGORIES = [
  {
    id: 'nagomi-tours',
    location: 'Kamiyamakawa, Yuki-shi, Ibaraki, Japan',
    badge: 'Client Partner',
    title: 'Nagomi Lanka Tours',
    quote: '"Dynamic tour booking portal bridging Japan & Sri Lanka with high-speed headless CMS."',
    image: '/assets/projects/nagomi.png',
    link: 'https://www.nagomilankatours.jp/',
    rating: '4.9',
    tag1: 'Sanity CMS',
    tag2: 'React + Tailwind',
    underDevelopment: false,
  },
  {
    id: 'web-dev',
    location: 'Kurunegala, Sri Lanka',
    badge: 'Architecture & UI',
    title: 'Dreamscape Designs',
    quote: '"Responsive architecture and consulting web application with fluid micro-animations."',
    image: '/assets/projects/dreamscape.png',
    link: 'https://dreamscape-gray.vercel.app/',
    rating: '4.8',
    tag1: 'Next.js',
    tag2: 'Framer Motion',
    underDevelopment: true,
  },
  {
    id: 'mobile-dev',
    location: 'SLIATE Kurunegala',
    badge: 'Academic Project',
    title: 'Routie Bus Tracker',
    quote: '"Cross-platform mobile transit tracking with real-time GPS and smart admin portal."',
    image: '/assets/projects/routie.png',
    link: 'https://routie-web.vercel.app',
    rating: '4.9',
    tag1: 'Flutter & Dart',
    tag2: 'Supabase Realtime',
    underDevelopment: false,
  },
  {
    id: 'full-stack',
    location: 'NIBM Computing',
    badge: 'Academic Project',
    title: 'Nuvia - LMS Platform',
    quote: '"Full-scale automated student management, lecture streaming, and automated grading."',
    image: '/assets/projects/nuvia.png',
    link: 'https://github.com/manee235',
    rating: '4.7',
    tag1: 'Full Stack',
    tag2: 'MySQL & PHP',
    underDevelopment: false,
  },
  {
    id: 'ui-ux',
    location: 'UI/UX Design Lab',
    badge: 'Academic Project',
    title: 'Lily - Food Portal',
    quote: '"Clean & modern interface design for a frictionless culinary ordering experience."',
    image: '/assets/projects/lily.png',
    link: 'https://github.com/manee235',
    rating: '4.9',
    tag1: 'Figma UI/UX',
    tag2: 'Design System',
    underDevelopment: false,
  },
  {
    id: 'interactive-apps',
    location: 'Creative Tech Lab',
    badge: 'Academic Project',
    title: 'Digital Thorana 3D',
    quote: '"Cultural lighting visualizer featuring high-performance WebGL shaders and audio sync."',
    image: '/assets/projects/thorana.png',
    link: 'https://thoranait.vercel.app/',
    rating: '5.0',
    tag1: 'Three.js',
    tag2: 'Creative Code',
    underDevelopment: false,
  }
];

const Projects = () => {
  const sliderRef = useRef(null);
  const [savedProjects, setSavedProjects] = useState({});

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

        {/* Horizontal Card Slider Track */}
        <div className="dreamscape-slider-track" ref={sliderRef}>
          {WORK_CATEGORIES.map((cat) => {
            const isBookmarked = !!savedProjects[cat.id];

            return (
              <a
                key={cat.id}
                href={cat.link}
                target="_blank"
                rel="noopener noreferrer"
                className="exact-card-link"
              >
                <div className="exact-project-card">
                  {/* Full-bleed background image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="exact-card-bg-img"
                  />

                  {/* Gradient Overlay */}
                  <div className="exact-card-overlay" />

                  {/* Top Layer: Badges and Bookmark Button */}
                  <div className="exact-card-top-row">
                    <div className="exact-badges-stack">
                      <div className="exact-badge-pill">
                        <MapPin size={11} className="exact-badge-icon" />
                        <span>{cat.location}</span>
                      </div>
                      <div className="exact-badge-pill">
                        <Sparkles size={11} className="exact-badge-icon" />
                        <span>{cat.badge}</span>
                      </div>
                    </div>

                    <button
                      className={`exact-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                      onClick={(e) => toggleBookmark(e, cat.id)}
                      aria-label="Save Project"
                    >
                      <Bookmark size={15} fill={isBookmarked ? '#ffffff' : 'none'} />
                    </button>
                  </div>

                  {/* Bottom Layer: Content, Meta Chips & Action CTA */}
                  <div className="exact-card-bottom-content">
                    {/* Big Title */}
                    <h3 className="exact-card-title">{cat.title}</h3>

                    {/* Subtitle / Quote */}
                    <p className="exact-card-quote">{cat.quote}</p>

                    {/* Meta Chips Row */}
                    <div className="exact-chips-row">
                      <div className="exact-chip exact-rating-chip">
                        <Star size={12} fill="#eab308" color="#eab308" />
                        <span>{cat.rating}</span>
                      </div>
                      <div className="exact-chip">
                        <span>{cat.tag1}</span>
                      </div>
                      {cat.tag2 && (
                        <div className="exact-chip">
                          <span>{cat.tag2}</span>
                        </div>
                      )}
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
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
