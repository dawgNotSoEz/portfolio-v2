import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { CURATED_PROJECTS } from '../data/projects';
import { FaGithub, FaTools, FaHardHat, FaExclamationTriangle } from 'react-icons/fa';

interface ProjectsSectionProps {
  showSection: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ showSection }) => {
  // State for Projects section
  const [projects, setProjects] = useState<Project[]>(CURATED_PROJECTS);
  const [projectTechFilter, setProjectTechFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(CURATED_PROJECTS);
  const [projectSortOrder, setProjectSortOrder] = useState<'default' | 'newest'>('default');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Set under construction state
  const [loading, setLoading] = useState(true);
  const [underConstruction, setUnderConstruction] = useState(true);

  // Simulate loading for the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Get unique project technologies for filtering
  const projectTechnologies = ['All', ...new Set(
    projects.flatMap(project => project.technologies)
  )];

  if (!showSection) return null;

  return (
    <section id="projects" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-2">Projects</h2>
        <p className="text-xl text-slate-400 mb-8">Featured work and personal projects</p>
        
        {/* Search and sort controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={projectSearchQuery}
              onChange={(e) => setProjectSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-3 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort:</span>
            <button
              onClick={() => setProjectSortOrder('default')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                projectSortOrder === 'default'
                  ? 'bg-teal-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setProjectSortOrder('newest')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                projectSortOrder === 'newest'
                  ? 'bg-teal-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Newest
            </button>
          </div>
        </div>
        
        {/* Project filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {projectTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setProjectTechFilter(tech)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                projectTechFilter === tech
                  ? 'bg-teal-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tech}
            </button>
          ))}
          
          {/* Featured projects toggle */}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ml-auto ${
              showFeaturedOnly
                ? 'bg-teal-500 text-slate-900'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {showFeaturedOnly ? 'Featured Only' : 'All Projects'}
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <motion.div 
            className="text-center py-10 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800/50 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                  y: [0, -5, 0, -5, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5,
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                <FaHardHat className="h-16 w-16 text-yellow-500 absolute -top-6 left-1/2 transform -translate-x-1/2" />
                <FaTools className="h-20 w-20 text-teal-500" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Projects Under Construction</h3>
            <p className="text-slate-300 text-lg mb-6">This section is currently under development. Exciting projects will be available soon!</p>
            <div className="flex justify-center items-center text-yellow-500 mb-4">
              <FaExclamationTriangle className="mr-2" />
              <span className="text-sm">Coming soon</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
