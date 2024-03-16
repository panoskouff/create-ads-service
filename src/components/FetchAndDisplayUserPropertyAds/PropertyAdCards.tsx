import { Space } from '#/atoms'
import { PropertyAdCard } from '../PropertyAdCard'
import { PropertyAdCardProps } from '#/components/PropertyAdCard'

type PropertyAdCardWithId = PropertyAdCardProps & { id: string }

type PropertyAdCardsProps = { propertyAds: PropertyAdCardWithId[] }

export const PropertyAdCards: React.FC<PropertyAdCardsProps> = ({
  propertyAds,
}) => (
  <>
    {propertyAds.map((propertyAdProps: PropertyAdCardWithId) => (
      <div key={propertyAdProps.id}>
        <PropertyAdCard {...propertyAdProps} />
        <Space h={20} />
      </div>
    ))}
  </>
)
