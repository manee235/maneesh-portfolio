import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const MILESTONES = [
  {
    id: 'school',
    iconClass: 'bx bxs-school',
    category: 'Academic Foundation',
    title: 'School Education & ICT Foundation',
    institution: 'Kurunegala, Sri Lanka',
    year: 'G.C.E. A/L & O/L',
    desc: 'Strong mathematics and computing foundation, active involvement in ICT societies, creative technologies, and science exhibitions.',
    tags: ['Mathematics', 'Computer Science', 'Leadership', 'Physics'],
  },
  {
    id: 'music',
    iconClass: 'bx bxs-music',
    category: 'Creative Production',
    title: 'Music Production & Sound Design',
    institution: 'SYNTHV / Independent Artist',
    year: '2020 – Present',
    desc: 'Crafting atmospheric electronic soundscapes, spatial audio layers, synthesizer sound design, and studio mixing & mastering.',
    tags: ['Audio Engineering', 'FL Studio', 'Sound Design', 'Mixing & Mastering'],
  },
  {
    id: 'freelance',
    iconClass: 'bx bx-briefcase-alt-2',
    category: 'Industry Experience',
    title: 'Freelance Software & UI/UX Developer',
    institution: 'Global Clients & Direct Partnerships',
    year: '2022 – Present',
    desc: 'Delivering end-to-end web applications, dynamic CMS platforms, and cross-platform mobile apps for international & local businesses.',
    tags: ['Client Delivery', 'Full Stack', 'UI/UX Design', 'Headless CMS'],
  },
  {
    id: 'nibm-se',
    iconClass: 'bx bx-code-curly',
    category: 'Software Engineering',
    title: 'Certificate in Software Engineering',
    institution: 'NIBM (National Institute of Business Management)',
    year: '2023',
    desc: 'Core software development lifecycle, algorithmic foundations, Java programming, object-oriented methodologies, and database fundamentals.',
    tags: ['Software Engineering', 'Java', 'OOP', 'Databases'],
  },
  {
    id: 'hndit',
    iconClass: 'bx bxs-graduation',
    category: 'Higher Education',
    title: 'HND in Information Technology (HNDIT)',
    institution: 'SLIATE (Sri Lanka Institute of Advanced Technological Education)',
    year: '2024 – Present (Ongoing)',
    desc: 'Specializing in Enterprise Software Engineering, Database Architectures, OOP, and Modern Web & Cloud Systems.',
    tags: ['Software Engineering', 'Databases', 'Cloud Systems', 'OOP'],
  },
  {
    id: 'ccna',
    iconClass: 'bx bx-network-chart',
    category: 'Professional Certification',
    title: 'Cisco Certified Network Associate (CCNA)',
    institution: 'Cisco Networking Academy',
    year: '2026 – Present (Ongoing)',
    desc: 'Comprehensive network engineering foundation: IP routing protocols, enterprise switching, network security, and infrastructure architecture.',
    tags: ['Network Architecture', 'IP Routing', 'Switching', 'Cybersecurity'],
  },
];

const ABOUT_SOCIALS = [
  { name: 'GitHub', icon: 'bx bxl-github', href: 'https://github.com/manee235' },
  { name: 'Behance', icon: 'bx bxl-behance', href: 'https://www.behance.net/maneesh_amindu' },
  { name: 'Instagram', icon: 'bx bxl-instagram', href: 'https://instagram.com/only.maneesh' },
  { name: 'Spotify', icon: 'bx bxl-spotify', href: 'https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA' },
  { name: 'Email', icon: 'bx bx-envelope', href: 'mailto:ganegodamaneesh@gmail.com' },
];

