import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { PropertyAdSchema, sanitizePropertyAdData } from './helpers'
import { z } from 'zod'
import { createJsonResponse } from '../apiHelpers'
import prisma from '#/libs/prismadb'

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  })

  if (!token) {
    return createJsonResponse(
      { errorMessage: 'You need to be signed in to create an ad' },
      401,
    )
  }

  try {
    const body = await request.json()

    const parsedData = PropertyAdSchema.parse(body.data)
    const sanitizedData = sanitizePropertyAdData(parsedData)

    await prisma.propertyAd.create({
      data: {
        propertyTitle: sanitizedData.propertyTitle,
        propertyPrice: sanitizedData.propertyPrice,
        propertyAdType: sanitizedData.propertyAdType,
        propertyAreas: {
          connectOrCreate: sanitizedData.propertyAreas.map((area) => ({
            where: { placeId: area.placeId },
            create: { name: area.name, placeId: area.placeId },
          })),
        },
        propertyDescription: sanitizedData.propertyDescription,
        user: {
          connect: {
            id: token.sub,
          },
        },
      },
    })

    return createJsonResponse(
      { message: 'Your property ad has been created!' },
      200,
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createJsonResponse({ errorMessage: error.message }, 400)
    }

    console.error('Error creating ad:', error)
    return createJsonResponse(
      { errorMessage: 'An unexpected error occurred' },
      500,
    )
  }
}
