import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LumaDotBackground } from './components/layout/LumaDotBackground';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CustomizePage } from './pages/CustomizePage';

// Scroll Restoration on Route Change
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isCustomizeRoute = location.pathname.startsWith('/customize');

  if (isCustomizeRoute) {
    return <CustomizePage />;
  }

  return (
    <div className="relative min-h-screen bg-[#ECEBE8] text-[#0D0D0D] font-sans selection:bg-[#E63E26] selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Full-Site Luminance (Luma) Reactive Dot Background */}
      <LumaDotBackground />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </PortfolioProvider>
  );
};

export default App;
