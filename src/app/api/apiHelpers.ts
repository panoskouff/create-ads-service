export const createJsonResponse = (data: any, statusCode: number) => {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
