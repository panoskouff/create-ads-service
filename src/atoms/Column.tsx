import type { PandaDivProps } from '#/types'
import { Flex } from './Flex'

/* prettier-ignore */
export type ColumnProps = PandaDivProps<
  'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'gap'
  | 'css'
>;

export const Column: React.FC<ColumnProps> = ({ children, ...rest }) => (
  <Flex flexDirection='column' {...rest}>
    {children}
  </Flex>
)
