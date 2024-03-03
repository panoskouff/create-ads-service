import { Text, TextProps } from './Text'

export type FormTextErrorProps = TextProps

export const FormTextError: React.FC<FormTextErrorProps> = (props) => (
  <Text textStyle='form-text-error' color='red' {...props} />
)
