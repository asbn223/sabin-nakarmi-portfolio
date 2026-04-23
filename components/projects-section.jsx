'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

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
    title: 'Heat AI [iOS & Android]',
    description: 'Cutting-edge platform for disaster risk management and response. Leverages AI for real-time data and predictive analytics to monitor and mitigate floods and landslides in Nepal.',
    technologies: ['Flutter', 'AI', 'Real-time Data', 'Predictive Analytics'],
    category: 'Mobile',
    featured: true,
    link: 'https://apps.apple.com/ca/app/heatai/id6740401350',
  },
  {
    title: 'Creator\'s Mela [iOS & Android]',
    description: 'Digital conference designed to sharpen skills of Nepali digital creators and influencers. Over 1,500 content creators joined the event with interactive sessions on brand-building, financial literacy, and content development.',
    technologies: ['Flutter', 'Event Management', 'Community Platform'],
    category: 'Mobile',
    featured: true,
    link: 'https://apps.apple.com/us/app/creators-mela/id6504816036',
  },
  {
    title: 'TagMe',
    description: 'Digital advocacy application supporting youth to collect waste management data as evidence for policy change. Features data collection, cleanup campaigns, badges, and certificates.',
    technologies: ['Flutter', 'Django', 'Data Collection', 'Community'],
    category: 'Mobile',
    featured: true,
    link: 'https://play.google.com/store/apps/details?id=com.youthinnovationlab.tagme.tagmev2',
  },
  {
    title: 'Ambition.Guru',
    description: 'Learning platform with expert-reviewed content, lecture notes, videos, and mock test questions. Provides flexible self-paced learning with progress tracking and time estimation tools.',
    technologies: ['Flutter', 'Education', 'Learning System', 'Mock Tests'],
    category: 'Mobile',
    link: 'https://play.google.com/store/apps/details?id=com.agnepal.ambitionguru',
  },
  {
    title: 'Drac LMS',
    description: 'Learning management system enabling online classes, practice tests, and content management. Teachers can conduct classes using Jitsi Meet integration.',
    technologies: ['Flutter', 'LMS', 'Jitsi Integration', 'Video Conferencing'],
    category: 'Mobile',
    link: 'https://apps.apple.com/us/app/drac-lms/id1578810818',
  },
  {
    title: 'PlusSize Nepal',
    description: 'E-commerce application promoting body positivity and inclusive fashion in Nepal. Focuses on inclusive product range and community empowerment.',
    technologies: ['Flutter', 'E-commerce', 'Fashion', 'Community'],
    category: 'Mobile',
    link: 'https://play.google.com/store/apps/details?id=com.plussize.app',
  },
  {
    title: 'Nepal Netra Jyoti Sangh - Dang',
    description: 'Application supporting eye health awareness and promotion. Part of a national initiative by social workers, physicians, and community leaders.',
    technologies: ['Flutter', 'Healthcare', 'NGO', 'Community'],
    category: 'Mobile',
    link: 'https://play.google.com/store/apps/details?id=np.com.suga.nepal_netrajyoti_sangh',
  },
  {
    title: 'Saathimart [iOS & Android]',
    description: 'Online shopping platform allowing users to browse products and get deliveries at their doorstep. Features large product gallery and seamless shopping experience.',
    technologies: ['Flutter', 'E-commerce', 'Payment Integration', 'Delivery'],
    category: 'Mobile',
    link: 'https://apps.apple.com/np/app/saathimart/id1631947960',
  },
  {
    title: 'Mobile Bookkeeping [iOS & Android]',
    description: 'Double-entry accounting app for small businesses. Enables journal entry, account management, and report generation (general ledger, trial balance, etc.).',
    technologies: ['Flutter', 'Accounting', 'Business Tools', 'Finance'],
    category: 'Mobile',
    link: 'https://apps.apple.com/us/app/mbk-mobile-bookkeeping/id1437741740',
  },
  {
    title: 'World of Engineering [iOS & Android]',
    description: 'AI-based news feed with industry insights, high-quality reports, and industry podcasts. Includes matchmaking platform for service providers.',
    technologies: ['Flutter', 'AI', 'News Feed', 'Industry Analytics'],
    category: 'Mobile',
    link: 'https://apps.apple.com/us/app/world-of-engineering/id1667203870',
  },
  {
    title: 'SyBazzar [iOS & Android]',
    description: 'E-commerce application with product browsing, multiple payment methods, discounts, and offers. Designed for Nepal market.',
    technologies: ['Flutter', 'E-commerce', 'Payments', 'Retail'],
    category: 'Mobile',
    link: 'https://apps.apple.com/us/app/sybazzar/id1641720887',
  },
  {
    title: 'Boudha Stupa Thanka Center [iOS]',
    description: 'E-commerce application for authentic Thanka art. Platform for established merchant with 25 years of experience serving thousands of satisfied customers.',
    technologies: ['Flutter', 'E-commerce', 'Art', 'Online Store'],
    category: 'Mobile',
    link: 'https://apps.apple.com/us/app/boudha-stupa-thanka-center/id1234567890',
  },
  {
    title: 'Doctor Appointment System',
    description: 'Healthcare solution enabling appointment booking with doctors. Focused on streamlining healthcare processes and improving patient-doctor connectivity.',
    technologies: ['Flutter', 'Healthcare', 'Appointment System', 'Scheduling'],
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
                        <FiExternalLink className="text-xs" />
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
