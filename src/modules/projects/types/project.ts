export type ProjectDifficulty = 'easy' | 'medium' | 'hard';
export type ProjectLevel = 'intern' | 'junior' | 'middle' | 'senior';
export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';
export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export interface Technology {
  id: string;
  name: string;
  icon: string;
  description: string;
  level: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: TaskStatus;
  xp: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  businessGoal: string;
  company: Company;
  difficulty: ProjectDifficulty;
  requiredLevel: ProjectLevel;
  status: ProjectStatus;
  progress: number; // 0–100
  technologies: Technology[];
  requirements: string[];
  learningOutcomes: string[];
  tasks: ProjectTask[];
  team: TeamMember[];
  deadline: string;
  xpReward: number;
  createdAt: string;
}

export interface ProjectFiltersQuery {
  search?: string;
  status?: ProjectStatus | 'all';
  difficulty?: ProjectDifficulty | 'all';
  technologies?: string[];
  sortBy?: 'newest' | 'progress' | 'difficulty';
}
