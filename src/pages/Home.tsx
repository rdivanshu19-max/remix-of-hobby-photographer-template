import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, ExternalLink, Sparkles, Zap, Layers, MousePointer, Gauge, Box, Instagram } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProjectThumbnail } from '@/components/portfolio/ProjectThumbnail';
import { useRef, useState } from 'react';

const services = [
  { icon: Box, title: '3D Landing Pages', description: 'Immersive three-dimensional experiences that captivate from the first scroll.' },
  { icon: MousePointer, title: 'Interactive Product Sites', description: 'Engaging product showcases that let users explore every detail.' },
  { icon: Sparkles, title: 'Motion UI', description: 'Fluid animations and transitions that guide attention and elevate feel.' },
  { icon: Layers, title: 'Scroll-Based Experiences', description: 'Narrative-driven layouts that unfold as users scroll through your story.' },
  { icon: Gauge, title: 'Performance Optimization', description: 'Blazing-fast load times without sacrificing visual richness.' },
];

const projects = [
  {
    title: 'Coaching Landing Page',
    description: 'High-conversion landing page crafted with motion UI and clear structure to maximize student engagement.',
    link: 'https://gyaaninstitute.vercel.app/',
    category: 'Landing Page',
    year: 2024,
  },
  {
    title: 'Landing Page for Restaurant',
    description: 'Modern restaurant site with booking automation and clean visual hierarchy that converts visitors into reservations.',
    link: 'https://indian-era.netlify.app/',
    category: 'Landing Page',
    year: 2024,
  },
  {
    title: 'RANKERS STAR',
    description: 'AI-powered edtech platform for serious JEE aspirants with smart mock tests, detailed performance analysis, curated resources, and personalized insights for focused improvement.',
    link: 'https://rankers-stars.vercel.app/',
    category: 'EdTech',
    year: 2025,
  },
  {
    title: 'NEXUS CBT',
    description: 'AI-powered CBT platform for JEE and NEET aspirants that turns exam PDFs into a real test interface with timers, navigation, negative marking, analytics, and AI insights.',
    link: 'https://nexuscbt.vercel.app/',
    category: 'EdTech',
    year: 2025,
  },
  {
    title: 'Content Catalyst Hub',
    description: 'Structured, SEO-focused content platform built for clean reading, fast performance, curated categories, and long-term organic growth through consistent publishing.',
    link: 'https://contentcatalysthub.vercel.app/',
    category: 'Content',
    year: 2025,
  },
];

const projectCategories = ['All', 'Landing Page', 'EdTech', 'Content'];

