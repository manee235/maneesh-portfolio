import React, { useEffect, useState } from 'react';
import Particles from './Particles';
import { Globe } from './components/ui/globe';
import TestimonialForm from './TestimonialForm';
import { MessageSquarePlus } from 'lucide-react';
import './Testimonials.css';

const CLIENT_STORIES = [
  {
    id: 1,
    country: "JAPAN",
    city: "Kamiyamakawa, Yuki-shi, Ibaraki",
    flag: "🇯🇵",
    partnerName: "Nagomi Lanka Tours",
    author: "Partner & Founder",
    company: "Nagomi Lanka Tours",
    quote: "Maneesh built our entire tour booking portal and Sanity CMS architecture seamlessly. Launching our Japan-to-Sri Lanka travel platform was a huge success.",
    avatar: "/assets/projects/nagomi.png",
  },
  {
    id: 2,
    country: "SRI LANKA",
    city: "Kurunegala",
    flag: "🇱🇰",
    partnerName: "Dreamscape Designs",
    author: "Isanka Tharindu",
    company: "Owner at Dreamscape Designs",
    quote: "Creative, reliable, and detail-oriented. Delivered a beautiful architectural web application with fluid animations that exceeded all expectations.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    country: "UNITED STATES",
    city: "San Francisco, CA",
    flag: "🇺🇸",
    partnerName: "Figma Community",
    author: "Sarah Chen",
    company: "Lead Designer",
    quote: "This changed everything for our product workflow. Delivered ahead of schedule with a level of polish and aesthetic refinement that set a new benchmark.",
    avatar: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 4,
    country: "UNITED KINGDOM",
    city: "London",
    flag: "🇬🇧",
    partnerName: "Creative Studio UK",
    author: "Marcus Johnson",
    company: "Staff Engineer",
    quote: "Simply brilliant. He brought creative problem-solving and modern Next.js performance to every challenge with high-performance animations.",
    avatar: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 5,
    country: "AUSTRALIA",
    city: "Sydney",
    flag: "🇦🇺",
    partnerName: "Craft Collective",
    author: "Elena Rodriguez",
    company: "Founder",
    quote: "The attention to detail is unmatched. Working with Maneesh felt like having a senior UI/UX designer and full-stack developer rolled into one.",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const activeStory = CLIENT_STORIES[activeIndex];

  const handleSelect = (index) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 300);
    }, 150);
  };

  // Auto-cycle through partner stories every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CLIENT_STORIES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="unique-tst-section">
      <Particles
        particleColors={['#0f172a', '#0284c7']}
        particleCount={20}
        particleSpread={12}
        speed={0.06}
        particleBaseSize={50}
        className="tst-particles"
      />

      <div className="shell full-globe-shell">

        {/* ── UNIFIED FULL-WIDTH GLOBE SHOWCASE ── */}
        <div className="full-globe-showcase-card">

          {/* Top Header Pill */}
          <div className="full-globe-badge-pill">
            <span className="full-globe-live-dot" />
            <span>GLOBAL PARTNERS &amp; TESTIMONIALS</span>
          </div>

          {/* Massive Country & Partner Name in Background Text Position */}
          <div className="full-globe-hero-text-wrap">
            <div className={`full-globe-country-watermark ${isAnimating ? 'animating' : ''}`}>
              {activeStory.country}
            </div>

            <div className={`full-globe-active-partner-tag ${isAnimating ? 'animating' : ''}`}>
              <span className="full-globe-flag">{activeStory.flag}</span>
              <span className="full-globe-partner-name">{activeStory.partnerName}</span>
              <span className="full-globe-dot-sep">•</span>
              <span className="full-globe-city-text">{activeStory.city}</span>
            </div>
          </div>

          {/* Testimonial Quote Display */}
          <div className="full-globe-quote-container">
            <span className="full-globe-quote-glyph left">“</span>
            <p className={`full-globe-quote-body ${isAnimating ? 'animating' : ''}`}>
              {activeStory.quote}
            </p>
            <span className="full-globe-quote-glyph right">”</span>

            <div className={`full-globe-author-meta ${isAnimating ? 'animating' : ''}`}>
              <strong className="full-globe-author-name">{activeStory.author}</strong>
              <span className="full-globe-author-comp">{activeStory.company}</span>
            </div>
          </div>

          {/* Interactive Avatars Selector */}
          <div className="full-globe-avatars-row">
            {CLIENT_STORIES.map((story, index) => {
              const isSelected = activeIndex === index;
              return (
                <button
                  key={story.id}
                  onClick={() => handleSelect(index)}
                  className={`full-globe-avatar-btn ${isSelected ? 'selected' : ''}`}
                  title={`${story.partnerName} (${story.country})`}
                >
                  <img
                    src={story.avatar}
                    alt={story.partnerName}
                    className="full-globe-avatar-img"
                  />
                  {isSelected && (
                    <span className="full-globe-avatar-active-ring" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Big 3D Cobe Globe Dome Container */}
          <div className="full-globe-dome-stage">
            <Globe className="full-globe-canvas" />
            <div className="full-globe-bottom-fade-mask" />
          </div>

          {/* Bottom Review Action */}
          <div className="full-globe-action-row">
            <button
              onClick={() => setIsFormOpen(true)}
              className="full-globe-review-cta"
            >
              <MessageSquarePlus size={15} />
              <span>Leave a Review</span>
            </button>
          </div>

        </div>

      </div>

      <TestimonialForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}
