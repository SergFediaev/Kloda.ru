import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tooltip/dist/**/*.js',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    // ToDo: './node_modules/@nextui-org/theme/dist/components/(select|slider|listbox|card).js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        ground: {
          DEFAULT: 'white',
          dark: {
            DEFAULT: colors.stone['950'],
          },
        },
        surface: {
          DEFAULT: colors.stone['200'],
          light: colors.stone['100'],
          dark: {
            DEFAULT: colors.stone['800'],
          },
        },
        primary: {
          DEFAULT: colors.stone['900'],
          intense: colors.stone['950'],
          dark: {
            DEFAULT: colors.stone['100'],
            intense: colors.stone['50'],
          },
        },
        accent: {
          DEFAULT: '#f15b00',
          dark: {
            DEFAULT: '#ff8800',
          },
        },
        danger: {
          DEFAULT: colors.red['600'],
          dark: {
            DEFAULT: colors.red['500'],
          },
        },
      },
      animation: {
        heartbeat: 'heartbeat .25s infinite alternate',
        'heartbeat-reverse': 'heartbeat .25s infinite alternate-reverse',
        'marquee-left': 'marquee-left 50s infinite',
      },
      keyframes: {
        heartbeat: {
          to: {
            transform: 'scale(1.2)',
          },
        },
        'marquee-left': {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
      },
    },
  },
  plugins: [nextui()],
  darkMode: 'selector',
}

export default config