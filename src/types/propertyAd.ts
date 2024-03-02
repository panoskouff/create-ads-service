export type PropertyAd = {
  propertyTitle: string
  propertyPrice: string
  propertyAdType: string
  propertyAreas: { id: string; name: string }[]
  propertyDescription?: string
}

export type PropertyAdFormInputs = Omit<PropertyAd, 'propertyAreas'> & {
  propertyAreas: { label: string; value: string }[]
}
