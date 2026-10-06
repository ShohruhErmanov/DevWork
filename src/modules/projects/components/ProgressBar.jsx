import React from 'react';

/**
 * ProgressBar component displaying progress between 0 and 100%
 * @param {Object} props
 * @param {number} props.progress - Value between 0 and 100
 * @param {boolean} [props.showLabel=true] - Whether to show the percentage text
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Height size of the bar
 * @param {string} [props.className] - Additional wrapper classes
 */
export default function ProgressBar({
  progress = 0,
  showLabel = true,
  size = 'md',
  className = '',
}) {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-xs font-medium',
    lg: 'text-sm font-semibold',
  };

  // Dynamic progress fill color based on achievement
  const getFillColor = (val) => {
    if (val >= 100) return 'bg-emerald-500 dark:bg-emerald-400';
    if (val > 0) return 'bg-blue-600 dark:bg-blue-500';
    return 'bg-slate-300 dark:bg-slate-700';
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className={`${textClasses[size]} text-slate-600 dark:text-slate-400`}>
            Progress
          </span>
          <span className={`${textClasses[size]} text-slate-900 dark:text-slate-100 tabular-nums`}>
            {clampedProgress}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${sizeClasses[size] || sizeClasses.md} ${getFillColor(
            clampedProgress
          )} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
