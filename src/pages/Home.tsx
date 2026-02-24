import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, ExternalLink, Sparkles, Zap, Layers, MousePointer, Gauge, Box } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useRef } from 'react';

const services = [
  { icon: Box, title: '3D Landing Pages', description: 'Immersive three-dimensional experiences that captivate from the first scroll.' },
  { icon: MousePointer, title: 'Interactive Product Sites', description: 'Engaging product showcases that let users explore every detail.' },
  { icon: Sparkles, title: 'Motion UI', description: 'Fluid animations and transitions that guide attention and elevate feel.' },
  { icon: Layers, title: 'Scroll-Based Experiences', description: 'Narrative-driven layouts that unfold as users scroll through your story.' },
  { icon: Gauge, title: 'Performance Optimization', description: 'Blazing-fast load times without sacrificing visual richness.' },
];

const projects = [
  {
    title: 'Client Portfolio',
    description: 'A cinematic 3D portfolio built to demonstrate motion-driven design and modern frontend execution.',
    link: 'https://surenderportfolio.vercel.app',
  },
  {
    title: 'Coaching Landing Page',
    description: 'High-conversion landing page crafted with motion UI and clear structure to maximize student engagement.',
    link: 'https://gyaaninstitute.vercel.app/',
  },
];

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

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <ScrollReveal key={project.title} delay={i * 0.15}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="size-5 text-muted-foreground group-hover:text-primary transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View Live <ArrowRight className="size-3" />
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>

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
              <div className="mt-10">
                <a
                  href="mailto:divyanshurathore2806@gmail.com"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background font-semibold text-lg hover:opacity-90 transition-all"
                >
                  <Mail className="size-5" />
                  divyanshurathore2806@gmail.com
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
