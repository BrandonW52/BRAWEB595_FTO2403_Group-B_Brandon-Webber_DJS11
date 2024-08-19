/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "backgrond-colour": "#121212",
      grey: "#292929",
      "light-grey": "#D3D3D3",
      white: "#FFFFFF",
      accent: "#BB86FC",
      error: "#CF6679",
    },
  },
  plugins: [],
};
