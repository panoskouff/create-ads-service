import { HTMLStyledProps, styled } from '#/styled-system/jsx'

export type PandaLabelProps = Pick<
  HTMLStyledProps<'label'>,
  | 'display'
  | 'textStyle'
  | 'color'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'lineClamp'
  | 'truncate'
  | 'textTransform'
  | 'css'
>

export type LabelProps = Merge<
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'color'>,
  Partial<PandaLabelProps>
>

export const Label: React.FC<LabelProps & { required?: boolean }> = ({
  children,
  required,
  ...rest
}) => (
  <styled.label textStyle='body' color='text-color-primary' {...rest}>
    {children}
    {/* @todo add color to panda config */}
    {required && <styled.span color='#ff0303'>&nbsp;*</styled.span>}
  </styled.label>
)
