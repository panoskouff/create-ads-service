import { styled } from '#/styled-system/jsx'
import type { PandaDivProps } from '#/types'

export type FlexProps = PandaDivProps<
  | 'display'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'gap'
  | 'css'
>

export const Flex: React.FC<FlexProps> = ({ children, ...rest }) => (
  <styled.div display='flex' {...rest}>
    {children}
  </styled.div>
)
