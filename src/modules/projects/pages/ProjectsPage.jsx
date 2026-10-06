import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useCurrentUser } from '../hooks/useCurrentUser';
import ProjectCard from '../components/ProjectCard';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';
import ProjectFilters from '../components/ProjectFilters';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { userLevel, setUser, user } = useCurrentUser();
  const {
    projects,
    isLoading,
    error,
    filters,
    updateFilters,
    resetFilters,
    toggleTechnology,
    refetch,
  } = useProjects();

  const handleCardClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // Available technologies for filtering extracted from projects or defaults
  const allTechs = ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Axios', 'Vite'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Module Header & User Level Simulator */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-2 rounded-lg bg-blue-600 text-white shadow-xs">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Loyihalar
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Virtual kompaniyadagi loyihalarda ishtirok eting, tajriba to‘plang va yangi darajaga ko‘tariling.
            </p>
          </div>

          {/* Current User Tier Simulator (allows testing lock/unlock logic) */}
          <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              Sizning darajangiz:
            </span>
            <select
              value={userLevel}
              onChange={(e) => setUser((prev) => ({ ...prev, level: e.target.value }))}
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded px-2 py-1 border border-slate-200 dark:border-slate-700 cursor-pointer focus:outline-none"
              title="Testlash uchun talaba darajasini o'zgartiring"
            >
              <option value="intern">Intern</option>
              <option value="junior">Junior</option>
              <option value="middle">Middle</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <ProjectFilters
          search={filters.search}
          onSearchChange={(val) => updateFilters({ search: val })}
          status={filters.status}
          onStatusChange={(val) => updateFilters({ status: val })}
          difficulty={filters.difficulty}
          onDifficultyChange={(val) => updateFilters({ difficulty: val })}
          selectedTechnologies={filters.technologies}
          onTechnologyToggle={toggleTechnology}
          sortBy={filters.sortBy}
          onSortByChange={(val) => updateFilters({ sortBy: val })}
          availableTechnologies={allTechs}
          onResetFilters={resetFilters}
        />

        {/* Content States */}
        {/* 1. Error State */}
        {error && !isLoading && (
          <div className="p-8 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-900/60 dark:bg-rose-950/30 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-rose-900 dark:text-rose-200">
              Ma’lumotlarni yuklab bo‘lmadi
            </h3>
            <p className="text-sm text-rose-600 dark:text-rose-300 max-w-md mx-auto">
              {error}
            </p>
            <button
              type="button"
              onClick={refetch}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              Qaytadan urinish
            </button>
          </div>
        )}

        {/* 2. Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProjectCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !error && projects.length === 0 && (
          <div className="p-12 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3 bg-white/50 dark:bg-slate-900/50">
            <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              <FolderKanban className="w-8 h-8" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Hozircha loyiha yo‘q
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Tanlangan filtrlar bo‘yicha hech qanday loyiha topilmadi. Qidiruv so‘zini o‘zgartiring yoki filtrlarni tozalang.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Barcha filtrlarni tozalash
            </button>
          </div>
        )}

        {/* 4. Projects Grid */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                currentUserLevel={userLevel}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
