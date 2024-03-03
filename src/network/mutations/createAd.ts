import { PropertyAd } from '#/types'

export const createAdMutation = async (data: PropertyAd) => {
  const response = await fetch('/api/create-ad', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  })

  if (response.ok) {
    return { ok: true, data: await response.json() }
  } else {
    return { ok: false, data: await response.json() }
  }
}
