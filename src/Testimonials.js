import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Particles from './Particles';
import { GlobeAnalytics } from './components/ui/cobe-globe-analytics';
import TestimonialForm from './TestimonialForm';
import './Testimonials.css';

const PARTNER_MARKERS = [
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
    city: "Kurunegala / Colombo, LK",
    location: [7.8731, 80.7718],
    visitors: 3200,
    trend: 28,
    isPartner: true,
  },
  {
    id: "partner-usa",
    name: "North America Network",
    city: "San Francisco, USA",
    location: [37.7749, -122.4194],
    visitors: 980,
    trend: 15,
  },
  {
    id: "partner-uk",
    name: "Europe Creative Studio",
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

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [displayedRole, setDisplayedRole] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;

        const validData = data && data.length > 0 ? data : DEMO_TESTIMONIALS;
        setTestimonials(validData);
        setDisplayedQuote(validData[0].testimonial);

        const dateStr = new Date(validData[0].created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const initialRole = [validData[0].job_title, validData[0].company].filter(Boolean).join(' at ') || 'Client';
        setDisplayedRole(`${initialRole} • ${dateStr}`);
      } catch (err) {
        console.error('Testimonials fetch error:', err);
        setTestimonials(DEMO_TESTIMONIALS);
        setDisplayedQuote(DEMO_TESTIMONIALS[0].testimonial);
        const dateStr = new Date(DEMO_TESTIMONIALS[0].created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        setDisplayedRole(`${DEMO_TESTIMONIALS[0].job_title} at ${DEMO_TESTIMONIALS[0].company} • ${dateStr}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleSelect = (index) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].testimonial);
      const dateStr = new Date(testimonials[index].created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const roleText = [testimonials[index].job_title, testimonials[index].company].filter(Boolean).join(' at ') || 'Client';
      setDisplayedRole(`${roleText} • ${dateStr}`);
      setActiveIndex(index);

      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  };

  if (loading) {
    return (
      <section className="unique-tst-section">
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)' }}>
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="unique-tst-section">
      <Particles
        particleColors={['#ffffff', '#38bdf8']}
        particleCount={25}
        particleSpread={12}
        speed={0.08}
        particleBaseSize={50}
        className="tst-particles"
      />

      <div className="shell" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {/* Section Header */}
        <div className="tst-header-wrap">
          <div className="eyebrow dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }} />
            <span>Global Reach &amp; Client Trust</span>
          </div>
          <h2 className="tst-main-title">Partners &amp; Testimonials</h2>
          <p className="tst-main-subtitle">
            Collaborating with forward-thinking teams worldwide — including our key partner <strong style={{ color: '#38bdf8' }}>Nagomi Lanka Tours</strong> based in Japan.
          </p>
        </div>

        {/* Dual Layout: Testimonials Quote on Left & Interactive 3D Globe on Right */}
        <div className="tst-dual-grid">
          
          {/* Left Column: Interactive Testimonial Carousel */}
          <div className="unique-tst-container">
            {/* Quote Container */}
            <div className="unique-tst-quote-wrap">
              <span className="unique-tst-quote-mark left">"</span>
              <p className={`unique-tst-quote ${isAnimating ? 'animating' : ''}`}>
                {displayedQuote}
              </p>
              <span className="unique-tst-quote-mark right">"</span>
            </div>

            <div className="unique-tst-bottom">
              {/* Role text */}
              <p className={`unique-tst-role ${isAnimating ? 'animating' : ''}`}>
                {displayedRole}
              </p>

              {/* Avatar Selector */}
              <div className="unique-tst-nav">
                {testimonials.map((testimonial, index) => {
                  const isActive = activeIndex === index;
                  const isHovered = hoveredIndex === index && !isActive;
                  const showName = isActive || isHovered;
                  const avatarUrl = testimonial.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

                  return (
                    <button
                      key={testimonial.id || index}
                      onClick={() => handleSelect(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`unique-tst-btn ${isActive ? 'active' : ''} ${showName ? 'expanded' : ''}`}
                    >
                      <div className="unique-tst-avatar-wrap">
                        <img
                          src={avatarUrl}
                          alt={testimonial.name}
                          className={`unique-tst-avatar ${isActive ? 'active' : ''} ${!isActive ? 'hoverable' : ''}`}
                        />
                      </div>

                      <div className={`unique-tst-name-grid ${showName ? 'show' : ''}`}>
                        <div className="unique-tst-name-overflow">
                          <span className={`unique-tst-name ${isActive ? 'active' : ''}`}>
                            {testimonial.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="tst-review-btn"
              >
                Leave a Review
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive Partner Globe */}
          <div className="tst-globe-wrapper">
            <div className="tst-globe-card">
              <div className="tst-globe-card-header">
                <span className="tst-globe-live-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Interactive Global Network
                </span>
              </div>

              <GlobeAnalytics markers={PARTNER_MARKERS} speed={0.0035} />
            </div>
          </div>

        </div>
      </div>

      <TestimonialForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}

/* ── Demo data shown when Supabase isn't configured yet ── */
const DEMO_TESTIMONIALS = [
  {
    id: 1,
    testimonial: "Maneesh built our entire tour booking portal and Sanity CMS architecture seamlessly. His creativity and speed made launching our Japan-to-Sri Lanka inbound travel platform a huge success.",
    name: "Nagomi Lanka Tours",
    job_title: "Partner & Founder",
    company: "Nagomi Lanka (Japan)",
    image_url: "/assets/projects/nagomi.png",
  },
  {
    id: 2,
    testimonial: "This changed everything for me. Maneesh delivered the project ahead of schedule with a level of polish that exceeded every expectation.",
    name: "Sarah Chen",
    job_title: "Lead Designer",
    company: "Figma",
    image_url: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 3,
    testimonial: "Simply brilliant. Nothing else compares. He brought creative problem-solving to every challenge with high-performance animations.",
    name: "Marcus Johnson",
    job_title: "Staff Engineer",
    company: "Vercel",
    image_url: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 4,
    testimonial: "The attention to detail is unmatched. Working with him felt like having a senior UI/UX designer and full-stack developer rolled into one.",
    name: "Elena Rodriguez",
    job_title: "Founder",
    company: "Craft",
    image_url: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];
