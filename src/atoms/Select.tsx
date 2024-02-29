import React from 'react'
import { HTMLStyledProps, styled } from '#/styled-system/jsx'

export type PandaSelectProps = Pick<
  HTMLStyledProps<'select'>,
  'p' | 'flexGrow' | 'css'
>

export type SelectProps = Merge<
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'color'>,
  Partial<PandaSelectProps>
>

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...rest }, ref) => (
    <styled.div pos='relative'>
      <styled.select
        ref={ref}
        appearance='none'
        backgroundColor='#fff'
        border='1px solid #a7acb1'
        borderRadius='3px'
        display='block'
        color='#2b2e31'
        fontSize='1rem'
        lineHeight='1.5rem'
        letterSpacing='inherit'
        padding='0.55rem calc(0.75rem + 32px) 0.55rem 0.75rem'
        width='100%'
        {...rest}
      >
        {children}
      </styled.select>
    </styled.div>
  ),
)

Select.displayName = 'Select'
