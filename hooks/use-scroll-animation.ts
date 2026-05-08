'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
    pin?: boolean;
    parallax?: boolean;
    parallaxSpeed?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
    animationCallback: (element: T, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
    options: ScrollAnimationOptions = {}
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            const animation = animationCallback(element, gsap);

            if (animation) {
                ScrollTrigger.create({
                    trigger: options.trigger ? element.querySelector(options.trigger) : element,
                    start: options.start || 'top 85%',
                    end: options.end || 'bottom 20%',
                    scrub: options.scrub ?? false,
                    markers: options.markers ?? false,
                    toggleActions: options.toggleActions || 'play none none reverse',
                    pin: options.pin ?? false,
                    animation: animation,
                });
            }
        }, element);

        return () => ctx.revert();
    }, [animationCallback, options]);

    return ref;
}

// Preset: Fade Up
export function useFadeUp<T extends HTMLElement>(delay = 0) {
    return useScrollAnimation<T>((el, gsapInstance) => {
        return gsapInstance.from(el, {
            y: 60,
            opacity: 0,
            duration: 1,
            delay,
            ease: 'power3.out',
        });
    });
}

// Preset: Stagger Children
export function useStaggerReveal<T extends HTMLElement>(childSelector: string, stagger = 0.1) {
    return useScrollAnimation<T>((el, gsapInstance) => {
        const children = el.querySelectorAll(childSelector);
        return gsapInstance.from(children, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger,
            ease: 'power3.out',
        });
    });
}

// Preset: Parallax
export function useParallax<T extends HTMLElement>(speed = 0.5) {
    return useScrollAnimation<T>((el, gsapInstance) => {
        return gsapInstance.to(el, {
            y: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    });
}