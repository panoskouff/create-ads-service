'use server'

import { getServerSession } from 'next-auth'
import SessionProvider from '#/components/SessionProvider'
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
            You need to <TextLink href='/signIn'>sign in</TextLink> before you
            can place an ad
          </Text>
        </Center>
      </SectionContainer>
    )
  }

  // @todo remove session provider if it ends up not being used
  return (
    <SessionProvider session={session}>
      <SectionContainer>
        <Space h={20} />
        <Text textStyle='title'>New property classified</Text>
        <Space h={20} />
        <AdPropertyForm />
      </SectionContainer>
    </SessionProvider>
  )
}
