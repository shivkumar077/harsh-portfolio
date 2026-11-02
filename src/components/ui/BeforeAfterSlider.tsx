import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  rawImage: string;
  finalImage: string;
  rawLabel?: string;
  finalLabel?: string;
  description?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  rawImage,
  finalImage,
  rawLabel = 'RAW S-LOG FOOTAGE',
  finalLabel = 'FINAL COLOR GRADE & EDIT',
  description = "Good editing isn't about adding noise. It's knowing exactly what to amplify.",
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Visual Draggable Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[340px] sm:h-[450px] md:h-[550px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#0D0D0D]/15 bg-[#0D0D0D] cursor-ew-resize select-none touch-none shadow-xl"
      >
        {/* Final Edit (Right / Base layer) */}
        <img
          src={finalImage}
          alt="Final color graded edit"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Final Edit Label */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full border border-[#E63E26]/50 text-[#E63E26] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider">
          <Sparkles className="w-3 h-3 text-[#E63E26]" />
          <span>{finalLabel}</span>
        </div>

        {/* Raw Footage (Left / Clipped overlay layer) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={rawImage}
            alt="Raw footage before grading"
            className="absolute inset-0 w-full h-full object-cover max-w-none filter contrast-90 brightness-95"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          {/* Raw Footage Label */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] sm:text-[11px] font-mono tracking-wider font-bold">
            <Sliders className="w-3 h-3" />
            <span>{rawLabel}</span>
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 bg-[#E63E26] shadow-[0_0_12px_rgba(230,62,38,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Central Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E63E26] border-2 border-white shadow-xl flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Description / Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#52525B]">
        <span>{description}</span>
        <span className="text-[11px] text-[#0D0D0D]/60 uppercase tracking-widest font-bold">
          ← DRAG SLIDER TO REVEAL GRADE →
        </span>
      </div>
    </div>
  );
};
