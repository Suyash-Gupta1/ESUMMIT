/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8E5',
        'retro-pink': '#F48FB1',
        'retro-orange': '#FFB74D',
        'retro-yellow': '#FDD835',
        'retro-dark-orange': '#FB8C00',
      },
      fontFamily: {
        retro: ['Shrikhand', 'cursive'],
        sans: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'retro': '5px 5px 0px 0px #000000',
        'retro-sm': '3px 3px 0px 0px #000000',
        'retro-lg': '8px 8px 0px 0px #000000',
      },
      // 1. Define the actual movement here
      keyframes: {
        'noise-jitter': {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-1%,-1%)' },
          '30%': { transform: 'translate(1%,1%)' },
          '50%': { transform: 'translate(-0.5%,1.5%)' },
          '70%': { transform: 'translate(1.5%,-0.5%)' },
          '90%': { transform: 'translate(-1%,1%)' },
        },
      },
      // 2. Link the keyframes to an animation name
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'noise': 'noise-jitter 0.2s steps(2) infinite',
      },
    },
  },
  plugins: [],
}