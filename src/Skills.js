import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  Terminal,
  Database,
  Smartphone,
  Sparkles,
  Cloud,
  Layers
} from 'lucide-react';
import './Skills.css';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const CATEGORY_ICONS = {
  'Front-End Development': Code2,
  'Styling & Design': Palette,
  'Programming Languages': Terminal,
  'Database Management': Database,
  'Mobile App Development': Smartphone,
  'Web Animations & 3D': Sparkles,
  'Cloud & Deployment': Cloud,
};

const SkillCard = ({ title, description, icons, progress, index }) => {
  const CategoryIcon = CATEGORY_ICONS[title] || Layers;

  return (
    <motion.div
      className="modern-skill-card"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      {/* Top Header with Category Icon Badge */}
      <div className="modern-skill-card-top">
        <div className="modern-skill-icon-badge">
          <CategoryIcon size={22} className="modern-skill-cat-icon" />
        </div>
        <div className="modern-skill-meta">
          <h3 className="modern-skill-title">{title}</h3>
          <p className="modern-skill-desc">{description}</p>
        </div>
      </div>

      {/* Tech Stack Chips with Icons & Names */}
      <div className="modern-skill-tech-pills">
        {icons.map(({ name, src }, idx) => (
          <div key={idx} className="modern-tech-pill" title={name}>
            <img src={src} alt={name} className="modern-tech-icon" />
            <span className="modern-tech-name">{name}</span>
          </div>
        ))}
      </div>

      {/* Progress & Mastery Level */}
      <div className="modern-skill-footer">
        <div className="modern-skill-progress-header">
          <span className="modern-skill-progress-label">Mastery Level</span>
          <span className="modern-skill-progress-pct">{progress}%</span>
        </div>
        <div className="modern-skill-progress-track">
          <motion.div
            className="modern-skill-progress-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const categories = [
    {
      title: 'Front-End Development',
      description: 'Building modern, reactive, and user-centric web applications with component architectures.',
      progress: 92,
      icons: [
        { name: 'React', src: `${DEVICON}/react/react-original.svg` },
        { name: 'Next.js', src: `${DEVICON}/nextjs/nextjs-original.svg` },
        { name: 'TypeScript', src: `${DEVICON}/typescript/typescript-original.svg` },
        { name: 'JavaScript', src: `${DEVICON}/javascript/javascript-original.svg` },
        { name: 'HTML5', src: `${DEVICON}/html5/html5-original.svg` },
      ]
    },
    {
      title: 'Styling & Design',
      description: 'Creating visually stunning, responsive layouts with modern design systems and fluid animations.',
      progress: 95,
      icons: [
        { name: 'Tailwind CSS', src: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
        { name: 'CSS3', src: `${DEVICON}/css3/css3-original.svg` },
        { name: 'Figma', src: `${DEVICON}/figma/figma-original.svg` },
        { name: 'Sass', src: `${DEVICON}/sass/sass-original.svg` },
        { name: 'Bootstrap', src: `${DEVICON}/bootstrap/bootstrap-original.svg` },
        { name: 'Material UI', src: `${DEVICON}/materialui/materialui-original.svg` },
      ]
    },
    {
      title: 'Mobile App Development',
      description: 'Engineering high-performance, cross-platform mobile apps for iOS and Android with smooth UI.',
      progress: 88,
      icons: [
        { name: 'Flutter', src: `${DEVICON}/flutter/flutter-original.svg` },
        { name: 'Dart', src: `${DEVICON}/dart/dart-original.svg` },
        { name: 'Supabase', src: `${DEVICON}/supabase/supabase-original.svg` },
        { name: 'Firebase', src: `${DEVICON}/firebase/firebase-original.svg` },
      ]
    },
    {
      title: 'Database Management',
      description: 'Designing normalized schemas, fast queries, and real-time backend synchronization.',
      progress: 82,
      icons: [
        { name: 'PostgreSQL', src: `${DEVICON}/postgresql/postgresql-original.svg` },
        { name: 'MySQL', src: `${DEVICON}/mysql/mysql-original.svg` },
        { name: 'MongoDB', src: `${DEVICON}/mongodb/mongodb-original.svg` },
        { name: 'Supabase', src: `${DEVICON}/supabase/supabase-original.svg` },
        { name: 'Firebase', src: `${DEVICON}/firebase/firebase-original.svg` },
      ]
    },
    {
      title: 'Programming Languages',
      description: 'Applying solid algorithms, object-oriented concepts, and clean coding practices.',
      progress: 86,
      icons: [
        { name: 'Python', src: `${DEVICON}/python/python-original.svg` },
        { name: 'C++', src: `${DEVICON}/cplusplus/cplusplus-original.svg` },
        { name: 'C', src: `${DEVICON}/c/c-original.svg` },
        { name: 'PHP', src: `${DEVICON}/php/php-original.svg` },
      ]
    },
    {
      title: 'Web Animations & 3D',
      description: 'Crafting fluid physics-based micro-interactions, interactive WebGL, and Three.js 3D shaders.',
      progress: 90,
      icons: [
        { name: 'Framer Motion', src: `${DEVICON}/framermotion/framermotion-original.svg` },
        { name: 'Three.js', src: `${DEVICON}/threejs/threejs-original.svg` },
        { name: 'WebGL', src: `${DEVICON}/webgl/webgl-original.svg` },
      ]
    },
    {
      title: 'Cloud & Deployment',
      description: 'Automating CI/CD pipelines, containerization, and hosting on enterprise cloud platforms.',
      progress: 84,
      icons: [
        { name: 'Vercel', src: `${DEVICON}/vercel/vercel-original.svg` },
        { name: 'Docker', src: `${DEVICON}/docker/docker-original.svg` },
        { name: 'AWS', src: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
        { name: 'Azure', src: `${DEVICON}/azure/azure-original.svg` },
        { name: 'Google Cloud', src: `${DEVICON}/googlecloud/googlecloud-original.svg` },
      ]
    },
  ];

  return (
    <section id="tech-stack" className="skills-page">
      <div className="skills-container">

        {/* Section Top Header */}
        <div className="skills-header-wrap">
          <div className="skills-eyebrow">
            <span className="skills-eyebrow-dot" />
            <span>Tech Stack &amp; Capabilities</span>
          </div>
          <h2 className="skills-main-title">
            Skills that fuel my passion
          </h2>
          <p className="skills-subtitle">
            A comprehensive overview of the modern frameworks, engineering workflows, and design systems I bring to every digital product.
          </p>
        </div>

        {/* Modern Clean Bento Grid */}
        <div className="modern-skills-grid">
          {categories.map((cat, index) => (
            <SkillCard key={index} {...cat} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
