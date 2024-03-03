import { defineConfig } from '@pandacss/dev';
import { textStyles } from './src/theme/textStyles';

export default defineConfig({
  // Whether to use css reset
  preflight: false,

  // Where to look for your css declarations
  include: [
    './src/atoms/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
  ],
  exclude: [],
  conditions: {
    extend: {
      invalid: '&.invalid',
      focusNotTouched: '&:focus:not(.touched)',
      focusTouched: '&.touched:focus',
      touchedInvalid: '&.touched.invalid',
      focusTouchedInvalid: '&.touched.invalid:focus',
      touchedValid: '&.touched.valid',
      focusTouchedValid: '&.touched.valid:focus',
    },
  },
  theme: {
    breakpoints: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    tokens: {
      fonts: {
        mulish: { value: 'var(--mulish), sans-serif' },
      },
      colors: {
        'text-color-primary': { value: '#000' },
      },
      radii: {
        sm: { value: '5px' },
        md: { value: '10px' },
      },
      shadows: {
        standard: { value: '0px 5px 15px rgba(0, 0, 0, 0.35)' },
        variant: { value: '0px 0px 12px rgba(0, 0, 0, 0.35)' },
        buttonPrimary: { value: '0px 1px 4px rgba(0, 0, 0, 0.16)' },
      },
      sizes: {
        'section-max-width': { value: '700px' },
      },
      spacing:{
        'section-offset': { value: '20px' },
      }
    },
    semanticTokens: {
      sizes: {
        'sp-xs': { value: '10px' },
        'sp-sm': { value: '20px' },
        'sp-md': { value: '32px' },
        'sp-lg': { value: '64px' },
      },
    },
    extend: { textStyles },
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: './src/styled-system',
});
