import React, { useState, useEffect } from 'react';
import Particles from './Particles';

// 4-point Spark LogoMark SVG
export const LogoMark = ({ className, size = "1em", style }) => (
  <svg
    viewBox="0 0 48 48"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
  </svg>
);

const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const PageLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const FILL_MS = 1800; // Premium 1.8s count up
    const startTime = performance.now();

    let animFrame;
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / FILL_MS, 1);
      const val = Math.round(easeInOutCubic(t) * 100);
      setProgress(val);

      if (t < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        // Count complete, slide up
        setExit(true);
        setTimeout(() => {
          onComplete();
        }, 800); // Wait for the transition to finish
      }
    };

    animFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  return (
    <div className={`page-loader ${exit ? 'exit' : ''}`}>
      <Particles
        particleColors={["#4f6bff", "#ffffff", "#8b5cf6"]}
        particleCount={70}
        particleSpread={10}
        speed={0.15}
        particleBaseSize={100}
        className="page-loader-particles"
      />
      <div className="page-loader-branding">
        <div className="page-loader-name">MANEESH AMINDU</div>
      </div>
      <div className="page-loader-counter">
        {progress}<span className="percent-sign">%</span>
      </div>
    </div>
  );
};

export default PageLoader;
