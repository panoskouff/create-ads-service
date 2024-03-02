import { styled } from '#/styled-system/jsx'
import { PandaButtonProps } from '#/types/'
import { Text, Padding } from '#/atoms'

export type ButtonProps = PandaButtonProps<'display' | 'p' | 'css'> & {
  text?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  text,
  p = '10px 20px',
  ...rest
}) => (
  <styled.button
    cursor='pointer'
    display='inline-block'
    border='1px solid #ccc'
    boxShadow='buttonPrimary'
    width='100%'
    borderRadius='100px'
    padding='3px'
    backgroundColor='#1862b5'
    transitionDuration='.2s'
    transitionProperty='background-color, color, border-color, box-shadow'
    transitionTimingFunction='ease-in-out'
    _hover={{ backgroundColor: '#005bed' }}
    _disabled={{
      bg: '#ccc',
      opacity: 0.5,
      cursor: 'auto',
      _hover: { bg: '#ccc' },
    }}
    {...rest}
  >
    {text && (
      <Padding p={p}>
        <Text
          textStyle='button'
          letterSpacing={0.3}
          color='white'
          fontWeight={800}
        >
          {text}
        </Text>
      </Padding>
    )}
    {children}
  </styled.button>
)
