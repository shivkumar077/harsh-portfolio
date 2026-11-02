import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { TestimonialItem } from '../../types/portfolio';
import { 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  MessageSquare, 
  Sparkles, 
  TrendingUp, 
  User, 
  Briefcase 
} from 'lucide-react';

export const TestimonialsTab: React.FC = () => {
  const { data, addTestimonial, updateTestimonial, removeTestimonial } = usePortfolio();
  const testimonials = data.testimonials || [];

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<TestimonialItem>({
    id: '',
    author: '',
    clientName: '',
    role: '',
    clientRole: '',
    company: '',
    quote: '',
    content: '',
    metric: '',
  });

  const handleStartAdd = () => {
    setFormData({
      id: `t-${Date.now()}`,
      author: '',
      clientName: '',
      role: '',
      clientRole: '',
      company: '',
      quote: '',
      content: '',
      metric: '5-Star Quality',
    });
    setIsAddingNew(true);
    setEditingIndex(null);
  };

  const handleStartEdit = (index: number) => {
    const item = testimonials[index];
    setFormData({
      id: item.id || `t-${Date.now()}`,
      author: item.author || item.clientName || '',
      clientName: item.clientName || item.author || '',
      role: item.role || item.clientRole || '',
      clientRole: item.clientRole || item.role || '',
      company: item.company || '',
      quote: item.quote || item.content || '',
      content: item.content || item.quote || '',
      metric: item.metric || '',
    });
    setEditingIndex(index);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingIndex(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author?.trim() || !formData.quote?.trim()) {
      alert('Please fill in both the client name and testimonial review text.');
      return;
    }

    const cleanedItem: TestimonialItem = {
      id: formData.id || `t-${Date.now()}`,
      author: formData.author.trim(),
      clientName: formData.author.trim(),
      role: formData.role?.trim() || 'Client',
      clientRole: formData.role?.trim() || 'Client',
      company: formData.company?.trim() || '',
      quote: formData.quote.trim(),
      content: formData.quote.trim(),
      metric: formData.metric?.trim() || 'Verified Client',
    };

    if (isAddingNew) {
      addTestimonial(cleanedItem);
      setIsAddingNew(false);
    } else if (editingIndex !== null) {
      updateTestimonial(editingIndex, cleanedItem);
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number, name: string) => {
    if (window.confirm(`Are you sure you want to remove the review from ${name || 'this client'}?`)) {
      removeTestimonial(index);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[#0D0D0D] uppercase tracking-tight flex items-center gap-2.5">
            <Star className="w-5 h-5 text-[#E63E26] fill-[#E63E26]" />
            <span>Client Reviews & Social Proof</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans mt-1">
            Manage client testimonials displayed in the homepage animated review ticker. Positive reviews and metric badges build immediate client trust.
          </p>
        </div>

        {!isAddingNew && editingIndex === null && (
          <button
            type="button"
            onClick={handleStartAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-md self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
          </button>
        )}
      </div>

      {/* Editor Form (Modal / Inline card) */}
      {(isAddingNew || editingIndex !== null) && (
        <form onSubmit={handleSave} className="p-6 bg-white border-2 border-[#E63E26] rounded-2xl shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#0D0D0D]/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E63E26] animate-pulse" />
              <h3 className="font-display font-black text-sm uppercase tracking-wide text-[#0D0D0D]">
                {isAddingNew ? 'Add Client Testimonial' : 'Edit Testimonial'}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1.5 text-neutral-400 hover:text-[#0D0D0D] rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Client Name */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#E63E26]" />
                <span>Client Name *</span>
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value, clientName: e.target.value })}
                placeholder="e.g. David Chen"
                className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
              />
            </div>

            {/* Client Role / Channel */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#E63E26]" />
                <span>Role / Channel (e.g. YouTube Creator 500K)</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value, clientRole: e.target.value })}
                placeholder="e.g. YouTube Creator (450K+ Subs)"
                className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
              />
            </div>

            {/* Company / Brand Name */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5">
                Company / Channel Brand
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Horizon Agency or Vance Media"
                className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
              />
            </div>

            {/* Metric / Result Tag */}
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#E63E26]" />
                <span>Result Badge Tag</span>
              </label>
              <input
                type="text"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                placeholder="e.g. 600K+ Views on Reel, 3.2x ROAS, 24h Delivery"
                className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
              />
            </div>
          </div>

          {/* Testimonial Quote Text */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>Review / Testimonial Text *</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value, content: e.target.value })}
              placeholder="What did the client say about your editing speed, retention pacing, color grading, or results?"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26] resize-none"
            />
          </div>

          {/* Live Card Preview Inside Editor */}
          <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200 space-y-2">
            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
              Live Review Card Preview:
            </span>
            <div className="bg-white border border-[#0D0D0D]/15 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-0.5 text-[#E63E26]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E63E26] text-[#E63E26]" />
                  ))}
                </div>
                {formData.metric && (
                  <span className="px-2 py-0.5 bg-[#0D0D0D]/5 border border-[#0D0D0D]/10 rounded-md text-[10px] font-mono font-bold text-[#0D0D0D]">
                    {formData.metric}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#0D0D0D]/80 italic">
                "{formData.quote || 'Your client testimonial quote will appear here...'}"
              </p>
              <div className="flex items-center gap-2.5 pt-1 border-t border-[#0D0D0D]/10 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                  {(formData.author || 'C').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h5 className="font-display font-bold text-xs text-[#0D0D0D]">
                    {formData.author || 'Client Name'}
                  </h5>
                  <p className="text-[11px] text-neutral-500">
                    {formData.role || 'Role / Brand'} {formData.company ? `• ${formData.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-[#0D0D0D]/20 hover:bg-neutral-100 text-[#0D0D0D] text-xs font-mono font-bold uppercase rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#E63E26] hover:bg-black text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>{isAddingNew ? 'Add Review' : 'Save Review'}</span>
            </button>
          </div>
        </form>
      )}

      {/* List of Existing Reviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider">
            Active Reviews ({testimonials.length})
          </h3>
          <span className="text-[11px] font-sans text-neutral-500">
            Hover to view • Displayed on homepage
          </span>
        </div>

        {testimonials.length === 0 ? (
          <div className="p-8 bg-white border border-dashed border-[#0D0D0D]/20 rounded-2xl text-center space-y-3">
            <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-sm font-sans text-neutral-600">
              No testimonials yet. Add your first client review to show social proof on the website!
            </p>
            <button
              type="button"
              onClick={handleStartAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D0D0D] hover:bg-[#E63E26] text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your First Review</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((item, index) => {
              const name = item.author || item.clientName || 'Client';
              const role = item.role || item.clientRole || '';
              const quote = item.quote || item.content || '';
              const metric = item.metric || '';

              return (
                <div
                  key={item.id || index}
                  className="p-5 bg-white border border-[#0D0D0D]/10 hover:border-[#E63E26] rounded-2xl shadow-sm space-y-3.5 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-2.5">
                    {/* Card Top: Stars & Metric */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5 text-[#E63E26]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E63E26] text-[#E63E26]" />
                        ))}
                      </div>
                      {metric && (
                        <span className="px-2 py-0.5 bg-[#0D0D0D]/5 border border-[#0D0D0D]/10 rounded-md text-[10px] font-mono font-bold text-[#0D0D0D]">
                          {metric}
                        </span>
                      )}
                    </div>

                    {/* Quote Text */}
                    <p className="text-xs text-[#0D0D0D]/80 font-sans leading-relaxed line-clamp-3">
                      "{quote}"
                    </p>
                  </div>

                  {/* Card Bottom: Client Info & Action Buttons */}
                  <div className="pt-3 border-t border-[#0D0D0D]/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                        {name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-xs text-[#0D0D0D] truncate">
                          {name}
                        </h4>
                        <p className="text-[10px] font-sans text-neutral-500 truncate">
                          {role} {item.company ? `• ${item.company}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(index)}
                        className="p-1.5 text-neutral-500 hover:text-[#0D0D0D] hover:bg-neutral-100 rounded-lg transition-colors"
                        title="Edit Review"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(index, name)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Helpful Selling / Creator Tips */}
      <div className="p-5 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0D0D0D] uppercase">
          <Sparkles className="w-4 h-4 text-[#E63E26]" />
          <span>Pro Tip for Video Editors</span>
        </div>
        <p className="text-xs text-neutral-600 font-sans leading-relaxed">
          The highest-converting reviews for video editors emphasize <strong>concrete outcomes</strong> rather than just "great work". For example: <em>"Helped us achieve 3.2x ROAS on TikTok ads"</em> or <em>"Average watch time jumped 42%"</em> or <em>"Never missed a 24-hour turnaround deadline"</em>. Use the <strong>Result Badge Tag</strong> to highlight these key numbers!
        </p>
      </div>
    </div>
  );
};
