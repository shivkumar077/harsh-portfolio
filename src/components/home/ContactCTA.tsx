import React from 'react';
import { Mail, MessageSquare, ArrowUpRight, HardDrive } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollReveal } from '../ui/ScrollReveal';

export const ContactCTA: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const contact = portfolioData.contact || ({} as any);
  const rawWhatsAppDigits = (contact.whatsappNumber || contact.whatsapp || '').replace(/[^0-9]/g, '');
  const cleanWhatsAppNumber = rawWhatsAppDigits || '15550192834';
  const displayWhatsApp = contact.whatsapp || (rawWhatsAppDigits ? `+${rawWhatsAppDigits}` : '+1 (555) 019-2834');
  const displayEmail = contact.email || 'alex.rivera.edits@gmail.com';

  const gmailDirectUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(displayEmail)}&su=Video%20Editing%20Project%20Inquiry%20-%20${encodeURIComponent(portfolioData.brandName)}`;
  const whatsAppDirectUrl = `https://wa.me/${cleanWhatsAppNumber}?text=Hi%20${encodeURIComponent(portfolioData.brandName)},%20I%20saw%20your%20portfolio%20and%20I'm%20interested%20in%20collaborating%20on%20a%20video%20project.`;

  return (
    <section id="contact" className="py-12 sm:py-20 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[#0D0D0D]/10 relative">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <ScrollReveal direction="down">
            <span className="font-mono text-xs text-[#E63E26] tracking-widest uppercase block font-bold">
              LET'S TALK
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-[#0D0D0D] leading-[1.12]">
              HAVE A PROJECT <br />
              <span className="text-[#0D0D0D]/60">
                IN MIND?
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xs sm:text-base md:text-lg text-[#0D0D0D]/70 font-sans leading-relaxed max-w-2xl mx-auto pt-1 sm:pt-2">
              Reach out directly on WhatsApp or Gmail to discuss your footage, editing style, deadlines, and pricing.
            </p>
          </ScrollReveal>
        </div>

        {/* Direct Action Cards: 2-column on mobile so both sit side-by-side */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 pt-2 sm:pt-4">
          {/* WhatsApp Card */}
          <ScrollReveal delay={0.2}>
            <a
              href={whatsAppDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full bg-[#0D0D0D] text-white border border-[#0D0D0D] hover:border-[#E63E26] rounded-xl sm:rounded-2xl p-3.5 sm:p-8 flex flex-col justify-between space-y-3 sm:space-y-6 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 text-[#E63E26] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-xs font-mono text-[#E63E26] font-bold tracking-wider block uppercase">
                    FASTEST
                  </span>
                  <h3 className="text-sm sm:text-2xl font-display font-bold text-white group-hover:text-[#E63E26] transition-colors truncate">
                    WhatsApp
                  </h3>
                </div>
                <p className="text-[11px] sm:text-sm text-neutral-300 line-clamp-2 sm:line-clamp-none">
                  {displayWhatsApp} — Instant replies for project scopes.
                </p>
              </div>

              <div className="pt-2 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-xs font-mono text-white font-bold">
                <span className="truncate">START CHAT</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </div>
            </a>
          </ScrollReveal>

          {/* Direct Gmail Card */}
          <ScrollReveal delay={0.3}>
            <a
              href={gmailDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full bg-white text-[#0D0D0D] border border-[#0D0D0D]/15 hover:border-[#E63E26] rounded-xl sm:rounded-2xl p-3.5 sm:p-8 flex flex-col justify-between space-y-3 sm:space-y-6 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0D0D0D] text-white flex items-center justify-center">
                  <Mail className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-xs font-mono text-[#0D0D0D]/60 font-bold tracking-wider block uppercase">
                    DIRECT
                  </span>
                  <h3 className="text-sm sm:text-2xl font-display font-bold text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors truncate">
                    Direct Gmail
                  </h3>
                </div>
                <p className="text-[11px] sm:text-sm text-[#0D0D0D]/70 line-clamp-2 sm:line-clamp-none">
                  {displayEmail} — Send footage links & briefs.
                </p>
              </div>

              <div className="pt-2 sm:pt-4 border-t border-[#0D0D0D]/10 flex items-center justify-between text-[9px] sm:text-xs font-mono text-[#0D0D0D] font-bold">
                <span className="truncate">COMPOSE EMAIL</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </div>
            </a>
          </ScrollReveal>
        </div>

        {/* Master Drive Vault Link */}
        <ScrollReveal delay={0.4}>
          <div className="pt-1 sm:pt-2">
            <a
              href={portfolioData.masterDriveFolder || "https://drive.google.com/drive/folders/1-fAPohvDgHQ8tLt3TJAOscRYUVtHhLlL?usp=drive_link"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 sm:p-5 bg-white hover:bg-neutral-50 border border-[#0D0D0D]/10 hover:border-[#E63E26] rounded-xl sm:rounded-2xl flex items-center justify-between w-full transition-all group shadow-sm"
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E63E26] text-white flex items-center justify-center shrink-0">
                  <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-display font-bold text-[#0D0D0D] block">Google Drive Master Archive</span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#0D0D0D]/60 block truncate max-w-[200px] sm:max-w-none">Stream and review uncompressed 4K master deliverables</span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0D0D0D] group-hover:text-[#E63E26] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
