import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal Component
 * Handles Backdrop Blur, Escape key dismiss, and smooth animations.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  maxWidth = 'max-w-2xl',
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md p-4 flex items-center justify-center transition-all animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] flex flex-col rounded-3xl bg-[#0E172A] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl text-left`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-navy-800 text-slate-400 hover:text-white hover:bg-navy-700 flex items-center justify-center transition-all cursor-pointer"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        {(title || badge || subtitle) && (
          <div className="space-y-2 mb-5 shrink-0 pr-10">
            {badge && <div>{badge}</div>}
            {title && (
              <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
            )}
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
        )}

        {/* Modal Content */}
        <div className="overflow-y-auto pr-1 flex-1">{children}</div>
      </div>
    </div>
  );
}
