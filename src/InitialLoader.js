import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShiningText from './components/ui/ShiningText';

const STATUS_MESSAGES = [
  "Initializing portfolio...",
  "Loading interactive experiences...",
  "Synthesizing digital crafts...",
  "Preparing visual assets...",
  "Ready!"
];

const InitialLoader = ({ isLoaded, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 7) + 4;
      
      if (!isLoaded && current > 88) {
        current = 88;
      } else if (isLoaded) {
        current += 15;
      }

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusIndex(4);

        setTimeout(() => {
          setFadingOut(true);
          setTimeout(() => {
            setHidden(true);
            if (onComplete) onComplete();
          }, 700);
        }, 400);
      } else {
        setProgress(current);
        if (current < 25) setStatusIndex(0);
        else if (current < 55) setStatusIndex(1);
        else if (current < 80) setStatusIndex(2);
        else setStatusIndex(3);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isLoaded, onComplete]);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className={`initial-loader-overlay ${fadingOut ? 'fade-out' : ''}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, translateY: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-content-wrap">
            {/* Brand Title & Status with ShiningText */}
            <div className="loader-brand">
              <ShiningText
                text="onlymaneesh"
                className="loader-logo-shining"
                duration={2.2}
              />

              <div className="loader-status-shining-wrap">
                <ShiningText
                  key={statusIndex}
                  text={STATUS_MESSAGES[statusIndex]}
                  className="loader-status-shining"
                  duration={2}
                />
              </div>
            </div>

            {/* Modern Progress Box */}
            <div className="loader-progress-box">
              <div className="loader-progress-bar-track">
                <div
                  className="loader-progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="loader-counter-row">
                <span className="loader-counter-label">CREATIVE EXPERIENCE</span>
                <span className="loader-counter-val">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
