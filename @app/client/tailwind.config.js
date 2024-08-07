import daisyui from 'daisyui';
import animate from 'tailwindcss-animate';
import daisyuiColorObj from 'daisyui/src/theming/index';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [daisyui, animate],
  daisyui: {
    themes: ['aqua']
  },
  darkMode: ['class'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: daisyuiColorObj['base-content'],
        input: daisyuiColorObj['base-content'],
        ring: daisyuiColorObj['base-content'],
        background: daisyuiColorObj['base-100'],
        foreground: daisyuiColorObj['base-content'],
        primary: {
          DEFAULT: daisyuiColorObj['primary'],
          foreground: daisyuiColorObj['primary-content']
        },
        secondary: {
          DEFAULT: daisyuiColorObj['secondary'],
          foreground: daisyuiColorObj['secondary-content']
        },
        destructive: {
          DEFAULT: daisyuiColorObj['error'],
          foreground: daisyuiColorObj['error-content']
        },
        muted: {
          DEFAULT: daisyuiColorObj['base-300'],
          foreground: daisyuiColorObj['base-content']
        },
        accent: {
          DEFAULT: daisyuiColorObj['accent'],
          foreground: daisyuiColorObj['accent-content']
        },
        popover: {
          DEFAULT: daisyuiColorObj['base-100'],
          foreground: daisyuiColorObj['base-content']
        },
        card: {
          DEFAULT: daisyuiColorObj['base-100'],
          foreground: daisyuiColorObj['base-content']
        }
      },
      borderRadius: {
        lg: 'var(--rounded-btn)',
        md: 'calc(var(--rounded-btn) - 2px)',
        sm: 'calc(var(--rounded-btn) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  }
};
