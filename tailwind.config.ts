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
        // InnovaFlow Brand Colors
        navy: {
          deep: '#1a1f3a',
          mid: '#2d3556',
        },
        cyan: {
          electric: '#00d9ff',
        },
        teal: {
          bright: '#00ffcc',
        },
        purple: {
          hint: '#8b5cf6',
        },
        // Semantic colors
        background: {
          DEFAULT: '#0a0e1a',
          surface: '#1a1f3a',
          'surface-secondary': '#2d3556',
        },
        primary: {
          DEFAULT: '#00d9ff',
          50: '#e6f9ff',
          100: '#b3f0ff',
          500: '#00d9ff',
          600: '#00c4e6',
          700: '#00aec9',
        },
        accent: {
          DEFAULT: '#00ffcc',
          500: '#00ffcc',
          600: '#00e6b8',
        },
        text: {
          DEFAULT: '#ffffff',
          primary: '#ffffff',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['36px', { lineHeight: '1.2' }],
        '5xl': ['48px', { lineHeight: '1.1' }],
        '6xl': ['64px', { lineHeight: '1' }],
        '7xl': ['80px', { lineHeight: '1' }],
      },
      spacing: {
        'section': '5rem', // py-20 (80px)
        'section-md': '8rem', // py-32 (128px)
      },
      maxWidth: {
        'container': '1280px', // max-w-7xl
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        '300': '300ms',
        '500': '500ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
