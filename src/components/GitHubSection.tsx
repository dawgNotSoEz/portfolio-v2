import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Repository } from '../types';
import { fetchGithubRepositories } from '../services/github';
import { FaGithub, FaStar, FaTools, FaHardHat, FaExclamationTriangle } from 'react-icons/fa';
import { format, formatDistanceToNow } from 'date-fns';

interface GitHubSectionProps {
  showSection: boolean;
}

const GitHubSection: React.FC<GitHubSectionProps> = ({ showSection }) => {
  // State for GitHub repositories section
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [repoTechFilter, setRepoTechFilter] = useState('All');
  const [repoSearchQuery, setRepoSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredRepoNames, setFeaturedRepoNames] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Fetch repositories from GitHub API
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const data = await fetchGithubRepositories();
        setRepositories(data);
        setFilteredRepos(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to fetch repositories. Please try again later.');
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Filter repositories based on technology, search query, and featured flag
  useEffect(() => {
    if (repositories.length > 0) {
      let filtered = [...repositories];
      
      // Filter by technology/language
      if (repoTechFilter !== 'All') {
        filtered = filtered.filter(repo => 
          repo.language === repoTechFilter || 
          repo.topics.includes(repoTechFilter.toLowerCase())
        );
      }
      
      // Filter by search query
      if (repoSearchQuery.trim() !== '') {
        const query = repoSearchQuery.toLowerCase();
        filtered = filtered.filter(repo => 
          repo.name.toLowerCase().includes(query) || 
          (repo.description && repo.description.toLowerCase().includes(query)) || 
          repo.topics.some(topic => topic.toLowerCase().includes(query))
        );
      }
      
      // Filter by featured flag if enabled
      if (showFeaturedOnly && featuredRepoNames.length > 0) {
        filtered = filtered.filter(repo => 
          featuredRepoNames.some(name => 
            repo.name.toLowerCase().includes(name.toLowerCase())
          )
        );
      }
      
      setFilteredRepos(filtered);
    }
  }, [repositories, repoTechFilter, repoSearchQuery, showFeaturedOnly, featuredRepoNames]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      formatted: format(date, 'MMM d, yyyy'),
      relative: formatDistanceToNow(date, { addSuffix: true })
    };
  };

  // Get unique languages from repositories for filtering
  const repoLanguages = ['All', ...new Set(
    repositories.map(repo => repo.language).filter(Boolean)
  )];

  if (!showSection) return null;

  return (
    <section id="github" className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">GitHub Repositories</h2>
        
        {/* Under Construction Message */}
        <div className="text-center py-10 bg-slate-800/50 rounded-lg border border-slate-700/50 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-6xl text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 -mt-2 -mr-2 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Under Construction</h3>
          <p className="text-slate-300 mb-6 max-w-md mx-auto">I'm currently working on integrating my GitHub repositories. Check back soon to see my latest projects!</p>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
        
        {/* Original content - now hidden */}
        {false && loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : false && error ? (
          <div className="text-center py-10 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-slate-300 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-teal-500 text-slate-900 font-medium rounded-md hover:bg-teal-600 transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        ) : false && (
          <>
            {/* Search and filter controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={repoSearchQuery}
                  onChange={(e) => setRepoSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <span className="absolute right-3 top-3 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Language filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {repoLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setRepoTechFilter(lang)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    repoTechFilter === lang
                      ? 'bg-teal-500 text-slate-900'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
              
              {/* Featured repositories toggle */}
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ml-auto ${
                  showFeaturedOnly
                    ? 'bg-teal-500 text-slate-900'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {showFeaturedOnly ? 'Featured Only' : 'All Repositories'}
              </button>
            </div>
            
            {/* Repositories grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRepos.map((repo) => {
                const updatedDate = formatDate(repo.updated_at);
                
                return (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-slate-600"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <FaGithub className="text-teal-400 mr-3 text-xl" />
                          <h3 className="text-xl font-bold text-white truncate">{repo.name}</h3>
                        </div>
                        <div className="flex items-center text-slate-400">
                          <FaStar className="mr-1" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-400 mb-4 line-clamp-3">{repo.description}</p>
                      
                      {/* Technologies/Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.language && (
                          <span className="px-2.5 py-1 bg-slate-700 text-teal-400 text-xs rounded-md border border-slate-600">
                            {repo.language}
                          </span>
                        )}
                        
                        {repo.topics.slice(0, 3).map((topic, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-slate-700 text-slate-300 text-xs rounded-md border border-slate-600"
                          >
                            {topic}
                          </span>
                        ))}
                        
                        {repo.topics.length > 3 && (
                          <span className="px-2.5 py-1 bg-slate-700 text-slate-300 text-xs rounded-md border border-slate-600">
                            +{repo.topics.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      {/* Updated date */}
                      <div className="text-sm text-slate-500 mb-4">
                        Updated {updatedDate.relative}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 hover:text-teal-300 font-medium flex items-center transition-colors duration-300"
                        >
                          <FaGithub className="mr-2" />
                          View Code
                        </a>
                        
                        {/* Removed Live Demo button */}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* No results message for Repositories */}
            {filteredRepos.length === 0 && (
              <div className="text-center py-10 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-300 text-lg mb-4">No repositories found with the selected filters.</p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setRepoTechFilter('All')}
                    className="px-6 py-3 bg-teal-500 text-slate-900 font-medium rounded-md hover:bg-teal-600 transition-colors duration-300"
                  >
                    Show All Repositories
                  </button>
                  {showFeaturedOnly && (
                    <button
                      onClick={() => setShowFeaturedOnly(false)}
                      className="px-6 py-3 bg-slate-700 text-white font-medium rounded-md hover:bg-slate-600 transition-colors duration-300"
                    >
                      Include Non-Featured
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;
