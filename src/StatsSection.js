import React, { useEffect, useRef, useState } from 'react';
import './StatsSection.css';

const STATS = [
  {
    id: 'projects',
    label: 'Completed Projects',
    number: '20+',
    sub: 'delivered across web, mobile & digital platforms',
    delay: '0.1s',
  },
  {
    id: 'experience',
    label: 'Engineering Experience',
    number: '2+ Years',
    sub: 'of full-stack development & UI/UX architecture',
    delay: '0.25s',
  },
  {
    id: 'satisfaction',
    label: 'Satisfaction Level',
    number: '99%',
    sub: 'client retention & positive collaborative feedback',
    delay: '0.4s',
  },
];

export default function StatsSection({ onOpenContact }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`st-section ${isVisible ? 'st-visible' : ''}`}
      id="stats"
    >
      <div className="st-container">
        {/* ── 3 Stat Cards Grid with Staggered Entrance ── */}
        <div className="st-grid">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="st-card"
              style={{ transitionDelay: stat.delay }}
            >
              <span className="st-card-label">{stat.label}</span>
              <div className="st-card-number-wrap">
                <span className="st-card-number">{stat.number}</span>
              </div>
              <p className="st-card-sub">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Center Statement with Blur-Fading Reveal ── */}
        <div className="st-center-content">
          <h2 className="st-headline">Built for creativity, loved for efficiency</h2>
          <p className="st-subheadline">
            The design &amp; full-stack engineering craft modern digital teams rely on.
          </p>

          {/* CTA Action */}
          <div className="st-action-wrap">
            <button
              type="button"
              className="st-cta-btn"
              onClick={() => onOpenContact && onOpenContact()}
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
