import React from 'react';
import Badge from './Badge';

/**
 * Reusable Section Header Component
 */
export default function SectionHeader({
  badge,
  badgePulse = true,
  badgeVariant = 'cyan',
  title,
  subtitle,
  action,
  centered = false,
  className = '',
}) {
  return (
    <div
      className={`space-y-3 ${
        centered ? 'text-center max-w-2xl mx-auto' : ''
      } ${className}`}
    >
      {badge && (
        <Badge variant={badgeVariant} pulse={badgePulse}>
          {badge}
        </Badge>
      )}

      <div
        className={`flex flex-col md:flex-row ${
          centered ? 'items-center justify-center' : 'md:items-end md:justify-between'
        } gap-4`}
      >
        <div>
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-400 mt-1.5 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
