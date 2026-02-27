import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: ServiceCardProps) => {
  return (
    <ScrollReveal delay={delay}>
      <div className="group relative p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        {/* Hover Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-[3] group-hover:bg-accent/10" />
        
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary/20">
            <Icon className="w-7 h-7 text-primary-foreground" />
          </div>
          <h3 className="font-heading text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">{description}</p>
        </div>

        {/* Bottom Line Decoration */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
      </div>
    </ScrollReveal>
  );
};

export default ServiceCard;
