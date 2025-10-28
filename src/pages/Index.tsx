import { useState } from "react";
import { Mail, Github, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleModal } from "@/components/ArticleModal";

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const projects = [
    {
      title: "Project Alpha",
      description: "An innovative solution for modern web applications with real-time collaboration features and advanced data visualization.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      tags: ["React", "TypeScript", "Node.js", "WebSocket"],
      links: {
        demo: "https://example.com",
        github: "https://github.com"
      }
    },
    {
      title: "Project Beta",
      description: "A creative platform that connects designers and developers through an intuitive interface and powerful collaboration tools.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      tags: ["Next.js", "Tailwind", "PostgreSQL"],
      links: {
        demo: "https://example.com"
      }
    },
    {
      title: "Project Gamma",
      description: "AI-powered analytics dashboard that transforms complex data into actionable insights with beautiful visualizations.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tags: ["Python", "TensorFlow", "React", "D3.js"],
      links: {
        github: "https://github.com"
      }
    }
  ];

  const articles = [
    {
      title: "The Future of Web Development",
      excerpt: "Exploring emerging trends and technologies that are shaping the next generation of web applications. From AI integration to edge computing, the landscape is evolving rapidly.",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      content: `The web development landscape is undergoing a profound transformation. As we look toward the future, several key trends are emerging that will fundamentally reshape how we build and interact with web applications.

Artificial Intelligence Integration
AI is no longer a futuristic concept—it's becoming an integral part of modern web development. From intelligent code completion to automated testing and personalized user experiences, AI is enhancing every aspect of the development lifecycle.

Edge Computing Revolution
The shift toward edge computing is enabling faster, more responsive applications. By processing data closer to users, we're seeing dramatic improvements in performance and user experience.

WebAssembly and Performance
WebAssembly is opening new possibilities for web applications, allowing developers to bring near-native performance to the browser. This technology is particularly exciting for computationally intensive applications like games, video editing, and data visualization.

The Rise of Micro-Frontends
As applications grow in complexity, micro-frontends are becoming an increasingly popular architecture pattern. This approach allows teams to work independently while maintaining a cohesive user experience.

Conclusion
The future of web development is bright and full of possibilities. By staying curious and embracing new technologies, we can build amazing experiences that were previously impossible.`
    },
    {
      title: "Building Scalable Systems",
      excerpt: "Key principles and patterns for designing systems that can handle growth gracefully. Learn from real-world experiences and best practices.",
      date: "Dec 10, 2024",
      readTime: "8 min read",
      content: `Building systems that scale isn't just about handling more users—it's about creating architectures that can adapt and evolve as requirements change.

Start With the Right Foundation
Scalability begins with good design decisions. Choose technologies and patterns that support growth from day one, but avoid over-engineering for problems you don't yet have.

Design for Failure
In distributed systems, failures are inevitable. Design your systems to be resilient, with proper error handling, circuit breakers, and fallback mechanisms.

Monitor Everything
You can't improve what you don't measure. Implement comprehensive monitoring and observability from the beginning. This includes not just technical metrics, but business metrics as well.

Embrace Asynchronous Processing
Not every operation needs to happen synchronously. Use message queues and background jobs to handle operations that don't require immediate responses.

Database Optimization
As your data grows, database performance becomes critical. Implement proper indexing, consider sharding strategies, and use caching effectively.

Conclusion
Building scalable systems is a journey, not a destination. Keep learning, stay curious, and always be ready to adapt your approach as your system evolves.`
    },
    {
      title: "Design Systems That Work",
      excerpt: "Creating and maintaining design systems that empower teams and ensure consistency across products. Best practices from industry leaders.",
      date: "Dec 5, 2024",
      readTime: "6 min read",
      content: `A well-crafted design system is more than just a collection of components—it's a shared language that enables teams to work more effectively and create consistent user experiences.

Start With Principles, Not Components
Before diving into component design, establish clear design principles. These principles will guide every decision and help maintain consistency as your system grows.

Build for Flexibility
Your design system should be flexible enough to accommodate different use cases while maintaining consistency. Think in terms of composable components rather than rigid templates.

Documentation is Key
A design system is only as good as its documentation. Invest time in creating clear, comprehensive documentation with plenty of examples.

Involve the Entire Team
Design systems work best when they're created collaboratively. Include designers, developers, product managers, and even users in the process.

Iterate and Evolve
Your design system should be a living thing that evolves with your product. Regular reviews and updates ensure it stays relevant and useful.

Conclusion
A successful design system requires ongoing investment and maintenance, but the returns—in terms of consistency, efficiency, and quality—are well worth it.`
    }
  ];

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold gradient-text">Portfolio</div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors duration-300">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Projects</a>
            <a href="#articles" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Articles</a>
            <Button className="bg-primary hover:bg-primary/90 glow-effect">
              Contact <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Available for new opportunities</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="gradient-text">Creative Developer</span>
            <br />
            <span className="text-foreground">& Digital Innovator</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences through innovative design and cutting-edge technology. 
            Passionate about building products that make a difference.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-effect text-lg px-8">
              View My Work <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted text-lg px-8">
              Get In Touch
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 pt-12">
            <a href="mailto:hello@example.com" className="p-3 bg-muted/50 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110">
              <Mail className="w-5 h-5 text-foreground" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted/50 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110">
              <Github className="w-5 h-5 text-foreground" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted/50 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110">
              <Linkedin className="w-5 h-5 text-foreground" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-5xl font-bold">
                <span className="gradient-text">About Me</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate developer and designer with a keen eye for detail and a love for creating 
                  innovative digital experiences. With years of experience in the tech industry, I've worked 
                  on projects ranging from startups to enterprise solutions.
                </p>
                <p>
                  My approach combines technical expertise with creative problem-solving. I believe in building 
                  products that not only work flawlessly but also delight users with their design and functionality.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge through writing and speaking at tech events.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                {["JavaScript", "TypeScript", "React", "Node.js", "Python", "UI/UX Design", "Cloud Architecture"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="glass-card p-8 rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Workspace"
                  className="rounded-xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-glow-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work showcasing innovative solutions and creative implementations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold">
              <span className="gradient-text">Knowledge Sharing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about technology, design, and innovation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={article.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ArticleCard {...article} onClick={() => handleArticleClick(article)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="text-2xl font-bold gradient-text">Let's Create Something Amazing</div>
          <p className="text-muted-foreground">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex items-center justify-center gap-6 pt-4">
            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              hello@example.com
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              GitHub
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              LinkedIn
            </a>
          </div>
          <div className="text-sm text-muted-foreground pt-6">
            © 2024 All rights reserved. Built with passion and innovation.
          </div>
        </div>
      </footer>

      <ArticleModal article={selectedArticle} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Index;
