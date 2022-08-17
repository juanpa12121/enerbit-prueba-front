/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
    container:{
      center: true,
      padding: '1rem',
    },
    screens:{
      'sm': '560px',
      'xs': '320px'
    }
  },
  plugins: [],
  important: true,
}