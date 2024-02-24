import { Input } from '#/atoms'
import { InputProps } from '#/atoms/Input'

export const FormInput: React.FC<InputProps> = ({
  p = '5px 10px',
  ...rest
}) => (
  <Input
    p={p}
    css={{
      lineHeight: '24px',
      fontSize: 18,
    }}
    {...rest}
  />
)
