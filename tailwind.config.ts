import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      background: "#FFF6E4",
      stroke: "#001858",
      secondary: "#8BD3DD",
      main: "#F4D2C1",
      paragraph: "#172C66",
      tertiary: "#F582AE",
      success: "#52D382",
      pending: "#FFC164",
      error: "#E14C4C",
      roombg: "#F4C1C1",
      highlight: "#FF8906",
      orange: "#F25F4C",
      hardpink: "#FF9C9C",
      lightpink: "#F8EDED",
    },
    screens: {
      sm: "376px",
      md: "782px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "24px",
      "4xl": "36px",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
