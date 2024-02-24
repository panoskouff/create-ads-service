import { styled } from '#/styled-system/jsx'
import { PandaButtonProps } from '#/types/'
import { Text, Padding } from '#/atoms'

export type ButtonProps = PandaButtonProps<'display' | 'p' | 'css'> & {
  text?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  text,
  p = '5px 10px',
  ...rest
}) => (
  <styled.button
    bg='#fff'
    cursor='pointer'
    display='inline-block'
    border='1px solid #ccc'
    borderRadius='sm'
    boxShadow='buttonPrimary'
    transition='all 0.1s'
    _hover={{ bg: '#eee' }}
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
        <Text textStyle='button' letterSpacing={0.3}>
          {text}
        </Text>
      </Padding>
    )}
    {children}
  </styled.button>
)
