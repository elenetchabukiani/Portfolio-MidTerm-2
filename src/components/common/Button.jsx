import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button Component
 * Supports internal routing (to), external links (href), and standard button clicks.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-sm sm:text-base',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-navy-800/90 hover:bg-navy-700 text-slate-200 hover:text-white border border-cyan-500/25 hover:border-cyan-400 shadow-sm active:translate-y-0',
    danger:
      'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-lg shadow-rose-900/30',
    ghost:
      'bg-transparent hover:bg-cyan-500/10 text-cyan-300 hover:text-cyan-400 border border-cyan-500/20 hover:border-cyan-400',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {!loading && icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
