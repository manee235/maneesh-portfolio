"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";

const DEFAULT_MARKERS = [
  {
    id: "nagomi-japan",
    name: "Nagomi Lanka Tours",
    city: "Kamiyamakawa, Yuki-shi, Ibaraki, Japan",
    location: [36.2917, 139.8789],
    visitors: 1450,
    trend: 22,
    isPartner: true,
  },
  {
    id: "hq-srilanka",
    name: "Maneesh Amindu HQ",
    city: "Kurunegala / Colombo, Sri Lanka",
    location: [7.8731, 80.7718],
    visitors: 3200,
    trend: 28,
    isPartner: true,
  },
  {
    id: "partner-usa",
    name: "North America Partners",
    city: "San Francisco / New York, USA",
    location: [37.7749, -122.4194],
    visitors: 980,
    trend: 15,
  },
  {
    id: "partner-uk",
    name: "Europe Creative Network",
    city: "London, UK",
    location: [51.5074, -0.1278],
    visitors: 850,
    trend: 12,
  },
  {
    id: "partner-aus",
    name: "Oceania Clients",
    city: "Sydney, Australia",
    location: [-33.8688, 151.2093],
    visitors: 620,
    trend: 9,
  },
];

export function GlobeAnalytics({
  markers: initialMarkers = DEFAULT_MARKERS,
  className = "",
  speed = 0.0035,
  onSelectMarker,
}) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [data, setData] = useState(initialMarkers);
  const [activeMarker, setActiveMarker] = useState(initialMarkers[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((m) => ({
          ...m,
          visitors: m.visitors + Math.floor(Math.random() * 9) - 3,
          trend: Math.max(-20, Math.min(25, m.trend + Math.floor(Math.random() * 3) - 1)),
        }))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe = null;
    let animationId;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.25,
        dark: 0, // Clean light mode globe
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 8,
        baseColor: [0.95, 0.96, 0.98],
        markerColor: [0.01, 0.52, 0.78], // Cyan/Blue
        glowColor: [0.9, 0.93, 0.98],
        markerElevation: 0.05,
        markers: initialMarkers.map((m) => ({
          location: m.location,
          size: m.isPartner ? 0.07 : 0.045,
          id: m.id,
        })),
        arcs: [
          { from: [7.8731, 80.7718], to: [36.2917, 139.8789] }, // Sri Lanka -> Yuki-shi, Ibaraki (Nagomi Lanka)
          { from: [7.8731, 80.7718], to: [51.5074, -0.1278] },
          { from: [7.8731, 80.7718], to: [37.7749, -122.4194] },
          { from: [7.8731, 80.7718], to: [-33.8688, 151.2093] },
        ],
        arcColor: [0.02, 0.55, 0.85],
        arcWidth: 0.6,
        arcHeight: 0.3,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.25 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }

      animate();
      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      }, 100);
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [initialMarkers, speed]);

  const handleSelectPartner = (marker) => {
    setActiveMarker(marker);
    if (onSelectMarker) onSelectMarker(marker);
  };

  return (
    <div className={`cobe-globe-container ${className}`} style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: "420px", aspectRatio: "1/1", margin: "0 auto" }}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          style={{
            width: "100%",
            height: "100%",
            cursor: "grab",
            opacity: 0,
            transition: "opacity 1.2s ease",
            borderRadius: "50%",
            touchAction: "none",
            filter: "drop-shadow(0 10px 30px rgba(2, 132, 199, 0.15))",
          }}
        />

        {activeMarker && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.92)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(12px)",
              borderRadius: "14px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#0284c7",
                boxShadow: "0 0 8px #0284c7",
                display: "inline-block",
              }}
            />
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>
                {activeMarker.name}
              </div>
              <div style={{ fontSize: "0.68rem", color: "#64748b" }}>
                {activeMarker.city} • Active Partner
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          marginTop: "16px",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        {data.map((m) => {
          const isSelected = activeMarker?.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectPartner(m)}
              style={{
                background: isSelected ? "#0284c7" : "rgba(0, 0, 0, 0.04)",
                border: isSelected ? "1px solid #0284c7" : "1px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "9999px",
                padding: "6px 14px",
                color: isSelected ? "#ffffff" : "#334155",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: isSelected ? "#ffffff" : m.isPartner ? "#0284c7" : "#8b5cf6",
                }}
              />
              <span>{m.name}</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: isSelected ? "#e0f2fe" : m.trend >= 0 ? "#16a34a" : "#dc2626",
                }}
              >
                {m.trend >= 0 ? "↑" : "↓"}{Math.abs(m.trend)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GlobeAnalytics;
