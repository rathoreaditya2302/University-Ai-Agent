export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#14b8a6",
        light: "#f8fafc",
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b"
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },

      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.08)"
      },

      animation: {
        fade: "fade 0.4s ease-in-out"
      },

      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    }
  },

  plugins: []
}

