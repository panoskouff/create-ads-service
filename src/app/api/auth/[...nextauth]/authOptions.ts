import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions, Session } from 'next-auth'
import prisma from '#/libs/prismadb'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        )

        if (!isCorrectPassword) {
          throw new Error('Wrong password')
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    // extra checks if signIn is allowed should go here eg maintenance mode, bans etc
    async signIn({ user, account }) {
      /* user is resolved by authorize function, so we have 
      already checked the credentials there */
      return user ? true : false
    },
    // create jwt
    async jwt({ token, user }) {
      /* this callback is called whenever a JWT is created 
      (sign in) or updated (session is accessed) */
      if (user) {
        token.image = user.image
        token.id = user.id
        token.userName = (user as unknown as { userName: string }).userName
      }
      return token
    },
    // get session from token
    async session({ session, token }) {
      // this callback is called whenever a session is checked
      const adaptedUser = {
        id: token.id,
        email: token.email,
        userName: token.userName,
        image: token.image,
      } as Session['user']

      session = {
        ...session,
        user: {
          ...adaptedUser,
        },
      }

      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXT_AUTH_SECRET,
}
