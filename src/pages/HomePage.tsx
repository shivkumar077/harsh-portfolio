import React from 'react';
import { Hero } from '../components/home/Hero';
import { AboutIntroduction } from '../components/home/AboutIntroduction';
import { SelectedWork } from '../components/home/SelectedWork';
import { BeforeAfterSection } from '../components/home/BeforeAfterSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { ResultsSection } from '../components/home/ResultsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactCTA } from '../components/home/ContactCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      <AboutIntroduction />
      <SelectedWork />
      <BeforeAfterSection />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <TestimonialsSection />
      <ContactCTA />
    </div>
  );
};
