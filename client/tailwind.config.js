/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "bebas-neue": ["Bebas Neue", "cursive"],
        sixtyfour: ["Sixtyfour Convergence", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        "bebas-neue1": ["Bebas Neue", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        oxanium: ["Oxanium", "sans-serif"],
      },
      colors: {
        "custom-black": "#0d0d0d",
        "custom-blue": "#1E2952",
        glossyblack: "#252324",
      },
    },
  },
  plugins: [],
};
