import '../theme/globalStyles'
import { mulish, tinos } from '#/theme/fonts'

export const metadata = {
  title: 'Todo App title',
  description: 'todo app description',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${mulish.variable} ${tinos.variable}`}>
      <body>{children}</body>
    </html>
  )
}
