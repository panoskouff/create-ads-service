'use client'
import { useSearchParams } from 'next/navigation'
import { Center, TextLink, Text, Space } from '#/atoms'
import { SectionContainer } from '#/components/SectionContainer'

export default function SuccessPage() {
  const searchParams = useSearchParams()

  const message = searchParams.get('message')

  const displayMessage = !!message ? message : 'Success!'

  return (
    <SectionContainer>
      <Center h='80vh' flexDirection='column'>
        <Text fontSize={32} textAlign='center'>
          {displayMessage}
        </Text>
        <Space h={20} />
        <TextLink href='/'>Back to home</TextLink>
      </Center>
    </SectionContainer>
  )
}
