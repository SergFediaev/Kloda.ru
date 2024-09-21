import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
          dark: {
            DEFAULT: colors.orange['400'],
            variant: colors.orange['300'],
          },
        },
        danger: {
          DEFAULT: colors.red['500'],
        },
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}

export default config
