import { useState } from 'react';
import { Menu, X, Moon, Sun, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import divrawebLogo from '@/assets/divraweb-logo.jpg';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export function Header() {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="flex items-center gap-2"
          >
            <img src={divrawebLogo} alt="divraweb logo" className="h-8 rounded object-contain" />
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors duration-300',
                  isScrolled
                    ? 'text-foreground/80 hover:text-foreground'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={cn(
                'size-9 flex items-center justify-center rounded-full transition-colors',
                isScrolled ? 'text-foreground hover:bg-accent' : 'text-white/80 hover:text-white'
              )}
              aria-label="Toggle dark mode"
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <a
              href="https://www.instagram.com/divraweb?igsh=MWJzOGRxczZsNnJ6bw=="
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'size-9 flex items-center justify-center rounded-full transition-colors',
                isScrolled ? 'text-foreground hover:bg-accent' : 'text-white/80 hover:text-white'
              )}
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="mailto:divyanshurathore2806@gmail.com"
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className={cn('md:hidden size-9 flex items-center justify-center', isScrolled ? 'text-foreground' : 'text-white')}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="mailto:divyanshurathore2806@gmail.com"
                className="mt-2 px-5 py-3 rounded-full bg-foreground text-background text-center text-sm font-semibold"
              >
                Hire Me
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
