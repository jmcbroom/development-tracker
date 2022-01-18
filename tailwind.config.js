module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ternblue': '#C8FAF8',
        'uploadblue': '#D7E2FF',
        'uploadbluehover': '#EDF2FF',
        'mustard': '#FFD390',
        'dkgray': 'rgb(33, 37, 41)',
        'turq': 'rgb(13, 150, 146)'
      },
      fontSize: {
        'lgish': '20px',
        'xl': '24px',
        '2xl': '28px',
        'tiny': '.875rem'
      },
      borderWidth: {
        1: '1px'
      },
      padding: {
        15: '60px'
      },
      height: {
        15: '60px',
        22: '90px'
      },
      lineHeight: {
        12: '54px',
        13: '60px'
      },
      spacing: {

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-underline-utils')
  ],
}
