import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase } from 'lucide-react';

export const ServicesTab: React.FC = () => {
  const { data, updateField } = usePortfolio();

  const handleServiceChange = (index: number, field: string, val: any) => {
    const updated = [...data.services];
    updated[index] = { ...updated[index], [field]: val };
    updateField('services', updated);
  };

  const handleTagChange = (serviceIndex: number, tagIndex: number, val: string) => {
    const updated = [...data.services];
    const tags = [...updated[serviceIndex].tags];
    tags[tagIndex] = val;
    updated[serviceIndex] = { ...updated[serviceIndex], tags };
    updateField('services', updated);
  };

  const addTag = (serviceIndex: number) => {
    const updated = [...data.services];
    updated[serviceIndex] = {
      ...updated[serviceIndex],
      tags: [...updated[serviceIndex].tags, 'New Deliverable'],
    };
    updateField('services', updated);
  };

  const removeTag = (serviceIndex: number, tagIndex: number) => {
    const updated = [...data.services];
    const tags = updated[serviceIndex].tags.filter((_, i) => i !== tagIndex);
    updated[serviceIndex] = { ...updated[serviceIndex], tags };
    updateField('services', updated);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-black text-[#0D0D0D] uppercase tracking-tight flex items-center gap-2.5">
          <Briefcase className="w-5 h-5 text-[#E63E26]" />
          <span>Services & Packages</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans mt-1">
          Define the packages, deliverables, and capabilities you offer to creator clients and commercial agencies.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        {data.services.map((service, sIdx) => (
          <div
            key={sIdx}
            className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="font-mono text-xs font-bold text-[#E63E26]">
                SERVICE {service.number || `0${sIdx + 1}`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => handleServiceChange(sIdx, 'title', e.target.value)}
                  placeholder="e.g. COMMERCIAL EDITING"
                  className="w-full px-3.5 py-2 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans font-bold text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1">
                  Subtitle / Value Prop
                </label>
                <input
                  type="text"
                  value={service.subtitle}
                  onChange={(e) => handleServiceChange(sIdx, 'subtitle', e.target.value)}
                  placeholder="e.g. Brand & Product Impact"
                  className="w-full px-3.5 py-2 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={service.description}
                onChange={(e) => handleServiceChange(sIdx, 'description', e.target.value)}
                placeholder="What clients get with this service..."
                className="w-full px-3.5 py-2 bg-[#F4F4F5] border border-[#0D0D0D]/15 rounded-xl text-xs sm:text-sm font-sans text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
              />
            </div>

            {/* Tags / Deliverables */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold text-[#0D0D0D] uppercase">
                  Included Deliverables / Tags
                </label>
                <button
                  type="button"
                  onClick={() => addTag(sIdx)}
                  className="text-xs font-mono font-bold text-[#E63E26] hover:underline"
                >
                  + Add Tag
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, tIdx) => (
                  <div
                    key={tIdx}
                    className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-xs font-mono"
                  >
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleTagChange(sIdx, tIdx, e.target.value)}
                      className="bg-transparent border-0 focus:outline-none text-neutral-800 font-medium w-28 sm:w-36"
                    />
                    <button
                      type="button"
                      onClick={() => removeTag(sIdx, tIdx)}
                      className="text-neutral-400 hover:text-red-500"
                      title="Remove tag"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
