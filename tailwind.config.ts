import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "headline-1": "64px",
        "headline-2": "48px",
        "headline-3": "40px",
        "headline-4": "28px",
        "headline-5": "24px",
        "headline-6": "18px",
        "body-1": "24px",
        "body-2": "17px",
        "base-1": "16px",
        "base-2": "14px",
        "caption-1": "12px",
        "caption-2": "11px",
      },
      colors: {
        "light-1": "#fefefe",
        "light-2": "#f3f5f7",
        "light-3": "#e8ecef",
        "light-4": "#6c7275",
        "dark-1": "#343839",
        "dark-2": "#232627",
        "dark-3": "#141718",
        "dark-4": "#0a0b0c",
        "brand-1": "#3e90f0",
        "brand-2": "#efdd78",
        "accent-yellow": "#ebc063",
        "accent-red": "#da7164",
        "accent-purple": "#8e55ea",
        "accent-green": "#7dc162",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
