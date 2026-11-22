import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'მთავარი' },
  { path: '/about', label: 'ჩემ შესახებ' },
  { path: '/services', label: 'სერვისები' },
  { path: '/projects', label: 'პროექტები' },
  { path: '/blog', label: 'ბლოგი' },
  { path: '/employees', label: 'თანამშრომლები' },
  { path: '/contact', label: 'კონტაქტი' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close on resize to desktop width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0B1120]/85 backdrop-blur-xl border-b border-cyan-500/15 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-cyan-400/80 shadow-glow-cyan group-hover:scale-105 group-hover:rotate-2 transition-all bg-navy-850">
            <img
              src="/download.jpg"
              alt="ელენე ჭაბუკიანი"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://ui-avatars.com/api/?name=Elene+Chabukiani&background=0284c7&color=fff';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              ელენე ჭაბუკიანი
            </span>
            <span className="text-xs font-medium text-cyan-300/80">
              <strong className="font-medium text-cyan-400">
                Junior Web Developer / ვებ-დეველოპერი
              </strong>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="მთავარი ნავიგაცია" className="hidden lg:block">
          <ul className="inline-flex items-center p-1 rounded-full bg-navy-850/90 border border-cyan-500/20 shadow-lg text-xs xl:text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'inline-block px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-glow-cyan'
                      : 'inline-block px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-cyan-500/10 font-medium transition-all'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile / Tablet Burger Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-navy-850 border border-cyan-500/20 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all shadow-md cursor-pointer"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 transition-transform text-cyan-400" />
          ) : (
            <Menu className="w-6 h-6 transition-transform" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-cyan-500/20 bg-[#0B1120]/98 backdrop-blur-2xl px-4 pt-3 pb-5 shadow-2xl transition-all animate-fadeIn"
        >
          <ul className="flex flex-col space-y-1.5 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                      : 'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-navy-850 transition-all'
                  }
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
