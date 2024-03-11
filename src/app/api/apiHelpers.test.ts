import { createJsonResponse } from './apiHelpers'

global.Response = jest.fn().mockImplementation((body, init) => ({
  json: () => Promise.resolve(JSON.parse(body)),
  status: init.status,
  headers: new Map(Object.entries(init.headers)),
  error: jest.fn(),
  redirect: jest.fn(),
  new: jest.fn(),
})) as any

describe('createJsonResponse', () => {
  it('should create a JSON response with the given status code and data', () => {
    const data = { message: 'test' }
    const statusCode = 200
    const response = createJsonResponse(data, statusCode)

    expect(response.status).toEqual(statusCode)
    expect(response.headers.get('Content-Type')).toEqual('application/json')

    return response.json().then((responseData) => {
      expect(responseData).toEqual(data)
    })
  })
})
