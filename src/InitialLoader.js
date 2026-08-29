import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InitialLoader.css';

// ─────────────────────────────────────────────────
// PHASE 1: SVG-based spinner (GPU composited rotate)
// Conic-gradient border trick triggers layout/paint.
// SVG stroke-dash + transform:rotate runs on the compositor.
// ─────────────────────────────────────────────────
function SpinnerArcs() {
  return (
    <svg
      className="il-spinner-svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="il-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" />
          <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="il-grad2" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0055ff" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Arc 1 — clockwise */}
      <g className="il-arc-g1">
        <circle
          cx="60" cy="60" r="48"
          stroke="url(#il-grad1)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="160 142"
        />
      </g>

      {/* Arc 2 — counter-clockwise */}
      <g className="il-arc-g2">
        <circle
          cx="60" cy="60" r="48"
          stroke="url(#il-grad2)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="100 202"
        />
      </g>

      {/* Glow halo — opacity only, no blur repaint */}
      <g className="il-arc-g1 il-arc-glow">
        <circle
          cx="60" cy="60" r="48"
          stroke="#00ff88"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="160 142"
          opacity="0.18"
        />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────
// PHASE 2: White ring + corner squares
// ─────────────────────────────────────────────────
const SQUARE_POSITIONS = [
  { top: '-18px', left: '-18px' },
  { top: '-18px', right: '-18px' },
  { bottom: '-18px', left: '-18px' },
  { bottom: '-18px', right: '-18px' },
];

function RingAndParticles() {
  return (
    <div className="il-ring-stage">
      <motion.div
        className="il-white-ring"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity' }}
      />
      {SQUARE_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="il-corner-square"
          style={{ position: 'absolute', ...pos, willChange: 'transform, opacity' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.12 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────
// Shared Framer variants — defined outside render
// so they're not recreated every frame
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
// MAIN COMPONENT
// ─────────────────────────────────────────────────
export default function InitialLoader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => setPhase(3), 3900);
    const t4 = setTimeout(() => { setPhase(4); setShowFinal(true); }, 4600);
    const t5 = setTimeout(() => setIsReady(true), 5200);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
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
      {/* ── PHASE 1: SVG Spinner ── */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="p0"
            className="il-phase-wrap"
            variants={phaseVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            style={{ willChange: 'opacity' }}
          >
            <SpinnerArcs />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 2: Ring + Squares ── */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="p1"
            className="il-phase-wrap"
            variants={phaseVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.28 }}
            style={{ willChange: 'opacity' }}
          >
            <RingAndParticles />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 3: Profile + Name (exits cleanly before final) ── */}
      <AnimatePresence>
        {phase >= 2 && !showFinal && (
          <motion.div
            key="p2"
            className="il-phase-wrap il-logo-row"
            variants={phaseVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            style={{ willChange: 'opacity' }}
          >
            {/* Light sweep — opacity only, no filter blur */}
            {phase === 3 && (
              <motion.div
                className="il-light-sweep"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 0.9, 0.9, 0], scaleX: [0, 1, 1, 0] }}
                transition={{ duration: 0.85, times: [0, 0.2, 0.8, 1], ease: 'easeInOut' }}
                style={{ willChange: 'transform, opacity' }}
              />
            )}

            <motion.div
              className="il-profile-wrap"
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src="/assets/Profile.png"
                alt="Maneesh"
                className="il-profile-img"
              />
              <div className="il-profile-ring" />
            </motion.div>

            {/* Staggered letter reveal — opacity + translateY only (no blur) */}
            <div className="il-brand-text" aria-label="onlymaneesh.">
              {'onlymaneesh.'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.1 + i * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 4 / FINAL: "Let's work together" ── */}
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
                  together
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
