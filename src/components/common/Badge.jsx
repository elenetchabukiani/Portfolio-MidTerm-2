import React from 'react';

/**
 * Reusable Badge Component
 * @param {'cyan'|'emerald'|'blue'|'amber'|'rose'|'navy'} variant
 * @param {boolean} pulse
 * @param {React.ReactNode} icon
 * @param {string} className
 */
export default function Badge({
  children,
  variant = 'cyan',
  pulse = false,
  icon,
  className = '',
}) {
  const variantStyles = {
    cyan: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40 shadow-glow-cyan',
    emerald: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
    blue: 'bg-blue-950/70 text-blue-300 border-blue-500/40',
    amber: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
    rose: 'bg-rose-950/70 text-rose-300 border-rose-500/40',
    navy: 'bg-navy-800 text-slate-300 border-cyan-500/20',
  };

  const dotColors = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    blue: 'bg-blue-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    navy: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
        variantStyles[variant] || variantStyles.cyan
      } ${className}`}
    >
      {pulse && (
        <span
          className={`w-2 h-2 rounded-full ${
            dotColors[variant] || 'bg-cyan-400'
          } animate-pulse`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
