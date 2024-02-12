/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#e4fa01',
        secondary: '#45ff2e',
        cardColor: '#E2F900',
      },
      fontFamily: {
        Tangerine: ['Tangerine'],
      },
      screens: {
        'xs': '300px',
      },
    },
    plugins: [],
  }
}
