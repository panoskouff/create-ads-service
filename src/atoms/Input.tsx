import { HTMLStyledProps, styled } from '#/styled-system/jsx'

// @todo find out what props make sense to allow here
export type PandaInputProps = Pick<
  HTMLStyledProps<'input'>,
  'p' | 'flexGrow' | 'css'
>

export type InputProps = Merge<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color'>,
  Partial<PandaInputProps>
>

export const Input: React.FC<InputProps> = ({ children, ...rest }) => (
  <styled.input
    p='input-padding-base'
    border='1px solid black'
    rounded='sm'
    {...rest}
  >
    {children}
  </styled.input>
)
