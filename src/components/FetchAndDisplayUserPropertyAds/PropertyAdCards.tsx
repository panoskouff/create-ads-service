import { Space } from '#/atoms'
import { PropertyAd } from '#/types'
import { PropertyAdCard } from '../PropertyAdCard'

type PropertyAdCardWithId = PropertyAd & { id: string }

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
