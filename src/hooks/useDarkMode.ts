/**
 * Custom hook for dark mode toggle with localStorage persistence
 */

import { useEffect, useState } from 'react';

export const useDarkMode = (): [boolean, () => void] => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  const toggleDarkMode = (): void => {
    setIsDark((prev) => !prev);
  };

  return [isDark, toggleDarkMode];
};

