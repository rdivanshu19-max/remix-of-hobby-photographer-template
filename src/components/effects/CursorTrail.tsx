import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cinematic custom cursor + soft trailing dot.
 * Desktop-only (hidden on touch / coarse pointers).
 * Grows on hoverable elements.
 */
export function CursorTrail() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const tx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.6 });
  const ty = useSpring(y, { stiffness: 200, damping: 20, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest('a, button, [role="button"], input, textarea, select, [data-magnetic]');
      setHovering(interactive);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing soft halo */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
        style={{ x: tx, y: ty }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[2px] transition-[width,height] duration-300 ${
            hovering ? 'h-12 w-12' : 'h-7 w-7'
          }`}
        />
      </motion.div>

      {/* Crisp dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-foreground" />
      </motion.div>

      <style>{`
        @media (pointer: fine) {
          html, body { cursor: none; }
          a, button, [role="button"], input, textarea, select, [data-magnetic] { cursor: none; }
        }
      `}</style>
    </>
  );
}
