import React, { useRef, useState, useEffect } from 'react';

const BAR_COUNT = 20;

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const animFrameRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioCtxRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [bars, setBars] = useState(Array(BAR_COUNT).fill(4));
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ── Idle sine-wave animation when paused ───────────────────────────────────
  useEffect(() => {
    let frame;
    let t = 0;
    if (!isPlaying) {
      const animate = () => {
        t += 0.05;
        const idle = Array.from({ length: BAR_COUNT }, (_, i) => {
          const v = Math.sin(t + i * 0.45) * 7 + Math.sin(t * 1.6 + i * 0.7) * 3 + 9;
          return Math.max(3, v);
        });
        setBars(idle);
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

  // ── Web Audio setup ────────────────────────────────────────────────────────
  const setupAudio = () => {
    if (audioCtxRef.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    const src_ = ctx.createMediaElementSource(audioRef.current);
    src_.connect(analyser);
    analyser.connect(ctx.destination);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
  };

  const drawBars = () => {
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const raw = Array.from(dataArrayRef.current);
    const step = Math.floor(raw.length / BAR_COUNT);
    setBars(
      Array.from({ length: BAR_COUNT }, (_, i) =>
        Math.max(3, (raw[i * step] / 255) * 40 + 4)
      )
    );
    animFrameRef.current = requestAnimationFrame(drawBars);
  };

  // ── Toggle play ────────────────────────────────────────────────────────────
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioCtxRef.current) setupAudio();
    if (audioCtxRef.current?.state === 'suspended') await audioCtxRef.current.resume();

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animFrameRef.current);
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        drawBars();
      } catch (e) { console.warn(e); }
    }
  };

  // ── Toggle mute ────────────────────────────────────────────────────────────
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ── Audio events ───────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnd  = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animFrameRef.current);
      setProgress(0); setCurrentTime(0);
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  return (
    <div className={`mp-pill${isPlaying ? ' mp-pill--playing' : ''}`}>
      <audio ref={audioRef} src={src} preload="metadata" loop />

      {/* Ambient glow blobs */}
      <div className="mp-pill-glow mp-pill-glow--a" />
      <div className="mp-pill-glow mp-pill-glow--b" />

      {/* ── Left: album art / icon ── */}
      <div className="mp-pill-art">
        <div className={`mp-pill-disc${isPlaying ? ' mp-pill-disc--spin' : ''}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
          </svg>
        </div>
      </div>

      {/* ── Center: track info + wave + seek ── */}
      <div className="mp-pill-center">
        <div className="mp-pill-meta">
          <span className="mp-pill-title">ICE · Slowed</span>
          <span className="mp-pill-dot-sep">·</span>
          <span className="mp-pill-artist">onlymaneesh</span>
        </div>

        {/* Wave visualiser */}
        <div className="mp-pill-wave">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`mp-pill-bar${isPlaying ? ' mp-pill-bar--lit' : ''}`}
              style={{ height: `${h}px`, animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>

        {/* Seek bar */}
        <div className="mp-pill-seek" onClick={handleSeek}>
          <div className="mp-pill-seek-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="mp-pill-times">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* ── Right: controls ── */}
      <div className="mp-pill-controls">
        {/* Mute */}
        <button
          className={`mp-pill-btn mp-pill-btn--sm${isMuted ? ' mp-pill-btn--muted' : ''}`}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>

        {/* Play / Pause */}
        <button
          className="mp-pill-btn mp-pill-btn--play"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
