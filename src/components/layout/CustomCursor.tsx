import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'video' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check what element is being hovered
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a, input, textarea, select, [role="button"]');
      const videoElem = target.closest('[data-cursor="video"]');
      const customCursorText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

      if (customCursorText) {
        setCursorVariant('hover');
        setCursorText(customCursorText);
      } else if (videoElem) {
        setCursorVariant('video');
        setCursorText('PLAY');
      } else if (clickable) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setCursorVariant('hidden');
    const handleMouseEnter = () => setCursorVariant('default');

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (isTouch || cursorVariant === 'hidden') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer follow circle */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-50 text-[10px] font-mono font-bold uppercase tracking-wider text-black select-none"
        animate={{
          x: mousePosition.x - (cursorVariant === 'video' ? 36 : cursorVariant === 'hover' ? 24 : 12),
          y: mousePosition.y - (cursorVariant === 'video' ? 36 : cursorVariant === 'hover' ? 24 : 12),
          width: cursorVariant === 'video' ? 72 : cursorVariant === 'hover' ? 48 : 24,
          height: cursorVariant === 'video' ? 72 : cursorVariant === 'hover' ? 48 : 24,
          backgroundColor: cursorVariant === 'video' ? '#E5A93C' : cursorVariant === 'hover' ? 'rgba(245, 245, 247, 0.9)' : 'transparent',
          border: cursorVariant === 'default' ? '1.5px solid rgba(229, 169, 60, 0.6)' : 'none',
          backdropFilter: cursorVariant === 'hover' ? 'blur(4px)' : 'none',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="scale-100 font-semibold">{cursorText}</span>
        )}
      </motion.div>

      {/* Tiny inner center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#E5A93C] rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: cursorVariant === 'video' || cursorVariant === 'hover' ? 0 : 1,
        }}
        transition={{
          duration: 0.05,
          ease: 'linear',
        }}
      />
    </div>
  );
};
