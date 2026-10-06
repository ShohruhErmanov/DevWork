// Semantic color and label tokens for the projects module (Light + Dark mode support)

export const STATUS_CONFIG = {
  not_started: {
    label: "Boshlanmagan",
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400 dark:bg-slate-500",
  },
  in_progress: {
    label: "Jarayonda",
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    dot: "bg-blue-500 dark:bg-blue-400",
  },
  completed: {
    label: "Tugallangan",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-500 dark:emerald-400",
  },
};

export const DIFFICULTY_CONFIG = {
  easy: {
    label: "Oson",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  medium: {
    label: "O‘rta",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
  },
  hard: {
    label: "Qiyin",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800",
  },
};

export const LEVEL_CONFIG = {
  intern: {
    label: "Intern",
    order: 1,
    badgeBg: "bg-zinc-100 dark:bg-zinc-800",
    badgeText: "text-zinc-700 dark:text-zinc-300",
  },
  junior: {
    label: "Junior",
    order: 2,
    badgeBg: "bg-sky-100 dark:bg-sky-950/50",
    badgeText: "text-sky-700 dark:text-sky-400",
  },
  middle: {
    label: "Middle",
    order: 3,
    badgeBg: "bg-indigo-100 dark:bg-indigo-950/50",
    badgeText: "text-indigo-700 dark:text-indigo-400",
  },
  senior: {
    label: "Senior",
    order: 4,
    badgeBg: "bg-purple-100 dark:bg-purple-950/50",
    badgeText: "text-purple-700 dark:text-purple-400",
  },
};
