import { PandaDivProps } from '#/types'
import { styled } from '../styled-system/jsx'

export type PositionPandaProperties =
  | 'pos'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'insetStart'
  | 'insetEnd'
  | 'w'
  | 'h'

type PositionProps = PandaDivProps<PositionPandaProperties | 'css'>

export const Position: React.FC<PositionProps> = ({ children, ...rest }) => (
  <styled.div pos='absolute' {...rest}>
    {children}
  </styled.div>
)
