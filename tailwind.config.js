module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: `media`,
  theme: {
    extend: {
      colors: {
        'ternblue': '#C8FAF8',
        'uploadblue': '#D7E2FF',
        'uploadbluehover': '#EDF2FF',
        'mustard': '#FFD390',
        'highlight': 'rgba(255, 230, 140, 1)',
        'dkgray': 'rgb(33, 37, 41)',
        'turq': 'rgb(13, 150, 146)',
        'seafoam': 'rgba(162, 237, 225, 1)',
        'calblue': `rgba(155, 182, 253, 1)`,
        'searchblue': 'rgba(128, 163, 251, 1)'
      },
      fontFamily: {
        'dmmono': ['DM Mono'],
        'dmsans': ['DM Sans']
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
        7.5: '30px',
        15: '60px'
      },
      height: {
        7.5: '30px',
        15: '60px',
        22: '90px',
        128: '560px'
      },
      lineHeight: {
        7.5: '30px',
        11: '45px',
        12: '54px',
        13: '60px'
      },
      margin: {
        71: '280px'
      },
      minHeight: {
        'map': '350px'
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
