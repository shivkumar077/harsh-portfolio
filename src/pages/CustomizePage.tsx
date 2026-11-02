import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { PersonalInfoTab } from '../components/customizer/PersonalInfoTab';
import { ProjectsTab } from '../components/customizer/ProjectsTab';
import { ContactSocialsTab } from '../components/customizer/ContactSocialsTab';
import { ServicesTab } from '../components/customizer/ServicesTab';
import { TestimonialsTab } from '../components/customizer/TestimonialsTab';
import { LivePreviewTab } from '../components/customizer/LivePreviewTab';
import { ExportTab } from '../components/customizer/ExportTab';
import { 
  User, 
  Film, 
  Phone, 
  Briefcase, 
  Star,
  Eye, 
  Download, 
  Save, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle,
  Sliders,
  ExternalLink,
  Lock,
  Key,
  ShieldCheck
} from 'lucide-react';

export const CustomizePage: React.FC = () => {
  const { data, hasUnsavedChanges, saveChanges, resetToDefaults, diskSyncTime } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'personal' | 'projects' | 'reviews' | 'contact' | 'services' | 'preview' | 'export'>('personal');
  const [saveToast, setSaveToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Security gate: Automatically unlocked on local development; prompts for PIN on production
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (import.meta.env.DEV) return true;
    try {
      return sessionStorage.getItem('editfolio_owner_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234') {
      try {
        sessionStorage.setItem('editfolio_owner_unlocked', 'true');
      } catch {}
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await saveChanges();
    setIsSaving(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all customizations back to template defaults? This clears any local test data, contact numbers, and saved drafts from browser storage.')) {
      resetToDefaults();
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  const navItems = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'projects', label: 'Video Projects', icon: Film, count: data.projects.length },
    { id: 'reviews', label: 'Client Reviews', icon: Star, count: (data.testimonials || []).length },
    { id: 'contact', label: 'Contact & Socials', icon: Phone },
    { id: 'services', label: 'Services & Rates', icon: Briefcase },
    { id: 'preview', label: 'Live Preview', icon: Eye, badge: 'Interactive' },
    { id: 'export', label: 'Export & Deploy', icon: Download },
  ];

  // If locked on production, render security passcode screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#ECEBE8] text-[#0D0D0D] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0D0D0D] text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-neutral-800 space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#E63E26] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#E63E26] font-bold uppercase">
              OWNER ACCESS CONTROL
            </span>
            <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">
              PORTFOLIO CUSTOMIZER
            </h1>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              This visual dashboard is restricted to the portfolio owner. Enter your owner PIN to customize your site.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#E63E26]" />
                <span>Owner PIN</span>
              </label>
              <input
                type="password"
                required
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter 4-digit PIN (Default: 1234)"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 focus:border-[#E63E26] rounded-xl text-center text-sm font-mono tracking-widest text-white focus:outline-none transition-colors"
              />
              {pinError && (
                <p className="text-xs text-red-400 font-sans mt-1 text-center">
                  Incorrect PIN. Please enter the valid owner PIN.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E63E26] hover:bg-white hover:text-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Customizer</span>
            </button>
          </form>

          <div className="pt-2 border-t border-neutral-800">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECEBE8] text-[#0D0D0D] flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D] text-white border-b border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        {/* Brand & Mode Tag */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-[#E63E26] transition-colors"
            title="Return to Live Site"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-400" />
            <span className="font-display font-black text-sm tracking-wider uppercase hidden sm:inline">
              EDITFOLIO
            </span>
          </Link>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-white">
            <Sliders className="w-3 h-3 text-[#E63E26]" />
            <span className="font-bold uppercase tracking-wider">VISUAL CUSTOMIZER</span>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Unsaved indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium hidden md:flex">
            <span
              className={`w-2 h-2 rounded-full ${
                hasUnsavedChanges ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
              }`}
            />
            <span className={hasUnsavedChanges ? 'text-amber-300' : 'text-emerald-400'}>
              {hasUnsavedChanges
                ? 'Unsaved changes (click Save Changes)'
                : import.meta.env.DEV
                ? (diskSyncTime ? `Codebase Synced (${diskSyncTime})` : 'Codebase Auto-Synced')
                : 'Saved in browser'}
            </span>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800"
            title="Reset to default template values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Save Changes Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#E63E26] hover:bg-white hover:text-black text-white text-xs font-mono font-bold uppercase rounded-lg transition-all shadow-md hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>

          {/* Visit Live Portfolio */}
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono font-bold uppercase rounded-lg transition-colors border border-neutral-700"
            title="Open live website in new tab"
          >
            <span className="hidden md:inline">View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#0D0D0D] text-white text-xs font-mono font-bold rounded-xl shadow-2xl border border-emerald-500/60 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="block text-white">
              {import.meta.env.DEV ? 'Saved directly to src/data/portfolioData.ts!' : 'Saved in browser storage!'}
            </span>
            <span className="text-[10px] text-neutral-400 font-sans font-normal block">
              {import.meta.env.DEV ? 'Your local files are updated and ready to deploy to Vercel/Netlify.' : 'Export configuration to apply permanently.'}
            </span>
          </div>
        </div>
      )}

      {/* Main Layout: Sidebar & Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-3 space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#0D0D0D]/50 uppercase px-3 block mb-1">
            CUSTOMIZATION SECTIONS
          </span>

          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap text-left ${
                    isActive
                      ? 'bg-[#0D0D0D] text-white shadow-md'
                      : 'bg-white/80 hover:bg-white text-[#0D0D0D]/70 hover:text-[#0D0D0D] border border-[#0D0D0D]/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E63E26]' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ml-2 ${
                        isActive ? 'bg-[#E63E26] text-white' : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}

                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E63E26] text-white ml-2 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Help Box */}
          <div className="hidden md:block p-4 mt-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm text-xs font-sans space-y-2">
            <span className="font-mono text-[10px] font-bold text-[#E63E26] uppercase tracking-wider block">
              HOW IT WORKS
            </span>
            <p className="text-neutral-600 leading-relaxed text-[11px]">
              1. Edit your details & videos.<br />
              2. Test with the <strong>Live Preview</strong> tab.<br />
              3. Go to <strong>Export & Deploy</strong> to download your permanent <code>portfolioData.ts</code> file.
            </p>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="md:col-span-9 min-w-0">
          {activeTab === 'personal' && <PersonalInfoTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'reviews' && <TestimonialsTab />}
          {activeTab === 'contact' && <ContactSocialsTab />}
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'preview' && <LivePreviewTab />}
          {activeTab === 'export' && <ExportTab />}
        </main>
      </div>
    </div>
  );
};
