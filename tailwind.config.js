/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: '#0d92f4',
       greyish: '#dbd3d3',
       orangey: '#ff6500',
       tertiary: '#c62e2e',
       bluedark: '#081c2a',
       golden: '#ffb500'
      },

      lineHeight: {
       11: '88px',
       12: '60px',
       13: '80px',
       14: '100px'
      },
      fontSize: {
        xxs: '9px'
      }
    },
  },
  safelist: [
    'bg-black',
    'bg-blue-600',
    'bg-green-500',
    'bg-gray-500',
    'bg-yellow-500',
    'bg-red-600',
    'bg-slate-300'
  ],
  plugins: [],
};
