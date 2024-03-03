import { getServerSession } from 'next-auth'
import prisma from '#/libs/prismadb'
import { PropertyAd as PropertyAdCardProps } from '#/types'
import { authOptions } from '#/app/api/auth/[...nextauth]/authOptions'
import { Space, Text } from '#/atoms'
import { PropertyAdCards } from './PropertyAdCards'

export async function FetchAndDisplayUserPropertyAds(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <></>
  }

  const noAdsYetMessage = "You haven't placed an ad yet..."

  const propertyAds = await prisma.propertyAd.findMany({
    where: {
      userId: session.user.id,
    },
  })

  if (propertyAds.length === 0) {
    return <Text>{noAdsYetMessage}</Text>
  }

  let propertyAdCardsProps: (PropertyAdCardProps & { id: string })[] = []

  if (propertyAds.length > 0) {
    const allPropertyAreaIds = propertyAds.flatMap(
      (property) => property.propertyAreaIds,
    )

    const propertyAreas = await prisma.propertyArea.findMany({
      where: {
        id: {
          in: allPropertyAreaIds,
        },
      },
    })

    propertyAdCardsProps = propertyAds.map((property) => {
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

  return (
    <div>
      <Space h={20} />
      <PropertyAdCards propertyAds={propertyAdCardsProps} />
    </div>
  )
}
