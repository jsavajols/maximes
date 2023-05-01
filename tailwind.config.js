/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#e4fa01',
        secondary: '#ecc94b',
        // ...
      },
      fontFamily: {
        Tangerine: ['Tangerine'],
      },
    },
    plugins: [],
  }
}
