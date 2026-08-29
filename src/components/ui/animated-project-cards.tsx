"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin } from "lucide-react"
import "./animated-project-cards.css"

export interface Project {
  id: string
  title: string
  pricePerHour: string
  status: "Paid" | "Not Paid" | "Active" | "Available" | "Completed" | string
  categories: string[]
  description: string
  location: string
  timeAgo: string
  logoColor: string
  logoIcon: React.ReactNode | string
}

export interface ProjectCardsProps {
  projects: Project[]
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
      mass: 0.8,
    },
  },
  hover: {
    y: -3,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
}

const expandedContentVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.35,
      ease: [0.04, 0.62, 0.23, 0.98],
      staggerChildren: 0.05,
      delayChildren: 0.03,
    },
  },
}

const childVariants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
}

const pillVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 4,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  hover: {
    scale: 1.04,
    y: -1,
  },
  tap: {
    scale: 0.98,
  },
}

const logoVariants = {
  hover: {
    scale: 1.08,
    rotate: 3,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
}

const COLOR_MAP: Record<string, string> = {
  'bg-blue-600': '#2563eb',
  'bg-blue-500': '#3b82f6',
  'bg-cyan-600': '#06b6d4',
  'bg-sky-600': '#06b6d4',
  'bg-emerald-600': '#10b981',
  'bg-green-600': '#10b981',
  'bg-purple-600': '#8b5cf6',
  'bg-pink-600': '#ec4899',
  'bg-rose-600': '#f43f5e',
  'bg-amber-600': '#f97316',
  'bg-orange-500': '#f97316',
  'bg-gray-700': '#334155',
  'bg-gray-800': '#1e293b',
}

export function ProjectCard({
  project,
  isExpanded,
  onToggle,
}: {
  project: Project
  isExpanded: boolean
  onToggle: () => void
}) {
  const isPaidOrActive = ["Paid", "Available", "Active"].includes(project.status)
  const bgStyle = COLOR_MAP[project.logoColor] || (project.logoColor?.startsWith('#') ? project.logoColor : '#2563eb')

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{
        backgroundColor: isExpanded ? bgStyle : '#ffffff',
      }}
      className={`apc-card ${isExpanded ? 'is-expanded' : ''}`}
      onClick={onToggle}
    >
      <div className="apc-card-header">
        <div className="apc-card-left">
          {/* Top Row for Mobile (Logo + Status / Toggle) */}
          <div className="apc-card-top-mobile">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="apc-logo"
              style={{
                backgroundColor: isExpanded ? 'rgba(255, 255, 255, 0.22)' : bgStyle,
              }}
            >
              {project.logoIcon}
            </motion.div>

            {/* Status Badge */}
            <span className={`apc-status-badge ${!isPaidOrActive ? 'inactive' : ''}`}>
              {project.status}
            </span>
          </div>

          {/* Content */}
          <div className="apc-content">
            {/* Title */}
            <div className="apc-title-row">
              <h3 className="apc-title">{project.title}</h3>
            </div>

            {/* Price */}
            <p className="apc-price">
              {project.pricePerHour}
            </p>
          </div>
        </div>

        {/* Chevron Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className="apc-chevron-btn"
          aria-label="Toggle details"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <ChevronDown />
          </motion.div>
        </motion.button>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={expandedContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="apc-expanded-area"
          >
            {/* Category Pills */}
            <motion.div className="apc-pills-row" variants={childVariants}>
              {project.categories?.map((category, index) => (
                <motion.span
                  key={index}
                  variants={pillVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="apc-pill"
                >
                  {category}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p className="apc-description" variants={childVariants}>
              {project.description}
            </motion.p>

            {/* Location and Time */}
            <motion.div className="apc-meta-row" variants={childVariants}>
              <div className="apc-meta-icon">
                <MapPin />
              </div>
              <span>{project.location}</span>
              <div className="apc-meta-divider"></div>
              <span>{project.timeAgo}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const tabs = [
    { id: "all", label: "All Disciplines", count: projects.length },
    {
      id: "dev",
      label: "Engineering & Code",
      count: projects.filter((p) => ["web-dev", "mobile-dev", "software-dev"].includes(p.id)).length,
    },
    {
      id: "design",
      label: "Design & Audio",
      count: projects.filter((p) => ["product-ui-ux", "graphic-design", "music-production"].includes(p.id)).length,
    },
  ]

  const filteredProjects = useMemo(() => {
    if (activeTab === "dev") {
      return projects.filter((p) => ["web-dev", "mobile-dev", "software-dev"].includes(p.id))
    }
    if (activeTab === "design") {
      return projects.filter((p) => ["product-ui-ux", "graphic-design", "music-production"].includes(p.id))
    }
    return projects
  }, [projects, activeTab])

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="apc-wrapper">
      {/* ── Category Filter Tabs (Swipeable on Mobile) ── */}
      <div className="apc-tabs-row">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`apc-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span>{tab.label}</span>
            <span className="apc-tab-count">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* ── 2-Column Grid on Both Desktop & Mobile ── */}
      <motion.div
        layout
        className="apc-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
                delay: index * 0.04,
              }}
            >
              <ProjectCard
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={() => handleToggle(project.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ProjectCards
