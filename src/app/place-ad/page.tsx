'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '#/app/api/auth/[...nextauth]/authOptions'
import { Center, Space, Text, TextLink } from '#/atoms'
import AdPropertyForm from '#/components/AdPropertyForm'

export default async function PlaceAd() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <Center h='80vh'>
        <Text>
          You need to <TextLink href='/sign-in'>sign in</TextLink> before you
          can place an ad
        </Text>
      </Center>
    )
  }

  return (
    <>
      <Space h={20} />
      <Text textStyle='title'>New property classified</Text>
      <Space h={20} />
      <AdPropertyForm />
    </>
  )
}
