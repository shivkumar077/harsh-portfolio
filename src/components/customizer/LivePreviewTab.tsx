import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from 'lucide-react';
import { HomePage } from '../../pages/HomePage';
import { WorkPage } from '../../pages/WorkPage';
import { AboutPage } from '../../pages/AboutPage';
import { ContactPage } from '../../pages/ContactPage';

export const LivePreviewTab: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePage, setActivePage] = useState<'home' | 'work' | 'about' | 'contact'>('home');
  const [refreshKey, setRefreshKey] = useState(0);

  const containerWidth = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[390px]',
  }[device];

  return (
    <div className="space-y-4 max-w-full">
      {/* Preview Controls Bar */}
      <div className="p-3 bg-white border border-[#0D0D0D]/10 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#F4F4F5] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
              device === 'desktop' ? 'bg-[#0D0D0D] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice('tablet')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
              device === 'tablet' ? 'bg-[#0D0D0D] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
              device === 'mobile' ? 'bg-[#0D0D0D] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (390px)</span>
          </button>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center gap-1 bg-[#F4F4F5] p-1 rounded-xl text-xs font-mono font-bold">
          <button
            type="button"
            onClick={() => setActivePage('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePage === 'home' ? 'bg-white text-[#E63E26] shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => setActivePage('work')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePage === 'work' ? 'bg-white text-[#E63E26] shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Work Archive
          </button>
          <button
            type="button"
            onClick={() => setActivePage('about')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePage === 'about' ? 'bg-white text-[#E63E26] shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => setActivePage('contact')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePage === 'contact' ? 'bg-white text-[#E63E26] shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Refresh & View Live Site */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
            title="Reload Preview Frame"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-neutral-700 hover:text-[#E63E26] transition-colors"
          >
            <span>Open in Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="w-full flex justify-center bg-neutral-900/10 p-3 sm:p-6 rounded-3xl border border-[#0D0D0D]/10 overflow-hidden">
        <div
          className={`${containerWidth} transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl bg-[#ECEBE8] border-2 border-[#0D0D0D]/40 max-h-[800px] overflow-y-auto`}
          key={refreshKey}
        >
          {/* Simulated Browser Chrome */}
          <div className="sticky top-0 z-30 px-4 py-2.5 bg-[#0D0D0D] text-white flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-neutral-400 text-[11px] truncate">
                editfolio.local/{activePage === 'home' ? '' : activePage}
              </span>
            </div>
            <span className="text-[10px] text-[#E63E26] font-bold">
              LIVE PREVIEW
            </span>
          </div>

          {/* Actual Rendered Portfolio Page */}
          <div className="relative pointer-events-auto">
            {activePage === 'home' && <HomePage />}
            {activePage === 'work' && <WorkPage />}
            {activePage === 'about' && <AboutPage />}
            {activePage === 'contact' && <ContactPage />}
          </div>
        </div>
      </div>
    </div>
  );
};
