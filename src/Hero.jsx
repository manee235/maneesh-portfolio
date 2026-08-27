import React, { useEffect, useRef, useState } from 'react';

const LEFT_WORDS = ['spark', 'imagine', 'evolve', 'render'];
const RIGHT_WORDS = ['blaze', 'genesis', 'purpose', 'ignite'];

export default function Hero() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const handleScrollAndResize = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollRange = sectionHeight - window.innerHeight;
      const rawProgress = -rect.top / (scrollRange > 0 ? scrollRange : 1);
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clampedProgress);
      setScaleFactor(window.innerWidth < 768 ? 0.5 : 1);
    };

    handleScrollAndResize();
    window.addEventListener('scroll', handleScrollAndResize, { passive: true });
    window.addEventListener('resize', handleScrollAndResize);

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, []);

  const isMobile = scaleFactor < 1;
  const wordOpacity = 0.35 + progress * 0.65;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '120vh',
        backgroundColor: '#EC612C',
      }}
    >
      {/* ── Layer B: Sticky text overlay (z-index 5) ── */}
      <div
        className="sticky top-0 h-screen w-full"
        style={{ zIndex: 5 }}
      >
        {/* “BEYOND” stacked title */}
        <div className="absolute inset-0 flex items-start justify-center pt-[2vh] md:pt-[3vh]">
          <div
            className="relative select-none text-center font-bamboly leading-[0.85] tracking-tight"
            style={{
              fontSize: 'clamp(7.5rem, 30vw, 28rem)',
            }}
          >
            {/* Layer 0 (back): #89CFF0 */}
            <h1
              className="absolute inset-0"
              style={{
                color: '#89CFF0',
                transform: `translateY(${isMobile ? '18px' : '36px'})`,
                zIndex: 1,
              }}
            >
              BEYOND
            </h1>

            {/* Layer 1: #EC612C */}
            <h1
              className="absolute inset-0"
              style={{
                color: '#EC612C',
                transform: `translateY(${isMobile ? '12px' : '24px'})`,
                zIndex: 2,
              }}
            >
              BEYOND
            </h1>

            {/* Layer 2: #90EE90 */}
            <h1
              className="absolute inset-0"
              style={{
                color: '#90EE90',
                transform: `translateY(${isMobile ? '6px' : '12px'})`,
                zIndex: 3,
              }}
            >
              BEYOND
            </h1>

            {/* Layer 3 (front): #FFFFFF */}
            <h1
              className="relative"
              style={{
                color: '#FFFFFF',
                transform: 'translateY(0px)',
                zIndex: 4,
              }}
            >
              BEYOND
            </h1>
          </div>
        </div>

        {/* Side word columns */}
        <div
          className="absolute inset-0 flex items-end justify-between px-[3vw] md:px-[6vw] pointer-events-none"
          style={{ bottom: '-8vh' }}
        >
          {/* Left Column */}
          <div className="flex flex-col gap-1 md:gap-2">
            {LEFT_WORDS.map((word, i) => {
              const offset = -(60 + i * 40) * scaleFactor * (1 - progress);
              return (
                <span
                  key={word}
                  className="font-poppins uppercase select-none text-white/80"
                  style={{
                    fontWeight: 500,
                    fontSize: 'clamp(1.6rem, 7vw, 9rem)',
                    lineHeight: 1.1,
                    opacity: wordOpacity,
                    transform: `translateX(${offset}px)`,
                    transition: 'transform 0.05s linear',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-1 md:gap-2 items-end">
            {RIGHT_WORDS.map((word, i) => {
              const offset = +(60 + i * 40) * scaleFactor * (1 - progress);
              return (
                <span
                  key={word}
                  className="font-poppins uppercase select-none text-white/80 text-right"
                  style={{
                    fontWeight: 500,
                    fontSize: 'clamp(1.6rem, 7vw, 9rem)',
                    lineHeight: 1.1,
                    opacity: wordOpacity,
                    transform: `translateX(${offset}px)`,
                    transition: 'transform 0.05s linear',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Layer A: Character (z-index 10) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260801_104316_80b428ea-dc99-4399-afb3-8ccb7b34b2d0.png&w=1280&q=85"
          alt="Beyond Character 3D"
          onError={(e) => {
            e.currentTarget.src =
              'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_104316_80b428ea-dc99-4399-afb3-8ccb7b34b2d0.png';
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto max-w-none block"
          style={{
            height: '115%',
            maxHeight: '115%',
            minHeight: '80%',
          }}
        />
      </div>
    </section>
  );
}
