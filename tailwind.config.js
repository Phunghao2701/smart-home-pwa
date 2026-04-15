/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa",
        surface: "#f8f9fa",
        "surface-bright": "#f8f9fa",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "surface-container-low": "#f3f4f5",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#d9dadb",
        "surface-variant": "#e1e3e4",
        "on-background": "#191c1d",
        "on-surface": "#191c1d",
        "on-surface-variant": "#424656",
        primary: "#004bca",
        "on-primary": "#ffffff",
        "primary-container": "#0061ff",
        "on-primary-container": "#f1f2ff",
        secondary: "#435ba2",
        "on-secondary": "#ffffff",
        "secondary-container": "#99b1fe",
        "on-secondary-container": "#274187",
        tertiary: "#9d3000",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#c73f00",
        outline: "#737687",
        "outline-variant": "#c2c6d9",
        "surface-tint": "#0052dc"
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0 12px 32px -4px rgba(25, 28, 29, 0.06)',
        'ambient-glow': '0 0 24px rgba(0, 97, 255, 0.2)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #004bca, #0061ff)',
      }
    },
  },
  plugins: [],
}
