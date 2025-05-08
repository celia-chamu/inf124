import Link from 'next/link'
import { Button } from './ui/button'

function NavMenu() {
    return (
        <nav className="mb-0 p-4 flex flex-col gap-4 bg-(--sidebar-background) h-(--my-max-height)items-center">
            <Link className="w-full" href="/market">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Home
                </Button>
            </Link>

            <Link className="w-full" href="/create-listing">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Create New Listing
                </Button>
            </Link>

            <Link className="w-full" href="/account-settings">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Account Settings
                </Button>
            </Link>

            <Link className="w-full" href="/inbox">
                <Button
                    variant="Menuzot"
                    className="rounded-2x1 cursor-pointer w-full"
                >
                    Inbox
                </Button>
            </Link>
        </nav>
    )
}

export default NavMenu
