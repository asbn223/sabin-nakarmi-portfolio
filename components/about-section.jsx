'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CV_PATH = '/Sabin_Nakarmi_CV.pdf';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Left content (bio text + CV button) stagger
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Right cards stagger with slight scale
      gsap.from(cardsRef.current.children, {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
      <section
          id="about"
          ref={sectionRef}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef} className="mb-12">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-foreground mb-2">
              About Me
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={contentRef} className="space-y-6">
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
            </div>

            <div ref={cardsRef} className="space-y-8">
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
            </div>
          </div>
        </div>
      </section>
  );
}