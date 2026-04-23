'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// All projects data
const PROJECTS_DATA = [
  {
    id: 1,
    title: 'School Management System',
    description: 'A comprehensive mobile application built with Flutter for managing school operations. Features include student management, attendance tracking, grade management, and parent-teacher communication.',
    category: 'Mobile App',
    technologies: ['Flutter', 'Firebase', 'Dart'],
    featured: true,
    github: '#',
    link: '#',
    highlights: ['Real-time sync', 'Offline support', '10K+ users']
  },
  {
    id: 2,
    title: 'Fitness Tracking App',
    description: 'Mobile fitness application with workout tracking, meal planning, and social features. Integrates with wearable devices and provides AI-powered fitness recommendations.',
    category: 'Mobile App',
    technologies: ['Flutter', 'Provider', 'REST API'],
    featured: true,
    github: '#',
    link: '#',
    highlights: ['Wearable integration', 'AI recommendations']
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with product catalog, cart management, payment integration, and admin dashboard for inventory management.',
    category: 'Full Stack',
    technologies: ['Flutter', 'Node.js', 'MongoDB'],
    featured: true,
    github: '#',
    link: '#',
    highlights: ['Payment gateway', 'Real-time inventory']
  },
  {
    id: 4,
    title: 'Weather Forecasting App',
    description: 'Real-time weather application with detailed forecasts, severe weather alerts, and location-based notifications using advanced weather APIs.',
    category: 'Mobile App',
    technologies: ['Flutter', 'API Integration', 'Geolocation'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Real-time alerts', 'Multiple locations']
  },
  {
    id: 5,
    title: 'Task Management System',
    description: 'Collaborative task management tool with team collaboration features, task assignments, time tracking, and progress visualization.',
    category: 'Full Stack',
    technologies: ['Flutter', 'Firebase', 'Cloud Functions'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Real-time collaboration', 'Analytics dashboard']
  },
  {
    id: 6,
    title: 'Social Networking App',
    description: 'Social platform with user profiles, feeds, messaging, and community features. Implements modern state management and real-time updates.',
    category: 'Mobile App',
    technologies: ['Flutter', 'GetX', 'Firebase'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Real-time messaging', 'Feed algorithm']
  },
  {
    id: 7,
    title: 'Content Management System',
    description: 'Headless CMS platform for managing digital content with version control, multi-language support, and flexible content modeling.',
    category: 'Backend',
    technologies: ['Node.js', 'PostgreSQL', 'GraphQL'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Multi-language', 'Version control']
  },
  {
    id: 8,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization, custom reporting, and predictive analytics powered by machine learning.',
    category: 'Full Stack',
    technologies: ['React', 'D3.js', 'Python'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Real-time data', 'ML predictions']
  },
  {
    id: 9,
    title: 'IoT Device Manager',
    description: 'IoT platform for managing smart devices with remote control capabilities, device health monitoring, and automated workflows.',
    category: 'Backend',
    technologies: ['Node.js', 'MQTT', 'MongoDB'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Remote control', 'Device monitoring']
  },
  {
    id: 10,
    title: 'Music Streaming App',
    description: 'Music streaming application with playlist management, offline downloads, and personalized recommendations using machine learning.',
    category: 'Mobile App',
    technologies: ['Flutter', 'Audio Plugin', 'ML'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Offline streaming', 'Smart playlists']
  },
  {
    id: 11,
    title: 'Video Conference Platform',
    description: 'Real-time video conferencing platform with screen sharing, recording, and chat features. Built with WebRTC and optimized for reliability.',
    category: 'Full Stack',
    technologies: ['WebRTC', 'Node.js', 'React'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Screen sharing', 'HD quality']
  },
  {
    id: 12,
    title: 'Blockchain Wallet',
    description: 'Secure cryptocurrency wallet with transaction management, portfolio tracking, and integration with multiple blockchain networks.',
    category: 'Mobile App',
    technologies: ['Flutter', 'Web3.dart', 'Ethereum'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Multi-chain', 'Secure storage']
  },
  {
    id: 13,
    title: 'Travel Planning App',
    description: 'Comprehensive travel planning application with itinerary management, hotel/flight booking, and AI-powered travel recommendations.',
    category: 'Mobile App',
    technologies: ['Flutter', 'Maps API', 'AI'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Smart itineraries', 'Booking integration']
  },
  {
    id: 14,
    title: 'Learning Management System',
    description: 'Full-featured LMS platform for online education with course management, student progress tracking, and interactive learning modules.',
    category: 'Full Stack',
    technologies: ['Flutter', 'Laravel', 'MySQL'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Progress tracking', 'Interactive modules']
  },
  {
    id: 15,
    title: 'Real Estate Platform',
    description: 'Property listing platform with virtual tours, price predictions, and agent management. Features advanced search and filtering.',
    category: 'Full Stack',
    technologies: ['Flutter', 'Node.js', 'MongoDB'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Virtual tours', 'Price prediction']
  },
  {
    id: 16,
    title: 'Healthcare Management System',
    description: 'Medical practice management system with patient records, appointment scheduling, telemedicine features, and prescription management.',
    category: 'Full Stack',
    technologies: ['Flutter', 'Django', 'PostgreSQL'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['HIPAA compliant', 'Telemedicine']
  },
  {
    id: 17,
    title: 'Inventory Management System',
    description: 'Enterprise inventory management solution with stock tracking, supplier management, automated reordering, and comprehensive reporting.',
    category: 'Backend',
    technologies: ['Node.js', 'PostgreSQL', 'Redis'],
    featured: false,
    github: '#',
    link: '#',
    highlights: ['Auto-reordering', 'Real-time sync']
  },
];

const CATEGORIES = ['All', 'Mobile App', 'Full Stack', 'Backend'];

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(project => project.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-space-grotesk font-bold mb-4 text-balance">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A collection of my recent work showcasing expertise in mobile development, full-stack engineering, and backend systems.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground hover:border-primary border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <div className="relative h-full bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 overflow-hidden">
                {/* Glow effect on hover */}
                {hoveredId === project.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <div className="relative z-10">
                  {/* Category badge */}
                  <div className="inline-block mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-space-grotesk font-bold mb-3 text-foreground">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded border border-secondary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-border">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <FiGithub size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.link}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <FiExternalLink size={18} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mt-12"
        >
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </motion.p>
      </div>
    </main>
  );
}
