import { z } from 'zod'
import bcrypt from 'bcrypt'
import prisma from '#/libs/prismadb'

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

function createErrorResponse(statusCode: number, errorMessage: string) {
  return new Response(JSON.stringify({ error: errorMessage }), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // validate data from the request
    const validationResult = userSchema.safeParse(body)
    if (!validationResult.success) {
      return createErrorResponse(400, validationResult.error.errors[0].message)
    }

    const { email, userName, password } = validationResult.data

    // make sure unique fields are indeed unique
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExists) {
      return createErrorResponse(
        400,
        'An account with this email address already exists.',
      )
    }

    const userNameExists = await prisma.user.findUnique({
      where: {
        userName,
      },
    })

    if (userNameExists) {
      return createErrorResponse(400, 'Username is already taken.')
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

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return createErrorResponse(500, 'An unknown error occurred.')
  }
}
