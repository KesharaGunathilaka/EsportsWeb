const { nextui } = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F1B4B4',
        secondary: '#18023c',
        selected:'#00FF99',
        head: '#fef7ff',
        button:'#18023C',
        background: '#10122A',
        text: '#CCCCCC'        
      },
      fontFamily: {
        body: ["robotoslab", "serif"],
        sidebar: ["Afacad Flux", "serif"],
        header: ["Roboto","sans-serif"],
        title: ["merriweather", "sans-serif"]
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

