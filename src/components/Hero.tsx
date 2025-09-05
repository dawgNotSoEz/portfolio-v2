import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Code2, Zap, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingElements from "./3D/FloatingElements";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const phrases = [
    "Crafting Digital Experiences",
    "Building Scalable Solutions",
    "Creating Beautiful Interfaces",
    "Solving Complex Problems",
  ];

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // Typewriter
  useEffect(() => {
    const phrase = phrases[currentPhrase] || "";
    const timer = setTimeout(() => {
      if (currentIndex < phrase.length) {
        setDisplayText(phrase.slice(0, currentIndex + 1));
        setCurrentIndex((i) => i + 1);
      } else {
        setTimeout(() => {
          setCurrentIndex(0);
          setDisplayText("");
          setCurrentPhrase((p) => (p + 1) % phrases.length);
        }, 1800);
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [currentIndex, currentPhrase]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((s) => !s), 530);
    return () => clearInterval(id);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/dawgNotSoEz", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/savitendersingh", label: "LinkedIn" },
    { icon: Mail, href: "mailto:paramsavi06@gmail.com", label: "Email" },
  ];

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stats = [
    { label: "Years Experience", value: "2+", icon: Code2 },
    { label: "Projects Completed", value: "15+", icon: Zap },
    { label: "Cups of Coffee", value: "1000+", icon: Coffee },
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
    hidden: { y: 20, opacity: 0 },
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
  <section id="home" className="min-h-[110vh] flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 mesh-bg opacity-30" />
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 opacity-40">
        <FloatingElements />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container-custom relative z-10 hero-extra-space" ref={ref}>
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Greeting */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full glass border border-primary/20 hero-badge"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-muted-foreground font-mono text-sm">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-8 mb-16">
            <h1 className="text-hero font-display font-bold">
              Hi, I'm{" "}
              <span className="text-gradient block md:inline font-name">
                Savitender Singh
              </span>
            </h1>
            
            <div className="text-2xl md:text-4xl font-medium text-muted-foreground min-h-[4rem] flex items-center justify-center">
              <span className="mr-2">I specialize in</span>
              <span className="text-foreground font-semibold relative">
                {displayText}
                <span 
                  className={`inline-block w-0.5 h-8 bg-primary ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity`}
                />
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed"
          >
            A passionate full-stack developer with expertise in React, Python, and modern web technologies. 
            I transform ideas into exceptional digital experiences that users love and businesses need.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <Button
              size="lg"
              className="btn-premium text-lg px-8 py-4"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 hover:border-primary/50 bg-surface/50 backdrop-blur-sm text-lg px-8 py-4 hover-lift"
              onClick={() => scrollToSection("contact")}
            >
              Let's Connect
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-16"
          >
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`p-4 glass rounded-full text-muted-foreground transition-colors duration-300 hover-lift hover:shadow-glow`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <IconComponent size={24} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="glass p-6 rounded-xl text-center hover-lift group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-primary mb-2 flex justify-center">
                    <IconComponent size={32} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2 opacity-60 group-hover:opacity-100">Scroll down</span>
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;