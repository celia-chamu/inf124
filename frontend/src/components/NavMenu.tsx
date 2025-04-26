import Link from "next/link";
import {Button} from "./ui/button";

function NavMenu() {
    return (
        <nav className="m-4 p-4 flex flex-col gap-4 bg-gray-500 h-9/10 items-center rounded-xl">
            <Link className="w-full" href="/market">
                <Button className="rounded-2x1 border-1 cursor-pointer w-full">Home</Button>
            </Link>

            <Link className="w-full" href="/create-listing">
                <Button className="rounded-2x1 border-1 cursor-pointer w-full">Create New Listing</Button>
            </Link>

            <Link className="w-full" href="/account-settings">
                <Button className="rounded-2x1 border-1 cursor-pointer w-full">Account Settings</Button>
            </Link>

            <Link className="w-full" href="/inbox">
                <Button className="rounded-2x1 border-1 cursor-pointer w-full">Inbox</Button>
            </Link>
        </nav>
    );
}

export default NavMenu