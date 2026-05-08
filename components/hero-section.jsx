'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from "@/components/hero";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal on load
      gsap.from('.hero-title-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Parallax on scroll
      gsap.to(textRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
      <section
          ref={sectionRef}
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <Hero/>
        {/*<div ref={textRef} className="container mx-auto px-6 text-center">*/}
        {/*  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">*/}
        {/*    <span className="hero-title-line block">Sabin Nakarmi</span>*/}
        {/*    <span className="hero-title-line block text-muted-foreground mt-2">*/}
        {/*    Senior Flutter Developer*/}
        {/*  </span>*/}
        {/*  </h1>*/}
        {/*  <p className="hero-title-line mt-6 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">*/}
        {/*    Building scalable cross-platform experiences with Dart, Flutter, and modern architecture.*/}
        {/*  </p>*/}
        {/*</div>*/}
      </section>
  );
}