import { fetchOptions } from './fetchOptions'

const mockData = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
]

var mockFetchAreaSuggestions: jest.Mock
jest.mock('#/network/queries', () => {
  mockFetchAreaSuggestions = jest.fn()
  return { fetchAreaSuggestions: mockFetchAreaSuggestions }
})

describe('fetchOptions ', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return an empty array when the input value is less than 3 characters', async () => {
    const result = await fetchOptions('ab')
    expect(result).toEqual([])
  })

  it('should call fetchAreaSuggestions with the input value for inputs longer than 2 characters', async () => {
    const inputValue = 'test'
    mockFetchAreaSuggestions.mockResolvedValueOnce({ data: null })
    await fetchOptions(inputValue)
    expect(mockFetchAreaSuggestions).toHaveBeenCalledWith(inputValue)
  })

  it('should return an empty array when fetchAreaSuggestions provides no data', async () => {
    mockFetchAreaSuggestions.mockResolvedValueOnce({ data: null })
    const result = await fetchOptions('test')
    expect(result).toEqual([])
  })

  it('should return the expected data when fetchAreaSuggestions provides valid data', async () => {
    mockFetchAreaSuggestions.mockResolvedValueOnce({ data: mockData })
    const result = await fetchOptions('test')
    expect(result).toEqual(mockData)
  })
})
