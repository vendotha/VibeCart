/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F7F8",
        accent: { DEFAULT: "#4F46E5", hover: "#4338CA" }
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.05)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
}
