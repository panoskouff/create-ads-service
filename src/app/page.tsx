'use server'

import { getServerSession } from 'next-auth'
import SessionProvider from '#/components/SessionProvider'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    return (
      <SessionProvider session={session}>
        <div>homepage</div>
      </SessionProvider>
    )
  } else {
    return (
      <div>
        Please <Link href='/signIn'>sign in</Link> to proceed
      </div>
    )
  }
}
