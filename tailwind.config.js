export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonPurple: "#a855f7",
        neonBlue: "#60a5fa",
        darkBg: "#0f0f1a",
        'neon-green': '#22c55e',
        neonAmber: "#fbbf24",
        neonGold: "#f59e0b",
      },
      dropShadow: {
        neon: '0 0 0.3rem #22c55e',
      },
      boxShadow: {
        'cyber': '0 0 8px rgba(0, 255, 255, 0.5), 0 0 12px rgba(255, 0, 255, 0.2)',
      },
      animation: {
        'flicker': 'flicker 2s infinite',
        'glitch': 'glitch 0.4s ease-in-out',
        'flash': 'flash 1.2s ease-in-out',
        'bounce': 'bounce 1s infinite',
        'glow': 'glow-pulse 1.2s ease-in-out infinite',
        'firefly': 'firefly 4s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
        'cursor-blink': 'cursor-blink 1s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.85' },
          '50%': { opacity: '0.75' },
          '55%': { opacity: '0.9' },
        },
        glitch: {
          '0%': { transform: 'skewX(0deg)' },
          '10%': { transform: 'skewX(10deg) translateX(-2px)' },
          '20%': { transform: 'skewX(-10deg) translateX(2px)' },
          '30%': { transform: 'skewX(5deg)' },
          '40%': { transform: 'skewX(-5deg)' },
          '50%': { transform: 'none' },
          '100%': { transform: 'none' },
        },
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #c084fc, 0 0 15px #a78bfa' },
          '50%': { boxShadow: '0 0 15px #c084fc, 0 0 30px #a78bfa' },
        },
        'firefly': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'translateY(0) scale(1)',
          },
          '25%': { 
            opacity: '0.8',
            transform: 'translateY(-10px) scale(1.2)',
          },
          '50%': { 
            opacity: '0.4',
            transform: 'translateY(-20px) scale(0.8)',
          },
          '75%': { 
            opacity: '0.9',
            transform: 'translateY(-15px) scale(1.1)',
          },
        },
        'typewriter': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'cursor-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
