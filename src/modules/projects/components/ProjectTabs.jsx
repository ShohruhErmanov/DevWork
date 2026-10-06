import React, { useRef } from 'react';
import {
  BookOpen,
  Cpu,
  CheckSquare,
  Users,
  Target,
  GraduationCap,
  Award,
  ExternalLink,
  Code2,
} from 'lucide-react';
import TechBadge from './TechBadge';

const TABS = [
  { id: 'overview', label: 'Umumiy ma’lumot', icon: BookOpen },
  { id: 'technologies', label: 'Texnologiyalar', icon: Cpu },
  { id: 'tasks', label: 'Vazifalar', icon: CheckSquare },
  { id: 'team', label: 'Jamoa', icon: Users },
];

/**
 * ProjectTabs component with accessible keyboard navigation (WAI-ARIA tabs pattern)
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab ID
 * @param {Function} props.onTabChange - Callback on tab selection
 * @param {Object} props.project - Current project object
 */
export default function ProjectTabs({
  activeTab = 'overview',
  onTabChange,
  project,
}) {
  const tabRefs = useRef({});

  // Keyboard navigation support: ArrowLeft, ArrowRight, Home, End
  const handleKeyDown = (e, currentIndex) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = TABS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = TABS[nextIndex];
      onTabChange(nextTab.id);
      tabRefs.current[nextTab.id]?.focus();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation List */}
      <div
        role="tablist"
        aria-label="Loyiha bo'limlari"
        className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none"
      >
        {TABS.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-md ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{tab.label}</span>
              {tab.id === 'tasks' && project?.tasks?.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {project.tasks.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {/* 1. OVERVIEW */}
      <div
        role="tabpanel"
        id="tabpanel-overview"
        aria-labelledby="tab-overview"
        hidden={activeTab !== 'overview'}
        className="space-y-6 text-sm"
      >
        {/* Full description */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Loyiha haqida
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {project?.description}
          </p>
        </div>

        {/* Business Goal */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4>Biznes maqsadi</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {project?.businessGoal}
          </p>
        </div>

        {/* Grid: Requirements and Learning Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Requirements */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Loyiha talablari
            </h4>
            <ul className="space-y-2.5">
              {project?.requirements?.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Outcomes */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h4>Nimani o‘rganasiz</h4>
            </div>
            <ul className="space-y-2.5">
              {project?.learningOutcomes?.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. TECHNOLOGIES */}
      <div
        role="tabpanel"
        id="tabpanel-technologies"
        aria-labelledby="tab-technologies"
        hidden={activeTab !== 'technologies'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project?.technologies?.map((tech) => (
            <div
              key={tech.id}
              className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {tech.name}
                  </h4>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {tech.level}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TASKS */}
      <div
        role="tabpanel"
        id="tabpanel-tasks"
        aria-labelledby="tab-tasks"
        hidden={activeTab !== 'tasks'}
        className="space-y-3"
      >
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
          {project?.tasks?.map((task) => {
            const isDone = task.status === 'completed';
            const isInProgress = task.status === 'in_progress';
            return (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isDone
                        ? 'bg-emerald-500'
                        : isInProgress
                        ? 'bg-blue-500'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                  <div>
                    <h5 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {task.title}
                    </h5>
                    <span className="text-xs text-slate-400 capitalize">
                      {isDone ? 'Tugallangan' : isInProgress ? 'Jarayonda' : 'Boshlanmagan'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-800">
                    <Award className="w-3.5 h-3.5" />
                    +{task.xp} XP
                  </div>

                  {/* External link to other student's Task Board module */}
                  <a
                    href={`/tasks/${task.id}`}
                    className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                    title="Vazifa taxtasiga o'tish"
                    aria-label={`${task.title} vazifasiga o'tish`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. TEAM */}
      <div
        role="tabpanel"
        id="tabpanel-team"
        aria-labelledby="tab-team"
        hidden={activeTab !== 'team'}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project?.team?.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 flex items-center gap-3.5"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                loading="lazy"
              />
              <div className="min-w-0">
                <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {member.name}
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
