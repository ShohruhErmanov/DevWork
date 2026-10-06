import React from 'react';
import { DIFFICULTY_CONFIG } from './colors';

/**
 * DifficultyBadge component showing project complexity (Oson, O'rta, Qiyin)
 * @param {Object} props
 * @param {'easy' | 'medium' | 'hard'} props.difficulty
 * @param {string} [props.className]
 */
export default function DifficultyBadge({ difficulty = 'easy', className = '' }) {
  const config = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      {config.label}
    </span>
  );
}
