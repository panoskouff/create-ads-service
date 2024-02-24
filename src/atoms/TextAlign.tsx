import { PandaDivProps } from '#/types'
import { styled } from '../styled-system/jsx'

type TextAlign = PandaDivProps<'textAlign' | 'css'>

export const TextAlign: React.FC<TextAlign> = ({ children, ...rest }) => (
  <styled.div {...rest}>{children}</styled.div>
)
