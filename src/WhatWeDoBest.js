import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './WhatWeDoBest.css';

const SERVICES_STACK = [
  {
    number: '01',
    category: 'Full-Stack Architecture',
    title: 'Software Development & Web Apps',
    description: 'Engineering robust, scalable web applications and cloud solutions with ultra-responsive UI, microservice architecture, and lightning-fast API integrations.',
    tags: ['React', 'Next.js', 'Node.js', 'PHP', 'Supabase', 'REST APIs'],
    badgeColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    borderColor: 'rgba(56, 189, 248, 0.25)'
  },
  {
    number: '02',
    category: 'Cross-Platform Mobile',
    title: 'Mobile App Development',
    description: 'Crafting high-performance iOS and Android applications using Flutter & native frameworks with smooth gestures, offline sync, and intuitive navigation.',
    tags: ['Flutter', 'Dart', 'iOS & Android', 'Firebase', 'State Management'],
    badgeColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    bgGradient: 'linear-gradient(135deg, #1c1917 0%, #451a03 50%, #1c1917 100%)',
    borderColor: 'rgba(251, 191, 36, 0.25)'
  },
  {
    number: '03',
    category: 'Experience & Interface',
    title: 'Product Design & UI/UX',
    description: 'Architecting clean, human-centered digital interfaces, interactive prototypes, visual brand systems, and frictionless user journeys.',
    tags: ['Figma', 'UI/UX Design', 'Design Systems', 'Wireframing', 'User Testing'],
    badgeColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    bgGradient: 'linear-gradient(135deg, #18181b 0%, #3b0764 50%, #18181b 100%)',
    borderColor: 'rgba(168, 85, 247, 0.25)'
  },
  {
    number: '04',
    category: 'Immersive Graphics',
    title: 'Interactive WebGL & Visual FX',
    description: 'Bringing digital spaces to life with hardware-accelerated 3D WebGL scenes, interactive canvas installations, particle engines, and fluid GSAP animations.',
    tags: ['Three.js', 'WebGL', 'GSAP', 'Canvas 3D', 'Shaders'],
    badgeColor: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.4)',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #701a75 50%, #0f172a 100%)',
    borderColor: 'rgba(244, 114, 182, 0.25)'
  }
];

const WhatWeDoBest = ({ onStartProject }) => {
  return (
    <section id="services" className="what-we-do-best-section">
      <div className="what-we-do-best-header">
        <div className="eyebrow dark services-eyebrow">
          <span className="eyebrow-dot" />
          <span>Our Capabilities</span>
        </div>
        <h2 className="what-we-do-best-title">What We Do Best</h2>
        <p className="what-we-do-best-subtitle">
          Scroll through our core expertise—delivering end-to-end digital solutions crafted with technical precision and bold design aesthetics.
        </p>
      </div>

      <div className="what-we-do-best-stack-container">
        <ScrollStack
          itemDistance={80}
          itemScale={0.03}
          itemStackDistance={25}
          stackPosition="15%"
          baseScale={0.88}
          blurAmount={0}
          useWindowScroll={true}
        >
          {SERVICES_STACK.map((service, index) => (
            <ScrollStackItem key={index}>
              <div
                className="wwdb-card-content"
                style={{
                  background: service.bgGradient,
                  borderColor: service.borderColor,
                  '--card-glow': service.glowColor
                }}
              >
                <div className="wwdb-card-top">
                  <span className="wwdb-card-number">{service.number}</span>
                  <span
                    className="wwdb-card-category"
                    style={{ color: service.badgeColor, borderColor: `${service.badgeColor}40` }}
                  >
                    {service.category}
                  </span>
                </div>

                <div className="wwdb-card-body">
                  <h3 className="wwdb-card-title">{service.title}</h3>
                  <p className="wwdb-card-desc">{service.description}</p>
                </div>

                <div className="wwdb-card-footer">
                  <div className="wwdb-tags-list">
                    {service.tags.map((tag, idx) => (
                      <span key={idx} className="wwdb-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {onStartProject && (
                    <button
                      className="wwdb-action-btn"
                      onClick={() => onStartProject()}
                      style={{ background: service.badgeColor, color: '#09090b' }}
                    >
                      Start a Project
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="wwdb-btn-icon">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default WhatWeDoBest;
