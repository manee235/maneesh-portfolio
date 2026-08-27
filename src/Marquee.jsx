import React from 'react';

const MARQUEE_TEXT = 'SPARK · RENDER · IGNITE · UNFOLD · GENESIS · EVOLVE · PURPOSE · BEYOND · ';

export default function Marquee() {
  return (
    <div className="w-full bg-white overflow-hidden py-6 md:py-8">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className="font-bamboly uppercase select-none shrink-0"
            style={{
              color: '#EC612C',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1,
              paddingRight: '0.25em',
            }}
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
