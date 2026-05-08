'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import Image from 'next/image';
import * as THREE from 'three';

const projects = [
    {
        title: 'Shikshya [iOS & Android]',
        description: 'An online platform dedicated to providing high-quality educational resources to students, educators, and lifelong learners. Empowering individuals to achieve their full potential through accessible and engaging learning experiences.',
        technologies: ['Flutter', 'Education', 'Learning System'],
        category: 'Mobile',
        featured: true,
        app_link: 'https://apps.apple.com/np/app/shikshya-org/id6756005236',
        play_link: 'https://play.google.com/store/apps/details?id=org.youthinnovationlab.shikshya',
        image: '/projects/shikshya.png',
    },
    {
        title: 'Heat AI [iOS & Android]',
        description: 'Cutting-edge platform for disaster risk management and response. Leverages AI for real-time data and predictive analytics to monitor and mitigate floods and landslides in Nepal.',
        technologies: ['Flutter', 'AI', 'Real-time Data', 'Predictive Analytics'],
        category: 'Mobile',
        featured: true,
        app_link: 'https://apps.apple.com/ca/app/heatai/id6740401350',
        play_link: 'https://play.google.com/store/apps/details?id=com.techcolab.heatai',
        image: '/projects/heatai.png',
    },
    {
        title: "Creator's Mela [iOS & Android]",
        description: 'Digital conference designed to sharpen skills of Nepali digital creators and influencers. Over 1,500 content creators joined with interactive sessions on brand-building and financial literacy.',
        technologies: ['Flutter', 'Event Management', 'Community Platform'],
        category: 'Mobile',
        featured: true,
        app_link: 'https://apps.apple.com/us/app/creators-mela/id6504816036',
        play_link: 'https://play.google.com/store/apps/details?id=com.technolab.creatorsmela&pli=1',
        image: '/projects/creators.png',
    },
    {
        title: 'TagMe [iOS & Android]',
        description: 'Digital advocacy application supporting youth to collect waste management data as evidence for policy change. Features data collection, cleanup campaigns, badges, and certificates.',
        technologies: ['Flutter', 'Django', 'Data Collection', 'Community'],
        category: 'Mobile',
        featured: true,
        app_link: 'https://apps.apple.com/np/app/tagme-now/id6736357708',
        play_link: 'https://play.google.com/store/apps/details?id=com.youthinnovationlab.tagme.tagmev2',
        image: '/projects/tagme.png',
    },
    {
        title: 'Ambition.Guru',
        description: 'Learning platform with expert-reviewed content, lecture notes, videos, and mock test questions. Provides flexible self-paced learning with progress tracking and time estimation tools.',
        technologies: ['Flutter', 'Education', 'Learning System', 'Mock Tests'],
        category: 'Mobile',
        app_link: 'https://apps.apple.com/np/app/ambition-guru/id1639309922',
        play_link: 'https://play.google.com/store/apps/details?id=com.agnepal.ambitionguru',
        image: '/projects/ambition.png',
    },
    {
        title: 'Drac LMS',
        description: 'Learning management system enabling online classes, practice tests, and content management. Teachers can conduct classes using Jitsi Meet integration.',
        technologies: ['Flutter', 'LMS', 'Jitsi Integration', 'Video Conferencing'],
        category: 'Mobile',
    },
    {
        title: 'PlusSize Nepal',
        description: 'E-commerce application promoting body positivity and inclusive fashion in Nepal. Focuses on inclusive product range and community empowerment.',
        technologies: ['Flutter', 'E-commerce', 'Fashion', 'Community'],
        category: 'Mobile',
        app_link: 'https://apps.apple.com/np/app/plussize-nepal/id6458192161',
        play_link: 'https://play.google.com/store/apps/details?id=com.plussize.app',
        image: '/projects/plussize.png',
    },
    {
        title: 'NepMeds: Online Healthcare App',
        description: 'Your digital healthcare partner providing a healing touch to you and your loved ones. Wherever you are, your well-being is our responsibility.',
        technologies: ['Flutter', 'E-commerce', 'Healthcare', 'Community'],
        category: 'Mobile',
        app_link: 'https://play.google.com/store/apps/details?id=com.nepmeds.ins',
        play_link: 'https://apps.apple.com/us/app/nepmeds/id1536317537',
        image: '/projects/NepMeds.png',
    },
    {
        title: 'Nepal Netra Jyoti Sangh - Dang',
        description: 'Application supporting eye health awareness and promotion. Part of a national initiative by social workers, physicians, and community leaders.',
        technologies: ['Flutter', 'Healthcare', 'NGO', 'Community'],
        category: 'Mobile',
    },
    {
        title: 'Mobile Bookkeeping [iOS]',
        description: 'Double-entry accounting app for small businesses. Enables journal entry, account management, and report generation including general ledger and trial balance.',
        technologies: ['Flutter', 'Accounting', 'Business Tools', 'Finance'],
        category: 'Mobile',
        app_link: 'https://apps.apple.com/us/app/mbk-mobile-bookkeeping/id1437741740',
        image: '/projects/mbk.png',
    },
    {
        title: 'World of Engineering [iOS & Android]',
        description: 'AI-based news feed with industry insights, high-quality reports, and industry podcasts. Includes matchmaking platform for service providers.',
        technologies: ['Flutter', 'AI', 'News Feed', 'Industry Analytics'],
        category: 'Mobile',
        app_link: 'https://apps.apple.com/us/app/world-of-engineering/id1667203870',
        play_link: 'https://play.google.com/store/apps/details?id=com.wea.app&hl=en',
        image: '/projects/woe.png',
    },
    {
        title: 'SyBazzar [iOS & Android]',
        description: 'E-commerce application with product browsing, multiple payment methods, discounts, and offers. Designed for the Nepal market.',
        technologies: ['Flutter', 'E-commerce', 'Payments', 'Retail'],
        category: 'Mobile',
        app_link: 'https://apps.apple.com/us/app/sybazzar/id1641720887',
        play_link: 'https://play.google.com/store/apps/details?id=com.bazzar.sy&hl=en',
        image: '/projects/sy.png',
    },
    {
        title: 'Boudha Stupa Thanka Center [iOS]',
        description: 'E-commerce application for authentic Thanka art. Platform for an established merchant with 25 years of experience serving thousands of satisfied customers.',
        technologies: ['Flutter', 'E-commerce', 'Art', 'Online Store'],
        category: 'Mobile',
        app_link: 'https://apps.apple.com/us/app/boudha-stupa-thanka-center/id1234567890',
        play_link: 'https://play.google.com/store/apps/details?id=com.thanka.bstc&hl=en_US',
        image: '/projects/boudha.png',
    },
];

