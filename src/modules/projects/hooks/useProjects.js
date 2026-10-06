import { useState, useEffect, useCallback } from 'react';
import { getProjects } from '../api/projects.api';

/**
 * Custom hook to fetch and filter list of projects
 * @param {Object} [initialFilters]
 */
export function useProjects(initialFilters = {}) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    difficulty: 'all',
    technologies: [],
    sortBy: 'newest',
    ...initialFilters,
  });

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProjects(filters);
      setProjects(data);
    } catch (err) {
      setError(err?.message || 'Loyihalarni yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const updateFilters = useCallback((partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      status: 'all',
      difficulty: 'all',
      technologies: [],
      sortBy: 'newest',
    });
  }, []);

  const toggleTechnology = useCallback((techName) => {
    setFilters((prev) => {
      const exists = prev.technologies.includes(techName);
      return {
        ...prev,
        technologies: exists
          ? prev.technologies.filter((t) => t !== techName)
          : [...prev.technologies, techName],
      };
    });
  }, []);

  return {
    projects,
    isLoading,
    error,
    filters,
    updateFilters,
    resetFilters,
    toggleTechnology,
    refetch: fetchProjects,
  };
}
