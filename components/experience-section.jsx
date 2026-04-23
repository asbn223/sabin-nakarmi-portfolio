'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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

const experiences = [
  {
    title: 'Lead | Full Stack Mobile Developer | TagMe Coordinator',
    company: 'Youth Innovation Lab',
    period: 'Jul 2025 - Present',
    description: 'Full-Stack Mobile App Developer and Flutter Lead building scalable cross-platform applications with Flutter frontend and Django/DRF backend. Leading Flutter architecture decisions and coordinating feature alignment across teams.',
    highlights: ['Flutter Architecture', 'Django & DRF', 'Cross-platform Mobile', 'Team Leadership'],
  },
  {
    title: 'Lead | Senior Mobile App Developer (Flutter)',
    company: 'Youth Innovation Lab',
    period: 'Jun 2023 - Jul 2025',
    description: 'Provided technical leadership and mentorship to development team. Spearheaded architectural design of Flutter applications, implemented CI/CD pipelines, and established comprehensive testing frameworks.',
    highlights: ['Technical Leadership', 'CI/CD Implementation', 'Testing Frameworks', 'Code Quality'],
  },
  {
    title: 'Senior Flutter Developer and Consultant (Part Time)',
    company: 'Waft Technology Pvt. Ltd.',
    period: 'Jun 2023 - Feb 2024',
    description: 'Delivered cutting-edge mobile applications while providing strategic technical guidance to clients and internal teams.',
    highlights: ['Strategic Guidance', 'Mobile Development', 'Client Leadership', 'Quality Assurance'],
  },
  {
    title: 'Lead | Senior Mobile App Developer (Flutter)',
    company: 'Waft Technology Pvt. Ltd.',
    period: 'Nov 2021 - Jun 2023',
    description: 'Led Flutter development with focus on architecture design, code quality, and performance optimization. Mentored team members, conducted code reviews, and managed release processes.',
    highlights: ['Team Leadership', 'Architecture Design', 'Performance Optimization', 'Release Management'],
  },
  {
    title: 'Mobile Application Developer | Flutter Developer',
    company: 'Service Towards Technology Nepal',
    period: 'May 2021 - Nov 2021',
    description: 'Specialized in Flutter LMS development with cross-platform implementation. Assumed co-leadership role coordinating development efforts and ensuring project timelines.',
    highlights: ['LMS Development', 'Cross-platform', 'Team Coordination', 'Flutter Expertise'],
  },
  {
    title: 'Mobile and Web Application Developer | Flutter Developer',
    company: 'byteRays Technology Pvt. Ltd',
    period: 'Aug 2020 - May 2021',
    description: 'Developed robust e-commerce applications with product listings, cart management, and secure payment gateways. Built learning system modules with interactive courses and progress tracking.',
    highlights: ['E-commerce Development', 'Payment Gateways', 'Learning Systems', 'API Integration'],
  },
  {
    title: 'Flutter Developer',
    company: 'Suga Inc.',
    period: 'Apr 2019 - Aug 2020',
    description: 'Developed Doctor Appointment System for healthcare sector. Focused on innovation and technical excellence in delivering solutions that improve healthcare processes.',
    highlights: ['Healthcare Solutions', 'Doctor Appointment System', 'Mobile App Development', 'Innovation'],
  },
  {
    title: 'Senior Customer Service Associate',
    company: 'Fusemachines Pvt. Ltd',
    period: 'Jan 2018 - Jun 2018',
    description: 'Team leader managing 3 members responsible for handling assigned projects. Employed issue-resolution skills to respond to customers faster than company average.',
    highlights: ['Team Leadership', 'Project Management', 'Issue Resolution', 'Customer Service'],
  },
  {
    title: 'Customer Service Associate',
    company: 'Fusemachines Pvt. Ltd',
    period: 'Jan 2017 - Dec 2017',
    description: 'Maintained team relationships while handling multiple client projects. Created weekly reports and optimized Excel formulas for analytics.',
    highlights: ['Project Handling', 'Team Collaboration', 'Reporting', 'Analytics'],
  },
];

export function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-foreground mb-2">
              Experience
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent"></div>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 pb-8 border-l-2 border-primary/30 hover:border-primary/60 transition-colors duration-200"
              >
                {/* Timeline dot */}
                <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-primary border-4 border-card"></div>

                <div className="space-y-2">
                  <h3 className="font-space-grotesk text-xl font-bold text-foreground">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <p className="text-muted-foreground leading-relaxed pt-2">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {exp.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/30"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
