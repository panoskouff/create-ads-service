import { getServerSession } from 'next-auth'
import prisma from '#/libs/prismadb'
import { PropertyArea } from '@prisma/client'
import { PropertyAdCard } from '#/components/PropertyAdCard'
import { PropertyAd as PropertyAdCardProps } from '#/types'
import { authOptions } from '#/app/api/auth/[...nextauth]/authOptions'
import { Space, Text } from '#/atoms'

export async function FetchAndDisplayUserPropertyAds(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div></div>
  }

  const noAdsYetMessage = "You haven't placed an ad yet..."

  const properties = await prisma.propertyAd.findMany({
    where: {
      userId: session.user.id,
    },
  })

  let propertyAreas: PropertyArea[] = []
  let userHasAds = false
  let propertyAdCardsProps: (PropertyAdCardProps & { id: string })[] = []

  const allPropertyAreaIds = properties.flatMap(
    (property) => property.propertyAreaIds,
  )

  if (allPropertyAreaIds.length > 0) {
    userHasAds = true
    propertyAreas = await prisma.propertyArea.findMany({
      where: {
        id: {
          in: allPropertyAreaIds,
        },
      },
    })

    propertyAdCardsProps = properties.map((property) => {
      const propertyAreasForThisAd = propertyAreas.filter((area) =>
        property.propertyAreaIds.includes(area.id),
      )

      return {
        id: property.id,
        propertyTitle: property.propertyTitle,
        propertyPrice: property.propertyPrice,
        propertyAdType: property.propertyAdType,
        propertyAreas: propertyAreasForThisAd,
        propertyDescription: property.propertyDescription ?? undefined,
      }
    })
  }

  if (userHasAds === false) {
    return <Text>{noAdsYetMessage}</Text>
  }

  return (
    <div>
      <Space h={20} />
      {propertyAdCardsProps.map((propertyAdProps) => (
        <div key={propertyAdProps.id}>
          <PropertyAdCard {...propertyAdProps} />
          <Space h={20} />
        </div>
      ))}
    </div>
  )
}
