import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary design tokens from Precision Growth Engine design system
        surface: {
          DEFAULT: '#16130e',
          dim: '#16130e',
          bright: '#3d3933',
          lowest: '#100e09',
          low: '#1e1b16',
          container: '#221f1a',
          high: '#2d2924',
          highest: '#38342e',
          variant: '#38342e',
        },
        'on-surface': '#e9e1d8',
        'on-surface-variant': '#d0c5b4',
        'inverse-surface': '#e9e1d8',
        'inverse-on-surface': '#34302a',
        outline: '#998f80',
        'outline-variant': '#4d4639',
        'surface-tint': '#e6c277',

        // Primary: Electric Gold
        primary: '#e6c277',
        'on-primary': '#402d00',
        'primary-container': '#c6a45c',
        'on-primary-container': '#503a00',
        'inverse-primary': '#765a19',
        'primary-fixed': '#ffdf9f',
        'primary-fixed-dim': '#e6c277',
        'on-primary-fixed': '#261a00',
        'on-primary-fixed-variant': '#5b4301',

        // Secondary: Midnight Blue
        secondary: '#bec7dc',
        'on-secondary': '#283141',
        'secondary-container': '#40495b',
        'on-secondary-container': '#afb8cd',
        'secondary-fixed': '#dae2f9',
        'secondary-fixed-dim': '#bec7dc',
        'on-secondary-fixed': '#131c2b',
        'on-secondary-fixed-variant': '#3e4758',

        // Tertiary: Off-White
        tertiary: '#c6c7c2',
        'on-tertiary': '#2f312e',
        'tertiary-container': '#a8a9a5',
        'on-tertiary-container': '#3c3e3b',
        'tertiary-fixed': '#e3e3de',
        'tertiary-fixed-dim': '#c6c7c2',
        'on-tertiary-fixed': '#1a1c19',
        'on-tertiary-fixed-variant': '#454744',

        // Status
        error: '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',

        // Special / Brand
        'background-deep': '#0F0F0F',
        'slate-muted': '#808080',
        'cobalt-accent': '#2E5BFF',
        'success-growth': '#00E676',

        // Background & readable aliases
        background: '#16130e',
        'on-background': '#e9e1d8',

        // Legacy luxury aliases for backward compat (mapped to new system)
        luxury: {
          charcoal: '#0F0F0F',
          'charcoal-light': '#1e1b16',
          gold: '#e6c277',
          'gold-muted': '#c6a45c',
          'off-white': '#e9e1d8',
          'warm-gray': '#d0c5b4',
          'mid-gray': '#998f80',
          'light-gray': '#c6c7c2',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl-mobile': ['40px', { lineHeight: '1.1', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '700' }],
        'metric-num': ['48px', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      letterSpacing: {
        'luxury': '0.05em',
        'ultra-wide': '0.15em',
        'label': '0.1em',
        'metric': '-0.03em',
        'headline': '-0.02em',
      },
      borderRadius: {
        'sharp': '0px',
        'btn': '0.25rem',
        'pill': '9999px',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        'section': '120px',
        'gutter': '24px',
        'margin-mobile': '16px',
      },
      maxWidth: {
        'container': '1200px',
      },
      backdropBlur: {
        'nav': '12px',
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(230, 194, 119, 0.25)',
        'gold-md': '0 4px 24px rgba(230, 194, 119, 0.35)',
        'gold-lg': '0 8px 40px rgba(230, 194, 119, 0.45)',
        'cobalt': '0 0 20px rgba(46, 91, 255, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
