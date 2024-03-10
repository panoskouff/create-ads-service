import { PropertyAdFormInputs } from '#/types'
import { adaptInputDataForRequest } from './helpers'

describe('adaptInputDataForRequest', () => {
  it('should correctly adapt PropertyAdFormInputs to PropertyAd format', () => {
    const inputData: PropertyAdFormInputs = {
      propertyTitle: 'Luxury Villa',
      propertyPrice: '500000',
      propertyAdType: 'Buy',
      propertyDescription: 'A luxurious villa in the heart of the city.',
      propertyAreas: [
        { label: 'Front Yard', value: 'area_123' },
        { label: 'Backyard', value: 'area_456' },
      ],
    }

    const expectedOutput = {
      propertyTitle: 'Luxury Villa',
      propertyPrice: '500000',
      propertyAdType: 'Buy',
      propertyAreas: [
        { placeId: 'area_123', name: 'Front Yard' },
        { placeId: 'area_456', name: 'Backyard' },
      ],
      propertyDescription: 'A luxurious villa in the heart of the city.',
    }

    const result = adaptInputDataForRequest(inputData)

    expect(result).toEqual(expectedOutput)
  })
})
