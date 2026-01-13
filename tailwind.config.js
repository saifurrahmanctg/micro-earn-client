/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#2bb673",
        secondary: "#333333",
        accent: "#2bb673",
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 4px 10px -5px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        microearn: {
          "primary": "#2bb673",
          "secondary": "#333333",
          "accent": "#2bb673",
          "neutral": "#1e293b",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      "light",
      "dark",
    ],
  },
}
