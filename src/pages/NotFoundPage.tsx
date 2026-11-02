import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
      <span className="font-mono text-xs text-[#E63E26] uppercase tracking-widest font-bold">
        404 — FRAME NOT FOUND
      </span>
      <h1 className="text-4xl sm:text-6xl font-display font-black text-[#0D0D0D]">
        LOST IN THE TIMELINE.
      </h1>
      <p className="text-sm text-[#0D0D0D]/70 max-w-md">
        The page or project you're looking for doesn't exist or has been moved.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0D0D0D] text-white font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#E63E26] transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </Link>
      </div>
    </div>
  );
};
