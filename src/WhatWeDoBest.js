import React from 'react';
import { Layers, Palette, Code2, Smartphone, Sparkles, Rocket } from 'lucide-react';
import RadialOrbitalTimeline from './components/ui/radial-orbital-timeline';
import BlurText from './components/ui/BlurText';
import './WhatWeDoBest.css';

const SERVICES_TIMELINE_DATA = [
  {
    id: 1,
    title: "Discovery & Architecture",
    date: "Phase 01",
    content: "System requirements analysis, technical specification, and scalable cloud architecture roadmap.",
    category: "Architecture",
    icon: Layers,
    relatedIds: [2, 3],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "UI/UX & Design Systems",
    date: "Phase 02",
    content: "Human-centric interface design, wireframing, high-fidelity Figma prototypes & reusable component systems.",
    category: "Design",
    icon: Palette,
    relatedIds: [1, 3, 4],
    status: "completed",
    energy: 98,
  },
  {
    id: 3,
    title: "Full-Stack Web Engineering",
    date: "Phase 03",
    content: "Developing high-speed web apps with React, Next.js, Headless CMS (Sanity), Node.js, and Supabase.",
    category: "Engineering",
    icon: Code2,
    relatedIds: [2, 4, 6],
    status: "in-progress",
    energy: 100,
  },
  {
    id: 4,
    title: "Mobile App Development",
    date: "Phase 04",
    content: "Cross-platform mobile applications crafted with Flutter & Dart for seamless iOS and Android deployments.",
    category: "Mobile",
    icon: Smartphone,
    relatedIds: [3, 5],
    status: "in-progress",
    energy: 88,
  },
  {
    id: 5,
    title: "Interactive 3D & WebGL",
    date: "Phase 05",
    content: "Mind-bending 3D graphics, WebGL shaders, Three.js particles, and high-framerate GSAP interactions.",
    category: "Creative Tech",
    icon: Sparkles,
    relatedIds: [2, 3, 6],
    status: "in-progress",
    energy: 85,
  },
  {
    id: 6,
    title: "Deployment & Cloud Scaling",
    date: "Phase 06",
    content: "Automated CI/CD workflows, edge caching, SEO optimization, and high-availability cloud infrastructure.",
    category: "Cloud",
    icon: Rocket,
    relatedIds: [3, 5],
    status: "completed",
    energy: 92,
  },
];

const WhatWeDoBest = ({ onStartProject }) => {
  return (
    <section id="services" className="what-we-do-best-section">
      {/* ── Header ── */}
      <div className="what-we-do-best-header">
        <div className="eyebrow dark services-eyebrow">
          <span className="eyebrow-dot" />
          <span>Our Capabilities &amp; Services</span>
        </div>
        <BlurText
          text="What We Do Best"
          className="what-we-do-best-title"
          delay={120}
          animateBy="words"
          direction="top"
        />
        <p className="what-we-do-best-subtitle">
          Explore our end-to-end digital lifecycle and service architecture. Click any orbital node to inspect capabilities and linked workflows.
        </p>
      </div>

      {/* ── Radial Orbital Timeline Component ── */}
      <div className="services-orbital-wrapper" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
        <RadialOrbitalTimeline timelineData={SERVICES_TIMELINE_DATA} />
      </div>

      {/* ── Action Footer ── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        {onStartProject && (
          <button
            className="footer-cta-btn"
            onClick={onStartProject}
            style={{
              padding: '14px 28px',
              fontSize: '0.95rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
              color: '#030712',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <span>Start a Project with Us</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default WhatWeDoBest;
