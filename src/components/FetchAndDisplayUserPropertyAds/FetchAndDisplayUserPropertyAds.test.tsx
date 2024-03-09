import { render } from '@testing-library/react'
import { FetchAndDisplayUserPropertyAds } from './FetchAndDisplayUserPropertyAds'

type PropertyAd = {
  id: string
  propertyTitle: string
  propertyPrice: string
  propertyAdType: string
  propertyAreaIds: string[]
  propertyDescription: string | null
  userId: string
}

type PropertyArea = {
  id: string
  name: string
  placeId: string
  propertyAdIds: string[]
}

var mockPropertyAreas: PropertyArea[] = []
var mockPropertyAds: PropertyAd[] = []
jest.mock('#/libs/prismadb', () => {
  mockPropertyAds = [
    {
      id: '1',
      propertyTitle: 'Mock property title',
      propertyPrice: 'Mock property price',
      propertyAdType: 'Mock property ad type',
      propertyAreaIds: ['1', '2'],
      propertyDescription: 'Mock property description',
      userId: 'mock-user-id',
    },
    {
      id: '2',
      propertyTitle: 'Mock property title',
      propertyPrice: 'Mock property price',
      propertyAdType: 'Mock property ad type',
      propertyAreaIds: ['1', '3'],
      propertyDescription: 'Mock property description',
      userId: 'mock-user-id',
    },
  ]

  mockPropertyAreas = [
    {
      id: '1',
      name: 'Mock area name',
      placeId: 'Mock place id',
      propertyAdIds: ['1', '2'],
    },
    {
      id: '2',
      name: 'Mock area name',
      placeId: 'Mock place id',
      propertyAdIds: ['1'],
    },
    {
      id: '3',
      name: 'Mock area name',
      placeId: 'Mock place id',
      propertyAdIds: ['2'],
    },
  ]

  return {
    __esModule: true,
    default: {
      propertyAd: {
        findMany: jest.fn().mockResolvedValue(mockPropertyAds),
      },
      propertyArea: {
        findMany: jest.fn().mockResolvedValue(mockPropertyAreas),
      },
    },
  }
})

var MockPropertyAdCards: jest.Mock
jest.mock('./PropertyAdCards', () => {
  MockPropertyAdCards = jest.fn(() => <div>Mock PropertyAdCards</div>)
  return {
    PropertyAdCards: MockPropertyAdCards,
  }
})

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({ user: { id: 'mock-user-id' } })),
}))

describe('FetchAndDisplayUserPropertyAds', () => {
  it('should not render if the user is not signed in', async () => {
    ;(require('next-auth') as any).getServerSession.mockImplementationOnce(
      () => null,
    )

    const { container } = render(await FetchAndDisplayUserPropertyAds())
    expect(container.innerHTML).toEqual('')
  })

  it('should render noAdsYetMessage if the user has no ads', async () => {
    ;(
      require('#/libs/prismadb') as any
    ).default.propertyAd.findMany.mockImplementationOnce(() => [])

    const { container } = render(await FetchAndDisplayUserPropertyAds())

    expect(container.innerHTML).toContain("You haven't placed an ad yet...")
  })

  it(`should fetch propertyAreas for each propertyAd and render a PropertyAdCard 
    for each ad after combining the props correctly `, async () => {
    render(await FetchAndDisplayUserPropertyAds())

    const propertyAdCardsProps =
      MockPropertyAdCards.mock.calls[0][0].propertyAds
    expect(propertyAdCardsProps).toEqual([
      {
        id: '1',
        propertyTitle: 'Mock property title',
        propertyPrice: 'Mock property price',
        propertyAdType: 'Mock property ad type',
        propertyAreas: [
          {
            id: '1',
            name: 'Mock area name',
            placeId: 'Mock place id',
            propertyAdIds: ['1', '2'],
          },
          {
            id: '2',
            name: 'Mock area name',
            placeId: 'Mock place id',
            propertyAdIds: ['1'],
          },
        ],
        propertyDescription: 'Mock property description',
      },
      {
        id: '2',
        propertyTitle: 'Mock property title',
        propertyPrice: 'Mock property price',
        propertyAdType: 'Mock property ad type',
        propertyAreas: [
          {
            id: '1',
            name: 'Mock area name',
            placeId: 'Mock place id',
            propertyAdIds: ['1', '2'],
          },
          {
            id: '3',
            name: 'Mock area name',
            placeId: 'Mock place id',
            propertyAdIds: ['2'],
          },
        ],
        propertyDescription: 'Mock property description',
      },
    ])
  })
})
