import React from 'react';

/**
 * Reusable Card Component
 * Provides unified dark-navy background, neon borders, and hover micro-interactions.
 */
export default function Card({
  children,
  title,
  subtitle,
  icon,
  badge,
  footer,
  className = '',
  hoverable = true,
  onClick,
}) {
  return (
    <article
      onClick={onClick}
      className={`group bg-navy-850/80 rounded-3xl p-6 sm:p-7 border border-cyan-500/15 shadow-card-dark ${
        hoverable
          ? 'hover:shadow-card-hover hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300'
          : ''
      } flex flex-col justify-between relative overflow-hidden ${className}`}
    >
      <div>
        {/* Card Header */}
        {(icon || title || badge) && (
          <header className="mb-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-glow-cyan transition-all">
                    {icon}
                  </div>
                )}
                {title && (
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {title}
                    </h3>
                    {subtitle && (
                      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                    )}
                  </div>
                )}
              </div>
              {badge && <div className="shrink-0">{badge}</div>}
            </div>
          </header>
        )}

        {/* Card Body */}
        <div className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </div>

      {/* Card Footer */}
      {footer && (
        <footer className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between gap-2 text-xs font-semibold text-cyan-400">
          {footer}
        </footer>
      )}
    </article>
  );
}
