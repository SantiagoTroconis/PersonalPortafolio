import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Article {
  title: string;
  content: string;
  date: string;
  readTime: string;
}

interface ArticleModalProps {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ArticleModal = ({ article, open, onOpenChange }: ArticleModalProps) => {
  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto glass-card border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text pr-8">
            {article.title}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </DialogHeader>
        <div className="prose prose-invert max-w-none pt-6">
          <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
