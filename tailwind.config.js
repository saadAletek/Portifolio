/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D46868',
        dark : '#232323',
        lighterDark : '#404040',
        light : '#DADADA'
      },
    },
  },
  plugins: [],
}

