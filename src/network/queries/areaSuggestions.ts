import { AreaSuggestionsAdaptedResponse } from '#/types'
import { areaSuggestionsAdapter } from './adapters/areaSuggestions'

export const fetchAreaSuggestions = async (
  inputValue: string,
): Promise<AreaSuggestionsAdaptedResponse> => {
  try {
    const response = await fetch(`/api/area-suggestions?input=${inputValue}`)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()

    return {
      hasError: false,
      data: areaSuggestionsAdapter(data),
    }
  } catch (error) {
    console.error('Fetching error:', error)
    return {
      hasError: true,
      data: null,
    }
  }
}
