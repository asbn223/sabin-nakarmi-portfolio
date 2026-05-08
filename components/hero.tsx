'use client';

import {useRef, useMemo, useEffect} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Points, PointMaterial} from '@react-three/drei';
import * as THREE from 'three';
import {motion} from 'framer-motion';

const CV_PATH = '/Sabin_Nakarmi_CV.pdf';

function ParticleField() {
    const ref = useRef<THREE.Points>(null);
    const mouse = useRef({x: 0, y: 0});
    const target = useRef({x: 0, y: 0});
    const isHovering = useRef(false);
    const autoRotation = useRef({x: 0, y: 0});

    useEffect(() => {
        const section = document.getElementById('hero-section');

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };

        const handleMouseEnter = () => {
            isHovering.current = true;
        };
        const handleMouseLeave = () => {
            isHovering.current = false;
        };

        section?.addEventListener('mousemove', handleMouseMove);
        section?.addEventListener('mouseenter', handleMouseEnter);
        section?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            section?.removeEventListener('mousemove', handleMouseMove);
            section?.removeEventListener('mouseenter', handleMouseEnter);
            section?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const particles = useMemo(() => {
        const count = 1500;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return positions;
    }, []);

    useFrame((_state, delta) => {
        if (!ref.current) return;

        if (isHovering.current) {
            target.current.x += (mouse.current.y * 0.8 - target.current.x) * 0.03;
            target.current.y += (mouse.current.x * 0.8 - target.current.y) * 0.03;

            ref.current.rotation.x += (target.current.x - ref.current.rotation.x) * 0.05;
            ref.current.rotation.y += (target.current.y - ref.current.rotation.y) * 0.05;
        } else {
            autoRotation.current.x += delta / 10;
            autoRotation.current.y += delta / 15;

            ref.current.rotation.x = autoRotation.current.x;
            ref.current.rotation.y = autoRotation.current.y;

            target.current.x = ref.current.rotation.x;
            target.current.y = ref.current.rotation.y;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.03}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function Hero() {
    return (
        <section
            id="hero-section"
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0f1e]"
        >
            {/* Particle canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{position: [0, 0, 5], fov: 60}}>
                    <ParticleField/>
                </Canvas>
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1e] pointer-events-none"/>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: 'easeOut'}}
                >
          <span
              className="hero-title-line block py-1 px-4 rounded-full border border-cyan-400/40 text-cyan-300 text-sm font-medium mb-8 tracking-wide">
           Team Lead | Full Stack Mobile Developer
          </span>

                    <h1 className="hero-title-line block text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Hi, I&apos;m{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Sabin Nakarmi
            </span>
                    </h1>

                    <p className="hero-title-line text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
                        Building scalable mobile applications and leading high-performance development teams.
                        Specialized in Flutter, cross-platform architecture, and technical leadership.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="px-8 py-3 rounded-md border border-cyan-400 text-cyan-300 font-medium hover:bg-cyan-400/10 transition-colors"
                        >
                            View Projects
                        </a>
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
            </div>
        </section>
    );
}