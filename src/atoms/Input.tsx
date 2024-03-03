import React, { forwardRef } from 'react'
import { HTMLStyledProps, styled } from '#/styled-system/jsx'

export type PandaInputProps = Pick<
  HTMLStyledProps<'input'>,
  'p' | 'flexGrow' | 'css'
>

export type InputProps = Merge<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color'>,
  Partial<PandaInputProps>
>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <styled.input
    type='text'
    ref={ref}
    background='#fff'
    border='1px solid #a7acb1'
    borderRadius='5px'
    display='block'
    fontSize='1rem'
    lineHeight='1.5rem'
    letterSpacing='inherit'
    padding='.55rem .75rem'
    transition='border-color .2s ease-in-out, box-shadow .2s ease-in-out'
    width='100%'
    willChange='box-shadow'
    {...props}
  />
))

Input.displayName = 'Input'
