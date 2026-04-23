'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'react-icons/fa';

function useInView(options) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce) {
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: options.threshold || 0.1 });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return { ref: setRef, inView };
}

const projects = [
  {
    title: 'Oswald Labs Platform',
    description: 'Accessibility-focused suite of mobile and web applications. Led the development of multiple apps serving millions of users with focus on inclusive design.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'React'],
    category: 'Mobile',
    featured: true,
  },
  {
    title: 'Sparrow Fintech App',
    description: 'Mobile banking and financial management application with real-time portfolio tracking, investment management, and secure transactions for 500k+ users.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Financial APIs'],
    category: 'Mobile',
    featured: true,
  },
  {
    title: 'Impilo Telemedicine Platform',
    description: 'Healthcare mobile application connecting patients with medical professionals. Features include appointment booking, medical records, and real-time consultations.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'WebRTC', 'Healthcare APIs'],
    category: 'Mobile',
    featured: true,
  },
  {
    title: 'AI-Powered Learning System',
    description: 'Educational platform with AI-driven personalized learning paths. Built with modern Flutter architecture for cross-platform availability.',
    technologies: ['Flutter', 'Dart', 'Machine Learning', 'Firebase', 'Python'],
    category: 'Mobile',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured mobile shopping application with product catalog, shopping cart, payment integration, and order tracking.',
    technologies: ['Flutter', 'Dart', 'Stripe', 'Firebase', 'Node.js'],
    category: 'Mobile',
  },
  {
    title: 'Social Networking App',
    description: 'Cross-platform social application with messaging, feeds, user profiles, and real-time notifications.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'WebSockets', 'Cloud Functions'],
    category: 'Mobile',
  },
  {
    title: 'Project Management Tool',
    description: 'Collaborative project management application for teams. Features include task management, real-time collaboration, and progress tracking.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Cloud Functions'],
    category: 'Mobile',
  },
  {
    title: 'Fitness Tracking App',
    description: 'Health and fitness application with workout tracking, nutrition logging, and progress analytics. Integrates with wearable devices.',
    technologies: ['Flutter', 'Dart', 'Health APIs', 'Firebase', 'Analytics'],
    category: 'Mobile',
  },
  {
    title: 'Restaurant Delivery Platform',
    description: 'Food delivery application connecting restaurants with customers. Includes real-time order tracking and payment integration.',
    technologies: ['Flutter', 'Dart', 'Maps APIs', 'Firebase', 'Payment APIs'],
    category: 'Mobile',
  },
  {
    title: 'Real Estate Management',
    description: 'Property management and listing platform. Features property search, virtual tours, booking, and agent management.',
    technologies: ['Flutter', 'Dart', 'Google Maps', 'Firebase', 'ImageAPI'],
    category: 'Mobile',
  },
  {
    title: 'Weather & Climate App',
    description: 'Real-time weather forecasting application with location-based alerts and weather analytics.',
    technologies: ['Flutter', 'Dart', 'Weather API', 'Maps', 'Local Storage'],
    category: 'Mobile',
  },
  {
    title: 'Travel & Tourism Platform',
    description: 'Comprehensive travel planning application with itinerary builder, hotel/flight booking, and travel guides.',
    technologies: ['Flutter', 'Dart', 'Travel APIs', 'Firebase', 'Maps APIs'],
    category: 'Mobile',
  },
  {
    title: 'Music Streaming Service',
    description: 'Cross-platform music streaming application with playlist management, offline download, and social features.',
    technologies: ['Flutter', 'Dart', 'Audio APIs', 'Firebase', 'Cloud Storage'],
    category: 'Mobile',
  },
  {
    title: 'Video Conferencing App',
    description: 'Real-time video and audio conferencing solution with screen sharing and chat features.',
    technologies: ['Flutter', 'Dart', 'WebRTC', 'Firebase', 'Cloud Functions'],
    category: 'Mobile',
  },
  {
    title: 'Task Automation Platform',
    description: 'Workflow automation tool for teams to create and manage automated tasks and processes.',
    technologies: ['Flutter', 'Dart', 'Node.js', 'Firebase', 'APIs'],
    category: 'Mobile',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Business intelligence dashboard with real-time analytics, custom reports, and data visualization.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Charts', 'Analytics APIs'],
    category: 'Mobile',
  },
  {
    title: 'Enterprise Resource Planning',
    description: 'Comprehensive ERP solution for businesses. Includes inventory, finance, HR, and supply chain management.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'PostgreSQL'],
    category: 'Mobile',
  },
];

export function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Mobile', 'Web'];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={projectVariants} className="mb-12">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-foreground mb-2">
              Featured Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mb-8"></div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground border border-border hover:border-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={projectVariants}
                className="group bg-background rounded-lg border border-border hover:border-primary/50 overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 flex flex-col"
              >
                {/* Project Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                  <div className="text-4xl text-primary/30 font-space-grotesk font-bold">
                    {project.title.substring(0, 1)}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-space-grotesk text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium text-muted-foreground">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                      >
                        <ExternalLink className="text-xs" />
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects Link */}
          <motion.div
            variants={projectVariants}
            className="mt-12 text-center"
          >
            <a
              href="#projects"
              className="inline-block px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 font-medium transition-colors duration-200"
            >
              View All Projects
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
