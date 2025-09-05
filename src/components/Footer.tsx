import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface/50 border-t border-border/20">
      <div className="container-custom py-12">
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-gradient mb-4">
            Savitender Singh
          </div>
          <p className="text-muted-foreground mb-8">
            Building amazing digital experiences
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://github.com" className="text-muted-foreground hover:text-primary hover-lift">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary hover-lift">
              <Linkedin size={24} />
            </a>
            <a href="mailto:hello@savitender.dev" className="text-muted-foreground hover:text-primary hover-lift">
              <Mail size={24} />
            </a>
          </div>
          
          <p className="text-muted-foreground text-sm flex items-center justify-center">
            © {currentYear} Made with <Heart className="w-4 h-4 mx-1 text-red-500" fill="currentColor" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;