import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, HardDrive, MessageSquare, Mail } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const contact = portfolioData.contact || ({} as any);
  const rawWhatsAppDigits = (contact.whatsappNumber || contact.whatsapp || '').replace(/[^0-9]/g, '');
  const cleanWhatsAppNumber = rawWhatsAppDigits || '15550192834';
  const displayWhatsApp = contact.whatsapp || (rawWhatsAppDigits ? `+${rawWhatsAppDigits}` : '+1 (555) 019-2834');
  const displayEmail = contact.email || 'alex.rivera.edits@gmail.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 w-full bg-[#0D0D0D] border-t border-neutral-800 pt-16 pb-12 text-neutral-400 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-14">
          
          {/* Brand & Profession */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E63E26]" />
              <span className="font-display font-black text-xl md:text-2xl text-white tracking-wider group-hover:text-[#E63E26] transition-colors">
                {portfolioData.brandName.toUpperCase()}
              </span>
            </Link>
            
            <p className="text-xs font-mono tracking-widest text-[#E63E26] uppercase font-bold">
              {portfolioData.profession}
            </p>
            
            <p className="text-sm text-neutral-400 max-w-sm font-sans leading-relaxed">
              Transforming raw footage into high-retention stories, commercial films, and visually compelling digital experiences.
            </p>
            
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#E63E26] animate-pulse" />
              <span>{portfolioData.contact.location}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono tracking-widest text-white uppercase font-bold block">
              SYSTEM ARCHIVES
            </span>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link to="/work" className="hover:text-[#E63E26] transition-colors">
                  All Video Edits
                </Link>
              </li>
              <li>
                <a href="/#services" className="hover:text-[#E63E26] transition-colors">
                  Editing Capabilities
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="hover:text-[#E63E26] transition-colors">
                  Client Reviews & Results
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E63E26] transition-colors">
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E63E26] transition-colors">
                  Connect on WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono tracking-widest text-white uppercase font-bold block">
              DIRECT CHANNELS
            </span>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber}?text=Hi%20${encodeURIComponent(portfolioData.brandName)},%20I'm%20interested%20in%20working%20with%20you%20on%20a%20video%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E63E26] transition-colors flex items-center gap-2.5 group"
                >
                  <MessageSquare className="w-4 h-4 text-[#E63E26]" />
                  <span className="text-xs font-mono text-[#E63E26] font-bold">WHATSAPP:</span>
                  <span className="text-white font-semibold group-hover:underline">{displayWhatsApp}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(displayEmail)}&su=Video%20Editing%20Project%20Inquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E63E26] transition-colors flex items-center gap-2.5 group"
                >
                  <Mail className="w-4 h-4 text-[#E63E26]" />
                  <span className="text-xs font-mono text-[#E63E26] font-bold">GMAIL:</span>
                  <span className="text-white hover:underline">{displayEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={portfolioData.masterDriveFolder || "https://drive.google.com/drive/folders/1-fAPohvDgHQ8tLt3TJAOscRYUVtHhLlL?usp=drive_link"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E63E26] transition-colors flex items-center gap-2.5 group"
                >
                  <HardDrive className="w-4 h-4 text-[#E63E26]" />
                  <span className="text-neutral-300 font-medium group-hover:text-[#E63E26]">Google Drive Master Archive</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Large Architectural Signature Banner */}
        <div className="border-t border-neutral-800/80 pt-6 pb-4 overflow-hidden">
          <div className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-neutral-800/60 hover:text-neutral-700 transition-colors uppercase tracking-tight text-center leading-none">
            {portfolioData.brandName.toUpperCase()}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="border-t border-neutral-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {portfolioData.brandName.toUpperCase()}. ALL RIGHTS RESERVED.</span>
            {import.meta.env.DEV && (
              <>
                <span className="text-neutral-700">•</span>
                <Link to="/customize" className="text-neutral-500 hover:text-[#E63E26] transition-colors underline underline-offset-2">
                  CUSTOMIZE TEMPLATE (DEV ONLY)
                </Link>
              </>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-neutral-400 hover:text-[#E63E26] transition-colors p-2 -mr-2 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#E63E26] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
