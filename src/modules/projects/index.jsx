import React from 'react';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

export { ProjectsPage, ProjectDetailPage };

/**
 * Route configuration to be plugged into the root React Router setup
 */
export const projectRoutes = [
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/projects/:id',
    element: <ProjectDetailPage />,
  },
];

export default projectRoutes;
