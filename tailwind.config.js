/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        primary: '#6366F1',
        accent: '#8B5CF6',
        text: '#F8FAFC',
        muted: '#94A3B8',
      },
    },
  },
  plugins: [],
}
