'use client'
import { signOut } from 'next-auth/react'
import { Padding, Row, TextLink } from '#/atoms'
import { Session } from 'next-auth'

export const Navigation: React.FC<{ session: Session | null }> = ({
  session,
}) => {
  const isSignedIn = !!session?.user?.id

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    window.location.href = '/'
  }

  return (
    <Padding p={20}>
      <Row justifyContent='space-between'>
        <TextLink href='/'>Home</TextLink>

        {isSignedIn ? (
          <TextLink href='#' onClick={handleSignOut}>
            Sign Out
          </TextLink>
        ) : (
          <TextLink href='/sign-in'>Sign in</TextLink>
        )}
      </Row>
    </Padding>
  )
}
