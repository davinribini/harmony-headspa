import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          gold: '#C9A96E',
          dark: '#2D2A26',
          light: '#FDFBF7',
          epassi: '#e6005c',
        },
      },
      keyframes: {
        meshFlow: {
          '0%': { backgroundPosition: '0% 0%, 100% 0%, 50% 50%, 0% 100%, 50% 10%' },
          '100%': { backgroundPosition: '30% 90%, 70% 55%, 50% 20%, 10% 55%, 50% 70%' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 0 2px rgba(201,169,110,0.15), 0 0 18px rgba(201,169,110,0.1)' },
          '50%': { boxShadow: '0 0 0 3px rgba(201,169,110,0.3), 0 0 32px rgba(201,169,110,0.25)' },
        },
        liveRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.5)' },
          '70%': { boxShadow: '0 0 0 8px rgba(34,197,94,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0)' },
        },
      },
      animation: {
        meshFlow: 'meshFlow 20s ease-in-out infinite alternate',
        goldPulse: 'goldPulse 4s ease-in-out infinite',
        liveRing: 'liveRing 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
