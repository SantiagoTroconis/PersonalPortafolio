import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

export const ProjectCard = ({ title, description, image, tags, links }: ProjectCardProps) => {
  return (
    <Card className="glass-card overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-border">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        
        {links && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/90 backdrop-blur-sm rounded-lg hover:bg-primary transition-all duration-300 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 text-primary-foreground" />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary/90 backdrop-blur-sm rounded-lg hover:bg-secondary transition-all duration-300 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 text-secondary-foreground" />
              </a>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};
