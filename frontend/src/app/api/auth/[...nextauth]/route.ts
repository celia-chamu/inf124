import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'
import api from '../../api'
import axios from 'axios'

async function getBase64FromUrl(imageUrl: string): Promise<string> {
    const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
    })
    const base64 = Buffer.from(response.data, 'binary').toString('base64')
    const contentType = response.headers['content-type']
    return `data:${contentType};base64,${base64}`
}

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'openid email profile',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ profile, account }) {
            if (account?.provider === 'google') {
                // Restrict to UCI emails
                if (!profile?.email?.endsWith('@uci.edu')) {
                    return false
                }

                try {
                    //  Check if user exists
                    await api.get('/check-user', {
                        params: { uci_net_id: profile.email },
                    })
                } catch (error: any) {
                    // If not found, create the user
                    if (error.response?.status === 404) {
                        try {
                            //Try to get the image from the url
                            let base64Image = ''
                            try {
                                base64Image = await getBase64FromUrl(
                                    profile.image || ''
                                )
                            } catch (err) {
                                console.warn(
                                    'Could not fetch base64 image:',
                                    err
                                )
                                base64Image = ''
                            }
                            await api.post('/create-user', {
                                uci_net_id: profile.email,
                                reputation: 0.0,
                                join_date: new Date(),
                                full_name: profile.name,
                                profile_pic: base64Image,
                            })
                        } catch (creationError) {
                            console.error(
                                'User creation failed:',
                                creationError
                            )
                            return false // Block sign-in if user creation fails
                        }
                    } else {
                        console.error('Unexpected error checking user:', error)
                        return false
                    }
                }

                //  All good — let them sign in
                return true
            }

            // Not a Google sign-in
            return '/unauthorized'
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
