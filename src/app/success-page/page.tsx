'use client'
import { useSearchParams } from 'next/navigation'
import { Center, TextLink, Text, Space } from '#/atoms'

export default function SuccessPage() {
  const searchParams = useSearchParams()

  const message = searchParams.get('message')

  const displayMessage = !!message ? message : 'Success!'

  const fullPageRedirect = () => {
    window.location.href = '/'
  }

  return (
    <Center h='80vh' flexDirection='column'>
      <Text fontSize={32} textAlign='center'>
        {displayMessage}
      </Text>
      <Space h={20} />
      <TextLink href='#' onClick={fullPageRedirect}>
        Back to home
      </TextLink>
    </Center>
  )
}
