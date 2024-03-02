import { PropertyAd } from '#/types'
import { Column, Padding, Row, Space, Text } from '#/atoms'
import { Container } from '#/styled-system/jsx'

export const PropertyAdCard: React.FC<PropertyAd> = ({
  propertyTitle,
  propertyPrice,
  propertyAdType,
  propertyAreas,
  propertyDescription,
}) => {
  return (
    <Container border='1px solid black' borderRadius={5}>
      <Padding p={20}>
        <Row justifyContent='space-between'>
          <Text fontSize={32}>{propertyTitle}</Text>
          <Text fontStyle='italic'>{propertyPrice}€ </Text>
        </Row>
        <Space h={20} />
        <Column gap='10px'>
          <div>
            {propertyAreas.map((area, index) => (
              <Text
                key={area.placeId}
                css={{
                  mr: '10px',
                  p: '2px 8px',
                  bg: '#f1f1f1',
                  borderRadius: 5,
                }}
              >
                {area.name}
              </Text>
            ))}
          </div>
          <Text>{propertyDescription}</Text>
          <Text>to {propertyAdType}</Text>
        </Column>
      </Padding>
    </Container>
  )
}
