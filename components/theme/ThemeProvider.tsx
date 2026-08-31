'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Mode = 'light' | 'dark';
export type BrandTheme = 'violet' | 'gold';

interface ThemeContextType {
  theme: Mode;
  brandTheme: BrandTheme;
  toggleTheme: () => void;
  setTheme: (theme: Mode) => void;
  setBrandTheme: (brand: BrandTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Mode>('light');
  const [brandTheme, setBrandThemeState] = useState<BrandTheme>('violet');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check local storage for Mode (light/dark)
    const savedTheme = localStorage.getItem('app-theme') as Mode | null;
    if (savedTheme) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = systemPrefersDark ? 'dark' : 'light';
      setThemeState(initial);
      applyTheme(initial);
    }

    // 2. Check local storage / settings for Brand Theme (violet / gold)
    const savedBrand = localStorage.getItem('app-brand-theme') as BrandTheme | null;
    if (savedBrand) {
      setBrandThemeState(savedBrand);
      applyBrandTheme(savedBrand);
    } else {
      // Fetch public setting
      fetch('/api/public/settings')
        .then((res) => res.json())
        .then((data) => {
          if (data.settings?.brandTheme) {
            setBrandThemeState(data.settings.brandTheme);
            applyBrandTheme(data.settings.brandTheme);
          }
        })
        .catch(() => {});
    }

    setMounted(true);
  }, []);

  const applyTheme = (t: Mode) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const applyBrandTheme = (b: BrandTheme) => {
    const root = document.documentElement;
    if (b === 'gold') {
      root.classList.add('theme-gold');
      root.classList.remove('theme-violet');
    } else {
      root.classList.add('theme-violet');
      root.classList.remove('theme-gold');
    }
  };

  const setTheme = (newTheme: Mode) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  const setBrandTheme = (newBrand: BrandTheme) => {
    setBrandThemeState(newBrand);
    localStorage.setItem('app-brand-theme', newBrand);
    applyBrandTheme(newBrand);
  };

  return (
    <ThemeContext.Provider value={{ theme, brandTheme, toggleTheme, setTheme, setBrandTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
