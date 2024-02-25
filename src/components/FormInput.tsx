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
      _disabled: {
        backgroundColor: '#ccc',
        borderColor: '#ccc',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px 0px',
        opacity: 0.5,
      },
    }}
    {...rest}
  />
)
