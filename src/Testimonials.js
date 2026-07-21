import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Particles from './Particles';
import './Testimonials.css';
import TestimonialForm from './TestimonialForm';

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
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="unique-tst-section">
      <Particles
        particleColors={['#ffffff', '#4f6bff']}
        particleCount={30}
        particleSpread={12}
        speed={0.1}
        particleBaseSize={60}
        className="tst-particles"
      />
      <div className="shell" style={{ position: 'relative', zIndex: 2 }}>
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

          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <button 
              onClick={() => setIsFormOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '99px',
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >
              Leave a Review
            </button>
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
    testimonial: "This changed everything for me. Maneesh delivered the project ahead of schedule with a level of polish that exceeded every expectation.",
    name: "Sarah Chen",
    job_title: "Designer",
    company: "Figma",
    image_url: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    id: 2,
    testimonial: "Simply brilliant. Nothing else compares. He brought creative problem-solving to every challenge.",
    name: "Marcus Johnson",
    job_title: "Engineer",
    company: "Vercel",
    image_url: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    id: 3,
    testimonial: "The attention to detail is unmatched. Working with him felt like having a senior designer and developer rolled into one.",
    name: "Elena Rodriguez",
    job_title: "Founder",
    company: "Craft",
    image_url: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
];
