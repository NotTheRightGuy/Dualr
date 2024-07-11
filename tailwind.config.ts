module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        satoshi: ["Satoshi-Variable", "sans-serif"],

        space: ["Space Mono", "monospace"],
      },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
