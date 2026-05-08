'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent">
            <div
                ref={progressRef}
                className="h-full bg-primary origin-left"
                style={{ transform: 'scaleX(0)' }}
            />
        </div>
    );
}