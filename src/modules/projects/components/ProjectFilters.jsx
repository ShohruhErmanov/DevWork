import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

/**
 * ProjectFilters component for searching, filtering, and sorting projects
 * @param {Object} props
 * @param {string} props.search
 * @param {Function} props.onSearchChange
 * @param {string} props.status
 * @param {Function} props.onStatusChange
 * @param {string} props.difficulty
 * @param {Function} props.onDifficultyChange
 * @param {string[]} props.selectedTechnologies
 * @param {Function} props.onTechnologyToggle
 * @param {string} props.sortBy
 * @param {Function} props.onSortByChange
 * @param {string[]} [props.availableTechnologies]
 * @param {Function} [props.onResetFilters]
 */
export default function ProjectFilters({
  search = '',
  onSearchChange,
  status = 'all',
  onStatusChange,
  difficulty = 'all',
  onDifficultyChange,
  selectedTechnologies = [],
  onTechnologyToggle,
  sortBy = 'newest',
  onSortByChange,
  availableTechnologies = ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Axios', 'Vite'],
  onResetFilters,
}) {
  const hasActiveFilters =
    Boolean(search) ||
    status !== 'all' ||
    difficulty !== 'all' ||
    selectedTechnologies.length > 0 ||
    sortBy !== 'newest';

  return (
    <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs">
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Loyiha nomi, kompaniya yoki tavsifi bo'yicha qidirish..."
            className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Qidiruvni tozalash"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              aria-label="Loyihalarni saralash"
              className="pl-8 pr-8 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-colors appearance-none"
            >
              <option value="newest">Eng yangi</option>
              <option value="progress">Progress bo‘yicha</option>
              <option value="difficulty">Qiyinlik bo‘yicha</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-3 py-2 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              Tozalash
            </button>
          )}
        </div>
      </div>

      {/* Middle Row: Status and Difficulty Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Status:</span>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'not_started', label: 'Boshlanmagan' },
              { id: 'in_progress', label: 'Jarayonda' },
              { id: 'completed', label: 'Tugallangan' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => onStatusChange(st.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  status === st.id
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Qiyinlik:</span>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'easy', label: 'Oson' },
              { id: 'medium', label: 'O‘rta' },
              { id: 'hard', label: 'Qiyin' },
            ].map((df) => (
              <button
                key={df.id}
                type="button"
                onClick={() => onDifficultyChange(df.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  difficulty === df.id
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {df.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Technology Multi-select Tags */}
      {availableTechnologies.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            Texnologiyalar:
          </span>
          {availableTechnologies.map((tech) => {
            const isSelected = selectedTechnologies.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => onTechnologyToggle && onTechnologyToggle(tech)}
                aria-pressed={isSelected}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all border ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800'
                }`}
              >
                {tech}
                {isSelected && <span className="ml-1 font-bold">×</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
