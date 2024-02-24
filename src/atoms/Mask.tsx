import { PandaDivProps } from '#/types'
import { Container, type ContainerProps } from './Container'

export type MaskProps = ContainerProps & PandaDivProps<'pos' | 'overflow'>

// @todo should mask be responsible for position ?
export const Mask: React.FC<MaskProps> = ({
  children,
  pos = 'relative',
  overflow = 'hidden',
  css,
  ...rest
}) => (
  <Container css={{ pos, overflow, ...css }} {...rest}>
    {children}
  </Container>
)
