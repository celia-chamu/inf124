
import Link from 'next/link'


export default function MobileHeader() {

    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-center bg-cyan-950">
            <div className="ml-5 justify-center">
                <Link href="/market">
                    <p className="text-3xl text-yellow-500">ZotMarket</p>
                </Link>
            </div>
        </nav>
    )
}