const tagColors = [
    'bg-sky-500/10 text-sky-300 border-sky-500/20',
    'bg-violet-500/10 text-violet-300 border-violet-500/20',
    'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    'bg-amber-500/10 text-amber-300 border-amber-500/20',
];

gsap.registerPlugin(ScrollTrigger);

function NodeGraphBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const W = canvas.offsetWidth;
        const H = canvas.offsetHeight;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
        camera.position.set(0, 0, 30);

        const NODE_COUNT = 60;
        const spread = 22;
        const nodePositions = Array.from({ length: NODE_COUNT }, () =>
            new THREE.Vector3(
                (Math.random() - 0.5) * spread,
                (Math.random() - 0.5) * spread,
                (Math.random() - 0.5) * 8
            )
        );

        const nodeGeo = new THREE.BufferGeometry();
        const nodePosArr = new Float32Array(NODE_COUNT * 3);
        nodePositions.forEach((p, i) => {
            nodePosArr[i * 3] = p.x;
            nodePosArr[i * 3 + 1] = p.y;
            nodePosArr[i * 3 + 2] = p.z;
        });
        nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArr, 3));
        const nodeMat = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: 0.18,
            transparent: true,
            opacity: 0.85,
        });
        scene.add(new THREE.Points(nodeGeo, nodeMat));

        const EDGE_THRESHOLD = 9;
        const edgePoints = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                if (nodePositions[i].distanceTo(nodePositions[j]) < EDGE_THRESHOLD) {
                    edgePoints.push(nodePositions[i].clone(), nodePositions[j].clone());
                }
            }
        }
        const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePoints);
        const edgeMat = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.15,
        });
        scene.add(new THREE.LineSegments(edgeGeo, edgeMat));

        const accentGeo = new THREE.SphereGeometry(0.12, 8, 8);
        const accentMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa });
        [0, 7, 15, 23, 40].forEach((idx) => {
            const m = new THREE.Mesh(accentGeo, accentMat);
            m.position.copy(nodePositions[idx]);
            scene.add(m);
        });

        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        let animId;
        const clock = new THREE.Clock();
        const animate = () => {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            scene.rotation.y = Math.sin(t * 0.07) * 0.25 + mouse.x * 0.08;
            scene.rotation.x = Math.sin(t * 0.05) * 0.12 + mouse.y * 0.05;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
        />
    );
}

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const isEven = index % 2 === 0;

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const ctx = gsap.context(() => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                scale: 0.97,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, card);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-sky-500/30 hover:bg-white/[0.06] transition-all duration-500 flex flex-col"
        >
            {project.featured && (
                <div className="absolute top-4 right-4 z-10">
          <span className="font-space-grotesk text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
            Featured
          </span>
                </div>
            )}

            <div className="relative w-full h-44 overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                            background: isEven
                                ? 'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(99,102,241,0.12) 100%)'
                                : 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(56,189,248,0.10) 100%)',
                        }}
                    >
            <span className="font-space-grotesk text-5xl font-bold text-white/10 select-none">
              {project.title.charAt(0)}
            </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090f] via-transparent to-transparent" />
            </div>

            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-space-grotesk text-base font-bold text-white mb-1.5 leading-snug group-hover:text-sky-300 transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                            key={i}
                            className={`font-space-grotesk text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagColors[i % tagColors.length]}`}
                        >
              {tech}
            </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="font-space-grotesk text-[10px] text-slate-500 px-2 py-0.5">
              +{project.technologies.length - 3}
            </span>
                    )}
                </div>

                {(project.app_link || project.play_link) && (
                    <div className="flex gap-2 pt-3 border-t border-white/[0.06]">
                        {project.app_link && (
                            <a
                                href={project.app_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-space-grotesk flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/30 text-slate-300 hover:text-white transition-all duration-200"
                            >
                                <FaApple className="text-sm" />
                                App Store
                            </a>
                        )}
                        {project.play_link && (
                            <a
                                href={project.play_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-space-grotesk flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/30 text-slate-300 hover:text-white transition-all duration-200"
                            >
                                <FaGooglePlay className="text-sm" />
                                Play Store
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export function ProjectsSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showAll, setShowAll] = useState(false);

    const categories = ['All', 'Mobile'];
    const filtered = selectedCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === selectedCategory);
    const visible = showAll ? filtered : filtered.slice(0, 6);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });

            if (gridRef.current) {
                gsap.from(gridRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#07090f]"
        >
            <div className="absolute inset-0 opacity-50 pointer-events-none">
                <NodeGraphBackground />
            </div>

            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#07090f] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090f] to-transparent pointer-events-none" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-sky-500/30 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div ref={headingRef} className="mb-14">
                    <p className="font-space-grotesk text-sky-400 text-sm font-mono tracking-widest uppercase mb-3">
                        What I've Built
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div>
                            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
                                Featured Projects
                            </h2>
                            <div className="h-px w-24 bg-gradient-to-r from-sky-400 to-violet-400" />
                        </div>

                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setShowAll(false);
                                    }}
                                    className={`font-space-grotesk px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                                        selectedCategory === cat
                                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                            : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {visible.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                {filtered.length > 6 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className="font-space-grotesk inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-sky-500/30 text-sky-300 hover:bg-sky-500/10 font-medium text-sm transition-all duration-200"
                        >
                            {showAll ? 'Show Less' : `View All ${filtered.length} Projects`}
                            <span className="text-lg leading-none">{showAll ? '↑' : '↓'}</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}