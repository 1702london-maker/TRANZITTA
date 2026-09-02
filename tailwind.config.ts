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
        'trz-orange': '#F28A3D',
        'trz-deep': '#D96B1F',
        'trz-blush': '#FFF0E4',
        'trz-green': '#1F6B46',
        'trz-sage': '#7EA06D',
        'trz-warm': '#FFF9F2',
        'trz-ink': '#183024',
        'trz-muted': '#65785F',
        'trz-border': '#DDE9D2',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
