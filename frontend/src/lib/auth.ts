import { signIn, signOut } from "next-auth/react";

// Function to sign in using Google and redirect to /market after successful login
export const handleSignIn = () => signIn("google", { callbackUrl: "/market" });

// Function to sign out the user
export const handleSignOut = () => signOut();