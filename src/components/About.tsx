import { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Code2, Lightbulb, Users, Target, Coffee, Award } from "lucide-react";
import { useEffect } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const achievements = [
    { 
      label: "Years of Experience", 
      value: "2+", 
      icon: Code2, 
      color: "text-primary",
      description: "Building web applications"
    },
    { 
      label: "Projects Delivered", 
      value: "15+", 
      icon: Target, 
      color: "text-accent",
      description: "From concept to production"
    },
    { 
      label: "Technologies Mastered", 
      value: "12+", 
      icon: Lightbulb, 
      color: "text-secondary",
      description: "Modern tech stack"
    },
    { 
      label: "Happy Collaborators", 
      value: "25+", 
      icon: Users, 
      color: "text-warning",
      description: "Team members & clients"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="about" className="section-padding bg-surface/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 rounded-full glass border border-primary/20">
              <Coffee className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">
                Fueled by curiosity & caffeine
              </span>
            </div>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-display font-display font-bold text-gradient mb-6"
          >
            About Me
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-semibold text-foreground leading-tight"
            >
              Passionate Developer & Problem Solver
            </motion.h3>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <motion.p variants={itemVariants}>
                I'm a dedicated full-stack developer with a passion for creating exceptional digital experiences. 
                My journey began with curiosity about how things work on the web, which led me to dive deep into 
                both frontend and backend technologies.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                Currently pursuing Computer Science, I combine academic knowledge with hands-on experience to 
                build applications that are not just functional, but delightful to use. I believe great software 
                is born from the intersection of solid engineering and thoughtful design.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, 
                or mentoring fellow developers. I'm always excited about the next challenge and opportunity to learn.
              </motion.p>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-4"
            >
              {["React", "TypeScript", "Python", "Node.js", "PostgreSQL", "AWS"].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 glass rounded-full text-sm font-mono text-primary border border-primary/20 hover-lift"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="relative"
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="glass-strong p-8 rounded-2xl hover-lift">
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-4xl font-bold">
                SS
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Savitender Singh
                </h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Full Stack Developer
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">Delhi, India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Focus</span>
                  <span className="text-foreground">Web Development</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Education</span>
                  <span className="text-foreground">Computer Science</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-accent">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                className="glass p-6 rounded-xl text-center hover-lift group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`${achievement.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={32} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {achievement.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;