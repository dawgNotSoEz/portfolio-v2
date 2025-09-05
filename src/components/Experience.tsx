import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      title: "Backend Developer Intern",
      company: "Shree Guru Gobind Singh Tricentenary University (SGTU)",
      period: "May 2025 - July 2025",
      description:
        "Built backend for an Internship & Placement Portal with focus on scalability and security. Developed RESTful APIs for authentication, profiles, resume uploads, and job applications. Integrated MongoDB for flexible student data storage and seamless CRUD operations. Implemented session-based authentication and validation for secure, reliable access.",
      technologies: ["Python Flask", "FastAPI", "REST API Design", "MongoDB"],
    },
    {
      title: "Backend Developer Intern",
      company: "Aithinkers",
      period: "July 2024",
      description:
        "Built a FastAPI-based microservice to provide RESTful data access. Integrated with PostgreSQL using SQLAlchemy for CRUD operations. Implemented input validation with Pydantic and documented endpoints via OpenAPI.",
      technologies: ["FastAPI", "SQL", "SQLAlchemy", "CRUD"],
    },
  ];

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display font-display font-bold text-gradient mb-6">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pl-8 pb-12 last:pb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Timeline */}
              <div className="absolute left-0 top-0 w-px h-full bg-border">
                <div className="w-3 h-3 bg-primary rounded-full -ml-1.5 mt-1" />
              </div>

              <div className="glass p-6 rounded-xl hover-lift">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface rounded-md text-sm font-mono text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;