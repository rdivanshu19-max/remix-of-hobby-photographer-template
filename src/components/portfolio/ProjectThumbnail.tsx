import { useEffect, useState } from 'react';

interface ProjectThumbnailProps {
  url: string;
  title: string;
}

const PALETTES = [
  'from-indigo-500/30 via-purple-500/20 to-pink-500/30',
  'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
  'from-amber-500/30 via-orange-500/20 to-rose-500/30',
  'from-sky-500/30 via-blue-500/20 to-indigo-500/30',
  'from-fuchsia-500/30 via-pink-500/20 to-rose-500/30',
  'from-lime-500/30 via-green-500/20 to-emerald-500/30',
];

const CACHE_KEY = 'divraweb_thumb_cache_v1';

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function getInitials(title: string) {
  return title
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function readCache(): Record<string, 'ok' | 'fail'> {
  try {
    return JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeCache(url: string, status: 'ok' | 'fail') {
  try {
    const c = readCache();
    c[url] = status;
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
}

export function ProjectThumbnail({ url, title }: ProjectThumbnailProps) {
  const cached = typeof window !== 'undefined' ? readCache()[url] : undefined;
  const [status, setStatus] = useState<'loading' | 'ok' | 'fail'>(
    cached === 'fail' ? 'fail' : cached === 'ok' ? 'ok' : 'loading'
  );

  const palette = PALETTES[hash(title) % PALETTES.length];
  const initials = getInitials(title);
  const src = `https://image.thum.io/get/width/800/crop/600/noanimate/${url}`;

  useEffect(() => {
    if (status !== 'loading') return;
    const img = new Image();
    img.onload = () => {
      writeCache(url, 'ok');
      setStatus('ok');
    };
    img.onerror = () => {
      writeCache(url, 'fail');
      setStatus('fail');
    };
    img.src = src;
  }, [src, url, status]);

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${palette}`}>
      {/* Skeleton shimmer while loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-muted/40" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>
      )}

      {/* Loaded image */}
      {status === 'ok' && (
        <img
          src={src}
          alt={`${title} preview`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}

      {/* Initials fallback */}
      {status === 'fail' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-6xl font-black tracking-tight text-foreground/80 select-none drop-shadow-sm">
            {initials}
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
}
