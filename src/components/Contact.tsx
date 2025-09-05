import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="section-padding bg-surface/30">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-display font-display font-bold text-gradient mb-6">
            Let's Work Together
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            className="glass p-8 rounded-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form className="space-y-6">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="glass"
              />
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="glass"
              />
              <Textarea
                placeholder="Tell me about your project..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="glass resize-none"
              />
              <Button className="w-full btn-premium">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="glass p-6 rounded-xl hover-lift">
              <Mail className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-muted-foreground">paramsavi06@gmail.com</p>
            </div>
            
            <div className="glass p-6 rounded-xl hover-lift">
              <MapPin className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-semibold mb-1">Location</h4>
              <p className="text-muted-foreground">Delhi, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;