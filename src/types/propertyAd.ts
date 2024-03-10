export type PropertyAreaOption = { label: string; value: string }

export type PropertyAd = {
  propertyTitle: string
  propertyPrice: string
  propertyAdType: string
  propertyAreas: { placeId: string; name: string }[]
  propertyDescription?: string
}

export type PropertyAdFormInputs = Omit<PropertyAd, 'propertyAreas'> & {
  propertyAreas: PropertyAreaOption[]
}
