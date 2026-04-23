'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const CV_PATH = '/Sabin_Nakarmi_CV.pdf';

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

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
    <section  id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-foreground mb-2">
              About Me
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m a Senior Flutter Developer and Technical Team Lead with 8+ years of experience
                building high-performance mobile applications. I specialize in creating scalable,
                maintainable solutions that drive business value and exceptional user experiences.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                My expertise spans cross-platform development, architecture design, team leadership,
                and mentoring. I&apos;ve led development teams of up to 10 engineers, established best
                practices, and delivered multiple apps to millions of users.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently based in Kathmandu, Nepal, I&apos;m passionate about building technology that
                solves real problems and creating an environment where teams can do their best work.
              </p>

              <div className="flex gap-4 pt-4">
                <a
                    href={CV_PATH}
                    download="Sabin_Nakarmi_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-3 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors"
                >
                  Download CV
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors duration-200">
                <h3 className="font-space-grotesk text-xl font-bold text-foreground mb-2">
                  Technical Leadership
                </h3>
                <p className="text-muted-foreground">
                  Led cross-functional teams, established engineering best practices, and mentored
                  junior developers to grow their expertise.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors duration-200">
                <h3 className="font-space-grotesk text-xl font-bold text-foreground mb-2">
                  Mobile Architecture
                </h3>
                <p className="text-muted-foreground">
                  Designed and implemented scalable architectures for apps serving millions of users,
                  focusing on performance and maintainability.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors duration-200">
                <h3 className="font-space-grotesk text-xl font-bold text-foreground mb-2">
                  Full Stack Development
                </h3>
                <p className="text-muted-foreground">
                  End-to-end product development from backend APIs to iOS/Android implementations,
                  with expertise in modern DevOps practices.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

