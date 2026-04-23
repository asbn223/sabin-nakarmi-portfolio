'use client';

import {useRef, useEffect, useState, useCallback} from 'react';
import {motion} from 'framer-motion';
import * as THREE from 'three';

const experiences = [
    {
        title: 'Lead | Full Stack Mobile Developer | TagMe Coordinator',
        company: 'Youth Innovation Lab',
        period: 'Jul 2025 - Present',
        description:
            'Full-Stack Mobile App Developer and Flutter Lead building scalable cross-platform applications with Flutter frontend and Django/DRF backend. Leading Flutter architecture decisions and coordinating feature alignment across teams.',
        highlights: ['Flutter Architecture', 'Django & DRF', 'Cross-platform Mobile', 'Team Leadership'],
    },
    {
        title: 'Lead | Senior Mobile App Developer (Flutter)',
        company: 'Youth Innovation Lab',
        period: 'Jun 2023 - Jul 2025',
        description:
            'Provided technical leadership and mentorship to development team. Spearheaded architectural design of Flutter applications, implemented CI/CD pipelines, and established comprehensive testing frameworks.',
        highlights: ['Technical Leadership', 'CI/CD Implementation', 'Testing Frameworks', 'Code Quality'],
    },
    {
        title: 'Senior Flutter Developer and Consultant (Part Time)',
        company: 'Waft Technology Pvt. Ltd.',
        period: 'Jun 2023 - Feb 2024',
        description:
            'Delivered cutting-edge mobile applications while providing strategic technical guidance to clients and internal teams.',
        highlights: ['Strategic Guidance', 'Mobile Development', 'Client Leadership', 'Quality Assurance'],
    },
    {
        title: 'Lead | Senior Mobile App Developer (Flutter)',
        company: 'Waft Technology Pvt. Ltd.',
        period: 'Nov 2021 - Jun 2023',
        description:
            'Led Flutter development with focus on architecture design, code quality, and performance optimization. Mentored team members, conducted code reviews, and managed release processes.',
        highlights: ['Team Leadership', 'Architecture Design', 'Performance Optimization', 'Release Management'],
    },
    {
        title: 'Mobile Application Developer | Flutter Developer',
        company: 'Service Towards Technology Nepal',
        period: 'May 2021 - Nov 2021',
        description:
            'Specialized in Flutter LMS development with cross-platform implementation. Assumed co-leadership role coordinating development efforts and ensuring project timelines.',
        highlights: ['LMS Development', 'Cross-platform', 'Team Coordination', 'Flutter Expertise'],
    },
    {
        title: 'Mobile and Web Application Developer | Flutter Developer',
        company: 'byteRays Technology Pvt. Ltd',
        period: 'Aug 2020 - May 2021',
        description:
            'Developed robust e-commerce applications with product listings, cart management, and secure payment gateways. Built learning system modules with interactive courses and progress tracking.',
        highlights: ['E-commerce Development', 'Payment Gateways', 'Learning Systems', 'API Integration'],
    },
    {
        title: 'Flutter Developer',
        company: 'Suga Inc.',
        period: 'Apr 2019 - Aug 2020',
        description:
            'Developed Doctor Appointment System for healthcare sector. Focused on innovation and technical excellence in delivering solutions that improve healthcare processes.',
        highlights: ['Healthcare Solutions', 'Doctor Appointment System', 'Mobile App Development', 'Innovation'],
    },
    {
        title: 'Senior Customer Service Associate',
        company: 'Fusemachines Pvt. Ltd',
        period: 'Jan 2018 - Jun 2018',
        description:
            'Team leader managing 3 members responsible for handling assigned projects. Employed issue-resolution skills to respond to customers faster than company average.',
        highlights: ['Team Leadership', 'Project Management', 'Issue Resolution', 'Customer Service'],
    },
    {
        title: 'Customer Service Associate',
        company: 'Fusemachines Pvt. Ltd',
        period: 'Jan 2017 - Dec 2017',
        description:
            'Maintained team relationships while handling multiple client projects. Created weekly reports and optimized Excel formulas for analytics.',
        highlights: ['Project Handling', 'Team Collaboration', 'Reporting', 'Analytics'],
    },
];

function useInView({triggerOnce = false, threshold = 0.1} = {}) {
    const [ref, setRef] = useState(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setInView(true); if (triggerOnce) observer.unobserve(entry.target); }
            },
            {threshold}
        );
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, triggerOnce, threshold]);
    return {ref: setRef, inView};
}

