/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        lighterPrimary: '#9F67F5',
        primary: '#7C3AED',
        darkerPrimary: '#6D28D9',

        lighterSecondary: '#5DAF36',
        secondary: '#4C8F2C',
        darkerSecondary: '#3B6F22',

        backgroundC : '#0B0F19',
        sectionSeperator : '#0F172A',

        primaryWhite : '#E5E7EB',
      },
    },
  },
  plugins: [],
}

