import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Phone, Mail, Globe, HardDrive, MapPin, Clock, Video, ArrowUpRight, MessageSquare, Eye } from 'lucide-react';

export const ContactSocialsTab: React.FC = () => {
  const { data, updateData } = usePortfolio();
  const contact = data.contact;

  const handleContactChange = (field: keyof typeof contact, val: string) => {
    updateData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: val,
      },
    }));
  };

  const handleWhatsAppNumberChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '');
    updateData((prev) => {
      const prevDigits = (prev.contact.whatsappNumber || '').replace(/[^0-9]/g, '');
      const prevDisplay = (prev.contact.whatsapp || '').replace(/[^0-9]/g, '');
      const shouldSyncDisplay = !prev.contact.whatsapp || prevDisplay === prevDigits;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          whatsappNumber: digits,
          whatsapp: shouldSyncDisplay ? (digits ? `+${digits}` : '') : prev.contact.whatsapp,
        },
      };
    });
  };

  const handleWhatsAppTextChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '');
    updateData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        whatsapp: text,
        whatsappNumber: digits || prev.contact.whatsappNumber,
      },
    }));
  };

  const isEmailValid = !contact.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-black text-[#0D0D0D] uppercase tracking-tight flex items-center gap-2.5">
          <Phone className="w-5 h-5 text-[#E63E26]" />
          <span>Contact Channels & Social Media</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#0D0D0D]/70 font-sans mt-1">
          Direct communication channels so prospective clients can book your editing services immediately via WhatsApp, Gmail, or your social accounts.
        </p>
      </div>

      {/* Primary Channels: Email & WhatsApp */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-5">
        <h3 className="text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider">
          Primary Direct Channels
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>Email Address (Gmail / Business) *</span>
            </label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              placeholder="editor@example.com"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
            {!isEmailValid && (
              <span className="text-[11px] font-sans text-red-500 mt-1 block">
                Please enter a valid email address.
              </span>
            )}
          </div>

          {/* WhatsApp Raw Number (For wa.me links) */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>WhatsApp Number (For Direct Chat Links) *</span>
            </label>
            <input
              type="text"
              value={contact.whatsappNumber}
              onChange={(e) => handleWhatsAppNumberChange(e.target.value)}
              placeholder="e.g. 15551234567 or 447911123456"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
            <span className="text-[11px] font-sans text-neutral-500 mt-1 block">
              Numbers only with country code (e.g. <code>15551234567</code> or <code>447911123456</code>).
            </span>
          </div>

          {/* WhatsApp Display Text */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5">
              WhatsApp Display Text (Readable on website)
            </label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => handleWhatsAppTextChange(e.target.value)}
              placeholder="e.g. +1 (555) 123-4567 or +44 7911 123456"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
            <span className="text-[11px] font-sans text-neutral-500 mt-1 block">
              The phone text clients see on the contact cards.
            </span>
          </div>

          {/* Master Google Drive Archive Link */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>Master Google Drive Archive Link</span>
            </label>
            <input
              type="text"
              value={data.masterDriveFolder || ''}
              onChange={(e) => updateData((prev) => ({ ...prev, masterDriveFolder: e.target.value }))}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
            <span className="text-[11px] font-sans text-neutral-500 mt-1 block">
              Your public folder for 4K video deliveries and raw project vaults.
            </span>
          </div>
        </div>
      </div>

      {/* Social Media Profiles */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-5">
        <h3 className="text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider">
          Social Networks
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Instagram */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>Instagram Profile URL</span>
            </label>
            <input
              type="text"
              value={contact.instagramUrl}
              onChange={(e) => handleContactChange('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/yourhandle"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5">
              Instagram Handle
            </label>
            <input
              type="text"
              value={contact.instagram}
              onChange={(e) => handleContactChange('instagram', e.target.value)}
              placeholder="@yourhandle"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="text"
              value={contact.linkedinUrl}
              onChange={(e) => handleContactChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1.5 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>YouTube Channel URL</span>
            </label>
            <input
              type="text"
              value={contact.youtubeUrl || ''}
              onChange={(e) => handleContactChange('youtubeUrl', e.target.value)}
              placeholder="https://youtube.com/@yourchannel"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>
        </div>
      </div>

      {/* Location & Availability Status */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider">
          Location & Status Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>Location Badge Text</span>
            </label>
            <input
              type="text"
              value={contact.location}
              onChange={(e) => handleContactChange('location', e.target.value)}
              placeholder="e.g. BASED IN LONDON — AVAILABLE GLOBALLY"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#0D0D0D] uppercase mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E63E26]" />
              <span>Availability Badge Text</span>
            </label>
            <input
              type="text"
              value={contact.availability}
              onChange={(e) => handleContactChange('availability', e.target.value)}
              placeholder="e.g. AVAILABLE FOR PROJECTS — 2026"
              className="w-full px-3.5 py-2.5 bg-[#F4F4F5] border border-[#0D0D0D]/20 rounded-xl text-xs sm:text-sm font-mono text-[#0D0D0D] focus:outline-none focus:border-[#E63E26]"
            />
          </div>
        </div>
      </div>

      {/* Live Preview: Direct Channels as Visitors See Them */}
      <div className="p-6 bg-white border border-[#0D0D0D]/10 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-[#0D0D0D] uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-[#E63E26]" />
            <span>Live Contact Cards Preview (Instant Feedback)</span>
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
            REALTIME
          </span>
        </div>
        <p className="text-xs text-neutral-500 font-sans">
          This is exactly how your contact buttons look on your live website. Any change you make above updates immediately.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* WhatsApp Card Preview */}
          <div className="bg-[#0D0D0D] text-white rounded-xl p-4 flex flex-col justify-between space-y-3 border border-neutral-800">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-[#E63E26] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#E63E26] font-bold tracking-wider block uppercase">
                  FASTEST
                </span>
                <h4 className="text-base font-display font-bold text-white">
                  WhatsApp
                </h4>
              </div>
              <p className="text-xs text-neutral-300">
                Direct 1-on-1 chat at <strong className="text-white">{contact.whatsapp || (contact.whatsappNumber ? `+${contact.whatsappNumber}` : '+1 (555) 019-2834')}</strong>
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white font-bold">
              <span>OPEN CHAT (wa.me/{contact.whatsappNumber || '15550192834'})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Gmail Card Preview */}
          <div className="bg-white text-[#0D0D0D] rounded-xl p-4 flex flex-col justify-between space-y-3 border border-neutral-300">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D0D0D] text-white flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#0D0D0D]/60 font-bold tracking-wider block uppercase">
                  DIRECT EMAIL
                </span>
                <h4 className="text-base font-display font-bold text-[#0D0D0D]">
                  Direct Gmail
                </h4>
              </div>
              <p className="text-xs text-neutral-700">
                Write directly to <strong className="text-[#0D0D0D]">{contact.email || 'alex.rivera.edits@gmail.com'}</strong>
              </p>
            </div>
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-[#0D0D0D] font-bold">
              <span>COMPOSE GMAIL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
