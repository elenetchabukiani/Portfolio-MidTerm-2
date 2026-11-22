import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Reusable Search Bar Component with real-time input and clear button
 */
export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'ძებნა...',
  className = '',
}) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4 text-cyan-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
          aria-label="გასუფთავება"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
