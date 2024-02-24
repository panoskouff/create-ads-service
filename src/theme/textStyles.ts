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

// where is the default color for text configured ?
// should I try to map color to these or is this a bad practice ?

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
})
