import React, { useEffect, useRef, useState } from 'react';
import './HeroStatement.css';

const DYNAMIC_WORDS = [
  {
    word: 'smarter',
    letters: [
      { char: 's', color: '#09090b' },
      { char: 'm', color: '#2563eb' },
      { char: 'a', color: '#6366f1' },
      { char: 'r', color: '#ec4899' },
      { char: 't', color: '#f97316' },
      { char: 'e', color: '#ef4444' },
      { char: 'r', color: '#f59e0b' },
    ],
  },
  {
    word: 'faster',
    letters: [
      { char: 'f', color: '#2563eb' },
      { char: 'a', color: '#3b82f6' },
      { char: 's', color: '#06b6d4' },
      { char: 't', color: '#10b981' },
      { char: 'e', color: '#f59e0b' },
      { char: 'r', color: '#f97316' },
    ],
  },
  {
    word: 'bolder',
    letters: [
      { char: 'b', color: '#8b5cf6' },
      { char: 'o', color: '#ec4899' },
      { char: 'l', color: '#f43f5e' },
      { char: 'd', color: '#f97316' },
      { char: 'e', color: '#eab308' },
      { char: 'r', color: '#2563eb' },
    ],
  },
  {
    word: 'cleaner',
    letters: [
      { char: 'c', color: '#10b981' },
      { char: 'l', color: '#06b6d4' },
      { char: 'e', color: '#3b82f6' },
      { char: 'a', color: '#6366f1' },
      { char: 'n', color: '#8b5cf6' },
      { char: 'e', color: '#ec4899' },
      { char: 'r', color: '#f43f5e' },
    ],
  },
];

export default function HeroStatement() {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in'); // 'in' | 'out'
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Intersection observer for section entrance blur-fade
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Word rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
        setFadeState('in');
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const currentObj = DYNAMIC_WORDS[index];

  return (
    <section ref={sectionRef} className="hs-section">
      <div className={`hs-container ${inView ? 'hs-in-view' : ''}`}>
        <h2 className="hs-headline">
          <span className="hs-prefix">We build </span>
          <span className={`hs-animated-word ${fadeState}`}>
            {currentObj.letters.map((l, i) => (
              <span
                key={`${currentObj.word}-${i}`}
                className="hs-letter"
                style={{
                  color: l.color,
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {l.char}
              </span>
            ))}
          </span>
          <span className="hs-suffix"> products</span>
        </h2>
      </div>
    </section>
  );
}
