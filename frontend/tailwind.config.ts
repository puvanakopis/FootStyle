import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ee2b4b',
        'background-light': '#f8f6f6',
        'background-dark': '#221013',
        'text-main-light': '#1b0d10',
        'text-main-dark': '#fcf8f9',
        'text-sec-light': '#582f35',
        'text-sec-dark': '#dcb8be',
        'surface-light': '#edf0f5ff',
        'surface-dark': '#1e1e1e',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [forms, containerQueries],
};

export default config;