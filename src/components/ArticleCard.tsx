import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  onClick: () => void;
}

export const ArticleCard = ({ title, excerpt, date, readTime, image, onClick }: ArticleCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className="glass-card p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-border group overflow-hidden"
    >
      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
