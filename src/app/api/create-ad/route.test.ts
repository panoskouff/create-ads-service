import { NextRequest } from 'next/server'
import { POST } from './route'
import { z } from 'zod'

var mockGetToken: jest.Mock
jest.mock('next-auth/jwt', () => {
  mockGetToken = jest.fn()
  return {
    getToken: mockGetToken,
  }
})

var mockSanitizePropertyAdData: jest.Mock
jest.mock('#/app/api/create-ad/helpers', () => {
  mockSanitizePropertyAdData = jest.fn()
  return {
    sanitizePropertyAdData: mockSanitizePropertyAdData,
  }
})

var mockPropertyAdSchema: { parse: jest.Mock }
jest.mock('#/schemas/PropertyAdSchema', () => {
  mockPropertyAdSchema = { parse: jest.fn() }
  return {
    PropertyAdSchema: mockPropertyAdSchema,
    sanitizePropertyAdData: mockSanitizePropertyAdData,
  }
})

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

var mockPrismaCreate: jest.Mock
jest.mock('#/libs/prismadb', () => {
  mockPrismaCreate = jest.fn().mockResolvedValue({})
  return {
    __esModule: true,
    default: {
      propertyAd: {
        create: mockPrismaCreate,
      },
    },
  }
})

const mockRequestBody = {
  propertyTitle: 'mock-property-title',
  propertyPrice: 999,
  propertyAdType: 'sale',
  propertyAreas: [{ placeId: 'mock-place-id', name: 'mock-place-name' }],
  propertyDescription: 'mock-description',
}

describe('POST /createAd', () => {
  beforeEach(() => {
    mockCreateResponse.mockClear()
    mockGetToken.mockClear()
    mockPropertyAdSchema.parse.mockClear()
    mockSanitizePropertyAdData.mockClear()
  })

  it('should return 401 and the appropriate errorMessage if the user is not signed in', async () => {
    mockGetToken.mockResolvedValue(null)

    const mockRequestObject = {
      json: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as NextRequest

    await POST(mockRequestObject)

    expect(mockCreateResponse).toHaveBeenCalledWith(
      { errorMessage: 'You need to be signed in to create an ad' },
      401,
    )
  })

  it('should process the request correctly and return 200 with the appropriate message', async () => {
    const mockToken = { sub: 'user-id' }
    mockGetToken.mockResolvedValue(mockToken)

    const mockRequestObject = {
      json: jest.fn().mockResolvedValue({ data: mockRequestBody }),
    } as unknown as NextRequest
    const parsedData = {
      ...mockRequestBody,
      propertyAreas: mockRequestBody.propertyAreas.map((area) => ({ ...area })),
    }

    const sanitizedData = { ...parsedData }

    mockPropertyAdSchema.parse.mockReturnValue(parsedData)
    mockSanitizePropertyAdData.mockReturnValue(sanitizedData)

    await POST(mockRequestObject)

    // should parse the request data for validate
    expect(mockPropertyAdSchema.parse).toHaveBeenCalledWith(mockRequestBody)

    // should sanitize the parsed data
    expect(mockSanitizePropertyAdData).toHaveBeenCalledWith(parsedData)

    // should call prisma create with the sanitized data
    expect(mockPrismaCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          propertyTitle: parsedData.propertyTitle,
          propertyPrice: parsedData.propertyPrice,
          propertyAdType: parsedData.propertyAdType,
          propertyAreas: expect.objectContaining({
            connectOrCreate: expect.any(Array),
          }),
          propertyDescription: parsedData.propertyDescription,
          user: expect.objectContaining({
            connect: expect.objectContaining({
              id: mockToken.sub,
            }),
          }),
        }),
      }),
    )

    expect(mockCreateResponse).toHaveBeenCalledWith(
      { message: 'Your property ad has been created!' },
      200,
    )
  })

  it('should return 400 and the appropriate errorMessage if the request body data is invalid', async () => {
    const mockToken = { sub: 'user-id' }
    mockGetToken.mockResolvedValue(mockToken)

    const mockRequestBody = {
      // deliberately missing/invalid properties to trigger a ZodError
    }

    const mockRequestObject = {
      json: jest.fn().mockResolvedValue({ data: mockRequestBody }),
    } as unknown as NextRequest

    const zodError = new z.ZodError([
      {
        message: 'Invalid data',
        path: [],
        validation: 'invalid_type',
      } as any,
    ])
    mockPropertyAdSchema.parse.mockImplementation(() => {
      throw zodError
    })

    await POST(mockRequestObject)

    expect(mockPropertyAdSchema.parse).toHaveBeenCalledWith(mockRequestBody)
    expect(mockCreateResponse).toHaveBeenCalledWith(
      { errorMessage: zodError.message },
      400,
    )
  })

  it('should return 500 and the appropriate errorMessage if an unexpected error occurs', async () => {
    const mockToken = { sub: 'user-id' }
    mockGetToken.mockResolvedValue(mockToken)

    const mockRequestObject = {
      json: jest.fn().mockResolvedValue({ data: mockRequestBody }),
    } as unknown as NextRequest

    const parsedData = {
      ...mockRequestBody,
      propertyAreas: mockRequestBody.propertyAreas.map((area) => ({ ...area })),
    }
    const sanitizedData = { ...parsedData }

    mockPropertyAdSchema.parse.mockReturnValue(parsedData)
    mockSanitizePropertyAdData.mockReturnValue(sanitizedData)

    // simulate an unexpected error during the database operation
    const unexpectedError = new Error('An unexpected error occurred')
    mockPrismaCreate.mockRejectedValue(unexpectedError)

    await POST(mockRequestObject)

    expect(mockPrismaCreate).toHaveBeenCalled()
    expect(mockCreateResponse).toHaveBeenCalledWith(
      { errorMessage: 'An unexpected error occurred' },
      500,
    )
  })
})
