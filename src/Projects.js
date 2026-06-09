import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicBento from './MagicBento';
import './Projects.css';

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

  const projects = [
    {
      id: 1,
      name: "Routie - Live Bus Tracking",
      description: "A modern Flutter application for real-time bus tracking and ticket booking with Supabase backend (In Progress).",
      image: "/assets/projects/routie.png",
      tech: [
        { src: `${DEVICON}/flutter/flutter-original.svg`, alt: 'Flutter' },
        { src: `${DEVICON}/supabase/supabase-original.svg`, alt: 'Supabase' },
        { src: `${DEVICON}/figma/figma-original.svg`, alt: 'Figma' }
      ],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 2,
      name: "NUVIA - Learning Management System",
      description: "A comprehensive academic platform developed for assignment management, course tracking, and student collaboration.",
      image: "/assets/projects/nuvia.png",
      tech: [
        { src: `${DEVICON}/php/php-original.svg`, alt: 'PHP' },
        { src: `${DEVICON}/html5/html5-original.svg`, alt: 'HTML5' },
        { src: `${DEVICON}/javascript/javascript-original.svg`, alt: 'JavaScript' },
        { src: `${DEVICON}/mysql/mysql-original.svg`, alt: 'MySQL' }
      ],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 3,
      name: "SLIATE (ATI-Kurunegala) - Student Management",
      description: "A comprehensive academic UI/UX project for managing student examinations, transcripts, and activities with a modern web interface.",
      image: "/assets/projects/ati.png",
      tech: [
        { src: `${DEVICON}/figma/figma-original.svg`, alt: 'Figma' }
      ],
      isHighlight: true,
      demoLink: "https://www.figma.com/proto/5Vn98woFO8vLqK6O3NFivM/project-ATI?node-id=9585-1255&t=tx5vP0dMT0jzTGMX-1",
      codeLink: "#"
    },
    {
      id: 4,
      name: "Student Registration System",
      description: "A first-year academic project featuring automated registration and the generation of unique QR-based identity cards.",
      image: "/assets/projects/student.png",
      tech: [
        { src: `${DEVICON}/csharp/csharp-original.svg`, alt: 'C#' },
        { src: `${DEVICON}/mysql/mysql-original.svg`, alt: 'MySQL' },
        { src: `${DEVICON}/figma/figma-original.svg`, alt: 'Figma' }
      ],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 5,
      name: "Interactive Digital Thorana",
      description: "A culturally inspired digital installation project that combines interactive design with traditional Sri Lankan motifs for competition, created using React CSS.",
      image: "/assets/projects/thorana.png",
      tech: [
        { src: `${DEVICON}/react/react-original.svg`, alt: 'React' },
        { src: `${DEVICON}/css3/css3-original.svg`, alt: 'CSS3' }
      ],
      demoLink: "https://thoranait.vercel.app/",
      codeLink: "#"
    },
    {
      id: 6,
      name: "Dreamscape House Designing",
      description: "Modern web application for architectural planning and interior design visualization built with React.",
      image: "/assets/projects/dreamscape.png",
      tech: [
        { src: `${DEVICON}/react/react-original.svg`, alt: 'React' },
        { src: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, alt: 'Tailwind' }
      ],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 7,
      name: "Lilly Foods",
      description: "Full UI/UX design for an online food ordering platform focused on user-centric discovery and seamless checkout.",
      image: "/assets/projects/lily.png",
      tech: [
        { src: `${DEVICON}/figma/figma-original.svg`, alt: 'Figma' }
      ],
      demoLink: "https://www.figma.com/proto/YVW9TOqbTPdf8ewDjXbgSt/UI-UX-project-lily-foods?node-id=152-2574&t=uu1kUTww7kev2GSK-1",
      codeLink: "#"
    },
    {
      id: 8,
      name: "Vehicle Renting Management",
      description: "An enterprise-level solution for managing vehicle fleets, booking schedules, and customer rental agreements.",
      image: "/assets/projects/ridepro.png",
      tech: [
        { src: `${DEVICON}/csharp/csharp-original.svg`, alt: 'C#' },
        { src: `${DEVICON}/mysql/mysql-original.svg`, alt: 'MySQL' }
      ],
      demoLink: "#",
      codeLink: "#"
    }
  ];

  const projectsPerPage = 6;

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="projects-container" id="projects" style={{ position: 'relative' }}>
      <div className="section-bg-title">PROJECTS</div>

      <h1 className="projects-main-title">
        A showcase of my projects
      </h1>

      <div className="projects-toolbar">
        <div className="toolbar-left">
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="toolbar-right">
          <div className="slider-controls">
            <button className="slider-btn" onClick={prevSlide} disabled={totalPages <= 1}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div className="page-indicator">
              {currentPage + 1} / {totalPages}
            </div>
            <button className="slider-btn" onClick={nextSlide} disabled={totalPages <= 1}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
          <button className="create-btn" style={{ background: '#3b82f6' }} onClick={scrollToContact}>
            + Create a project
          </button>
        </div>
      </div>

      <div className="projects-grid-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <MagicBento 
              items={currentProjects} 
              glowColor="68, 97, 230"
              enableTilt={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableMagnetism={true}
              clickEffect={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
