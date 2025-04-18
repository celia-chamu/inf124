import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-center pt-2 w-screen">
            <nav className="flex h-16 w-screen items-center justify-between border bg-cyan-950">
                <div className="flex justify-start ml-5"> 
                    <text className="text-3xl">ZotMarket</text>
                </div>
                <div className="flex justify-end mr-5">
                    <Link href="/login">
                        <button className = "border-1 p-2 pl-5 pr-5 rounded-2xl">Login</button>
                    </Link>

                </div>

            </nav>
        </div>
    );
}