import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
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
      name: "Vehicle Renting Management",
      description: "An enterprise-level solution for managing vehicle fleets, booking schedules, and customer rental agreements.",
      image: "/assets/projects/ridepro.png",
      tech: [
        { src: `${DEVICON}/csharp/csharp-original.svg`, alt: 'C#' },
        { src: `${DEVICON}/mysql/mysql-original.svg`, alt: 'MySQL' }
      ],
      demoLink: "#",
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
    }
  ];

  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

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
            <input type="text" placeholder="Search projects..." />
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
          <button className="create-btn" style={{ background: '#3b82f6' }}>
            + Create a project
          </button>
        </div>
      </div>

      <div className="projects-grid-wrapper">
        <motion.div
          key={currentPage}
          className="projects-grid"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {currentProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              layout
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.name} className="project-image" />
                {project.isHighlight && (
                  <div className="designer-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    Designer Highlight
                  </div>
                )}
                <div className="project-overlay">
                  <button className="overlay-btn" onClick={() => window.open(project.demoLink, '_blank')}>Live Demo</button>
                  <button className="overlay-btn secondary" onClick={() => window.open(project.codeLink, '_blank')}>View Code</button>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header-row">
                  <h3 className="project-name">{project.name}</h3>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech-stack">
                  {project.tech.map((tech, idx) => (
                    <div key={idx} className="tech-icon-pill" title={tech.alt}>
                      <img src={tech.src} alt={tech.alt} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
