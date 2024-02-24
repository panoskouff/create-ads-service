import { PandaDivProps } from '#/types'
import { styled } from '#/styled-system/jsx'

export type SpaceProps = PandaDivProps<
  'h' | 'w' | 'hideBelow' | 'hideFrom' | 'css'
>

export const Space: React.FC<SpaceProps> = ({ children, ...rest }) => (
  <styled.div h='sp-md' w='sp-xs' {...rest}>
    {children}
  </styled.div>
)
