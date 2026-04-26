import React from 'react';
import { motion } from 'framer-motion';
import './About.css';


const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="about-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative' }}
    >
      <div className="section-bg-title">About Me</div>
      {/* Bento grid: 3 columns */}
      <div className="about-bento-grid">

        {/* Row 1, Col 1: Hero card (borderless) */}
        <motion.div className="about-card about-hero-card" variants={itemVariants}>
          <h1>Crafting<br />digital<br />excellence</h1>
          <p className="hero-desc">
            Focused on delivering high-end digital solutions that combine
            stunning aesthetics with robust, clean, and efficient performance.
          </p>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            <button className="create-project-btn">
              + Create a Project
            </button>
          </div>
        </motion.div>

        {/* Row 1, Col 2: Modern Rich UI */}
        <motion.div className="about-card" variants={itemVariants}>
          <div className="card-logo">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" fill="#4461e6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10-5 10 5" />
              </svg>
            </div>
            <span className="logo-name">Design</span>
          </div>
          <h2 className="card-title">Modern Rich UI</h2>
          <p className="card-sub-text">
            Creating visually stunning interfaces using glassmorphism,
            dynamic gradients, and smooth micro-animations.
          </p>
          <div className="card-skill-progress">
            <div className="progress-info">
              <span>Visual Aesthetics</span>
              <span>98%</span>
            </div>
            <div className="progress-bar-bg">
              <motion.div className="progress-bar-fill"
                initial={{ width: 0 }} animate={{ width: "98%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Row 1, Col 3: Clean & Scalable Code */}
        <motion.div className="about-card" variants={itemVariants}>
          <div className="card-logo">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" fill="#4461e6">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="logo-name">Development</span>
          </div>
          <h2 className="card-title">Clean & Scalable Code</h2>
          <p className="card-sub-text">Writing maintainable, high-performance code that scales with your business needs.</p>
          <div className="card-skill-progress">
            <div className="progress-info">
              <span>Code Quality</span>
              <span>95%</span>
            </div>
            <div className="progress-bar-bg">
              <motion.div className="progress-bar-fill"
                initial={{ width: 0 }} animate={{ width: "95%" }}
                transition={{ duration: 1.5, delay: 0.7 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Row 2, Col 1: SEO & Analytics */}
        <motion.div className="about-card" variants={itemVariants}>
          <div className="card-logo">
            <div className="logo-circle" style={{ background: '#f59e0b' }}>
              <svg viewBox="0 0 24 24" fill="white">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <span className="logo-name">Visibility</span>
          </div>
          <h2 className="card-title">SEO & Analytics</h2>
          <p className="card-sub-text">Enhancing search rankings and providing deep insights into user behavior and trends.</p>
          <div className="card-skill-progress">
            <div className="progress-info">
              <span>Visibility</span>
              <span>90%</span>
            </div>
            <div className="progress-bar-bg">
              <motion.div className="progress-bar-fill"
                style={{ background: '#f59e0b' }}
                initial={{ width: 0 }} animate={{ width: "90%" }}
                transition={{ duration: 1.5, delay: 0.9 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Row 2, Col 2: Cutting-Edge Tech */}
        <motion.div className="about-card" variants={itemVariants}>
          <div className="card-logo">
            <div className="logo-circle" style={{ background: '#10b981' }}>
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="logo-name">Innovation</span>
          </div>
          <h2 className="card-title">Cutting-Edge Tech</h2>
          <p className="card-sub-text">Leveraging the latest frameworks and tools to build future-proof applications.</p>
          <div className="card-skill-progress">
            <div className="progress-info">
              <span>Modern Stack</span>
              <span>92%</span>
            </div>
            <div className="progress-bar-bg">
              <motion.div className="progress-bar-fill"
                style={{ background: '#10b981' }}
                initial={{ width: 0 }} animate={{ width: "92%" }}
                transition={{ duration: 1.5, delay: 1.1 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Row 2, Col 3: Fast Performance */}
        <motion.div className="about-card" variants={itemVariants}>
          <div className="card-logo">
            <div className="logo-circle" style={{ background: '#ef4444' }}>
              <svg viewBox="0 0 24 24" fill="white">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <span className="logo-name">Velocity</span>
          </div>
          <h2 className="card-title">Fast Performance</h2>
          <p className="card-sub-text">Optimizing every millisecond to ensure lightning-fast load times and smooth interactions.</p>
          <div className="card-skill-progress">
            <div className="progress-info">
              <span>Speed Score</span>
              <span>99%</span>
            </div>
            <div className="progress-bar-bg">
              <motion.div className="progress-bar-fill"
                style={{ background: '#ef4444' }}
                initial={{ width: 0 }} animate={{ width: "99%" }}
                transition={{ duration: 1.5, delay: 1.3 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default About;
