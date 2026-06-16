import React, { useEffect, useRef } from 'react';

const HeroLiquidReveal = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check user preference for motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sourcing details
    const beforeSrc = "/assets/avatar.png"; // Base image shown underneath
    const afterSrc = "/assets/avatar2.png"; // Image revealed on cursor brush stroke

    const beforeImg = new Image();
    beforeImg.src = beforeSrc;
    const afterImg = new Image();
    afterImg.src = afterSrc;

    let imagesLoaded = 0;
    const onImageLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        initEffect();
      }
    };
    beforeImg.onload = onImageLoad;
    afterImg.onload = onImageLoad;

    let initEffect = () => {};

    // Sizing
    let width = 0;
    let height = 0;
    let dpr = 1;
    let brushRadius = 143;
    let decay = 0.016;

    // Offscreen canvases
    const coverCanvas = document.createElement('canvas');
    const coverCtx = coverCanvas.getContext('2d');

    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d');

    // Pointer state
    let points = [];
    let lastPoint = null;
    let drawing = false;
    let idle = 0;

    initEffect = () => {
      const resize = () => {
        const rect = container.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Resize offscreen cover
        coverCanvas.width = canvas.width;
        coverCanvas.height = canvas.height;

        // Draw cover (afterImg) centered object-fit: cover
        if (coverCtx) {
          drawCover(coverCtx, afterImg, coverCanvas.width, coverCanvas.height);
        }

        // Setup brush offscreen canvas
        const radius = brushRadius * dpr;
        const size = Math.ceil(radius * 2);
        brushCanvas.width = size;
        brushCanvas.height = size;
      };

      const drawCover = (cCtx, img, targetW, targetH) => {
        const imgW = img.naturalWidth || img.width;
        const imgH = img.naturalHeight || img.height;
        const imgRatio = imgW / imgH;
        const targetRatio = targetW / targetH;

        let sx, sy, sW, sH;
        if (targetRatio > imgRatio) {
          sW = imgW;
          sH = imgW / targetRatio;
          sx = 0;
          sy = (imgH - sH) * 0.25; // matches object-position: center 25%
        } else {
          sH = imgH;
          sW = imgH * targetRatio;
          sx = (imgW - sW) / 2;    // horizontally centered
          sy = 0;
        }
        cCtx.clearRect(0, 0, targetW, targetH);
        cCtx.drawImage(img, sx, sy, sW, sH, 0, 0, targetW, targetH);
      };

      const stamp = (x, y) => {
        const radius = brushRadius * dpr;
        const size = Math.ceil(radius * 2);
        if (!brushCtx || !ctx) return;

        // Clear brush
        brushCtx.clearRect(0, 0, size, size);

        // 1. Draw radial gradient mask
        brushCtx.globalCompositeOperation = 'source-over';
        const grad = brushCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.82)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        brushCtx.fillStyle = grad;
        brushCtx.beginPath();
        brushCtx.arc(radius, radius, radius, 0, Math.PI * 2);
        brushCtx.fill();

        // 2. Composite offscreen cover under the mask
        brushCtx.globalCompositeOperation = 'source-in';
        // Grab matching region of cover canvas
        const srcX = x - radius;
        const srcY = y - radius;
        brushCtx.drawImage(
          coverCanvas,
          srcX, srcY, size, size, // Source rect
          0, 0, size, size       // Dest rect
        );

        // 3. Draw brush onto main canvas
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(brushCanvas, x - radius, y - radius);
      };

      const handlePointerMove = (e) => {
        drawing = true;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        const x = clientX * dpr;
        const y = clientY * dpr;
        const radius = brushRadius * dpr;

        // Reset if we move too far outside the canvas bounds
        if (x < -radius || x > canvas.width + radius || y < -radius || y > canvas.height + radius) {
          lastPoint = null;
          return;
        }

        if (!lastPoint) {
          lastPoint = { x, y };
          points.push({ x, y });
          return;
        }

        const dist = Math.hypot(x - lastPoint.x, y - lastPoint.y);
        const step = Math.max(radius * 0.3, 1);
        const steps = Math.min(Math.ceil(dist / step), 60);

        for (let i = 1; i <= steps; i++) {
          const ratio = i / steps;
          points.push({
            x: lastPoint.x + (x - lastPoint.x) * ratio,
            y: lastPoint.y + (y - lastPoint.y) * ratio
          });
        }

        lastPoint = { x, y };
      };

      const handlePointerLeave = () => {
        lastPoint = null;
      };

      // Set up listeners
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
      window.addEventListener('resize', resize);

      resize();

      // Tick animation
      let animFrame;
      const tick = () => {
        animFrame = requestAnimationFrame(tick);

        if (points.length > 0) {
          idle = 0;
        } else {
          idle++;
          drawing = false;
          if (idle > 120) {
            // Hard clear residue to free canvas state
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
          }
        }

        // Apply decay to fade out old parts
        ctx.globalCompositeOperation = 'destination-out';
        const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
        ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render trails
        if (points.length > 0) {
          points.forEach((pt) => {
            stamp(pt.x, pt.y);
          });
          points = [];
        }
      };

      animFrame = requestAnimationFrame(tick);

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animFrame);
      };
    };

    // Trigger grid initialization
    let cleanup = () => {};
    if (beforeImg.complete && afterImg.complete) {
      cleanup = initEffect();
    } else {
      const runInit = () => {
        if (beforeImg.complete && afterImg.complete) {
          cleanup = initEffect();
        }
      };
      beforeImg.addEventListener('load', runInit);
      afterImg.addEventListener('load', runInit);
    }

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-liquid-reveal-container">
      {/* Base "after.jpg" image is shown underneath */}
      <img
        src="/assets/avatar.png"
        alt="Maneesh Amindu — Creative Developer & Designer"
        className="hero-base-image"
      />
      {/* Top canvas draws the "before.jpg" image along cursor path */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
    </div>
  );
};

export default HeroLiquidReveal;
