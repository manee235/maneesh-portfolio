import React, { useEffect, useRef, useState } from 'react';
import { ProjectCards } from './components/ui/animated-project-cards';
import { Code2, Smartphone, Terminal, Palette, PenTool, Music } from 'lucide-react';
import './HeroStatement.css';

const DYNAMIC_WORDS = [
  {
    word: 'smarter',
    letters: [
      { char: 's', color: '#09090b' },
      { char: 'm', color: '#2563eb' },
      { char: 'a', color: '#6366f1' },
      { char: 'r', color: '#ec4899' },
      { char: 't', color: '#f97316' },
      { char: 'e', color: '#ef4444' },
      { char: 'r', color: '#f59e0b' },
    ],
  },
  {
    word: 'faster',
    letters: [
      { char: 'f', color: '#2563eb' },
      { char: 'a', color: '#3b82f6' },
      { char: 's', color: '#06b6d4' },
      { char: 't', color: '#10b981' },
      { char: 'e', color: '#f59e0b' },
      { char: 'r', color: '#f97316' },
    ],
  },
  {
    word: 'bolder',
    letters: [
      { char: 'b', color: '#8b5cf6' },
      { char: 'o', color: '#ec4899' },
      { char: 'l', color: '#f43f5e' },
      { char: 'd', color: '#f97316' },
      { char: 'e', color: '#eab308' },
      { char: 'r', color: '#2563eb' },
    ],
  },
  {
    word: 'cleaner',
    letters: [
      { char: 'c', color: '#10b981' },
      { char: 'l', color: '#06b6d4' },
      { char: 'e', color: '#3b82f6' },
      { char: 'a', color: '#6366f1' },
      { char: 'n', color: '#8b5cf6' },
      { char: 'e', color: '#ec4899' },
      { char: 'r', color: '#f43f5e' },
    ],
  },
];

const SERVICES_DATA = [
  {
    id: 'web-dev',
    title: 'Web Development & Modern Frontends',
    pricePerHour: 'Available for Hire / Contract',
    status: 'Active',
    categories: ['React / Next.js', 'Tailwind CSS', 'Headless CMS', 'Full-Stack'],
    description:
      'Fast, accessible, and SEO-optimized web apps with high-fidelity animations and modern APIs.',
    location: 'Remote / Global',
    timeAgo: 'Updated Recently',
    logoColor: 'bg-blue-600',
    logoIcon: <Code2 className="w-6 h-6 text-white" />,
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development (iOS & Android)',
    pricePerHour: 'Sprint / Full App Build',
    status: 'Active',
    categories: ['Flutter', 'Android Native', 'Dart', 'Cross-Platform', 'Firebase & Supabase'],
    description:
      'Smooth cross-platform Flutter and Android mobile apps with native performance & offline caching.',
    location: 'Global / Remote',
    timeAgo: 'Available Now',
    logoColor: 'bg-cyan-600',
    logoIcon: <Smartphone className="w-6 h-6 text-white" />,
  },
  {
    id: 'software-dev',
    title: 'Software Development & Architecture',
    pricePerHour: 'Custom Scope / Fixed Price',
    status: 'Available',
    categories: ['Node.js', 'Python', 'Cloud APIs', 'Database Design', 'Supabase'],
    description:
      'Scalable backend systems, cloud APIs, database architectures, and automated CLI tools.',
    location: 'Worldwide',
    timeAgo: 'Active',
    logoColor: 'bg-emerald-600',
    logoIcon: <Terminal className="w-6 h-6 text-white" />,
  },
  {
    id: 'product-ui-ux',
    title: 'Product & UI/UX Design Systems',
    pricePerHour: 'Design Sprint / Project',
    status: 'Active',
    categories: ['Figma', 'Design Systems', 'Interactive Prototyping', 'User Research'],
    description:
      'Intuitive user journeys, design systems, and high-fidelity interactive Figma prototypes.',
    location: 'Global',
    timeAgo: 'Open for Bookings',
    logoColor: 'bg-purple-600',
    logoIcon: <Palette className="w-6 h-6 text-white" />,
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Brand Identity',
    pricePerHour: 'Per Asset / Campaign',
    status: 'Active',
    categories: ['Photoshop', 'Illustrator', 'Brand Identity', 'Marketing Graphics', 'Vector Art'],
    description:
      'Distinctive visual identities, marketing suites, album artwork, and vector illustrations.',
    location: 'Global / Remote',
    timeAgo: 'Available',
    logoColor: 'bg-pink-600',
    logoIcon: <PenTool className="w-6 h-6 text-white" />,
  },
  {
    id: 'music-production',
    title: 'Music Production & Audio Engineering',
    pricePerHour: 'Per Track / Licensing',
    status: 'Available',
    categories: ['Audio Scoring', 'Sound Design', 'Mixing & Mastering', 'Media Audio'],
    description:
      'Original soundtracks, sound design, mixing, and audio engineering for digital media.',
    location: 'Studio / Remote',
    timeAgo: 'Available',
    logoColor: 'bg-amber-600',
    logoIcon: <Music className="w-6 h-6 text-white" />,
  },
];

export default function HeroStatement() {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in');
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Intersection observer for section entrance blur-fade
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Word rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
        setFadeState('in');
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const currentObj = DYNAMIC_WORDS[index];

  return (
    <section ref={sectionRef} className="hs-section" id="services">
      <div className={`hs-container ${inView ? 'hs-in-view' : ''}`}>
        {/* Section Badge (Signature Royal Blue Capsule) */}
        <div className="hs-badge">
          <span className="hs-badge-dot" />
          <span>03 / SERVICES &amp; CAPABILITIES</span>
        </div>

        {/* Dynamic Main Headline */}
        <h2 className="hs-headline" data-parallax="0.05">
          <span className="hs-prefix">We build </span>
          <span className={`hs-animated-word ${fadeState}`}>
            {currentObj.letters.map((l, i) => (
              <span
                key={`${currentObj.word}-${i}`}
                className="hs-letter"
                style={{
                  color: l.color,
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {l.char}
              </span>
            ))}
          </span>
          <span className="hs-suffix"> products</span>
        </h2>

        <p className="hs-subheadline" data-parallax="0.02">
          Explore specialized services spanning engineering, design, and audio production. Click any service to reveal full scope and technology details.
        </p>

        {/* ── Interactive Expandable Service Cards ── */}
        <div className="hs-cards-wrapper" data-parallax="-0.03">
          <ProjectCards projects={SERVICES_DATA} />
        </div>
      </div>
    </section>
  );
}
