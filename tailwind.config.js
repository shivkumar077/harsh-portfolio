/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pin: {
          bg: '#ECEBE8',
          card: '#F4F3F0',
          dark: '#0D0D0D',
          red: '#E63E26',
          muted: '#76767D',
          border: 'rgba(13, 13, 13, 0.12)',
        },
        bg: {
          primary: '#ECEBE8',
          secondary: '#E4E3DF',
          elevated: '#F4F3F0',
          card: '#FFFFFF',
          darkCard: '#121214',
          glass: 'rgba(236, 235, 232, 0.85)',
        },
        brand: {
          red: '#E63E26',
          dark: '#0D0D0D',
          concrete: '#ECEBE8',
        },
        border: {
          subtle: 'rgba(13, 13, 13, 0.08)',
          strong: 'rgba(13, 13, 13, 0.18)',
          accent: '#E63E26',
        },
        text: {
          primary: '#0D0D0D',
          secondary: '#4A4A4F',
          muted: '#76767D',
        },
        neutral: {
          950: '#0D0D0D',
          900: '#18181B',
          850: '#27272A',
          800: '#3F3F46',
          700: '#52525B',
          600: '#71717A',
          500: '#8E8E93',
          400: '#A1A1AA',
          300: '#C7C7CC',
          200: '#DEDCD7',
          100: '#ECEBE8',
          50: '#F7F6F3',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
