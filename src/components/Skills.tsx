import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Server, 
  Cloud, 
  Zap,
  Palette,
  Globe,
  FileCode
} from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: "Frontend Development",
      color: "blue",
      skills: [
        { 
          name: "React", 
          icon: Code2,
          description: "Building dynamic, component-based user interfaces with modern React patterns and hooks"
        },
        { 
          name: "TypeScript", 
          icon: FileCode,
          description: "Writing type-safe, scalable applications with advanced TypeScript features"
        },
        { 
          name: "Tailwind CSS", 
          icon: Palette,
          description: "Creating responsive, modern designs with utility-first CSS framework"
        },
        { 
          name: "Next.js", 
          icon: Globe,
          description: "Developing performant, server-rendered React applications with full-stack capabilities"
        },
      ]
    },
    {
      title: "Backend Development", 
      color: "green",
      skills: [
        { 
          name: "Python", 
          icon: Code2,
          description: "Crafting scalable and efficient server-side logic with modern Python frameworks"
        },
        { 
          name: "Node.js", 
          icon: Server,
          description: "Building fast, scalable network applications with JavaScript runtime environment"
        },
        { 
          name: "PostgreSQL", 
          icon: Database,
          description: "Designing robust relational databases with advanced SQL and performance optimization"
        },
        { 
          name: "AWS", 
          icon: Cloud,
          description: "Deploying and managing cloud infrastructure with Amazon Web Services"
        },
      ]
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 text-white';
      case 'green':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  return (
    <section id="skills" className="section-padding bg-surface/30">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-display font-display font-bold text-gradient mb-6">
            Skills & Expertise
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass p-8 rounded-xl hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gradient">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                    <motion.div 
                      key={skill.name}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    >
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full flex-shrink-0 ${getColorClasses(category.color)}`}>
                        <IconComponent className="w-4 h-4 mr-2" />
                        {skill.name}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {skill.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;