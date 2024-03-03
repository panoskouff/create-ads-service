import { HTMLStyledProps, styled } from '#/styled-system/jsx'
import { Text, TextProps } from './Text'

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
  <styled.label textStyle='form-label' color='text-color-primary' {...rest}>
    {children}
    {/* @todo add color to panda config */}
    {required && (
      <Text as='span' textStyle='body' color='#ff0303'>
        &nbsp;*
      </Text>
    )}
  </styled.label>
)
