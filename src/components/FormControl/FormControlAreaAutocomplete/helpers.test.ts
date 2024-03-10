import { loadOptionsDebounced, filterOption } from './helpers'
import { PropertyAreaOption } from '#/types'

var mockFetchOptions: jest.Mock
jest.mock('./fetchOptions', () => {
  mockFetchOptions = jest.fn()
  return { fetchOptions: mockFetchOptions }
})

describe('loadOptionsDebounced', () => {
  beforeEach(() => {
    mockFetchOptions.mockClear()
  })

  it('debounces multiple calls within 500ms timeframe', () => {
    const callback = jest.fn()
    jest.useFakeTimers()

    mockFetchOptions.mockResolvedValueOnce([])

    // simulate multiple calls within 500ms
    loadOptionsDebounced('first', callback)
    loadOptionsDebounced('second', callback)

    // move the timer forward to simulate the debounce time passing
    jest.advanceTimersByTime(500)

    expect(mockFetchOptions).toHaveBeenCalledTimes(1)
  })

  it('calls fetchOptions with the last provided input value after debounce', async () => {
    const lastInputValue = 'last-input'
    const callback = jest.fn()
    jest.useFakeTimers()

    mockFetchOptions.mockResolvedValueOnce([])

    // simulate multiple calls and ensure only the last call's input is used
    loadOptionsDebounced('first', callback)
    loadOptionsDebounced(lastInputValue, callback)

    jest.advanceTimersByTime(500)

    expect(mockFetchOptions).toHaveBeenCalledWith(lastInputValue)
  })

  it('executes callback with options returned from fetchOptions', async () => {
    const inputValue = 'test'
    const callback = jest.fn()
    const mockOptions: PropertyAreaOption[] = [
      { label: 'Option 1', value: '1' },
    ]

    mockFetchOptions.mockResolvedValue(mockOptions)

    loadOptionsDebounced(inputValue, callback)
    jest.advanceTimersByTime(600)

    // ensure all promises in the queue are resolved
    await Promise.resolve()

    expect(callback).toHaveBeenCalledWith(mockOptions)
  })

  afterAll(() => {
    jest.useRealTimers()
  })
})

describe('filterOption function', () => {
  it('returns true when option label includes the input value irrespective of case', () => {
    const option: PropertyAreaOption = { label: 'Athens', value: 'AtheNS' }
    const inputValue = 'atHEns'
    const result = filterOption(option, inputValue)
    expect(result).toBe(true)
  })

  it('returns false when option label does not include the input value', () => {
    const option: PropertyAreaOption = { label: 'Athens', value: 'athens' }
    const inputValue = 'naxos'
    const result = filterOption(option, inputValue)
    expect(result).toBe(false)
  })
})
