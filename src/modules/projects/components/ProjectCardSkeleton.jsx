import React from 'react';

/**
 * Skeleton loading card for projects list
 */
export default function ProjectCardSkeleton() {
  return (
    <div
      className="flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs animate-pulse"
      aria-hidden="true"
    >
      <div>
        {/* Top bar: company logo & status badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="w-24 h-3.5 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="w-20 h-5 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Project Title */}
        <div className="w-3/4 h-5 rounded bg-slate-200 dark:bg-slate-800 mb-2.5" />

        {/* Description lines */}
        <div className="space-y-2 mb-5">
          <div className="w-full h-3.5 rounded bg-slate-100 dark:bg-slate-800/60" />
          <div className="w-4/5 h-3.5 rounded bg-slate-100 dark:bg-slate-800/60" />
        </div>

        {/* Progress Bar Skeleton */}
        <div className="mb-5 space-y-1.5">
          <div className="flex justify-between">
            <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="w-8 h-3 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Tech tags skeleton */}
        <div className="flex items-center gap-1.5 flex-wrap mb-5">
          <div className="w-14 h-5 rounded-md bg-slate-100 dark:bg-slate-800" />
          <div className="w-16 h-5 rounded-md bg-slate-100 dark:bg-slate-800" />
          <div className="w-12 h-5 rounded-md bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>

      {/* Footer: tasks count & required level */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="w-20 h-3.5 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="w-16 h-5 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
