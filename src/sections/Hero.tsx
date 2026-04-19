import { useEffect, useLayoutEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// 3D Wireframe Cube Component
const WireframeCube = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;

      const targetX = mousePosition.current.y * 0.3;
      const targetY = mousePosition.current.x * 0.3;

      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.02;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.02;

      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 3 + Math.random() * 2;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return (
    <group ref={meshRef}>
      {/* Main cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>
      {/* Inner cube */}
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
      </mesh>
      {/* Core cube */}
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Corner dots */}
      {[
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.03]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
      </points>
    </group>
  );
};

const Scene = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const { camera } = useThree();
  useEffect(() => { camera.position.z = 6; }, [camera]);
  return <WireframeCube mousePosition={mousePosition} />;
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const content = section.querySelector('.hero-content');
      const header = section.querySelector('.hero-header');
      const footer = section.querySelector('.hero-footer');
      const heroElements = [header, content, footer].filter(Boolean);

      if (heroElements.length === 0) return;

      gsap.set(heroElements, { autoAlpha: 0, y: 30 });

      gsap.to(heroElements, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });

      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=160%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      });

      heroScrollTl
        .to(heroElements, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'none',
          stagger: 0,
        })
        .to(heroElements, {
          autoAlpha: 0,
          y: -60,
          duration: 0.6,
          ease: 'none',
          stagger: 0.04,
        });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-[100svh] min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(100,100,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255,100,200,0.15) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="hero-header flex justify-between items-start opacity-0">
          <div className="font-bold text-white text-sm sm:text-base lg:text-lg tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            VVDxHUSTLE
          </div>
          <a
            href="https://vvdx.in/arena"
            className="hidden sm:inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 rounded-full text-white text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Apply Now
          </a>
        </div>

        {/* Main Content */}
        <div className="hero-content flex-1 flex flex-col items-center justify-center text-center px-2 opacity-0">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tighter"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Earn While You Learn
          </h1>
          <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/50 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            World First Gamified AI Academy
          </p>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://vvdx.in/arena"
              className="group px-5 sm:px-8 py-2.5 sm:py-3.5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Explore Arena
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="hero-footer flex justify-between items-end text-white/40 text-xs sm:text-sm opacity-0">
          <div className="flex items-center gap-2">
            <span className="tracking-widest font-mono">SCROLL</span>
          </div>
          <div className="font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            COHORT 3 / 2025
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
