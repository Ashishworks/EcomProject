/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#0a3477ff",
          600: "#000000ff",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
}
