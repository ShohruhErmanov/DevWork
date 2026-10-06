import React from 'react';
import { Lock, CheckCircle2, Building2 } from 'lucide-react';
import ProgressBar from './ProgressBar';
import StatusBadge from './StatusBadge';
import DifficultyBadge from './DifficultyBadge';
import TechBadge from './TechBadge';
import { LEVEL_CONFIG } from './colors';

/**
 * ProjectCard component for displaying project information in list grid
 * @param {Object} props
 * @param {Object} props.project - Project entity
 * @param {string} [props.currentUserLevel='intern'] - Current user's tier ('intern' | 'junior' | 'middle' | 'senior')
 * @param {Function} [props.onClick] - Callback when card is clicked
 */
export default function ProjectCard({
  project,
  currentUserLevel = 'intern',
  onClick,
}) {
  const userOrder = LEVEL_CONFIG[currentUserLevel?.toLowerCase()]?.order || 1;
  const projectOrder = LEVEL_CONFIG[project.requiredLevel?.toLowerCase()]?.order || 1;
  const isLocked = userOrder < projectOrder;

  const requiredLevelInfo = LEVEL_CONFIG[project.requiredLevel?.toLowerCase()] || {
    label: project.requiredLevel,
  };

  // Calculate task counts
  const totalTasks = project.tasks?.length || 0;
  const doneTasks = project.tasks?.filter((t) => t.status === 'completed').length || 0;

  // Max 3 technologies visible, "+N" for rest
  const visibleTechs = project.technologies?.slice(0, 3) || [];
  const remainingTechsCount = (project.technologies?.length || 0) - visibleTechs.length;

  const handleClick = (e) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(project.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      tabIndex={isLocked ? -1 : 0}
      role={isLocked ? 'region' : 'button'}
      aria-disabled={isLocked}
      aria-label={`${project.title}${isLocked ? ` (${requiredLevelInfo.label} darajasida ochiladi)` : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 text-left outline-none ${
        isLocked
          ? 'bg-slate-50/80 border-slate-200 opacity-70 cursor-not-allowed select-none dark:bg-slate-900/40 dark:border-slate-800'
          : 'bg-white border-slate-200 hover:border-blue-400/80 hover:shadow-md hover:-translate-y-0.5 cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-500/60'
      }`}
    >
      {/* Top Lock Banner if project is locked */}
      {isLocked && (
        <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] dark:bg-slate-950/40 rounded-xl z-10 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-xs mb-2">
            <Lock className="w-5 h-5 text-slate-600 dark:text-slate-300" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-xs">
            {requiredLevelInfo.label} darajasida ochiladi
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="flex-1">
        {/* Company Header & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {project.company.logo ? (
              <img
                src={project.company.logo}
                alt={project.company.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-slate-500" />
              </div>
            )}
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
              {project.company.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <DifficultyBadge difficulty={project.difficulty} />
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1.5">
          {project.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <ProgressBar progress={project.progress} size="sm" />
        </div>

        {/* Technologies */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {visibleTechs.map((tech) => (
            <TechBadge key={tech.id} name={tech.name} />
          ))}
          {remainingTechsCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              +{remainingTechsCount}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info: Tasks count and Required level badge */}
      <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          <span>
            Vazifalar: <strong className="text-slate-700 dark:text-slate-300 font-medium">{doneTasks}</strong>/{totalTasks}
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
            requiredLevelInfo.badgeBg || 'bg-slate-100 dark:bg-slate-800'
          } ${requiredLevelInfo.badgeText || 'text-slate-700 dark:text-slate-300'}`}
        >
          {requiredLevelInfo.label}
        </span>
      </div>
    </div>
  );
}
