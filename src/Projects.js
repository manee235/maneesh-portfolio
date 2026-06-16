import React, { useEffect, useRef, useState } from 'react';
import BorderGlow from './BorderGlow';
import Particles from './Particles';
import { LogoMark } from './PageLoader';

const Projects = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featuredProjects = [
    {
      id: 1,
      name: "Routie — Live Bus Tracking",
      category: "Mobile / Backend",
      year: "2026",
      description: "A modern Flutter application for real-time bus tracking and ticket booking with Supabase backend.",
      tags: ["Flutter", "Supabase", "Figma"],
      link: "https://github.com/manee235",
      image: "/assets/projects/routie.png",
    },

    {
      id: 2,
      name: "Dreamscape Designs",
      category: "Web Design",
      year: "2026",
      description: "A Website for House designing and interior designing Agency",
      tags: ["HTML", "CSS", "Animation"],
      link: "https://dreamscapedesigns.vercel.app/",
      image: "/assets/projects/dreamscape.png",
    },
    {
      id: 3,
      name: "NUVIA — LMS Platform",
      category: "Web Application",
      year: "2025",
      description: "A comprehensive academic learning management platform developed for course tracking and student collaboration.",
      tags: ["PHP", "MySQL", "JavaScript"],
      link: "https://github.com/manee235",
      image: "/assets/projects/nuvia.png",
    },

    {
      id: 4,
      name: "Interactive Digital Thorana",
      category: "Web Design",
      year: "2026",
      description: "A culturally inspired digital installation combining interactive design with traditional Sri Lankan motifs.",
      tags: ["React", "CSS", "Animation"],
      link: "https://thoranait.vercel.app/",
      image: "/assets/projects/thorana.png",
    },


  ];

  return (
    <section id="works" className="portfolio-section" ref={sectionRef}>
      <div className="shell">
        <div className="portfolio-header">
          <div className="portfolio-eyebrow">
            <div className="eyebrow dark">
              <span className="eyebrow-dot" />
              <span>Portfolio</span>
            </div>
          </div>
          <div className="portfolio-h2-reveal">
            <h2 className={`portfolio-h2 portfolio-h2-reveal-inner ${inView ? 'reveal' : ''}`}>
              Selected Work
            </h2>
          </div>
        </div>

        <ul className="portfolio-grid">
          {featuredProjects.map((project, index) => (
            <li
              key={project.id}
              className={`portfolio-card-wrapper ${inView ? 'reveal' : ''}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <BorderGlow
                glowColor="220 80 60"
                backgroundColor="#0a0a0a"
                borderRadius={32}
                glowRadius={60}
                glowIntensity={1.0}
                fillOpacity={0.4}
                colors={['#4f6bff', '#2563eb', '#1d4ed8']}
              >
                <a href={project.link} target="_blank" rel="noreferrer" className="portfolio-card-link">
                  <article className="portfolio-card-article">
                    <Particles
                      particleColors={['#ffffff', '#4f6bff']}
                      particleCount={20}
                      particleSpread={6}
                      speed={0.08}
                      particleBaseSize={60}
                      className="portfolio-card-particles"
                    />

                    {/* Image Wrapper */}
                    <div className="portfolio-card-image-wrapper">
                      <img src={project.image} alt={project.name} className="portfolio-card-img" />
                      <div className="portfolio-card-image-overlay" />

                      {/* Floating Meta Overlay */}
                      <div className="portfolio-card-meta-overlay">
                        <span className="portfolio-card-category">{project.category} — {project.year}</span>
                        <div className="portfolio-card-badge">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
                            <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="portfolio-card-watermark">
                      <div className="portfolio-card-watermark-inner">
                        <LogoMark size="4.5rem" />
                        <span>®</span>
                      </div>
                    </div>

                    {/* Details Content Container */}
                    <div className="portfolio-card-details">
                      <h3 className="portfolio-card-h3">{project.name}</h3>
                      <p className="portfolio-card-desc">{project.description}</p>
                      <div className="portfolio-card-tags">
                        {project.tags.map((tag) => (
                          <span className="tag-chip" key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                </a>
              </BorderGlow>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
