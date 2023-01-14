/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
      screens: {
        'xs': '475px',
      },
      colors: {
        'app-color': {
          '50': '#f8f7fe',
          '100': '#f1f0fe',
          '200': '#dcd9fb',
          '300': '#c7c2f9',
          '400': '#9d95f5',
          '500': '#7367f0',
          '600': '#685dd8',
          '700': '#564db4',
          '800': '#453e90',
          '900': '#383276'
        }
      }

    },
  },
  plugins: [],
}