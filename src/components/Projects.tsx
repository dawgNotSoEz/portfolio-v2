import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  fork: boolean;
  created_at: string;
  updated_at: string;
}

const Projects = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [languages, setLanguages] = useState<string[]>(['All']);
  
  // GitHub username - change this to your GitHub username
  const username = 'dawgNotSoEz';
  
  // Featured repository name - set to empty string if you don't want to feature any
  const featuredRepo = 'portfolio-v2';

  // Fetch repositories from GitHub
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data: Repository[] = await response.json();
        
        // Filter out forked repositories and empty descriptions
        const filteredData = data.filter(repo => 
          !repo.fork && repo.description
        );
        
        // Sort repositories to put featured repo first if it exists
        filteredData.sort((a, b) => {
          if (a.name === featuredRepo) return -1;
          if (b.name === featuredRepo) return 1;
          return b.stargazers_count - a.stargazers_count;
        });
        
        setRepositories(filteredData);
        setFilteredRepos(filteredData);
        
        // Extract unique languages
        const uniqueLanguages = ['All', ...new Set(
          filteredData
            .map(repo => repo.language)
            .filter(Boolean) as string[]
        )];
        
        setLanguages(uniqueLanguages);
        setIsLoading(false);
      } catch (err) {
        setError('Error fetching repositories. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching repositories:', err);
      }
    };
    
    fetchRepositories();
  }, [username]);
  
  // Filter repositories by language
  useEffect(() => {
    if (filter === 'All') {
      setFilteredRepos(repositories);
    } else {
      setFilteredRepos(repositories.filter(repo => repo.language === filter));
    }
  }, [filter, repositories]);
  
  // Handle filter change
  const handleFilterChange = (language: string) => {
    setFilter(language);
  };
  
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-slate-950 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-navy-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section heading */}
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-sm font-medium text-teal-400 uppercase tracking-widest mb-3">My Work</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Featured Projects
          </h3>
          <div className="w-16 h-1 bg-teal-400 rounded-full mb-6"></div>
          <p className="text-slate-300 max-w-2xl text-center">
            A collection of my recent projects. Each project is a unique piece of development that showcases my skills and passion for building exceptional digital experiences.
          </p>
        </div>
        {/* Language filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {languages.map((language, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(language)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${filter === language 
                ? 'bg-teal-500 text-slate-900 font-medium' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
            >
              {language}
            </button>
          ))}
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Error message */}
        {!isLoading && error && (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-500 text-lg mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-teal-500 text-slate-900 font-medium rounded-md hover:bg-teal-600 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Projects grid */}
        {!isLoading && !error && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800/50 overflow-hidden h-full transition-all duration-300 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10">
                  {/* Project header */}
                  <div className="p-1 bg-gradient-to-r from-slate-800 to-slate-900">
                    <div className="flex space-x-1.5 px-3 py-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <div className="ml-auto flex items-center space-x-2">
                        {repo.language && (
                          <span className="text-xs text-slate-400 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-teal-400 mr-1.5"></span>
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="text-xs text-slate-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {repo.stargazers_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
                      {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 line-clamp-3 min-h-[4.5rem]">
                      {repo.description || 'No description available'}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {repo.topics && repo.topics.slice(0, 4).map((topic, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-slate-800 text-teal-400 text-xs rounded-md border border-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:text-teal-300 font-medium flex items-center transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        View Code
                      </a>
                      
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium rounded-md transition-colors duration-300 flex items-center gap-2 text-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* No results message */}
        {!isLoading && !error && filteredRepos.length === 0 && (
          <div className="text-center py-10 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800/50 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-300 text-lg mb-4">No projects found with the selected filter.</p>
            <button
              onClick={() => setFilter('All')}
              className="px-6 py-3 bg-teal-500 text-slate-900 font-medium rounded-md hover:bg-teal-600 transition-colors duration-300"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;