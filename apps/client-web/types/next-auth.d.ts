import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    access_token: unknown;
    error: unknown;
    expires: string;
  }

  interface User extends DefaultUser {
    image: string;
    access_token: string;
  }
}
