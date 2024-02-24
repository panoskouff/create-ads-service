import { AuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn() {
      return true // allow users to sign in
    },
    async jwt({ token, user, profile }) {
      if (user) {
        /* If the user object is available, it means
          that we are going through the sign in process */
        token = {
          ...token,
          email: user.email,
          image: user.image,
          name: user.name,
          id: user?.id ?? profile?.sub,
        }
      }

      return token
    },
    async session({ session, token }) {
      // append image and id to session
      session = {
        ...session,
        user: {
          ...session.user,
          image: (token as { image?: string })?.image,
          id: (token as { id?: string })?.id,
        },
      }

      return session
    },
  },
}
