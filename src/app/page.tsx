'use server'

import { getServerSession } from 'next-auth'
import SessionProvider from '#/components/SessionProvider'
import { authOptions } from './api/auth/[...nextauth]/authOptions'

export default async function Home() {
  const session = await getServerSession(authOptions)
  // const userId = session?.user?.id

  return (
    <SessionProvider session={session}>
      <div>homepage</div>
    </SessionProvider>
  )
}
