import { signIn, signOut } from 'next-auth/react';

export const handleSignIn = () => signIn('google', {callbackUrl: '/market'});
export const handleSignOut = () => signOut();
