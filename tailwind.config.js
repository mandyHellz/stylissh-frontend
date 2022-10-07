/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        xs: '375px',
        sm: '640px',
      },
      maxWidth: {
        xxs: '18rem',
        page: '1920px',
        menu: '1345px',
        container: '1280px',
        box: '1024px',
      },
      maxHeight: {
        98: '24.5rem',
        100: '25rem',
      },
      colors: {
        primary: {
          DEFAULT: '#2d2d2d',
          100: '#E2E2E2',
          150: '#Bebebe',
          200: '#AAA9A9',
          350: '#989898',
          400: '#8B8B8B',
          500: '#7A7A7A',
          900: '#000000',
        },
        secondary: {
          DEFAULT: '#535353',
          300: '#f1f1f1',
          800: '#303030',
        },
      },
    },
    plugins: [],
  }
}