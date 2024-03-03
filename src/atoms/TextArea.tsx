import React, { forwardRef } from 'react'
import { HTMLStyledProps, styled } from '#/styled-system/jsx'

export type PandaTextAreaProps = Pick<
  HTMLStyledProps<'textarea'>,
  'p' | 'flexGrow' | 'css'
>

export type TextAreaProps = Merge<
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>,
  Partial<PandaTextAreaProps>
>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => (
    <styled.textarea
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
  ),
)

TextArea.displayName = 'TextArea'
