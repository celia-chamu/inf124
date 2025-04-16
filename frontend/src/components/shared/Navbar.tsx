import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-center pt-2">
            <nav className="flex h-16 w-2/3 items-center justify-between border bg-white">

                <div className="flex space-x-6 text-black">
                    <Link href="/">
                        <h1>Create a listing</h1>
                    </Link>
                    <Link href="/">
                        <h1>account settings</h1>
                    </Link>
                    <Link href="/">
                        <h1>inbox</h1>
                    </Link>
                </div>

            </nav>
        </div>
    );
}