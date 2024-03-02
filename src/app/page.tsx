import { getServerSession } from 'next-auth'
import { authOptions } from '#/app/api/auth/[...nextauth]/authOptions'
import Link from 'next/link'
import { Center, Space, Text, TextLink } from '#/atoms'
import { SectionContainer } from '#/components/SectionContainer'
import { FetchAndDisplayUserPropertyAds } from '#/components/FetchAndDisplayUserPropertyAds'
import { Suspense } from 'react'

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

  return (
    <SectionContainer>
      <Text textStyle='title' css={{ display: 'block' }}>
        Your ads
      </Text>
      <Suspense fallback={<Text>Loading your property ads...</Text>}>
        {/* @ts-expect-error Async Server Component */}
        <FetchAndDisplayUserPropertyAds />
      </Suspense>
      <Space h={20} />
      <TextLink href='/place-ad'>Place an ad</TextLink>
    </SectionContainer>
  )
}
