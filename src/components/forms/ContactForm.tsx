import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactForm: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Short-Form Content',
    budget: '$1,000 - $3,000',
    timeline: 'Within 2-4 weeks',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    'Short-Form Content (Reels / Shorts)',
    'YouTube Long-Form Edit',
    'Commercial / Brand Ad',
    'Cinematic Project',
    'Motion Graphics & VFX',
    'Other / Ongoing Retainer',
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $3,000',
    '$3,000 - $6,000',
    '$6,000+',
    'Flexible / Discuss',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#E5A93C', '#F5F5F7', '#D4AF37'],
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }, 800);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'Short-Form Content',
      budget: '$1,000 - $3,000',
      timeline: 'Within 2-4 weeks',
      message: '',
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#0E0E10] border border-[#E5A93C]/40 rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C] text-[#E5A93C] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(229,169,60,0.3)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-[#F5F5F7]">
            INQUIRY RECEIVED
          </h3>
          <p className="text-sm text-[#A1A1AA] max-w-md mx-auto">
            Thanks for reaching out, <span className="text-[#F5F5F7] font-semibold">{formData.name}</span>.
            {portfolioData.brandName} typically reviews project briefs and replies within 12–24 hours.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${portfolioData.contact.whatsappNumber}?text=Hi%20${encodeURIComponent(portfolioData.brandName)},%20I%20just%20submitted%20a%20project%20inquiry%20via%20your%20portfolio.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-full hover:bg-[#22bf5b] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>FAST-TRACK ON WHATSAPP</span>
          </a>

          <button
            type="button"
            onClick={resetForm}
            className="w-full sm:w-auto px-6 py-3 text-xs font-mono text-[#A1A1AA] hover:text-[#F5F5F7] border border-white/10 rounded-full transition-colors"
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0E0E10] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 space-y-6 shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] tracking-wider uppercase">
        <Sparkles className="w-3.5 h-3.5" />
        <span>PROJECT INQUIRY FORM</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
            YOUR NAME <span className="text-[#E5A93C]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-xl text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#E5A93C] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
            EMAIL ADDRESS <span className="text-[#E5A93C]">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="e.g. alex@studio.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-xl text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#E5A93C] transition-colors"
          />
        </div>
      </div>

      {/* Project Type */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
          PROJECT CATEGORY
        </label>
        <select
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-xl text-sm text-[#F5F5F7] focus:outline-none focus:border-[#E5A93C] transition-colors appearance-none cursor-pointer"
        >
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-[#141416] text-[#F5F5F7]">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
            ESTIMATED BUDGET
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-xl text-sm text-[#F5F5F7] focus:outline-none focus:border-[#E5A93C] transition-colors appearance-none cursor-pointer"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range} className="bg-[#141416] text-[#F5F5F7]">
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
            DESIRED TIMELINE
          </label>
          <input
            type="text"
            placeholder="e.g. Next 2 weeks / ASAP"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-xl text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#E5A93C] transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
          PROJECT DETAILS & FOOTAGE CONTEXT <span className="text-[#E5A93C]">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="Tell me about your video vision, raw footage status, references, or specific delivery goals..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-xl text-sm text-[#F5F5F7] placeholder-[#52525B] focus:outline-none focus:border-[#E5A93C] transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full group py-4 bg-[#E5A93C] hover:bg-[#F5BA52] disabled:opacity-50 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(229,169,60,0.25)] hover:shadow-[0_4px_35px_rgba(229,169,60,0.4)]"
      >
        <span>{isSubmitting ? 'TRANSMITTING BRIEF...' : 'SEND PROJECT INQUIRY'}</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      <p className="text-[11px] font-mono text-center text-[#71717A]">
        Prefer direct messaging? Reach out via{' '}
        <a
          href={`https://wa.me/${portfolioData.contact.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E5A93C] hover:underline"
        >
          WhatsApp
        </a>{' '}
        or{' '}
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="text-[#E5A93C] hover:underline"
        >
          Email
        </a>
        .
      </p>
    </form>
  );
};
