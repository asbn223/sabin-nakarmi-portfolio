'use client';

import { motion } from 'framer-motion';
import { Hero3DScene } from './hero-3d-scene';
import { ChevronDown } from 'react-icons/fa';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-background to-card overflow-hidden flex items-center justify-center">
      {/* 3D Background Scene */}
      <Hero3DScene />

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium text-sm">
            Senior Flutter Developer & Tech Lead
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-space-grotesk text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6 leading-tight"
        >
          <span className="text-foreground">Sabin</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Nakarmi
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          Building scalable mobile applications and leading high-performance development teams.
          Specialized in Flutter, cross-platform architecture, and technical leadership.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="mailto:sabin.nakarmi@example.com"
            className="px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 font-medium transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-primary/50 text-2xl" />
      </motion.div>
    </section>
  );
}
