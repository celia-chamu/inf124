import Link from "next/link";
import {Button} from "./ui/Button";

function NavMenu() {
    return (
        <nav className=" ml-4 mt-4 fixed top-16 flex flex-col bg-gray-500 w-1/8 h-9/10 items-center rounded-xl">
            <Link className="mt-16" href="/">
                <Button className="rounded-2x1 border-1 cursor-pointer w-40">Home</Button>
            </Link>

            <Link className="mt-16" href="/">
                <Button className="rounded-2x1 border-1 cursor-pointer w-40">Create New Listing</Button>
            </Link>

            <Link className="mt-16" href="/account-settings">
                <Button className="rounded-2x1 border-1 cursor-pointer w-40">Account Settings</Button>
            </Link>

            <Link className="mt-16" href="/inbox">
                <Button className="rounded-2x1 border-1 cursor-pointer w-40">Inbox</Button>
            </Link>
        </nav>
    );
}

export default NavMenu