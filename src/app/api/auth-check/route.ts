import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  })

  if (token) {
    return new Response(JSON.stringify({ message: 'OK' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } else {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
