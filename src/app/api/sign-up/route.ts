import { z } from 'zod'
import bcrypt from 'bcrypt'
import prisma from '#/libs/prismadb'
import { createJsonResponse } from '../apiHelpers'

const userSchema = z.object({
  email: z.string().email(),
  userName: z
    .string()
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Username must only contain Latin characters and numbers',
    ),
  password: z
    .string()
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Password must only contain Latin characters and numbers',
    ),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // validate data from the request
    const validationResult = userSchema.safeParse(body)
    if (!validationResult.success) {
      return createJsonResponse(
        { error: validationResult.error.errors[0].message },
        400,
      )
    }

    const { email, userName, password } = validationResult.data

    // make sure unique fields are indeed unique
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExists) {
      return createJsonResponse(
        { error: 'An account with this email address already exists.' },
        400,
      )
    }

    const userNameExists = await prisma.user.findUnique({
      where: {
        userName,
      },
    })

    if (userNameExists) {
      return createJsonResponse({ error: 'Username is already taken.' }, 400)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        email,
        userName,
        hashedPassword,
      },
    })

    const user = { email, userName }

    return createJsonResponse(user, 200)
  } catch (error) {
    return createJsonResponse({ error: 'An unknown error occurred.' }, 500)
  }
}
