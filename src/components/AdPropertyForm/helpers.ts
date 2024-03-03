import { PropertyAd, PropertyAdFormInputs } from '#/types'

export const adaptInputDataForRequest = (
  data: PropertyAdFormInputs,
): PropertyAd => {
  return {
    ...data,
    propertyAreas: data.propertyAreas.map((area) => ({
      placeId: area.value,
      name: area.label,
    })),
  }
}
