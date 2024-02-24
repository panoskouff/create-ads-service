import { styled } from '#/styled-system/jsx'
import type { PandaDivProps } from '#/types'

export type PaddingProps = PandaDivProps<
  'p' | 'pl' | 'pr' | 'pt' | 'pb' | 'px' | 'py' | 'ps' | 'pe' | 'css'
>

export const Padding: React.FC<PaddingProps> = ({ children, ...rest }) => (
  <styled.div {...rest}>{children}</styled.div>
)
