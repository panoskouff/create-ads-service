import { styled } from '#/styled-system/jsx'
import type { PandaDivProps } from '#/types'
import { Position } from './Position'
import { Transform } from './Transform'

/* example usage https://codepen.io/Panagiotis-Koufopoulos/pen/ZEVNqZm */

export type ColumnFullHeightWrapperProps = PandaDivProps<'css'>

export const ColumnFullHeightWrapper: React.FC<
  ColumnFullHeightWrapperProps
> = ({ children, ...rest }) => (
  <styled.div display='flex' flexDirection='column' h='100%' {...rest}>
    {children}
  </styled.div>
)

export type RemainingHeightContainerProps = PandaDivProps<'css'>

export const RemainingHeightContainer: React.FC<
  RemainingHeightContainerProps
> = ({ children, ...rest }) => (
  <styled.div flex={1} overflow='auto' {...rest}>
    {children}
  </styled.div>
)

export type FlexibleHeightProps = PandaDivProps<'h' | 'css'> & {
  children: React.ReactNode
}

/**
 * The FlexibleHeight component is designed to manage layouts where a
 * component's height may dynamically change, such as expanding on hover.
 *
 * It effectively controls the space that the component and its children
 * can occupy in any given state. The 'h' prop specifies the base height,
 * which should be set to the initial height of the component plus any
 * additional space it may occupy when expanded.
 *
 * This ensures that the component has enough room to grow without
 * affecting the positioning of surrounding elements.
 *
 * The component is wrapped in a Position container with a relative
 * position, allowing the child component to be absolutely positioned
 * within it.
 *
 * This approach keeps the child component in a consistent location,
 * even as it changes size, preventing it from displacing other elements
 * in the layout.
 */
export const FlexibleHeight: React.FC<FlexibleHeightProps> = ({
  children,
  h,
}) => (
  <Position pos='relative' h={h}>
    <Transform w='100%' top='50%' transform='translateY(-50%)'>
      {/* Child component is absolutely positioned within the relative container.
        This design choice ensures layout stability during size changes. */}
      {children}
    </Transform>
  </Position>
)
