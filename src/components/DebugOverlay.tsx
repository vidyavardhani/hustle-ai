import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const DebugOverlay = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateDebug = () => {
      const scrollTriggers = ScrollTrigger.getAll();
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress * 100);

      // Find active section
      let active = 'none';
      scrollTriggers.forEach(st => {
        if (st.isActive) {
          const el = st.trigger as HTMLElement;
          if (el?.id) active = el.id;
        }
      });
      setActiveSection(active);
    };

    window.addEventListener('scroll', updateDebug, { passive: true });
    updateDebug();

    return () => window.removeEventListener('scroll', updateDebug);
  }, []);

  if (!isVisible) return (
    <button 
      onClick={() => setIsVisible(true)}
      className="fixed bottom-4 right-4 z-[9999] bg-red-500 text-white px-3 py-1 text-xs rounded"
    >
      Debug
    </button>
  );

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-black/90 text-green-400 p-4 rounded-lg font-mono text-xs border border-green-500/30 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">DEBUG MODE</span>
        <button onClick={() => setIsVisible(false)} className="text-red-400">×</button>
      </div>
      <div className="space-y-1">
        <div>Scroll: {scrollProgress.toFixed(1)}%</div>
        <div>Active: {activeSection}</div>
        <div>Viewport: {window.innerWidth}x{window.innerHeight}</div>
        <div>ST Count: {ScrollTrigger.getAll().length}</div>
      </div>
    </div>
  );
};

export default DebugOverlay;
