import { PropertyAd } from '#/types'
import { PropertyAdSchema } from './PropertyAdSchema'

const validAd: PropertyAd = {
  propertyTitle: 'A beautiful house',
  propertyPrice: '300000',
  propertyAdType: 'buy',
  propertyAreas: [{ value: '1', label: 'Downtown' }],
}

describe('PropertyAdSchema', () => {
  it('should validate a correct PropertyAd object', () => {
    expect(PropertyAdSchema.safeParse(validAd).success).toBe(true)
  })

  it('should validate against all PropertyAd properties', () => {
    const adWithInvalidTitle = {
      ...validAd,
      propertyTitle: '',
    }

    expect(PropertyAdSchema.safeParse(adWithInvalidTitle).success).toBe(false)

    const adWithInvalidPrice = {
      ...validAd,
      propertyPrice: 'invalid',
    }

    expect(PropertyAdSchema.safeParse(adWithInvalidPrice).success).toBe(false)

    const adWithInvalidType = {
      ...validAd,
      propertyAdType: 'invalid',
    }

    expect(PropertyAdSchema.safeParse(adWithInvalidType).success).toBe(false)

    const adWithInvalidArea = {
      ...validAd,
      propertyAreas: [{ value: '', label: '' }],
    }

    expect(PropertyAdSchema.safeParse(adWithInvalidArea).success).toBe(false)
  })
})
