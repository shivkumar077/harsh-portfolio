import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Eye } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'WORK', path: '/work' },
    { name: 'SERVICES', path: '/#services' },
    { name: 'REVIEWS', path: '/#testimonials' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#ECEBE8]/90 backdrop-blur-md border-b border-[#0D0D0D]/10 shadow-sm'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo with Eye Emblem */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full border border-[#0D0D0D]/40 flex items-center justify-center bg-white group-hover:border-[#E63E26] transition-colors">
              <Eye className="w-3.5 h-3.5 text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-sm sm:text-base tracking-wider text-[#0D0D0D] group-hover:text-[#E63E26] transition-colors">
                  {portfolioData.brandName.toUpperCase()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63E26]" />
              </div>
              <span className="text-[9px] tracking-widest text-[#71717A] uppercase hidden sm:block font-mono">
                {portfolioData.profession.toUpperCase()}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isExternalOrAnchor = link.path.includes('#');
              const isActive = !isExternalOrAnchor && location.pathname === link.path;

              if (isExternalOrAnchor) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-xs font-mono font-bold tracking-widest text-[#0D0D0D]/70 hover:text-[#E63E26] transition-colors py-1 relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E63E26] group-hover:w-full transition-all duration-300" />
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-mono font-bold tracking-widest transition-colors py-1 relative group ${
                    isActive ? 'text-[#0D0D0D] font-black' : 'text-[#0D0D0D]/70 hover:text-[#E63E26]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#E63E26] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold tracking-wider text-white bg-[#0D0D0D] hover:bg-[#E63E26] rounded-full transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0D0D0D] hover:text-[#E63E26] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-[#ECEBE8]/98 backdrop-blur-2xl md:hidden pt-24 px-6 pb-10 flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-[11px] font-mono tracking-widest text-[#71717A] uppercase font-bold">
                NAVIGATION
              </span>
              <div className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display font-black tracking-tight text-[#0D0D0D] hover:text-[#E63E26] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-5 pt-6 border-t border-[#0D0D0D]/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0D0D0D]/70 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E63E26]" />
                <span>{portfolioData.contact.availability}</span>
              </div>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0D0D0D] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-md"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
