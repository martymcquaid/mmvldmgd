/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#fed7aa',
          200: '#fdbb2d',
          300: '#f59e0b',
          400: '#d97706',
          500: '#b45309',
          600: '#92400e',
        },
        glass: {
          50: 'rgba(255,255,255,0.9)',
          70: 'rgba(255,255,255,0.7)',
          80: 'rgba(255,255,255,0.8)',
        },
      },
    },
  },
  plugins: [],
}
