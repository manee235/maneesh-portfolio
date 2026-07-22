import React, { useEffect, useState } from 'react';

const InitialLoader = ({ isLoaded, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (!isLoaded && current > 88) {
        current = 88;
      } else if (isLoaded) {
        current += 15;
      }

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);

        setTimeout(() => {
          setFadingOut(true);
          setTimeout(() => {
            setHidden(true);
            if (onComplete) onComplete();
          }, 650);
        }, 300);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isLoaded, onComplete]);

  if (hidden) return null;

  return (
    <div className={`initial-loader-overlay ${fadingOut ? 'fade-out' : ''}`}>
      <div className="loader-content-wrap">
        <div className="loader-brand">
          <span className="loader-logo-text">onlymaneesh</span>
          <span className="loader-status-text">INITIALIZING PORTFOLIO</span>
        </div>

        <div className="loader-progress-box">
          <div className="loader-progress-bar-track">
            <div 
              className="loader-progress-bar-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="loader-counter-row">
            <span className="loader-counter-label">LOADING DATA & ASSETS</span>
            <span className="loader-counter-val">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
