import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const KEY = 'divraweb_tod_theme_set_v1';

/**
 * On first visit only, set theme based on the visitor's local time:
 * 6:00–18:00 → light, otherwise → dark.
 * Subsequent visits respect whatever the user (or toggle) chose.
 */
export function TimeBasedTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (localStorage.getItem(KEY)) return;
      const hour = new Date().getHours();
      const wantsLight = hour >= 6 && hour < 18;
      setTheme(wantsLight ? 'light' : 'dark');
      localStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
  }, [setTheme]);

  return null;
}
