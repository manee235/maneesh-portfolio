import React, { useCallback, useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import './GlobalNetwork.css';

// ─── 3 Client Locations on the Globe (Sri Lanka, France, Japan) ───────────────
const PARTNERS = [
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    tag: 'HQ & Engineering Base',
    city: 'Colombo',
    country: 'Sri Lanka',
    lat: 6.9271,
    lng: 79.8612,
    isHQ: true,
    size: 0.12,
  },
  {
    id: 'france',
    name: 'France',
    tag: 'Creative & UI/UX Client',
    city: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    size: 0.09,
  },
  {
    id: 'japan',
    name: 'Japan',
    tag: 'Spatial & Digital Partner',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    size: 0.09,
  },
];

const GLOBE_CONFIG = {
  width: 900,
  height: 900,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 1.1,
  mapSamples: 16000,
  mapBrightness: 2.0,
  baseColor: [0.94, 0.96, 0.98],
  markerColor: [37 / 255, 99 / 255, 235 / 255], // Electric blue #2563eb
  glowColor: [0.88, 0.92, 0.98],
  markers: PARTNERS.map((p) => ({
    location: [p.lat, p.lng],
    size: p.size,
  })),
};

function GlobeCanvas() {
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
        state.phi += 0.003;
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
      ...GLOBE_CONFIG,
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
  }, [onRender]);

  return (
    <div className="gn-globe-stage">
      <canvas
        ref={canvasRef}
        className="gn-globe-canvas"
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

export default function GlobalNetwork({ onOpenContact }) {
  return (
    <section className="gn-section" id="network">
      <div className="gn-container">
        {/* ── Section Header ── */}
        <div className="gn-header">
          <h2 className="gn-title">Global Network</h2>
          <p className="gn-subtitle">
            Connect with teams and clients worldwide. Seamless client partnerships across Sri Lanka, France, and Japan.
          </p>
        </div>

        {/* ── Seamless 3D Globe Visual ── */}
        <div className="gn-globe-container">
          <GlobeCanvas />

          {/* 3 Country Badges */}
          <div className="gn-country-pills-row">
            {PARTNERS.map((p) => (
              <div
                key={p.id}
                className={`gn-country-card ${p.isHQ ? 'card-hq' : ''}`}
                onClick={() => onOpenContact && onOpenContact()}
              >
                <div className="gn-country-header">
                  <span className="gn-country-dot" />
                  <span className="gn-country-name">{p.name}</span>
                  {p.isHQ && <span className="gn-country-tag">HQ</span>}
                </div>
                <span className="gn-country-desc">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
