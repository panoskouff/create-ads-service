import { HTMLStyledProps, styled } from '#/styled-system/jsx'

// @todo find out what props make sense to allow here
export type PandaTextAreaProps = Pick<
  HTMLStyledProps<'textarea'>,
  'p' | 'flexGrow' | 'css'
>

export type TextAreaProps = Merge<
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>,
  Partial<PandaTextAreaProps>
>

export const TextArea: React.FC<TextAreaProps> = ({ children, ...rest }) => (
  <styled.textarea
    p='input-padding-base'
    border='1px solid black'
    rounded='sm'
    {...rest}
  >
    {children}
  </styled.textarea>
)
