'use client'

import Link from 'next/link'
import GoogleSignIn from '@/components/google/GoogleSignIn'
import { Button } from './ui/button'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
    const { data: session } = useSession()

    return (
        <nav className="grid grid-cols-3 h-20 gap-4 bg-primary">
            <div className="col-start-2 md:col-start-1 flex justify-center md:justify-start md:ml-5">
                <Link href={session ? '/market' : '/'} className="h-20 flex">
                    <img
                        src="/images/ZotMarket.png"
                        alt="ZotMarket Logo"
                        className="h-auto w-auto object-contain"
                    />
                </Link>
            </div>
            <div className="md:col-span-2 flex justify-end items-center mr-5">
                {session ? (
                    <div className="flex items-center justify-between gap-5 hidden md:flex">
                        <p className="text-white">
                            Signed in as {session.user!.email}
                        </p>
                        <Button
                            variant="zot"
                            onClick={() =>
                                signOut({
                                    callbackUrl: '/',
                                })
                            }
                        >
                            Sign out
                        </Button>
                    </div>
                ) : (
                    <GoogleSignIn />
                )}
            </div>
        </nav>
    )
}
