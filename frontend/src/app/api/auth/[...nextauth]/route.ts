import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account!.provider === 'google') {
                return profile!.email!.endsWith('@uci.edu')
            }
            return '/unauthorized' // Do different verification for other providers that don't have `email_verified`
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
