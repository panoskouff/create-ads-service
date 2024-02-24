import type { PandaDivProps } from '#/types'
import { Center } from './Center'
import { Container } from './Container'
import { Text } from './Text'
import { TextAlign } from './TextAlign'

/* prettier-ignore */
export type PlaceholderProps = PandaDivProps<
  | 'w'
  | 'minW'
  | 'maxW'
  | 'h'
  | 'minH'
  | 'maxH'
  | 'css'
  | 'aspectRatio'
  | 'borderRadius'
  | 'rounded'
>;

/* 
  font-family: monospace;
  letter-spacing: 0.25em;
  transform: rotate(-25deg);
*/

export const Placeholder: React.FC<PlaceholderProps> = ({ ...rest }) => {
  return (
    <Container
      w='100%'
      aspectRatio='1 / 1'
      border='2px solid black'
      boxShadow='inset 4px 4px 30px 6px black'
      css={{ bg: '#e3e3e3' }}
      {...rest}
    >
      <Center h='100%'>
        <Text fontWeight='bold'>Placeholder</Text>
      </Center>
    </Container>
  )
}
