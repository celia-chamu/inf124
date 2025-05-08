'use client'
import { handleSignIn, handleSignOut } from '@/lib/auth';
import { Button } from "@/components/ui/button"

export default function GoogleSignIn() {
    return (
        <Button variant = 'zot' onClick={handleSignIn}>Sign in with Google</Button>
    )
}