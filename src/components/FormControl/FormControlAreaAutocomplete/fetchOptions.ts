import { fetchAreaSuggestions } from '#/network/queries'
type Option = { label: string; value: string }

export const fetchOptions = async (inputValue: string): Promise<Option[]> => {
  if (inputValue.length < 3) {
    return []
  }

  const { data } = await fetchAreaSuggestions(inputValue)

  if (!data) {
    return []
  }

  return data
}
