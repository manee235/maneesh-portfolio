import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const qualifications = [
    { year: "2026", title: "CCNA", institute: "University of Moratuwa", progress: 40 },
    { year: "2024-2026", title: "HNDIT", institute: "SLIATE", progress: 75 },
    { year: "2023", title: "Certificate in Software Engineering", institute: "NIBM", progress: 100 },
    { year: "2009-2022", title: "School Education", institute: "Sri Sumangala College Wariyapola", progress: 100 }
  ];

  const experience = [
    { year: "2025-Present", title: "Freelancer", desc: "Specializing in Full-Stack Web Development and UI/UX Design." },
    { year: "2021-Present", title: "Bedroom Music Producer", desc: "Skilled in producing electronic music and composing film-style background scores, with hands-on experience in sound design, mixing, and arrangement.- Listen on Spotify: ", link: "https://open.spotify.com/artist/3u0fN7vcIuh9sv0HjIpEvs?si=0_LB1zsgT8yvzV20EmquhA", linkText: "SYNTHV" }
  ];

  return (
    <motion.div
      className="about-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="section-bg-title">About Me</div>

      <div className="about-intro-container">
        <motion.div className="about-text-content" variants={itemVariants}>
          <h2 className="about-greeting">I'm Maneesh Amindu</h2>
          <p className="about-description">
            An innovative HNDIT undergraduate at SLIATE Kurunegala and CCNA trainee at the University of Moratuwa.
            Combines strong expertise in coding, networking, and UI/UX design with a creative edge in music production.
            Passionate about building secure, user-friendly, and high-performance IT systems through smart design
            and reliable network solutions.
          </p>
          <a href="/assets/maneesh_amindu_cv.pdf" download="maneesh_amindu_cv.pdf" style={{ textDecoration: 'none' }}>
            <button className="about-cv-btn">
              Download CV <span>↓</span>
            </button>
          </a>
        </motion.div>
      </div>

      <div className="about-content-container">
        <motion.div className="about-column" variants={itemVariants}>
          <h2 className="about-subtitle">Academic Qualifications</h2>
          <div className="timeline-container">
            {qualifications.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-institute">{item.institute}</p>
                  <div className="course-progress-container">
                    <div className="course-progress-info">
                      <span>Completion</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="course-progress-bar-bg">
                      <motion.div
                        className="course-progress-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="about-column" variants={itemVariants}>
          <h2 className="about-subtitle">Work Experience</h2>
          <div className="timeline-container">
            {experience.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot" style={{ background: '#10b981' }} />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">
                    {item.desc}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                        {item.linkText}
                      </a>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