const testimonials = [
  { quote: 'Divyanshu turned our boring static site into something that actually makes people stop scrolling. Conversions went up 40% in the first month.' },
  { quote: 'The scroll animations and layout hierarchy he built are next level. Our students say the website alone convinced them to enroll.' },
  { quote: 'Working with Divyanshu felt like hiring a creative partner, not just a developer. He thinks about user experience at every pixel.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'az'>('newest');
  const filteredProjects = (activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory))
    .slice()
    .sort((a, b) => (sortBy === 'az' ? a.title.localeCompare(b.title) : b.year - a.year));

  const getThumb = (url: string) =>
    `https://image.thum.io/get/width/800/crop/600/noanimate/${url}`;

  return (
    <>
      <SEOHead
        title="Divyanshu Rathore — Cinematic Web Developer"
        description="I make modern cinematic websites, not boring rectangles. Turning attention into clients with motion, 3D, and immersive design."
      />

      <div className="min-h-screen bg-background">
        {/* ═══════════════ HERO ═══════════════ */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
            <video
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              src="/hero-video.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </motion.div>

          <motion.div
            className="relative z-10 text-center px-6 max-w-5xl"
            style={{ opacity: heroOpacity }}
          >
            <motion.p
              className="text-sm md:text-base tracking-[0.35em] uppercase text-white/70 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Web Developer · 3D · Motion
            </motion.p>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              I MAKE CINEMATIC
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                WEBSITES
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Not boring rectangles. I convert attention into clients.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all"
              >
                View My Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="mailto:divyanshurathore2806@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all"
              >
                <Mail className="size-4" />
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </div>
          </motion.div>
        </section>

        {/* ═══════════════ WHAT I DO ═══════════════ */}
        <section className="py-28 md:py-36 px-6 lg:px-8 bg-background" id="services">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Services</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                What I Do
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                I help brands with immersive digital experiences that feel premium, not generic.
              </p>
            </ScrollReveal>

            <motion.div
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  custom={i}
                  className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
                >
                  <s.icon className="size-8 text-primary mb-5 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <ScrollReveal delay={0.3}>
              <p className="mt-10 text-center text-muted-foreground italic">
                Designed to increase user engagement through motion hierarchy and immersive layout.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════ WORK ═══════════════ */}
        <section className="py-28 md:py-36 px-6 lg:px-8 border-t border-border" id="work">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Selected Work
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {projectCategories.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          isActive
                            ? 'bg-foreground text-background border-foreground'
                            : 'bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <label htmlFor="sort-projects" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Sort
                  </label>
                  <select
                    id="sort-projects"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'az')}
                    className="px-3 py-2 rounded-full text-sm font-medium bg-transparent text-foreground border border-border hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="newest">Newest</option>
                    <option value="az">A–Z</option>
                  </select>
                </div>
              </div>
            </ScrollReveal>

            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
              >
                {filteredProjects.map((project, i) => (
                  <ScrollReveal key={project.title} delay={Math.min(i * 0.1, 0.4)}>
                    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block aspect-[16/10] overflow-hidden"
                        aria-label={`Open ${project.title}`}
                      >
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                          <ProjectThumbnail url={project.link} title={project.title} />
                        </div>
                      </a>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                            {project.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{project.year}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-4">
                          {project.description}
                        </p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-start px-5 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all"
                        >
                          View Live Project
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </motion.div>
            ) : (
              <ScrollReveal>
                <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 p-10 sm:p-14 text-center">
                  <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Layers className="size-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">No projects in “{activeCategory}” yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    I'm cooking up new work in this category. In the meantime, browse all projects.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('All')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all"
                  >
                    Show all projects
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.3}>
              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground">
                  Many more projects — don't hesitate to{' '}
                  <a
                    href="mailto:divyanshurathore2806@gmail.com"
                    className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
                  >
                    contact me
                  </a>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════ ABOUT ═══════════════ */}
        <section className="py-28 md:py-36 px-6 lg:px-8 border-t border-border" id="about">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">About</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
                Who I Am
              </h2>
            </ScrollReveal>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <ScrollReveal delay={0.1}>
                <p>
                  I'm <span className="text-foreground font-semibold">Divyanshu Rathore</span> — a 3D web developer blending engineering logic with visual storytelling. I design immersive, motion-driven websites that feel premium, not generic.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p>
                  I focus on interactive experiences, smooth animations, and clean performance. Every project is built with precision — from camera movement to layout hierarchy — because details decide whether something feels professional or forgettable.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>
                  I don't ship half-baked work. I care about realism, flow, and usability. If I build it, it's meant to stand out.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p>
                  Currently exploring advanced 3D web, motion UI, and modern frontend workflows while helping brands and creators turn ideas into visually powerful digital experiences.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════ TESTIMONIALS ═══════════════ */}
        <section className="py-28 md:py-36 px-6 lg:px-8 border-t border-border bg-secondary/30" id="testimonials">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Testimonials</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                What Clients Say
              </h2>
            </ScrollReveal>

            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="p-8 rounded-2xl border border-border bg-card"
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Sparkles key={j} className="size-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <blockquote className="text-foreground leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ CTA / CONTACT ═══════════════ */}
        <section className="py-28 md:py-36 px-6 lg:px-8 border-t border-border" id="contact">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Let's Build Something
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  Unforgettable
                </span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
                Have a project in mind? I'm currently available for freelance work and collaborations.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:divyanshurathore2806@gmail.com"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background font-semibold text-lg hover:opacity-90 transition-all"
                >
                  <Mail className="size-5" />
                  divyanshurathore2806@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/divraweb?igsh=MWJzOGRxczZsNnJ6bw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-full border border-border text-foreground font-semibold text-lg hover:bg-accent transition-all"
                >
                  <Instagram className="size-5" />
                  @divraweb
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
