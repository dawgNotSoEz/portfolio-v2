import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "Turing Community Discord Bot",
      description:
        "A Discord bot for coding communities. Manages programming challenges, leaderboards, events, member registration, and integrates with GitHub for a collaborative learning experience.",
      tech: ["Discord.js", "Node.js", "GitHub API"],
      featured: true,
  repo: "https://github.com/dawgNotSoEz/turing-dc",
    },
    {
      title: "VaultBin",
      description:
        "VaultBin is a next-gen, privacy-first platform for securely sharing text, code, and files. Zero-knowledge architecture, real-time collaborative editing, encrypted file attachments, auto-expiring pastes, and password protection. Tech Stack: Next.js (React), Tailwind CSS, libsodium-wrappers, Node.js (Fastify), PostgreSQL.",
      tech: ["Next.js", "React", "Tailwind CSS", "libsodium", "Node.js", "Fastify", "PostgreSQL"],
      featured: true,
  repo: "https://github.com/dawgNotSoEz/vault-bin",
  demo: "https://vault-bin.vercel.app",
    },
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-display font-display font-bold text-gradient mb-6">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass p-8 rounded-xl hover-lift group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <div className="h-48 bg-gradient-primary rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-semibold">Project Preview</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-surface rounded-md text-sm font-mono text-primary">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="hover-lift">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" size="sm" className="hover-lift">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                )}
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <Button size="sm" className="btn-premium">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                ) : (
                  <Button size="sm" className="btn-premium">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;