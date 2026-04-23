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
    title: 'Senior Flutter Developer & Tech Lead',
    company: 'Oswald Labs',
    period: '2021 - Present',
    description: 'Lead development of accessibility-focused mobile applications with team of 8 engineers. Architected scalable app infrastructure and established best practices for code quality and testing.',
    highlights: ['Team Leadership', 'Architecture Design', 'Flutter', 'Cross-Platform Development'],
  },
  {
    title: 'Senior Flutter Developer',
    company: 'Sparrow',
    period: '2019 - 2021',
    description: 'Developed and maintained fintech mobile applications serving 500k+ users. Implemented complex financial features with real-time updates and high security standards.',
    highlights: ['Flutter', 'Firebase', 'Security', 'Real-time APIs'],
  },
  {
    title: 'Mobile Developer',
    company: 'Impilo',
    period: '2018 - 2019',
    description: 'Built healthcare mobile application connecting patients with medical professionals. Implemented telemedicine features and health tracking functionality.',
    highlights: ['Flutter', 'Healthcare', 'REST APIs', 'Device Integration'],
  },
  {
    title: 'Flutter Developer',
    company: 'Remotebase',
    period: '2017 - 2018',
    description: 'Developed various client projects using Flutter. Worked with diverse teams and technologies across different industries.',
    highlights: ['Flutter', 'Client Projects', 'Full Stack', 'Collaboration'],
  },
  {
    title: 'Android Developer',
    company: 'Code Division',
    period: '2016 - 2017',
    description: 'Started career developing Android applications. Learned mobile development best practices and worked with growing teams.',
    highlights: ['Android', 'Java', 'Mobile Development', 'APIs'],
  },
  {
    title: 'Junior Developer',
    company: 'Various Startups',
    period: '2015 - 2016',
    description: 'Worked as junior developer on multiple startup projects. Gained foundational knowledge in web and mobile development.',
    highlights: ['Web Development', 'Mobile', 'Full Stack', 'Learning'],
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
