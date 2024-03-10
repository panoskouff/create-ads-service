import { fetchAreaSuggestions } from '#/network/queries'
import { PropertyAreaOption } from '#/types'

export const fetchOptions = async (
  inputValue: string,
): Promise<PropertyAreaOption[]> => {
  if (inputValue.length < 3) {
    return []
  }

  const { data } = await fetchAreaSuggestions(inputValue)

  if (!data) {
    return []
  }

  return data
}
