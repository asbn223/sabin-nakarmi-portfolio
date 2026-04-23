'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedGeometry() {
  const meshRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Apply reduced motion adjustments
      if (prefersReducedMotion) {
        meshRef.current.rotation.y += 0.002;
        meshRef.current.rotation.x += 0.001;
      } else {
        // Smooth rotation with parallax based on mouse movement
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x = mousePosition.y * 0.3;
        meshRef.current.position.x = mousePosition.x * 0.5;
      }

      // Floating animation
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main geometric shape - Icosahedron */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshPhongMaterial
          color="#00d4ff"
          emissive="#00a8cc"
          emissiveIntensity={0.4}
          shininess={100}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Rotating ring */}
      <mesh rotation={[0.5, 0, 0.5]}>
        <torusGeometry args={[1.8, 0.1, 16, 100]} />
        <meshPhongMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.3} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[0, 0.5, 0.3]}>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshPhongMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
      </mesh>

      {/* Floating orbs */}
      <mesh position={[2.5, 1.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhongMaterial color="#00d4ff" emissive="#00a8cc" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[-2.5, -1.5, 1]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshPhongMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export function Hero3DScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <ambientLight intensity={0.6} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-10, -10, 5]} intensity={0.4} color="#7c3aed" />
        <AnimatedGeometry />
      </Canvas>
    </div>
  );
}