function HelixBackground() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
        camera.position.set(0, 0, 10);
        const helixGroup = new THREE.Group();
        scene.add(helixGroup);
        const strandMat1 = new THREE.LineBasicMaterial({color: 0x38bdf8, transparent: true, opacity: 0.6});
        const strandMat2 = new THREE.LineBasicMaterial({color: 0x818cf8, transparent: true, opacity: 0.6});
        const rungMat = new THREE.LineBasicMaterial({color: 0x7dd3fc, transparent: true, opacity: 0.25});
        const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const points1 = [], points2 = [];
        const TURNS = 4, STEPS = 120, HEIGHT = 14, RADIUS = 1.2;
        for (let i = 0; i <= STEPS; i++) {
            const t = i / STEPS, angle = t * Math.PI * 2 * TURNS, y = (t - 0.5) * HEIGHT;
            points1.push(new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS));
            points2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS));
        }
        helixGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points1), strandMat1));
        helixGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points2), strandMat2));
        for (let i = 0; i <= STEPS; i += 6) {
            helixGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([points1[i], points2[i]]), rungMat));
            const d1 = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({color: 0x38bdf8})); d1.position.copy(points1[i]); helixGroup.add(d1);
            const d2 = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({color: 0x818cf8})); d2.position.copy(points2[i]); helixGroup.add(d2);
        }
        const ambientPos = new Float32Array(300 * 3);
        for (let i = 0; i < 300; i++) { ambientPos[i*3]=(Math.random()-.5)*20; ambientPos[i*3+1]=(Math.random()-.5)*20; ambientPos[i*3+2]=(Math.random()-.5)*10; }
        const ambGeo = new THREE.BufferGeometry(); ambGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
        scene.add(new THREE.Points(ambGeo, new THREE.PointsMaterial({color: 0x38bdf8, size: 0.04, transparent: true, opacity: 0.4})));
        const mouse = {x: 0, y: 0};
        const onMouseMove = (e) => { mouse.x=(e.clientX/window.innerWidth-.5)*2; mouse.y=-(e.clientY/window.innerHeight-.5)*2; };
        const onResize = () => { renderer.setSize(canvas.offsetWidth,canvas.offsetHeight); camera.aspect=canvas.offsetWidth/canvas.offsetHeight; camera.updateProjectionMatrix(); };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);
        let animId; const clock = new THREE.Clock();
        const animate = () => { animId=requestAnimationFrame(animate); const t=clock.getElapsedTime(); helixGroup.rotation.y=t*.18+mouse.x*.15; helixGroup.rotation.x=mouse.y*.08; renderer.render(scene,camera); };
        animate();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove',onMouseMove); window.removeEventListener('resize',onResize); renderer.dispose(); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{pointerEvents:'none'}} />;
}

function NeonScrollLine({sectionRef}) {
    const lineRef = useRef(null);
    const glowRef = useRef(null);
    const orbRef  = useRef(null);

    useEffect(() => {
        const update = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0,
                (-rect.top + window.innerHeight * 0.25) / (rect.height - window.innerHeight * 0.25)
            ));
            const pct = `${(progress * 100).toFixed(2)}%`;
            if (lineRef.current) lineRef.current.style.height = pct;
            if (glowRef.current) glowRef.current.style.height = pct;
            if (orbRef.current) {
                const h = lineRef.current?.offsetHeight ?? 0;
                orbRef.current.style.top = `${h}px`;
                orbRef.current.style.opacity = h > 4 ? '1' : '0';
            }
        };
        window.addEventListener('scroll', update, {passive: true});
        update();
        return () => window.removeEventListener('scroll', update);
    }, [sectionRef]);

    return (
        <div className="absolute left-0 top-0 bottom-0" style={{overflow:'hidden', width:'4px'}}>
            {/* Wide outer bloom */}
            <div ref={glowRef} style={{
                position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                width:'22px', height:'0%',
                background:'linear-gradient(to bottom, #f472b6cc, #fb923ccc)',
                filter:'blur(9px)', opacity:0.65, borderRadius:'9999px',
            }} />
            {/* Mid glow layer */}
            <div style={{
                position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                width:'10px', height:'100%',
                background:'linear-gradient(to bottom, #f9a8d4, #fdba74)',
                filter:'blur(3px)', opacity:0.18, borderRadius:'9999px',
                pointerEvents:'none',
            }} />
            {/* Core */}
            <div ref={lineRef} style={{
                position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                width:'3px', height:'0%',
                background:'linear-gradient(to bottom, #f9a8d4, #fb923c)',
                boxShadow:'0 0 10px 3px #f472b6cc, 0 0 22px 6px #fb923c88',
                borderRadius:'9999px',
            }} />
            {/* Orb */}
            <div ref={orbRef} style={{
                position:'absolute', left:'50%', transform:'translate(-50%, -50%)',
                width:'18px', height:'18px', borderRadius:'50%',
                background:'radial-gradient(circle, #fff 5%, #f9a8d4 40%, transparent 75%)',
                boxShadow:'0 0 22px 8px #f472b6, 0 0 50px 16px #fb923c55',
                opacity:0, transition:'opacity 0.2s', pointerEvents:'none',
            }} />
        </div>
    );
}

