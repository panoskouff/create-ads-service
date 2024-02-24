import { PandaDivProps } from '#/types'
import { styled } from '../styled-system/jsx'

export type BackgroundProps = PandaDivProps<
  | 'bg'
  | 'backgroundColor'
  | 'backgroundImage'
  | 'backgroundSize'
  | 'backgroundRepeat'
  | 'backgroundPositionX'
  | 'backgroundPositionY'
  | 'backgroundPosition'
  | 'backgroundClip'
  | 'backgroundAttachment'
  | 'backgroundOrigin'
  | 'rounded'
  | 'h'
  | 'w'
  | 'css'
>

export const Background: React.FC<BackgroundProps> = ({
  children,
  ...rest
}) => <styled.div {...rest}>{children}</styled.div>
