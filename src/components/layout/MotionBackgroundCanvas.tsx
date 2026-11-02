import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'cross' | 'dot' | 'red-dot';
  baseAlpha: number;
  currentAlpha: number;
}

export const MotionBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Number of tracking particles balanced for aesthetics & 60-120fps smoothness
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isRed = Math.random() < 0.14; // 14% red accents
      const isCross = Math.random() < 0.35; // 35% tracking crosses
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: isCross ? 5.5 : isRed ? 2.8 : 2.2,
        type: isRed ? 'red-dot' : isCross ? 'cross' : 'dot',
        baseAlpha: isRed ? 0.35 : isCross ? 0.25 : 0.2,
        currentAlpha: isRed ? 0.35 : isCross ? 0.25 : 0.2,
      });
    }

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      waveOffset += 0.009;

      // 1. Subtle undulating video timeline waveform across the background
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(13, 13, 13, 0.07)';
      for (let x = 0; x < width; x += 15) {
        const y = height * 0.52 + Math.sin(x * 0.003 + waveOffset) * 45 + Math.cos(x * 0.006 + waveOffset * 1.2) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(230, 62, 38, 0.1)'; // Vermilion red accent waveform
      for (let x = 0; x < width; x += 15) {
        const y = height * 0.57 + Math.sin(x * 0.004 - waveOffset * 0.9) * 35 + Math.sin(x * 0.008 + waveOffset) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Dynamic proximity lines between neighboring tracking points
      const maxDistance = 145;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(13, 13, 13, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Interactive response to mouse cursor
      if (mouse.active) {
        const mouseDistMax = 170;
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseDistMax) {
            const alpha = (1 - dist / mouseDistMax) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = particles[i].type === 'red-dot' 
              ? `rgba(230, 62, 38, ${alpha})` 
              : `rgba(13, 13, 13, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Subtle gentle attraction/drift towards cursor
            particles[i].x += dx * 0.005;
            particles[i].y += dy * 0.005;
          }
        }
      }

      // 4. Update & draw each tracking particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw Tracking Crosshair '+'
        if (p.type === 'cross') {
          ctx.strokeStyle = `rgba(13, 13, 13, ${p.currentAlpha})`;
          ctx.lineWidth = 1.1;
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y);
          ctx.lineTo(p.x + s, p.y);
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x, p.y + s);
          ctx.stroke();
        } else if (p.type === 'red-dot') {
          // Red Accent Tracking Node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 62, 38, ${p.currentAlpha})`;
          ctx.fill();

          // Subtle outer halo ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(230, 62, 38, 0.15)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Dark Tracking Point
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(13, 13, 13, ${p.currentAlpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#ECEBE8]"
    >
      {/* 1. Kinetic Tracking Canvas (Points, Crosshairs, Proximity Lines & Waveforms) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 2. Signature Editorial Dot Grid */}
      <div className="absolute inset-0 bg-crosshair-grid opacity-60 pointer-events-none" />

      {/* 3. Tactile Film Grain Overlay */}
      <div className="absolute inset-0 bg-film-grain opacity-10 pointer-events-none" />
    </div>
  );
};
