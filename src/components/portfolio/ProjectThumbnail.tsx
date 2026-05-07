interface ProjectThumbnailProps {
  url: string;
  title: string;
  index?: number;
}

// 8 distinct, dark/light-mode balanced palettes
const PALETTES = [
  'from-indigo-700 via-purple-600 to-fuchsia-500',   // 0 violet
  'from-emerald-700 via-teal-600 to-cyan-400',       // 1 emerald
  'from-orange-700 via-rose-600 to-pink-500',        // 2 sunset
  'from-blue-800 via-sky-600 to-cyan-400',           // 3 ocean
  'from-violet-800 via-fuchsia-600 to-rose-500',     // 4 magenta
  'from-green-800 via-lime-600 to-yellow-400',       // 5 lime
  'from-slate-800 via-zinc-700 to-neutral-500',      // 6 graphite
  'from-red-800 via-orange-600 to-amber-400',        // 7 fire
];

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function ProjectThumbnail({ url, title, index = 0 }: ProjectThumbnailProps) {
  // Step by 3 (coprime to 8) so neighbors never share a palette
  const palette = PALETTES[(index * 3) % PALETTES.length];
  const domain = getDomain(url);

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${palette} overflow-hidden ring-1 ring-inset ring-white/10`}>
      {/* Tone layer for light-mode contrast */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/0" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          color: 'white',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

      {/* Title content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 sm:p-6 text-white">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="ml-2 truncate text-[11px] font-mono opacity-80">{domain}</span>
        </div>

        <div>
          <h4 className="font-black uppercase leading-[0.95] tracking-tight drop-shadow-md text-2xl sm:text-3xl md:text-4xl">
            {title}
          </h4>
          <div className="mt-3 h-[3px] w-12 bg-white/80 rounded-full" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
