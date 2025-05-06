'use client'

import Link from 'next/link'
import GoogleSignIn from '@/components/google/GoogleSignIn'
import { useEffect } from 'react'
import { Button } from './ui/button'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
    const { data: session } = useSession()
    useEffect(() => {
        const screenWidth = window.innerWidth
    })
    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-primary">
            <div className="ml-5 justify-center">
                <Link href="/">
                    <p className="text-3xl text-yellow-500">ZotMarket</p>
                </Link>
            </div>
            <div className="mr-5">
                {session ? (
                    <div className="flex items-center justify-between gap-5">
                        <p className='text-white'> Signed in as {session.user!.email} </p>
                        <Button onClick={() => signOut( { callbackUrl: 'http://localhost:3000' } )}>Sign out</Button>
                    </div>
                ) : (
                    <GoogleSignIn />
                )}
            </div>
        </nav>
    )
}
