import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === 'google') {
        if (!profile?.email?.endsWith('@uci.edu')) {
          return false;
        }
        // your other logic here...
        return true;
      }
      return '/unauthorized';
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
