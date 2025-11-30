'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '@/store/theme-store';
import { Button } from './button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </Button>
  );
}
