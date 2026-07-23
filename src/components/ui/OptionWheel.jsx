import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import './OptionWheel.css';

const DEFAULT_ITEMS = ['Ambient', 'House', 'Techno', 'Jazz', 'Lo-Fi', 'Synthwave'];

const OptionWheel = ({
  items = DEFAULT_ITEMS,
  defaultSelected = 0,
  onChange,
  textColor = '#a6a6a6',
  activeColor = '#ffffff',
  side = 'left',
  fontSize = 3,
  spacing = 1.4,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.25,
  minOpacity = 0.05,
  smoothing = 200,
  inset = 80,
  loop = false,
  draggable = true,
  soundUrl = '',
  soundVolume = 0.5,
  className = '',
}) => {
  const rootRef     = useRef(null);
  const itemRefs    = useRef([]);
  const posRef      = useRef(defaultSelected);
  const targetRef   = useRef(defaultSelected);
  const rafRef      = useRef(null);
  const lastRef     = useRef(0);
  const cfgRef      = useRef({});
  const onChangeRef = useRef(onChange);
  const selectedRef = useRef(defaultSelected);
  const timerRef    = useRef(null);
  const dragRef     = useRef(null);
  const dragMoved   = useRef(false);
  const audioRef    = useRef(null);
  const audioUrlRef = useRef('');
  const lastTickRef = useRef(0);

  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging]       = useState(false);

  onChangeRef.current = onChange;

  const remPx =
    typeof window !== 'undefined'
      ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      : 16;

  cfgRef.current = {
    count   : items.length,
    items,
    rowH    : Math.max(fontSize * spacing * remPx, 1),
    curve, tilt, blur, fade, minOpacity,
    side, loop, smoothing, draggable, soundUrl, soundVolume,
  };

  /* ── imperative layout ───────────────────────────────────────── */
  const layout = useCallback(() => {
    const cfg  = cfgRef.current;
    const els  = itemRefs.current;
    const n    = cfg.count;
    if (!n) return;

    const pos    = posRef.current;
    const mirror = cfg.side === 'right' ? -1 : 1;
    const tRad   = (cfg.tilt * Math.PI) / 180;
    const R      = tRad > 0.0005 ? cfg.rowH / tRad : 0;

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const dist = Math.abs(d);
      let x = 0, y = d * cfg.rowH, rot = 0;

      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tRad));
        y   = R * Math.sin(ang);
        x   = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
        rot = (mirror * ang * 180) / Math.PI;
      }

      // ⚠️  calc() inside translate() is silently rejected in JS style strings.
      //    Use separate translate + translateY(-50%) instead.
      el.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) translateY(-50%) rotate(${rot.toFixed(3)}deg)`;
      el.style.opacity   = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
      el.style.filter    = cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : 'none';
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
    }
  }, []);

  /* ── rAF animation loop ─────────────────────────────────────── */
  const runFrame = useCallback(now => {
    const dt  = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const cfg = cfgRef.current;
    const tau = Math.max(cfg.smoothing, 1) / 1000;
    const k   = 1 - Math.exp(-dt / tau);

    const target  = targetRef.current;
    const cur     = posRef.current;
    let   next    = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.001;
    if (settled) next = target;
    posRef.current = next;

    layout();

    rafRef.current = settled ? null : requestAnimationFrame(runFrame);
  }, [layout]);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current  = requestAnimationFrame(runFrame);
  }, [runFrame]);

  /* ── sound tick ─────────────────────────────────────────────── */
  const playTick = useCallback(() => {
    const { soundUrl, soundVolume } = cfgRef.current;
    if (!soundUrl) return;
    const now = performance.now();
    if (now - lastTickRef.current < 70) return;
    lastTickRef.current = now;
    if (!audioRef.current || audioUrlRef.current !== soundUrl) {
      audioRef.current    = new Audio(soundUrl);
      audioRef.current.preload = 'auto';
      audioUrlRef.current = soundUrl;
    }
    const a  = audioRef.current;
    a.volume = Math.min(Math.max(soundVolume, 0), 1);
    a.currentTime = 0;
    a.play()?.catch(() => {});
  }, []);

  /* ── core target setter ─────────────────────────────────────── */
  const applyTarget = useCallback((value, snap) => {
    const cfg = cfgRef.current;
    let v = value;
    if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
    if (snap) v = Math.round(v);
    targetRef.current = v;
    const idx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count;
    if (idx !== selectedRef.current) {
      selectedRef.current = idx;
      setSelectedIndex(idx);
      onChangeRef.current?.(idx, cfg.items[idx]);
      playTick();
    }
    startLoop();
  }, [startLoop, playTick]);

  /* ── initial synchronous layout (before first paint) ────────── */
  useLayoutEffect(() => {
    posRef.current    = defaultSelected + 0.0001;
    targetRef.current = defaultSelected;
    layout();
    startLoop();
  }, []); // eslint-disable-line

  /* ── re-layout on prop changes ───────────────────────────────── */
  useEffect(() => {
    posRef.current = targetRef.current + 0.0001;
    layout();
    startLoop();
  }, [items, fontSize, spacing, curve, tilt, blur, fade, minOpacity,
      side, loop, smoothing, layout, startLoop]);

  /* ── wheel / touchpad ────────────────────────────────────────── */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = e => {
      e.preventDefault();   // stop the *page* from scrolling
      e.stopPropagation();
      const cfg   = cfgRef.current;
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      // Cap at ±1 so a mechanical wheel click = one option
      const step  = Math.max(-1, Math.min(1, delta / cfg.rowH));
      applyTarget(targetRef.current + step, false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => applyTarget(targetRef.current, true), 140);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [applyTarget]);

  /* ── pointer drag ────────────────────────────────────────────── */
  const onPointerDown = useCallback(e => {
    if (!cfgRef.current.draggable) return;
    dragRef.current = { y: e.clientY, start: targetRef.current, id: e.pointerId };
    dragMoved.current = false;
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback(e => {
    const drag = dragRef.current;
    if (!drag) return;
    const dy = e.clientY - drag.y;
    if (!dragMoved.current && Math.abs(dy) > 4) {
      dragMoved.current = true;
      try { rootRef.current?.setPointerCapture(drag.id); } catch (_) {}
    }
    if (dragMoved.current) applyTarget(drag.start - dy / cfgRef.current.rowH, false);
  }, [applyTarget]);

  const onPointerEnd = useCallback(() => {
    if (!dragRef.current) return;
    try { rootRef.current?.releasePointerCapture(dragRef.current.id); } catch (_) {}
    const moved = dragMoved.current;
    dragRef.current = null;
    setIsDragging(false);
    if (moved) applyTarget(targetRef.current, true);
    requestAnimationFrame(() => { dragMoved.current = false; });
  }, [applyTarget]);

  /* ── click to select ─────────────────────────────────────────── */
  const onItemClick = useCallback(index => {
    if (dragMoved.current) return;
    const cfg = cfgRef.current;
    const cur = targetRef.current;
    let d = index - (((cur % cfg.count) + cfg.count) % cfg.count);
    if (cfg.loop && cfg.count > 1) {
      if (d >  cfg.count / 2) d -= cfg.count;
      if (d < -cfg.count / 2) d += cfg.count;
    }
    applyTarget(cur + d, true);
  }, [applyTarget]);

  /* ── keyboard ────────────────────────────────────────────────── */
  const onKeyDown = useCallback(e => {
    let delta = null;
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  delta = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta =  1;
    if (delta == null) return;
    e.preventDefault();
    applyTarget(Math.round(targetRef.current) + delta, true);
  }, [applyTarget]);

  /* ── cleanup ─────────────────────────────────────────────────── */
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    audioRef.current?.pause();
  }, []);

  /* ── render ──────────────────────────────────────────────────── */
  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Option wheel"
      className={[
        'option-wheel',
        side === 'right' && 'option-wheel--right',
        isDragging       && 'option-wheel--dragging',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        '--ow-text-color'  : textColor,
        '--ow-active-color': activeColor,
        '--ow-font-size'   : `${fontSize}rem`,
        '--ow-inset'       : `${inset}px`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          ref={el => { itemRefs.current[index] = el; }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`option-wheel__item${selectedIndex === index ? ' option-wheel__item--selected' : ''}`}
          onClick={() => onItemClick(index)}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default OptionWheel;
