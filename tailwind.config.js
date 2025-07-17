export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonPurple: "#a855f7",
        neonBlue: "#60a5fa",
        darkBg: "#0f0f1a",
        'neon-green': '#22c55e',
      },
      dropShadow: {
        neon: '0 0 0.3rem #22c55e',
      },
      animation: {
        flicker: 'flicker 2s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
