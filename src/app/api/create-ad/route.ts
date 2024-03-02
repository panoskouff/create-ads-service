import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

const CreateJsonResponse = (data: any, status: number) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

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

  const body = await request.json()
  console.log('BODY', body.data.selectedAreas)

  return CreateJsonResponse({ message: 'ok' }, 200)
}
