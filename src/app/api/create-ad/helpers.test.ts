import { sanitizePropertyAdData } from './helpers'
import { PropertyAd } from '#/types'

describe('sanitizePropertyAdData', () => {
  it('should sanitize all fields of PropertyAd', () => {
    const ad: PropertyAd = {
      propertyTitle: 'Lovely <script>alert("hack")</script> Cottage',
      propertyPrice: '100<script>',
      propertyAdType: '<img src=x onerror=alert("type")>',
      propertyAreas: [
        { value: '<img>', label: '<script>alert("area")</script>' },
      ],
      propertyDescription: 'A <b>great</b> place to live!',
    }

    const sanitizedAd = sanitizePropertyAdData(ad)

    expect(sanitizedAd.propertyTitle).not.toContain('<script>')
    expect(sanitizedAd.propertyPrice).not.toContain('<script>')
    expect(sanitizedAd.propertyAdType).not.toContain('<img src=x')
    expect(sanitizedAd.propertyAreas[0].value).not.toContain('<img>')
    expect(sanitizedAd.propertyAreas[0].label).not.toContain('<script>')
    expect(sanitizedAd.propertyDescription).not.toContain('<b>')
  })
})
