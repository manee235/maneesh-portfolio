import React from 'react';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';
import './Skills.css';

// Helper: renders a devicon SVG from CDN
const Icon = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ width: 24, height: 24, objectFit: 'contain' }} />
);

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const SkillCard = ({ title, description, icons, className, progress, index }) => (
  <motion.div
    className={`skill-card-motion-wrapper ${className}`}
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.08 }}
    style={{ display: 'flex', height: '100%' }}
  >
    <BorderGlow
      glowColor="220 90 60"
      backgroundColor="#161616"
      borderRadius={28}
      glowRadius={40}
      glowIntensity={0.8}
      coneSpread={30}
      colors={['#4f6bff', '#22c55e', '#3b82f6']}
      fillOpacity={0.12}
      className="skill-card"
    >
      <div className="skill-icons">
        {icons.map(({ src, alt }, idx) => (
          <div key={idx} className="skill-icon-item">
            <Icon src={src} alt={alt} />
          </div>
        ))}
      </div>
      <h3 className="skill-title">{title}</h3>
      <p className="skill-desc">{description}</p>

      <div className="skill-progress-container">
        <div className="skill-progress-header">
          <span className="skill-progress-label">Proficiency</span>
          <span className="skill-progress-percentage">{progress}%</span>
        </div>
        <div className="skill-progress-bar">
          <motion.div
            className="skill-progress-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>
    </BorderGlow>
  </motion.div>
);

const Skills = () => {
  const categories = [
    {
      title: 'Front-End Development',
      description: 'Building engaging and user-friendly web interfaces using modern frameworks.',
      className: 'card-large',
      progress: 80,
      icons: [
        { src: `${DEVICON}/html5/html5-original.svg`, alt: 'HTML5' },
        { src: `${DEVICON}/javascript/javascript-original.svg`, alt: 'JavaScript' },
        { src: `${DEVICON}/typescript/typescript-original.svg`, alt: 'TypeScript' },
        { src: `${DEVICON}/nextjs/nextjs-original.svg`, alt: 'Next.js' },
        { src: `${DEVICON}/react/react-original.svg`, alt: 'React' },
      ]
    },
    {
      title: 'Styling & Design',
      description: 'Crafting visually appealing and responsive designs with advanced tools.',
      className: 'card-medium',
      progress: 95,
      icons: [
        { src: `${DEVICON}/css3/css3-original.svg`, alt: 'CSS3' },
        { src: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, alt: 'Tailwind' },
        { src: `${DEVICON}/bootstrap/bootstrap-original.svg`, alt: 'Bootstrap' },
        { src: `${DEVICON}/sass/sass-original.svg`, alt: 'Sass' },
        { src: `${DEVICON}/materialui/materialui-original.svg`, alt: 'Material UI' },
        { src: `${DEVICON}/framermotion/framermotion-original.svg`, alt: 'Framer Motion' },
      ]
    },
    {
      title: 'Programming Languages',
      description: 'Proficient in problem-solving and applying programming languages.',
      className: 'card-medium',
      progress: 88,
      icons: [
        { src: `${DEVICON}/python/python-original.svg`, alt: 'Python' },
        { src: `${DEVICON}/c/c-original.svg`, alt: 'C' },
        { src: `${DEVICON}/cplusplus/cplusplus-original.svg`, alt: 'C++' },
        { src: `${DEVICON}/dart/dart-original.svg`, alt: 'Dart' },
      ]
    },
    {
      title: 'Database Management',
      description: 'Designing and managing databases to ensure secure and scalable data storage.',
      className: 'card-medium',
      progress: 75,
      icons: [
        { src: `${DEVICON}/mysql/mysql-original.svg`, alt: 'MySQL' },
        { src: `${DEVICON}/postgresql/postgresql-original.svg`, alt: 'PostgreSQL' },
        { src: `${DEVICON}/mongodb/mongodb-original.svg`, alt: 'MongoDB' },
        { src: `${DEVICON}/firebase/firebase-original.svg`, alt: 'Firebase' },
        { src: `${DEVICON}/supabase/supabase-original.svg`, alt: 'Supabase' },
      ]
    },
    {
      title: 'Mobile App Development',
      description: 'Creating cross-platform mobile apps with Flutter and Dart.',
      className: 'card-large',
      progress: 80,
      icons: [
        { src: `${DEVICON}/flutter/flutter-original.svg`, alt: 'Flutter' },
        { src: `${DEVICON}/dart/dart-original.svg`, alt: 'Dart' },
        { src: `${DEVICON}/firebase/firebase-original.svg`, alt: 'Firebase' },
      ]
    },
    {
      title: 'Web Animations',
      description: 'Creating seamless animations and transitions to enhance interaction.',
      className: 'card-small',
      progress: 90,
      icons: [
        { src: `${DEVICON}/framermotion/framermotion-original.svg`, alt: 'Framer Motion' },
        { src: `${DEVICON}/threejs/threejs-original.svg`, alt: 'Three.js' },
      ]
    },
    {
      title: 'Cloud & Deployment',
      description: 'Experienced in deploying and managing applications using cloud platforms.',
      className: 'card-small',
      progress: 80,
      icons: [
        { src: `${DEVICON}/docker/docker-original.svg`, alt: 'Docker' },
        { src: `${DEVICON}/azure/azure-original.svg`, alt: 'Azure' },
        { src: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`, alt: 'AWS' },
        { src: `${DEVICON}/googlecloud/googlecloud-original.svg`, alt: 'Google Cloud' },
        { src: `${DEVICON}/vercel/vercel-original.svg`, alt: 'Vercel' },
      ]
    },
  ];

  return (
    <div id="tech-stack" className="skills-page" style={{ position: 'relative' }}>
      <motion.h1
        className="skills-main-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        Skills that fuel my passion
      </motion.h1>

      <div className="skills-grid">
        {categories.map((cat, index) => (
          <SkillCard key={index} {...cat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
