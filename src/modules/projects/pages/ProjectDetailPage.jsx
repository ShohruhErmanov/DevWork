import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ArrowLeft,
  Calendar,
  Building2,
  Play,
  ArrowRight,
  Check,
  AlertCircle,
  Award,
} from 'lucide-react';
import { useProject } from '../hooks/useProject';
import StatusBadge from '../components/StatusBadge';
import DifficultyBadge from '../components/DifficultyBadge';
import ProgressBar from '../components/ProgressBar';
import ProjectTabs from '../components/ProjectTabs';
import { LEVEL_CONFIG } from '../components/colors';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { project, isLoading, error, isStarting, startProject } = useProject(id);
  const [activeTab, setActiveTab] = useState('overview');

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="w-48 h-4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-1/2 h-8 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="w-1/3 h-4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  // 404 Not Found State
  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
          <div className="inline-flex p-3 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Loyiha topilmadi (404)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Siz qidirayotgan loyiha mavjud emas yoki o‘chirilgan bo‘lishi mumkin.
          </p>
          <div className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Loyihalar ro‘yxatiga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const levelInfo = LEVEL_CONFIG[project.requiredLevel?.toLowerCase()] || {
    label: project.requiredLevel,
  };

  const isCompleted = project.status === 'completed';
  const isInProgress = project.status === 'in_progress';
  const isNotStarted = project.status === 'not_started';

  const handleAction = async () => {
    if (isNotStarted) {
      await startProject();
    } else if (isInProgress) {
      // Continue project: go to tasks tab or task board
      setActiveTab('tasks');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          <Link
            to="/projects"
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-0.5" />
            Loyihalar
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
          <span className="text-slate-800 dark:text-slate-200 truncate max-w-xs font-semibold">
            {project.title}
          </span>
        </nav>

        {/* Project Header Banner */}
        <header className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-3 min-w-0 flex-1">
              {/* Company & Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2">
                  {project.company.logo ? (
                    <img
                      src={project.company.logo}
                      alt={project.company.name}
                      className="w-6 h-6 rounded-md object-cover border border-slate-100 dark:border-slate-800"
                    />
                  ) : (
                    <Building2 className="w-5 h-5 text-slate-400" />
                  )}
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {project.company.name}
                  </span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <StatusBadge status={project.status} />
                <DifficultyBadge difficulty={project.difficulty} />
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    levelInfo.badgeBg || 'bg-slate-100 dark:bg-slate-800'
                  } ${levelInfo.badgeText || 'text-slate-700 dark:text-slate-300'}`}
                >
                  {levelInfo.label} darajasi
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {project.title}
              </h1>

              {/* Meta: Deadline & XP Reward */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Muddati: {project.deadline}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>+{project.xpReward} umumiy XP</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="shrink-0 flex items-center">
              {isNotStarted && (
                <button
                  type="button"
                  disabled={isStarting}
                  onClick={handleAction}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all disabled:opacity-70 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  {isStarting ? 'Boshlanmoqda...' : 'Loyihani boshlash'}
                </button>
              )}

              {isInProgress && (
                <button
                  type="button"
                  onClick={handleAction}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  Davom ettirish
                </button>
              )}

              {isCompleted && (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-sm cursor-not-allowed border border-slate-200 dark:border-slate-700"
                >
                  <Check className="w-4 h-4" />
                  Tugallangan
                </button>
              )}
            </div>
          </div>

          {/* Big Progress Bar */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <ProgressBar progress={project.progress} size="lg" showLabel={true} />
          </div>
        </header>

        {/* Content Tabs (Overview | Technologies | Tasks | Team) */}
        <section aria-label="Loyiha tafsilotlari">
          <ProjectTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            project={project}
          />
        </section>
      </div>
    </div>
  );
}
