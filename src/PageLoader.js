import React, { useState, useEffect, useRef } from 'react';

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
  const [loadingDone, setLoadingDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showScrollLabel, setShowScrollLabel] = useState(false);
  const videoRef = useRef(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (clientX - centerX) * 0.02;
      const offsetY = (clientY - centerY) * 0.02;

      setParallaxOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const hasStarted = useRef(false);
  const endTriggered = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep onCompleteRef updated to avoid it changing the useEffect dependency
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Video end handler — freeze at last frame, reveal hero content
  const handleVideoEnd = () => {
    if (endTriggered.current) return;
    endTriggered.current = true;

    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setShowHeroContent(true);

    // Show scroll label shortly after content reveals
    setTimeout(() => {
      setShowScrollLabel(true);
    }, 1500);

    // Unlock scroll after content is visible
    setTimeout(() => {
      onCompleteRef.current();
    }, 800);
  };

  // Loading progress phase (first 2 seconds)
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const FILL_MS = 2000;
    const startTime = performance.now();
    let animFrame;
    let fallbackTimer;
    let loadFadeTimeout;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / FILL_MS, 1);
      const val = Math.round(easeInOutCubic(t) * 100);
      setProgress(val);

      if (t < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        // Progress complete — fade out loading overlay, then play video
        loadFadeTimeout = setTimeout(() => {
          setLoadingDone(true);
          const video = videoRef.current;
          if (video) {
            video.play()
              .then(() => {
                // Determine duration dynamically or default to 10 seconds if not loaded yet
                const duration = (video.duration && !isNaN(video.duration)) ? video.duration : 8;
                fallbackTimer = setTimeout(() => {
                  handleVideoEnd();
                }, (duration + 3.0) * 1000); // 3 seconds buffer to allow natural ending
              })
              .catch((error) => {
                console.error('Video playback failed:', error);
                handleVideoEnd();
              });
          } else {
            handleVideoEnd();
          }
        }, 600); // wait for loading fade-out
      }
    };

    animFrame = requestAnimationFrame(updateProgress);
    return () => {
      hasStarted.current = false;
      cancelAnimationFrame(animFrame);
      clearTimeout(loadFadeTimeout);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section id="home" className="hero-video-section">
      {/* Video Background (always present, plays after loading) */}
      <div
        className="hero-video-container"
        style={{
          transform: `translate(${parallaxOffset.x * 1.2}px, ${parallaxOffset.y * 1.2}px)`
        }}
      >
        <video
          ref={videoRef}
          className="hero-video"
          muted
          playsInline
          preload="auto"
          loop={false}
          onEnded={handleVideoEnd}
        >
          <source src="/assets/videoload.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark overlay gradient at bottom for content readability */}
      <div className="hero-video-gradient" />

      {/* Loading Phase Overlay (fixed, covers viewport) */}
      <div className={`hero-loading-overlay ${loadingDone ? 'hide' : ''}`}>
        <div className="loading-left">
          <div className="loading-name">
            <div>MANEESH</div>
            <div>AMINDU</div>
          </div>
        </div>

        <div className="loading-right">
          <div className="loading-percentage">
            {progress}<span className="percent">%</span>
          </div>
        </div>
      </div>

      {/* Hero Content Overlay (fades in after video freezes) */}
      <div className={`hero-content-overlay ${showHeroContent ? 'reveal' : ''}`}>
        {/* Left-aligned block containing Roles, animated greeting, animated name, and description */}
        <div
          className={`hero-text-block ${showHeroContent ? 'animate' : ''}`}
          style={{
            transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`
          }}
        >


          <div className="hero-main-title">
            {/* Animated Greeting */}
            <div className="hero-hello">
              {"Hello, I'm".split("").map((char, index) => (
                <span key={index} style={{ transitionDelay: `${index * 30}ms` }} className="char-fade">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            {/* Animated Name */}
            <h1 className="hero-name-heading">
              {"Maneesh Amindu".split("").map((char, index) => (
                <span key={index} style={{ transitionDelay: `${300 + index * 40}ms` }} className="char-fade">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>


          {/* Roles Banner - Now prominently displayed above the name */}
          <div className="hero-roles-banner">
            <i className='bx bx-shape-polygon' style={{ color: '#4f6bff', marginRight: '4px' }}></i>
            <span>Creative UI/UX Designer</span>
            <span className="role-sep">•</span>
            <span>Mobile App Developer</span>
          </div>

          {/* Premium UI/UX / Dev description */}
          <p className="hero-desc-text">
            Designing and engineering premium, high-impact web apps. Specialist in clean interfaces, interaction design, and front-end craftsmanship.
          </p>
        </div>

        {/* Stats Cards - Bottom Left */}
        <div
          className="hero-content-stats"
          style={{
            transform: `translate(${parallaxOffset.x * 0.7}px, ${parallaxOffset.y * 0.7}px)`
          }}
        >
          <div className="hero-stat-card">
            <i className='bx bx-briefcase' style={{ color: '#4f6bff', fontSize: '1.25rem' }}></i>
            <span className="stat-value">20+</span>
            <span className="stat-label">Projects Built</span>
          </div>
          <div className="hero-stat-card">
            <i className='bx bx-code-alt' style={{ color: '#4f6bff', fontSize: '1.25rem' }}></i>
            <span className="stat-value">2+</span>
            <span className="stat-label">Years Coding</span>
          </div>
        </div>

        {/* Available Badge - Right Side */}
        <div
          className="hero-content-available"
          style={{
            transform: `translate(${parallaxOffset.x * 0.6}px, ${parallaxOffset.y * 0.6}px)`
          }}
        >
          <span className="ping-dot">
            <span className="ping-animation" />
            <span className="dot" />
          </span>
          <span>Available · Internship / Freelance</span>
        </div>

        {/* CTA Button - Right Side */}
        <div
          className="hero-content-cta"
          style={{
            transform: `translate(${parallaxOffset.x * 0.7}px, ${parallaxOffset.y * 0.7}px)`
          }}
        >
          <a href="/assets/maneesh_amindu_cv.pdf" download className="hero-cv-btn">
            <i className='bx bx-download' style={{ fontSize: '1.2rem' }}></i>
            <span>Download CV</span>
          </a>
        </div>

        {/* Scroll Indicator - Bottom Center */}
        <div className={`hero-scroll-indicator ${showScrollLabel ? 'show' : ''}`}>

          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default PageLoader;
