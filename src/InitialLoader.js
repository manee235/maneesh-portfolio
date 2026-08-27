import React, { useEffect, useState, useCallback } from 'react';
import './InitialLoader.css';

export default function InitialLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleEnter = useCallback(() => {
    if (!isReady || isExiting || isDone) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 950);
  }, [isReady, isExiting, isDone, onComplete]);

  useEffect(() => {
    // Smooth realistic asset & component loading simulation
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setIsReady(true);
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`il-screen ${isExiting ? 'il-exit' : ''}`}
      onClick={isReady ? handleEnter : undefined}
      style={{ cursor: isReady ? 'pointer' : 'default' }}
    >
      <div className="il-content">
        {/* ── Top Status Pill ── */}
        <div className="il-status-badge">
          <span className="il-status-dot" />
          <span className="il-status-text">AVAILABLE FOR PROJECTS</span>
        </div>

        {/* ── Main Elegant Headline ── */}
        <div className="il-headline-wrap">
          <h1 className="il-headline-line1">Let's work</h1>
          <h1 className="il-headline-line2">together</h1>
        </div>

        {/* ── Center Arrow & Circular Progress Button ── */}
        <div className="il-action-area">
          <button
            type="button"
            className={`il-circle-btn ${isReady ? 'il-ready' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            aria-label="Enter Website"
          >
            <svg
              className="il-progress-svg"
              viewBox="0 0 72 72"
            >
              <circle
                className="il-progress-bg"
                cx="36"
                cy="36"
                r="33"
              />
              <circle
                className="il-progress-bar"
                cx="36"
                cy="36"
                r="33"
                style={{
                  strokeDashoffset: 207.3 - (207.3 * progress) / 100,
                }}
              />
            </svg>
            <svg
              className="il-arrow-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>

          {/* Minimalist percentage counter / prompt */}
          <div className="il-counter-wrap">
            <span className="il-counter-text">
              {isReady ? 'ENTER WEBSITE' : `${progress}%`}
            </span>
          </div>
        </div>

        {/* ── Bottom Text (Email Removed) ── */}
        <div className="il-footer-wrap">
          <p className="il-footer-desc">
            Have a project in mind? I'd love to hear about it. Let's create something exceptional together.
          </p>
        </div>
      </div>
    </div>
  );
}
