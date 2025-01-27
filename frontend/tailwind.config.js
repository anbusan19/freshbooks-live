/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'primary': {
          light: '#F8E6FF',  // Lightest purple
          DEFAULT: '#C27FB9', // Medium purple
          dark: '#4B297B',   // Dark purple
        },
        'secondary': {
          light: '#E5D5E8',  // Light lavender
          DEFAULT: '#9B6B9E', // Medium lavender
          dark: '#2E1A47',   // Dark purple
        },
        // Dark mode specific colors
        'dark-primary': '#1E1128',    // Very dark purple
        'dark-secondary': '#321B3F',  // Dark purple
        // Shared colors
        'accent': '#9B6B9E',         // Medium purple
        'light': '#F8E6FF',          // Very light purple
        'dark': '#1E1128',           // Very dark purple
        'surface': {
          light: '#FFFFFF',
          dark: '#1E1128',
        }
      },
      fontFamily: {
        'primary': ["Montserrat", "sans-serif"],
        'secondary': ["Nunito Sans", "sans-serif"]
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite'
      }
    },
  },
  plugins: [],
}
