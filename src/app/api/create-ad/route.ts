import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { PropertyAdSchema, sanitizePropertyAdData } from './helpers'
import { z } from 'zod'
import { CreateJsonResponse } from '../apiHelpers'

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  })

  if (!token) {
    return CreateJsonResponse(
      { errorMessage: 'You need to be signed in to create an ad' },
      401,
    )
  }

  try {
    const body = await request.json()

    const parsedData = PropertyAdSchema.parse(body.data)
    const sanitizedData = sanitizePropertyAdData(parsedData)

    console.log('body', JSON.stringify(sanitizedData, null, 2))

    // @todo save data to database

    return CreateJsonResponse(
      { message: 'Your property ad has been created!' },
      200,
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return CreateJsonResponse({ errorMessage: error.message }, 400)
    }

    return CreateJsonResponse(
      { errorMessage: 'An unexpected error occurred' },
      500,
    )
  }
}
