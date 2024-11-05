import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    // ToDo: './node_modules/@nextui-org/theme/dist/components/(select|slider|listbox|card).js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        ground: {
          DEFAULT: colors.neutral['50'],
          dark: {
            DEFAULT: colors.neutral['950'],
          },
        },
        surface: {
          DEFAULT: colors.neutral['200'],
          dark: {
            DEFAULT: colors.neutral['800'],
          },
        },
        primary: {
          DEFAULT: colors.neutral['950'],
          dark: {
            DEFAULT: colors.neutral['50'],
          },
        },
        accent: {
          DEFAULT: colors.orange['600'],
          variant: colors.orange['700'],
          alternate: colors.orange['800'],
          dark: {
            DEFAULT: colors.orange['400'],
            variant: colors.orange['300'],
            alternate: colors.orange['200'],
          },
        },
        danger: {
          DEFAULT: colors.red['500'],
        },
      },
      animation: {
        heartbeat: 'heartbeat .25s infinite alternate',
        'marquee-left': 'marquee-left 20s infinite',
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
