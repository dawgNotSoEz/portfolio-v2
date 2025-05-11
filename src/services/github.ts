import { Repository } from '../types';

// GitHub username
const username = 'dawgNotSoEz';

// Mock data for fallback
export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: 1,
    name: 'personal-website',
    description: 'Modern portfolio website built with React, TypeScript, and Tailwind CSS. Features dynamic content loading, animations, and responsive design.',
    html_url: 'https://github.com/dawgNotSoEz/personal-website',
    homepage: 'https://dawgnotsoez.github.io/personal-website',
    stargazers_count: 8,
    language: 'TypeScript',
    topics: ['portfolio', 'react', 'typescript', 'tailwind-css', 'framer-motion'],
    fork: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-06-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'project-management-app',
    description: 'A comprehensive project management tool with task tracking, team collaboration features, and real-time updates.',
    html_url: 'https://github.com/dawgNotSoEz/project-management-app',
    homepage: 'https://project-management-demo.vercel.app',
    stargazers_count: 12,
    language: 'JavaScript',
    topics: ['project-management', 'react', 'nodejs', 'mongodb', 'express'],
    fork: false,
    created_at: '2023-02-01T00:00:00Z',
    updated_at: '2023-07-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'smart-parking-system',
    description: 'IoT-based parking system that uses sensors and machine learning to optimize parking space utilization in urban areas.',
    html_url: 'https://github.com/dawgNotSoEz/smart-parking-system',
    homepage: 'https://dawgnotsoez.github.io/smart-parking-system',
    stargazers_count: 15,
    language: 'Python',
    topics: ['iot', 'parking', 'smart-systems', 'machine-learning', 'raspberry-pi'],
    fork: false,
    created_at: '2023-03-01T00:00:00Z',
    updated_at: '2023-08-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'habit-tracker',
    description: 'A mobile application for tracking daily habits and routines, with progress visualization and reminder notifications.',
    html_url: 'https://github.com/dawgNotSoEz/habit-tracker',
    homepage: '',
    stargazers_count: 7,
    language: 'Dart',
    topics: ['flutter', 'mobile-app', 'habit-tracker', 'firebase'],
    fork: false,
    created_at: '2023-04-15T00:00:00Z',
    updated_at: '2023-09-10T00:00:00Z'
  },
  {
    id: 5,
    name: 'library-system',
    description: 'A comprehensive library management system with book tracking, user accounts, and borrowing history features.',
    html_url: 'https://github.com/dawgNotSoEz/library-system',
    homepage: '',
    stargazers_count: 10,
    language: 'Java',
    topics: ['library', 'management-system', 'java', 'spring-boot', 'mysql'],
    fork: false,
    created_at: '2023-05-20T00:00:00Z',
    updated_at: '2023-10-15T00:00:00Z'
  }
];

// GraphQL query to fetch repositories
const GITHUB_GRAPHQL_QUERY = `
  query {
    user(login: "${username}") {
      repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          id
          name
          description
          url
          homepageUrl
          stargazerCount
          primaryLanguage {
            name
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          isFork
          createdAt
          updatedAt
        }
      }
    }
  }
`;

// Fetch repositories from GitHub API
export const fetchGithubRepositories = async (featuredRepoNames?: string[]): Promise<Repository[]> => {
  // TEMPORARY: Return mock data directly while fixing the API integration
  console.log('Using mock repositories for now');
  return processRepositories(MOCK_REPOSITORIES, featuredRepoNames);
  
  /* Uncomment this when you have a valid GitHub token
  try {
    // Get GitHub token from environment variables
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    
    console.log('GitHub token available for authentication:', !!githubToken);
    console.log('Token length:', githubToken ? githubToken.length : 0);
    
    // If no token is available, use mock data immediately
    if (!githubToken) {
      console.warn('No GitHub token found. Using mock repositories.');
      return processRepositories(MOCK_REPOSITORIES, featuredRepoNames);
    }
    
    // Make GraphQL request to GitHub API with authentication
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${githubToken.trim()}`
      },
      body: JSON.stringify({ query: GITHUB_GRAPHQL_QUERY })
    });
    
    console.log('GraphQL API Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub GraphQL API error (' + response.status + '):', errorData);
      
      // More detailed error handling
      if (response.status === 401) {
        console.error('Authentication error: Your GitHub token may be invalid, expired, or missing');
        console.warn('Falling back to mock data due to authentication error');
        // Don't throw error, just use mock data instead
        return processRepositories(MOCK_REPOSITORIES, featuredRepoNames);
      } else if (errorData?.message?.includes('rate limit')) {
        console.error('Rate limit exceeded. Using mock data instead.');
        console.warn('To avoid rate limits, provide a valid GitHub token in your .env file');
        // Don't throw error, just use mock data instead
        return processRepositories(MOCK_REPOSITORIES, featuredRepoNames);
      } else {
        console.error(`GitHub API error (${response.status}):`, errorData?.message || 'Unknown error');
        console.warn('Falling back to mock data due to API error');
        // Don't throw error, just use mock data instead
        return processRepositories(MOCK_REPOSITORIES, featuredRepoNames);
      }
    }
    
    const result = await response.json();
    console.log('GitHub API response received');
    
    if (result.data && result.data.user && result.data.user.repositories) {
      // Transform GraphQL response to match Repository interface
      const repos: Repository[] = result.data.user.repositories.nodes.map((node: any) => ({
        id: parseInt(node.id.split('_').pop()),
        name: node.name,
        description: node.description || `A ${node.primaryLanguage?.name || 'code'} project.`,
        html_url: node.url,
        homepage: node.homepageUrl || '',
        stargazers_count: node.stargazerCount,
        language: node.primaryLanguage?.name || '',
        topics: node.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
        fork: node.isFork,
        created_at: node.createdAt,
        updated_at: node.updatedAt
      }));
      
      return processRepositories(repos, featuredRepoNames);
    } else {
      console.error('Unexpected API response format:', result);
      return processRepositories(MOCK_REPOSITORIES, featuredRepoNames);
    }
  } catch (err) {
    console.error('GitHub GraphQL API fetch error:', err);
    // Fallback to mock data on error
    return processRepositories(MOCK_REPOSITORIES, featuredRepoNames);
  }
  */
};

// Process repository data (either from API or mock)
const processRepositories = (data: Repository[], featuredRepoNames?: string[]): Repository[] => {
  try {
    // Filter out forked repositories
    const ownRepos = data.filter(repo => !repo.fork);
    console.log('Own repositories:', ownRepos.length);
    
    // Sort repositories by stars (most stars first)
    const sortedRepos = [...ownRepos].sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    });
    
    // Ensure all repos have required properties
    const processedRepos = sortedRepos.map(repo => ({
      ...repo,
      topics: repo.topics || [],
      description: repo.description || `A ${repo.language || 'code'} project.`
    }));
    
    // Filter to only show featured repositories if specified
    if (featuredRepoNames && featuredRepoNames.length > 0) {
      return processedRepos.filter(repo => 
        featuredRepoNames.some(name => 
          repo.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    }
    
    return processedRepos;
  } catch (err) {
    console.error('Error processing repositories:', err);
    return [];
  }
};
