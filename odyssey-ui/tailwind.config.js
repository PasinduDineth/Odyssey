/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F2502E',
          light: '#fc6444',
        },
        secondary: {
          DEFAULT: '#F29F05'
        },
        accent: {
          DEFAULT: '#c2c2c2',
          light: '#ededed'
        },
        text: {
          DEFAULT:'#595458',
          dark: '#212224'
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
    }
  },
  plugins: [require('flowbite/plugin')],
}
