import { PandaDivProps } from '#/types'
import { Position, PositionPandaProperties } from './Position'

export type TransformPandaProperties =
  | PositionPandaProperties
  | 'transform'
  | 'transformOrigin'
  | 'transformStyle'
  | 'backfaceVisibility'
  | 'perspective'
  | 'perspectiveOrigin'
  | 'visibility'
  | 'transition'
  | 'h'
  | 'w'

type TransformProps = PandaDivProps<TransformPandaProperties | 'css'>

const expanded = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export const Transform: React.FC<TransformProps> = ({ children, ...rest }) => (
  <Position pos='absolute' {...expanded} {...rest}>
    {children}
  </Position>
)
