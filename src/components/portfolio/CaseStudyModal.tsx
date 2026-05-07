import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ExternalLink, Lightbulb, Workflow, TrendingUp, ArrowRight } from 'lucide-react';

export interface CaseStudyProject {
  title: string;
  description: string;
  link: string;
  category: string;
  year: number;
}

interface CaseStudyModalProps {
  project: CaseStudyProject | null;
  index: number;
  onClose: () => void;
}

// Per-project narrative. Falls back to a generic story when not specified.
const STORIES: Record<string, { problem: string; process: string[]; results: string[] }> = {
  'GRAVITAS': {
    problem: 'JEE & NEET aspirants drown in practice apps that track scores but never address why they fail — fading motivation, blind spots, no self-awareness.',
    process: [
      'Mapped psychological pain-points across 30+ aspirants',
      'Designed mistake-mapping & urgency loops, not just analytics',
      'Built gamified revision flows with self-reflection checkpoints',
      'Iterated UI to feel like a mirror, not a study app',
    ],
    results: [
      'Daily active retention pattern modeled around emotion, not features',
      'Aspirants self-report stronger awareness of recurring weak topics',
      'Positioned as a category-defining "performance mirror"',
    ],
  },
  'What If I Was Born There': {
    problem: 'Most people never grasp how much their nationality shapes income, lifespan, education and freedom.',
    process: [
      'Aggregated real datasets across 50+ nations',
      'Designed an empathetic life-simulation flow',
      'Built clean visual storytelling per country',
      'Optimized for shareability on social platforms',
    ],
    results: [
      'Turns abstract global data into a personal story in seconds',
      'High share-through on social — perfect viral hook',
      'Demonstrates data + narrative design in a single artifact',
    ],
  },
};

const DEFAULT_STORY = (p: CaseStudyProject) => ({
  problem: `Visitors expected from ${p.category.toLowerCase()} clients are short on attention and high on intent. The site had to convert in under 5 seconds.`,
  process: [
    'Defined the single conversion goal & ruthless visual hierarchy',
    'Built motion UI to guide the eye, not decorate it',
    'Tuned performance — lazy media, code splitting, modern formats',
    'Polished copy & micro-interactions for trust signals',
  ],
  results: [
    'Faster perceived load via scroll-driven choreography',
    'Cleaner CTAs lift click-through on the primary action',
    'Mobile-first layout — no broken regions, no janky scroll',
  ],
});

export function CaseStudyModal({ project, index, onClose }: CaseStudyModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  // Lock body scroll while open
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  const story = project ? STORIES[project.title] || DEFAULT_STORY(project) : null;

  // Same palette logic as ProjectThumbnail
  const palettes = [
    'from-indigo-700 via-purple-600 to-fuchsia-500',
    'from-emerald-700 via-teal-600 to-cyan-400',
    'from-orange-700 via-rose-600 to-pink-500',
    'from-blue-800 via-sky-600 to-cyan-400',
    'from-violet-800 via-fuchsia-600 to-rose-500',
    'from-green-800 via-lime-600 to-yellow-400',
    'from-slate-800 via-zinc-700 to-neutral-500',
    'from-red-800 via-orange-600 to-amber-400',
  ];
  const palette = palettes[(index * 3) % palettes.length];

  return (
    <AnimatePresence>
      {project && story && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-foreground origin-left z-[210]"
            style={{ scaleX: scrollYProgress }}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="fixed top-4 right-4 z-[220] inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-4 py-2 text-sm font-medium hover:bg-accent transition"
          >
            <X className="size-4" /> Close
          </button>

          <div ref={scrollRef} className="relative h-screen overflow-y-auto">
            {/* HERO */}
            <motion.section
              className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${palette} text-white px-6`}
              style={{ scale: heroScale, opacity: heroOpacity }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  color: 'white',
                }}
              />
              <div className="relative z-10 max-w-4xl text-center">
                <p className="text-xs sm:text-sm tracking-[0.4em] uppercase opacity-80 mb-4">
                  {project.category} · {project.year}
                </p>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.95] drop-shadow-xl">
                  {project.title}
                </h1>
                <p className="mt-6 text-base sm:text-lg max-w-2xl mx-auto opacity-90">
                  {project.description}
                </p>
                <div className="mt-8 text-xs uppercase tracking-widest opacity-70 animate-pulse">
                  Scroll ↓
                </div>
              </div>
            </motion.section>

            {/* PROBLEM */}
            <Section icon={<Lightbulb className="size-6" />} eyebrow="01 — Problem" title="The tension we set out to solve">
              <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">{story.problem}</p>
            </Section>

            {/* PROCESS */}
            <Section icon={<Workflow className="size-6" />} eyebrow="02 — Process" title="How it came together">
              <ol className="space-y-5">
                {story.process.map((step, i) => (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-5"
                  >
                    <span className="font-mono text-xs text-muted-foreground tabular-nums mt-1">
                      0{i + 1}
                    </span>
                    <span className="text-base sm:text-lg">{step}</span>
                  </motion.li>
                ))}
              </ol>
            </Section>

            {/* RESULTS */}
            <Section icon={<TrendingUp className="size-6" />} eyebrow="03 — Results" title="What it ships with">
              <ul className="grid gap-4 sm:grid-cols-2">
                {story.results.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="rounded-2xl border border-border bg-card p-5 text-base"
                  >
                    {r}
                  </motion.li>
                ))}
              </ul>
            </Section>

            {/* CTA */}
            <section className="px-6 lg:px-8 py-24 sm:py-32 border-t border-border">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">See it live</h3>
                <p className="text-muted-foreground mb-8">
                  Best experienced full-screen on the actual site.
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold hover:opacity-90 transition"
                >
                  Open {project.title}
                  <ExternalLink className="size-4" />
                </a>
                <div className="mt-12">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Back to all projects <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 lg:px-8 py-24 sm:py-32 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4 text-primary">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10">
              {icon}
            </span>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{eyebrow}</p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-8">{title}</h2>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
