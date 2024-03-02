'use server'

import { getServerSession } from 'next-auth'
import SessionProvider from '#/components/SessionProvider'
import { authOptions } from '#/app/api/auth/[...nextauth]/authOptions'
import Link from 'next/link'
import { Center, Space, Text, TextLink } from '#/atoms'
import { SectionContainer } from '#/components/SectionContainer'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <SectionContainer>
        <Center h='80vh'>
          <Text>
            Please <Link href='/sign-in'>sign in</Link> to proceed
          </Text>
        </Center>
      </SectionContainer>
    )
  }

  const noAdsYetMessage = "You haven't placed an ad yet..."

  // @todo remove session provider if it ends up not being used
  return (
    <SessionProvider session={session}>
      <SectionContainer>
        <Text textStyle='title' css={{ display: 'block' }}>
          Your ads
        </Text>
        <Text>{noAdsYetMessage}</Text>
        <Space h={20} />
        <TextLink href='/place-ad'>Place an ad</TextLink>
      </SectionContainer>
    </SessionProvider>
  )
}
