import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Hero from './sections/Hero';
import Vision from './sections/Vision';
import Tiers from './sections/Tiers';
import Curriculum from './sections/Curriculum';
import Lab from './sections/Lab';
import Instructors from './sections/Instructors';
import Admission from './sections/Admission';
import Footer from './sections/Footer';
import LoadingScreen from './sections/LoadingScreen';
import Navigation from './sections/Navigation';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      <LoadingScreen />
      <Navigation />

      <main className="relative">
        <Hero />
        <Instructors />
        <Vision />
        <Tiers />
        <Curriculum />
        <Lab />

        <Admission />
        <Footer />
      </main>
    </div>
  );
}

export default App;
