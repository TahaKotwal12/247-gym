/**
 * Design tokens for 247 Gym - The Fitness District
 * Centralized design system values
 */

export const tokens = {
  colors: {
    primary: {
      main: '#0f766e',
      light: '#10b981',
      dark: '#0d9488',
    },
    secondary: {
      main: '#111827',
      light: '#1f2937',
      dark: '#0a0e14',
    },
    accent: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    neutral: {
      light: '#f8fafc',
      white: '#ffffff',
      dark: '#111827',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      inverse: '#ffffff',
    },
    background: {
      light: '#f8fafc',
      white: '#ffffff',
      dark: '#111827',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

