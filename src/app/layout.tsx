import '../theme/globalStyles'
import { mulish } from '#/theme/fonts'
import { SectionContainer } from '#/components/SectionContainer'
import { Navigation } from '#/components/Navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import { Container } from '#/styled-system/jsx'
import { Space } from '#/atoms'

export const metadata = {
  title: 'Todo App title',
  description: 'todo app description',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en' className={`${mulish.variable}`}>
      <body>
        <Container bg='#d3ffff' boxShadow='0 0  17px -4px black'>
          <SectionContainer maxW={800}>
            <Navigation session={session} />
          </SectionContainer>
        </Container>
        <Space h={30} />
        <SectionContainer>{children}</SectionContainer>
      </body>
    </html>
  )
}
