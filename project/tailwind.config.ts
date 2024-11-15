import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkmint: "#489078",
        snow: "#F4F3F1F0",
        alert: "#EB5757",
        clay: "#605858",
        coal: "#353131",
        shade24: "#F1F0EC3D",
        shade24dark: "#3531313D",
      },
      spacing: {
        '17': '17px',
        '310': '310px',

      }
    },
  },
  plugins: [],
} satisfies Config;
