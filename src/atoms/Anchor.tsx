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

const expanded = {
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
}

type AnchorProps = PandaDivProps<PositionPandaProperties | 'css'>

export const Anchor: React.FC<AnchorProps> = ({ children, ...rest }) => (
  <styled.div {...expanded} pos='relative' {...rest}>
    {children}
  </styled.div>
)
