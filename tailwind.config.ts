import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#8B5CF6",
          secondary: "#06B6D4",
          dark: "#0F172A",
          darker: "#020617",
          accent: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};

export default config;
