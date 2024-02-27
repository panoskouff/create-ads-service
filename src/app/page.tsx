'use server'

import { getServerSession } from 'next-auth'
import SessionProvider from '#/components/SessionProvider'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import Link from 'next/link'
import { Center, Text } from '#/atoms'
import { SectionContainer } from '#/components/SectionContainer'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <SectionContainer>
        <Center h='80vh'>
          <Text>
            Please <Link href='/signIn'>sign in</Link> to proceed
          </Text>
        </Center>
      </SectionContainer>
    )
  }

  return (
    <SessionProvider session={session}>
      <SectionContainer>
        <div>homepage</div>
      </SectionContainer>
    </SessionProvider>
  )
}
