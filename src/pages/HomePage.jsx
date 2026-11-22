import React from 'react';
import HeroSection from '../components/home/HeroSection';
import QuickOverview from '../components/home/QuickOverview';

/**
 * Home Page Component
 * Cleanly split into reusable, modular sub-components.
 */
export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-14">
      <HeroSection />
      <QuickOverview />
    </div>
  );
}
