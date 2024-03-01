export type AreaSuggestionsData = {
  placeId: string
  mainText: string
  secondaryText: string
}

export type AreaSuggestionsAdaptedData = {
  value: string
  label: string
}

export type AreaSuggestionsAdaptedResponse = {
  hasError: boolean
  data: AreaSuggestionsAdaptedData[] | null
}
