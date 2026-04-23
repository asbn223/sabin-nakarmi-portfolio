'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Add click handlers to all nav links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => link.addEventListener('click', handleNavClick));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      navLinks.forEach(link => link.removeEventListener('click', handleNavClick));
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },

  ];

  const menuVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a
              href="#home"
              className="font-space-grotesk text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              SN.
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="mailto:asbn2231@gmail.com"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium text-sm"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-card transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <span className="text-2xl text-foreground">✕</span>
              ) : (
                <span className="text-2xl text-foreground">☰</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        className={`fixed inset-0 top-16 z-40 md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-2">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                custom={i}
                variants={itemVariants}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-card transition-colors duration-200 font-medium"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:asbn2231@gmail.com"
              custom={navItems.length}
              variants={itemVariants}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium mt-4"
            >
              Contact
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
