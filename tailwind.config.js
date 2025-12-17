/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  // Scans only src/ - excludes node_modules/Solana CSS
  theme: {
    extend: {
      colors: {
        'bohboo-green': '#E0F7E0',
        'bohboo-bg': '#F0F8FF',
        'bohboo-accent': '#FFAB91',
        'bohboo-light': 'rgba(255, 255, 255, 0.8)',
      },
      borderRadius: {
        'xl': '24px',
      },
      fontSize: {
        'title': '24px',
      },
    },
  },
  plugins: [],
};