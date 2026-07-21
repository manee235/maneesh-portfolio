import React, { useEffect, useRef, useState } from 'react';

/* ── Small social icon components ── */
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

/* ── Scroll-reveal hook for individual cards ── */
const useInViewRef = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ── Single timeline card with its own observer ── */
const TimelineCard = ({ item, side }) => {
  const [ref, visible] = useInViewRef(0.15);
  return (
    <div
      ref={ref}
      className={`atl-card atl-card--${side} ${visible ? 'atl-card--visible' : ''}`}
    >
      <div className="atl-card-year">{item.year}</div>
      <div className="atl-card-title">{item.link
        ? <a href={item.link} target="_blank" rel="noreferrer" className="atl-card-link">{item.title}</a>
        : item.title}
      </div>
      <div className="atl-card-sub">{item.institute}</div>
    </div>
  );
};

/* ── Main component ── */
const About = () => {
  const bioRef = useRef(null);
  const [bioVisible, setBioVisible] = useState(false);
  const lineRef = useRef(null);
  const timelineWrapRef = useRef(null);

  /* Reveal bio */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setBioVisible(true); },
      { threshold: 0.2 }
    );
    if (bioRef.current) obs.observe(bioRef.current);
    return () => obs.disconnect();
  }, []);

  /* Animate center line on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (!timelineWrapRef.current || !lineRef.current) return;
      const rect = timelineWrapRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh * 0.3)));
      lineRef.current.style.height = `${progress * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const qualifications = [
    { year: '2026',      title: 'CCNA Trainee',              institute: 'University of Moratuwa' },
    { year: '2024–2026', title: 'HNDIT Undergraduate',       institute: 'SLIATE Kurunegala' },
    { year: '2023',      title: 'Cert. Software Engineering', institute: 'NIBM' },
    { year: '2009–2022', title: 'School Education',          institute: 'Sri Sumangala College' },
  ];

  const experience = [
    { year: '2025–Present', title: 'Freelance Developer',    institute: 'Web Development & UI/UX' },
    { year: '2021–Present', title: 'Music Producer (SYNTHV)', institute: 'Electronic Score & Arrangement',
      link: 'https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA' },
  ];

  const socials = [
    { label: 'Facebook',  href: 'https://facebook.com/maneesh.amindu', color: '#1877F2', icon: <IconFacebook /> },
    { label: 'Spotify',   href: 'https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA', color: '#1DB954', icon: <IconSpotify /> },
    { label: 'GitHub',    href: 'https://github.com/manee235', color: '#ffffff', icon: <IconGithub /> },
    { label: 'Instagram', href: 'https://instagram.com/only.maneesh', color: '#E1306C', icon: <IconInstagram /> },
  ];

  /* Build interleaved timeline rows: [qualif[0], exp[0], qualif[1], exp[1], ...] */
  const maxLen = Math.max(qualifications.length, experience.length);
  const rows = [];
  for (let i = 0; i < maxLen; i++) {
    if (qualifications[i]) rows.push({ item: qualifications[i], side: 'right' });
    if (experience[i])     rows.push({ item: experience[i],     side: 'left'  });
  }

  return (
    <section id="about" className="atl-section">

      {/* ── Bio block ── */}
      <div ref={bioRef} className={`atl-bio ${bioVisible ? 'atl-bio--visible' : ''}`} data-parallax="0.08">
        <p className="atl-bio-text">
          <span className="atl-bio-name">I'm Maneesh Amindu,</span>{' '}
          a tech enthusiast focused on software engineering and UI/UX design.
          I enjoy building clean, scalable digital products
          and crafting modern user experiences.
        </p>
        <p className="atl-bio-location">Kurunegala, Sri Lanka — building digital experiences worldwide.</p>
      </div>



      {/* ── Timeline ── */}
      <div className="atl-timeline-wrap" ref={timelineWrapRef}>

        {/* Center vertical line track */}
        <div className="atl-line-track" />
        {/* Animated fill */}
        <div className="atl-line-fill" ref={lineRef} />

        {/* Cards */}
        {rows.map((row, i) => (
          <div key={i} className={`atl-row atl-row--${row.side}`}>
            {/* Dot on the center line */}
            <DotObserver index={i} />
            <TimelineCard item={row.item} side={row.side} />
          </div>
        ))}
      </div>

      {/* ── Social footer ── */}
      <div className="atl-social-row">
        <span className="atl-social-label">Find me online</span>
        <div className="atl-social-chips">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.label}
              className="atl-social-chip"
              style={{ background: s.color === '#ffffff' ? '#1a1a1a' : s.color }}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <a href="/assets/maneesh_amindu_cv.pdf" download className="atl-cv-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
      </div>

    </section>
  );
};

/* Animated dot — observes itself */
const DotObserver = ({ index }) => {
  const [ref, visible] = useInViewRef(0.5);
  return (
    <div
      ref={ref}
      className={`atl-dot ${visible ? 'atl-dot--active' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    />
  );
};

export default About;
