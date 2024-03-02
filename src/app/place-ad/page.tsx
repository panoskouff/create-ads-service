'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '#/app/api/auth/[...nextauth]/authOptions'
import { Center, Space, Text, TextLink } from '#/atoms'
import { SectionContainer } from '#/components/SectionContainer'
import AdPropertyForm from '#/components/AdPropertyForm'

export default async function PlaceAd() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <SectionContainer>
        <Center h='80vh'>
          <Text>
            You need to <TextLink href='/sign-in'>sign in</TextLink> before you
            can place an ad
          </Text>
        </Center>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer>
      <Space h={20} />
      <Text textStyle='title'>New property classified</Text>
      <Space h={20} />
      <AdPropertyForm />
    </SectionContainer>
  )
}
