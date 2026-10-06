import { Project, ProjectFiltersQuery } from '../types/project';
import { mockProjects } from '../mock/projects';

// In-memory cache clone so mutations like startProject persist during session
let localProjects: Project[] = JSON.parse(JSON.stringify(mockProjects));

// Helper for simulated network delay (500ms)
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /projects
 * Loyihalar ro'yxatini filtrlash, qidirish va saralash bilan olish
 */
export async function getProjects(params?: ProjectFiltersQuery): Promise<Project[]> {
  await delay(500);

  let filtered = [...localProjects];

  if (!params) {
    return filtered;
  }

  // 1. Qidiruv (nomi yoki tavsifi bo'yicha)
  if (params.search && params.search.trim()) {
    const q = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.company.name.toLowerCase().includes(q)
    );
  }

  // 2. Status bo'yicha filtr
  if (params.status && params.status !== 'all') {
    filtered = filtered.filter((p) => p.status === params.status);
  }

  // 3. Qiyinlik darajasi (difficulty) bo'yicha filtr
  if (params.difficulty && params.difficulty !== 'all') {
    filtered = filtered.filter((p) => p.difficulty === params.difficulty);
  }

  // 4. Texnologiyalar (multi-select) bo'yicha filtr
  if (params.technologies && params.technologies.length > 0) {
    filtered = filtered.filter((p) =>
      params.technologies!.some((techName) =>
        p.technologies.some((t) => t.name.toLowerCase() === techName.toLowerCase())
      )
    );
  }

  // 5. Saralash (sorting)
  if (params.sortBy) {
    if (params.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (params.sortBy === 'progress') {
      filtered.sort((a, b) => b.progress - a.progress);
    } else if (params.sortBy === 'difficulty') {
      const difficultyOrder: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
      filtered.sort((a, b) => (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0));
    }
  }

  return filtered;
}

/**
 * GET /projects/:id
 * Alohida bitta loyiha tafsilotlarini id bo'yicha olish
 */
export async function getProjectById(id: string): Promise<Project> {
  await delay(500);

  const project = localProjects.find((p) => p.id === id);
  if (!project) {
    throw new Error(`Loyiha topilmadi: ${id}`);
  }

  return JSON.parse(JSON.stringify(project));
}

/**
 * POST /projects/:id/start
 * Loyihani boshlash (status: 'in_progress', progress kamida 5%)
 */
export async function startProject(id: string): Promise<Project> {
  await delay(500);

  const index = localProjects.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Loyiha topilmadi: ${id}`);
  }

  const current = localProjects[index];
  if (current.status === 'not_started') {
    current.status = 'in_progress';
    if (current.progress === 0) {
      current.progress = 5;
    }
  }

  return JSON.parse(JSON.stringify(current));
}
