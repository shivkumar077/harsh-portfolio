import React from 'react';

export const AmbientMeshBackground: React.FC = () => {
  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#ECEBE8]"
    >
      {/* 1. GPU-ACCELERATED FLOWING LIQUID MESH (ORGANIC DRIFTING AMBIENT LIGHT BLOBS) */}
      <div className="absolute inset-0 transform-gpu overflow-hidden">
        
        {/* Blob 1: Soft Light Paper Highlight (Top-Left) */}
        <div 
          className="absolute -top-24 -left-24 w-[520px] sm:w-[700px] h-[520px] sm:h-[700px] rounded-full bg-white opacity-40 blur-[90px] sm:blur-[120px] animate-mesh-1"
        />

        {/* Blob 2: Warm Concrete Paper Accent (Center-Right) */}
        <div 
          className="absolute top-1/4 -right-32 w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] rounded-full bg-[#DFDCD6] opacity-55 blur-[80px] sm:blur-[110px] animate-mesh-2"
        />

        {/* Blob 3: Faint Warm Vermilion Light Glow (Top-Right / Mid) - Very subtle (4.5% opacity), adds living warmth without tinting */}
        <div 
          className="absolute top-1/3 right-1/4 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-[#E63E26] opacity-[0.045] blur-[110px] sm:blur-[140px] animate-mesh-3"
        />

        {/* Blob 4: Deep Paper Ambient (Bottom-Left) */}
        <div 
          className="absolute -bottom-32 -left-20 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-[#D8D5CE] opacity-45 blur-[90px] sm:blur-[130px] animate-mesh-4"
        />

        {/* Blob 5: Bottom-Right Soft Light Warmth */}
        <div 
          className="absolute -bottom-24 -right-24 w-[500px] sm:w-[680px] h-[500px] sm:h-[680px] rounded-full bg-white opacity-35 blur-[100px] sm:blur-[130px] animate-mesh-1"
        />
      </div>

      {/* 2. SUBTLE CROSSHAIR DOT GRID OVERLAY (PRESERVES THE BRAND EDITORIAL IDENTITY) */}
      <div className="absolute inset-0 bg-crosshair-grid opacity-60" />

      {/* 3. TACTILE FILM GRAIN OVERLAY */}
      <div className="absolute inset-0 bg-film-grain opacity-10" />
    </div>
  );
};
