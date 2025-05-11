import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @deprecated This component is now deprecated and replaced by the new modular structure:
 * - Portfolio.tsx - Main component that combines ProjectsSection and GitHubSection
 * - ProjectsSection.tsx - Component for displaying curated projects
 * - GitHubSection.tsx - Component for displaying GitHub repositories
 * 
 * The data has been moved to:
 * - types/index.ts - Type definitions
 * - data/projects.ts - Curated projects data
 * - services/github.ts - GitHub API functionality
 */

const Projects: React.FC = () => {
  return (
    <div className="py-20 text-center bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Deprecated Component</h2>
        <p className="text-white mb-6">
          This component has been replaced by the new Portfolio component.
          Please update your imports to use the new component structure.
        </p>
        <Link 
          to="/"
          className="px-6 py-3 bg-teal-500 text-slate-900 font-medium rounded-md hover:bg-teal-600 transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Projects;
