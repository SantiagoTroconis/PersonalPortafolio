import { useState, Suspense, useEffect } from "react";
import { Mail, Github, Linkedin, ArrowRight, Sparkles, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleModal } from "@/components/ArticleModal";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTypescript, SiJavascript } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Scene } from "@/components/canvas/Scene";
import articles from "@/data/articles.json";

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageSet, setCurrentImageSet] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const projects = [
    {
      title: "Proyecto Alpha",
      description: "Una solución innovadora para aplicaciones web modernas con funciones de colaboración en tiempo real y visualización de datos avanzada.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      tags: ["React", "TypeScript", "Node.js", "WebSocket"],
      links: {
        demo: "https://example.com",
        github: "https://github.com"
      }
    },
    {
      title: "Proyecto Beta",
      description: "Una plataforma creativa que conecta a diseñadores y desarrolladores a través de una interfaz intuitiva y potentes herramientas de colaboración.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      tags: ["Next.js", "Tailwind", "PostgreSQL"],
      links: {
        demo: "https://example.com"
      }
    },
    {
      title: "Proyecto Gamma",
      description: "Un panel de análisis impulsado por IA que transforma datos complejos en información práctica con visualizaciones atractivas.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tags: ["Python", "TensorFlow", "React", "D3.js"],
      links: {
        github: "https://github.com"
      }
    }
  ];

  const skills = [
    { name: "JavaScript", icon: <SiJavascript className="w-6 h-6" /> },
    { name: "TypeScript", icon: <SiTypescript className="w-6 h-6" /> },
    { name: "React", icon: <FaReact className="w-6 h-6" /> },
    { name: "Node.js", icon: <FaNodeJs className="w-6 h-6" /> },
    { name: "Python", icon: <FaPython className="w-6 h-6" /> },
    { name: "UI/UX Design", icon: <VscCode className="w-6 h-6" /> },
  ];

  const imageGallery = [
    [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488590088325-68d34e0cccde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    ],
    [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
    ]
  ];

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % imageGallery.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Three.js Background Grid */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <main className="relative z-10 selection:bg-white/20 selection:text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5 bg-black/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-bold tracking-tight text-white">Troconis</div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300">Sobre mí</a>
              <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300">Proyectos</a>
              <a href="#articles" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300">Artículos</a>
              <Button asChild className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-medium">
                <a href="#contact">
                  Contáctame <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen text-white relative overflow-hidden">
          {/* Hero Content */}
          <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 pt-32 pb-12">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto w-full">
              <div className="space-y-6 animate-fade-in-up">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors cursor-default">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-sm text-gray-200 font-medium tracking-wide">Disponible para nuevas oportunidades</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter max-w-5xl">
                  <span className="block text-white mb-2 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>Santiago</span>
                  <span className="block text-white mb-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>Troconis</span>
                  <span className="block text-gray-500 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>Desarrollador</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Creando experiencias digitales excepcionales con código limpio y diseño innovador.
                </p>
              </div>
            </div>

            {/* Bottom Section with CTA and Social */}
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button size="lg" asChild className="bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 rounded-full h-12 sm:h-14 min-w-[180px] sm:min-w-[200px] group">
                    <a href="#projects">
                      Ver mi Trabajo
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/10 text-white hover:text-white hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 rounded-full h-12 sm:h-14 min-w-[180px] sm:min-w-[200px]">
                    <a href="#contact">
                      Ponerse en Contacto
                    </a>
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <a
                    href="mailto:stroconisa@gmail.com"
                    className="group flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden lg:block">Email</span>
                  </a>
                  <a
                    href="https://github.com/SantiagoTroconis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                      <Github className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden lg:block">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/santiago-troconis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden lg:block">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery - Horizontal Scroll - Hidden on mobile for better performance */}
          <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div
              className="flex gap-4 h-full transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentImageSet * 100}%)`,
              }}
            >
              {imageGallery.map((set, setIndex) => (
                <div key={setIndex} className="flex gap-4 min-w-full h-full">
                  {set.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative min-w-[280px] h-full overflow-hidden"
                      style={{
                        transform: `translateY(${scrollY * 0.05 * (imgIndex % 2 === 0 ? 1 : -1)}px)`
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover grayscale"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/95" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Subtle Decorative Elements - Blend with grid background */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />

          {/* Floating Icons - Subtle */}
          <div className="hidden xl:block absolute top-1/3 left-12 animate-float opacity-5 pointer-events-none">
            <Code className="w-16 h-16" />
          </div>
          <div className="hidden xl:block absolute bottom-1/3 left-24 animate-float opacity-5 pointer-events-none" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-12 h-12" />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce pointer-events-none">
            <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        </section>

        {/* Rest of the content */}
        <div className="px-6 space-y-32 pb-32">
          <section id="about" className="max-w-6xl mx-auto pt-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-slide-in-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Sobre Mí
                </h2>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
                  <p>
                    Soy un desarrollador y diseñador apasionado con un buen ojo para los detalles y un amor por crear
                    experiencias digitales innovadoras. Con años de experiencia en la industria tecnológica, he trabajado
                    en proyectos que van desde startups hasta soluciones empresariales.
                  </p>
                  <p>
                    Mi enfoque combina la experiencia técnica con la resolución creativa de problemas. Creo en la construcción de
                    productos que no solo funcionan a la perfección, sino que también deleitan a los usuarios con su diseño y funcionalidad.
                  </p>
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-6 text-white">Stack Tecnológico</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white rounded-full border border-white/5 hover:border-white/20 transition-all duration-300 cursor-default">
                        {skill.icon}
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative animate-slide-in-right group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-card p-2 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                    alt="Workspace"
                    className="rounded-xl w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Proyectos Destacados
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Una selección de mi trabajo reciente que muestra soluciones innovadoras e implementaciones creativas
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={project.title} className="animate-scale-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </section>

          <section id="articles" className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Compartiendo Conocimiento
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Ideas, tutoriales y reflexiones sobre tecnología, diseño e innovación
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div key={article.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ArticleCard {...article} onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl -z-10" />
            <div className="glass-card p-12 rounded-3xl border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                ¿Listo para empezar?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                ¿Tienes una idea innovadora o un proyecto desafiante? Me encantaría ayudarte a hacerlo realidad.
              </p>
              <Button size="lg" asChild className="bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 text-lg px-10 py-8 rounded-full shadow-xl shadow-white/5">
                <a href="mailto:stroconisa@gmail.com">
                  Envíame un Correo <Mail className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </section>
        </div>

        <footer className="border-t border-white/5 py-12 px-6 bg-black/40 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-bold text-white tracking-tight">Troconis</div>

            <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
              <a href="mailto:stroconisa@gmail.com" className="hover:text-white transition-colors duration-300">
                stroconisa@gmail.com
              </a>
              <a href="https://github.com/SantiagoTroconis" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                GitHub
              </a>
              <a href="https://linkedin.com/in/santiago-troconis" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                LinkedIn
              </a>
            </div>

            <div className="text-sm text-gray-400">
              © 2025 Todos los derechos reservados.
            </div>
          </div>
        </footer>

        <ArticleModal article={selectedArticle} open={modalOpen} onOpenChange={setModalOpen} />
      </main>
    </>
  );
};

export default Index;