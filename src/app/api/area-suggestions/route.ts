import { NextRequest } from 'next/server'

const autocompleteApiUrl = process.env.AUTOCOMPLETE_API_URL

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const input = url.searchParams.get('input')

  if (!input) {
    return new Response(JSON.stringify({ error: 'Missing input parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const apiUrl = `${autocompleteApiUrl}/?input=${input}`
    const apiResponse = await fetch(apiUrl)

    if (!apiResponse.ok) {
      throw new Error(`API responded with status ${apiResponse.status}`)
    }

    const data = await apiResponse.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)

    return new Response(
      JSON.stringify({ error: 'Failed to fetch autocomplete results' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