export default function About() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const pathRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealedMap, setRevealedMap] = useState({});
  const [headerInView, setHeaderInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !sectionRef.current) return;
      const secRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Header entrance trigger
      if (secRect.top < windowHeight * 0.85) {
        setHeaderInView(true);
      }

      const rect = timelineRef.current.getBoundingClientRect();

      // Calculate progress of scroll through the vertical timeline
      const totalDistance = rect.height - windowHeight * 0.3;
      const scrolled = windowHeight * 0.7 - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
      setScrollProgress(progress);

      // Check card reveal states based on viewport position
      const cards = timelineRef.current.querySelectorAll('.abt-vert-slot');
      const newRevealed = {};
      cards.forEach((card, idx) => {
        const cRect = card.getBoundingClientRect();
        if (cRect.top < windowHeight * 0.82) {
          newRevealed[idx] = true;
        }
      });
      setRevealedMap(newRevealed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Animate dynamic drawing of vertical serpentine doodle path
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length * (1 - scrollProgress);
    }
  }, [scrollProgress]);

  return (
    <section id="about" className="abt-vert-section" ref={sectionRef}>
      <div className="abt-container">

        {/* ── Section Header ── */}
        <div className={`abt-header ${headerInView ? 'in-view' : ''}`}>
          <div className="abt-header-row">
            <div className="abt-header-left">
              <div className="abt-eyebrow">
                <span className="abt-eyebrow-dot" />
                <span>02 / ABOUT ME</span>
              </div>
              <h2 className="abt-main-title">
                Engineering digital experiences with intention &amp; artistic precision.
              </h2>
            </div>

            <div className="abt-header-right">
              <p className={`abt-bio-lead ${headerInView ? 'abt-blur-animated' : ''}`}>
                I'm <span className="abt-highlight">Maneesh Amindu</span>, a tech enthusiast focused on <span className="abt-highlight">software engineering</span> and <span className="abt-highlight">UI/UX design</span>. I enjoy building <span className="abt-highlight">clean, scalable digital products</span> and crafting <span className="abt-highlight">modern user experiences</span>.
              </p>

              <div className="abt-header-actions">
                <a
                  href="/assets/maneesh_amindu_cv.pdf"
                  download="maneesh_amindu_cv.pdf"
                  className="abt-download-cv-btn"
                >
                  <i className="bx bx-download"></i>
                  <span>Download CV</span>
                </a>

                {/* Social Links Group */}
                <div className="abt-socials-group">
                  {ABOUT_SOCIALS.map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="abt-social-btn"
                      title={soc.name}
                      aria-label={soc.name}
                    >
                      <i className={soc.icon}></i>
                    </a>
                  ))}
                </div>

                <div className="abt-location-badge">
                  <span className="abt-loc-dot" />
                  <i className="bx bx-map-pin"></i>
                  <span><strong>Kurunegala, Sri Lanka</strong> — Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Vertical Serpentine Wavy Doodle Timeline ── */}
        <div className="abt-vert-timeline" ref={timelineRef}>

          <div className="abt-vert-timeline-track-wrap">
            {/* Central Serpentine SVG Doodle Path */}
            <div className="abt-vert-svg-track" aria-hidden="true">
              <svg
                className="abt-vert-svg"
                viewBox="0 0 500 2400"
                fill="none"
                preserveAspectRatio="none"
              >
                {/* Background Guide Line */}
                <path
                  d="M 250 0 C 40 200, 460 400, 250 600 C 40 800, 460 1000, 250 1200 C 40 1400, 460 1600, 250 1800 C 40 2000, 380 2160, 250 2350 L 250 2380"
                  stroke="rgba(37, 99, 235, 0.14)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="10 10"
                />
                {/* Animated Live Drawing Doodle Path */}
                <path
                  ref={pathRef}
                  d="M 250 0 C 40 200, 460 400, 250 600 C 40 800, 460 1000, 250 1200 C 40 1400, 460 1600, 250 1800 C 40 2000, 380 2160, 250 2350 L 250 2380"
                  stroke="#2563eb"
                  strokeWidth="7"
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke-dashoffset 0.12s ease-out',
                    filter: 'drop-shadow(0 0 14px rgba(37, 99, 235, 0.85))',
                  }}
                />
              </svg>
            </div>

            {/* Alternating Left & Right Milestone Cards */}
            <div className="abt-vert-cards-list">
              {MILESTONES.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const isRevealed = !!revealedMap[idx] || (idx === 0 && scrollProgress > 0.02);

                return (
                  <div
                    key={item.id}
                    className={`abt-vert-slot ${isEven ? 'slot-left' : 'slot-right'} ${isRevealed ? 'revealed' : ''}`}
                  >
                    {/* Timeline Center Node */}
                    <div className={`abt-vert-node ${isRevealed ? 'active' : ''}`}>
                      <div className="abt-node-outer">
                        <div className="abt-node-inner" />
                      </div>
                      <span className="abt-node-step">0{idx + 1}</span>
                    </div>

                    {/* Modern Timeline Milestone Card */}
                    <article className="abt-wide-card">
                      {/* Top Meta Row: Category Badge & Date Badge */}
                      <div className="abt-card-meta-row">
                        <div className="abt-card-badge-group">
                          <div className="abt-card-icon-pill">
                            <i className={item.iconClass}></i>
                          </div>
                          <span className="abt-card-cat-badge">{item.category}</span>
                        </div>

                        <div className="abt-card-date-badge">
                          {item.year.toLowerCase().includes('ongoing') || item.year.toLowerCase().includes('present') ? (
                            <span className="abt-card-status-dot" aria-hidden="true" />
                          ) : (
                            <i className="bx bx-calendar" aria-hidden="true" />
                          )}
                          <span>{item.year}</span>
                        </div>
                      </div>

                      {/* Card Main Header: Prominent Title & Institution */}
                      <div className="abt-card-main-header">
                        <h3 className="abt-card-title">{item.title}</h3>
                        <div className="abt-card-institution">
                          <i className="bx bx-buildings"></i>
                          <span>{item.institution}</span>
                        </div>
                      </div>

                      {/* Card Body: Description */}
                      <p className="abt-card-desc">{item.desc}</p>

                      {/* Card Footer: Tags */}
                      <div className="abt-card-tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="abt-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Glass shine animation */}
                      <div className="abt-glass-shine" />
                    </article>
                  </div>
                );
              })}
            </div>

            {/* ── Timeline Ending Point (Terminus Node) ── */}
            <div className={`abt-timeline-terminus ${scrollProgress > 0.8 || revealedMap[5] ? 'active' : ''}`}>
              <div className="abt-terminus-node">
                <div className="abt-terminus-pulse" />
                <div className="abt-terminus-core">
                  <i className="bx bx-check"></i>
                </div>
              </div>
              <span className="abt-terminus-label">PRESENT &amp; BEYOND</span>
            </div>
          </div>

          {/* ── Timeline Actions Row (Positioned Cleanly Below the Ending Point) ── */}
          <div className={`abt-timeline-end-actions ${scrollProgress > 0.8 || revealedMap[5] ? 'revealed' : ''}`}>
            <a
              href="/assets/maneesh_amindu_cv.pdf"
              download="maneesh_amindu_cv.pdf"
              className="abt-download-cv-btn"
              id="about-end-download-cv-btn"
            >
              <i className="bx bx-download"></i>
              <span>DOWNLOAD CV</span>
            </a>

            <div className="abt-social-links">
              {ABOUT_SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="abt-social-btn"
                  aria-label={soc.name}
                  title={soc.name}
                >
                  <i className={soc.icon}></i>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
