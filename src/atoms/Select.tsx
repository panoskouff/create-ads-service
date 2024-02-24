import { HTMLStyledProps, styled } from '#/styled-system/jsx'

// @todo find out what props make sense to allow here
export type PandaSelectProps = Pick<
  HTMLStyledProps<'select'>,
  'p' | 'flexGrow' | 'css'
>

export type SelectProps = Merge<
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'color'>,
  Partial<PandaSelectProps>
>

export const Select: React.FC<SelectProps> = ({ children, ...rest }) => (
  <styled.select
    p='input-padding-base'
    border='1px solid black'
    rounded='sm'
    {...rest}
  >
    {children}
  </styled.select>
)
