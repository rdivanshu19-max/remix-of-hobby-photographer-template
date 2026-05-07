import { useRef, ReactNode, MouseEvent, ElementType, ComponentPropsWithoutRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  strength?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function MagneticButton<T extends ElementType = 'button'>({
  as,
  children,
  strength = 0.35,
  className,
  ...rest
}: MagneticButtonProps<T>) {
  const Tag = (as || 'button') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) * strength);
    my.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-magnetic
    >
      <Tag ref={ref as never} className={className} {...rest}>
        {children}
      </Tag>
    </motion.span>
  );
}
