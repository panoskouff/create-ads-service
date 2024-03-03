import React, { forwardRef } from 'react'
import { HTMLStyledProps, styled } from '#/styled-system/jsx'

export type PandaSelectProps = Pick<
  HTMLStyledProps<'select'>,
  'p' | 'flexGrow' | 'css'
>

export type SelectProps = Merge<
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'color'>,
  Partial<PandaSelectProps>
>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...rest }, ref) => (
    <styled.div pos='relative'>
      <styled.select
        ref={ref}
        fontFamily='mulish'
        appearance='none'
        backgroundColor='#fff'
        border='1px solid #a7acb1'
        borderRadius='5px'
        display='block'
        color='#2b2e31'
        fontSize='1rem'
        lineHeight='1.5rem'
        letterSpacing='inherit'
        padding='0.55rem calc(0.75rem + 32px) 0.55rem 0.75rem'
        width='100%'
        _placeholder={{ color: '#a0a2a5' }}
        {...rest}
      >
        {children}
      </styled.select>
      <styled.svg
        xmlns='http://www.w3.org/2000/svg'
        width='24px'
        height='24px'
        fill='none'
        aria-hidden='true'
        viewBox='0 0 24 24'
        data-t='select-field-icon'
        role='img'
        pointerEvents='none'
        position='absolute'
        right='0.75rem'
        top='50%'
        transform='translateY(-50%)'
        zIndex='1'
        color='#a0a2a5'
        display='inline-block'
        verticalAlign='middle'
      >
        <path
          fill='#a0a2a5'
          fillRule='evenodd'
          d='M3.72 8.22a.75.75 0 0 1 1.06 0l6.97 6.97 6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.146 7.147a1.25 1.25 0 0 1-1.768 0L3.72 9.28a.75.75 0 0 1 0-1.06Z'
          clipRule='evenodd'
        ></path>
      </styled.svg>
    </styled.div>
  ),
)

Select.displayName = 'Select'
