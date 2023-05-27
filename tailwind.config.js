/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom1': '#434141'
      },
    fontFamily: {
      manrope: ['Manrope', 'sans-serif'],
    },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
