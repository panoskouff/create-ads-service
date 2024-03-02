import type { PandaDivProps } from '#/types'
import { Flex } from './Flex'

/* prettier-ignore */
export type CenterProps = PandaDivProps<
  | 'alignItems'
  | 'justifyContent'
  | 'flexDirection'
  | 'gap'
  | 'h'
  | 'css'
>;

// @todo - add components CenterX and CenterY ?
export const Center: React.FC<CenterProps> = ({ children, ...rest }) => (
  <Flex alignItems='center' justifyContent='center' {...rest}>
    {children}
  </Flex>
)
