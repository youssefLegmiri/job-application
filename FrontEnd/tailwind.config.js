/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#69269c",
        },
      },
      fontFamily: {
        roboto: "Roboto",
      },
      boxShadow: {
        "custom-shadow": "1px 3px 5px rgb(0,0,0,0.5) ",
      },
      fontWeight: {
        lessBold: "500",
      },
      animation: {
        line: "animatedLine 0.5s ease-in-out;",
        settings: "spin 2s linear infinite;",
      },
    },
  },
  plugins: [],
};
