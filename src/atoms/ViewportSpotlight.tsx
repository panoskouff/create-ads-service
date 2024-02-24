import { styled } from '#/styled-system/jsx'
import type { PandaDivProps } from '#/types'

export type ViewportSpotlightProps = PandaDivProps<
  'justifyContent' | 'alignItems' | 'display' | 'h' | 'css'
>

/**
 * The ViewportSpotlight component is used to shown 1 item in the whole viewport.
 * Basically it is a container that takes the whole viewport and centers the
 * content.
 *
 * By default it centers content only in the Y axis
 * you can pass justify-content="center" to center in the X axis as well.
 */
export const ViewportSpotlight: React.FC<ViewportSpotlightProps> = ({
  children,
  ...rest
}) => (
  <styled.div display='flex' alignItems='center' h='100vh' {...rest}>
    {children}
  </styled.div>
)
