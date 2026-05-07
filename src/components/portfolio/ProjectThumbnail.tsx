interface ProjectThumbnailProps {
  url: string;
  title: string;
}

const PALETTES = [
  'from-indigo-600 via-purple-600 to-pink-600',
  'from-emerald-600 via-teal-600 to-cyan-600',
  'from-amber-500 via-orange-600 to-rose-600',
  'from-sky-600 via-blue-600 to-indigo-700',
  'from-fuchsia-600 via-pink-600 to-rose-600',
  'from-lime-500 via-green-600 to-emerald-700',
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function ProjectThumbnail({ url, title }: ProjectThumbnailProps) {
  const palette = PALETTES[hash(title) % PALETTES.length];
  const domain = getDomain(url);

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${palette} overflow-hidden`}>
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
