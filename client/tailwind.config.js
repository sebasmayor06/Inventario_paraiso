/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
          'close-menu': "url('./src/assets/close-svgrepo-com.svg')",
          'open-menu': "url('./src/assets/bars-svgrepo-com.svg')"
      }
    },
  },
  plugins: [],
}

