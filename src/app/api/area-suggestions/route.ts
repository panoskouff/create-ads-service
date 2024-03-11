import { NextRequest } from 'next/server'
import { createJsonResponse } from '../apiHelpers'

const autocompleteApiUrl = process.env.AUTOCOMPLETE_API_URL

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const input = url.searchParams.get('input')

  if (!input) {
    return createJsonResponse({ error: 'Missing input parameter' }, 400)
  }

  try {
    const apiUrl = `${autocompleteApiUrl}/?input=${input}`
    const apiResponse = await fetch(apiUrl)

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json()
      return createJsonResponse(errorData, apiResponse.status)
    }

    const data = await apiResponse.json()

    return createJsonResponse(data, 200)
  } catch (error) {
    console.error(error)

    return createJsonResponse(
      { error: 'Failed to fetch autocomplete results' },
      500,
    )
  }
}