function ExperienceCard({exp, index}) {
    return (
        <motion.div
            className="relative pl-10 group"
            initial={{opacity: 0, x: -24, y: 8}}
            whileInView={{opacity: 1, x: 0, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.03}}
        >
            {/* Neon horizontal connector — fades in on hover, no bullet */}
            <div className="absolute left-0 top-[1.65rem] h-px w-9 opacity-0 group-hover:opacity-100 transition-all duration-500"
                 style={{background: 'linear-gradient(to right, #38bdf8cc, transparent)', boxShadow:'0 0 6px 1px #38bdf877'}}
            />

            {/* Card shell */}
            <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:translate-x-1"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.012) 100%)',
                    border: '1px solid rgba(255,255,255,0.055)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
                }}
            >
                {/* Glowing left accent — reveals on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{background:'linear-gradient(to bottom, #38bdf8, #818cf8)', boxShadow:'0 0 12px 4px #38bdf866'}}
                />

                {/* Top shimmer edge */}
                <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{background:'linear-gradient(to right, transparent 0%, #38bdf844 30%, #818cf844 70%, transparent 100%)'}}
                />

                {/* Radial inner glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                     style={{background:'radial-gradient(ellipse at 0% 50%, rgba(56,189,248,0.07) 0%, transparent 65%)'}}
                />

                <div className="relative p-6">
                    {/* Top row: period + index number */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono tracking-[0.15em] uppercase"
                              style={{color:'#7dd3fc'}}
                        >
                            {exp.period}
                        </span>
                        <span className="text-[11px] font-mono tabular-nums opacity-20 group-hover:opacity-60 transition-opacity duration-400"
                              style={{color:'#818cf8'}}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[15px] font-bold leading-snug mb-2 text-slate-100 group-hover:text-white transition-colors duration-300">
                        {exp.title}
                    </h3>

                    {/* Company with decorative dash */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="block h-px w-4 flex-shrink-0 rounded-full opacity-70"
                              style={{background:'linear-gradient(to right, #818cf8, transparent)'}}
                        />
                        <p className="text-[13px] font-semibold" style={{color:'#a5b4fc'}}>
                            {exp.company}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] leading-relaxed mb-5 text-slate-400">
                        {exp.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((tag, i) => (
                            <span key={i}
                                  className="text-[11px] px-3 py-1 rounded-full transition-all duration-300"
                                  style={{
                                      background: 'rgba(99,102,241,0.09)',
                                      border: '1px solid rgba(99,102,241,0.2)',
                                      color: '#c7d2fe',
                                  }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function ExperienceSection() {
    const sectionRef = useRef(null);
    const {ref, inView} = useInView({triggerOnce: true, threshold: 0.05});
    const setRefs = useCallback((node) => { sectionRef.current = node; ref(node); }, [ref]);

    return (
        <section
            id="experience"
            ref={setRefs}
            className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#07090f]"
        >
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-40 pointer-events-none">
                <HelixBackground />
            </div>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#07090f] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090f] to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.6, ease: 'easeOut'}}
                    className="mb-16"
                >
                    <p className="text-sky-400 text-sm font-mono tracking-widest uppercase mb-3">Career Journey</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-sky-400 to-indigo-400" />
                </motion.div>

                <div className="relative">
                    <NeonScrollLine sectionRef={sectionRef} />
                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <ExperienceCard key={index} exp={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}