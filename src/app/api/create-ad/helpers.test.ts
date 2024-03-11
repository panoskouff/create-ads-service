import { PropertyAdSchema, sanitizePropertyAdData } from './helpers'
import { PropertyAd } from '#/types'

const validAd: PropertyAd = {
  propertyTitle: 'A beautiful house',
  propertyPrice: '300000',
  propertyAdType: 'buy',
  propertyAreas: [{ placeId: '1', name: 'Downtown' }],
}

describe('sanitizePropertyAdData', () => {
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
      propertyAreas: [{ placeId: '', name: '' }],
    }

    expect(PropertyAdSchema.safeParse(adWithInvalidArea).success).toBe(false)
  })

  it('should sanitize all fields of PropertyAd', () => {
    const ad: PropertyAd = {
      propertyTitle: 'Lovely <script>alert("hack")</script> Cottage',
      propertyPrice: '100<script>',
      propertyAdType: '<img src=x onerror=alert("type")>',
      propertyAreas: [
        { placeId: '<img>', name: '<script>alert("area")</script>' },
      ],
      propertyDescription: 'A <b>great</b> place to live!',
    }

    const sanitizedAd = sanitizePropertyAdData(ad)

    expect(sanitizedAd.propertyTitle).not.toContain('<script>')
    expect(sanitizedAd.propertyPrice).not.toContain('<script>')
    expect(sanitizedAd.propertyAdType).not.toContain('<img src=x')
    expect(sanitizedAd.propertyAreas[0].placeId).not.toContain('<img>')
    expect(sanitizedAd.propertyAreas[0].name).not.toContain('<script>')
    expect(sanitizedAd.propertyDescription).not.toContain('<b>')
  })
})
