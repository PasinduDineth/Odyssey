/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F2502E'
        },
        secondary: {
          DEFAULT: '#F29F05'
        },
        accent: {
          DEFAULT: '#F2B705'
        },
        text: {
          DEFAULT:'#595458',
          dark: '#171617'
        },
        border: '#155E85',
        background: '#f5f8f9',
        clean: '#fff'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
