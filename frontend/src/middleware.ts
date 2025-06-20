import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/',
        },
    }
)

// Specify which routes to protect
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
