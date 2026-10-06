import React from 'react';
import { STATUS_CONFIG } from './colors';

/**
 * StatusBadge component showing project execution state
 * @param {Object} props
 * @param {'not_started' | 'in_progress' | 'completed'} props.status
 * @param {string} [props.className]
 */
export default function StatusBadge({ status = 'not_started', className = '' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  );
}
