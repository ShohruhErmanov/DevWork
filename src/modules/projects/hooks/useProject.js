import { useState, useEffect, useCallback } from 'react';
import { getProjectById, startProject } from '../api/projects.api';

/**
 * Custom hook to fetch a single project by ID and perform project actions
 * @param {string} id - Project ID
 */
export function useProject(id) {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStarting, setIsStarting] = useState(false);

  const fetchProject = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch (err) {
      setError(err?.message || 'Loyiha topilmadi');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleStartProject = async () => {
    if (!id || isStarting) return;
    setIsStarting(true);
    try {
      const updated = await startProject(id);
      setProject(updated);
      return updated;
    } catch (err) {
      setError(err?.message || 'Loyihani boshlashda xatolik yuz berdi');
      throw err;
    } finally {
      setIsStarting(false);
    }
  };

  return {
    project,
    isLoading,
    error,
    isStarting,
    startProject: handleStartProject,
    refetch: fetchProject,
  };
}
