import React, { Suspense } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// Lazy load components that are below the fold for better performance
const About = React.lazy(() => import("@/components/About"));
const Experience = React.lazy(() => import("@/components/Experience"));
const Skills = React.lazy(() => import("@/components/Skills"));
const Projects = React.lazy(() => import("@/components/Projects"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Footer = React.lazy(() => import("@/components/Footer"));

// A simple fallback component to show while lazy components are loading
const LoadingFallback = () => (
  <div className="w-full h-96 flex items-center justify-center text-muted-foreground">
    <p className="text-lg font-medium animate-pulse">Loading sections...</p>
  </div>
);

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <Hero />
          <Suspense fallback={<LoadingFallback />}>
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default Index;
