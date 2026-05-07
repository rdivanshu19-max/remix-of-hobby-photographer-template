import { useState } from 'react';
import { Sparkles, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface VibeMatchResult {
  title: string;
  score: number; // 0-100
  reason: string;
}

interface VibeMatchProps {
  projects: { title: string; description: string; category: string }[];
  onResults: (results: VibeMatchResult[] | null) => void;
  active: boolean;
}

export function VibeMatch({ projects, onResults, active }: VibeMatchProps) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const text = prompt.trim();
    if (!text) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('vibe-match', {
        body: { prompt: text, projects },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const ranked: VibeMatchResult[] = data?.matches ?? [];
      if (!ranked.length) {
        toast.error('No matches returned. Try rephrasing.');
        return;
      }
      onResults(ranked);
      setOpen(false);
      toast.success('Ranked by vibe ✨');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Vibe Match failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    onResults(null);
    setPrompt('');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            active
              ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white border-transparent'
              : 'border-border hover:border-primary/40 text-foreground'
          }`}
        >
          <Sparkles className="size-4" />
          AI Vibe Match
        </button>
        {active && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition"
          >
            <X className="size-3" /> Reset ranking
          </button>
        )}
      </div>

      {open && (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Describe your dream project
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="e.g. A cinematic landing page for an EdTech startup with bold motion and clear CTAs"
            className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-full text-sm border border-border text-muted-foreground hover:text-foreground transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={loading || !prompt.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              {loading ? 'Matching…' : 'Find my match'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
