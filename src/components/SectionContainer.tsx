import { Flex, FlexProps } from '#/atoms/Flex'
import { HTMLStyledProps, styled } from '#/styled-system/jsx'

export type SectionContainerProps = FlexProps &
  Partial<Pick<HTMLStyledProps<'div'>, 'maxW' | 'mx'>>

/**
 * Wraps the section's content in a box, which is centered by default
 * and has it's width constrained.
 *
 * @param justifyContent the alignment of the box that contains the content
 * @param maxW the max width of the box that contains the content
 * @param mx the outer margin of the box that contains the content
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  justifyContent = 'center',
  maxW = 'section-max-width',
  mx = 'section-offset',
  children,
  ...rest
}) => (
  <Flex justifyContent={justifyContent} {...rest}>
    <styled.div flexGrow={1} maxW={maxW} mx={mx}>
      {children}
    </styled.div>
  </Flex>
)
