import { GET as autocompleteGET } from './route'

var mockCreateResponse: jest.Mock
jest.mock('#/app/api/apiHelpers', () => {
  mockCreateResponse = jest.fn().mockImplementation((data, statusCode) => ({
    json: () => Promise.resolve(data),
    status: statusCode,
  }))
  return {
    createJsonResponse: mockCreateResponse,
  }
})

global.fetch = jest.fn()

describe('Autocomplete API handler tests', () => {
  beforeEach(() => {
    mockCreateResponse.mockClear()
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('should return the appropriate response if the input parameter is missing', async () => {
    // simulate a request without the input parameter
    await autocompleteGET({
      url: 'http://localhost/api/autocomplete',
    } as any)
    expect(mockCreateResponse).toHaveBeenCalledWith(
      { error: 'Missing input parameter' },
      400,
    )
  })

  it(`should forward the input params to the autocomplete API and forward the
    successful response`, async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ results: 'some results' }),
    })

    await autocompleteGET({
      url: 'http://localhost/api/autocomplete?input=test',
    } as any)

    expect(global.fetch).toHaveBeenCalledWith('https://fakeapi.com/?input=test')

    expect(mockCreateResponse).toHaveBeenCalledWith(
      { results: 'some results' },
      200,
    )
  })

  it('should forward error messages from the autocomplete api', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' }),
    })

    await autocompleteGET({
      url: 'http://localhost/api/autocomplete?input=errorTest',
    } as any)

    expect(mockCreateResponse).toHaveBeenCalledWith({ error: 'Not found' }, 404)
  })

  it.only('should return the appropriate response if our handler throws', async () => {
    ;(global.fetch as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error('Network error')),
    )
    jest.spyOn(console, 'error').mockImplementation(() => {})

    await autocompleteGET({
      url: 'http://localhost/api/autocomplete?input=testError',
    } as any)

    // our error should be logged
    expect(console.error).toHaveBeenCalledWith(expect.any(Error))

    // our api should respond with 500
    expect(mockCreateResponse).toHaveBeenCalledWith(
      { error: 'Failed to fetch autocomplete results' },
      500,
    )
  })
})
