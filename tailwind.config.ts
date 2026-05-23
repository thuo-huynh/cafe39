import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        rule: 'var(--rule)',
      },
      fontFamily: {
        display: ['var(--display)'],
        body: ['var(--body)'],
        mono: ['var(--mono)'],
      },
    },
  },
  plugins: [],
};

export default config;
