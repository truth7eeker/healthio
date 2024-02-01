/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Open-Sans', 'sans-serif'] },
      gridTemplateColumns: {
        '14': 'repeat(auto-fit, minmax(0, 1fr))'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'lime': '#B2F042',
        'lavender': '#B286FD',
        'black': '#101010',
        'red': '#E55733',
        'grey': '#1E1E1E',
        'light-grey': '#2B2B2B',
        'mid-grey': '#303030',
        'secondary-text-grey': '#737373',
        'secondary-text-bg': '#232323',
        'icon-grey': '#424141'
      },
    }
  },
  plugins: []
}

