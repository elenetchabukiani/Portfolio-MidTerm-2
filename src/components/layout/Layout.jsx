import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Main Layout Component
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
