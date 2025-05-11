import { Project } from '../types';

// Sample curated projects data
export const CURATED_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Smart Parking System",
    description: "IoT-based parking system that uses sensors and machine learning to optimize parking space utilization in urban areas.",
    image: "/images/projects/smart-parking.jpg",
    technologies: ["Python", "TensorFlow", "IoT", "Raspberry Pi"],
    githubUrl: "https://github.com/dawgNotSoEz/smart-parking-system",
    liveUrl: "https://smart-parking-demo.vercel.app",
    featured: true,
    date: "2023-08-15"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
    image: "/images/projects/ecommerce.jpg",
    technologies: ["TypeScript", "React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/dawgNotSoEz/e-commerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    date: "2023-10-20"
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "Web application that uses AI to generate images from text descriptions, with various style options and sharing capabilities.",
    image: "/images/projects/ai-image.jpg",
    technologies: ["Python", "React", "TensorFlow", "Flask"],
    githubUrl: "https://github.com/dawgNotSoEz/ai-image-generator",
    liveUrl: "https://ai-image-gen.vercel.app",
    featured: true,
    date: "2023-12-05"
  },
  {
    id: 4,
    title: "Personal Finance Tracker",
    description: "A comprehensive personal finance application for tracking expenses, income, investments, and financial goals with data visualization.",
    image: "/images/projects/finance.jpg",
    technologies: ["JavaScript", "React", "Firebase", "D3.js"],
    githubUrl: "https://github.com/dawgNotSoEz/finance-tracker",
    liveUrl: "https://finance-tracker-demo.vercel.app",
    featured: false,
    date: "2024-01-15"
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with forecasts, historical data, and location-based weather alerts using multiple weather APIs.",
    image: "/images/projects/weather.jpg",
    technologies: ["JavaScript", "React", "APIs", "Tailwind CSS"],
    githubUrl: "https://github.com/dawgNotSoEz/weather-dashboard",
    liveUrl: "https://weather-app-demo.vercel.app",
    featured: false,
    date: "2024-03-10"
  }
];
