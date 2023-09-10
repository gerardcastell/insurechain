import { authenticateWithNonce } from '@insurechain/web/backend/data-access';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const add1hourToNow = (): Date => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials, req) {
        try {
          const result = await authenticateWithNonce(credentials);
          if (result) {
            return {
              id: result.access_token,
              access_token: result.access_token,
              image: 'https://xsgames.co/randomusers/avatar.php?g=male',
            };
          }
          return null;
        } catch (e) {
          console.log('ERROR', e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 60 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.sub = user.id;
        token.expires_at = add1hourToNow().toISOString();
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.access_token = token.sub;
      return session;
    },
  },
  pages: {
    signIn: '/siwe/',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
};

export default NextAuth(authOptions);
