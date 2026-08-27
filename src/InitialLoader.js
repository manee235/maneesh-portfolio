import React, { useEffect, useState } from 'react';

const InitialLoader = ({ isLoaded, onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const timeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setHidden(true);
        if (onComplete) onComplete();
      }, 900);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [isLoaded, onComplete]);

  if (hidden) return null;

  return (
    <div className={`il-overlay ${fadingOut ? 'il-fade-out' : ''}`}>
      <div className="il-inner">

        {/* Green availability status pill */}
        <div className="il-status-badge">
          <span className="il-status-dot" />
          <span className="il-status-text">Available for Projects</span>
        </div>

        {/* Main heading */}
        <div className="il-heading-wrap">
          <h1 className="il-h1">
            <span className="il-line-bright">Let's work</span>
            <span className="il-line-dim">together</span>
          </h1>
        </div>

        {/* Arrow CTA button */}
        <div className="il-arrow-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>

        {/* Subtitle copy */}
        <p className="il-body-copy">
          Have a project in mind? I'd love to hear about it.<br />
          Let's create something exceptional together.
        </p>

        {/* Email */}
        <a href="mailto:onlymaneesh@gmail.com" className="il-email">
          onlymaneesh@gmail.com
        </a>

      </div>
    </div>
  );
};

export default InitialLoader;
