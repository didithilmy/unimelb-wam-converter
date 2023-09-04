import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(245, 250, 251)",
      },
      fontFamily: {
        serif: ["DM Serif Text", ...defaultTheme.fontFamily.serif],
        heading: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
