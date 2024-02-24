import NextAuth, { DefaultSession } from 'next-auth';

/* next-auth requires us to use module-augmentation to allow extra
properties to be returned in the session beside the default ones
https://next-auth.js.org/getting-started/typescript#module-augmentation */

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string;
    } & DefaultSession['user'];
  }
}
