import React from 'react';

export default function LightRays({ isDarkMode }) {
  const glowColor = isDarkMode ? 'rgba(96, 165, 250, 0.18)' : 'rgba(96, 165, 250, 0.12)';
  const rayColor = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <svg
      className="light-rays-svg"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} />
          <stop offset="70%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#glowGradient)" />
      <g stroke={rayColor} strokeWidth="1.5" opacity="0.65">
        <line x1="200" y1="0" x2="1000" y2="800" />
        <line x1="0" y1="200" x2="1200" y2="600" />
        <line x1="300" y1="0" x2="1200" y2="700" />
        <line x1="0" y1="400" x2="1200" y2="400" />
        <line x1="0" y1="600" x2="900" y2="800" />
      </g>
    </svg>
  );
}
