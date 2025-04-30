"use client";

import Link from 'next/link'
import GoogleSignIn from '@/components/google/GoogleSignIn'
import { useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

export default async function Header() {
    const session = await getServerSession(authOptions);
    useEffect(() => {
        const screenWidth = window.innerWidth;
    })
    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-cyan-950">
            <div className="ml-5 justify-center">
                <Link href="/">
                    <p className="text-3xl text-yellow-500">ZotMarket</p>
                </Link>
            </div>
            <div className="mr-5">
                {session ? (
                    <>
                        Signed in as {session.user!.email} <br />
                        <Button onClick={() => signOut()}>Sign out</Button>
                    </>
                ) : (
                    <GoogleSignIn />
                )}
            </div>
        </nav>
    )
}
