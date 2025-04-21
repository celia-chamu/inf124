import { Button } from "./ui/Button";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-cyan-950">
            <div className="ml-5">
                <Link href="/">
                    <p className="text-3xl text-yellow-500">ZotMarket</p>
                </Link>
            </div>
            <div className="mr-5">
                <Link href="/login">
                    <Button className="border p-2 px-5 rounded-2xl">Login</Button>
                </Link>
            </div>
        </nav>
    );
}
