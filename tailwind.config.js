/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6F2C8F',
        dark : '#232323',
        lighterDark : '#404040',
        light : '#DADADA'
      },
    },
  },
  plugins: [],
}

