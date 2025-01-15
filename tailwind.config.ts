/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { Transition } from 'notistack';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { colors } from './src/constant';

const config: Config = {
  corePlugins: {
    preflight: false,
    aspectRatio: false,
  },
  important: '#root',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          DEFAULT: colors.primary[500],
          100: colors.primary[100],
          200: colors.primary[200],
          300: colors.primary[300],
          400: colors.primary[400],
          500: colors.primary[500],
          600: colors.primary[600],
          700: colors.primary[700],
          800: colors.primary[800],
          900: colors.primary[900],
        },
      },
      loading: {
        sm: '',
        md: '',
        lg: '',
      },
      animation: {
        wave: 'wave 2s infinite ease-in-out',
      },
      keyframes: {
        wave: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ matchUtilities, theme, addUtilities }) => {
      matchUtilities(
        {
          loading: (value) => ({
            loading: value,
          }),
        },
        {
          values: theme('loading'),
        },
      );
      addUtilities({
        '.form-container': {
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '3rem',
          maxWidth: '720px',
        },

        '.form-container.no-border': {
          marginTop: '0',
          // padding: '1.5rem',
          gap: '1.5rem',
        },

        /* Chrome, Edge, and Safari */
        '.scrollbar::-webkit-scrollbar': {
          width: '5px !important',
          transition: 'all 0.2s ease-in-out',
        },
        '.scrollbar::-webkit-scrollbar-track': {
          background: '#00000000',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          background: '#00000000',
          borderRadius: '9999px',
        },
        '.scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#e5e7eb',
        },

        /* Firefox */
        '.scrollbar': {
          'scrollbar-width': '5px' /* "auto" or "thin" */,
          // 'scrollbar-color': '#00000000 #00000000' /* thumb and track color */,
        },
        '.scrollbar:hover': {
          'scrollbar-color': '#e5e7eb #00000000' /* hover state */,
        },

        /* No Scrollbar (all browsers) */
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none' /* Hides scrollbar in WebKit-based browsers */,
        },
        '.no-scrollbar': {
          'scrollbar-width': 'none' /* Hides scrollbar in Firefox */,
          '-ms-overflow-style': 'none' /* Hides scrollbar in IE/Edge */,
        },
      });
    }),
  ],
};

export default config;
