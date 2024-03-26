import type { Config } from "tailwindcss";

const config: Config = {
  variants: {
    extend: {
      translate: ['group-hover'],
    },
  },
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        'brand': {
          'green': '#2E7636',
          'dark-green': '#245E2A',
        },
        'grey': {
          100: '#F6F6F6',
          200: '#DADADA',
          300: '#555555',
          400: '#4F4F4F',
          600: '#2D2D2D',
        },
      }
    },
  },
  plugins: [],
};
export default config;
