/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#e4fa01',
        secondary: '#45ff2e',
        // ...
      },
      fontFamily: {
        Tangerine: ['Tangerine'],
      },
    },
    plugins: [],
  }
}
