/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        neon: {
          green:  "#39FF14",
          pink:   "#FF2D78",
          yellow: "#FFE600",
          cyan:   "#00F5FF",
          orange: "#FF6B00",
        },
      },
      animation: {
        "fade-in":    "fadeIn 0.3s ease",
        "slide-down": "slideDown 0.35s cubic-bezier(0.4,0,0.2,1)",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        slideDown: { from: { opacity: 0, maxHeight: "0px" }, to: { opacity: 1, maxHeight: "600px" } },
        pulseSoft: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.6 } },
      },
    },
  },
  plugins: [],
}
