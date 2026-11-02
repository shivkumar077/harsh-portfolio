import React, { useEffect, useRef } from 'react';

export const LumaDotBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Smoothly interpolated mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Base background color: Exact concrete paper gray (#ECEBE8)
      ctx.fillStyle = '#ECEBE8';
      ctx.fillRect(0, 0, width, height);

      time += 0.016;

      // Grid spacing
      const spacing = width < 640 ? 24 : 28;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * spacing;

        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing;

          // 1. Organic multi-layered Luminance (Luma) Wavefield
          // Main diagonal flow
          const w1 = Math.sin(x * 0.0035 + y * 0.0025 - time * 0.85);
          // Counter harmonic wave
          const w2 = Math.cos(x * 0.002 - y * 0.004 + time * 0.65);
          // High-frequency ripple
          const w3 = Math.sin((x + y) * 0.005 + time * 1.1) * 0.5;

          // Combined normalized luma (0 to 1)
          let luma = (w1 + w2 + w3 + 2.5) / 5.0;

          // 2. Interactive Mouse Luminance Spotlight
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const mouseRadius = 220;
            if (distSq < mouseRadius * mouseRadius) {
              const mouseFactor = 1 - Math.sqrt(distSq) / mouseRadius;
              // Smooth quadratic falloff
              luma += mouseFactor * mouseFactor * 0.65;
            }
          }

          // Clamp luma between 0 and 1
          luma = Math.max(0, Math.min(1, luma));

          // 3. Modulate Dot Size & Color based on Luma (Halftone Matrix)
          // Low luma -> tiny subtle dot (1.1px, 12% alpha)
          // High luma -> expanded bold dot (3.8px, 45% alpha)
          const radius = 1.1 + luma * 2.7;
          const alpha = 0.10 + luma * 0.36;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          // Subtle peak threshold: highlight wave peaks with brand vermilion red (#E63E26)
          if (luma > 0.84) {
            const redAlpha = (luma - 0.84) / 0.16;
            ctx.fillStyle = `rgba(230, 62, 38, ${Math.min(0.65, 0.25 + redAlpha * 0.4)})`;
          } else {
            ctx.fillStyle = `rgba(13, 13, 13, ${alpha})`;
          }

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
      {/* 1. Real-time Luminance-Driven Dot Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 2. Tactile Film Grain Overlay */}
      <div className="absolute inset-0 bg-film-grain opacity-10 pointer-events-none" />
    </div>
  );
};
