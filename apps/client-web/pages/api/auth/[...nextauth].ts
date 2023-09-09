import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

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
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || '{}')
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);

          const result = await siwe.verify({
            signature: credentials?.signature || '',
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            return {
              id: siwe.address,
              image: 'https://xsgames.co/randomusers/avatar.php?g=male',
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async jwt({ token, account, user }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.access_token = user.access_token;
    //     token.expires_at = add1hourToNow().toISOString();
    //   }
    //   return token;
    // },
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub;
      session.user.name = token.sub;
      return session;
    },
  },
  pages: {
    signIn: '/siwe/',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
};

export default NextAuth(authOptions);
