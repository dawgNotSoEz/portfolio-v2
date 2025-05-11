import React, { useState } from 'react';
import ProjectsSection from './ProjectsSection';
import GitHubSection from './GitHubSection';

const Portfolio: React.FC = () => {
  // State for section visibility
  const [showProjectsSection, setShowProjectsSection] = useState(true);
  const [showGitHubSection, setShowGitHubSection] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header with toggle buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={() => setShowProjectsSection(!showProjectsSection)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors duration-300"
          >
            {showProjectsSection ? 'Hide Projects' : 'Show Projects'}
          </button>
          <button
            onClick={() => setShowGitHubSection(!showGitHubSection)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors duration-300"
          >
            {showGitHubSection ? 'Hide GitHub' : 'Show GitHub'}
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <ProjectsSection showSection={showProjectsSection} />
      
      {/* GitHub Repositories Section */}
      <GitHubSection showSection={showGitHubSection} />
    </div>
  );
};

export default Portfolio;
