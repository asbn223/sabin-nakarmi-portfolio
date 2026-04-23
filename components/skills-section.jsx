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

const skillCategories = [
  {
    category: 'Mobile Development',
    skills: ['Flutter', 'Dart', 'iOS Development', 'Android Development', 'Cross-Platform Development'],
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'Firebase', 'REST APIs', 'GraphQL', 'Database Design'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'Docker', 'CI/CD', 'AWS', 'Firebase Cloud', 'App Store & Play Store'],
  },
  {
    category: 'Core Competencies',
    skills: ['Technical Leadership', 'Architecture Design', 'Mentoring', 'Code Review', 'Team Management', 'Agile/Scrum'],
  },
  {
    category: 'Web Development',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web APIs'],
  },
  {
    category: 'Languages',
    skills: ['Dart', 'JavaScript', 'TypeScript', 'Java', 'Kotlin', 'Python'],
  },
];

export function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={categoryVariants} className="mb-12">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-foreground mb-2">
              Skills & Expertise
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((cat, index) => (
              <motion.div
                key={index}
                variants={categoryVariants}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors duration-200"
              >
                <h3 className="font-space-grotesk text-lg font-bold text-foreground mb-4">
                  {cat.category}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {cat.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      variants={skillVariants}
                      className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
