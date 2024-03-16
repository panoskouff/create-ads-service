export type PropertyAreaOption = { label: string; value: string }

export type PropertyAd = {
  propertyTitle: string
  propertyPrice: string
  propertyAdType: string
  propertyAreas: { value: string; label: string }[]
  propertyDescription?: string
}

export type PropertyAdFormInputs = Omit<PropertyAd, 'propertyAreas'> & {
  propertyAreas: PropertyAreaOption[]
}
