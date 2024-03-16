import { escape } from 'validator'
import { PropertyAd } from '#/types'

export function sanitizePropertyAdData(ad: PropertyAd): PropertyAd {
  return {
    propertyTitle: escape(ad.propertyTitle),
    propertyPrice: escape(ad.propertyPrice),
    propertyAdType: escape(ad.propertyAdType),
    propertyAreas: ad.propertyAreas.map((area) => ({
      value: escape(area.value), // our id shouldn't contain illegal characters so its safe to do this
      label: escape(area.label),
    })),
    propertyDescription: ad.propertyDescription
      ? escape(ad.propertyDescription)
      : undefined,
  }
}
