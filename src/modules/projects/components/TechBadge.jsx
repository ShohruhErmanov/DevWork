import React from 'react';

/**
 * TechBadge component for showing technology tags (React, Vite, TS, etc.)
 * @param {Object} props
 * @param {string} props.name - Name of technology
 * @param {string} [props.className]
 */
export default function TechBadge({ name, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/80 transition-colors ${className}`}
    >
      {name}
    </span>
  );
}
