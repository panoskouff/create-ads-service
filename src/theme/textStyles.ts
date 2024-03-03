import { defineTextStyles } from '@pandacss/dev'

type TextStyles = Parameters<typeof defineTextStyles>[0]

const styles: TextStyles = {
  base: {
    value: {
      fontWeight: 400,
      fontFamily: 'mulish',
    },
  },
}

export const textStyles = defineTextStyles({
  inherit: {
    description:
      'An inherit text style to be used inside text wrapper components',
    value: {
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
      textDecoration: 'inherit',
      textTransform: 'inherit',
    },
  },
  body: {
    description: 'The body text style',
    value: {
      ...styles.base.value,
      fontSize: '18px',
      lineHeight: '32px',
    },
  },
  title: {
    description: 'The title text style',
    value: {
      ...styles.base.value,
      lineHeight: '120%',
      fontSize: { base: '36px', sm: '54px', lg: '60px' },
    },
  },
  'title-secondary': {
    description: 'The secondary title text style',
    value: {
      ...styles.base.value,
      lineHeight: '120%',
      fontSize: { base: '36px', sm: '50px', md: '5.5vh' },
    },
  },
  caption: {
    description: 'The caption text style',
    value: {
      ...styles.base.value,
      fontSize: '14px',
      lineHeight: '110%',
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
  },
  button: {
    description: 'The button text style',
    value: {
      ...styles.base.value,
      fontSize: '14px',
      lineHeight: '110%',
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
  },
  // forms
  'form-label': {
    description: 'The form label text style',
    value: {
      ...styles.base.value,
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  'form-text-error': {
    description: 'The form field error text style',
    value: {
      ...styles.base.value,
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 600,
    },
  },
})
