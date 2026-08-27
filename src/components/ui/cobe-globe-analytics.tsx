"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";

export interface AnalyticsMarker {
  id: string;
  name?: string;
  city?: string;
  location: [number, number];
  visitors: number;
  trend: number;
  isPartner?: boolean;
}

export interface GlobeAnalyticsProps {
  markers?: AnalyticsMarker[];
  className?: string;
  speed?: number;
  onSelectMarker?: (marker: AnalyticsMarker) => void;
}

const defaultMarkers: AnalyticsMarker[] = [
  {
    id: "nagomi-japan",
    name: "Nagomi Lanka Tours",
    city: "Tokyo / Japan",
    location: [35.68, 139.65],
    visitors: 1240,
    trend: 18,
    isPartner: true,
  },
  {
    id: "hq-srilanka",
    name: "Maneesh Amindu HQ",
    city: "Colombo / Sri Lanka",
    location: [7.87, 80.77],
    visitors: 2890,
    trend: 24,
    isPartner: true,
  },
  {
    id: "partner-usa",
    name: "North America Partners",
    city: "New York / USA",
    location: [40.71, -74.01],
    visitors: 847,
    trend: 12,
  },
  {
    id: "partner-uk",
    name: "Europe Creative Studio",
    city: "London / UK",
    location: [51.51, -0.13],
    visitors: 623,
    trend: 8,
  },
  {
    id: "partner-aus",
    name: "Oceania Clients",
    city: "Sydney / Australia",
    location: [-33.87, 151.21],
    visitors: 412,
    trend: 15,
  },
];

export function GlobeAnalytics({
  markers: initialMarkers = defaultMarkers,
  className = "",
  speed = 0.004,
  onSelectMarker,
}: GlobeAnalyticsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [data, setData] = useState(initialMarkers);
  const [activeMarker, setActiveMarker] = useState<AnalyticsMarker | null>(
    initialMarkers[0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((m) => ({
          ...m,
          visitors: m.visitors + Math.floor(Math.random() * 9) - 3,
          trend: Math.max(
            -20,
            Math.min(25, m.trend + Math.floor(Math.random() * 3) - 1)
          ),
        }))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
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
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
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
        dark: 1,
        diffuse: 1.6,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.15, 0.18, 0.28],
        markerColor: [0.22, 0.85, 0.98],
        glowColor: [0.38, 0.45, 0.95],
        markerElevation: 0.05,
        markers: initialMarkers.map((m) => ({
          location: m.location,
          size: m.isPartner ? 0.07 : 0.045,
          id: m.id,
        })),
        arcs: [
          { from: [7.87, 80.77], to: [35.68, 139.65] },
          { from: [7.87, 80.77], to: [51.51, -0.13] },
          { from: [7.87, 80.77], to: [40.71, -74.01] },
          { from: [7.87, 80.77], to: [-33.87, 151.21] },
        ],
        arcColor: [0.3, 0.8, 1.0],
        arcWidth: 0.6,
        arcHeight: 0.3,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe!.update({
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

  const handleSelectPartner = (marker: AnalyticsMarker) => {
    setActiveMarker(marker);
    if (onSelectMarker) onSelectMarker(marker);
  };

  return (
    <div
      className={`cobe-globe-container ${className}`}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          aspectRatio: "1/1",
          margin: "0 auto",
        }}
      >
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
            filter: "drop-shadow(0 0 35px rgba(56, 189, 248, 0.25))",
          }}
        />

        {activeMarker && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(10, 15, 30, 0.85)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.6), 0 0 15px rgba(56,189,248,0.2)",
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
                background: "#38bdf8",
                boxShadow: "0 0 8px #38bdf8",
                display: "inline-block",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {activeMarker.name}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {activeMarker.city} • Active Engagement
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
          maxWidth: "500px",
        }}
      >
        {data.map((m) => {
          const isSelected = activeMarker?.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectPartner(m)}
              style={{
                background: isSelected
                  ? "rgba(56, 189, 248, 0.18)"
                  : "rgba(255,255,255,0.04)",
                border: isSelected
                  ? "1px solid #38bdf8"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "9999px",
                padding: "6px 14px",
                color: isSelected ? "#ffffff" : "rgba(255,255,255,0.7)",
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
                  background: m.isPartner ? "#38bdf8" : "#a855f7",
                }}
              />
              <span>{m.name}</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: m.trend >= 0 ? "#34d399" : "#f87171",
                }}
              >
                {m.trend >= 0 ? "↑" : "↓"}
                {Math.abs(m.trend)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GlobeAnalytics;
