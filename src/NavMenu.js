import React, { useEffect } from 'react';
import Particles from './Particles';

// Social icon components
const IconBehance = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.259 0-6.625-2.859-6.625-6.923 0-4.484 2.809-7.077 6.643-7.077 4.195 0 6.069 2.946 5.86 6.554h-9.45c.088 2.051 1.488 3.518 3.52 3.518 1.494 0 2.518-.737 2.955-1.782l2.198 2.71zm-9.043-5.548h6.467c-.073-1.686-.999-2.732-2.92-2.732-1.921 0-3.328 1.109-3.547 2.732zm-10.683-7.452h5.719c2.479 0 4.181.996 4.181 3.036 0 1.277-.665 2.215-1.777 2.684 1.439.421 2.378 1.543 2.378 3.208 0 2.454-2.024 3.572-4.521 3.572h-6.04v-12.5zm3.178 4.797h2.181c.883 0 1.562-.398 1.562-1.229 0-.853-.668-1.19-1.574-1.19h-2.169v2.419zm0 5.375h2.463c1.037 0 1.838-.456 1.838-1.393 0-.962-.832-1.404-1.879-1.404h-2.422v2.797z" />
  </svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconSpotify = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.36a.624.624 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.78-.97a.625.625 0 0 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.12.3.18.39.57.2.86zm1.24-2.76a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 0 1-.44-1.49c3.63-1.1 8.14-.57 11.22 1.33.37.23.49.71.26 1.07zm.11-2.88C14.25 8.95 9.26 8.77 6.41 9.6a.937.937 0 1 1-.54-1.8c3.27-.99 8.71-.8 12.14 1.34.44.26.58.83.32 1.27a.937.937 0 0 1-1.34.31z"/>
  </svg>
);
const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const BrandLogo = ({ style = {} }) => (
  <span
    style={{
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 800,
      fontSize: '20px',
      letterSpacing: '-0.04em',
      color: '#ffffff',
      textTransform: 'lowercase',
      display: 'inline-flex',
      alignItems: 'baseline',
      ...style
    }}
  >
    onlymaneesh
    <span style={{ color: '#38bdf8', filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.8))', fontWeight: 900 }}>.</span>
    <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', marginLeft: '3px', position: 'relative', top: '-0.35em' }}>®</span>
  </span>
);

const NavMenu = ({ isOpen, onClose, onNavigate, onOpenContact, localTime }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    { label: 'Home', id: '#home' },
    { label: 'About', id: '#about' },
    { label: 'Projects', id: '#works' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id) => {
    onClose();
    if (id === 'contact') {
      setTimeout(() => onOpenContact(), 300);
    } else {
      setTimeout(() => onNavigate(id), 300);
    }
  };

  const socials = [
    { label: 'Behance', href: 'https://www.behance.net/maneesh_amindu', icon: <IconBehance /> },
    { label: 'GitHub', href: 'https://github.com/manee235', icon: <IconGithub /> },
    { label: 'Instagram', href: 'https://instagram.com/only.maneesh', icon: <IconInstagram /> },
    { label: 'Facebook', href: 'https://facebook.com', icon: <IconFacebook /> },
    { label: 'Spotify', href: 'https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA', icon: <IconSpotify /> },
  ];

  return (
    <div className={`nav-menu-overlay ${isOpen ? 'open' : ''}`}>
      <Particles
         particleColors={['#4f6bff', '#ffffff']}
         particleCount={40}
         particleSpread={12}
         speed={0.08}
         particleBaseSize={70}
         className="nav-menu-particles"
      />
      <div className="shell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Top bar */}
        <div className="nav-menu-top-bar">
          <div className="nav-menu-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <BrandLogo height={20} />
          </div>
          <button className="nav-menu-close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '0.875rem', height: '0.875rem' }}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Close</span>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="nav-menu-nav">
          <ul className="nav-menu-list">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <button
                  className="nav-menu-item-btn"
                  style={{ transitionDelay: isOpen ? `${index * 45 + 80}ms` : '0ms' }}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className="nav-menu-item-index">0{index + 1}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom bar with social icons */}
        <div className="nav-menu-bottom-bar">
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '1.125rem',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div>Local time — {localTime}</div>
          <button
            className="nav-menu-bottom-start-project"
            onClick={() => { onClose(); setTimeout(onOpenContact, 300); }}
          >
            Start a project →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
