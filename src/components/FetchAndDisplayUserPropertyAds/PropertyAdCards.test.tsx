import { prettyDOM, render, screen } from '@testing-library/react'
import { PropertyAdCards } from './PropertyAdCards'

describe('PropertyAdCards', () => {
  const mockPropertyAds = [
    {
      id: '1',
      propertyTitle: 'Mock property title 1',
      propertyPrice: 'Mock property price 1',
      propertyAdType: 'Mock property ad type 1',
      propertyAreas: [
        {
          placeId: 'Mock place id 1',
          name: 'Mock area name 1',
        },
      ],
      propertyDescription: 'Mock property description 1',
    },
    {
      id: '2',
      propertyTitle: 'Mock property title 2',
      propertyPrice: 'Mock property price 2',
      propertyAdType: 'Mock property ad type 2',
      propertyAreas: [
        {
          placeId: 'Mock place id 2',
          name: 'Mock area name 2',
        },
      ],
      propertyDescription: 'Mock property description 2',
    },
  ]

  it('renders the property ads', () => {
    const { container } = render(
      <PropertyAdCards propertyAds={mockPropertyAds} />,
    )

    const renderedOutput = prettyDOM(container).toString()

    mockPropertyAds.forEach((ad) => {
      expect(screen.getByText(ad.propertyTitle)).toBeInTheDocument()
      expect(renderedOutput).toContain(ad.propertyPrice)

      ad.propertyAreas.forEach((area) => {
        expect(screen.getByText(area.name)).toBeInTheDocument()
      })
      if (ad.propertyDescription) {
        expect(screen.getByText(ad.propertyDescription)).toBeInTheDocument()
      }
      expect(renderedOutput).toContain(ad.propertyAdType)
    })
  })
})
