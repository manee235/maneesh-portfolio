import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InitialLoader.css';

// ─────────────────────────────────────────────────
// PROFILE BRAND STAGE: Profile in Circle -> Slide Left & Push Text Right
// ─────────────────────────────────────────────────
function ProfileBrandStage({ isExpanded }) {
  return (
    <motion.div
      className="il-brand-stage-wrap"
      layout
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Profile Image & Animated Circular Rings */}
      <motion.div
        className="il-profile-wrapper"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="il-profile-inner">
          <img
            src="/assets/Profile.png"
            alt="Maneesh"
            className="il-profile-img"
          />
        </div>

        {/* Animated concentric circular rings */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              className="il-rings-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="il-pulse-ring il-ring-1" />
              <div className="il-pulse-ring il-ring-2" />
              <div className="il-pulse-ring il-ring-3" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Brand Text that smoothly expands and pushes out to the right */}
      <motion.div
        className="il-brand-text-clip"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="il-brand-text" aria-label="onlymaneesh.">
          {'onlymaneesh.'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ x: -22, opacity: 0 }}
              animate={{
                x: isExpanded ? 0 : -22,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                duration: 0.42,
                delay: isExpanded ? 0.12 + i * 0.035 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────
// Shared Framer variants — defined outside render
// ─────────────────────────────────────────────────
const phaseVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const slideUp = {
  hidden:  { opacity: 0, y: 55 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const badgeVariants = {
  hidden:  { opacity: 0, y: -14 },
  visible: { opacity: 1, y: 0 },
};

const actionVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────────
// COLOR PALETTES FOR RANDOMIZATION ON LOAD
// ─────────────────────────────────────────────────
const COLOR_PALETTES = [
  // 1. Emerald to Sunset Rose
  ['#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e'],
  // 2. Cyan, Royal Blue to Hot Pink
  ['#06b6d4', '#3b82f6', '#2563eb', '#6366f1', '#8b5cf6', '#c026d3', '#ec4899', '#f43f5e'],
  // 3. Cyber Teal to Neon Coral
  ['#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f97316', '#ef4444'],
  // 4. Ultra Violet to Amber Gold
  ['#7c3aed', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#f59e0b'],
  // 5. Emerald Lime to Electric Purple
  ['#10b981', '#059669', '#06b6d4', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#db2777'],
];

export default function InitialLoader({ onComplete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Randomize letters colors on each component mount / page load
  const [togetherLetters] = useState(() => {
    const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    return 'together'.split('').map((char, i) => ({
      char,
      color: palette[i % palette.length],
    }));
  });

  useEffect(() => {
    // Step 1: Slide profile to left & push onlymaneesh text to right
    const t1 = setTimeout(() => setIsExpanded(true), 1100);
    // Step 2: Show final "Let's work together" screen
    const t2 = setTimeout(() => setShowFinal(true), 3200);
    // Step 3: Enter website button becomes interactive
    const t3 = setTimeout(() => setIsReady(true), 3800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const handleEnter = useCallback(() => {
    if (!isReady || isExiting || isDone) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 900);
  }, [isReady, isExiting, isDone, onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`il-screen ${isExiting ? 'il-exit' : ''}`}
      onClick={isReady ? handleEnter : undefined}
      style={{ cursor: isReady ? 'pointer' : 'default' }}
    >
      {/* ── STAGE 1: Center Profile in Circle -> Move Left & Push Text Right ── */}
      <AnimatePresence>
        {!showFinal && (
          <motion.div
            key="profile-brand"
            className="il-phase-wrap"
            variants={phaseVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.35 }}
            style={{ willChange: 'opacity' }}
          >
            <ProfileBrandStage isExpanded={isExpanded} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 2 / FINAL: "Let's work together" ── */}
      <AnimatePresence>
        {showFinal && (
          <motion.div
            key="final"
            className="il-final-content"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            style={{ willChange: 'opacity' }}
          >
            {/* Status badge */}
            <motion.div
              className="il-status-badge"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="il-status-dot" />
              <span className="il-status-text">AVAILABLE FOR PROJECTS</span>
            </motion.div>

            {/* Headline — translateY + opacity only */}
            <div className="il-headline-wrap">
              <div className="il-headline-clip">
                <motion.h1
                  className="il-headline-line1"
                  variants={slideUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  Let's work
                </motion.h1>
              </div>
              <div className="il-headline-clip">
                <motion.h1
                  className="il-headline-line2"
                  variants={slideUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.36, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <span className="il-together-glow-wrap">
                    {togetherLetters.map((l, i) => (
                      <span
                        key={i}
                        className="il-together-letter"
                        style={{
                          color: l.color,
                          animationDelay: `${i * 0.12}s`,
                        }}
                      >
                        {l.char}
                      </span>
                    ))}
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Enter button */}
            <motion.div
              className="il-action-area"
              variants={actionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <button
                type="button"
                className={`il-circle-btn ${isReady ? 'il-ready' : ''}`}
                onClick={(e) => { e.stopPropagation(); handleEnter(); }}
                aria-label="Enter Website"
              >
                <svg className="il-progress-svg" viewBox="0 0 72 72" aria-hidden="true">
                  <circle className="il-progress-bg" cx="36" cy="36" r="33" />
                  <circle className="il-progress-bar" cx="36" cy="36" r="33"
                    style={{ strokeDashoffset: 0 }}
                  />
                </svg>
                <svg className="il-arrow-icon" viewBox="0 0 24 24" width="20" height="20"
                  fill="none" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
              <div className="il-counter-wrap">
                <span className="il-counter-text">
                  {isReady ? 'ENTER WEBSITE' : 'LOADING...'}
                </span>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="il-footer-wrap"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.65, duration: 0.45 }}
              style={{ willChange: 'opacity' }}
            >
              <p className="il-footer-desc">
                Have a project in mind? I'd love to hear about it.
                Let's create something exceptional together.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
