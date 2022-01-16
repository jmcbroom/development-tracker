module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ternblue': '#C8FAF8',
        'uploadblue': '#D7E2FF',
        'uploadbluehover': '#EDF2FF',
        'mustard': '#FFD390'
      },
      fontSize: {
        '2xl': '28px',
        'tiny': '.875rem'
      },
      borderWidth: {
        1: '1px'
      },
      padding: {
        15: '60px'
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
