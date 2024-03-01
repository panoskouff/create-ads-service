import { AreaSuggestionsData } from '#/types'

export const areaSuggestionsAdapter = (
  areaSuggestionsData: AreaSuggestionsData[],
) => {
  return areaSuggestionsData.map((areaSuggestion) => {
    return {
      value: areaSuggestion.placeId,
      label: `${areaSuggestion.mainText}, ${areaSuggestion.secondaryText}`,
    }
  })
}
