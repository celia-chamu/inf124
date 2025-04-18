import Link from "next/link";
import {Button} from "./ui/Button";

function NavMenu() {
    return (
        <nav className=" ml-4 mt-4 fixed top-16 flex flex-col bg-gray-500 w-1/8 h-9/10 items-center rounded-xl">
            <Link className="mt-16 mb-2" href="/">
                <Button>Create New Listing</Button>
            </Link>

            <Link className="mt-2 mb-2" href="/">
                <Button>Account Settings</Button>
            </Link>

            <Link className="mt-2 mb-2" href="/">
                <Button>Inbox</Button>
            </Link>

            <Link className="mt-2 mb-2" href="/">
                <Button>Buying</Button>
            </Link>

            <Link className="mt-2 mb-2" href="/">
                <Button>Selling</Button>
            </Link>
        </nav>
    );
}

export default NavMenu