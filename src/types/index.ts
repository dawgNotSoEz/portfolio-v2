// Common types used across the application

// GitHub repository interface
export interface Repository {
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

// Project interface for curated projects
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date?: string; // Date field for sorting by newest
}
