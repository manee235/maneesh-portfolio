import React, { useCallback, useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import './GlobeFeatureSection.css';

const GLOBE_CONFIG = {
  width: 900,
  height: 900,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 18000,
  mapBrightness: 2.2,
  baseColor: [0.94, 0.96, 0.98],
  markerColor: [37 / 255, 99 / 255, 235 / 255], // Electric blue #2563eb
  glowColor: [0.85, 0.9, 0.98],
  markers: [
    { location: [6.9271, 79.8612], size: 0.12 }, // Sri Lanka (Home)
    { location: [40.7128, -74.006], size: 0.08 }, // New York
    { location: [37.7749, -122.4194], size: 0.08 }, // San Francisco
    { location: [51.5074, -0.1278], size: 0.08 }, // London
    { location: [52.52, 13.405], size: 0.07 }, // Berlin
    { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
    { location: [1.3521, 103.8198], size: 0.07 }, // Singapore
    { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
    { location: [25.2048, 55.2708], size: 0.08 }, // Dubai
  ],
};

function Globe({ className = '', config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) {
        state.phi += 0.004;
      } else {
        state.phi += r;
      }
      state.width = canvasRef.current ? canvasRef.current.offsetWidth * 2 : 900;
      state.height = canvasRef.current ? canvasRef.current.offsetWidth * 2 : 900;
    },
    [r]
  );

  useEffect(() => {
    let width = canvasRef.current ? canvasRef.current.offsetWidth : 450;

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    if (canvasRef.current) {
      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = '1';
      }, 100);
    }

    return () => {
      globe.destroy();
    };
  }, [config, onRender]);

  return (
    <div className={`globe-canvas-wrap ${className}`}>
      <canvas
        ref={canvasRef}
        className="globe-canvas"
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

export default function GlobeFeatureSection({ onOpenContact }) {
  return (
    <section className="globe-feature-section">
      <div className="globe-feature-container">
        <div className="globe-card">
          {/* Left Text & CTA */}
          <div className="globe-text-content">
            <div className="globe-badge">
              <span className="globe-badge-dot" />
              GLOBAL AVAILABILITY · REMOTE
            </div>
            <h2 className="globe-heading">
              Build with <span className="globe-highlight">onlymaneesh</span>
              <span className="globe-subheading">
                Empower your vision with fast, elegant, and scalable digital systems. Bringing precision engineering and modern aesthetics to your high-impact projects.
              </span>
            </h2>
            <button
              className="globe-cta-btn"
              onClick={() => onOpenContact && onOpenContact()}
            >
              <span>Start a Project</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Right Interactive Globe Stage */}
          <div className="globe-stage">
            <Globe className="globe-element" />
          </div>
        </div>
      </div>
    </section>
  );
}
