import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { path: '/', label: 'მთავარი' },
  { path: '/about', label: 'ჩემ შესახებ' },
  { path: '/services', label: 'სერვისები' },
  { path: '/projects', label: 'პროექტები' },
  { path: '/blog', label: 'ბლოგი' },
  { path: '/employees', label: 'თანამშრომლები' },
  { path: '/contact', label: 'კონტაქტი' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 py-10 border-t border-cyan-500/15 text-center mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <p className="text-sm text-slate-400 font-normal">
          &copy; 2026 ელენე ჭაბუკიანი. ყველა უფლება დაცულია. (React 18 &amp; React Router v6)
        </p>
        <p className="text-xs sm:text-sm text-slate-500 font-medium space-x-1.5 flex flex-wrap items-center justify-center">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.path}>
              <Link
                to={link.path}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="text-slate-700">·</span>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>
    </footer>
  );
}
