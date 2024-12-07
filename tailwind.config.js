/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "3535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" }, 
      sm: { max: "649px" },
    },
    extend: {},
  },
  plugins: [],
}

