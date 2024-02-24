import type { PandaDivProps } from '#/types'
import { Flex } from './Flex'

/* prettier-ignore */
export type RowProps = PandaDivProps<
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'gap'
  | 'css'
>;

export const Row: React.FC<RowProps> = ({ children, ...rest }) => (
  <Flex alignItems='center' {...rest}>
    {children}
  </Flex>
)
