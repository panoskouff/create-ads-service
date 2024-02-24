import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import prisma from '#/libs/prismadb'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const x = true
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

        // return fake user
        const fakeUser = {
          //       id: string;
          // userName: string;
          // image: string | null;
          // email: string;
          // emailVerified: Date | null;
          // hashedPassword: string;
          // createdAt: Date;
          // updatedAt: Date;
          id: '1',
          userName: 'fakeuser',
          image: null,
          email: 'w@a.com',
          emailVerified: null,
          hashedPassword: 'fakepassword',
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        // return fakeUser

        console.log('credentials', credentials)
        if (x) {
          console.log('BLOCKED')
          throw new Error('anyway error')
        }
        console.log('----PASSED----')

        // @todo we need to server side validation here

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        )

        if (isCorrectPassword === false) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  pages: {
    // which page to redirect to when an error occurs
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: process.env.NEXT_AUTH_SECRET,
  // callbacks: {
  //   async signIn() {
  //     return true // allow users to sign in
  //   },
  //   async jwt({ token, user, profile }) {
  //     if (user) {
  //       /* If the user object is available, it means
  //         that we are going through the sign in process */
  //       token = {
  //         ...token,
  //         email: user.email,
  //         image: user.image,
  //         name: user.name,
  //         id: user?.id ?? profile?.sub,
  //       }
  //     }

  //     return token
  //   },
  //   async session({ session, token }) {
  //     // append image and id to session
  //     session = {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         image: (token as { image?: string })?.image,
  //         id: (token as { id?: string })?.id,
  //       },
  //     }

  //     return session
  //   },
  // },
}
