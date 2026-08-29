import React from 'react';
import './Testimonials.css';

// ─── Real Verified Client Testimonials ─────────────────────────────────────────
// Tharanga Romen (Singer & Music / Graphic Design · France)
// Dreamscape Designs (Website Development & Full-Stack · Sri Lanka)
// Nagomi Lanka (Cross-Border Website & Digital Platform · Japan)

const REAL_TESTIMONIALS_COL_1 = [
  {
    id: 'dreamscape-web-1',
    quote: 'Maneesh developed a high-performance modern website for our brand. Ultra-fast loading speeds, smooth interactive components, and clean modular architecture.',
    name: 'Dreamscape Designs',
    role: 'Website Development · Sri Lanka',
  },
  {
    id: 'tharanga-music-1',
    quote: 'Maneesh produced and mixed exceptional tracks for my music releases. The audio engineering, sound design, and arrangement were festival-grade quality.',
    name: 'Tharanga Romen',
    role: 'Singer & Music Producer · France',
  },
  {
    id: 'nagomi-web-1',
    quote: 'Engineered a seamless cross-border website connecting Japanese travelers with Sri Lanka. Intuitive user flow, multi-device responsiveness, and high reliability.',
    name: 'Nagomi Lanka',
    role: 'Website Development · Japan',
  },
];

const REAL_TESTIMONIALS_COL_2 = [
  {
    id: 'tharanga-design-1',
    quote: 'Designed stunning cover artwork, visual identity, and promotional graphic design assets for my releases. Pixel-perfect creative direction with great artistic taste.',
    name: 'Tharanga Romen',
    role: 'Graphic Design & Visuals · France',
  },
  {
    id: 'dreamscape-web-2',
    quote: 'Exceptional frontend development velocity and responsive precision. The custom web components and clean UI elevated our online presence significantly.',
    name: 'Dreamscape Designs',
    role: 'Web Platform & UI · Sri Lanka',
  },
  {
    id: 'nagomi-web-2',
    quote: 'Delivered an elegant, fast, and user-friendly web platform. The attention to detail, modern styling, and clean performance exceeded our expectations.',
    name: 'Nagomi Lanka',
    role: 'Web Engineering · Japan',
  },
];

const REAL_TESTIMONIALS_COL_3 = [
  {
    id: 'tharanga-music-2',
    quote: 'From custom beats to final audio mastering, working with Maneesh brought my musical vision to life. Reliable collaborator with deep creative intuition.',
    name: 'Tharanga Romen',
    role: 'Music & Audio Collaboration · France',
  },
  {
    id: 'dreamscape-web-3',
    quote: 'Flawless execution on our web development requirements. Maneesh wrote robust code that handles traffic seamlessly with zero maintenance headaches.',
    name: 'Dreamscape Designs',
    role: 'Full-Stack Web · Sri Lanka',
  },
  {
    id: 'nagomi-web-3',
    quote: 'Great communication across international timezones. The website launched on time and provided our international audience with a smooth digital experience.',
    name: 'Nagomi Lanka',
    role: 'Digital Web Solutions · Japan',
  },
];

// Clean Circular Profile Avatar Placeholder (Exact Match to Reference Image)
function ProfileAvatarPlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="tm-avatar-placeholder-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="avatarCircleClip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      {/* Outer Circle Background */}
      <circle cx="50" cy="50" r="50" fill="#f1f5f9" />
      {/* Clipped Head & Shoulders Silhouette */}
      <g clipPath="url(#avatarCircleClip)">
        {/* Head */}
        <circle cx="50" cy="44" r="17" fill="#cbd5e1" />
        {/* Rounded Shoulders */}
        <path
          d="M 18 88 C 18 69, 32 63, 50 63 C 68 63, 82 69, 82 88 Z"
          fill="#cbd5e1"
        />
      </g>
    </svg>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="tm-card">
      <p className="tm-quote">"{item.quote}"</p>
      <div className="tm-author">
        <div className="tm-avatar-wrap">
          <ProfileAvatarPlaceholder />
        </div>
        <div className="tm-author-info">
          <span className="tm-name">{item.name}</span>
          <span className="tm-role">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="tm-section" id="testimonials">
      <div className="tm-container">
        {/* ── Section Header ── */}
        <div className="tm-header" data-parallax="0.05">
          <h2 className="tm-title">What our clients say</h2>
          <p className="tm-subtitle">Verified feedback from real client projects &amp; collaborations.</p>
        </div>

        {/* ── Responsive Column Marquee ── */}
        <div className="tm-columns-wrapper">
          {/* Column 1 (Active on Mobile, Tablet & Desktop) */}
          <div className="tm-column tm-col-1" data-parallax="0.08">
            <div className="tm-track tm-track-up">
              {[...REAL_TESTIMONIALS_COL_1, ...REAL_TESTIMONIALS_COL_2, ...REAL_TESTIMONIALS_COL_1, ...REAL_TESTIMONIALS_COL_2].map((item, idx) => (
                <TestimonialCard key={`col1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Column 2 (Active on Tablet & Desktop) */}
          <div className="tm-column tm-col-2" data-parallax="-0.09">
            <div className="tm-track tm-track-down">
              {[...REAL_TESTIMONIALS_COL_2, ...REAL_TESTIMONIALS_COL_3, ...REAL_TESTIMONIALS_COL_2, ...REAL_TESTIMONIALS_COL_3].map((item, idx) => (
                <TestimonialCard key={`col2-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Column 3 (Active on Desktop) */}
          <div className="tm-column tm-col-3" data-parallax="0.07">
            <div className="tm-track tm-track-up">
              {[...REAL_TESTIMONIALS_COL_3, ...REAL_TESTIMONIALS_COL_1, ...REAL_TESTIMONIALS_COL_3, ...REAL_TESTIMONIALS_COL_1].map((item, idx) => (
                <TestimonialCard key={`col3-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
