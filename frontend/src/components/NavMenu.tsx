import Link from 'next/link'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { handleSignIn, handleSignOut } from "@/lib/auth";
function NavMenu() {
    const {data:session} = useSession()
    return (
        <div>
            {session ? (
            <nav className="mb-0 p-4 flex h-screen flex-col gap-4 bg-(--sidebar-background) h-(--my-max-height)items-center">
            <Link className="w-[15vw]" href="/market">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Home
                </Button>
            </Link>

            <Link className="w-[15vw]" href="/create-listing">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Create New Listing
                </Button>
            </Link>

            <Link className="w-[15vw]" href="/account-settings">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Account Settings
                </Button>
            </Link>

            <Link className="w-[15vw]" href="/inbox">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Inbox
                </Button>
            </Link>
        </nav>
        ): (
            <nav className="mb-0 p-4 flex flex-col h-screen gap-4 bg-(--sidebar-background) h-(--my-max-height)items-center">
            <Link className="w-full" href="/market">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Home
                </Button>
            </Link>
            <Button
                    variant="Menuzot"
                    className="w-full rounded-2x1 cursor-pointer w-[15vw]"
                    onClick={handleSignIn}
                >
                Sign In
            </Button>
            
            
        </nav>
        )}
        </div>
    )
}

export default NavMenu
