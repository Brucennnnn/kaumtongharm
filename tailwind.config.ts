import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    colors: {
      background: '#FFF6E4',
      stroke: '#001858',
      secondary: {
        default: '#8BD3DD',
        hover: '#08C8E2',
        click: '#08A1E2',
      },
      red: {
        default: '#E78989',
        hover: '#E14C4C',
        click: '#A00000',
      },
      yellow: {
        default: '#FFC164',
        hover: '#FF9E0C',
        click: '#C77E11',
      },
      main: '#F4D2C1',
      paragraph: '#172C66',
      tertiary: '#F582AE',
      success: '#52D382',
      pending: '#FFC164',
      error: '#E14C4C',
      roombg: '#F4C1C1',
      highlight: '#FF8906',
      orange: '#F25F4C',
      hardpink: '#FF9C9C',
      light: '#F8EDED',
      availble: '#63FF60',
      white: '#FFFFFF',
      medie: '#1A1A1A',
    },
    boxShadow: {
      none: 'none',
      button: '2px 2px 0px 0px #001858',
      card: '4px 4px 0px 0px #001858',
      box: '2px 2px 0px 0px #001858',
      availble: '#63FF60',
    },
    screens: {
      sm: '376px',
      md: '782px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
      '2xl': '20px',
      '3xl': '24px',
      '4xl': '36px',
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        bgImage: "url('../../public/Background.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config;

export default config;
