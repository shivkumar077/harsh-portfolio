import React, { useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, Sparkles, Upload, Download, CheckCircle2 } from 'lucide-react';

export const PersonalInfoTab: React.FC = () => {
  const { data, updateField, addUploadedImage } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const cleanName = 'profile.jpg';
      addUploadedImage({
        id: 'profile-' + Date.now(),
        name: cleanName,
        dataUrl,
        suggestedPath: `/${cleanName}`,
      });
      // Set to local preview path or dataUrl immediately
      updateField('profileImage', dataUrl);

      // Auto-save to public/ folder if running locally in dev mode
      if (import.meta.env.DEV) {
        try {
          await fetch('/api/save-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: cleanName, base64: dataUrl }),
          });
        } catch (err) {
          console.warn('Auto-save image error', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBioChange = (index: number, val: string) => {
    const newBio = [...data.bio];
    newBio[index] = val;
    updateField('bio', newBio);
  };

  const addBioParagraph = () => {
    updateField('bio', [...data.bio, '']);
  };

  const removeBioParagraph = (index: number) => {
    if (data.bio.length <= 1) return;
    const newBio = data.bio.filter((_, i) => i !== index);
    updateField('bio', newBio);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Tab Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-black text-[#0D0D0D] uppercase tracking-tight flex items-center gap-2.5">
          <User className="w-5 h-5 text-[#E63E26]" />
          <span>Personal Information & Identity</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans mt-1">
          Customize your name, headline, professional bio, and profile photo. These appear across the hero section, navigation bar, and about page.
        </p>
      </div>

      {/* Grid: Name & Profession */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm">
        <div>
          <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider mb-2">
            Your Full Name / Brand Name *
          </label>
          <input
            type="text"
            value={data.brandName}
            onChange={(e) => updateField('brandName', e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="w-full px-4 py-3 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-sm font-sans font-medium text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] focus:bg-white transition-colors"
          />
          <span className="text-[11px] font-sans text-neutral-500 mt-1 block">
            Used in the top navigation brand logo, hero marquee, and copyright.
          </span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider mb-2">
            Professional Title / Role *
          </label>
          <input
            type="text"
            value={data.profession}
            onChange={(e) => updateField('profession', e.target.value)}
            placeholder="e.g. Freelance Video Editor & Colorist"
            className="w-full px-4 py-3 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-sm font-sans font-medium text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] focus:bg-white transition-colors"
          />
          <span className="text-[11px] font-sans text-neutral-500 mt-1 block">
            Displayed under your name, in the navigation, and in SEO meta tags.
          </span>
        </div>
      </div>

      {/* Profile Picture Upload & Preview */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4">
        <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider">
          Profile Photo
        </label>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Photo Preview */}
          <div className="relative w-28 h-36 rounded-2xl overflow-hidden border-2 border-[#0D0D0D] bg-neutral-900 shrink-0 shadow-md">
            <img
              src={data.profileImage || '/profile.jpg'}
              alt={data.brandName}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';
              }}
            />
            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-mono text-white">
              PREVIEW
            </span>
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Computer</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {data.profileImage?.startsWith('data:') && (
                <a
                  href={data.profileImage}
                  download="profile.jpg"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold rounded-xl transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download profile.jpg</span>
                </a>
              )}
            </div>

            <div>
              <label className="text-[11px] font-mono font-bold text-neutral-500 uppercase block mb-1">
                Image Path / URL (Default: <code>/profile.jpg</code>)
              </label>
              <input
                type="text"
                value={data.profileImage || '/profile.jpg'}
                onChange={(e) => updateField('profileImage', e.target.value)}
                placeholder="/profile.jpg"
                className="w-full px-3.5 py-2 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-lg text-xs font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
              />
            </div>

            <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Easiest 1-Step Way to Change Your Photo (No code editing!):</p>
                <p className="mt-0.5 text-emerald-800">
                  Simply drop your photo into the <strong><code>public/</code></strong> folder in your project and name it <strong><code>profile.jpg</code></strong>.
                </p>
                <p className="mt-1 text-[11px] text-emerald-700 font-medium">
                  It will automatically update across your entire website immediately!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Headline & Statements */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-5">
        <h3 className="text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E63E26]" />
          <span>Hero Headline & Punchlines</span>
        </h3>

        <div>
          <label className="block text-xs font-mono text-neutral-700 font-bold uppercase mb-1.5">
            Tagline (Hero Subtitle)
          </label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => updateField('tagline', e.target.value)}
            placeholder="e.g. High-Retention Video Editing & Commercial Color Finishing"
            className="w-full px-4 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-700 font-bold uppercase mb-1.5">
            Hero Statement (Main Pitch)
          </label>
          <textarea
            rows={2}
            value={data.heroStatement}
            onChange={(e) => updateField('heroStatement', e.target.value)}
            placeholder="e.g. I transform raw footage into engaging visual stories designed to capture attention and elevate your brand."
            className="w-full px-4 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-neutral-700 font-bold uppercase mb-1.5">
              Editorial Headline
            </label>
            <input
              type="text"
              value={data.editorialStatement}
              onChange={(e) => updateField('editorialStatement', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-700 font-bold uppercase mb-1.5">
              Brand Punchline
            </label>
            <input
              type="text"
              value={data.brandStatement}
              onChange={(e) => updateField('brandStatement', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>
        </div>
      </div>

      {/* Multi-paragraph About Bio */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider">
            About Bio Paragraphs
          </label>
          <button
            type="button"
            onClick={addBioParagraph}
            className="text-xs font-mono font-bold text-[#E63E26] hover:underline"
          >
            + Add Paragraph
          </button>
        </div>

        <div className="space-y-3">
          {data.bio.map((paragraph, idx) => (
            <div key={idx} className="flex gap-2">
              <textarea
                rows={3}
                value={paragraph}
                onChange={(e) => handleBioChange(idx, e.target.value)}
                placeholder={`Paragraph ${idx + 1}`}
                className="w-full px-4 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
              />
              {data.bio.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBioParagraph(idx)}
                  className="px-2 text-xs font-mono text-neutral-400 hover:text-red-500 self-center"
                  title="Remove paragraph"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
