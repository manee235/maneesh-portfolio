import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import './Projects.css';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const ALL_PROJECTS = [
  {
    id: 'nagomi-tours',
    category: 'client',
    categoryLabel: 'Client Project',
    title: 'Nagomi Lanka Tours',
    desc: 'Dynamic tour booking architecture bridging Japan & Sri Lanka with high-speed headless CMS and multi-currency payment pipelines.',
    image: '/assets/projects/nagomi.png',
    link: 'https://www.nagomilankatours.jp/',
    rating: '4.9',
    stars: 5,
    tag: 'Headless CMS',
    techStack: [
      { name: 'React', src: `${DEVICON_BASE}/react/react-original.svg` },
      { name: 'Sanity', src: `${DEVICON_BASE}/sanity/sanity-original.svg` },
      { name: 'Tailwind', src: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    id: 'dreamscape',
    category: 'client',
    categoryLabel: 'Client Project',
    title: 'Dreamscape Designs',
    desc: 'Bespoke architecture and interior consulting platform featuring fluid 60FPS scroll micro-interactions and dark luxury aesthetics.',
    image: '/assets/projects/dreamscape.png',
    link: 'https://dreamscape-gray.vercel.app/',
    rating: '4.8',
    stars: 5,
    tag: 'Next.js App',
    techStack: [
      { name: 'Next.js', src: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
      { name: 'Framer', src: `${DEVICON_BASE}/framermotion/framermotion-original.svg` },
      { name: 'React', src: `${DEVICON_BASE}/react/react-original.svg` },
    ],
  },
  {
    id: 'routie',
    category: 'mobile',
    categoryLabel: 'Academic Project',
    title: 'Routie Bus Tracker',
    desc: 'Cross-platform mobile application delivering real-time bus tracking, passenger route intelligence, and automated dispatch management.',
    image: '/assets/projects/routie.png',
    link: 'https://routie-web.vercel.app',
    rating: '4.9',
    stars: 5,
    tag: 'Flutter & GPS',
    techStack: [
      { name: 'Flutter', src: `${DEVICON_BASE}/flutter/flutter-original.svg` },
      { name: 'Dart', src: `${DEVICON_BASE}/dart/dart-original.svg` },
      { name: 'Supabase', src: `${DEVICON_BASE}/supabase/supabase-original.svg` },
    ],
  },
  {
    id: 'nuvia-lms',
    category: 'fullstack',
    categoryLabel: 'Academic Project',
    title: 'Nuvia - LMS Platform',
    desc: 'Full-scale automated student management, lecture streaming, and automated grading with seamless academic tracking.',
    image: '/assets/projects/nuvia.png',
    link: 'https://github.com/manee235',
    rating: '4.7',
    stars: 5,
    tag: 'Full Stack',
    techStack: [
      { name: 'PHP', src: `${DEVICON_BASE}/php/php-original.svg` },
      { name: 'MySQL', src: `${DEVICON_BASE}/mysql/mysql-original.svg` },
      { name: 'JS', src: `${DEVICON_BASE}/javascript/javascript-original.svg` },
    ],
  },
  {
    id: 'thorana-3d',
    category: 'creative',
    categoryLabel: 'Academic Project',
    title: 'Digital Thorana 3D',
    desc: 'Cultural lighting visualizer featuring high-performance WebGL shaders, interactive audio sync, and 3D lighting engines.',
    image: '/assets/projects/thorana.png',
    link: 'https://thoranait.vercel.app/',
    rating: '5.0',
    stars: 5,
    tag: 'Three.js 3D',
    techStack: [
      { name: 'Three.js', src: `${DEVICON_BASE}/threejs/threejs-original.svg` },
      { name: 'WebGL', src: `${DEVICON_BASE}/webgl/webgl-original.svg` },
      { name: 'JS', src: `${DEVICON_BASE}/javascript/javascript-original.svg` },
    ],
  },
  {
    id: 'lily-food',
    category: 'fullstack',
    categoryLabel: 'Academic Project',
    title: 'Lily - Food Portal',
    desc: 'Clean & modern interface design for a frictionless culinary ordering experience with real-time checkout flows.',
    image: '/assets/projects/lily.png',
    link: 'https://github.com/manee235',
    rating: '4.9',
    stars: 5,
    tag: 'UI/UX Design',
    techStack: [
      { name: 'Figma', src: `${DEVICON_BASE}/figma/figma-original.svg` },
      { name: 'HTML5', src: `${DEVICON_BASE}/html5/html5-original.svg` },
      { name: 'CSS3', src: `${DEVICON_BASE}/css3/css3-original.svg` },
    ],
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'client', label: 'Client Work' },
  { id: 'mobile', label: 'Mobile & Apps' },
  { id: 'creative', label: '3D & Creative' },
];

export default function Projects() {
  const sliderRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.category === activeTab);
  }, [activeTab]);

  // Drag physics state
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

  const applyMomentum = useCallback(() => {
    if (!sliderRef.current) return;
    const currentVelocity = dragInfo.current.velocity;
    if (Math.abs(currentVelocity) > 0.4) {
      sliderRef.current.scrollLeft += currentVelocity;
      dragInfo.current.velocity *= 0.94;
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
    const walk = (x - dragInfo.current.startX) * 1.35;
    sliderRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;

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
    <section id="works" className="prj-section">
      <div className="prj-container">

        {/* ── Section Header ── */}
        <div className="prj-header-row">
          <div className="prj-header-left" data-parallax="0.06">
            <div className="prj-eyebrow">
              <span className="prj-eyebrow-dot" />
              <span>SELECTED PORTFOLIO</span>
            </div>
            <h2 className="prj-title">
              Our Works <span className="prj-count">({filteredProjects.length})</span>
            </h2>
            <p className="prj-subtitle">
              Explore digital journeys designed and developed with precision &amp; creativity.
            </p>
          </div>

          <div className="prj-header-right">
            {/* Filter Tabs */}
            <div className="prj-filter-tabs">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`prj-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="prj-nav-controls">
              <button
                className="prj-nav-btn"
                onClick={scrollLeft}
                aria-label="Previous Projects"
              >
                <i className="bx bx-chevron-left"></i>
              </button>
              <button
                className="prj-nav-btn"
                onClick={scrollRight}
                aria-label="Next Projects"
              >
                <i className="bx bx-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* ── Horizontal Drag Slider Track ── */}
        <div
          className={`prj-slider-track ${isMouseDown ? 'is-dragging' : ''}`}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="prj-card-wrapper"
              onClick={(e) => handleCardClick(e, project.link)}
            >
              <article className="lux-card">
                {/* Full-bleed background image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="lux-card-bg"
                  draggable="false"
                />

                {/* Soft natural gradient overlay */}
                <div className="lux-card-gradient" />

                {/* Top Badge */}
                <div className="lux-card-top">
                  <span className="lux-badge-pill">
                    <span className="lux-badge-dot" />
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="lux-card-content">
                  {/* Title */}
                  <h3 className="lux-card-title">{project.title}</h3>

                  {/* Description text */}
                  <p className="lux-card-desc">{project.desc}</p>

                  {/* Info Chips Row (Rating + Tech Stack Icons + Tag) */}
                  <div className="lux-chips-row">
                    <div className="lux-chip lux-rating-chip">
                      <span className="lux-rating-num">{project.rating}</span>
                      <span className="lux-stars">★★★★★</span>
                    </div>

                    <div className="lux-tech-icons-group">
                      {project.techStack.map((tech, idx) => (
                        <div key={idx} className="lux-tech-icon-pill" title={tech.name}>
                          <img src={tech.src} alt={tech.name} className="lux-tech-img" draggable="false" />
                        </div>
                      ))}
                    </div>

                    <div className="lux-chip lux-tag-chip">
                      <span>{project.tag}</span>
                    </div>
                  </div>

                  {/* Clean White Pill Button */}
                  <button
                    type="button"
                    className="lux-reserve-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.link, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    Explore Now
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
