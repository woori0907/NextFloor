/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#a38846",
      },
      backgroundImage: {
        banner: `url('../public/images/slide_1.jpg')`,
      },
    },
  },
  plugins: [],
};
