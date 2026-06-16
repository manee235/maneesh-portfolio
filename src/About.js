import React, { useEffect, useRef, useState } from 'react';

// Social icons
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

const About = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const statement = "I’m Maneesh Amindu, a tech enthusiast focused on software engineering and UI/UX design. I enjoy building clean, scalable digital products and crafting modern user experiences.";
  const words = statement.split(' ');

  const qualifications = [
    { year: "2026", title: "CCNA Trainee", institute: "University of Moratuwa" },
    { year: "2024–2026", title: "HNDIT Undergraduate", institute: "SLIATE Kurunegala" },
    { year: "2023", title: "Cert. Software Engineering", institute: "NIBM" },
    { year: "2009–2022", title: "School Education", institute: "Sri Sumangala College" },
  ];

  const experience = [
    { year: "2025–Present", title: "Freelance Developer", institute: "Web Development & UI/UX" },
    { year: "2021–Present", title: "Music Producer (SYNTHV)", institute: "Electronic Score & Arrangement", link: "https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA" },
  ];

  const socials = [
    { label: 'Facebook', href: 'https://facebook.com', icon: <IconFacebook />, accent: true },
    { label: 'Spotify', href: 'https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA', icon: <IconSpotify />, accent: false },
    { label: 'GitHub', href: 'https://github.com/manee235', icon: <IconGithub />, accent: false },
    { label: 'Instagram', href: 'https://instagram.com/only.maneesh', icon: <IconInstagram />, accent: false },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="shell">
        <div className="about-grid">

          {/* Left Column — Globe */}
          <div className="about-left-col">


            <h2 className="about-h2-statement">
              {words.map((word, idx) => (
                <span key={idx} className="reveal-word">
                  <span
                    className={`reveal-word-inner ${inView ? 'reveal' : ''} ${idx >= 7 ? 'about-statement-muted' : ''}`}
                    style={{ transitionDelay: `${idx * 35}ms` }}
                  >
                    {word}&nbsp;
                  </span>
                </span>
              ))}
            </h2>



            <div className="about-globe-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
                <circle cx="12" cy="12" r="9.25" />
                <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5" />
              </svg>
            </div>

            <div className={`about-left-reveal-block ${inView ? 'reveal' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.5rem', height: '1.5rem' }}>
                <circle cx="12" cy="12" r="9.25" />
                <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5" />
              </svg>
              <div className="about-left-reveal-text">
                Kurunegala, Sri Lanka — building digital experiences worldwide.
              </div>
            </div>
          </div>

          {/* Right Column — Statement & Timelines */}
          <div className="about-right-col">


            <div className="about-cv-details">
              {/* Academics */}
              <div className="about-timeline-col">
                <h3>Academics</h3>
                <div className="about-timeline-list">
                  {qualifications.map((item, i) => (
                    <div className="about-timeline-item" key={i}>
                      <div className="about-timeline-meta"><span>{item.year}</span></div>
                      <div className="about-timeline-title">{item.title}</div>
                      <div className="about-timeline-subtitle">{item.institute}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="about-timeline-col">
                <h3>Experience</h3>
                <div className="about-timeline-list">
                  {experience.map((item, i) => (
                    <div className="about-timeline-item" key={i}>
                      <div className="about-timeline-meta"><span>{item.year}</span></div>
                      <div className="about-timeline-title">
                        {item.link
                          ? <a href={item.link} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{item.title}</a>
                          : item.title
                        }
                      </div>
                      <div className="about-timeline-subtitle">{item.institute}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Footer Row */}
            <div className={`about-footer-row ${inView ? 'reveal' : ''}`}>
              <div className="about-socials-group">
                <span className="about-socials-label">Find me online</span>
                <div className="about-socials-list">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`about-social-chip ${s.accent ? 'accent' : 'normal'}`}
                      title={s.label}
                    >
                      <span className="about-social-chip-inner">{s.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              <a href="/assets/maneesh_amindu_cv.pdf" download className="pill-btn outline with-arrow">
                <span className="pill-btn-inner">
                  <span>Download CV</span>
                  <span className="pill-btn-arrow-badge right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
                      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
